# Book Management Library

A full-stack book management application built with:

- React + Vite frontend
- Express + MongoDB backend
- CRUD operations for books
- Search, pagination, and dashboard summary cards

## Project Structure

```text
backof_today_23/
  backend/
  front-end/
```

## Features

- Add a new book
- View all books
- Search books by name, author, or edition
- Edit existing book details
- Delete a book
- Browse paginated book cards
- See collection summary on the dashboard

## Prerequisites

- Node.js installed
- MongoDB connection string

## Backend Setup

Go to the backend folder:

```powershell
cd C:\Users\HP\Downloads\backof_today_23\backof_today_23\backend
```

Create a `.env` file with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=4004
```

Install dependencies if needed:

```powershell
npm install
```

Run the backend in development mode:

```powershell
npm run dev
```

Run the backend normally:

```powershell
npm start
```

## Frontend Setup

Go to the frontend folder:

```powershell
cd C:\Users\HP\Downloads\backof_today_23\backof_today_23\front-end
```

Create a `.env` file using `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:4004/api
```

Install dependencies if needed:

```powershell
npm install
```

Start the frontend:

```powershell
npm run dev
```

Build the frontend:

```powershell
npm run build
```

Lint the frontend:

```powershell
npm run lint
```

## API Overview

Base URL:

```text
http://localhost:4004/api
```

Main endpoints:

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- `GET /books/search/:name`
- `GET /books/stats/summary`

## Typical Run Order

1. Start the backend on port `4004`
2. Start the frontend Vite server
3. Open the frontend in the browser
4. Add, edit, search, paginate, and delete books

## Verification

Frontend checks completed:

- `npm run build`
- `npm run lint`

Backend checks completed:

- `node --check server.js`
