<?php

declare(strict_types=1);

namespace App\Tests\Support\Helper;

use Codeception\Module;

/**
 * Category Test Helper
 * 
 * Provides helper methods for category testing following Codeception best practices
 * and Context7 documentation patterns.
 */
class CategoryTestHelper extends Module
{
    /**
     * Create a test category with default values
     */
    public function createTestCategory(
        string $name = 'Test Category',
        ?string $description = 'Test Description'
    ): array {
        return [
            'name' => $name,
            'description' => $description
        ];
    }

    /**
     * Create a category with maximum allowed field lengths
     */
    public function createMaxLengthCategory(): array
    {
        return [
            'name' => str_repeat('A', 50), // Maximum name length
            'description' => str_repeat('B', 255) // Maximum description length
        ];
    }

    /**
     * Create a category with special characters and Unicode
     */
    public function createUnicodeCategory(): array
    {
        return [
            'name' => '📚 Ficção & Fantasia',
            'description' => 'Livros com acentuação: ção, ã, é, ü, ñ, 中文, العربية, русский'
        ];
    }

    /**
     * Create a category with HTML entities
     */
    public function createHtmlEntitiesCategory(): array
    {
        return [
            'name' => 'Categoria &amp; Teste',
            'description' => 'Descrição com &lt;tags&gt; HTML &quot;aspas&quot;'
        ];
    }

    /**
     * Create a category with minimal data (name only)
     */
    public function createMinimalCategory(string $name = 'Minimal Category'): array
    {
        return ['name' => $name];
    }

    /**
     * Create invalid category data for validation testing
     */
    public function createInvalidCategoryData(): array
    {
        return [
            'empty_name' => ['name' => '', 'description' => 'Empty name test'],
            'whitespace_name' => ['name' => '   ', 'description' => 'Whitespace name test'],
            'null_name' => ['description' => 'Null name test'],
            'missing_name' => ['description' => 'Missing name test'],
            'too_long_name' => [
                'name' => str_repeat('X', 51), // Exceeds maximum length
                'description' => 'Too long name test'
            ],
            'too_long_description' => [
                'name' => 'Valid Name',
                'description' => str_repeat('Y', 256) // Exceeds maximum length
            ]
        ];
    }

    /**
     * Create a batch of test categories
     */
    public function createCategoryBatch(int $count = 5): array
    {
        $categories = [];
        for ($i = 1; $i <= $count; $i++) {
            $categories[] = [
                'name' => "Categoria Teste {$i}",
                'description' => "Descrição da categoria teste número {$i}"
            ];
        }
        return $categories;
    }

    /**
     * Create categories with different description scenarios
     */
    public function createDescriptionVariations(): array
    {
        return [
            'with_description' => [
                'name' => 'Com Descrição',
                'description' => 'Esta categoria tem uma descrição'
            ],
            'without_description' => [
                'name' => 'Sem Descrição'
            ],
            'empty_description' => [
                'name' => 'Descrição Vazia',
                'description' => ''
            ],
            'null_description' => [
                'name' => 'Descrição Null',
                'description' => null
            ]
        ];
    }

    /**
     * Get expected success response for category creation
     */
    public function getCreateSuccessResponse(): array
    {
        return [
            'success' => true,
            'data' => 'Categoria cadastrada com sucesso!'
        ];
    }

    /**
     * Get expected success response for category update
     */
    public function getUpdateSuccessResponse(): array
    {
        return [
            'success' => true,
            'data' => 'Categoria atualizada com sucesso!'
        ];
    }

    /**
     * Get expected success response for category deletion
     */
    public function getDeleteSuccessResponse(): array
    {
        return [
            'success' => true,
            'data' => 'Categoria excluída com sucesso!'
        ];
    }

    /**
     * Get expected error responses
     */
    public function getErrorResponses(): array
    {
        return [
            'name_required' => [
                'success' => false,
                'error' => 'O campo nome é obrigatório'
            ],
            'not_found' => [
                'success' => false,
                'error' => 'Categoria não encontrada'
            ],
            'bad_json' => [
                'success' => false,
                'error' => 'Body mal formatado'
            ],
            'category_not_found_update' => [
                'success' => false,
                'error' => 'A categoria não foi encontrada'
            ]
        ];
    }

    /**
     * Validate category response structure
     */
    public function validateCategoryResponse(array $expectedStructure): array
    {
        return [
            'success' => 'boolean',
            'data' => $expectedStructure
        ];
    }

    /**
     * Get category response structure for single category
     */
    public function getCategoryResponseStructure(): array
    {
        return [
            'id' => 'integer',
            'name' => 'string',
            'description' => 'string|null'
        ];
    }

    /**
     * Create test data for concurrent operations
     */
    public function createConcurrentTestData(): array
    {
        return [
            'original' => [
                'name' => 'Categoria Concorrente',
                'description' => 'Teste de operações concorrentes'
            ],
            'update1' => [
                'name' => 'Categoria Concorrente Update 1',
                'description' => 'Primeira atualização'
            ],
            'update2' => [
                'name' => 'Categoria Concorrente Update 2',
                'description' => 'Segunda atualização'
            ]
        ];
    }

    /**
     * Create test data for boundary testing
     */
    public function createBoundaryTestData(): array
    {
        return [
            'min_name' => ['name' => 'A'], // Minimum valid name
            'max_name' => ['name' => str_repeat('A', 50)], // Maximum valid name
            'min_description' => ['name' => 'Test', 'description' => ''], // Minimum description
            'max_description' => ['name' => 'Test', 'description' => str_repeat('B', 255)] // Maximum description
        ];
    }

    /**
     * Create test data for character encoding tests
     */
    public function createEncodingTestData(): array
    {
        return [
            'utf8_basic' => [
                'name' => 'Categoria UTF-8',
                'description' => 'Descrição com acentos: ção, ã, é'
            ],
            'utf8_extended' => [
                'name' => '中文 Category العربية',
                'description' => 'Mixed scripts: русский, 日本語, हिन्दी'
            ],
            'emoji' => [
                'name' => '📚 Books & 📖 Reading',
                'description' => 'Category with emojis: 🎯 📊 💡 🔍'
            ],
            'special_chars' => [
                'name' => 'Special: @#$%^&*()',
                'description' => 'Symbols: ©®™€£¥§¶•‰'
            ]
        ];
    }

    /**
     * Assert category exists in database with expected values
     */
    public function assertCategoryInDatabase(
        \App\Tests\Support\ApiTester $I,
        array $expectedData,
        ?int $id = null
    ): void {
        $searchCriteria = $expectedData;
        if ($id !== null) {
            $searchCriteria['id'] = $id;
        }
        $I->seeInDatabase('categories', $searchCriteria);
    }

    /**
     * Assert category does not exist in database
     */
    public function assertCategoryNotInDatabase(
        \App\Tests\Support\ApiTester $I,
        array $searchCriteria
    ): void {
        $I->dontSeeInDatabase('categories', $searchCriteria);
    }

    /**
     * Create and return category ID for testing
     */
    public function createCategoryInDatabase(
        \App\Tests\Support\ApiTester $I,
        array $categoryData
    ): int {
        return $I->haveInDatabase('categories', $categoryData);
    }

    /**
     * Get category from database by criteria
     */
    public function getCategoryFromDatabase(
        \App\Tests\Support\ApiTester $I,
        string $field,
        array $criteria
    ) {
        return $I->grabFromDatabase('categories', $field, $criteria);
    }
}
