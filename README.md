# Innovate Future

A modern SaaS platform for study tour agencies to manage their operations efficiently and offer tailored services to multiple user roles, including agency admins, tour leaders, parents, and children.

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Development Setup](#development-setup)
   - [Docker Environment](#docker-environment)
5. [Contributing](#contributing)
6. [License](#license)

## Description

This platform empowers study tour agencies to manage their tours, templates, and staff while providing role-specific dashboards for leaders, parents, and children. Agencies can use tools like Tour Templates, Day Templates, and Event Templates for faster creation. Parents can track their children via real-time GPS, and children can access AI-powered translations and personalized tour details.

## Features

### For Agencies

- User Management: Add employees, assign roles, and manage access
- Tour Management:
  - Create and assign tours using prebuilt templates
  - Reusable templates for days, events, and schedules
- Custom Configurations: Tailor marketplace and GPS tracking features

### For Parents

- Account Management: Register children and manage accounts
- Real-Time GPS Tracking: Monitor your child's location during tours
- Notifications: Stay updated on tour events and schedules

### For Children

- AI Translation: Access tour information in your preferred language
- Personalized Dashboard: View schedules, guides, and event details

## Tech Stack

- **Frontend Framework:** React.js, TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **Testing:** Vitest, React Testing Library
- **HTTP Client:** Axios

## Development Setup

### Docker Environment

Prerequisites:

- Docker Desktop installed and running
- Git

Steps:

1. Clone the repository:

```bash
git clone https://github.com/Innovate-Future-Foundation/Frontend.git
cd Frontend
```

2. Start the development environment:

```bash
docker-compose up --build
```

The application will be available at <http://localhost:5173>

Docker Development Commands:

```bash
# Start the environment
docker-compose up

# Stop the environment
docker-compose down

# Run tests
docker-compose exec frontend npm run test

# Run lint
docker-compose exec frontend npm run lint

# Format code
docker-compose exec frontend npm run format
```

Prerequisites:

- Node.js (v18+)
- npm

Steps:

1. Clone the repository:

```bash
git clone https://github.com/Innovate-Future-Foundation/Frontend.git
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NODE_ENV=development
VITE_REACT_APP_INNOVATE_FUTURE_API_BASE_URL=https://api.example.com
```

4. Start the development server:

```bash
npm run dev
```

## Available Commands

| Command            | Description          |
| ------------------ | -------------------- |
| `npm install`      | Install dependencies |
| `npm run dev`      | Start dev server     |
| `npm run test`     | Run tests            |
| `npm run coverage` | Test coverage        |
| `npm run prepare`  | Setup Husky          |
| `npm run lint`     | Run ESLint           |
| `npm run format`   | Format code          |

## Contributing

### Branch Naming Convention

- **Feature branches**: `feature/IF-<number>-<description>`

  - Used for new features visible to the user.
  - Example: `feature/IF-1-user-login`

- **Bug fix branches**: `bugfix/IF-<number>-<description>`

  - Used for fixes to user-facing bugs.
  - Example: `bugfix/IF-2-fix-login-error`

- **Documentation branches**: `docs/IF-<number>-<description>`

  - Used for changes to documentation (e.g., README updates, API docs).
  - Example: `docs/IF-3-update-api-docs`

- **Style branches**: `style/IF-<number>-<description>`

  - Used for code style updates, like formatting or fixing linting issues.
  - Example: `style/IF-4-code-formatting`

- **Refactor branches**: `refactor/IF-<number>-<description>`

  - Used for refactoring production code without adding features or fixing bugs.
  - Example: `refactor/IF-5-rename-login-service`

- **Test branches**: `test/IF-<number>-<description>`

  - Used for adding or updating tests without modifying production code.
  - Example: `test/IF-6-add-login-unit-tests`

- **Chore branches**: `chore/IF-<number>-<description>`
  - Used for non-production tasks like updating build scripts or dependencies.
  - Example: `chore/IF-7-update-dependencies`

---

### Naming Guidelines

1. **Consistency**: Use all lowercase, and separate words in the description with hyphens (`-`).
2. **Descriptive**: The description should provide a clear understanding of the branch's purpose.
3. **Issue Tracking**: `<number>` should match the issue or task ID from your project management system (e.g., JIRA, GitHub Issues).

### Development Workflow

1. Create a new branch following the naming convention
2. Make your changes
3. Run tests and lint checks
4. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


