# Tickets Application

## Project Overview
Tickets is a role-based issue tracking platform for organizations. It provides separate flows for Users (raise and monitor tickets), Admins (work assigned tickets), and Super-Admins (user administration and ticket assignment).

This update focuses on **logic correctness and hardening** without changing user-facing workflows.

## Tech Stack

### Backend
- Node.js
- Express.js
- Mongoose
- JWT (`jsonwebtoken`)
- BCrypt (`bcrypt`)

### Frontend
- React
- React Router
- Axios
- Bootstrap / React-Bootstrap

### Database
- MongoDB

## Core Features

### Booking / Ticketing Workflow
- Raise ticket with title, description, and attachments
- View tickets raised by the logged-in user
- Resolve / invoke tickets
- Assign tickets to admins
- Track ticket status (Created, In Progress, Resolved)

### User Authentication
- Register user accounts with hashed passwords
- Login with JWT-based authentication
- Role-protected routes (`User`, `Admin`, `Super-Admin`)
- Pending/disabled users are blocked from login until activated

### Admin Panel
- Admin ticket assignment view
- Super-admin user activation/disable controls
- Super-admin user and admin listing
- Super-admin ticket listing and assignment actions

## Installation Guide

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB instance

### 1) Clone repository
```bash
git clone <your-repo-url>
cd Tickets
```

### 2) Install backend dependencies
```bash
cd tickets-backend
npm install
```

### 3) Install frontend dependencies
```bash
cd ../tickets-front
npm install
```

### 4) Configure environment variables
Create `tickets-backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tickets
SECRET_KEY=replace_with_strong_random_secret
CLIENT_ORIGIN=http://localhost:3000
```

Create `tickets-front/.env`:
```env
REACT_APP_BASE_URI=http://localhost:5000
```

### 5) Run backend
```bash
cd tickets-backend
npm run dev
```

### 6) Run frontend
```bash
cd tickets-front
npm start
```

## Security and Stability Notes (Updated)
- Email normalization is applied in auth paths to prevent case/whitespace mismatch at login.
- Password verification now has explicit invalid credential responses.
- JWT is returned in response body and mirrored in `Authorization` response header.
- CORS now exposes `Authorization` header and supports credentialed requests.
- Environment-based secrets/config are documented; no hardcoded secrets are used.

## Updated API / Route Documentation

Base backend URL: `http://localhost:5000`

### User Routes (`/user`)
- `POST /register`
  - Body: `{ name, email, password, mobile, org_name, role }`
  - Response: `201` on success
- `POST /login`
  - Body: `{ email, password }`
  - Response: `200` with `{ jwtToken }`
  - Response Header: `Authorization: Bearer <token>`
- `POST /getSingleUserDetails`
  - Body: `{ userId }`
- `POST /raiseTicket` *(User auth required)*
- `GET /getAllTicketsOfUser` *(User auth required)*
- `GET /resolveTicket/:ticketId` *(User auth required)*
- `GET /invokeTicket/:ticketId` *(User auth required)*

### Admin Routes (`/admin`)
- `GET /getAssignedTickets` *(Admin auth required)*

### Super Admin Routes (`/s-admin`)
- `GET /activateUser/:userId` *(Super-Admin auth required)*
- `GET /disableUser/:userId` *(Super-Admin auth required)*
- `GET /getAllTickets` *(Super-Admin auth required)*
- `POST /assignTicketToAdmin` *(Super-Admin auth required)*
- `GET /getAllAdmins` *(Super-Admin auth required)*
- `GET /getAllUsers` *(Super-Admin auth required)*

## Auth Header Format
For protected endpoints, send:
```http
Authorization: Bearer <jwtToken>
```

## Notes on Backward Compatibility
- No feature additions or UI-flow changes were made.
- Changes are internal: auth correctness, query consistency, safer middleware behavior, and removal of redundancy.
