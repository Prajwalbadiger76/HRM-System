# 📄 **HRM System – MongoDB Database Schema Documentation**

### *(Converted and Re-designed from the Old PHP SQL HRM System)*

## **Overview**

The **HRM System database** was originally built using a relational MySQL structure in the old PHP application.
For the modernized version, the database is migrated to **MongoDB**, a NoSQL document-based database, to support scalability, flexible schema evolution, and better performance for complex HR operations.

The conversion strategy involved analyzing the original SQL tables, identifying relational dependencies, and restructuring them into **collections and embedded/referenced documents**.
Instead of joins, MongoDB uses **ObjectId references** and **nested objects** where appropriate.

The final database contains **16 collections**, covering all HR modules such as employees, leaves, attendance, payroll, and administration processes.

---

## 🗂 **Database Name**

```
hrm_system
```

---

# 📦 **Collections & Schema Explanation**

Below is the detailed description of each MongoDB collection, fields, and their purpose within the HRMS workflow.

---

## **1. employees** — *(Core Entity)*

Stores all employee personal and professional information.

```json
{
  "_id": ObjectId,
  "employeeCode": String,
  "firstName": String,
  "lastName": String,
  "email": String,
  "phone": String,
  "gender": String,
  "dob": Date,
  "departmentId": ObjectId,       // Reference to departments collection
  "designation": String,
  "joinDate": Date,
  "salary": Number,
  "status": String,               // Active | Resigned | Terminated
  "address": String,
  "profileImage": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

### **Purpose**

This collection serves as the master record from which all employee-related modules reference data (attendance, payroll, leaves, complaints, etc.).

---

## **2. departments**

```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "createdAt": Date
}
```

### **Purpose**

Defines organization departments (HR, Development, Finance, etc.) referenced by employees.

---

## **3. attendances**

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "date": Date,
  "status": String,               // Present | Absent | Leave | Half-Day
  "checkIn": String,
  "checkOut": String,
  "createdAt": Date
}
```

### **Purpose**

Records daily work status and supports payroll penalty calculation.

---

## **4. leaves**

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "type": String,                 // Sick, Casual, Emergency
  "startDate": Date,
  "endDate": Date,
  "reason": String,
  "status": String,               // Pending | Approved | Rejected
  "appliedOn": Date,
  "approvedBy": ObjectId
}
```

### **Purpose**

Tracks leave requests with conflict detection handled through a **Greedy Interval Scheduling** DSA approach.

---

## **5. payroll**

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "basicSalary": Number,
  "allowance": Number,
  "deductions": Number,
  "absentDays": Number,
  "netSalary": Number,
  "periodStart": Date,
  "periodEnd": Date,
  "generatedAt": Date
}
```

### **Purpose**

Stores computed salary results using attendance and leave deduction rules.

---


## **6. announcements**

Stores company-wide updates and public notices posted by HR or higher management.

```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "date": Date,
  "createdBy": ObjectId            // Reference: employee/admin ID
}
```

### **Purpose**

This module allows the HR team to publish announcements such as holidays, policy updates, company events, and internal news, ensuring centralized communication across the organization.

---

## **7. assets**

Tracks company-owned physical resources assigned to employees.

```json
{
  "_id": ObjectId,
  "assetName": String,
  "assetCode": String,
  "assignedTo": ObjectId,          // Reference to employee
  "status": String,                // Assigned | Available | Lost | Damaged
  "purchaseDate": Date
}
```

### **Purpose**

Enables asset management such as laptops, access cards, SIM cards, headsets, ID tags—supporting accountability and transparency of resource allocation.

---

## **8. complaints**

Handles grievance management for employee issues or workplace concerns.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "complaintTitle": String,
  "description": String,
  "status": String,                // Open | In-Review | Resolved
  "createdAt": Date
}
```

### **Purpose**

Allows employees to register complaints related to harassment, policy violations, conflicts, or work environment problems, enabling structured investigation and resolution tracking.

---

## **9. files**

Stores employee-related documentation uploaded to HRMS.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "fileName": String,
  "fileType": String,
  "fileUrl": String,
  "createdAt": Date
}
```

### **Purpose**

Centralizes digital files such as offer letters, resumes, certificates, ID proofs, appraisal letters, contracts, and compliance documents.

---

## **10. holidays**

Defines official company holiday calendar.

```json
{
  "_id": ObjectId,
  "occasion": String,
  "date": Date,
  "description": String
}
```

### **Purpose**

Supports leave planning, attendance system integration, and automatic payroll deductions for non-working days.

---

## **11. promotions**

Tracks employee role upgrades and professional growth.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "oldPosition": String,
  "newPosition": String,
  "date": Date,
  "approvedBy": ObjectId
}
```

### **Purpose**

Stores performance-based promotions or grade improvements, enabling HR insights and salary revisions.

---

## **12. resignations**

Manages employee resignation requests and approval lifecycle.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "reason": String,
  "noticePeriodEnd": Date,
  "status": String,                 // Pending | Accepted | Rejected
  "date": Date
}
```

### **Purpose**

Controls exit processing paperwork and transfer workflows, supporting payroll final settlement.

---

## **13. shifts**

Defines working hour patterns for employers.

```json
{
  "_id": ObjectId,
  "name": String,                   // Example: Morning Shift, Night Shift
  "startTime": String,
  "endTime": String
}
```

### **Purpose**

Supports workforce scheduling, attendance automation, and overtime tracking.

---

## **14. terminations**

Records employee exits that occur due to policy violations or performance issues.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "reason": String,
  "terminationDate": Date,
  "status": String,
  "approvedBy": ObjectId
}
```

### **Purpose**

Provides legal compliance documentation and prevents system access after forced exit.

---

## **15. travels**

Tracks business travel and reimbursement processes.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "location": String,
  "purpose": String,
  "startDate": Date,
  "endDate": Date,
  "status": String                  // Requested | Approved | Completed
}
```

### **Purpose**

Used for client visits, conferences, and onsite travel, integrated with payroll reimbursement.

---

## **16. warnings**

Stores disciplinary records and HR actions.

```json
{
  "_id": ObjectId,
  "employeeId": ObjectId,
  "warningType": String,            // Behavior | Attendance | Policy Violation
  "description": String,
  "date": Date
}
```

### **Purpose**

Helps HR track employee misconduct history and ensure procedural documentation in case of termination or legal audit.



## Other Supporting Collections

| Collection        | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| **announcements** | Company-wide notification publishing               |
| **complaints**    | HR grievance handling                              |
| **promotions**    | Tracks employee role & grade upgrades              |
| **resignations**  | Manages resignation requests and approval workflow |
| **terminations**  | Employee exit record under disciplinary grounds    |
| **warnings**      | Disciplinary warnings issued                       |
| **assets**        | Assigned system, ID cards, devices                 |
| **files**         | Employee uploaded documents & contracts            |
| **holidays**      | Public holiday list                                |
| **travels**       | Business travel & reimbursement tracking           |
| **shifts**        | Work shifts definition (day/night/flexi)           |

---

# 📍 **Relationships Mapping**

| Original SQL Relationship                        | MongoDB Strategy           |
| ------------------------------------------------ | -------------------------- |
| employees ↔ departments                          | Reference (`departmentId`) |
| employees ↔ attendance                           | One-to-many                |
| employees ↔ leaves                               | One-to-many                |
| employees ↔ payroll                              | One-to-one per month       |
| employees ↔ complaints, promotions, resignations | One-to-many                |

MongoDB avoids JOINs and instead uses references or embedding based on size and usage pattern.

---

# 🎯 **Reason for Migrating to MongoDB**

| SQL Limitation                 | MongoDB Advantage           |
| ------------------------------ | --------------------------- |
| Fixed schema hard to update    | Flexible dynamic schema     |
| Heavy JOIN queries             | Direct document reads       |
| Not scalable for module growth | Horizontally scalable       |
| Performance bottlenecks        | Faster CRUD and aggregation |

---

# 📌 Conclusion

This MongoDB schema mirrors the logic and structure of the old SQL HRM system while optimizing data modeling for modern enterprise performance and scalable feature expansion.

The schema supports:

* Clean integration with MERN architecture
* Easy query performance and analytics
* Microservice-based payroll processing


------------------------------------------------------------------------------------- 

