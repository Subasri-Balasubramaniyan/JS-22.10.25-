1️⃣ Todo List App

Description:
A simple task management app where users can add, edit, delete, and mark tasks as complete.

Features:

Add new tasks.

Mark tasks as completed.

Edit existing tasks.

Delete tasks.

Responsive design with clean UI.

Technologies:

HTML, CSS, JavaScript

Optional: LocalStorage or JSON file for persistent storage

How to Run:

Open index.html in a browser (for localStorage version).

For Node.js JSON version:

npm install

node server.js

Open http://localhost:3000

2️⃣ Calculator App

Description:
A web-based calculator capable of performing basic arithmetic operations: addition, subtraction, multiplication, and division.

Features:

Clear and delete functions.

Keyboard-friendly design.

Stylish UI with hover and active effects.

Different colors for number, operator, and equal buttons.

Technologies:

HTML, CSS, JavaScript

How to Run:

Open index.html in any modern browser.

Click buttons to perform calculations.

3️⃣ Weather App

Description:
A weather app that allows users to check the weather for any city using the OpenWeatherMap API.

Features:

Search by city name.

Display temperature, weather condition, humidity, and wind speed.

Shows icons for weather conditions.

Responsive UI with cards for current weather.

Technologies:

HTML, CSS, JavaScript

OpenWeatherMap API

How to Run:

Get a free API key from OpenWeatherMap
.

Replace API_KEY in script.js with your key.

Open index.html in a browser.

Enter a city name and click Search.

4️⃣ Chat App

Description:
A simple real-time chat interface (frontend-only) or Node.js/Socket.io for live chat.

Features:

User joins with a username.

Send and receive messages.

Distinguish system messages (like user joined).

Scrollable chat window with nice UI.

Technologies:

HTML, CSS, JavaScript

Optional: Node.js + Socket.io for real-time messaging

How to Run:

For frontend-only: Open index.html in a browser. Messages are local only.

For real-time version:

npm install express socket.io

node server.js

Open http://localhost:3000 in multiple browser windows.

5️⃣ CRUD App (Task Manager)

Description:
A full CRUD application to manage tasks, including Create, Read, Update, Delete operations.

Features:

Add, edit, delete, and mark tasks complete.

Search/filter tasks (optional).

Persistent storage via JSON file or localStorage.

Clean and responsive UI.

Technologies:

HTML, CSS, JavaScript (frontend)

Node.js + Express (backend for JSON storage)

How to Run (Node.js JSON version):

Open terminal in project folder.

Install dependencies:

npm install


Start server:

node server.js


Open browser at http://localhost:3000.

Project Structure Example (CRUD App)
crud-json-app/
├── server.js          # Node.js backend
├── tasks.json         # JSON file storing tasks
├── package.json
└── public/
    ├── index.html     # Frontend
    ├── style.css
    └── script.js

Common Features Across Projects

Responsive UI: Works on mobile and desktop.

Clean and modern design.

Interactive elements: Buttons, inputs, and hover effects.

No database required (except optional Node.js JSON storage).

Requirements

Modern web browser (Chrome, Firefox, Edge).

Node.js installed for backend versions.

Internet connection for Weather App API.
