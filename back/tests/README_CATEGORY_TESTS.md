# Category CRUD Tests Documentation

This document describes the comprehensive test suite for the Category CRUD functionality using Codeception.

## Test Files

### 1. CategoryCest.php
Main API test file covering all CRUD operations for categories.

**Test Coverage:**
- ✅ Create category with name and description
- ✅ Create category without description
- ✅ Create category with empty description
- ✅ Create category validation (missing name, blank name, whitespace name)
- ✅ Create category with invalid JSON
- ✅ List all categories
- ✅ Show specific category
- ✅ Show non-existent category
- ✅ Update category (name and description)
- ✅ Update category without description
- ✅ Update category validation (blank name, whitespace name)
- ✅ Update non-existent category
- ✅ Update with invalid JSON
- ✅ Delete category
- ✅ Delete non-existent category
- ✅ Create multiple categories
- ✅ Test with maximum field lengths
- ✅ Test with special characters and Unicode
- ✅ Complete CRUD workflow test

### 2. CategoryBusinessLogicCest.php
Advanced test file focusing on business logic and edge cases.

**Test Coverage:**
- ✅ Name trimming functionality
- ✅ Null description handling
- ✅ Partial updates (name only)
- ✅ ID handling (string vs integer)
- ✅ Invalid ID format handling
- ✅ Unicode and emoji support
- ✅ HTML entities handling
- ✅ Empty list response format
- ✅ Maximum length boundaries
- ✅ ID preservation during updates
- ✅ Concurrent operations
- ✅ Mixed case handling
- ✅ Response format consistency

## Running the Tests

### Prerequisites
1. Ensure the database migration for categories has been run:
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

2. Make sure the test database is configured in `tests/Api.suite.yml`

### Running All Category Tests
```bash
# From the back directory
vendor/bin/codecept run Api CategoryCest
vendor/bin/codecept run Api CategoryBusinessLogicCest
```

### Running Specific Tests
```bash
# Run a specific test method
vendor/bin/codecept run Api CategoryCest:createCategoryTest

# Run with verbose output
vendor/bin/codecept run Api CategoryCest -v

# Run with debug output
vendor/bin/codecept run Api CategoryCest --debug
```

### Running All API Tests
```bash
vendor/bin/codecept run Api
```

## Test Structure

### API Test Pattern
Following Codeception best practices, each test:

1. **Setup**: Uses `_before()` method for common setup
2. **HTTP Headers**: Sets appropriate Content-Type headers
3. **Request**: Sends HTTP request with test data
4. **Assertions**: Verifies response code, format, and content
5. **Database Verification**: Checks database state when applicable

### Example Test Structure
```php
public function createCategoryTest(ApiTester $I)
{
    // Set headers
    $I->haveHttpHeader('Content-Type', 'application/json');
    
    // Send request
    $I->sendPost('/categories', [
        'name' => 'Test Category',
        'description' => 'Test Description'
    ]);
    
    // Verify response
    $I->seeResponseCodeIsSuccessful();
    $I->seeResponseIsJson();
    $I->seeResponseContains('{"success":true,"data":"Categoria cadastrada com sucesso!"}');
    
    // Verify database
    $I->seeInDatabase('categories', [
        'name' => 'Test Category',
        'description' => 'Test Description'
    ]);
}
```

## Test Data Management

### Database Cleanup
The test suite uses Codeception's database cleanup feature configured in `Api.suite.yml`:
```yaml
Db:
    cleanup: true
```

This ensures each test starts with a clean database state.

### Test Data Creation
Tests use two approaches for data creation:

1. **Direct Database Insertion** (for setup):
   ```php
   $categoryId = $I->haveInDatabase('categories', [
       'name' => 'Setup Category',
       'description' => 'Setup Description'
   ]);
   ```

2. **API Calls** (for testing the actual functionality):
   ```php
   $I->sendPost('/categories', ['name' => 'API Category']);
   ```

## Validation Tests

### Required Field Validation
- Tests ensure `name` field is required
- Tests verify proper error messages for missing/empty names
- Tests check whitespace-only names are rejected

### Data Type Validation
- Tests verify JSON parsing errors are handled
- Tests check ID parameter validation
- Tests ensure proper HTTP status codes

### Length Validation
- Tests verify maximum field lengths (name: 50 chars, description: 255 chars)
- Tests check behavior at boundary conditions

## Error Handling Tests

### HTTP Status Codes
- **200**: Successful operations (GET, PUT, DELETE)
- **201**: Successful creation (POST)
- **4xx**: Client errors (not found, validation errors)
- **5xx**: Server errors (invalid JSON, missing required fields)

### Error Response Format
All error responses follow the format:
```json
{
    "success": false,
    "error": "Error message in Portuguese"
}
```

## Integration with Context7

These tests follow Codeception best practices as documented in Context7:

1. **Clear Test Names**: Each test method name clearly describes what it tests
2. **Single Responsibility**: Each test focuses on one specific scenario
3. **Proper Assertions**: Uses appropriate Codeception assertion methods
4. **Database Verification**: Verifies both API responses and database state
5. **Error Testing**: Comprehensive error condition testing
6. **Edge Cases**: Tests boundary conditions and special characters

## Continuous Integration

### Test Execution Order
Tests are designed to be independent and can run in any order. However, some tests depend on data created by previous tests in the same file.

### Performance Considerations
- Tests use database transactions for cleanup
- Minimal test data creation
- Efficient database queries for verification

## Extending the Tests

### Adding New Test Cases
1. Follow the existing naming convention: `{action}{condition}Test`
2. Use appropriate HTTP methods and assertions
3. Include both positive and negative test cases
4. Verify database state when applicable

### Test Categories
- **Happy Path**: Normal successful operations
- **Validation**: Input validation and error handling
- **Edge Cases**: Boundary conditions and special scenarios
- **Business Logic**: Domain-specific rules and constraints

## Troubleshooting

### Common Issues
1. **Database Connection**: Ensure test database is accessible
2. **Migration State**: Run migrations before testing
3. **Test Data**: Check for data conflicts between tests
4. **HTTP Headers**: Ensure proper Content-Type headers

### Debug Mode
Run tests with `--debug` flag to see detailed HTTP requests and responses:
```bash
vendor/bin/codecept run Api CategoryCest --debug
```
