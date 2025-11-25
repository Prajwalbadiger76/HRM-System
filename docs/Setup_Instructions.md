
# 📦 HRM-System — Setup & Installation Guide

## 🛠 **Prerequisites**

Make sure the following are installed on your system:

| Tool               | Version                  |
| ------------------ | ------------------------ |
| Node.js            | v18+                     |
| npm                | v8+                      |
| MongoDB            | Running locally or cloud |
| Java JDK           | 17+                      |
| Maven              | Latest                   |
| VS Code / IntelliJ | Recommended              |

---

## 📂 **Clone the Repository**

```bash
git clone https://github.com/Prajwalbadiger76/HRM-System.git
cd HRM-System
```

---

# ⚙️ Backend Setup (Node + Express)

### Navigate to backend folder

```bash
cd backend-node
```

### Create `.env`

**Windows**

```powershell
ni .env
```

**Inside `.env` add:**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hrmsystem
JWT_SECRET=mysupersecretkey
```

### Install dependencies

```bash
npm install
```

### Start backend server

```bash
npm start
```

Your backend will run on:
👉 `http://localhost:5000`

---

# 💻 Frontend Setup (React + Vite)

### Open new terminal and navigate to frontend

```bash
cd ../frontend-react
```

### Install dependencies

```bash
npm install
```

### Start frontend

```bash
npm run dev
```

Frontend URL:
👉 `http://localhost:5173`

---

# 📦 Payroll Service Setup (Java Spring Boot)

### Open another terminal

```bash
cd ../java-service-payroll
```

### Run the Spring Boot app

```bash
mvn spring-boot:run
```

Payroll microservice will run on:
👉 `http://localhost:8080`

---

# 🗄 Database Setup

* Start MongoDB
* Default DB name: `hrmsystem`
* Collections auto-create on first run

### Optional: Import sample data

If you have a backup (`.json` or `.bson`), use:

```bash
mongoimport --db hrmsystem --collection employees --file employees.json
```

---

# 🔗 API Base URLs

| Service          | URL                         |
| ---------------- | --------------------------- |
| Backend Node API | `http://localhost:5000/api` |
| Payroll Service  | `http://localhost:8080`     |
| Frontend Client  | `http://localhost:5173`     |

---

# 🧪 Testing Login

Default test credentials (create manually in DB if needed):

```
email: test2@mail.com
password: 123456
```

---

# 📦 Folder Structure

```
HRM-System/
 ┣ backend-node/          # Node Express backend
 ┣ frontend-react/        # React UI
 ┣ java-service-payroll/  # Payroll microservice
 ┗ README.md
```

---

#  Final Steps

1. Start **MongoDB**
2. Start **Backend** (`npm start`)
3. Start **Payroll** (`mvn spring-boot:run`)
4. Start **Frontend** (`npm run dev`)
5. Open browser → `http://localhost:5173`
