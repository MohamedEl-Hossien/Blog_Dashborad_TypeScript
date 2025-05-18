# Blog Dashboard

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://mohamedel-hossien.github.io/Blog_Dashborad_TypeScript/)

A **Blog Dashboard** application built with React that lets you navigate a modern blog interface using client-side routing, manage state efficiently with Redux Toolkit, and fetch/cache data with React Query. This project is deployed on GitHub Pages and demonstrates how to overcome SPA routing challenges.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)

---

## Features

- **TypeScript Integration:** Enhances type safety, maintainability, and code reliability.
- **Single Page Application (SPA):** Seamless client-side navigation with React Router.
- **State Management:** Centralized state handled by Redux Toolkit.
- **Data Fetching:** Efficient asynchronous data fetching and caching using React Query.
- **User Authentication & Data Management:** Firebase is used to handle user authentication and store user data and posts.
- **JSDoc Documentation:** Clear, structured documentation for components, hooks, and utilities.
- **Unit Testing:** Jest and React Testing Library for robust component testing.
- **Improved Project Structure:** Organized modules for scalability and maintainability.
- **Responsive Design:** Clean, adaptive UI for an optimal user experience.
- **GitHub Pages Deployment:** Custom 404 handling for client-side routing refresh fixes.

---

## Tech Stack

- **React + TypeScript** – Provides static typing and improves development workflows.
- **React Router** – Handles client-side routing and navigation.
- **Redux Toolkit** – Manages global state efficiently.
- **React Query** – Simplifies API requests, caching, and data synchronization.
- **Firebase** – Used for user authentication and storing user data/posts.
- **Jest & React Testing Library** – Ensures comprehensive test coverage.
- **GitHub Pages** – Used for deploying the live demo.

---

## Demo

Check out the live demo here: [https://mohamedel-hossien.github.io/Blog_Dashborad_TypeScript/](https://mohamedel-hossien.github.io/Blog_Dashborad_TypeScript/)

---

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MohamedEl-Hossien/Blog_Dashborad_TypeScript.git

2. **Navigate to the project directory:**

   ```bash
   cd Blog_Dashboard_TS

3. **Install the dependencies:**
   
   ```bash  
   npm install

5. **Run the development server:**
   ```bash
   npm run dev
   

## Usage

This project demonstrates how to manage a client-side routed application that:
- Uses React Router for navigation.
- Leverages Redux Toolkit for managing authentication and app-level state.
- Invokes React Query to fetch/cach data asynchronously.

Explore different routes in the dashboard. When refreshing any page, your routing is handled properly (thanks to our GitHub Pages customizations described below).

## **Project Structure** 📁
```
Blog_Dashboard/
├── public/
│   └── blog_icon.svg
├── src/
│   └── queries/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── utils/
│   └── firebase/
│   └── app.jsx
│   └── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tsconfig.json
├── jest.config.js
└── vite.config.js
```
