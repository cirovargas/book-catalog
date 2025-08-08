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
    ->withTypeCoverageLevel(0)
    ->withComposerBased(symfony: true, doctrine: true)
    ->withDeadCodeLevel(0)
    ->withCodeQualityLevel(0)
    ->withPreparedSets(
        symfonyCodeQuality: true
    );
