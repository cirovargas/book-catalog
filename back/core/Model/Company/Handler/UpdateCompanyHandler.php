<?php

declare(strict_types=1);

namespace DDD\Model\Company\Handler;

use DDD\Model\Company\Command\UpdateCompanyCommand;
use DDD\Model\Company\Company;
use DDD\Model\Company\Exception\CompanyNameRequiredException;
use DDD\Model\Company\Exception\CompanyNotFoundException;
use DDD\Model\Company\Repository\CompanyRepositoryInterface;
use DDD\Model\Company\Validator\CompanyValidator;

class UpdateCompanyHandler
{
    public function __construct(
        private readonly CompanyRepositoryInterface $companyRepository,
        private readonly CompanyValidator $companyValidator,
    ) {
    }

    public function __invoke(UpdateCompanyCommand $command): void
    {
        $company = $this->companyRepository->get($command->getId());

        if (!$company instanceof Company) {
            throw new CompanyNotFoundException();
        }

        if ('' === trim($command->getCorporateName())) {
            throw new CompanyNameRequiredException();
        }

        if ('' === trim($command->getTradeName())) {
            throw new CompanyNameRequiredException();
        }

        // Validate CNPJ
        $this->companyValidator->validateCnpj($command->getCnpj());

        $company->setCorporateName($command->getCorporateName());
        $company->setTradeName($command->getTradeName());
        $company->setCnpj($command->getCnpj());
        $company->setStatus($command->getStatus());

        $this->companyRepository->save($company);
    }
}
