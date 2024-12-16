# BLMS (Blended Learning Management System)

## Project Overview

BLMS is a comprehensive e-learning platform built with NestJS on the backend, designed to enhance the online learning experience by providing a robust set of features for students, instructors, and administrators.

## Technologies Used

- **Backend**:
  - NestJS (Node.js framework)
  - TypeScript
- **Frontend**:
  - ReactJS / Flutter
- **Database**:
  - PostgreSQL
- **ORM**:
  - TypeORM
- **Authentication**:
  - Passport.js
  - JWT
- **Real-time Communication**:
  - Socket.IO
  - WebSocket

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- NestJS CLI
- PostgreSQL

## Installation

### 1. Install NestJS CLI Globally

```bash
npm install -g @nestjs/cli
```

### 2. Clone the Repository

```bash
git clone https://github.com/HanyMedhat10/BLMS-Graduation-Project.git
cd blms-project
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```
# Database Configuration
PGHOST=
PGPORT=
PGUSER=
PGPASSWORD=
PGDATABASE=

# Mail Configuration
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=
DEFAULT_MAIL_FROM=

# Email Admin Configuration
ADMIN_USERNAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=

# Application Configuration
PORT=3000

# Application Name
APP_NAME=
```

### 5. Database Setup

```bash
# Run migrations
npm run migration:run

# (Optional) Seed database
npm run seed
```

### 6. Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Project Structure

```
blms-project/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── clerk/
│   │   │   ├── college/
│   │   │   ├── course/
│   │   │   ├── dash-board/
│   │   │   ├── department/
│   │   │   ├── doctor/
│   │   │   ├── head-of-department/
│   │   │   ├── material/
│   │   │   ├── quiz/
│   │   │   ├── student/
│   │   │   ├── submit-assignment/
│   │   │   ├── submit-quiz/
│   │   │   └── assignments/
│   │   ├── common/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── decorators/
│   │   ├── config/
│   │   └── app.module.ts
│   ├── migrations/
│   ├── seeds/
│   └── test/
│
├── frontend/
└── docs/
```

## NestJS Key Modules

### Authentication Module

- Implements JWT authentication
- User registration and login
- Role-based access control

### Quiz Module

- CRUD operations for quizzes
- Question management
- Result tracking

### Assignment Module

- Assignment creation and management
- Submission handling
- Grading system

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation
<!-- [Specify how to access API documentation, e.g., Swagger] -->
$baseURl/api

```bash
# Run Swagger
npm run start:swagger
```

## Deployment Considerations

- Use `npm run build` to create a production build
- Configure environment-specific settings
- Consider containerization with Docker

## Future Enhancements

- [ ] Implement advanced quiz analytics
- [ ] Add more interactive learning features
- [ ] Enhance real-time communication
- [ ] Implement comprehensive reporting system

## Contributing

1. Fork the repository
2. Create a feature branch

   ```bash
   git checkout -b feature/amazing-nestjs-feature
   ```

3. Commit changes

   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. Push to the branch

   ```bash
   git push origin feature/amazing-nestjs-feature
   ```

5. Open a Pull Request

## License

BLMS is [MIT licensed](LICENSE)

## Contact

- Hany Medhat
- Project Repository: <https://github.com/HanyMedhat10/BLMS-Graduation-Project.git>
- LinkedIn: <https://www.linkedin.com/in/hany-medhat-74452520a/>
- Email: <hany.medhat24@gmail.com>

## Acknowledgments

- NestJS Community
- <https://github.com/nestjs/nest>

