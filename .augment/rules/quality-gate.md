# Quality Gate Development Guidelines

## Quality Gate

When you develop a new feature or fix a bug you need to follow these steps:

1. Develop the new functionality an them tests
2. If has any changes on backend, run inside the PHP container (the cointeiner is on the docker-compose file on the env/dev folder) these commands in order:
```bash
./vendor/bin/rector --clear-cache
./vendor/bin/php-cs-fixer fix core
./vendor/bin/php-cs-fixer fix src
./vendor/bin/phpcbf src core
./vendor/bin/phpmd . text phpmd.xml --exclude 'tests/*,vendor/*,var/*,migrations/*,utils/*'
./vendor/bin/phpcs src core
./vendor/bin/phpstan analyse -l 10 src core
./vendor/bin/codecept run
```
3. If any of the commands fail, you need to fix the issues and go back to step 2 and fix them
4. Go to the frontend and test the new functionality in the browser if necessary
4. If all the commands pass, you can commit your changes
