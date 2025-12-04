<?php

declare(strict_types=1);

namespace DDD\Model\Company\Handler;

use DDD\Model\Company\Command\DeleteCompanyCommand;
use DDD\Model\Company\Company;
use DDD\Model\Company\Exception\CompanyNotFoundException;
use DDD\Model\Company\Repository\CompanyRepositoryInterface;

class DeleteCompanyHandler
{
    public function __construct(
        private readonly CompanyRepositoryInterface $companyRepository,
    ) {
    }

    public function __invoke(DeleteCompanyCommand $command): void
    {
        $company = $this->companyRepository->get($command->getId());

        if (!$company instanceof Company) {
            throw new CompanyNotFoundException();
        }

        $this->companyRepository->delete($company);
    }
}

