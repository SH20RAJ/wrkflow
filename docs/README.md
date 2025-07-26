# wrkflow

A modern N8N workflow marketplace for sharing and discovering automation workflows.

## Features

- 🔍 **Browse & Search** - Discover workflows with advanced filtering
- � **Create & Share** - Publish your workflows with rich descriptions
- 🏷️ **Categories & Tags** - Organize workflows by type and technology
- 💰 **Monetization** - Support for both free and paid workflows
- 📊 **Analytics** - Track views, downloads, and performance
- 🔐 **Authentication** - Secure user accounts with StackAuth

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM  
- **Authentication**: StackAuth
- **Deployment**: Cloudflare Pages + Workers
- **UI Components**: shadcn/ui, Radix UI

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SH20RAJ/wrkflow.git
   cd wrkflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Add your StackAuth and Cloudflare credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── workflows/      # Workflow pages
│   └── dashboard/      # User dashboard
├── components/         # React components
│   ├── ui/            # UI primitives
│   └── layout/        # Layout components
├── lib/               # Utilities & database
└── hooks/             # Custom React hooks
```

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run db:push     # Apply database migrations
npm run deploy      # Deploy to Cloudflare
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](../LICENSE) file for details.
