# 🚀 Modern HRM System (MERN + Java + DSA)

A **modernized Human Resource Management System** rebuilt from an old PHP-based HRM script using the **MERN Stack + Java Spring Boot + DSA-based backend logic**.  
This system provides employee management, attendance monitoring, leave processing with conflict detection, and automated payroll generation.

---

## 📌 Project Overview

This project converts the legacy PHP system into a modern, scalable architecture using modular frontend and backend applications.  
It uses the old SQL database structure as reference and implements enhanced performance & logic using Data Structures and Algorithms.

---

## 🔧 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js, Tailwind / Material UI |
| Backend (Primary) | Node.js, Express.js, JWT Auth, REST APIs |
| Backend (Payroll Module) | Java Spring Boot |
| Database | MongoDB (converted from SQL relational structure) |
| Real-time Logic | Socket.io (optional future enhancement) |
| DSA Implementation | Greedy Interval Scheduling for Leave Conflict |

---

## 🧠 Key Features

| Module | Description |
|--------|------------|
| Employee Management | CRUD operations for employee details |
| Leave Management | Leave apply, approval, rejection, conflict detection |
| Attendance System | Daily presence/absence tracking |
| Payroll Management | Salary calculation & deduction logic in Java Spring Boot |
| Admin Dashboard | HR insights and statistics |
| Authentication | JWT-based secure login system |

---

## 📂 Project Structure

```

hrm-system/
│
├── client/           # React Frontend
├── server/           # Node + Express Backend APIs
├── springboot/       # Java Payroll Logic
└── database/         # Old SQL reference + MongoDB schema

```

---

## 🧠 Important DSA Usage (Greedy Algorithm)
### **Greedy Interval Scheduling for Leave Conflict**
To prevent overlapping leave intervals, the system sorts existing leaves by end-date and checks conflict efficiently:

```

if (!(newEnd < existingStart || newStart > existingEnd))
→ conflict detected

```

### ⏳ Time Complexity
```

Sorting: O(N log N)
Checking: O(N)
Overall: O(N log N)

```

---

## 💰 Payroll Logic (Java Spring Boot)

### **Salary Formula**
```

Net Salary = (Basic Salary + Allowance) – (Deductions + LeavePenalty)
LeavePenalty = AbsentDays × (BasicSalary / TotalDays)

````

### Key Highlights
- Uses Java Streams for efficient attendance computation
- O(N) performance
- Clean Controller-Service-Repository layered architecture

---

## 🛠 Setup Instructions

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/your-username/hrm-system.git
cd hrm-system
````

### **2️⃣ Start Node / Express Backend**

```bash
cd server
npm install
npm start
```

### **3️⃣ Start React Frontend**

```bash
cd client
npm install
npm run dev
```

### **4️⃣ Run Java Payroll Microservice**

```bash
cd springboot
mvn spring-boot:run
```

---

## 🗄 Database Setup

* Old SQL file available under `/database/hrmss.sql` (reference for table → collection mapping)
* MongoDB creates collections automatically at runtime

---

## 🎯 Future Enhancements

* QR / Biometric attendance integration
* Salary slip PDF generator
* AI-based employee performance metrics
* Email notifications & reminders
* Role-based access control (RBAC)

---

## 🤝 Contributing

Contributions and feedback are welcome.
Feel free to open an issue or submit a pull request.

---

## 📞 Contact

**Author:** Prajwal Badiger
**Role:** Full Stack Developer (MERN + Java + DSA)
**LinkedIn:** *Add link here*
**GitHub:** *Add link here*

---

### ⭐ If you found this project useful, consider giving it a star!

```

---

### Want to add?

📌 Architecture Diagram  
📌 Screen UI / screenshots section  
📌 Demo video section example

Tell me and I’ll generate them too. 🚀
```
