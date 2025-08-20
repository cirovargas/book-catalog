# AI Agent Guidelines for Book Catalog Project

## Project Overview

This is a full-stack book catalog application with:
- **Backend**: PHP 8.4 + Symfony 7.3 with Domain-Driven Design (DDD) architecture
- **Frontend**: React Router 7 + TypeScript + TailwindCSS + Shadcn UI
- **Database**: PostgreSQL with Doctrine ORM
- **Testing**: Codeception for backend, comprehensive quality gates
- **Architecture**: Clean Architecture with CQRS pattern, Event-driven design
- **Environment**: Dockerized development environment with docker compose

### Project folder structure

#### The root `env` folder

Folder where is stored the local environment files including docker, compose, nginx, env and PHP configurations

#### The root `back` folder

Folder where is the backend codebase with a PHP and Symfony API project

#### The root `front` folder

Folder where is the frontend codebase with a Javascript and React project

## Core Architecture Principles

### Backend Structure
```
back/
├── core/           # Domain and Application layer (DDD) - Pure business logic
├── src/            # Infrastructure layer - Framework implementations
├── config/         # Symfony configuration
└── tests/          # Codeception tests
```

### Domain-Driven Design Guidelines
- **Domain Models** (`core/Model/`): Pure business entities, no framework dependencies
- **Application Services** (`core/Application/`): Interfaces for infrastructure
- **Infrastructure** (`src/`): Symfony implementations of domain interfaces
- **Commands/Handlers**: CQRS pattern for write operations
- **Events**: Domain events for side effects

## Code Generation Best Practices

### 1. Backend Development

- Write concise, technical responses with accurate PHP/Symfony examples
- Prioritize SOLID principles for object-oriented programming and clean architecture
- Follow PHP and Symfony best practices, ensuring consistency and readability
- Design for scalability and maintainability, ensuring the system can grow with ease
- Prefer iteration and modularization over duplication to promote code reuse
- Use consistent and descriptive names for variables, methods, and classes to improve readability
- Use context7 to get the actual documentation and examples
- Follow Clean code and object calisthenics principles
- Avoid creating getters and setters when possible, priorize behavior over data
- Use constructor to model data


#### PHP and Symfony Standards
- Leverage PHP 8.4+ features when appropriate (e.g., typed properties, match expressions)
- Adhere to PSR-12 coding standards for consistent code style
- Always use strict typing: declare(strict_types=1)
- Utilize Symfony's built-in features and components to maximize efficiency
- Follow Symfony's directory structure and bundle organization
- Implement robust error handling and logging:
  > Use Symfony's exception handling and Monolog for logging
  > Create custom exceptions when necessary
  > Employ try-catch blocks for expected exceptions
- Use Symfony's validation component for form and request data
  > Dont use the validation component in domain commands, validate the data in the handler
- Implement event listeners and subscribers for cross-cutting concerns
- Utilize Doctrine ORM for database interactions
- Use Doctrine Query Builder for complex database operations
- Create and maintain proper Doctrine migrations


#### Symfony Best Practices
- Use Doctrine ORM and DQL over raw SQL queries when possible
- Implement Repository and Service patterns for better code organization and reusability
- Utilize Symfony Security component for authentication and authorization
- Leverage Symfony Cache component (Redis, Memcached) for improved performance
- Use Messenger component for handling asynchronous tasks and message queues
- Implement comprehensive testing using Codeception for unit, functional, and E2E tests
- Implement proper error handling using Symfony's error handler and logging system
- Implement database indexing and use Doctrine's query optimization features
- Use Symfony Profiler for debugging and performance monitoring in development
- Implement proper security measures, including CSRF protection, XSS prevention, and input sanitization

## Code Architecture

### Naming Conventions
- Use consistent naming conventions for folders, classes, and files
- Follow Symfony's conventions: singular for entities, suffix with Controller for controllers
- Use PascalCase for class names, camelCase for method names, and snake_case for database columns

### Controller Design
- Controllers should be final classes to prevent inheritance
- Make controllers read-only (i.e., no property mutations)
- Use constructor injection for dependencies
- Keep controllers thin, delegating business logic to services

### Entity Design
- Entities should be final classes to ensure data integrity
- Use attributes or annotations for Doctrine mapping
- Implement value objects for complex properties

### Services
- Create services in the `src/Service` directory
- Organize services into domain-specific directories
- Service classes should be final and immutable
- Use services for complex business logic
- Tag services appropriately for automatic configuration

### Routing
- Use attributes for route definitions
- Maintain consistent and organized routes
- Group related routes using route prefixes
- Consider using subdirectories for controller organization

### Type Declarations
- Always use explicit return type declarations
- Use appropriate PHP type hints for method parameters
- Leverage PHP 8.1+ features like union types and nullable types

### Data Type Consistency
- Be explicit with data type declarations
- Use type hints for properties, method parameters, and return types
- Leverage PHP's strict typing
- Use DTOs for data transfer between layers

### Error Handling
- Use Symfony's exception handling system
- Create custom exceptions when necessary
- Use try-catch blocks for expected exceptions
- Return appropriate HTTP status codes and error responses

### Dependency Injection
- Use constructor injection as the primary DI method
- Configure services in services.yaml
- Use service tags for automatic configuration
- Leverage autowiring and autoconfiguration

### Event System
- Use event dispatching for loose coupling
- Create domain events for business logic
- Implement event subscribers for complex event handling
- Use message bus for command and query separation

### Security
- Implement security using the Security component
- Use voters for fine-grained authorization
- Implement proper password hashing
- Use security advisors when needed

### Performance
- Use appropriate caching strategies
- Implement lazy loading where beneficial
- Use Doctrine's batch processing for large datasets
- Optimize Doctrine queries and indexing

### Testing
- Write unit tests for business logic using Codeception
- Create functional tests for controllers using Codeception
- Use Codeception for E2E testing
- Implement fixtures for test data

## Key Points
- Follow Symfony's directory structure and bundle organization, put infrastructure and application implementations in src folder and domain and application interfaces code in the core folder
- Use dependency injection and services for business logic
- Leverage Symfony's components effectively
- Maintain clean and maintainable code
- Document code thoroughly
- Write comprehensive tests
- For side effects, use events and message bus
- Use Doctrine Query Builder for queries
- For complex business logic, use domain events
- The domain code cant use src and code from framework or libraries, use application interfaces to communicate with the domain

#### Entity Creation Pattern
```php
// 1. Create domain model in core/Model/EntityName/
class EntityName {
    // Pure business logic, no annotations, constructor injection, getters and setters only if necessary, doc blocks for array/iterable types
}

// 2. Create infrastructure entity in src/Entity/
class EntityName extends \DDD\Model\EntityName\EntityName {
    // Doctrine-specific and Symfony implementations
}

// 3. Create repository interface in core/
interface EntityRepositoryInterface extends AbstractRepository {
    public function get(int $id): ?EntityName;
}

// 4. Implement repository in src/Repository/
class EntityRepository extends ServiceEntityRepository implements EntityRepositoryInterface {
    // Doctrine implementation
}
```

#### Command/Handler Pattern
```php
// Command (core/Model/EntityName/Command/)
readonly class CreateEntityCommand {
    public function __construct(
        private string $property1,
        private ?string $property2 = null
    ) {}
    
    // only getters, doc blocks for array/iterable types

}

// Handler (core/Model/EntityName/Handler/)
class CreateEntityHandler {
    public function __invoke(CreateEntityCommand $command): void {
        // Business logic implementation
    }
}
```

### 2. Frontend Development

You are a Senior Front-End Developer and an Expert in ReactJS, JavaScript, TypeScript, HTML, CSS and modern UI/UX frameworks (e.g., Bootstrap, Shadcn, Radix). You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

- Follow the user's requirements carefully & to the letter.
- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.
- Confirm, then write code!
- Always write correct, best practice, DRY principle (Dont Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines .
- Focus on easy and readability code, over being performant.
- Fully implement all requested functionality.
- Leave NO todo's, placeholders or missing pieces.
- Ensure code is complete! Verify thoroughly finalised.
- Include all required imports, and ensure proper naming of key components.
- Be concise Minimize any other prose.
- If you think there might not be a correct answer, you say so.
- If you do not know the answer, say so, instead of guessing.
- Use context7 to get the actual documentation and examples


#### Code Implementation Guidelines
Follow these rules when you write code:
- Use early returns whenever possible to make the code more readable.
- Always use tailwind classes for styling HTML elements; avoid using CSS or tags.
- Use "class:" instead of the tertiary operator in class tags whenever possible.
- Use descriptive variable and function/const names. Also, event functions should be named with a "handle" prefix, like "handleClick" for onClick and "handleKeyDown" for onKeyDown.
- Implement accessibility features on elements. For example, a tag should have a tabindex="0", aria-label, on:click, and on:keydown, and similar attributes.
- Use consts instead of functions, for example, "const toggle = () =>". Also, define a type if possible.
- use the `front/app/components` folder only for global components, for page specific components use the `front/app/pages` folder

#### Component Structure
```typescript
// Use functional components with hooks
export default function ComponentName() {
  const { data, loading } = useApiHook()
  
  if (loading) return <LoadingSpinner />
  
  return (
    <div className="container mx-auto p-4">
      {/* Component content */}
    </div>
  )
}
```

#### API Integration Pattern
```typescript
// Use axios with proper error handling
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

// Custom hooks for data fetching
export function useEntityData(id: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Fetch logic with error handling
  }, [id])
  
  return { data, loading, error }
}
```

## Testing Strategy

### Backend Testing (Codeception)

#### Test Structure
```php
// API Tests (tests/Api/)
class EntityCest {
    public function createEntityTest(ApiTester $I): void {
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendPost('/entities', $this->getValidEntityData());
        $I->seeResponseCodeIsSuccessful();
        $I->seeResponseIsJson();
        $I->seeInDatabase('entities', ['name' => 'Test Entity']);
    }
    
    private function getValidEntityData(): array {
        return [
            'name' => 'Test Entity',
            'description' => 'Test Description'
        ];
    }
}
```

#### Test Helpers
- Use `CategoryTestHelper` pattern for reusable test utilities
- Create data builders for complex test scenarios
- Implement database assertions for data integrity

### Quality Gates Process

#### Mandatory Quality Checks


1. Develop the new functionality execute the steps below, run inside the PHP container (the cointeiner is on the docker-compose file on the env/dev folder) these commands in order:
```bash
# 1. Code fixing
./vendor/bin/rector --clear-cache
./vendor/bin/php-cs-fixer fix core
./vendor/bin/php-cs-fixer fix src
./vendor/bin/phpcbf src core

# 2. Code validation
./vendor/bin/phpmd . text phpmd.xml --exclude 'tests/*,vendor/*,var/*,migrations/*,utils/*'
./vendor/bin/phpcs src core
./vendor/bin/phpstan analyse -l 10 src core
./vendor/bin/codecept run
```
2. If any of the commands fail, you need to fix the issues and go back to step 1
3. Go to the frontend and test the new functionality in the browser using Playright
4. If all the tests pass, you can commit your changes


## Token Optimization Strategies

### 1. Efficient Code Retrieval
- Use specific search queries for codebase-retrieval
- Request only relevant code sections
- Focus on interfaces and contracts first
- Avoid retrieving large configuration files unless necessary

### 2. Targeted Information Gathering
```markdown
# Good: Specific request
"Show me the User entity, UserRepository interface, and CreateUserHandler implementation"

# Bad: Broad request  
"Show me all user-related code"
```

### 3. Incremental Development
- Start with interfaces and contracts
- Implement core business logic first
- Add infrastructure implementations last
- Test each layer independently

## Speed and Quality Guidelines

### 1. Development Workflow
1. **Analyze Requirements**: Understand business rules first
2. **Design Interfaces**: Define contracts before implementation
3. **Implement Domain Logic**: Pure business logic in `core/`
4. **Add Infrastructure**: Framework-specific code in `src/`
5. **Write Tests**: Comprehensive test coverage
6. **Run Quality Gates**: Ensure code quality

### 2. Code Reuse Patterns
- Leverage existing abstractions (`AbstractRepository`, `ServiceEntityRepository`)
- Follow established naming conventions
- Use existing event patterns for side effects
- Reuse validation patterns and exception handling

### 3. Performance Considerations
- Use Doctrine Query Builder for queries
- Implement proper database indexing
- Use Symfony's dependency injection effectively
- Cache frequently accessed data

## Common Patterns and Conventions

### Naming Conventions
- **Entities**: PascalCase singular (`User`, `Category`)
- **Commands**: `{Action}Command` (`CreateUserCommand`)
- **Handlers**: `{Action}Handler` (`CreateUserHandler`)
- **Events**: `{Action}Event` (`UserRegisteredEvent`)
- **Repositories**: `{Entity}Repository` + Interface

### Error Handling
```php
// Domain exceptions
class EntityNotFoundException extends \Exception {}

// Controller error responses
return $this->jsonNotFoundResponse('Entity not found');
return $this->jsonErrorResponse('Validation failed', 400);
```

### Event-Driven Architecture
```php
// Record events in handlers
$this->eventRecorder->record(new EntityCreatedEvent($entity));

// Handle events in subscribers
class EntitySubscriber implements EventSubscriberInterface {
    public static function getSubscribedEvents(): array {
        return [EntityCreatedEvent::class => 'onEntityCreated'];
    }
}
```

## Frontend Best Practices

### Component Organization
- Use feature-based folder structure
- Use components folder inside the page folder when the component is only used in that page
- Use components folder in app folder for global components
- Implement proper TypeScript types
- Use Zod for runtime validation
- Follow React Router 7 patterns

### State Management
- Use Zustand for global state
- Implement proper loading states
- Handle errors gracefully
- Use React Hook Form for forms

### Styling Guidelines
- Use TailwindCSS utility classes
- Follow design system patterns
- Implement responsive design
- Use Shadcn UI components

## Security Considerations

### Backend Security
- Use Symfony Security component
- Implement proper authentication/authorization
- Validate all inputs
- Use parameterized queries

### Frontend Security
- Sanitize user inputs
- Implement proper CORS handling
- Use secure authentication tokens
- Validate API responses

## Deployment and Environment

### Docker Configuration
- Use provided docker-compose setup in `env/`
- Separate development and production configurations
- Implement proper environment variables
- Use PostgreSQL for all environments
- When needed to run PHP tests, scripts, etc Use the `php` service in the docker compose file

### Database Management
- Use Doctrine migrations for schema changes
- Implement proper indexing strategies
- Use connection pooling for performance
- Regular backup strategies

## Agent Roles (logical multi-agent)
- **Architect/Design:** modeling, contracts, antifragility, security.
- **Builder:** incremental implementation with TDD/UT/IT.
- **Librarian (RAG):** consult docs with **Context7**, cite versions.
- **QA/Triage:** run quality gate; require refactors on failure.
- **E2E Runner:** Playwright setup, execution, artifacts.
- **Token Optimizer:** apply Section 6 techniques.

## Standard Workflow (plan → verification)
1) **PLAN:** user story, acceptance criteria, routes/DTOs, components, migrations, risks.
2) **Incremental implementation** .
3) **Tests:** create/update codeception tests (back).
4) **Quality Gate (blocking):** linters/static/formatters/rector.
5) **Run E2E tests** using Playwright.
5) **Reports:** store under `./reports/**` (coverage, lint, playwright).
6) **Delivery summary:** what changed, how to validate, risks & rollback.
7) **Documentation:** update README, API docs (adr, haiku and diagrams with mermaid), etc.

## Quick Runbooks
- **Bring up env:** `<docker compose up -d | pnpm dev>`
- **Quality Gate:** `<detected scripts>`
- **API Tests:** `<composer test>`
