# IoT Monitor

A modern IoT monitoring application built with NestJS, featuring real-time data collection, monitoring, and analytics with TimescaleDB database integration.

## 🚀 Features

- **Real-time Monitoring**: Live IoT device monitoring and data collection
- **Scalable Architecture**: Built with NestJS for enterprise-grade applications
- **Time-Series Database**: TimescaleDB integration for high-performance IoT data storage
- **Caching Layer**: Redis for high-performance data caching
- **TypeScript**: Full TypeScript support with strict type checking
- **Code Quality**: ESLint and Prettier integration for consistent code style
- **Testing**: Jest testing framework with e2e testing support
- **Modern Development**: Hot reload, debugging, and development tools
- **Containerized**: Docker Compose setup for easy local development

## 🛠️ Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript 5.7
- **Runtime**: Node.js
- **Database**: TimescaleDB (PostgreSQL with time-series extensions)
- **Cache**: Redis 7
- **Testing**: Jest
- **Code Quality**: ESLint + Prettier
- **Package Manager**: npm
- **Containerization**: Docker + Docker Compose

## 📋 Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Docker** 20.10+
- **Docker Compose** 2.0+

## 🗄️ Database Setup

This project uses **TimescaleDB** as the primary database and **Redis** for caching. Both are containerized for easy local development.

### Quick Start with Docker Compose

```bash
# Start all services (TimescaleDB + Redis)
docker-compose up -d
```

### Database Configuration

The default database credentials are configured for local development:

```bash
# TimescaleDB Database
Database: iot_monitor
Username: iot_user
Password: iot_password
Host: localhost
Port: 5432

# Redis Cache
Host: localhost
Port: 6379
```

### Environment Variables

Copy the configuration template and customize as needed:

```bash
# Copy the configuration template
cp config/database.env .env

# Edit .env file with your preferred settings
nano .env
```

**Important**: The `.env` file is already in `.gitignore` for security.

### Database Access

- **TimescaleDB**: `psql -h localhost -U iot_user -d iot_monitor`
- **Redis CLI**: `docker exec -it iot-monitor-redis redis-cli`

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd IoTMonitor

# Install dependencies
npm install
```

### 2. Start Database Services

```bash
# Start TimescaleDB and Redis
docker-compose up -d
```

### 3. Start Application

```bash
# Build the project
npm run build

# Start development server
npm run start:dev
```

The application will be available at `http://localhost:3000`

## 📚 Available Scripts

### Development

- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debugging enabled
- `npm run build` - Build the project for production

### Code Quality

- `npm run lint` - Run ESLint with auto-fix
- `npm run lint:check` - Check for linting issues
- `npm run lint:fix` - Fix auto-fixable linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run quality` - Run both linting and format checks
- `npm run quality:fix` - Fix all code quality issues

### Testing

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

### Database Management (Docker Compose Commands)

- `docker-compose up -d` - Start all services in background
- `docker-compose down` - Stop and remove all services
- `docker-compose start` - Start services without rebuilding
- `docker-compose stop` - Stop services without removing
- `docker-compose restart` - Restart all services
- `docker-compose logs -f` - View logs from all services
- `docker-compose ps` - Check service status

## 🔧 Development Tools

### Docker Compose Services

The project includes several containerized services:

#### TimescaleDB Database

- **Image**: `timescale/timescaledb:latest-pg17`
- **Port**: 5432 (PostgreSQL)
- **Features**: PostgreSQL with time-series extensions, hypertables, continuous aggregates
- **Use Case**: High-performance IoT time-series data storage

#### Redis Cache

- **Image**: `redis:7-alpine`
- **Port**: 6379
- **Features**: AOF persistence, memory management
- **Use Case**: IoT data caching and session storage

### Database Schema

TimescaleDB is a PostgreSQL extension that provides:

- **Hypertables**: Automatically partitioned tables for time-series data
- **Continuous Aggregates**: Pre-computed aggregations for fast queries
- **Compression**: Automatic data compression for storage efficiency
- **Retention Policies**: Automatic data lifecycle management

### ESLint Configuration

The project uses ESLint with TypeScript support and Prettier integration. Key features:

- TypeScript-specific rules
- NestJS best practices
- Prettier integration to avoid conflicts
- Auto-fix capabilities

### Prettier Configuration

Prettier is configured for consistent code formatting:

- Single quotes
- 2-space indentation
- 80 character line width
- Trailing commas
- Consistent line endings

### VS Code Integration

The project includes VS Code workspace settings for:

- Auto-formatting on save
- ESLint integration
- TypeScript support
- Recommended extensions

## 📁 Project Structure

```
IoTMonitor/
├── src/                    # NestJS application source
│   ├── app.controller.ts   # Main application controller
│   ├── app.service.ts      # Main application service
│   ├── app.module.ts       # Root application module
│   └── main.ts            # Application entry point
├── test/                   # Test files
│   └── app.e2e-spec.ts    # End-to-end tests
├── config/                 # Configuration templates
│   └── database.env       # Database configuration template
├── .vscode/               # VS Code workspace settings
│   ├── settings.json      # Editor configuration
│   └── extensions.json    # Recommended extensions
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # This file
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Test individual components and services
- **E2E Tests**: Test complete application workflows
- **Coverage Reports**: Track test coverage metrics

Run tests with:

```bash
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Tests with coverage
```

## 📝 Code Style

This project enforces consistent code style through:

1. **ESLint**: Catches common errors and enforces best practices
2. **Prettier**: Ensures consistent formatting
3. **TypeScript**: Provides type safety and modern JavaScript features

### Code Quality Commands

```bash
# Check code quality
npm run quality

# Fix code quality issues
npm run quality:fix

# Individual tools
npm run lint:check        # ESLint only
npm run format:check      # Prettier only
```

## 🔍 Debugging

Enable debugging with:

```bash
npm run start:debug
```

The application will start with debugging enabled and breakpoints will work in VS Code.

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 🐳 Docker Development

### Starting Services

```bash
# Start all services
docker-compose up -d

# View service status
docker-compose ps

# View logs
docker-compose logs -f
```

### Database Operations

```bash
# Connect to TimescaleDB
psql -h localhost -U iot_user -d iot_monitor

# Connect to Redis
docker exec -it iot-monitor-redis redis-cli

# Restart services
docker-compose restart

# Clean up (⚠️ destructive)
docker-compose down -v
docker volume prune -f
```

### Stopping Services

```bash
# Stop services
docker-compose stop

# Stop and remove everything
docker-compose down
```

## 🤝 Contributing

1. Ensure code quality standards are met
2. Run tests before submitting changes
3. Follow the established code style
4. Use conventional commit messages
5. Test database changes locally using Docker Compose

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support and questions:

- Check the NestJS documentation
- Review the project issues
- Contact the development team

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [TimescaleDB Documentation](https://docs.timescale.com/)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

Built with ❤️ using NestJS, TimescaleDB, and Redis
