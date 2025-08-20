<?php

namespace App\Tests\Api;

use App\Tests\Support\ApiTester;

class UserManagementCest
{
    private string $adminToken;
    private string $userToken;

    public function _before(ApiTester $I): void
    {
        // Create admin user for testing
        $I->haveInDatabase('app_user', [
            'email' => 'admin@test.com',
            'password' => '$2y$13$UAKxwdTz796wnEfLvx54euNNd9Y6cy1M73xkJQBOS8aslYpZkQqs.', // admin123
            'roles' => '["ROLE_USER", "ROLE_ADMIN"]',
            'created_at' => '2025-01-01 00:00:00',
            'updated_at' => '2025-01-01 00:00:00'
        ]);

        // Create regular user for testing
        $I->haveInDatabase('app_user', [
            'email' => 'user@test.com',
            'password' => '$2y$13$UAKxwdTz796wnEfLvx54euNNd9Y6cy1M73xkJQBOS8aslYpZkQqs.', // admin123
            'roles' => '["ROLE_USER"]',
            'created_at' => '2025-01-01 00:00:00',
            'updated_at' => '2025-01-01 00:00:00'
        ]);

        // Login as admin to get token
        $I->sendPOST('/login_check', [
            'username' => 'admin@test.com',
            'password' => 'admin123'
        ]);
        $I->seeResponseCodeIs(200);
        $response = $I->grabResponse();
        $data = json_decode($response, true);
        $this->adminToken = $data['token'];

        // Login as user to get token
        $I->sendPOST('/login_check', [
            'username' => 'user@test.com',
            'password' => 'admin123'
        ]);
        $I->seeResponseCodeIs(200);
        $response = $I->grabResponse();
        $data = json_decode($response, true);
        $this->userToken = $data['token'];
    }

    public function testAdminCanListUsers(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/users');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'pagination' => [
                    'page' => 1,
                    'limit' => 10,
                    'total' => 2,
                    'pages' => 1
                ]
            ]
        ]);
        $I->seeResponseJsonMatchesJsonPath('$.data.users[0].email');
        $I->seeResponseJsonMatchesJsonPath('$.data.users[0].roles');
    }

    public function testRegularUserCannotListUsers(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->userToken);
        $I->sendGET('/users');
        $I->seeResponseCodeIs(403);
    }

    public function testAdminCanCreateUser(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/users', [
            'email' => 'newuser@test.com',
            'password' => 'NewPassword123',
            'roles' => ['ROLE_USER']
        ]);
        $I->seeResponseCodeIs(201);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'User created successfully!'
        ]);

        // Verify user was created in database
        $I->seeInDatabase('app_user', [
            'email' => 'newuser@test.com'
        ]);
    }

    public function testCreateUserWithInvalidEmail(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/users', [
            'email' => 'invalid-email',
            'password' => 'Password123',
            'roles' => ['ROLE_USER']
        ]);
        $I->seeResponseCodeIs(400);
    }

    public function testCreateUserWithWeakPassword(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/users', [
            'email' => 'test@test.com',
            'password' => 'weak',
            'roles' => ['ROLE_USER']
        ]);
        $I->seeResponseCodeIs(400);
    }

    public function testCreateUserWithDuplicateEmail(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPOST('/users', [
            'email' => 'admin@test.com', // Already exists
            'password' => 'Password123',
            'roles' => ['ROLE_USER']
        ]);
        $I->seeResponseCodeIs(409);
        $I->seeResponseContainsJson([
            'success' => false,
            'error' => 'A user with this email already exists'
        ]);
    }

    public function testAdminCanGetUserDetails(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/users/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'id' => 1,
                'email' => 'admin@test.com'
            ]
        ]);
    }

    public function testGetNonExistentUser(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/users/999');
        $I->seeResponseCodeIs(404);
    }

    public function testAdminCanUpdateUser(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendPUT('/users/2', [
            'email' => 'updated@test.com',
            'roles' => ['ROLE_USER', 'ROLE_ADMIN']
        ]);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'User updated successfully!'
        ]);

        // Verify user was updated in database
        $I->seeInDatabase('app_user', [
            'id' => 2,
            'email' => 'updated@test.com'
        ]);
    }

    public function testAdminCanDeleteUser(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendDELETE('/users/2');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => 'User deleted successfully!'
        ]);

        // Verify user was deleted from database
        $I->dontSeeInDatabase('app_user', [
            'id' => 2
        ]);
    }

    public function testRegularUserCannotCreateUser(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->userToken);
        $I->sendPOST('/users', [
            'email' => 'test@test.com',
            'password' => 'Password123',
            'roles' => ['ROLE_USER']
        ]);
        $I->seeResponseCodeIs(403);
    }

    public function testUnauthenticatedUserCannotAccessUsers(ApiTester $I): void
    {
        $I->sendGET('/users');
        $I->seeResponseCodeIs(401);
    }

    public function testUserListPagination(ApiTester $I): void
    {
        // Create additional users for pagination testing
        for ($i = 3; $i <= 15; $i++) {
            $I->haveInDatabase('app_user', [
                'id' => $i,
                'email' => "user{$i}@test.com",
                'password' => '$2y$13$UAKxwdTz796wnEfLvx54euNNd9Y6cy1M73xkJQBOS8aslYpZkQqs.',
                'roles' => '["ROLE_USER"]',
                'created_at' => '2025-01-01 00:00:00',
                'updated_at' => '2025-01-01 00:00:00'
            ]);
        }

        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/users?page=1&limit=5');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'success' => true,
            'data' => [
                'pagination' => [
                    'page' => 1,
                    'limit' => 5,
                    'total' => 15,
                    'pages' => 3
                ]
            ]
        ]);

        // Check that we get exactly 5 users
        $response = $I->grabResponse();
        $data = json_decode($response, true);
        $I->assertCount(5, $data['data']['users']);
    }

    public function testUserSearch(ApiTester $I): void
    {
        $I->amBearerAuthenticated($this->adminToken);
        $I->sendGET('/users?search=admin');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        
        $response = $I->grabResponse();
        $data = json_decode($response, true);
        
        // Should find the admin user
        $I->assertGreaterThan(0, $data['data']['pagination']['total']);
        $I->assertStringContainsString('admin', $data['data']['users'][0]['email']);
    }
}
