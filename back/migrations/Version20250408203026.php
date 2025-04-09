<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250408203026 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("
            CREATE OR REPLACE VIEW books_by_author AS
                SELECT
                    a.id AS author_id,
                    a.name AS author_name,
                    string_agg(DISTINCT b.title, ', ') AS book_titles,
                    string_agg(DISTINCT s.description, ', ') AS subjects
                FROM
                    authors a
                        LEFT JOIN
                    books_authors ba ON a.id = ba.author_id
                        LEFT JOIN
                    books b ON ba.book_id = b.id
                        LEFT JOIN
                    books_subjects bs ON b.id = bs.book_id
                        LEFT JOIN
                    subjects s ON bs.subject_id = s.id
                GROUP BY
                    a.id, a.name;
        ");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP VIEW books_by_author
        SQL);
    }
}
