<?php

declare(strict_types=1);

namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

final class CategoryCest
{
    public function _before(ApiTester $I): void
    {
        // Code here will be executed before each test.
    }

    public function createCategoryTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Ficção Científica',
            'description' => 'Livros de ficção científica e fantasia'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'name' => 'Ficção Científica',
            'description' => 'Livros de ficção científica e fantasia'
        ]);
    }

    public function createCategoryWithoutDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Romance'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', ['name' => 'Romance']);
    }

    public function createCategoryWithEmptyDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Terror',
            'description' => ''
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', ['name' => 'Terror']);
    }

    public function createCategoryWithNoNameTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'description' => 'Categoria sem nome'
        ]);
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
//        $I->seeResponseContains('{"success":false,"error":"O campo nome é obrigatório"}');
    }

    public function createCategoryWithBlankNameTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json; charset=utf-8');
        $I->sendPost('/categories', [
            'name' => '',
            'description' => 'Nome em branco'
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'O campo nome é obrigatório'
        ]);
    }

    public function createCategoryWithWhitespaceNameTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json; charset=utf-8');
        $I->sendPost('/categories', [
            'name' => '   ',
            'description' => 'Nome só com espaços'
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'O campo nome é obrigatório'
        ]);
    }

    public function createCategoryWithNoBodyTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    public function listCategoriesTest(ApiTester $I)
    {
        // First create some categories to list
        $I->haveInDatabase('categories', [
            'name' => 'Categoria Teste 1',
            'description' => 'Descrição teste 1'
        ]);
        $I->haveInDatabase('categories', [
            'name' => 'Categoria Teste 2',
            'description' => 'Descrição teste 2'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories');
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true
        ]);
        $I->seeResponseJsonMatchesJsonPath('$.data[*].name');
        $I->seeResponseJsonMatchesJsonPath('$.data[*].description');
    }

    public function showCategoryTest(ApiTester $I)
    {
        $categoryId = $I->haveInDatabase('categories', [
            'name' => 'Categoria Show Test',
            'description' => 'Descrição para teste de show'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'id' => $categoryId,
                'name' => 'Categoria Show Test',
                'description' => 'Descrição para teste de show'
            ]
        ]);
    }

    public function showNotFoundCategoryTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGet('/categories/99999');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'Categoria não encontrada'
        ]);
    }

    public function updateCategoryTest(ApiTester $I)
    {
        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Ficção Científica']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Ficção Científica Atualizada',
            'description' => 'Descrição atualizada para ficção científica'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria atualizada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'id' => $categoryId,
            'name' => 'Ficção Científica Atualizada',
            'description' => 'Descrição atualizada para ficção científica'
        ]);
    }

    public function updateCategoryWithoutDescriptionTest(ApiTester $I)
    {
        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Romance']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Romance Atualizado'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria atualizada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'id' => $categoryId,
            'name' => 'Romance Atualizado'
        ]);
    }

    public function updateCategoryWithBlankNameTest(ApiTester $I)
    {
        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Terror']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, [
            'name' => '',
            'description' => 'Tentativa de nome em branco'
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'O campo nome é obrigatório'
        ]);
    }

    public function updateCategoryWithWhitespaceNameTest(ApiTester $I)
    {
        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Terror']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, [
            'name' => '   ',
            'description' => 'Nome só com espaços'
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'O campo nome é obrigatório'
        ]);
    }

    public function updateNotFoundCategoryTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/99999', [
            'name' => 'Categoria Inexistente',
            'description' => 'Tentativa de atualizar categoria que não existe'
        ]);
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'A categoria não foi encontrada'
        ]);
    }

    public function deleteCategoryTest(ApiTester $I)
    {
        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Romance Atualizado']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'Categoria excluída com sucesso!'
        ]);
        $I->dontSeeInDatabase('categories', ['id' => $categoryId]);
    }

    public function deleteNotFoundCategoryTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/categories/99999');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'A categoria não foi encontrada'
        ]);
    }

    public function createMultipleCategoriesTest(ApiTester $I)
    {
        $categories = [
            ['name' => 'Biografia', 'description' => 'Livros biográficos'],
            ['name' => 'História', 'description' => 'Livros de história'],
            ['name' => 'Autoajuda', 'description' => 'Livros de desenvolvimento pessoal'],
            ['name' => 'Culinária', 'description' => 'Livros de receitas e gastronomia'],
            ['name' => 'Tecnologia']  // Without description
        ];

        foreach ($categories as $category) {
            $I->haveHttpHeader('Content-Type', 'application/json');
            $I->sendPost('/categories', $category);
            $I->seeResponseCodeIsSuccessful();
            $I->seeResponseIsJson();
            $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
            $I->seeInDatabase('categories', ['name' => $category['name']]);
        }
    }

    public function createCategoryWithLongNameTest(ApiTester $I)
    {
        $longName = str_repeat('A', 50); // Exactly at the limit
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => $longName,
            'description' => 'Categoria com nome no limite'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', ['name' => $longName]);
    }

    public function createCategoryWithLongDescriptionTest(ApiTester $I)
    {
        $longDescription = str_repeat('B', 255); // Exactly at the limit
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Categoria Descrição Longa',
            'description' => $longDescription
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', ['name' => 'Categoria Descrição Longa']);
    }

    public function createCategoryWithSpecialCharactersTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Fiction and Fantasy',
            'description' => 'Books with special characters: @#$%^*()'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'Categoria cadastrada com sucesso!'
        ]);
        $I->seeInDatabase('categories', [
            'name' => 'Fiction and Fantasy',
            'description' => 'Books with special characters: @#$%^*()'
        ]);
    }

    public function createCategoryWithNumbersTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Século XXI',
            'description' => 'Livros do século 21 (2001-2100)'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'name' => 'Século XXI',
            'description' => 'Livros do século 21 (2001-2100)'
        ]);
    }

    public function updateCategoryWithEmptyDescriptionTest(ApiTester $I)
    {
        $categoryId = $I->haveInDatabase('categories', [
            'name' => 'Categoria Para Limpar',
            'description' => 'Descrição que será removida'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Categoria Sem Descrição',
            'description' => ''
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Categoria atualizada com sucesso!"}');
        $I->seeInDatabase('categories', [
            'id' => $categoryId,
            'name' => 'Categoria Sem Descrição'
        ]);
    }

    public function createCategoryWithInvalidJsonTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', '{"name": "Invalid JSON"'); // Missing closing brace
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    public function updateCategoryWithInvalidJsonTest(ApiTester $I)
    {
        $categoryId = $I->haveInDatabase('categories', [
            'name' => 'Categoria Para JSON Inválido',
            'description' => 'Teste de JSON inválido'
        ]);

        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/categories/' . $categoryId, '{"name": "Invalid'); // Invalid JSON
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":false,"error":"Body mal formatado"}');
    }

    public function testCrudWorkflowTest(ApiTester $I)
    {
        // Create
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/categories', [
            'name' => 'Workflow Test',
            'description' => 'Categoria para teste de workflow completo'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $categoryId = $I->grabFromDatabase('categories', 'id', ['name' => 'Workflow Test']);

        // Read (Show)
        $I->sendGet('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'id' => $categoryId,
                'name' => 'Workflow Test',
                'description' => 'Categoria para teste de workflow completo'
            ]
        ]);

        // Update
        $I->sendPut('/categories/' . $categoryId, [
            'name' => 'Workflow Test Updated',
            'description' => 'Descrição atualizada'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeInDatabase('categories', [
            'id' => $categoryId,
            'name' => 'Workflow Test Updated',
            'description' => 'Descrição atualizada'
        ]);

        // Delete
        $I->sendDelete('/categories/' . $categoryId);
        $I->seeResponseCodeIsSuccessful();
        $I->dontSeeInDatabase('categories', ['id' => $categoryId]);
    }
}
