# Frontend Mentor - Multi-step form

![Design preview for the Multi-step form coding challenge](preview.jpg)

# Frontend Mentor - Multi-step Form Solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YScSgP1x7b). This project focuses on building an interactive multi-step form workflow with robust validation and responsive layout design.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
- [Author](#author)

---

## Overview

### The Challenge

Users should be able to:

- Complete each step of the sequence.
- Go back to a previous step to update their selections.
- See a summary of their selections on the final step and confirm their order.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.
- Receive form validation messages if:
  - A required field has been missed.
  - The email address is not formatted correctly.
  - A step is submitted, but no selection has been made.

### Screenshot

![Design Preview](./preview.jpg)

### Links

- **Solution URL (GitHub Repo):** (https://github.com/rarifingerstyle-svg/Multi-step-form)
- **Live Site URL:** (https://multi-step-form-two-sable.vercel.app)

---

## My Process

### Built With

- **HTML5** – Semantic markup and accessibility (A11y)
- **CSS3 / Vanilla CSS** – CSS Variables, Flexbox, and CSS Grid
- **JavaScript (ES6+)** – State management, DOM manipulation, and custom validation
- **Mobile-First Workflow** – Responsive design strategy starting from mobile viewports

### What I Learned

Throughout this project, the main focus was managing state across multi-step forms without triggering page reloads, alongside implementing SEO-friendly and accessible HTML structures.

Example of handling input validation in JavaScript:

```javascript
// Validating email format using regex
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
