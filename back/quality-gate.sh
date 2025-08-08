#fix
./vendor/bin/rector
./vendor/bin/phpcbf src core

#validate
./vendor/bin/phpmd . text phpmd.xml --exclude 'tests/*,vendor/*,var/*,migrations/*'
./vendor/bin/phpcs src core
./vendor/bin/phpstan analyse -l 10 src core