
# TaskPilot AI

TaskPilot AI is an AI-powered email productivity web application that helps users manage emails, generate AI replies, and create tasks from Gmail messages.

The app connects with Gmail, fetches recent inbox emails, stores them in PostgreSQL, and uses AI to generate professional email replies and task suggestions.

## Features

- User registration and login
- Protected app pages
- Gmail OAuth connection
- Gmail inbox email sync
- Daily updated email fetching
- AI-generated email replies
- AI-generated tasks 
- Regenerate AI replies
- Copy AI replies
- Send AI-generated replies through Gmail API
- Store sent reply status in PostgreSQL
- Dashboard overview
- Email list and email detail pages
- Email review status
- Task status management
- Members page
- Account page
- Preferences page
- Security and privacy page
- Feedback page
- Search page
- Responsive top navigation
- Responsive side navigation
- Clean login and register pages

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- NextUI
- Lucide React
- PostgreSQL
- pg
- Gmail API
- Google OAuth
- Gemini AI API
- bcryptjs
- React Hook Form
- Zod

## Project Structure

```txt
src
├── app
│   ├── api
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── emails
│   │   ├── gmail
│   │   ├── replies
│   │   └── tasks
│   ├── auth
│   │   ├── login
│   │   └── register
│   ├── dashboard
│   ├── email
│   ├── replies
│   ├── tasks
│   ├── members
│   ├── settings
│   ├── account
│   ├── preferences
│   ├── security
│   ├── feedback
│   └── search
├── components
│   ├── navbar
│   ├── footer
│   └── AuthGuard.tsx
└── lib
    ├── auth.ts
    ├── db.ts
    └── schemas
    
    
<!-- 
# Getting Started 

1. Clone the repository

git clone https://github.com/your-username/taskpilot-ai.git
cd taskpilot-ai

2. Install dependencies
npm install

3. Create environment file
Create a .env.local file in the project root.

DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskpilotai

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

GEMINI_API_KEY=your_gemini_api_key

CRON_SECRET=your_secret_key

Do not commit .env.local to GitHub.

# Database Setup
This project uses PostgreSQL.
Create a local PostgreSQL database:

taskpilotai

Main database tables:
users
sessions
connected_accounts
emails
ai_replies
tasks

Run Locally
npm run dev

Open:
http://localhost:3000

Authentication

The app uses email/password authentication with session cookies.
Protected pages require login before access.

Protected pages include:

Dashboard
Emails
Email details
Tasks
AI Replies
Members
Settings
Account
Preferences
Security
Feedback
Search

## Gmail Integration

Users can connect their Gmail account using Google OAuth.

After Gmail is connected, the app can:

- Sync recent inbox emails
- Store emails in PostgreSQL
- Generate AI replies from email content
- Send reviewed AI replies through Gmail API

Example Gmail sync query:

in:inbox newer_than:1d

For sending emails, the app requires Gmail send permission:
https://www.googleapis.com/auth/gmail.send

## AI Reply Generation and Gmail Sending

TaskPilot AI uses Gemini AI to generate professional email replies based on the original Gmail email content.

Users can:

- Generate AI replies from email content
- Regenerate replies
- Copy AI replies
- Review the generated reply before sending
- Send AI-generated replies through the Gmail API

The reply flow:

```txt
User opens an email
→ App reads saved email content
→ Gemini AI generates a professional reply
→ Reply is saved in PostgreSQL
→ User reviews the reply
→ User sends the reply through Gmail API

Email Workflow

Connect Gmail
→ Sync inbox emails
→ Store emails in PostgreSQL
→ View emails in dashboard/email page
→ Generate AI replies
→ Create tasks from email context

Future Improvements
AWS deployment
Scheduled email sync
Improve Gmail reply threading and sent email tracking
Role-based workspace members
Improved AI task extraction
Notification system
Production monitoring


Author
Built by Kajanthuka Ulaganathan.

 -->
