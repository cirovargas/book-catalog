<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Create communication_vehicle_types table
 */
final class Version20250812000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create communication_vehicle_types table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE communication_vehicle_types (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT DEFAULT NULL
        )');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE communication_vehicle_types');
    }
}

