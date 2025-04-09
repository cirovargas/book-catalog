<?php

declare(strict_types=1);

namespace DDD\Application\Service;

class CsvReader
{
    public function csvToArray(
        string $filename,
        ?string $delimiter = null,
        int $chunkSize = 0,
        array $headers = [],
        bool $ignoreFirstLine = true
    ) {
        $file = fopen($filename, 'r');
        $iterator = 0;
        $data = [];
        if ($iterator === 0 && $ignoreFirstLine) {
            fgetcsv($file, 1000, $delimiter);
        }

        while (($row = fgetcsv($file, 4000, $delimiter)) !== false) {
            try {
                $chunked = false;
                if (!$headers) {
                    $headers = $row;
                } else {
                    $iterator++;
                    $data[] = array_combine($headers, $row);
                    if ($chunkSize === 0 || ($iterator !== 0 && $iterator % $chunkSize === 0)) {
                        $chunked = true;
                        $chunk = $data;
                        $data = [];
                        yield $chunk;
                    }
                }
            } catch (\ValueError $e) {
                continue;
            }
        }
        fclose($file);
        if (!$chunked) {
            yield $data;
        }
        return;
    }

}
