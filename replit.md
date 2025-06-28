# Task Management Dashboard

## Overview

This is a full-stack task management application built with a modern tech stack. The application provides a user dashboard where users can manage their profile information, view task statistics, and interact with their tasks. It features a clean, responsive design with real-time data updates and a comprehensive UI component library.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured but using in-memory storage currently)
- **ORM**: Drizzle ORM for type-safe database operations
- **Current Storage**: In-memory storage implementation for development
- **Schema Validation**: Zod for runtime type validation

## Key Components

### Frontend Components
1. **Dashboard Page**: Main application interface showing user profile, statistics, and tasks
2. **Header Component**: Navigation bar with notification and settings buttons
3. **Profile Section**: Editable user profile with form validation
4. **Statistics Section**: Visual representation of task completion metrics
5. **Tasks Section**: Interactive task management with filtering and status updates
6. **UI Component Library**: Comprehensive set of reusable components based on Radix UI

### Backend Components
1. **Express Server**: Main application server with middleware setup
2. **Route Handlers**: RESTful endpoints for users and tasks
3. **Storage Layer**: Abstracted storage interface with in-memory implementation
4. **Schema Definitions**: Shared type definitions and validation schemas

### Database Schema
- **Users Table**: Stores user profile information (name, email, contact details, role)
- **Tasks Table**: Stores task data (title, due date, priority, status, user association)
- **Relationships**: One-to-many relationship between users and tasks

## Data Flow

1. **Frontend to Backend**: React Query handles API calls with automatic caching and revalidation
2. **API Layer**: Express routes validate requests using Zod schemas
3. **Data Layer**: Storage interface abstracts database operations
4. **Response Flow**: Type-safe responses ensure data consistency across the stack

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database client for PostgreSQL
- **drizzle-orm**: Modern TypeScript ORM
- **@tanstack/react-query**: Powerful data fetching library
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Build Process
1. Frontend build using Vite generates optimized static assets
2. Backend build using ESBuild creates a single server bundle
3. TypeScript compilation ensures type safety across the entire application

### Environment Configuration
- Development: Hot reload with Vite dev server proxy
- Production: Standalone Express server serving built frontend assets
- Database: PostgreSQL via environment variable configuration

### Hosting Considerations
- The application is designed to run on platforms supporting Node.js
- Database URL configuration through environment variables
- Static assets served through Express in production

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.