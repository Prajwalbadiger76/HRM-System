# 🚀 Modern HRM System — MERN + Java + DSA

A modern Human Resource Management System rebuilt from the legacy PHP-based HRM software.  
This version contains separate services for **Frontend (React)**, **Backend (Node + Express)**, and **Payroll Engine (Java Spring Boot)**, based on real enterprise structure and DSA-driven logic.

---

## 📦 Folder Structure

```

HRM-System/
│
├── backend-node/             # Express Node.js server APIs
├── frontend-react/           # React.js Frontend
├── java-service-payroll/     # Payroll microservice (Spring Boot)
├── backup/                   # Old SQL database & analysis files
└── docs/                     # Documentation and reference files

```

---

## 🔧 Tech Stack

| Layer | Technologies |
|--------|-------------|
| Frontend | React.js, Vite, Tailwind / Material UI |
| Backend (Primary) | Node.js, Express.js, MongoDB, JWT Auth |
| Payroll Engine | Java Spring Boot |
| Algorithm Usage | Greedy Interval Scheduling for leave conflict |
| Database | MongoDB (converted from old SQL schema) |

---

## 🧠 Key Features

| Module | Description |
|--------|-------------|
| Employee Management | CRUD operations |
| Leave Management | DSA-based conflict detection, approval workflow |
| Payroll System | Calculated using attendance, penalty & salary structure |
| Attendance | Daily check-in tracking |
| Admin Dashboard | HR data insights |
| Secure Auth | JWT Login, Admin / Employee roles |

---

## 📘 DSA Usage — Greedy Interval Scheduling

Used to prevent overlapping leave dates:
```

if (!(newEnd < existingStart || newStart > existingEnd))
→ conflict detected

```
**Time Complexity:** `O(N log N)`

---

## 💰 Payroll Calculation (Java Service)

```

Net Salary = (Basic Salary + Allowance) – (Deductions + LeavePenalty)
LeavePenalty = AbsentDays × (BasicSalary / TotalDays)

````

---

# ▶ How to Run the Project

## **1️⃣ Start Backend (Node + Express)**

```bash
cd HRM-System/backend-node
npm install
npm start
````

Server will run on:

```
http://localhost:9090
```

---

## **2️⃣ Start Frontend (React)**

```bash
cd HRM-System/frontend-react
npm install
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## **3️⃣ Run Payroll Java Microservice (Spring Boot)**

```bash
cd HRM-System/java-service-payroll
mvn spring-boot:run
```

Service runs on:

```
http://localhost:8080
```

---

## 🗄 Database Setup

* MongoDB must be running locally
* Import SQL reference file manually only for *understanding tables & redesign structure*
  (found inside: `/backup/hrmss.sql`)
* Collections will be auto-created on runtime

---

## 🎯 Future Enhancements

* Performance dashboard
* Salary slip PDF generation
* Biometric / QR attendance
* Automated email notifications
* RBAC Permission system

---

## 📞 Contact

**Author:** Prajwal Badiger
**Role:** Full Stack Developer — MERN + Java + DSA

**LinkedIn:** *https://www.linkedin.com/in/prajwal-badiger-388766220/*

**GitHub:** *https://github.com/Prajwalbadiger76/HRM-System.git*

---

### ⭐ Support

If this project helped you, please star ⭐ the repository.
