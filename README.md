# NEXUS Search Engine

A modern cyberpunk-themed search engine with advanced TrustPositif filtering powered by Penulis4D.

## 🚀 Features

- **Modern Cyberpunk Design**: Bright, responsive interface with animated elements
- **TrustPositif Integration**: Real-time filtering of blocked domains
- **Penulis4D Powered**: Enhanced search capabilities
- **Mobile Responsive**: Fully optimized for all devices
- **Real-time Search**: Instant search results with loading animations
- **Security Focused**: Built-in domain safety checking
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Backend**: Node.js, Express.js, Socket.IO
- **Search**: z-ai-web-dev-sdk with Bing integration
- **Security**: TrustPositif API integration
- **Database**: Prisma ORM with SQLite

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nexus-search-engine.git
cd nexus-search-engine
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  - `NODE_ENV=production`
- Click deploy

### DigitalOcean App Platform

1. Use the provided `do-app.yaml` configuration
2. Connect your GitHub repository
3. Deploy automatically

### Self-hosted VPS

1. **Upload files to your server**
2. **Install dependencies**
```bash
npm install
```

3. **Build the application**
```bash
npm run build
```

4. **Start with PM2**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### Docker Deployment

1. **Build Docker image**
```bash
docker build -t nexus-search-engine .
```

2. **Run with Docker Compose**
```bash
docker-compose up -d
```

## ⚙️ Configuration

### Environment Variables

Create `.env.production`:
```bash
NODE_ENV=production
PORT=3000
DOMAIN=your-domain.com
```

### Database Setup

The application uses Prisma with SQLite. To set up the database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

## 📱 Mobile Optimization

The application is fully responsive with:
- Touch-friendly interface
- Optimized typography for mobile screens
- Adaptive layouts for all screen sizes
- Fast loading on mobile networks
- Proper touch targets (minimum 44px)

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/
│   └── ui/           # UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── globals.css       # Global styles
```

## 🛡️ Security Features

- **TrustPositif Integration**: Real-time domain checking
- **Content Filtering**: Automatic blocking of unsafe domains
- **CORS Protection**: Secure cross-origin resource sharing
- **Input Validation**: Sanitized user inputs
- **Rate Limiting**: Protection against abuse

## 🎨 Design System

The application features:
- **Bright Theme**: Clean, modern interface
- **Cyberpunk Elements**: Neon accents and animations
- **Responsive Grid**: Adaptive layout system
- **Modern Typography**: Inter font with proper hierarchy
- **Smooth Animations**: Engaging micro-interactions

## 📊 Monitoring

### Health Check
The application includes a health check endpoint:
```
GET /api/health
```

### Logging
- Development logs saved to `dev.log`
- Production logs saved to `server.log`
- PM2 logging for production deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the deployment guide

## 🌟 Acknowledgments

- **TrustPositif**: For domain filtering services
- **Penulis4D**: For search engine integration
- **Next.js Team**: For the excellent framework
- **Tailwind CSS**: For the utility-first CSS framework

---

**🎉 NEXUS Search Engine - Modern, Secure, and User-Friendly Search Experience**