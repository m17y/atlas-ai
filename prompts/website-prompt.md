# AI Technology Showcase Website Project

## Project Overview
Create a modern, responsive website for showcasing the latest AI technologies, tools, and trends. The website should be clean, professional, and easy to navigate.

## Design Style
- Minimalist design inspired by skills.sh
- Clean and modern aesthetic
- Light color scheme with subtle shadows
- Responsive layout for all devices
- Smooth animations and transitions

## Technical Stack
- Framework: Next.js 14 with App Router
- Language: TypeScript
- Styling: Tailwind CSS 3
- Animations: Framer Motion
- Icons: Lucide React

## Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── categories/
│   │   └── page.tsx                # Categories listing
│   ├── trending/
│   │   └── page.tsx                # Trending tools ranking
│   ├── insights/
│   │   └── page.tsx                # AI trends and insights
│   └── tool/
│       └── [id]/
│           └── page.tsx            # Tool detail page
├── components/
│   ├── Header.tsx                  # Navigation header
│   ├── Hero.tsx                    # Hero section
│   ├── Featured.tsx                # Featured AI tools
│   ├── Trending.tsx                # Trending tools section
│   ├── Categories.tsx              # Categories section
│   ├── Latest.tsx                  # Latest tools section
│   ├── Insights.tsx                # Insights section
│   └── Footer.tsx                  # Footer
├── data/
│   └── tools.ts                    # Mock data for AI tools
└── types/
    └── index.ts                    # TypeScript interfaces
```

## Main Pages and Components

### Homepage (src/app/page.tsx)
Include the following sections in order:
1. Header - Sticky navigation with logo, search, and links
2. Hero - Large hero section with tagline and CTA buttons
3. Featured - Featured AI tools section
4. Trending - Trending tools ranking
5. Categories - AI tool categories with icons
6. Latest - Latest AI tools and releases
7. Insights - AI technology insights and trends
8. Footer - Footer with links and information

### Categories Page (src/app/categories/page.tsx)
- Grid layout of all AI tool categories
- Each category shows:
  - Category icon
  - Category name
  - Tool count
  - Brief description
  - Link to filtered tools

### Trending Page (src/app/trending/page.tsx)
- List of trending AI tools ranked by popularity
- Each tool card shows:
  - Rank number
  - Tool name and icon
  - Category badge
  - Description
  - Rating/review count
  - Visit button

### Insights Page (src/app/insights/page.tsx)
- AI technology trend analysis
- Articles/posts about AI developments
- Statistics and charts (optional)

### Tool Detail Page (src/app/tool/[id]/page.tsx)
- Full information about a specific AI tool
- Includes:
  - Tool name and logo
  - Category and tags
  - Detailed description
  - Pricing information (Free/Paid/Freemium)
  - Rating and reviews
  - Visit website button
  - Screenshot or preview image
  - Related tools

## Data Structure

Create a tools data file with the following interface:
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: 'free' | 'paid' | 'freemium';
  rating: number;
  reviewCount: number;
  tags: string[];
  icon: string;
  website?: string;
  featured?: boolean;
  trending?: boolean;
  latest?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}
```

## Sample Data

Include at least 10 AI tools across different categories:
- ChatGPT, Claude, Midjourney, Stable Diffusion (Image Generation)
- GitHub Copilot, Cursor (Code Generation)
- Jasper, Copy.ai (Content Writing)
- Runway, Pika (Video Generation)
- ElevenLabs, Murf (Audio/Voice)
- Perplexity, You.com (AI Search)

## Styling Guidelines

### Tailwind Configuration
- Custom color palette (primary colors from indigo/purple range)
- Custom animations (fade-in, slide-up, slide-down)
- Responsive breakpoints (mobile, tablet, desktop)

### Component Styling
- Cards: White background, rounded corners, subtle shadows
- Buttons: Primary color background, hover effects
- Badges: Small, colored, rounded
- Typography: Clean sans-serif fonts
- Spacing: Generous whitespace between sections

## Implementation Steps

1. Initialize Next.js project:
   ```bash
   npx create-next-app@latest ai-tech-hub --typescript --tailwind --eslint
   cd ai-tech-hub
   npm install framer-motion lucide-react clsx tailwind-merge
   ```

2. Create folder structure and files

3. Implement components and pages

4. Add mock data

5. Test responsiveness and functionality

6. Build and verify

## Key Features to Implement
- Responsive navigation with mobile menu
- Search functionality
- Category filtering
- Smooth page transitions
- Hover effects on cards
- Loading states
- Error handling

## Important Notes
- Use proper TypeScript types
- Follow React best practices
- Ensure accessibility (ARIA labels, keyboard navigation)
- Optimize images and performance
- Use semantic HTML
- Maintain consistent design language

## Example Reference
Design inspired by skills.sh - clean, minimalist, focused on content presentation.
