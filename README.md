# AI Ticket Assistant

A modern, AI-powered ticket management system that automatically analyzes, prioritizes, and assigns support tickets using AI.

## 🚀 Features

### Core Functionality
- **AI-Powered Ticket Analysis**: Automatically analyzes ticket content using Gemini AI to extract priority, related skills, and helpful insights
- **Smart Ticket Assignment**: Automatically assigns tickets to moderators based on their skills and expertise
- **Real-time Notifications**: Email notifications for ticket assignments and status updates
- **Role-based Access Control**: User roles (user, moderator, admin) with different permissions
- **Modern Web Interface**: Beautiful, responsive UI built with React and Tailwind CSS

### AI Capabilities
- **Automatic Priority Detection**: AI analyzes ticket content to determine priority levels (low, medium, high)
- **Skill Matching**: Identifies relevant technical skills needed for each ticket
- **Intelligent Summarization**: Provides helpful notes and descriptions for better ticket understanding
- **Smart Assignment**: Matches tickets to moderators with relevant skills

### Workflow Automation
- **Background Processing**: Uses Inngest for reliable background job processing
- **Event-driven Architecture**: Automatic ticket processing on creation
- **Error Handling**: Robust error handling with retry mechanisms
- **Status Tracking**: Real-time ticket status updates

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Inngest** for background job processing
- **JWT** for authentication
- **Nodemailer** for email notifications
- **Google Gemini AI** for intelligent ticket analysis

### Frontend
- **React 19** with Vite
- **Tailwind CSS** with DaisyUI components
- **React Router** for navigation
- **React Markdown** for rich text rendering

### Development Tools
- **ESLint** for code linting
- **Nodemon** for development server
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** database (local or cloud)
- **Google Gemini API** key
- **Email service** credentials (for notifications)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Agentic-AI
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Start the development server:
```bash
npm run dev
```

For background job processing:
```bash
npm run inngest-dev
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend/ai-ticket-frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_SERVER_URL=http://localhost:8000/api
```

Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
Agentic-AI/
├── backend/
│   ├── controllers/          # Request handlers
│   ├── inngest/             # Background job functions
│   ├── middlewares/         # Authentication middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions (AI, DB, Mailer)
│   └── index.js             # Main server file
└── frontend/
    └── ai-ticket-frontend/
        ├── src/
        │   ├── components/   # Reusable components
        │   └── pages/        # Page components
        └── public/           # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### Background Jobs
- `POST /api/inngest` - Inngest webhook endpoint

## 🤖 AI Integration

The system uses Google Gemini AI to automatically analyze tickets:

1. **Content Analysis**: Extracts key information from ticket title and description
2. **Priority Detection**: Determines ticket priority based on content analysis
3. **Skill Identification**: Identifies relevant technical skills needed
4. **Smart Assignment**: Matches tickets to moderators with appropriate skills

### AI Processing Flow
1. User creates a ticket
2. Inngest triggers background processing
3. AI analyzes ticket content
4. System updates ticket with AI insights
5. Ticket is assigned to appropriate moderator
6. Email notification is sent

## 👥 User Roles

### User
- Create and view tickets
- Update own tickets
- Basic ticket management

### Moderator
- All user permissions
- Assign tickets to users
- Update ticket status
- Receive ticket assignments

### Admin
- All moderator permissions
- Manage users and roles
- System-wide access
- Fallback assignment target

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Role-based Access**: Granular permission system
- **CORS Protection**: Cross-origin request security
- **Environment Variables**: Secure configuration management

## 📧 Email Notifications

The system automatically sends email notifications for:
- Ticket assignments to moderators
- User registration confirmations
- Important status updates

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Set up Inngest for production
4. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Integration with external tools (Slack, Discord)
- [ ] Mobile app development
- [ ] Advanced AI features (sentiment analysis, auto-resolution)
- [ ] Multi-language support
- [ ] Advanced reporting and metrics 