## Innovate Future

A modern SaaS platform for study tour agencies to manage their operations efficiently and offer tailored services to multiple user roles, including agency admins, tour leaders, parents, and children.

# Table of Contents

    1.	Description
    2.	Features
    3.	Tech Stack
    4.	Installation
    5.	Usage
    6.	Testing
    7.	Contributing
    8.	License

# Description

This platform empowers study tour agencies to manage their tours, templates, and staff while providing role-specific dashboards for leaders, parents, and children. Agencies can use tools like Tour Templates, Day Templates, and Event Templates for faster creation. Parents can track their children via real-time GPS, and children can access AI-powered translations and personalized tour details.

# Features

For Agencies:

    •	User Management: Add employees, assign roles, and manage access.
    •	Tour Management:
    •	Create and assign tours using prebuilt templates.
    •	Reusable templates for days, events, and schedules.
    •	Custom Configurations: Tailor marketplace and GPS tracking features.

For Parents:

    •	Account Management: Register children and manage accounts.
    •	Real-Time GPS Tracking: Monitor your child’s location during tours.
    •	Notifications: Stay updated on tour events and schedules.

For Children:

    •	AI Translation: Access tour information in your preferred language.
    •	Personalized Dashboard: View schedules, guides, and event details.

# Tech Stack

React.js, TypeScript, Tailwind CSS, Vite
React Hook Form, Zustand
Vitest, React Testing Library
Axios

# Installation

Prerequisites:

    •	Node.js (v18+)
    •	npm

Steps:

    1.	Set up environment variables:

Create a .env file in the root directory with the following:

VITE_REACT_APP_INNOVATE_FUTURE_API_BASE_URL=https://api.example.com

    2.	Start the development server:

# Commands

| name                 | commands           |
| -------------------- | ------------------ |
| install dependencies | `npm install`      |
| run locally          | `npm run dev`      |
| run test             | `npm run test`     |
| test coverage        | `npm run coverage` |
| prepare              | `npm run prepare`  |

# Contributing

naming branch convention:

eg: 
story: feature/IF-1-user-login
bug: bugfix/IF-1-user-login

License

This project is licensed under the MIT License. See the LICENSE file for details.
