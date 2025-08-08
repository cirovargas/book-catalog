<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\ValueObject\PhpVersion;
use Rector\Set\ValueObject\SetList;
use Rector\Doctrine\Set\DoctrineSetList;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/core',
        __DIR__ . '/src',
    ])
    ->withPhpSets(php84: true)
    ->withPhpVersion(PhpVersion::PHP_84)
    ->withTypeCoverageLevel(10)
    ->withComposerBased(
        symfony: true,
        doctrine: true,
        twig: true
    )
    ->withDeadCodeLevel(10)
    ->withCodeQualityLevel(10)
//    ->withSets([
//        DoctrineSetList::DOCTRINE_BUNDLE_230
//    ])
    ->withPreparedSets(
        symfonyCodeQuality: true,
        doctrineCodeQuality: true,
        strictBooleans: true,
        earlyReturn: true,
        symfonyConfigs: true,
        codingStyle: true,
        instanceOf: true,
        privatization: true
    )
    ->withRules([
        \Rector\Naming\Rector\Assign\RenameVariableToMatchMethodCallReturnTypeRector::class,
        \Rector\Naming\Rector\Foreach_\RenameForeachValueVariableToMatchMethodCallReturnTypeRector::class,
        \Rector\Naming\Rector\Foreach_\RenameForeachValueVariableToMatchExprVariableRector::class,
        \Rector\Renaming\Rector\FunctionLike\RenameFunctionLikeParamWithinCallLikeArgRector::class,
        \Rector\TypeDeclaration\Rector\ClassMethod\AddParamArrayDocblockBasedOnCallableNativeFuncCallRector::class,
        \Rector\TypeDeclaration\Rector\ClassMethod\AddReturnArrayDocblockBasedOnArrayMapRector::class,
        \Rector\Doctrine\TypedCollections\Rector\Class_\CompleteParamDocblockFromSetterToCollectionRector::class,
        \Utils\Rector\AddAnnotationToServiceEntityRepositoryRector::class
    ]);
