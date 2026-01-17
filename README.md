🧑‍💼 Job Portal Application

A full-stack Job Portal Application built using Spring Boot and React (TypeScript) with JWT authentication, role-based access control, and real-world recruiter–job seeker workflows.

This project supports Job Seekers, Recruiters, and Admins, each with dedicated dashboards and features.

🚀 Tech Stack:
Backend:

Java 17

Spring Boot

Spring Security (JWT)

Spring Data JPA

Hibernate

PostgreSQL / MySQL

Swagger UI

Maven


Frontend:

React

TypeScript

Tailwind CSS

Axios

React Router

React Context API

Toast Notifications

👥 User Roles:
Role	Description
JOB_SEEKER -	Search jobs, apply, track applications
RECRUITER	- Post jobs, manage applicants
ADMIN -	Approve recruiters, manage users & jobs

📁 Project Structure:
Backend (Spring Boot):
src/main/java/com/job_portal
├── config
├── controller
├── dto
├── entity
├── filters
├── repo
├── service
├── util
└── JobPortalApplication.java

Frontend (React + TypeScript):
src
├── api
├── assets
├── component
├── config
├── context
├── dashboard
├── hooks
├── pages
├── routes
├── service
├── typevalues
├── utils
├── validation
├── App.tsx
└── main.tsx

🔐 Authentication & Security:

JWT-based authentication

Role-based authorization using Spring Security

Protected routes on frontend

Token stored securely in browser storage

Swagger secured with JWT

🔗 API Endpoints:
🔐 Authentication:
Method	Endpoint	Description
POST	/api/auth/login	Login user
POST	/api/register	Register user

👤 Job Seeker APIs:
Profile:
Method	Endpoint
GET	/api/jobseeker/profile
POST	/api/jobseeker/profile
GET	/api/jobseeker/profile/completed

Jobs:
Method	Endpoint
GET	/api/jobseeker/jobs
GET	/api/jobseeker/jobs/{id}
POST	/api/jobseeker/jobs/{jobId}/apply

Applications:
Method	Endpoint
GET	/api/jobseeker/applications

Dashboard:
Method	Endpoint
GET	/api/jobseeker/dashboard

🧑‍💼 Recruiter APIs:
Recruiter Profile:
Method	Endpoint
GET	/api/recruiter/profile
POST	/api/recruiter/profile
GET	/api/recruiter/profile/completed

Jobs:
Method	Endpoint
GET	/api/recruiter/jobs
PATCH	/api/recruiter/jobs/{id}/enable
PATCH	/api/recruiter/jobs/{id}/disable

Applicants:
Method	Endpoint
GET	/api/recruiter/jobs/{jobId}/applicants
PUT	/api/recruiter/applicants/{id}/status

🛡️ Admin APIs:
Dashboard:
Method	Endpoint
GET	/api/admin/dashboard/stats

Users:
Method	Endpoint
GET	/api/admin/users
PUT	/api/admin/users/{id}/enable
PUT	/api/admin/users/{id}/disable

Recruiter Approval:
Method	Endpoint
GET	/api/admin/recruiters/pending
PUT	/api/admin/recruiters/{id}/approve
DELETE	/api/admin/recruiters/{id}/reject

Job Moderation:
Method	Endpoint
GET	/api/admin/jobs
PUT	/api/admin/jobs/{id}/enable
PUT	/api/admin/jobs/{id}/disable

📊 Features Implemented:
Job Seeker:

Profile creation & completion check

Job search & job details

Apply to jobs with resume

Track application status

Dashboard statistics

Recruiter:

Recruiter profile management

Post & manage jobs

View applicants per job

Shortlist / reject candidates

Admin:

Approve or reject recruiters

Enable / disable users

Enable / disable jobs

Admin dashboard analytics

📘 Swagger UI:

API documentation available at:

http://localhost:8080/swagger-ui/index.html

🛠️ How to Run the Project:
Backend:
cd backend
mvn clean install
mvn spring-boot:run

Frontend:
cd frontend
npm install
npm run dev

📌 Future Enhancements:

Resume upload to cloud (S3/Firebase)

Email notifications

Advanced job filtering

Interview scheduling

Chat between recruiter & job seeker

👨‍💻 Author:

Venkata Chaithanya Reddy Vangala
Java Full Stack Developer
Spring Boot | React | JWT | REST APIs
