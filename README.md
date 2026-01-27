# odin-file-uploader

A full-stack file upload and management application built with **Express**, **Prisma**, and **Passport.js**.  
Users can sign up, log in, create folders, upload files, and download them securely using session-based authentication.

---

## Features

- User authentication with **Passport.js (Local Strategy)**
- **Session-based authentication** stored in the database using Prisma Session Store
- Folder management (Create, Read, Update, Delete)
- File uploads using **Multer**
- File validation (type and size limits)
- Files stored locally on the filesystem
- Download uploaded files
- Server-side rendering with **EJS**

---

## Tech Stack

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Passport.js**
- **express-session**
- **@quixo3/prisma-session-store**
- **Multer**
- **EJS**
- **bcrypt**
- **express-validator**

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repo-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a .env file**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
SESSION_SECRET="your-secret-key"
```

4. **Run Prisma migrations**

```bash
npx prisma migrate dev
```

5. **Start the server**

```bash
node app.js
```

---

## File Upload Rules

- Allowed file types:

  - PNG
  - JPEG
  - PDF

- Maximum file size: 5MB
- Files are stored locally in the uploads/ directory
