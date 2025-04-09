<?php

namespace App\Tests\Support\Extension;

use Codeception\Events;
use Codeception\Extension;

class DatabaseMigrationExtension extends Extension
{
    public static $events = [
        Events::SUITE_BEFORE => 'beforeSuite',
    ];

    public function beforeSuite()
    {
        try {
            /** @var \Codeception\Module\Cli $cli */
            $cli = $this->getModule('Cli');

//            $this->writeln('Recreating the DB...');
//            $cli->runShellCommand('bin/console doctrine:database:create --if-not-exists --env=test');
//            $cli->seeResultCodeIs(0);
//            $this->writeln('Dropping schema...');
//            $cli->runShellCommand('bin/console doctrine:schema:drop --force --env=test');
//            $cli->seeResultCodeIs(0);

            $this->writeln('Running Doctrine Migrations...');
            $cli->runShellCommand('bin/console doctrine:migrations:migrate --no-interaction --env=test');
            $cli->seeResultCodeIs(0);

            $this->writeln('Test database recreated');
        } catch (\Exception $e) {
            $this->writeln(
                sprintf(
                    'An error occurred whilst rebuilding the test database: %s',
                    $e->getMessage()
                )
            );
            exit;
        }
    }
}