# E-Commerce Application: Monolithic vs Microservices

A beginner-friendly demonstration with the same storefront in two architectures. Built with Node.js + Express and a plain HTML/CSS/JavaScript frontend.

## What is included
- `monolith/`: one Node.js application serves the UI and handles product and order APIs.
- `microservices/`: separate Product Service and Order Service plus a static storefront; Docker Compose starts all three.
- Product listing, add-to-cart, quantity controls, checkout/order creation, and order confirmation.

## Requirements
- Node.js 18+ and npm
- For the microservices version, Docker Desktop with Docker Compose

## Run the monolithic app
1. Open a terminal in `monolith`.
2. Run `npm install`
3. Run `npm start`
4. Open http://localhost:3000

## Run the microservices app
1. Open a terminal in `microservices`.
2. Start Docker Desktop.
3. Run `docker compose up --build`
4. Open http://localhost:8080
5. Product Service runs on port 3001 and Order Service on port 3002.
6. Stop with `Ctrl+C`, then optionally run `docker compose down`.

## Architecture explanation
**Monolithic:** frontend and both product/order API routes are in one Express application/process. It is straightforward to start, but changes and scaling are coupled.

**Microservices:** the storefront calls Product Service for the catalog and Order Service to create/list orders. Each service runs independently in its own container, so it can be developed, deployed, and scaled separately. This teaching demo uses in-memory sample data; restarting a service resets orders. A production application should use persistent databases, authentication, validation, payment integration, and secure configuration.

## Screenshots for submission
Capture these real screens after running both versions:
1. Monolith storefront showing the product cards.
2. Monolith with an item in the cart / checkout confirmation.
3. Microservices storefront showing product cards.
4. Microservices with an order confirmation.
5. Optional: terminal showing `docker compose ps` and the three running containers.

Do not upload `.env` files, passwords, tokens, or other secrets. After testing, create a **public** GitHub repository and push this project. Replace this README's author details with your own if required by your professor.
