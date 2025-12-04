<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Add active column to communication_vehicle_types table
 */
final class Version20250812000002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add active column to communication_vehicle_types table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE communication_vehicle_types ADD active BOOLEAN DEFAULT TRUE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE communication_vehicle_types DROP active');
    }
}

