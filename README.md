# TaskLancer 🚀

A modern, full-stack project and task management platform built with Next.js 16, designed to streamline client relationships, project workflows, and team collaboration.

## 📋 Table of Contents

- [About](#about)
- [The Problem & Our Solution](#the-problem--our-solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Current Status](#current-status)
- [Team](#team)
- [License](#license)

## 🎯 About 

TaskLancer is a comprehensive project management platform specifically designed for freelancers and small teams. Unlike traditional task management tools (Trello, Asana) that only focus on tasks, TaskLancer bridges the gap between **work and money**—connecting project management with financial tracking in a single, unified platform.

With built-in automatic quotation generation, intelligent deadline alerts, and a business-focused dashboard, TaskLancer helps freelancers save time on administration and improve their finances.

## 💡 The Problem & Our Solution

### The Problem
Millions of freelancers face a daily reality: the tools they use (Trello, Asana) are good for tasks, but not for business. Freelancers have their work in one app and their money in another. This creates chaos, stress, and costs money.

### Our Solution
TaskLancer connects work with money. We're not just a task manager—we're a business management platform for freelancers.

**Our unique workflow:**
1. **Create the Client** - Add client information and contact details
2. **Open the Project** - Set up project structure and requirements
3. **Set Your Rate** - Enter hours to work and hourly rate
4. **Get Instant Quotation** - Our app automatically calculates the quotation

It's simple, fast, and designed for how freelancers actually work.

## ✨ Features

### 💼 Business Management
- **Automatic Quotation Generator**: Enter hours and hourly rate—get instant project quotations
- **Intelligent Dashboard**: See your business health at a glance
  - Total number of active projects
  - Total revenue from all quotations
  - **Critical: Red alerts for projects due in 7 days or less**
- **Client Management**: Comprehensive client tracking and relationship management
- **Financial Overview**: Track all project budgets and quotations in one place

### 📊 Project & Task Management
- **Project Dashboard**: Visual overview of all projects with statistics and insights
- **Kanban Board**: Drag-and-drop task management with customizable columns
- **Requirements Tracking**: Manage project requirements and deliverables
- **Deadline Alerts**: Never miss a delivery date with intelligent notifications

### 🔧 Technical Features
- **User Authentication**: Secure authentication system powered by NextAuth v5
- **Multi-language Support**: Internationalization with next-intl
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **PDF Generation**: Export project reports and documentation
- **Email Notifications**: Automated email notifications with Resend
- **Dark/Light Theme**: Theme switching support
- **Profile Management**: User profile customization and settings

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Lucide React icons
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5 with Prisma Adapter
- **Password Hashing**: bcryptjs
- **Email Service**: Resend

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Quality**: TypeScript strict mode

## 🗄️ Database Schema

Our database is designed to handle complex relationships between users, clients, projects, tasks, and requirements.

![Database Relational Diagram](database-schema.png)

## 📐 UML Architecture Diagram

This comprehensive UML diagram illustrates the complete system architecture of TaskLancer, including class relationships, component structure, data flow patterns, authentication processes, and project workflow. It provides a visual representation of how all entities, services, and components interact within the application.

![UML Architecture Diagram](uml-architecture-diagram.png)

### Key Entities

- **Users**: Authentication and profile management
- **Clients**: Client information and contact details
- **Projects**: Project tracking with status and metadata
- **Tasks**: Task management with assignees and dependencies
- **Requirements**: Project requirements and specifications
- **Sessions/Accounts**: NextAuth session management

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tasklancer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section)

4. **Configure Prisma**
   
   Make sure to import dotenv config in `prisma.config.ts`:
   ```typescript
   import "dotenv/config";
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init --skip-seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tasklancer/
├── prisma/                # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── public/                # Static assets
│   ├── flags/
│   ├── fonts/
│   ├── images/
│   └── logo/
├── src/
│   ├── actions/          # Server actions
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/      # Authentication routes
│   │   ├── (main)/      # Main application routes
│   │   └── api/         # API routes
│   ├── components/       # React components
│   │   ├── features/    # Feature-specific components
│   │   ├── form/        # Form components
│   │   ├── providers/   # Context providers
│   │   └── ui/          # UI components
│   ├── constants/        # Application constants
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization
│   ├── lib/              # Utility libraries
│   ├── services/         # Business logic services
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions
│   ├── validations/      # Zod schemas
│   └── views/            # Page views
├── auth.config.ts        # NextAuth configuration
├── middleware.ts         # Next.js middleware
└── package.json
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tasklancer"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 📜 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev  # Run migrations
npx prisma generate  # Generate Prisma Client
```

## 🚦 Current Status

**Beta Phase - Live and Validated** ✅

The project is currently deployed and fully functional, with real clients actively using and validating the platform.

### What's Working Now
- ✅ Client and project management
- ✅ Automatic quotation system
- ✅ Intelligent dashboard with deadline alerts
- ✅ Task management with Kanban board
- ✅ User authentication and profiles

### Coming Soon
- 🔜 Invoice generation
- 🔜 Advanced financial reports
- 🔜 Time tracking integration
- 🔜 Enhanced analytics

**Our product works, saves administrative time, and improves finances. We have the product, we have the team, and we have the validation. We're ready to grow.**

## 👥 Team

This project was developed by **DevPoint**:

- **Juan Cardona** - Developer
- **Camilo Parra** - Developer
- **Forlan Ordoñez** - Developer
- **Daniel Rojas** - Analist

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
