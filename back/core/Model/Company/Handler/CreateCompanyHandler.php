<?php

declare(strict_types=1);

namespace DDD\Model\Company\Handler;

use DDD\Model\Company\Command\CreateCompanyCommand;
use DDD\Model\Company\Exception\CompanyNameRequiredException;
use DDD\Model\Company\Repository\CompanyRepositoryInterface;
use DDD\Model\Company\Service\CompanyFactory;
use DDD\Model\Company\Validator\CompanyValidator;

class CreateCompanyHandler
{
    public function __construct(
        private readonly CompanyRepositoryInterface $companyRepository,
        private readonly CompanyFactory $companyFactory,
        private readonly CompanyValidator $companyValidator,
    ) {
    }

    public function __invoke(CreateCompanyCommand $command): void
    {
        if ('' === trim($command->getCorporateName())) {
            throw new CompanyNameRequiredException();
        }

        if ('' === trim($command->getTradeName())) {
            throw new CompanyNameRequiredException();
        }

        // Validate CNPJ
        $this->companyValidator->validateCnpj($command->getCnpj());

        $company = $this->companyFactory->create(
            $command->getCorporateName(),
            $command->getTradeName(),
            $command->getCnpj(),
            $command->getStatus()
        );

        $this->companyRepository->save($company);
    }
}
