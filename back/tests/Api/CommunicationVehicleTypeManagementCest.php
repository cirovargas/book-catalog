<?php

declare(strict_types=1);

namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

class CommunicationVehicleTypeManagementCest
{
    private string $adminToken;

    public function _before(ApiTester $I): void
    {
        // Create admin user for testing
        $I->haveInDatabase('app_user', [
            'email' => 'admin@test.com',
            'password' => '$2y$13$UAKxwdTz796wnEfLvx54euNNd9Y6cy1M73xkJQBOS8aslYpZkQqs.', // admin123
            'roles' => '["ROLE_USER", "ROLE_ADMIN"]',
            'created_at' => '2025-01-01 00:00:00',
            'updated_at' => '2025-01-01 00:00:00',
        ]);

        // Login as admin to get token
        $I->sendPOST('/login_check', [
            'username' => 'admin@test.com',
            'password' => 'admin123',
        ]);
        $I->seeResponseCodeIs(200);
        $response = $I->grabResponse();
        $data = json_decode($response, true);
        $this->adminToken = $data['token'];
    }

    public function testAdminCanListCommunicationVehicleTypes(ApiTester $I): void
    {
        // Create test data
        $I->haveInDatabase('communication_vehicle_types', [
            'name' => 'Television',
            'description' => 'TV broadcast media',
            'status' => 'active',
        ]);

        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/communication-vehicle-types');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
        ]);
        $I->seeResponseJsonMatchesJsonPath('$.data[0].name');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].status');
    }

    public function testAdminCanCreateCommunicationVehicleType(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/communication-vehicle-types', [
            'name' => 'Radio',
            'description' => 'Radio broadcast media',
            'status' => 'active',
        ]);
        $I->seeResponseCodeIs(201);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'Tipo de veículo de comunicação cadastrado com sucesso!',
        ]);

        // Verify was created in database
        $I->seeInDatabase('communication_vehicle_types', [
            'name' => 'Radio',
            'status' => 'active',
        ]);
    }

    public function testAdminCanCreateInactiveCommunicationVehicleType(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/communication-vehicle-types', [
            'name' => 'Print Media',
            'description' => 'Newspapers and magazines',
            'status' => 'inactive',
        ]);
        $I->seeResponseCodeIs(201);
        $I->seeResponseIsJson();

        // Verify was created as inactive
        $I->seeInDatabase('communication_vehicle_types', [
            'name' => 'Print Media',
            'status' => 'inactive',
        ]);
    }

    public function testCreateCommunicationVehicleTypeWithoutName(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/communication-vehicle-types', [
            'description' => 'Test description',
        ]);
        $I->seeResponseCodeIs(400);
        $I->seeResponseContainsJson([
            'success' => false,
        ]);
    }

    public function testAdminCanGetCommunicationVehicleTypeDetails(ApiTester $I): void
    {
        $I->haveInDatabase('communication_vehicle_types', [
            'id' => 1,
            'name' => 'Internet',
            'description' => 'Online media',
            'status' => 'active',
        ]);

        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/communication-vehicle-types/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'id' => 1,
                'name' => 'Internet',
                'status' => 'active',
            ],
        ]);
    }

    public function testGetNonExistentCommunicationVehicleType(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/communication-vehicle-types/999');
        $I->seeResponseCodeIs(404);
    }

    public function testAdminCanUpdateCommunicationVehicleType(ApiTester $I): void
    {
        $I->haveInDatabase('communication_vehicle_types', [
            'id' => 1,
            'name' => 'Old Name',
            'description' => 'Old description',
            'status' => 'active',
        ]);

        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPUT('/communication-vehicle-types/1', [
            'name' => 'Updated Name',
            'description' => 'Updated description',
            'status' => 'inactive',
        ]);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'Tipo de veículo de comunicação atualizado com sucesso!',
        ]);

        // Verify was updated in database
        $I->seeInDatabase('communication_vehicle_types', [
            'id' => 1,
            'name' => 'Updated Name',
            'status' => 'inactive',
        ]);
    }

    public function testUpdateNonExistentCommunicationVehicleType(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPUT('/communication-vehicle-types/999', [
            'name' => 'Test Name',
        ]);
        $I->seeResponseCodeIs(404);
    }

    public function testAdminCanDeleteCommunicationVehicleType(ApiTester $I): void
    {
        $I->haveInDatabase('communication_vehicle_types', [
            'id' => 1,
            'name' => 'To Delete',
            'description' => 'Will be deleted',
            'status' => 'active',
        ]);

        $I->amBearerAuthenticated($this->adminToken);
        $I->sendDELETE('/communication-vehicle-types/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'Tipo de veículo de comunicação excluído com sucesso!',
        ]);

        // Verify was deleted from database
        $I->dontSeeInDatabase('communication_vehicle_types', [
            'id' => 1,
        ]);
    }

    public function testDeleteNonExistentCommunicationVehicleType(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendDELETE('/communication-vehicle-types/999');
        $I->seeResponseCodeIs(404);
    }

    public function testUnauthenticatedUserCannotAccessCommunicationVehicleTypes(ApiTester $I): void
    {
        $I->sendGET('/communication-vehicle-types');
        $I->seeResponseCodeIs(401);
    }
}

