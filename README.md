\# E-Commerce Application: Monolithic vs Microservices



A beginner-friendly demonstration comparing Monolithic and Microservices architectures using Node.js, Express, HTML, CSS, JavaScript, and Docker Compose.



\## Project Structure



\- `monolith/` — A single Node.js application that serves the storefront and handles product and order APIs.

\- `microservices/` — A separate Product Service, Order Service, and static storefront.

\- `submission-screenshots/` — Screenshots for the original application submission.

\- `assignment4-screenshots/` — Additional screenshots for Docker Compose configuration and testing, if included in the repository.



\## Features



\- Product listing

\- Shopping cart and quantity controls

\- Checkout and demo order creation

\- Order confirmation

\- Separate Product and Order services in the microservices architecture

\- Docker Compose deployment

\- Custom Docker bridge network

\- Named volume for persistent order storage



\## Requirements



\- Node.js and npm

\- Docker Desktop

\- Docker Compose



\## Run the Monolithic Application



1\. Open a terminal in the `monolith` folder.

2\. Install dependencies:



&#x20;  ```bash

&#x20;  npm install

&#x20;  ```



3\. Start the application:



&#x20;  ```bash

&#x20;  npm start

&#x20;  ```



4\. Open http://localhost:3000 in your browser.



\## Run the Microservices Application



1\. Open a terminal in the `microservices` folder.

2\. Ensure Docker Desktop is running.

3\. Start the application:



&#x20;  ```bash

&#x20;  docker compose up --build -d

&#x20;  ```



4\. Open http://localhost:8081 in your browser.



\### Services and Ports



| Service | Port |

|---|---:|

| Storefront | 8081 |

| Product Service | 3001 |

| Order Service | 3002 |



\### Docker Network and Volume



\- Custom bridge network: `microservices\_shopnest-network`

\- Named volume: `microservices\_order-data`

\- The Order Service saves order information in a JSON file under `/data`, backed by the named volume.



Check the services:



```bash

docker compose ps

```



The Compose file is located at `microservices/docker-compose.yml`. From the project root, use:



```bash

docker compose -f microservices/docker-compose.yml ps

```



\## Order Persistence Test



A demo order was created and verified through the Order Service API. The Order Service container was then recreated, and the order remained available.



To view orders:



```bash

curl http://localhost:3002/api/orders

```



This demonstrates that the named volume preserves order data when the Order Service container is recreated.



\## Architecture Explanation



\*\*Monolithic architecture:\*\* The frontend and product/order API routes are handled by one Express application. It is simple to run, but its components are deployed together.



\*\*Microservices architecture:\*\* The storefront uses separate Product and Order services. Each service runs in its own container and can be developed and deployed independently.



\## Screenshots



Screenshots can document the storefront, cart, order confirmation, Docker Compose configuration, running containers, custom network, named volume, and order persistence test.



\## Notes



This is a learning and demonstration project. Checkout is for demo orders only; no real payment is taken.



Do not upload passwords, tokens, or other secrets to the public repository.

