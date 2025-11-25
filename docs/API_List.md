# 📌 **HRM System – Complete API Endpoints**

---

## **🔐 Authentication**

| Method   | Endpoint             | Description                 |
| -------- | -------------------- | --------------------------- |
| **POST** | `/api/auth/login`    | Login user                  |
| **POST** | `/api/auth/register` | Register new employee/admin |

---

## **👤 Employee Management**

| Method     | Endpoint             | Description        |
| ---------- | -------------------- | ------------------ |
| **POST**   | `/api/employees`     | Create employee    |
| **GET**    | `/api/employees`     | Get all employees  |
| **GET**    | `/api/employees/:id` | Get employee by ID |
| **PUT**    | `/api/employees/:id` | Update employee    |
| **DELETE** | `/api/employees/:id` | Delete employee    |

---

## **📅 Attendance**

| Method   | Endpoint                    | Description                           |
| -------- | --------------------------- | ------------------------------------- |
| **POST** | `/api/attendance/punch-in`  | Punch In                              |
| **POST** | `/api/attendance/punch-out` | Punch Out                             |
| **GET**  | `/api/attendance/me`        | Get logged-in user attendance history |

---

## **📝 Leave Management**

| Method     | Endpoint                  | Description                   |
| ---------- | ------------------------- | ----------------------------- |
| **POST**   | `/api/leaves`             | Apply for leave               |
| **GET**    | `/api/leaves/me`          | Get logged-in user's leaves   |
| **GET**    | `/api/leaves/all`         | Admin view all leave requests |
| **PUT**    | `/api/leaves/:id/approve` | Approve leave                 |
| **PUT**    | `/api/leaves/:id/reject`  | Reject leave                  |
| **PUT**    | `/api/leaves/:id`         | Update leave (if required)    |
| **DELETE** | `/api/leaves/:id`         | Delete leave                  |

---

## **💰 Payroll**

| Method   | Endpoint               | Description                     |
| -------- | ---------------------- | ------------------------------- |
| **POST** | `/api/payroll/process` | Process payroll for employee(s) |

---

## **📊 Finance**

| Method  | Endpoint               | Description                            |
| ------- | ---------------------- | -------------------------------------- |
| **GET** | `/api/finance/summary` | HR/Admin finance summary or statistics |

---

## **📁 File Manager**

| Method   | Endpoint            | Description        |
| -------- | ------------------- | ------------------ |
| **POST** | `/api/files/upload` | Upload file        |
| **GET**  | `/api/files`        | List or view files |

---

## **📦 Assets**

| Method  | Endpoint                 | Description             |
| ------- | ------------------------ | ----------------------- |
| **PUT** | `/api/assets/:id/return` | Return assigned asset   |
| **PUT** | `/api/assets/:id`        | Update asset assignment |

---

## **⚠ Complaints / Grievance**

| Method  | Endpoint                      | Description       |
| ------- | ----------------------------- | ----------------- |
| **PUT** | `/api/complaints/resolve/:id` | Resolve complaint |

---

## **🛡 Backup**

| Method   | Endpoint      | Description     |
| -------- | ------------- | --------------- |
| **POST** | `/api/backup` | Create backup   |
| **GET**  | `/api/backup` | Get backup file |

---

# 🎯 Notes

* All sensitive endpoints require JWT authentication middleware
* Roles are handled as Admin / Employee for access control
* Error responses follow standard structure: `{ status, message, data }`
