<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Change active boolean to status string in communication_vehicle_types table
 */
final class Version20250812000003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change active boolean to status string in communication_vehicle_types table';
    }

    public function up(Schema $schema): void
    {
        // Add status column
        $this->addSql("ALTER TABLE communication_vehicle_types ADD status VARCHAR(20) DEFAULT 'active' NOT NULL");
        
        // Migrate data from active to status
        $this->addSql("UPDATE communication_vehicle_types SET status = CASE WHEN active = true THEN 'active' ELSE 'inactive' END");
        
        // Drop active column
        $this->addSql('ALTER TABLE communication_vehicle_types DROP active');
    }

    public function down(Schema $schema): void
    {
        // Add back active column
        $this->addSql('ALTER TABLE communication_vehicle_types ADD active BOOLEAN DEFAULT TRUE NOT NULL');
        
        // Migrate data from status to active
        $this->addSql("UPDATE communication_vehicle_types SET active = CASE WHEN status = 'active' THEN true ELSE false END");
        
        // Drop status column
        $this->addSql('ALTER TABLE communication_vehicle_types DROP status');
    }
}

