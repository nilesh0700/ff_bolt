# Financial Future Self - AI-Powered Financial Planning

A Next.js application that connects your financial accounts to provide AI-powered financial insights and projections with your "future self."

## Features

- 🔐 **Secure Authentication** - Supabase Auth with Google OAuth and email/password
- 💳 **Account Integration** - Connect Fi Money, Zerodha, and other financial accounts
- 🤖 **AI Chat Interface** - Chat with your future self for financial advice
- 📊 **Progress Tracking** - Monitor your financial health and goals
- 🎯 **Action Center** - Personalized recommendations for financial improvement
- 📈 **Scenario Planning** - Explore different financial futures based on your decisions
- 👤 **Profile Management** - Comprehensive user profile and settings

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: React Query for server state
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## Architecture Overview

### Database Schema
- **profiles**: User profile information and preferences
- **connected_accounts**: Financial account connections
- **financial_data**: User's financial information
- **recommendations**: AI-generated financial recommendations
- **scenarios**: Financial projection scenarios
- **chat_messages**: Chat history with future self

### Authentication Flow
1. User signs up/signs in via Supabase Auth
2. Profile is automatically created via database trigger
3. User guided through onboarding flow
4. Account connections established
5. AI recommendations generated

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd financial-future-self
npm install
```

### 2. Set Up Supabase

#### Create a New Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully set up

#### Set Up the Database
1. In your Supabase dashboard, go to the SQL Editor
2. Run the SQL script from `supabase/migrations/001_initial_schema.sql`
3. This will create all necessary tables, functions, and RLS policies

#### Configure Authentication
1. In Supabase dashboard, go to Authentication > Settings
2. Configure Site URL: `http://localhost:3000`
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000` (for development)

#### Set Up Google OAuth (Optional)
1. Go to Authentication > Providers in Supabase
2. Enable Google provider
3. Add your Google OAuth credentials
4. Set authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration  
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

To get these values:
1. Go to your Supabase project settings
2. Navigate to API section
3. Copy the Project URL and anon public key
4. Copy the service role key (keep this secret!)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── connect/           # Account connection
│   ├── onboarding/        # User onboarding
│   ├── chat/              # Chat interface
│   ├── actions/           # Action center
│   ├── scenarios/         # Scenario planning
│   ├── progress/          # Progress tracking
│   └── profile/           # Profile management
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...               # Feature components
├── lib/                  # Utilities and configurations
│   ├── supabase.ts       # Supabase client
│   ├── supabase-auth.ts  # Authentication hooks
│   ├── react-query.ts    # React Query setup
│   ├── database.types.ts # TypeScript types
│   └── hooks/            # Custom hooks
├── supabase/
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## Key Features

### Authentication System
- **Supabase Auth**: Email/password and OAuth providers
- **Protected Routes**: Automatic redirects for unauthenticated users
- **Profile Management**: Complete user profile system
- **Session Management**: Persistent sessions with automatic refresh

### Database Integration
- **Row Level Security**: Secure data access per user
- **Real-time Updates**: Live data synchronization
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Comprehensive error boundaries

### UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and progress indicators
- **Error States**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation

## API Routes

### Authentication
- `POST /api/auth/callback` - OAuth callback handler

### Profile Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `POST /api/profile` - Create user profile

### Recommendations
- `GET /api/recommendations` - Get user recommendations
- `POST /api/recommendations` - Create recommendation

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow Next.js 14 app directory conventions
- Use Tailwind CSS for styling
- Implement proper error handling

### Database Queries
- Use React Query for all data fetching
- Implement optimistic updates where appropriate
- Cache data appropriately
- Handle loading and error states

### Security
- Never expose service role keys in client code
- Use RLS policies for data access control
- Validate all user inputs
- Implement proper CORS settings

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update Supabase redirect URLs for production domain
4. Deploy

### Environment Variables for Production
Update your production environment variables and Supabase settings:
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/auth/callback`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 