<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250408203025 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE authors (id SERIAL NOT NULL, name VARCHAR(40) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE books (id SERIAL NOT NULL, title VARCHAR(40) NOT NULL, edition INT NOT NULL, publish_year VARCHAR(4) NOT NULL, price INT NOT NULL, publisher VARCHAR(40) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE books_subjects (book_id INT NOT NULL, subject_id INT NOT NULL, PRIMARY KEY(book_id, subject_id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_C22A296F16A2B381 ON books_subjects (book_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_C22A296F23EDC87 ON books_subjects (subject_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE books_authors (book_id INT NOT NULL, author_id INT NOT NULL, PRIMARY KEY(book_id, author_id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_877EACC216A2B381 ON books_authors (book_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_877EACC2F675F31B ON books_authors (author_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE subjects (id SERIAL NOT NULL, description VARCHAR(20) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_subjects ADD CONSTRAINT FK_C22A296F16A2B381 FOREIGN KEY (book_id) REFERENCES books (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_subjects ADD CONSTRAINT FK_C22A296F23EDC87 FOREIGN KEY (subject_id) REFERENCES subjects (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_authors ADD CONSTRAINT FK_877EACC216A2B381 FOREIGN KEY (book_id) REFERENCES books (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_authors ADD CONSTRAINT FK_877EACC2F675F31B FOREIGN KEY (author_id) REFERENCES authors (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_subjects DROP CONSTRAINT FK_C22A296F16A2B381
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_subjects DROP CONSTRAINT FK_C22A296F23EDC87
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_authors DROP CONSTRAINT FK_877EACC216A2B381
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE books_authors DROP CONSTRAINT FK_877EACC2F675F31B
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE authors
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE books
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE books_subjects
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE books_authors
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE subjects
        SQL);
    }
}
