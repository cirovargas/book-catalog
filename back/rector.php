<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\ValueObject\PhpVersion;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/core',
        __DIR__ . '/src',
    ])
    // uncomment to reach your current PHP version
    ->withPhpSets(php84: true)
    ->withPhpVersion(PhpVersion::PHP_84)
    ->withTypeCoverageLevel(10)
    ->withComposerBased(
        symfony: true,
        doctrine: true,
        twig: true
    )
    ->withDeadCodeLevel(10)
    ->withCodeQualityLevel(10)
    ->withPreparedSets(
        symfonyCodeQuality: true,
        doctrineCodeQuality: true,
        strictBooleans: true,
        earlyReturn: true,
        symfonyConfigs: true,
        codingStyle: true,
        instanceOf: true
    );
