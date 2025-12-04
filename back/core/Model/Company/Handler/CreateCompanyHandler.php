<?php

declare(strict_types=1);

namespace DDD\Model\Company\Handler;

use DDD\Model\Company\Command\CreateCompanyCommand;
use DDD\Model\Company\Company;
use DDD\Model\Company\Exception\CompanyCnpjAlreadyExistsException;
use DDD\Model\Company\Exception\CompanyNameRequiredException;
use DDD\Model\Company\Repository\CompanyRepositoryInterface;
use DDD\Model\Company\Service\CompanyFactory;
use DDD\Model\Company\Validator\CompanyValidator;
use DDD\Model\User\Command\CreateUserCommand;
use Symfony\Component\Messenger\MessageBusInterface;

class CreateCompanyHandler
{
    public function __construct(
        private readonly CompanyRepositoryInterface $companyRepository,
        private readonly CompanyFactory             $companyFactory,
        private readonly CompanyValidator           $companyValidator,
        private readonly MessageBusInterface        $commandBus,
    )
    {
    }

    public function __invoke(CreateCompanyCommand $command): void
    {
        // Validate required fields
        if ('' === trim($command->getCorporateName())) {
            throw new CompanyNameRequiredException();
        }

        if ('' === trim($command->getTradeName())) {
            throw new CompanyNameRequiredException();
        }

        // Validate CNPJ
        $this->companyValidator->validateCnpj($command->getCnpj());

        // Check for duplicate CNPJ
        $normalizedCnpj = (string)preg_replace('/[^0-9]/', '', $command->getCnpj());
        $existingCompany = $this->companyRepository->findByCnpj($normalizedCnpj);

        if ($existingCompany instanceof Company) {
            throw new CompanyCnpjAlreadyExistsException($command->getCnpj());
        }

        // Validate email
        $this->companyValidator->validateEmail($command->getEmail());

        // Validate CEP and State
        $this->companyValidator->validateCep($command->getCep());
        $this->companyValidator->validateState($command->getState());

        // Create company
        $company = $this->companyFactory->create(
            $command->getCnpj(),
            $command->getCorporateName(),
            $command->getTradeName(),
            $command->getEmail(),
            $command->getCommunicationVehicleTypeId(),
            $command->getCep(),
            $command->getStreet(),
            $command->getNumber(),
            $command->getNeighborhood(),
            $command->getState(),
            $command->getCity(),
            $command->getPhone(),
            $command->getMobile(),
            $command->getResponsibleName(),
            $command->getComplement(),
            $command->getStatus()
        );

        $this->companyRepository->save($company);

        // Generate user if requested
        if ($command->shouldGenerateUser()) {
            $this->generateUserForCompany($company);
        }
    }

    private function generateUserForCompany(Company $company): void
    {
        // Create user command with company email
        // The CreateUserHandler will generate a random password and trigger the UserRegisteredEvent
        // which will send the welcome email with credentials
        $createUserCommand = new CreateUserCommand(
            $company->getEmail(),
            [], // roles - empty for now, can be configured later
            $company->getTradeName(), // name
            null // avatar
        );

        // Dispatch the create user command
        // This will automatically trigger the UserRegisteredEvent which sends the welcome email
        try {
            $this->commandBus->dispatch($createUserCommand);
        } catch (\Exception $e) {
            // If user creation fails (e.g. email already exists), we log but don't fail company creation
            // This allows the company to be created even if user generation fails
            error_log('Failed to generate user for company: ' . $e->getMessage());
        }
    }
}
