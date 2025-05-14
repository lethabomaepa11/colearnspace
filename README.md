# CoLearnSpace (CLS)

---

## 1. Introduction

### 1.1 Project Overview

CoLearnSpace is a web-based community learning platform that allows users to create and take courses built around embedded YouTube videos. It focuses on peer-led skill development through public and private courses.

### 1.2 Objectives

- Enable anyone to create structured learning content using existing video resources.
- Support both public learning and organization-based private learning spaces.
- Empower tech and non-tech communities to share knowledge.

### 1.3 Scope

This system will include:

- User authentication and authorization
- Course creation and management
- Role-based access (public, org member, admin)
- Organization creation and invites
- Learning progress tracking

---

## 2. System Requirements

### 2.1 Functional Requirements

- Users can register and log in using password or OAuth.
- Users can create public courses using embedded YouTube videos.
- Organizations can create private courses for their members.
- Users can join an organization via invite.
- Courses are made of modules/lessons.
- Users can mark modules as completed.
- Users can browse, filter, and search courses.
- Admins can moderate/report content.

### 2.2 Non-Functional Requirements

- Responsive design (mobile-first).
- Fast load times and caching for performance.
- Role-based security and data isolation.
- Maintainable and scalable backend (Supabase).
- Audit trail for moderation (optional for future).

---

## 3. System Architecture

### 3.1 Architecture Diagram


Client (SvelteKit) ↔ Supabase Backend (Postgres + Auth + Storage)

### 3.2 Technology Stack

| Layer       | Technology                     |
|------------|---------------------------------|
| Frontend    | SvelteKit, Tailwind/DaisyUI     |
| Backend     | Supabase (Auth, RLS, DB)        |
| Database    | PostgreSQL (via Supabase)       |
| Storage     | Supabase Storage                |
| Auth        | Supabase Auth (OAuth/email)     |
| Video Source| YouTube (embeds only)           |

---

## 4. Database Design (High-Level)

### 4.1 Tables

- **Users**  
  `id`, `email`, `name`, `role`

- **Organizations**  
  `id`, `name`, `slug`, `created_by`

- **Organization_Members**  
  `id`, `org_id`, `user_id`, `role`

- **Courses**  
  `id`, `title`, `description`, `org_id (nullable)`, `public (boolean)`, `created_by`

- **Modules**  
  `id`, `course_id`, `title`, `description`, `youtube_url`, `order`

- **Course_Progress**  
  `id`, `user_id`, `course_id`, `module_id`, `completed_at`

---

## 5. Use Case Diagrams

| Actor       | Use Case                                    |
|-------------|---------------------------------------------|
| Visitor     | Access public courses, Register             |
| User        | Take courses, Track progress                |
| Creator     | Create/edit/delete public courses           |
| Org Admin   | Create org, invite members, private courses |
| Moderator   | Review reports, moderate content            |

---

## 6. User Roles

| Role            | Permissions                                         |
|-----------------|-----------------------------------------------------|
| Guest           | View public courses                                 |
| User            | Enroll in courses, track progress                   |
| Course Creator  | Create/edit/delete public courses                   |
| Org Member      | Access org-specific private courses                 |
| Org Admin       | Create org, invite/remove members, create courses   |

---

## 7. User Interface Design (Brief)

### Pages:

- `/` – Home/Discover  
- `/courses` – List of all courses  
- `/courses/:id` – Course detail page  
- `/courses/:id/module/:module_id` – Learning screen with embedded video  
- `/create` – Course/module creation  
- `/orgs` – Organization dashboard  
- `/orgs/:org_id` – Org profile, members, courses  
- `/auth/*` – Login/signup  
- `/dashboard` – User profile and progress  

---

## 8. System Flow (Example)

1. User signs up  
2. Joins an existing org via invite link or creates a new org  
3. User creates a course and adds modules with YouTube URLs  
4. Other users enroll and mark progress  
5. Org admins view activity  
6. Users earn completions, badges (future feature)  

---

## 9. Security & Privacy

- Only users in an organization can view private courses.
- Supabase RLS ensures data access is secure.
- No videos are hosted, only embedded (no copyright).
- Private data (emails, orgs) is protected through RBAC.

---

## 10. Future Enhancements

- Certificate generation (PDF)
- Quiz integration (Typeform, custom, or Google Forms)
- API access for integrations
- Gamification: badges, streaks, ranks
- Notifications (email or in-app)

---

## 11. Conclusion

**CoLearnSpace** provides a scalable, community-focused LMS tailored for embedding YouTube learning. It empowers grassroots knowledge sharing while offering organizational structures for private group learning.


