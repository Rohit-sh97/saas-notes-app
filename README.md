# SaaS Notes App

A **multi-tenant SaaS notes application** built with the MERN stack.  
Each tenant (organization) has its own users and notes. The app includes authentication, role-based access, and a simple free vs. pro upgrade flow.  

---

## 🚀 Features

- **Multi-Tenant Architecture**  
  - Shared database, separated by `tenantId`.  
  - Each user belongs to a tenant.  

- **Authentication & Authorization**  
  - Secure login with JWT.  
  - Role-based access (admin, user).  

- **Notes Management**  
  - Create, read, update, and delete notes.  
  - Free plan limited to 3 notes → upgrade to Pro for unlimited notes.  

- **Upgrade Flow**  
  - Upgrade button appears when free limit is reached.  

- **Frontend**  
  - Built with React + Vite.  
  - Protected routes (redirect to login if not authenticated).  

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Axios, React Router  
- **Backend:** Node.js, Express, JWT, bcrypt  
- **Database:** MongoDB (Mongoose)  
- **Deployment:**  
  - Frontend → Vercel  
  - Backend → Render / Railway / Vercel functions  

---

## 📂 Project Structure

saas-notes-app/
│── backend/ # Express + MongoDB API
│ ├── models/ # User, Note, Tenant schemas
│ ├── routes/ # Auth, Notes, Tenants
│ ├── seed.js # Seeder script
│ └── server.js # Entry point
│
│── frontend/ # React client
│ ├── src/
│ │ ├── api.js # Axios setup
│ │ ├── pages/ # Login, Notes
│ │ └── App.jsx # Routes
│ └── vite.config.js
│
└── README.md


---

## ⚡️ Getting Started

### 1. Clone the repo
```bash

git clone https://github.com/YOUR_USERNAME/saas-notes-app.git
cd saas-notes-app

2. Backend Setup
cd backend
npm install


Create a .env file in backend/ with:

PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=supersecretkey


Seed the database with tenants and users:

node seed.js


Run the server:

npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev


Frontend → http://localhost:5173

Backend → http://localhost:4000

🔑 Test Login

After seeding, you can log in with these test accounts (password: password):

admin@acme.test (Admin, Acme tenant)

user@acme.test (Member, Acme tenant)

admin@globex.test (Admin, Globex tenant)

user@globex.test (Member, Globex tenant)

🌍 Deployment

Frontend: [Vercel link here]

Backend: [Render/Railway link here]

📌 Roadmap

 Add Stripe integration for real upgrade flow

 Add user invitations for tenants

 Add note sharing & collaboration

📜 License

MIT License © 2025 Rohit Sharma
