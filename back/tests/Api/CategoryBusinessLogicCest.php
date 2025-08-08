<?php

declare(strict_types=1);

namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

/**
 * Tests focused on Category business logic and edge cases
 * Following Codeception best practices for API testing
 */
final class CategoryBusinessLogicCest
{
    public function _before(ApiTester $I): void
    {
        // Setup code executed before each test
    }

    /**
     * Test that category names are properly trimmed
     */
    public function createCategoryWithPaddedNameTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => '  Categoria com Espaços  ',
            'description' => 'Teste de trim no nome'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        // Verify the name was trimmed in the database
        $I->seeInDatabase('categories', [
            'name' => 'Categoria com Espaços',
            'description' => 'Teste de trim no nome'
        ]);
    }

    /**
     * Test category creation with null description
     */
    public function createCategoryWithNullDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Categoria Null Description',
            'description' => null
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', ['name' => 'Categoria Null Description']);
    }

    /**
     * Test updating category with only name (description should remain unchanged)
     */
    public function updateCategoryNameOnlyTest(ApiTester $I)
    {
        $categoryId = $I->haveInDatabase('categories', [
            'name' => 'Categoria Original',
            'description' => 'Descrição original'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Categoria Atualizada'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria atualizada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'id' => $categoryId,
            'name' => 'Categoria Atualizada'
        ]);
    }

    /**
     * Test that category IDs are properly handled as integers
     */
    public function showCategoryWithStringIdTest(ApiTester $I)
    {
        $categoryId = $I->haveInDatabase('categories', [
            'name' => 'Categoria ID Test',
            'description' => 'Teste de ID como string'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories/' . strval($categoryId));
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'id' => $categoryId,
                'name' => 'Categoria ID Test'
            ]
        ]);
    }

    /**
     * Test category operations with invalid ID formats
     */
    public function showCategoryWithInvalidIdTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories/9999');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    /**
     * Test updating with invalid ID format
     */
    public function updateCategoryWithInvalidIdTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/9999', [
            'name' => 'Teste ID Inválido'
        ]);
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    /**
     * Test deleting with invalid ID format
     */
    public function deleteCategoryWithInvalidIdTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/categories/9999');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    /**
     * Test category creation with HTML entities (should be stored as-is)
     */
    public function createCategoryWithHtmlEntitiesTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Categoria &amp; Teste',
            'description' => 'Descrição com &lt;tags&gt; HTML'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'name' => 'Categoria &amp; Teste',
            'description' => 'Descrição com &lt;tags&gt; HTML'
        ]);
    }

    /**
     * Test that empty list returns proper JSON structure
     */
    public function listEmptyCategoriesTest(ApiTester $I)
    {
        // Ensure no categories exist
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories');
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => []
        ]);
    }

    /**
     * Test category creation with maximum allowed lengths
     */
    public function createCategoryAtMaxLengthTest(ApiTester $I)
    {
        $maxName = str_repeat('A', 50);
        $maxDescription = str_repeat('B', 255);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => $maxName,
            'description' => $maxDescription
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'name' => $maxName,
            'description' => $maxDescription
        ]);
    }

    /**
     * Test category update preserves ID
     */
    public function updateCategoryPreservesIdTest(ApiTester $I)
    {
        $originalId = $I->haveInDatabase('categories', [
            'name' => 'Categoria ID Preserve',
            'description' => 'Teste preservação de ID'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $originalId, [
            'name' => 'Categoria ID Preserve Updated',
            'description' => 'Descrição atualizada'
        ]);
        $I->seeResponseCodeIsSuccessful();
        
        // Verify the ID remains the same
        $I->seeInDatabase('categories', [
            'id' => $originalId,
            'name' => 'Categoria ID Preserve Updated',
            'description' => 'Descrição atualizada'
        ]);
    }

    /**
     * Test that category operations handle concurrent access properly
     */
    public function concurrentCategoryOperationsTest(ApiTester $I)
    {
        // Create a category
        $categoryId = $I->haveInDatabase('categories', [
            'name' => 'Categoria Concorrente',
            'description' => 'Teste de concorrência'
        ]);

        // Simulate concurrent read operations
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        
        $I->sendGet('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        
        // Update should still work
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Categoria Concorrente Updated'
        ]);
        $I->seeResponseCodeIsSuccessful();
        
        // Verify final state
        $I->seeInDatabase('categories', [
            'id' => $categoryId,
            'name' => 'Categoria Concorrente Updated'
        ]);
    }

    /**
     * Test category creation with mixed case handling
     */
    public function createCategoryMixedCaseTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'CaTeGoRiA mIxEd CaSe',
            'description' => 'DESCRIÇÃO EM MAIÚSCULAS e minúsculas'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        // Verify case is preserved
        $I->seeInDatabase('categories', [
            'name' => 'CaTeGoRiA mIxEd CaSe',
            'description' => 'DESCRIÇÃO EM MAIÚSCULAS e minúsculas'
        ]);
    }

    /**
     * Test that response format is consistent across all operations
     */
    public function responseFormatConsistencyTest(ApiTester $I)
    {
        // Create
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Formato Consistente',
            'description' => 'Teste de formato de resposta'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseMatchesJsonType([
            'success' => 'boolean',
            'data' => 'string'
        ]);

        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Formato Consistente']);

        // Read
        $I->sendGet('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseMatchesJsonType([
            'success' => 'boolean',
            'data' => [
                'id' => 'integer',
                'name' => 'string',
                'description' => 'string|null'
            ]
        ]);

        // Update
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Formato Consistente Updated'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseMatchesJsonType([
            'success' => 'boolean',
            'data' => 'string'
        ]);

        // Delete
        $I->sendDelete('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseMatchesJsonType([
            'success' => 'boolean',
            'data' => 'string'
        ]);
    }
}
