**Introduction to Web Development**

**Assignment 1 — Solutions**

## **Q1. Difference between frontend, backend, and full-stack development**

Web development is broadly divided into three areas depending on which part of an application a developer works on.

**Frontend Development**

Frontend development deals with everything the user sees and interacts with directly in the browser — the layout, design, buttons, forms, and animations. It is built using HTML (structure), CSS (styling), and JavaScript (interactivity), along with frameworks such as React, Angular, or Vue.

Example: The visual dashboard of Netflix, where users browse thumbnails, click play buttons, and scroll through menus, is built by frontend developers.

**Backend Development**

Backend development deals with the server-side logic that the user never sees directly — handling requests, processing business logic, managing authentication, and communicating with databases. Common backend languages/frameworks include Node.js, Python (Django/Flask), Java (Spring), and PHP.

Example: When a user logs into Amazon, the backend verifies the username and password against the database and returns a success or failure response.

**Full-Stack Development**

A full-stack developer works on both frontend and backend, capable of building an entire application end-to-end — from the user interface down to the database and server logic.

Example: A solo developer building a complete food-delivery app (the ordering screen, the payment processing logic, and the database of restaurants) is working as a full-stack developer.

| **Aspect** | **Frontend** | **Backend** | **Full-Stack** |
| --- | --- | --- | --- |
| Focus | User interface & experience | Server logic & data | Both sides |
| Languages | HTML, CSS, JavaScript | Node.js, Python, Java, PHP | Combination of both |
| Example Tool | React, Vue | Express, Django | MERN, MEAN stack |
| Visible to user? | Yes | No | Partially |

## **Q2. Diagram: How the client-server model works in web architecture**

The client-server model is the foundation of web architecture. The client (browser) sends a request to the server, and the server processes that request and sends back a response. The diagram below illustrates this cycle.

![Image](media/fcd00b2b35c2906129256d27682421425fd4dbf6.png)

*Fig 1: Client-Server request/response cycle*

## **Q3. How a browser requests and displays a web page from a web server**

When a user types a URL or clicks a link, the browser goes through several steps to fetch and render the page:

- 1. DNS Lookup — the browser translates the domain name (e.g., www.example.com) into an IP address using a DNS server.

- 2. Establishing Connection — the browser opens a TCP connection to the server, typically secured via TLS (HTTPS).

- 3. Sending the HTTP Request — the browser sends a GET request asking for the specific page/resource.

- 4. Server Processing — the web server receives the request, runs any backend logic, queries a database if needed, and prepares a response.

- 5. Sending the Response — the server returns an HTTP response containing the HTML document (and status code, e.g., 200 OK).

- 6. Rendering — the browser parses the HTML, then requests linked CSS, JavaScript, and image files, and finally renders the complete page using its rendering engine.

- 7. Interactivity — JavaScript executes to make the page interactive (e.g., handling clicks, animations, form validation).

## **Q4. Tools required to set up a web development environment**

| **Tool** | **Purpose** |
| --- | --- |
| Code Editor (e.g., VS Code) | Write, edit, and organize HTML, CSS, JavaScript, and other source code with syntax highlighting and extensions. |
| Web Browser (e.g., Chrome, Firefox) | Preview and test how the website looks and behaves; includes developer tools for debugging. |
| Version Control (Git & GitHub) | Track changes to code, collaborate with other developers, and maintain a history of the project. |
| Node.js & npm | Run JavaScript outside the browser and install/manage third-party packages and libraries. |
| Web Server / Local Server (e.g., XAMPP, Live Server) | Simulate a real server locally to test dynamic pages before deployment. |
| Database Software (e.g., MySQL, MongoDB) | Store and manage application data such as user accounts or product listings. |
| Browser Developer Tools | Inspect HTML/CSS, debug JavaScript, and monitor network requests directly in the browser. |
| Package/Build Tools (e.g., Webpack, Vite) | Bundle, optimize, and prepare code for production deployment. |

## **Q5. What is a web server? Examples of commonly used servers**

A web server is software (often running on dedicated hardware) that stores, processes, and delivers web pages and other resources to clients over the internet using the HTTP/HTTPS protocol. When a browser requests a page, the web server locates the requested file or generates it dynamically and sends it back as a response.

**Commonly used web servers:**

- Apache HTTP Server — one of the oldest and most widely used open-source web servers.

- Nginx — known for high performance, used for serving static content and as a reverse proxy/load balancer.

- Microsoft IIS (Internet Information Services) — commonly used with Windows-based servers and ASP.NET applications.

- Node.js (Express) — allows building lightweight custom servers using JavaScript.

- LiteSpeed — a high-performance commercial alternative to Apache.

## **Q6. Roles: frontend developer, backend developer, and database administrator**

| **Role** | **Responsibilities** |
| --- | --- |
| Frontend Developer | Designs and implements the user interface; ensures the site is responsive, accessible, and visually consistent; handles client-side interactivity using HTML, CSS, and JavaScript frameworks. |
| Backend Developer | Builds and maintains server-side logic, APIs, and authentication systems; ensures the application processes requests correctly, securely, and efficiently. |
| Database Administrator (DBA) | Designs the database schema, manages data storage and backups, optimizes queries for performance, and ensures data security and integrity. |

## **Q7. Install and configure VS Code for HTML, CSS, and JavaScript development**

Steps to install and configure VS Code:

- 1. Download VS Code from the official site (code.visualstudio.com) for your operating system and run the installer.

- 2. Launch VS Code and open (or create) a project folder using File → Open Folder.

- 3. Install helpful extensions from the Extensions Marketplace, such as: Live Server (to preview HTML pages with auto-reload), Prettier (code formatting), ESLint (JavaScript linting), and HTML CSS Support.

- 4. Create index.html, style.css, and script.js files inside the project folder and link them together.

- 5. Right-click index.html and choose 'Open with Live Server' to preview the page in the browser with live updates.

*(Note: Since this is a hands-on installation task, please insert your own screenshot of the completed VS Code setup here, showing the installed extensions and an open HTML/CSS/JS project.)*

## **Q8. Difference between static and dynamic websites**

| **Aspect** | **Static Website** | **Dynamic Website** |
| --- | --- | --- |
| Content | Fixed; same for every visitor unless manually edited | Changes based on user input, database, or time |
| Technology | HTML, CSS, minimal/no JavaScript | Server-side languages (PHP, Node.js, Python) + database |
| Speed | Generally faster to load | Can be slower due to server processing |
| Example | A simple personal portfolio page with fixed text | An e-commerce site like Amazon showing personalized recommendations and live prices |

## **Q9. Five web browsers and their rendering engines**

| **Browser** | **Rendering Engine** | **Notes** |
| --- | --- | --- |
| Google Chrome | Blink | Fast, widely used; Blink is a fork of WebKit developed by Google. |
| Mozilla Firefox | Gecko | Open-source engine developed by Mozilla; strong standards compliance. |
| Safari | WebKit | Apple's engine; default browser on macOS and iOS. |
| Microsoft Edge | Blink | Switched from its own EdgeHTML engine to Chromium's Blink in 2020. |
| Opera | Blink | Also Chromium-based; adds features like a built-in VPN and ad blocker. |

Rendering engines differ mainly in how strictly they follow web standards, their JavaScript engine pairing (e.g., Blink pairs with V8, Gecko pairs with SpiderMonkey), performance optimizations, and support for newer CSS/HTML features. Because engines can interpret edge cases differently, developers often test websites across multiple browsers to ensure consistent appearance and behavior.

## **Q10. Diagram: Basic web architecture flow — client, server, database, and APIs**

A typical modern web application flow involves four components working together: the client sends a request to the server; the server may call an API for specific functionality and queries the database for data; the database returns data to the server; and the server sends the final response back to the client.

![Image](media/8a37ee4a75f0660982be33f6113b60c6126fbd65.png)

*Fig 2: Basic web architecture flow — client, server, database, and API*