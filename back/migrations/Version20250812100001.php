<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Create companies table
 */
final class Version20250812100001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create companies table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE companies (
            id SERIAL PRIMARY KEY,
            corporate_name VARCHAR(255) NOT NULL,
            trade_name VARCHAR(255) NOT NULL,
            cnpj VARCHAR(18) NOT NULL UNIQUE,
            status VARCHAR(20) DEFAULT \'active\' NOT NULL
        )');

        $this->addSql('CREATE INDEX idx_companies_status ON companies (status)');
        $this->addSql('CREATE INDEX idx_companies_cnpj ON companies (cnpj)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE companies');
    }
}


