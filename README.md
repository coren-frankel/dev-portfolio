# Dev Portfolio

This repository contains the source code for my personal portfolio website. Built with React Router v7 (previously Remix), it showcases my projects, skills, and experience using modern full-stack web development tools and technologies.

## Technology Stack

### Core Framework

- **React Router v7**: Full-stack web framework with server-side rendering, file-based routing, and server actions
- **React 19**: Latest version of the React library for building user interfaces
- **TypeScript**: Strongly typed programming language that builds on JavaScript
- **Vite**: Fast build tool and development server for modern web projects

### UI & Styling

- **Ant Design**: React UI library for building elegant and responsive interfaces
- **React Spring**: Animation library for React applications
- **React Three Fiber**: React renderer for Three.js 3D graphics

### Development Tools

- **Oxlint**: Fast and efficient linter for TypeScript and React (50-100x faster than ESLint)
- **Prettier**: Code formatter to ensure consistent code style
- **tsc-files**: TypeScript compiler for individual files in lint-staged
- **Commitlint**: Enforces consistent commit message conventions
- **Lint-staged**: Runs linters on staged files before committing
- **Husky**: Manages Git hooks to automate linting and commit message validation

### Backend & Services

- **Resend**: Email delivery service for contact form functionality
- **Cloudflare Turnstile**: Bot protection for forms using React Turnstile component

## Architecture Overview

This portfolio uses React Router v7's full-stack architecture with the following structure:

### File-Based Routing

Routes are automatically generated from files in the `app/routes/` directory:

- `app/routes/_index.tsx` → `/` (Home page)
- `app/routes/about.tsx` → `/about`
- `app/routes/contact.tsx` → `/contact`
- `app/routes/arcade.tsx` → `/arcade`

### Server Actions

Forms use React Router v7's server actions for secure server-side processing:

- Contact form with Turnstile verification
- Email sending via Resend API
- Server-side validation and error handling

### Component Architecture

```text
app/
├── components/          # Reusable React components
│   ├── ContactForm.tsx  # Contact form with Turnstile integration
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Landing.tsx      # Landing page component
│   └── ...
├── routes/              # File-based routes
│   ├── _index.tsx       # Home page route
│   ├── contact.tsx      # Contact page with server action
│   └── ...
├── styles/              # CSS stylesheets
├── assets/              # Static assets (images, icons)
└── views/               # Page view components
```

## Key Features

### Contact Form with Bot Protection

- **React Turnstile Integration**: Uses `@marsidev/react-turnstile` for seamless bot protection
- **Server-Side Validation**: Form processing happens on the server with comprehensive validation
- **Email Delivery**: Powered by Resend API for reliable email sending
- **Progressive Enhancement**: Works without JavaScript enabled

### Performance Optimizations

- **Server-Side Rendering**: Fast initial page loads with SSR
- **Code Splitting**: Automatic route-based code splitting
- **Modern Build Tools**: Vite for fast development and optimized production builds

### Developer Experience

- **Type Safety**: Full TypeScript coverage across the application
- **Fast Linting**: Oxlint provides near-instant feedback
- **Git Hooks**: Automated code quality checks before commits
- **Hot Reload**: Instant updates during development

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/coren-frankel/dev-portfolio.git
cd dev-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
# Development
pnpm dev                 # Start development server
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run Oxlint
pnpm typecheck          # Type checking with TypeScript
pnpm format             # Format code with Prettier

# Deployment
pnpm build              # Build optimized production bundle
pnpm start              # Serve production build
```

## Linting with Oxlint

This project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) for fast, efficient linting. Oxlint is 50-100x faster than ESLint and supports TypeScript, React, and many popular ESLint rules out of the box.

### Oxlint Configuration

Linting is configured in `.oxlintrc.json` with:

- **Categories**: `correctness` (errors), `suspicious` (warnings), and `pedantic` (warnings)
- **Plugins**: React, TypeScript, Unicorn, and OXC built-in rules
- **Environment**: Browser and ES2020 globals
- **Ignore patterns**: `dist` and `node_modules` directories

### Running the linter

```bash
# Lint all files
pnpm lint

# Lint with auto-fixing (where available)
oxlint --fix

# Lint specific files
oxlint src/
```

## Git Hooks & Code Quality

### Pre-commit Hooks

Husky and lint-staged ensure code quality before commits:

1. **Prettier**: Formats staged files
2. **Oxlint**: Lints TypeScript/JavaScript files
3. **tsc-files**: Type checks individual staged files
4. **Commitlint**: Validates commit message format

### Lint-staged Configuration

The `lint-staged` configuration uses `tsc-files` for efficient TypeScript checking of only the staged files, avoiding issues with module resolution when checking individual files.

### Commit-msg Validation

All commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
feat: add new contact form validation
fix: resolve mobile navigation issue
docs: update README with deployment instructions
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required for contact form
RESEND_API_KEY=your_resend_api_key
TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Optional for development
NODE_ENV=development
```

## Deployment

This application can be deployed to any Node.js hosting platform:

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel/Netlify

The built application in the `build/` directory can be deployed to any static hosting service or Node.js environment.

### Server Requirements

- Node.js 20+
- Environment variables configured
- Access to external services (Resend, Cloudflare Turnstile)

## Migration from Remix v2

This project has been migrated from Remix v2 to React Router v7. Key changes include:

### Package Updates

- `@remix-run/*` packages → `@react-router/*` and `react-router`
- Updated import paths and API usage
- New `routes.ts` configuration file

### Route Configuration

- Added `app/routes.ts` with `flatRoutes()` for file-based routing
- Updated `vite.config.ts` to use `reactRouter()` plugin
- Created `react-router.config.ts` for framework configuration

### Component Updates

- `RemixBrowser` → `HydratedRouter`
- `RemixServer` → `ServerRouter`
- Updated import paths for routing hooks and components

## References & Inspiration

- [React Router v7 Documentation](https://reactrouter.com)
- [React Spring Documentation](https://www.react-spring.dev/docs)
- [React Three Fiber Documentation](https://r3f.docs.pmnd.rs)
- [Ant Design Documentation](https://ant.design)
- [Oxlint Documentation](https://oxc.rs/docs/guide/usage/linter)
- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile)
