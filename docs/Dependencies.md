# 📦 **Dependencies File 

## **1. Backend – Node + Express**

`/backend-node/package.json` *(expected dependencies)*

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5",
    "nodemailer": "^6.9.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### **Backend Requirements**

```
Node.js >= 18
MongoDB >= 6.0
npm >= 9.0
```

### Install command

```bash
npm install
```

---

## **2. Frontend – React + Vite**

`/frontend-react/package.json`

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### Install command

```bash
npm install
```

---

## **3. Payroll Microservice – Java Spring Boot**

`/java-service-payroll/pom.xml`

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>

  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
  </dependency>

  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
  </dependency>
</dependencies>
```

### Java Requirements

```
Java 17
Maven 3.9+
```

### Run command

```bash
mvn spring-boot:run
```

---

# 🗂 **Project Services Dependency Summary**

| Module         | Stack          | Dependency Manager       |
| -------------- | -------------- | ------------------------ |
| Backend APIs   | Node + Express | npm                      |
| Frontend       | React + Vite   | npm                      |
| Payroll Engine | Spring Boot    | Maven                    |
| DB             | MongoDB        | No dependencies required |

---
