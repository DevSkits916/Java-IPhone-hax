# Overview

This is a full-stack web application called "JavaScript Toolbox" - a collection of browser-based utility tools designed to enhance web browsing experience. The application provides various tools like dark mode toggle, auto-scroll, page text extraction, and other browser manipulation utilities. It's built as a modern React SPA with an Express backend and is designed to work both as a standalone web application and through bookmarklets for use on any website.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (@tanstack/react-query) for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular component architecture with reusable UI components in `/components/ui/`

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Setup**: Hot module replacement with Vite integration for development
- **Middleware**: Custom logging middleware for API request tracking
- **Error Handling**: Centralized error handling middleware
- **Build Process**: ESBuild for production bundling

## Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Type-safe database schemas with Drizzle
- **In-Memory Storage**: Fallback MemStorage implementation for development/testing
- **Local Storage**: Browser localStorage for client-side configuration persistence

## Key Features & Tools
The application provides multiple browser utility tools including:
- Dark mode enforcement on any webpage
- Auto-scroll functionality with adjustable speed
- Text extraction from web pages
- Page content manipulation utilities
- Bookmarklet generation for portable tool access
- Configuration management with persistent settings

## Project Structure
- `/client/` - React frontend application
- `/server/` - Express backend API
- `/shared/` - Shared TypeScript schemas and types
- `/components/` - Reusable React components
- Monorepo structure with shared dependencies and build processes

# External Dependencies

## Database & ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and schema management
- **Drizzle Kit**: Database migration and schema management tools

## UI & Design System
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript/TypeScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer

## Runtime Libraries
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Wouter**: Lightweight routing solution
- **Date-fns**: Date manipulation utilities
- **Zod**: Runtime type validation and schema validation

## Development Environment
- **Replit Integration**: Development environment optimizations for Replit
- **Hot Module Replacement**: Development experience enhancements
- **Custom Vite Plugins**: Runtime error handling and development tools