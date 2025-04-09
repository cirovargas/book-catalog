<?php

declare(strict_types=1);


namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

final class BookCest
{
    public function _before(ApiTester $I): void
    {
        // Code here will be executed before each test.
    }

    public function createBookTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/books', [
            'title' => 'Teste book'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Livro cadastrado com sucesso!"}');
        $I->seeInDatabase('books', ['title' => 'Teste book']);

    }

    public function createBook2Test(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/books', [
            'title' => 'Teste book2'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Livro cadastrado com sucesso!"}');
        $I->seeInDatabase('books', ['title' => 'Teste book2']);

    }

    public function createBookWithNoDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/books');
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":false,"error":"Body mal formatado"}');
    }

    public function createBookWithBlankDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json; charset=utf-8');
        $I->sendPost('/books', [
            'title' => ''
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
    }

    public function updateBlankDescriptionBookTest(ApiTester $I)
    {
        $bookId = $I->grabFromDatabase('books', 'id', ['title' => 'Teste book2']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/books/'.$bookId, [
            'title' => ''
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();

    }

    public function updateBookTest(ApiTester $I)
    {
        $bookId = $I->grabFromDatabase('books', 'id', ['title' => 'Teste book']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/books/'.$bookId, [
            'title' => 'Novo book'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Livro atualizado com sucesso!"}');
        $I->seeInDatabase('books', ['title' => 'Novo book']);

    }

    public function updateNotFoundBookTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/books/99', [
            'title' => 'alterar book'
        ]);
        $I->canSeeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    public function deleteBookTest(ApiTester $I)
    {
        $bookId = $I->grabFromDatabase('books', 'id', ['title' => 'Teste book2']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/books/'.$bookId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->dontSeeInDatabase('books', ['title' => 'Teste book2']);

    }

    public function deleteNotFoundBookTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/books/98');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();

    }


}
