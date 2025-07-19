# wrkflow - N8N Workflow Marketplace

A modern, full-featured marketplace for sharing and discovering N8N workflows. Built with Next.js 15, TypeScript, and deployed on Cloudflare.

## Features

### Workflow Management
- **Create & Share**: Publish workflows with rich descriptions, poster images, and documentation
- **Dual JSON Input**: Paste JSON directly or provide URLs (GitHub, Gist, Google Drive)
- **Real-time Validation**: Instant JSON validation with error feedback and preview
- **Markdown Support**: Rich text descriptions with full markdown rendering
- **Privacy Controls**: Public and private workflow options
- **Tags & Categories**: Organize workflows with custom tags and predefined categories

### Discovery & Search
- **Advanced Search**: Multi-field search across titles, descriptions, and tags
- **Category Filtering**: Browse workflows by category (AI, Marketing, Sales, etc.)
- **Tag-based Discovery**: Visual tag system for easy workflow discovery
- **Public Marketplace**: Curated public workflow listings

### User Experience
- **Profile Dashboard**: Comprehensive user workflow management
- **Saved Workflows**: Bookmark and organize favorite workflows
- **Collections**: Create custom workflow collections (public/private)
- **Analytics**: Track views, downloads, and engagement
- **Copy & Share**: One-click JSON copying and sharing

### Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: System-aware theme switching
- **Rich Media**: Poster images and visual workflow previews
- **Intuitive Navigation**: Clean, modern interface with easy navigation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: SQLite with Drizzle ORM
- **Authentication**: Stack Auth
- **Deployment**: Cloudflare Pages + Workers
- **Content**: React Markdown for rich text rendering

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wrkflow.git
   cd wrkflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Stack Auth Configuration
   STACK_PROJECT_ID=your_stack_project_id
   STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key
   STACK_SECRET_SERVER_KEY=your_secret_key
   
   # Database
   DATABASE_URL=your_database_url
   
   # Cloudflare (for deployment)
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
wrkflow/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── workflows/          # Workflow-related pages
│   │   ├── search/             # Search functionality
│   │   ├── profile/            # User profile pages
│   │   ├── dashboard/          # User dashboard
│   │   └── api/                # API routes
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   └── auth/               # Authentication components
│   ├── lib/                    # Utility libraries
│   │   ├── db/                 # Database configuration & schema
│   │   ├── auth.ts             # Authentication utilities
│   │   └── utils.ts            # General utilities
│   └── hooks/                  # Custom React hooks
├── drizzle/                    # Database migrations
├── public/                     # Static assets
└── docs/                       # Documentation
```

## Database Schema

### Core Tables
- **workflows**: Main workflow data with metadata, JSON content, and settings
- **users**: User profiles and authentication data
- **categories**: Workflow categorization system
- **tags**: Flexible tagging system for workflows

### Advanced Features
- **collections**: User-created workflow collections
- **saved_workflows**: User bookmarks and favorites
- **ratings**: Workflow rating and review system
- **analytics**: Usage tracking and statistics

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate database migrations
npm run db:push         # Apply migrations to database
npm run db:studio       # Open Drizzle Studio

# Deployment
npm run deploy          # Deploy to Cloudflare
npm run preview         # Preview deployment locally

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks
```

### Database Management

The project uses Drizzle ORM for type-safe database operations:

```bash
# Generate new migration after schema changes
npm run db:generate

# Apply migrations to database
npm run db:push

# Open database studio for visual management
npm run db:studio
```

## Deployment

### Cloudflare Pages + Workers

1. **Build and deploy**
   ```bash
   npm run deploy
   ```

2. **Environment Variables**
   Set up the same environment variables in your Cloudflare dashboard

3. **Custom Domain** (Optional)
   Configure your custom domain in Cloudflare Pages settings

### Alternative Deployments

The app can also be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect your Git repository
- **Railway**: `railway deploy`
- **Docker**: Use the included Dockerfile

## Usage Guide

### Creating a Workflow

1. **Navigate to Dashboard** → Click "Create Workflow"
2. **Basic Information**: Add title, description, and poster image
3. **Workflow Data**: Either paste JSON or provide a URL
4. **Settings**: Configure privacy and pricing options
5. **Documentation**: Add "How It Works" and step-by-step guides
6. **Publish**: Make your workflow available to the community

### Discovering Workflows

1. **Browse**: Visit `/workflows` for all public workflows
2. **Search**: Use `/search` for advanced filtering
3. **Categories**: Filter by workflow type and purpose
4. **Tags**: Discover workflows by technology and use case

### Managing Your Profile

1. **Profile Dashboard**: View all your workflows and statistics
2. **Saved Workflows**: Bookmark workflows you find useful
3. **Collections**: Organize workflows into custom groups
4. **Privacy**: Manage public and private content separately

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **N8N Community**: For creating an amazing automation platform
- **shadcn/ui**: For the beautiful component library
- **Cloudflare**: For excellent hosting and edge computing
- **Stack Auth**: For seamless authentication
- **Drizzle Team**: For the fantastic ORM

## Support

- **Documentation**: [wrkflow.sketchflow.space](https://wrkflow.sketchflow.space)
- **Issues**: [GitHub Issues](https://github.com/sh20raj/wrkflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sh20raj/wrkflow/discussions)
- **Email**: support@wrkflow.com

## Roadmap

### Upcoming Features
- [ ] Workflow ratings and reviews
- [ ] Advanced analytics dashboard
- [ ] Workflow versioning system
- [ ] API for external integrations
- [ ] Mobile app (React Native)
- [ ] Workflow templates and generators
- [ ] Community features (comments, discussions)
- [ ] Enterprise features (teams, organizations)

### Version History
- **v1.0.0**: Initial release with core marketplace features
- **v1.1.0**: Added search and profile management
- **v1.2.0**: Enhanced workflow creation with dual JSON input
- **v1.3.0**: Collections and advanced privacy controls

---

**Built with love by the wrkflow team**

[Website](https://wrkflow.sketchflow.space) • [Documentation](https://wrkflow.sketchflow.space) • [GitHub](https://github.com/sh20raj/wrkflow) • [Twitter](https://twitter.com/sh20raj)