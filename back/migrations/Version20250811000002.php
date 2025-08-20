<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Add name and avatar fields to app_user table
 */
final class Version20250811000002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add name and avatar fields to app_user table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE app_user ADD name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE app_user ADD avatar VARCHAR(500) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE app_user DROP name');
        $this->addSql('ALTER TABLE app_user DROP avatar');
    }
}
