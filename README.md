<div align="center">

<h1>🏠 HouseHealth Frontend</h1>

**A modern React application providing an intuitive and responsive interface for HouseHealth, enabling users to securely monitor health metrics, collaborate with family members, and manage their healthcare in one place.**

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245)
![Recharts](https://img.shields.io/badge/Recharts-Charts-success)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

</div>

---

# 🌐 Live Demo

Experience HouseHealth using the live application.

**Website**

https://www.househealth.site

---

# 👤 Demo Account

Explore the application immediately using the pre-populated demo account.

| Field | Value |
|--------|-------|
| **Email** | `DemoUser@example.com` |
| **Password** | `1234567890` |

The demo account includes:

- Sample blood pressure history
- Sample fasting blood sugar history
- Sample post-meal blood sugar history
- Dashboard analytics
- Trend visualizations
- Family data
- Notifications
- Reminder settings
- PDF health report generation

> To experience registration, email verification, and password reset, create your own account instead of using the demo account.

---

# 📖 Overview

HouseHealth is a family-centered health monitoring platform that helps users record health metrics, visualize trends, and securely share health information with trusted family members.

This repository contains the React frontend responsible for delivering a modern, responsive user experience while communicating with the HouseHealth backend through a modular service layer.

---

# 🚀 Engineering Highlights

HouseHealth Frontend demonstrates modern frontend engineering practices including:

- Component-based React architecture
- Responsive user interface
- Protected routing
- Modular API service layer
- Environment-based configuration
- Feature-based code organization
- React Hook Form validation
- Interactive health visualizations
- Reusable UI components
- Production deployment on Vercel

---

# 🎨 Design Principles

The interface was designed around a few core principles:

- Clean healthcare-inspired design
- Family-centered user experience
- Simple navigation
- Responsive layouts
- Reusable UI components
- Maintainable feature-based architecture

---

# ⭐ Core Features

## Authentication

- User registration
- Login
- Email verification
- Forgot password
- Password reset
- Protected routes

---

## Dashboard

Provides users with:

- Latest health readings
- Health summaries
- Interactive trend charts
- Historical visualizations
- PDF report export

---

## Health Tracking

Users can:

- Record Blood Pressure
- Record Fasting Blood Sugar
- Record Post-Meal Blood Sugar
- View historical readings

---

## Family Management

Supports:

- Family creation
- Member invitations
- Family management
- Member trend viewing
- Care relationships

---

## Notifications

Provides notifications for:

- Family invitations
- Invitation responses
- Reminder notifications
- Care relationship updates

---

## Reminder Settings

Users can configure reminder preferences for supported health metrics.

---

## Profile

Users can:

- View profile information
- Update account details
- Manage personal health settings

---

# 🏗 Frontend Architecture

The frontend follows a modular architecture that separates UI, routing, and API communication.

```text
                 User

                  │

                  ▼

          React Components

                  │

                  ▼

             Page Components

                  │

                  ▼

        Feature Service Layer

                  │

                  ▼

       HouseHealth Backend API
```

Each feature communicates with the backend through dedicated service modules, keeping components focused on presentation while centralizing API interactions.

---

# 🛣 Routing

The application separates public and authenticated areas using React Router.

```text
Public Routes

Landing
Login
Register
Verify Email
Forgot Password
Reset Password

        │

        ▼

ProtectedRoute

        │

        ▼

MainLayout

        │

        ▼

Dashboard
Feed
History
Family
Notifications
Reminder Settings
Profile
Add Log
Member Trends
```

Protected routes require a valid authentication token before allowing access.

---

# 📁 Project Structure

```text
src

├── components
├── layouts
├── pages
├── services
├── styles
└── utils
```

| Folder | Responsibility |
|---------|----------------|
| components | Reusable UI components |
| layouts | Shared application layouts |
| pages | Feature pages and route components |
| services | Backend API communication |
| styles | Feature-based styling |
| utils | Shared helper utilities |

---

# 🔗 API Integration

The frontend communicates with the HouseHealth backend through a dedicated service layer.

Each feature encapsulates its API interactions in its own service module, improving maintainability and separating networking logic from UI components.

Examples include:

- Authentication
- Dashboard
- Health Logs
- Family Management
- Notifications
- Reminder Settings
- Reports
- Trends

Application configuration is managed using Vite environment variables, allowing different API endpoints for development and production environments.

---

# 🛠 Technology Stack

## Frontend

- React 19
- Vite
- React Router
- React Hook Form
- Recharts

## Styling

- CSS
- Feature-based stylesheet organization

## Icons

- Lucide React
- React Icons

## Deployment

- Vercel

---

# ⚙ Running Locally

## Clone the repository

```bash
git clone https://github.com/SaniaMB/househealth-frontend.git
```

## Install dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file and configure:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Start the development server

```bash
npm run dev
```

The application runs on:

```
http://localhost:5173
```

---

# 🚀 Deployment

The frontend is deployed on Vercel and communicates with the deployed Spring Boot backend through environment-based configuration.

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend API | Render |
| Database | Aiven MySQL |

---

# 🔮 Future Improvements

Planned enhancements include:

- Improved accessibility
- Enhanced animations
- Skeleton loading states
- Progressive Web App (PWA) support
- Offline capabilities
- Additional UI refinements

---

# 🔗 Full-Stack Project

HouseHealth is developed as a full-stack application across two repositories.

- **Backend (this repository):** Spring Boot REST API, authentication, business logic, data persistence, and reporting
- **Frontend:** React + Vite user interface

Explore the frontend repository here:

➡️ **https://github.com/SaniaMB/househealth**

# 👩‍💻 Author

**Sania Bhandari**

HouseHealth Frontend was developed as a portfolio project to demonstrate modern React development practices, responsive UI design, component-based architecture, API integration, authentication workflows, and production deployment.