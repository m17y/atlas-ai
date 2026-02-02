# AI Technology Navigation Platform Project

## Project Overview

Atlas AI is a comprehensive platform for discovering, exploring, and experiencing cutting-edge artificial intelligence tools, frameworks, and technologies. The platform features an AI tool navigation system, trending rankings, news feed, tutorial system, and a full-featured admin dashboard.

## Design Style

- Modern, clean aesthetic inspired by product hunt and alternative.me
- Light color scheme with subtle shadows and rounded corners
- Responsive layout for all devices (mobile, tablet, desktop)
- Smooth animations and transitions using CSS/Tailwind
- Clear visual hierarchy and intuitive navigation

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React
- **Markdown Editor**: @uiw/react-md-editor
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── page.tsx                   # Homepage
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   ├── api/                       # API routes
│   │   ├── tools/                 # Tools CRUD API
│   │   ├── categories/            # Categories API
│   │   ├── news/                  # News API
│   │   ├── tutorials/             # Tutorials API
│   │   ├── admin/                 # Admin auth API
│   │   └── discussions/           # GitHub discussions API
│   ├── admin/                     # Admin dashboard pages
│   │   ├── login/                 # Admin login
│   │   ├── tools/                 # Tool management
│   │   ├── categories/            # Category management
│   │   ├── news/                  # News management
│   │   ├── tutorials/             # Tutorial management
│   │   ├── analytics/             # Analytics dashboard
│   │   └── settings/              # System settings
│   ├── categories/                # Categories listing
│   ├── category/[slug]/           # Category detail page
│   ├── trending/                  # Trending tools ranking
│   ├── news/                      # News listing
│   ├── news/[id]/                 # News detail
│   ├── tutorials/                 # Tutorial listing
│   ├── tutorials/[slug]/          # Tutorial detail with chapters
│   ├── tool/[id]/                 # Tool detail page
│   ├── community/                 # GitHub discussions
│   ├── insights/                  # AI trends and insights
│   ├── open-source/               # Open source projects
│   └── api-docs/                  # API documentation
├── components/                    # React components
│   ├── Header.tsx                 # Navigation header
│   ├── Hero.tsx                   # Hero section
│   ├── Featured.tsx               # Featured tools
│   ├── Trending.tsx               # Trending tools
│   ├── Categories.tsx             # Categories grid
│   ├── Latest.tsx                 # Latest tools
│   ├── Insights.tsx               # AI insights
│   └── Footer.tsx                 # Footer
├── lib/                           # Utilities
│   ├── prisma.ts                  # Prisma client
│   ├── api.ts                     # API utilities
│   └── icons.ts                   # Icon configurations
└── types/                         # TypeScript types
```

## Database Schema (Prisma)

```prisma
model Tool {
  id          String   @id @default(cuid())
  name        String
  description String
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  pricing     String   // free, paid, freemium
  rating      Float    @default(0)
  reviewCount Int      @default(0)
  tags        String   // JSON array as string
  icon        String
  website     String?
  featured    Boolean  @default(false)
  trending    Boolean  @default(false)
  latest      Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  reviews     Review[]
}

model Category {
  id          String   @id @default(cuid())
  name        String
  description String
  icon        String
  count       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tools       Tool[]
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  reviews   Review[]
  favorites Favorite[]
}

model Review {
  id        String   @id @default(cuid())
  content   String?
  rating    Float
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  toolId    String
  tool      Tool     @relation(fields: [toolId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Favorite {
  id     String @id @default(cuid())
  userId String
  user   User   @relation(fields: [userId], references: [id])
  toolId String
  createdAt DateTime @default(now())
  @@unique([userId, toolId])
}

model Tutorial {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  content     String   // Markdown content
  icon        String
  level       String   // beginner, intermediate, advanced
  duration    String   // e.g., "15 minutes"
  tools       String   // JSON array of tool names
  chapterCount Int     @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  chapters    TutorialChapter[]
}

model TutorialChapter {
  id          String   @id @default(cuid())
  tutorialId  String
  tutorial    Tutorial @relation(fields: [tutorialId], references: [id])
  title       String
  content     String   // Markdown content
  order       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model News {
  id        String   @id @default(cuid())
  title     String
  date      String
  category  String
  summary   String
  content   String   // Markdown content
  image     String
  tags      String   // JSON array as string
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Main Pages

### Frontend Pages

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Featured, trending, categories |
| Categories | `/categories` | All AI tool categories |
| Category Detail | `/category/[slug]` | Tools in specific category |
| Trending | `/trending` | Popular AI tools ranking |
| Tool Detail | `/tool/[id]` | Detailed tool information |
| News List | `/news` | AI news and updates |
| News Detail | `/news/[id]` | Full news article |
| Tutorials | `/tutorials` | Learning tutorials list |
| Tutorial Detail | `/tutorials/[slug]` | Tutorial with chapters |
| Community | `/community` | GitHub discussions |
| Admin Login | `/admin/login` | Admin authentication |

### Admin Dashboard Pages

| Page | Path | Description |
|------|------|-------------|
| Dashboard | `/admin` | Overview statistics |
| Tools | `/admin/tools` | Manage AI tools |
| Categories | `/admin/categories` | Manage categories |
| News | `/admin/news` | Manage news |
| Tutorials | `/admin/tutorials` | Manage tutorials |
| Analytics | `/admin/analytics` | Platform statistics |
| Settings | `/admin/settings` | System configuration |

## Admin Authentication

- **Default credentials**: admin / password
- **Environment variables**: `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- Uses httpOnly cookies for session management

## Key Features

### Frontend
- Responsive navigation with mobile menu
- Search functionality across categories
- Tool filtering by category
- Pagination for lists
- Markdown rendering for tutorials/news
- GitHub API integration for community discussions
- Tooltips and hover effects

### Admin Dashboard
- Full CRUD operations for tools, categories, news, tutorials
- Markdown editor for content creation
- Chapter management for tutorials
- Responsive admin layout with sidebar navigation
- Authentication protection
- Loading and error states

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools` | List tools with pagination |
| GET | `/api/tools/[id]` | Get single tool |
| POST | `/api/tools` | Create tool |
| PUT | `/api/tools/[id]` | Update tool |
| DELETE | `/api/tools/[id]` | Delete tool |
| GET | `/api/categories` | List categories |
| GET | `/api/news` | List news |
| GET | `/api/tutorials` | List tutorials |
| POST | `/api/admin/login` | Admin login |

## Implementation Guidelines

1. Use TypeScript for all files
2. Follow React best practices (hooks, memoization)
3. Ensure accessibility (ARIA labels, keyboard navigation)
4. Use semantic HTML elements
5. Maintain consistent design language
6. Optimize for performance (lazy loading, caching)
7. Handle errors gracefully with user-friendly messages
8. Use Prisma for all database operations
9. Keep API routes simple and RESTful

## Styling Conventions

- Use Tailwind CSS utility classes
- Custom colors in `tailwind.config.js` (primary: indigo/purple)
- Consistent spacing using Tailwind's scale
- Rounded corners (rounded-xl, rounded-2xl)
- Subtle shadows (shadow-sm, shadow-md)
- Smooth transitions (transition-all duration-200)
- Loading animations (spin pulse)
- Hover effects on interactive elements

## Development Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="password"
```
