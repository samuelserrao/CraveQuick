# CraveQuick 🍔

CraveQuick is a modern, full-stack food delivery application built using the MERN stack (React, Express, Mongoose, and MongoDB Atlas) featuring dynamic restaurant listings, dish ordering, and real-time delivery agent route tracking.

---

## 🚀 Quick Start (Running on a new machine)

Follow these simple steps to set up and run the application on any other machine:

### 1. Prerequisites
Make sure you have **Node.js** (v16 or higher) installed on your machine.

### 2. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/samuelserrao/CraveQuick.git
cd CraveQuick
```

### 3. Install All Dependencies
We have configured a helper command to install dependencies for **both** the frontend and the backend automatically:
```bash
npm run install-all
```

### 4. Run the Application
Start both the frontend React/Vite development server and the backend Node/Express server in parallel with a single command:
```bash
npm run dev
```

* **Frontend URL:** `http://localhost:5173/`
* **Backend API URL:** `http://localhost:3000/api`

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React (Vite), Tailwind CSS, Zustand (State Management), Framer Motion (Animations), React Icons
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Database:** Hosted on MongoDB Atlas (Credentials are pre-configured in `backend/.env` for instant plug-and-play).

---

## ✨ Features Implemented

1. **Seeded MongoDB Inventory:** Automatic database population with 12 unique featured restaurants, 140 menu items, and 5 active delivery agents.
2. **Checkout & Order Flow:** Real order placement linked directly to the database.
3. **Real-time Order Tracking:** An interactive tracking dashboard with:
   - An animated SVG route map from Restaurant to Home.
   - Live location/status simulation (Preparing, Picked Up, Out for Delivery, Delivered).
   - Delivery partner contact actions (Call, Chat).
   - Real-time milestone notification logs.
