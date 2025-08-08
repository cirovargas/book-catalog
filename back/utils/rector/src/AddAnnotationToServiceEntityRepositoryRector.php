<?php

namespace Utils\Rector;

use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use PhpParser\Node;
use PhpParser\Node\Name;
use PhpParser\Node\Stmt\Class_;
use PhpParser\Node\Stmt\Return_;
use PhpParser\Node\Stmt\ClassMethod;
use PHPStan\PhpDocParser\Ast\PhpDoc\GenericTagValueNode;
use PHPStan\PhpDocParser\Ast\PhpDoc\PhpDocTagNode;
use Rector\BetterPhpDocParser\PhpDocInfo\PhpDocInfoFactory;
use Rector\Comments\NodeDocBlock\DocBlockUpdater;
use Rector\Rector\AbstractRector;
use Symplify\RuleDocGenerator\ValueObject\CodeSample\CodeSample;
use Symplify\RuleDocGenerator\ValueObject\RuleDefinition;


final class AddAnnotationToServiceEntityRepositoryRector extends AbstractRector
{
    /**
     * @readonly
     */
    private DocBlockUpdater $docBlockUpdater;
    /**
     * @readonly
     */
    private PhpDocInfoFactory $phpDocInfoFactory;
    public function __construct(DocBlockUpdater $docBlockUpdater, PhpDocInfoFactory $phpDocInfoFactory)
    {
        $this->docBlockUpdater = $docBlockUpdater;
        $this->phpDocInfoFactory = $phpDocInfoFactory;
    }
    public function getRuleDefinition() : RuleDefinition
    {
        return new RuleDefinition('Add @extends ServiceEntityRepository<T> annotation to repository classes', [new CodeSample(<<<'CODE_SAMPLE'
use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

final class SomeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SomeEntity::class);
    }
}
CODE_SAMPLE
            , <<<'CODE_SAMPLE'
use App\Bridge\Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<\SomeEntity>
 */
final class SomeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SomeEntity::class);
    }
}
CODE_SAMPLE
        )]);
    }
    /**
     * @return array<class-string<Node>>
     */
    public function getNodeTypes() : array
    {
        return [Class_::class];
    }
    /**
     * @param Class_ $node
     */
    public function refactor(Node $node) : ?Node
    {
        if (!$this->isRepositoryClass($node)) {
            return null;
        }
        $entityClass = $this->getEntityClassFromConstructor($node);
        if ($entityClass === null || $this->hasExtendsAnnotation($node)) {
            return null;
        }
        $this->addAnnotationToNode($node, $entityClass);
        return $node;
    }
    private function isRepositoryClass(Class_ $class) : bool
    {
        if (!$class->extends instanceof Name) {
            return \false;
        }
        return $this->isName($class->extends, ServiceEntityRepository::class);
    }
    private function getEntityClassFromConstructor(Class_ $class) : ?string
    {
        $classMethod = $class->getMethod('getEntityClassName');
        if (!$classMethod instanceof ClassMethod || $classMethod->stmts === null) {
            return null;
        }
        foreach ($classMethod->stmts as $stmt) {
            if (!$stmt instanceof Return_) {
                continue;
            }
            /** @var \PhpParser\Node\Expr\ClassConstFetch $expr */
            $expr = $stmt->expr;
            $entityClass = $expr->class;
            return $entityClass instanceof Name ? $entityClass->toString() : null;
        }
        return null;
    }
    private function addAnnotationToNode(Class_ $class, string $entityClass) : void
    {
        $phpDocInfo = $this->phpDocInfoFactory->createFromNodeOrEmpty($class);
        $entityClassName = end(explode('\\' , $entityClass));
        $repositoryClassName = end(explode('\\' , ServiceEntityRepository::class));
        $genericsAnnotation = \sprintf('%s<%s>', $repositoryClassName, $entityClassName);
        $phpDocInfo->addPhpDocTagNode(new PhpDocTagNode('@extends', new GenericTagValueNode($genericsAnnotation)));
        $this->docBlockUpdater->updateRefactoredNodeWithPhpDocInfo($class);
    }
    private function hasExtendsAnnotation(Class_ $class) : bool
    {
        return $this->phpDocInfoFactory->createFromNodeOrEmpty($class)->hasByName('@extends');
    }
}
