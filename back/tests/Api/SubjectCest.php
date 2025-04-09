<?php

declare(strict_types=1);


namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

final class SubjectCest
{
    public function _before(ApiTester $I): void
    {
        // Code here will be executed before each test.
    }

    public function createSubjectTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/subjects', [
            'description' => 'Teste subject'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Assunto cadastrado com sucesso!"}');
        $I->seeInDatabase('subjects', ['description' => 'Teste subject']);

    }

    public function createSubject2Test(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/subjects', [
            'description' => 'Teste subject2'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Assunto cadastrado com sucesso!"}');
        $I->seeInDatabase('subjects', ['description' => 'Teste subject2']);

    }

    public function createSubjectWithNoDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/subjects');
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":false,"error":"Body mal formatado"}');
    }

    public function createSubjectWithBlankDescriptionTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json; charset=utf-8');
        $I->sendPost('/subjects', [
            'description' => ''
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();
    }

    public function updateBlankDescriptionSubjectTest(ApiTester $I)
    {
        $subjectId = $I->grabFromDatabase('subjects', 'id', ['description' => 'Teste subject2']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/subjects/'.$subjectId, [
            'description' => ''
        ]);
        $I->seeResponseCodeIsServerError();
        $I->seeResponseIsJson();

    }

    public function updateSubjectTest(ApiTester $I)
    {
        $subjectId = $I->grabFromDatabase('subjects', 'id', ['description' => 'Teste subject']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/subjects/'.$subjectId, [
            'description' => 'Novo subject'
        ]);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeResponseContains('{"success":true,"data":"Assunto atualizado com sucesso!"}');
        $I->seeInDatabase('subjects', ['description' => 'Novo subject']);

    }

    public function updateNotFoundSubjectTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPut('/subjects/99', [
            'description' => 'alterar subject'
        ]);
        $I->canSeeResponseCodeIsClientError();
        $I->seeResponseIsJson();
    }

    public function deleteSubjectTest(ApiTester $I)
    {
        $subjectId = $I->grabFromDatabase('subjects', 'id', ['description' => 'Teste subject2']);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/subjects/'.$subjectId);
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->dontSeeInDatabase('subjects', ['description' => 'Teste subject2']);

    }

    public function deleteNotFoundSubjectTest(ApiTester $I)
    {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendDelete('/subjects/98');
        $I->seeResponseCodeIsClientError();
        $I->seeResponseIsJson();

    }

}
