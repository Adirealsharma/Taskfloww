# Task Management Dashboard

A modern, responsive React dashboard application for task management with user profile functionality. Built with TypeScript, React, Express.js, and featuring a clean UI with dark mode support.

## 🚀 Features

- **User Profile Management**: View and edit user profiles with avatar support
- **Task Management**: Create, update, delete, and track tasks with priority levels
- **Dashboard Analytics**: Visual statistics and productivity tracking
- **Calendar View**: See tasks organized by due dates
- **Activity Feed**: Track recent task activities and changes
- **Productivity Charts**: Weekly completion metrics and progress visualization
- **Advanced Search**: Filter and search tasks by various criteria
- **Goal Setting**: Set and track daily/weekly/monthly completion goals
- **Reports**: Generate comprehensive productivity reports
- **Dark Mode**: Toggle between light and dark themes
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Wouter** - Lightweight client-side routing
- **TanStack Query (React Query)** - Server state management and caching
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### UI/Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Composable charting library

### Backend
- **Express.js** - Minimal and flexible Node.js web framework
- **TypeScript** - Type safety for backend development
- **Drizzle ORM** - Type-safe SQL ORM for TypeScript
- **PostgreSQL** - Robust relational database (via Neon Database)
- **Express Session** - Session middleware for user management

### Development Tools
- **ESBuild** - Fast JavaScript bundler
- **PostCSS** - CSS processing tool
- **Drizzle Kit** - Database migrations and schema management
- **TSX** - TypeScript execution environment

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # shadcn/ui component library
│   │   │   ├── header.tsx
│   │   │   ├── profile-section.tsx
│   │   │   ├── statistics-section.tsx
│   │   │   ├── tasks-section.tsx
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── pages/         # Application pages/routes
│   │   └── main.tsx       # Application entry point
│   └── index.html         # HTML template
├── server/                # Backend application
│   ├── index.ts          # Express server setup
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and validation
└── README.md            # Project documentation
```

## 🔧 Key Components and Functions

### Core Components

#### Dashboard (`client/src/pages/dashboard.tsx`)
The main application interface featuring:
- Tabbed navigation (Overview, Calendar, Analytics, Search, Reports, Goals)
- Responsive layout with mobile-first design
- Real-time data fetching and caching
- Statistics calculation and display

#### Profile Card (`client/src/components/profile-card.tsx`)
User profile display and editing:
- Avatar display with fallback initials
- Editable user information modal
- Role and department information
- Join date and location display

#### Task List (`client/src/components/task-list.tsx`)
Interactive task management:
- CRUD operations with optimistic updates
- Task filtering and sorting
- Priority indicators and due date display
- Completion status toggle

#### Statistics Panel (`client/src/components/statistics-panel.tsx`)
Visual metrics display:
- Total, completed, and pending task counts
- Weekly task creation tracking
- Completion percentage calculation
- Gradient-styled stat cards

### Advanced Features

#### Task Calendar (`client/src/components/task-calendar.tsx`)
Calendar view functionality:
- Month navigation and date selection
- Task due date visualization
- Click-to-view task details
- Responsive calendar grid

#### Productivity Chart (`client/src/components/productivity-chart.tsx`)
Data visualization:
- Weekly completion trends using Recharts
- Interactive tooltips and data points
- Responsive chart sizing
- Dark mode compatible colors

#### Goal Setting (`client/src/components/goal-setting.tsx`)
Goal tracking system:
- Daily, weekly, and monthly goal types
- Progress tracking with visual indicators
- Goal creation and management
- Achievement celebration

#### Reports Panel (`client/src/components/reports-panel.tsx`)
Comprehensive reporting:
- Weekly, monthly, and quarterly reports
- Task completion analytics
- Export functionality (CSV format)
- Historical data analysis

### Utility Functions

#### Query Client (`client/src/lib/queryClient.ts`)
TanStack Query configuration:
- `apiRequest()` - Centralized API request handler
- `getQueryFn()` - Query function factory with error handling
- Cache configuration and error boundary setup

#### Theme Provider (`client/src/components/theme-provider.tsx`)
Dark mode implementation:
- System preference detection
- Local storage persistence
- Theme context for component access
- CSS class toggling

### Backend Architecture

#### Storage Interface (`server/storage.ts`)
Data abstraction layer:
- `IStorage` interface defining all operations
- `MemStorage` in-memory implementation for development
- `DatabaseStorage` PostgreSQL implementation for production
- Type-safe operations using shared schemas

#### API Routes (`server/routes.ts`)
RESTful endpoint definitions:
- User profile operations (`GET/PATCH /api/user`)
- Task CRUD operations (`GET/POST/PATCH/DELETE /api/tasks`)
- Statistics endpoint (`GET /api/stats`)
- Request validation using Zod schemas

## 🗄️ Database Schema

### Users Table
```sql
users {
  id: serial primary key
  username: varchar(50) unique not null
  password: varchar(255) not null
  name: varchar(100) not null
  email: varchar(255) unique not null
  role: varchar(50)
  department: varchar(100)
  location: varchar(100)
  profileImage: text
  joinDate: timestamp default now()
  createdAt: timestamp default now()
  updatedAt: timestamp default now()
}
```

### Tasks Table
```sql
tasks {
  id: serial primary key
  userId: integer references users(id)
  title: varchar(255) not null
  description: text
  completed: boolean default false
  priority: varchar(20) default 'medium'
  dueDate: timestamp
  createdAt: timestamp default now()
  updatedAt: timestamp default now()
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (optional, uses in-memory storage by default)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd task-management-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (optional for PostgreSQL)
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run db:push` - Push database schema changes (PostgreSQL only)
- `npm run db:studio` - Open Drizzle Studio for database management

## 🎨 Customization

### Theming
The application uses CSS custom properties for theming. Edit `client/src/index.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other color variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode colors */
}
```

### Adding New Components
1. Create component in `client/src/components/`
2. Export from appropriate index file
3. Add to dashboard tabs if needed
4. Update TypeScript types in `shared/schema.ts`

### Database Migration
When using PostgreSQL:
1. Update schema in `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update storage interface if needed

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **xs**: < 480px (extra small phones)
- **sm**: 640px+ (phones)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (laptops)
- **xl**: 1280px+ (desktops)

Mobile optimizations include:
- Compact navigation with icon-only tabs
- Stacked layouts for narrow screens
- Touch-optimized button sizes
- Responsive typography scaling

## 🔐 Security Considerations

- Input validation using Zod schemas
- SQL injection prevention through Drizzle ORM
- XSS protection via React's built-in escaping
- Session-based authentication (development setup)
- Environment variable protection for sensitive data

## 📄 License

This project is developed as an assignment for Floww APIs Pvt Ltd Frontend Development Intern position.


---

**Built by Aditya** - Frontend Development Intern Assignment