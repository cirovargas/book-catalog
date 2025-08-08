<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/core',
        __DIR__ . '/src',
    ])
    // uncomment to reach your current PHP version
    ->withPhpSets(php84: true)
    ->withTypeCoverageLevel(0)
    ->withComposerBased(symfony: true, doctrine: true)
    ->withDeadCodeLevel(0)
    ->withCodeQualityLevel(0);
