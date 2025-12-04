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

        // Validate required fields
        if ('' === trim($command->getCorporateName())) {
            throw new CompanyNameRequiredException();
        }

        if ('' === trim($command->getTradeName())) {
            throw new CompanyNameRequiredException();
        }

        // Validate email
        $this->companyValidator->validateEmail($command->getEmail());

        // Validate CEP and State
        $this->companyValidator->validateCep($command->getCep());
        $this->companyValidator->validateState($command->getState());

        // Update company fields (CNPJ is immutable, so we don't update it)
        $company->setCorporateName($command->getCorporateName());
        $company->setTradeName($command->getTradeName());
        $company->setEmail($command->getEmail());
        $company->setCommunicationVehicleTypeId($command->getCommunicationVehicleTypeId());
        $company->setCep($command->getCep());
        $company->setStreet($command->getStreet());
        $company->setNumber($command->getNumber());
        $company->setNeighborhood($command->getNeighborhood());
        $company->setState($command->getState());
        $company->setCity($command->getCity());
        $company->setPhone($command->getPhone());
        $company->setMobile($command->getMobile());
        $company->setResponsibleName($command->getResponsibleName());
        $company->setComplement($command->getComplement());
        $company->setStatus($command->getStatus());

        $this->companyRepository->save($company);
    }
}
