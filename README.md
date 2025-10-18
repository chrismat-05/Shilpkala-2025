# Shilpkala 2025 🎨

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

A modern, responsive web application for **Shilpkala 2025** - the annual cultural and fine arts festival showcasing student creativity and artistic talent. This platform provides event information, registration management, and automated ticket generation with QR code validation.

## ✨ Features

- **🎭 Event Showcase**: Interactive carousel displaying festival events with detailed information
- **🎫 Automated Ticket Generation**: PDF tickets with embedded QR codes for secure validation
- **📧 Email Integration**: Automated ticket delivery via email using Nodemailer
- **📊 Real-time Analytics**: Live registration count tracking with auto-refresh functionality
- **🎨 Modern UI/UX**: Built with Radix UI primitives and Tailwind CSS for a polished experience
- **📱 Responsive Design**: Mobile-first approach ensuring optimal experience across all devices
- **⚡ Performance Optimized**: Leveraging Vite's lightning-fast HMR and optimized builds
- **🔒 Type Safety**: Full TypeScript implementation for robust, maintainable code

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with React Router DOM for client-side routing
- **Build Tool**: Vite 5.4.19 with SWC for blazing-fast development
- **Styling**: 
  - Tailwind CSS 3.4.17 with custom configuration
  - Radix UI components for accessible, unstyled primitives
  - Framer Motion for smooth animations
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom component library based on shadcn/ui architecture

### Backend (Serverless)
- **Runtime**: Node.js with ES Modules
- **API Framework**: Vercel Serverless Functions
- **PDF Generation**: pdf-lib with custom font embedding
- **QR Code**: qrcode library for ticket validation codes
- **Email Service**: Nodemailer with Gmail SMTP
- **HTTP Client**: Axios with retry logic and timeout handling

### Development Tools
- **Language**: TypeScript 5.8.3
- **Linting**: ESLint 9.32.0 with TypeScript and React plugins
- **Code Formatting**: Integrated with Vite and ESLint
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.x or higher (LTS recommended)
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: For version control
- **Gmail Account**: For SMTP email functionality (development/production)

## 🚀 Getting Started

### Quick Start

```bash
# Clone and setup
git clone https://github.com/chrismat-05/Shilpkala-2025.git
cd Shilpkala-2025
npm install

# Start development
npm run dev
```

### 1. Clone the Repository

```bash
git clone https://github.com/chrismat-05/Shilpkala-2025.git
cd Shilpkala-2025
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages defined in `package.json`, including production and development dependencies.

### 3. Environment Configuration

Configure your variables:

```bash
.env
```


**Key Variables**:
- `GMAIL_USER` & `GMAIL_PASS`: Gmail SMTP credentials for ticket delivery
- `VITE_REG_COUNT` & `REG_COUNT_URL`: Registration statistics data source

**Important Security Notes**:
- Never commit `.env` files to version control
- Use Gmail App Passwords instead of regular passwords ([Generate here](https://myaccount.google.com/apppasswords))
- For production, set environment variables through Vercel's dashboard

### 4. Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🔧 Development Guide

### Project Structure

```
Shilpkala-2025/
├── api/                        # Vercel Serverless Functions
│   ├── sendTicket.js          # Ticket generation and email API
│   └── regCounts.js           # Registration statistics API
├── public/                     # Static assets
│   ├── bg.png                 # Background image
│   ├── bgcover.png            # Cover image
│   ├── favicon.png            # Site favicon
│   └── festlogo.png           # Festival logo
├── src/
│   ├── assets/                # Application assets
│   │   ├── fonts/            # Custom fonts (Michroma-Regular.ttf)
│   │   └── media/            # Event images and media
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI primitives (shadcn/ui based)
│   │   ├── BrochureCard.tsx  # Event brochure display
│   │   ├── EventCard.tsx     # Individual event card
│   │   ├── EventCarousel.tsx # Event carousel container
│   │   └── ShilpkalaLoader.tsx # Custom loading animation
│   ├── data/
│   │   └── events.json       # Event configuration data
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.tsx    # Mobile detection hook
│   │   ├── use-toast.ts      # Toast notification hook
│   │   └── useAutoRefresh.ts # Auto-refresh functionality
│   ├── lib/
│   │   ├── images.ts         # Image path resolution
│   │   └── utils.ts          # Utility functions (cn, etc.)
│   ├── pages/                 # Route pages
│   │   ├── Index.tsx         # Landing page
│   │   ├── Home.tsx          # Home/events page
│   │   ├── Registrations.tsx # Registration management
│   │   └── NotFound.tsx      # 404 page
│   ├── templates/
│   │   └── ticket.pdf        # PDF ticket template
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── .gitignore                # Git ignore configuration
├── components.json           # shadcn/ui configuration
├── eslint.config.js          # ESLint configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment configuration
└── vite.config.ts            # Vite build configuration
```

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

### API Endpoints

The application uses Vercel Serverless Functions for backend operations. These endpoints are automatically deployed to production but require special handling in local development.

#### Local Development Setup

**Important**: API endpoints run only on production Vercel deployments by default. For local development, you have two options:

##### Option 1: Vercel Dev Server (Recommended)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Run the Vercel development server
vercel dev
```

This emulates the Vercel production environment locally, including serverless functions, environment variables, and routing configuration.

##### Option 2: Custom Node.js Server

Create a `server.js` file in the project root to run API endpoints with a local Express server:

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// ES Module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('dist')); // Serve built frontend

// Import API handlers
import sendTicketHandler from './api/sendTicket.js';
import regCountsHandler from './api/regCounts.js';

// API Routes
app.post('/api/sendTicket', (req, res) => sendTicketHandler(req, res));
app.get('/api/regCounts', (req, res) => regCountsHandler(req, res));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```


**Note**: 
- You'll need to build the frontend first with `npm run build` before running the custom server.
- This is for **local development only**. For production, deploy to Vercel where the platform provides built-in rate limiting, DDoS protection, and scalability for your serverless functions.

#### Endpoint Documentation

##### `POST /api/sendTicket`

Generates a personalized PDF ticket with QR code and sends it via email.

**Request Body**:
```json
{
  "name": "John Doe",
  "roll": "1234567890",
  "email": "john.doe@example.com",
  "slot": "5th September 10:00 AM - 12:00 PM"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Ticket sent successfully!"
}
```

**Response** (Error):
```json
{
  "error": "Error message description"
}
```

**Technical Details**:
- Validates all required fields (name, roll, email, slot)
- Generates QR code from roll number using `qrcode` library
- Loads PDF template from `src/templates/ticket.pdf`
- Embeds custom Michroma font and QR code into PDF
- Sends email with PDF attachment via Nodemailer
- Comprehensive error logging with ISO timestamps

**Error Handling**:
- 400: Missing required fields
- 405: Method not allowed (non-POST requests)
- 500: QR generation, PDF processing, email sending, or internal errors

##### `GET /api/regCounts`

Returns real-time registration statistics with caching mechanism.

**Query Parameters**:
- `force=true` (optional): Bypass cache and fetch fresh data

**Response**:
```json
{
  "data": {
    "total": 150,
    "bySlot": {
      "morning": 75,
      "afternoon": 75
    }
  },
  "cached": false,
  "lastUpdated": 1695000000000
}
```

**Technical Details**:
- Implements 25-second TTL cache to reduce external API calls
- Configurable timeout (default: 30s) and retry logic (default: 2 retries)
- Exponential backoff on retry attempts
- Falls back to cached data if external source fails
- Sets aggressive no-cache headers to prevent CDN/browser caching
- 502 error if no cached data available and fetch fails

**Headers Set**:
```
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Pragma: no-cache
Expires: 0
CDN-Cache-Control: no-store
Vercel-CDN-Cache-Control: no-store
```

## 🎨 Customization

### Adding New Events

Edit `src/data/events.json`:

```json
{
  "title": "Event Name",
  "description": "Event description",
  "date": "Event date",
  "time": "Event time",
  "venue": "Event venue",
  "image": "event-image.jpg"
}
```

Place event images in `src/assets/media/`.

### Modifying Ticket Template

1. Edit the PDF template: `src/templates/ticket.pdf`
2. Adjust positioning in `api/sendTicket.js`:
   - Text coordinates: `x` and `y` parameters in `page.drawText()`
   - QR code: `x`, `y`, `width`, `height` in `page.drawImage()`

### Customizing UI Components

Components in `src/components/ui/` can be customized via:
- Props (size, variant, etc.)
- Tailwind classes
- CSS variables in `index.css`

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
# Development deployment
vercel

# Production deployment
vercel --prod
```

4. **Configure Environment Variables**:
   - Navigate to your project on Vercel dashboard
   - Go to Settings → Environment Variables
   - Add all variables from your `.env` file
   - Redeploy for changes to take effect

### Manual Build

```bash
# Build for production
npm run build

# Output will be in the `dist/` directory
# Deploy the `dist/` folder and `api/` folder to your hosting provider
```

**Important**: Ensure your hosting provider supports:
- Node.js serverless functions (for `api/` folder)
- SPA routing (redirect all routes to `index.html`)
- Environment variable configuration

## 🧪 Testing

Currently, the project uses manual testing. To test:

1. **Frontend**: Run `npm run dev` and manually test UI interactions
2. **API Endpoints**: Use tools like Postman or curl to test `/api/*` endpoints
3. **Build**: Run `npm run build` to ensure production build succeeds
4. **Linting**: Run `npm run lint` to check for code quality issues

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Ensure TypeScript types are properly defined
- Run `npm run lint` before committing
- Test your changes thoroughly

## 📝 License

This project is proprietary software created for Shilpkala 2025. All rights reserved.

## 👏 Credits

- **Developer**: [Chris Mathew Aje (CMA)](https://thecma.xyz)
- **For**: Kristu Jayanti College Fine Arts Club
- **Event**: Shilpkala 2025
- **Instagram**: [@kristujayanti_fineartsclub](https://www.instagram.com/kristujayanti_fineartsclub/)

**Built with ❤️ for Shilpkala 2025**
