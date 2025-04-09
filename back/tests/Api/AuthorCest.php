<?php

declare(strict_types=1);


namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

final class AuthorCest
{
    public function _before(ApiTester $I): void
    {
        // Code here will be executed before each test.
    }

    public function createAuthorTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/authors', [
            'name' => 'Teste author'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Autor cadastrado com sucesso!"}');
        $I->seeInDatabase('authors', ['name' => 'Teste author']);

    }

    public function createAuthor2Test(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/authors', [
            'name' => 'Teste author2'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Autor cadastrado com sucesso!"}');
        $I->seeInDatabase('authors', ['name' => 'Teste author2']);

    }

    public function createAuthorWithNoDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/authors');
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":false,"error":"Body mal formatado"}');
    }

    public function createAuthorWithBlankDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json; charset=utf-8');
        $I->sendPost('/authors', [
            'name' => ''
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
    }

    public function updateBlankDescriptionAuthorTest(ApiTester $I)
    {
        $authorId = $I->grabFromDatabase('authors', 'id', ['name' => 'Teste author2']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/authors/'.$authorId, [
            'name' => ''
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();

    }

    public function updateAuthorTest(ApiTester $I)
    {
        $authorId = $I->grabFromDatabase('authors', 'id', ['name' => 'Teste author']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/authors/'.$authorId, [
            'name' => 'Novo author'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Autor atualizado com sucesso!"}');
        $I->seeInDatabase('authors', ['name' => 'Novo author']);

    }

    public function updateNotFoundAuthorTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/authors/99', [
            'name' => 'alterar author'
        ]);
        $I->canSeeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    public function deleteAuthorTest(ApiTester $I)
    {
        $authorId = $I->grabFromDatabase('authors', 'id', ['name' => 'Teste author2']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/authors/'.$authorId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->dontSeeInDatabase('authors', ['name' => 'Teste author2']);

    }

    public function deleteNotFoundAuthorTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/authors/98');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();

    }

}
