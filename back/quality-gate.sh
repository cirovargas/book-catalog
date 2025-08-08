#fix
./vendor/bin/rector --clear-cache
./vendor/bin/php-cs-fixer fix core
./vendor/bin/php-cs-fixer fix src
#./vendor/bin/phpcbf src core

#validate
./vendor/bin/phpmd . text phpmd.xml --exclude 'tests/*,vendor/*,var/*,migrations/*,utils/*'
./vendor/bin/phpcs src core
./vendor/bin/phpstan analyse -l 10 src core