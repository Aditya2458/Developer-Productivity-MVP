# 🚀 Developer Productivity MVP

A focused full-stack application that helps developers move from **raw metrics → insights → actionable improvements**.

---

## 🧠 Problem

Developers often see metrics like lead time, cycle time, and bug rate, but these numbers don’t explain:

* Why performance is good or bad
* What actions should be taken

---

## 💡 Solution

This MVP dashboard:

* 📊 Displays key developer productivity metrics
* 🧠 Interprets the data with insights
* 🚀 Suggests practical actions to improve workflow

---

## ✨ Features

* 📊 Metrics:

  * Lead Time
  * Cycle Time
  * Bug Rate
  * Deployment Frequency
  * PR Throughput

* 🧠 Insights:

  * Explains what’s happening behind the metrics

* 🚀 Suggestions:

  * Provides actionable steps to improve productivity

* 🟢 Status Indicators:

  * Good / Moderate / High risk labels

---

## 🏗️ Tech Stack

* **Frontend:** React.js
* **Backend:** FastAPI
* **Data:** Static JSON (mock data for MVP)

---

## 📁 Project Structure

```
developer-productivity-mvp/
├── backend/     # FastAPI backend
├── frontend/    # React frontend
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/Developer-Productivity-MVP.git
cd developer-productivity-mvp
```

---

### 2️⃣ Run Backend

```
cd backend
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Run Frontend

Open a new terminal:

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🎯 MVP Focus

This project intentionally focuses on a **single user journey**:

> Developer → Sees Metrics → Gets Insights → Takes Action → Improves Productivity

---

## 🚀 Future Improvements

* Personalized insights
* Historical trend analysis
* Manager/team dashboard
* Real-time data integration

---

## 🤖 AI Usage

AI tools were used to accelerate development and improve UI, while ensuring full understanding of the logic and implementation.

---

## 📌 Author

Aditya

---
