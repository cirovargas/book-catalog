<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Add all Company fields
 */
final class Version20250812100002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add email, phone, communication_vehicle_type_id, address fields, and user_id to companies table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE companies ADD email VARCHAR(255) NOT NULL DEFAULT \'\'');
        $this->addSql('ALTER TABLE companies ADD phone VARCHAR(20) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD mobile VARCHAR(20) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD responsible_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD communication_vehicle_type_id INTEGER NOT NULL DEFAULT 1');
        $this->addSql('ALTER TABLE companies ADD cep VARCHAR(8) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD street VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD number VARCHAR(20) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD neighborhood VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD complement VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD state VARCHAR(2) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD city VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD user_id INTEGER DEFAULT NULL');

        $this->addSql('CREATE INDEX idx_companies_communication_vehicle_type ON companies (communication_vehicle_type_id)');
        $this->addSql('CREATE INDEX idx_companies_user ON companies (user_id)');
        $this->addSql('CREATE INDEX idx_companies_email ON companies (email)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX idx_companies_email');
        $this->addSql('DROP INDEX idx_companies_user');
        $this->addSql('DROP INDEX idx_companies_communication_vehicle_type');
        $this->addSql('ALTER TABLE companies DROP COLUMN user_id');
        $this->addSql('ALTER TABLE companies DROP COLUMN city');
        $this->addSql('ALTER TABLE companies DROP COLUMN state');
        $this->addSql('ALTER TABLE companies DROP COLUMN complement');
        $this->addSql('ALTER TABLE companies DROP COLUMN neighborhood');
        $this->addSql('ALTER TABLE companies DROP COLUMN number');
        $this->addSql('ALTER TABLE companies DROP COLUMN street');
        $this->addSql('ALTER TABLE companies DROP COLUMN cep');
        $this->addSql('ALTER TABLE companies DROP COLUMN communication_vehicle_type_id');
        $this->addSql('ALTER TABLE companies DROP COLUMN responsible_name');
        $this->addSql('ALTER TABLE companies DROP COLUMN mobile');
        $this->addSql('ALTER TABLE companies DROP COLUMN phone');
        $this->addSql('ALTER TABLE companies DROP COLUMN email');
    }
}


