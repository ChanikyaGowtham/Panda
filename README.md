# Panda
Personal Finance Manager

A web app to track income, expenses, and generate financial reports. Built with Node.js/Express (backend) and React (frontend).

Features
- Secure signup/login with JWT
- Add income/expense transactions
- View financial summaries and CSV reports
- Monthly/annual insights
- Pie chart visualization
- Data stored in MongoDB and local storage

Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, bcryptjs, JWT
- Frontend: React, React Router, Chart.js, Axios
- Other: CORS, dotenv

Prerequisites
- Node.js (v14+)
- MongoDB
- Git

Installation
1. Clone: git clone https://github.com/your-username/personal-finance-manager.git && cd personal-finance-manager
2. Backend:
   - cd backend (if applicable)
   - npm install
   - Create .env: MONGO_URI=your_mongo_uri, JWT_SECRET=your_secret, PORT=5001
   - npm start (runs on http://localhost:5001)
3. Frontend:
   - cd frontend (if applicable)
   - npm install
   - npm start (runs on http://localhost:3000)

Usage
- Signup at /signup, login at /login
- Add transactions, view reports, and insights at /main
- Generate CSV reports and logout as needed

Project Structure
backend/        # Server code
  src/User.js   # User model
  server.js     # Express setup
frontend/       # React app
  src/
    App.jsx       # Routing
    Signup.jsx    # Signup page
    Login.jsx     # Login page
    MainPage.jsx  # Dashboard
README.md

Contributing
Fork, branch (git checkout -b feature/your-feature), commit, push, and open a PR.

License
MIT License

Acknowledgments
Built by Lakshmi Narashia R, Ponduri Chanikya Gowtham, Y Chaitanya Sai, Pranav Reddy Kasireddy. Thanks to React, Express, and Chart.js communities.
