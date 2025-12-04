<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Create companies table
 */
final class Version20250812000004 extends AbstractMigration
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
            cnpj VARCHAR(14) NOT NULL UNIQUE,
            status VARCHAR(20) DEFAULT \'active\' NOT NULL,
            created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL,
            updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL
        )');

        $this->addSql('COMMENT ON COLUMN companies.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN companies.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE INDEX idx_companies_status ON companies (status)');
        $this->addSql('CREATE INDEX idx_companies_cnpj ON companies (cnpj)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE companies');
    }
}

