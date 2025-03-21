# Panda
Personal Finance Manager

A web app to track income, expenses, and generate financial reports. Built with Node.js/Express (backend) and React (frontend, bootstrapped with Create React App - https://github.com/facebook/create-react-app).

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
1. Clone the Repository
   git clone https://github.com/your-username/personal-finance-manager.git
   cd personal-finance-manager

2. Backend Setup
   - Navigate to the backend directory (if applicable): cd backend
   - Install dependencies: npm install
   - Create a .env file:
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_secret
     PORT=5001
   - Start the server: npm start (runs on http://localhost:5001)

3. Frontend Setup
   - Navigate to the frontend directory (if applicable): cd frontend
   - Install dependencies: npm install
   - Start the React app: npm start (runs on http://localhost:3000)

Usage
- Signup at /signup, login at /login
- Add transactions, view reports, and insights at /main
- Generate CSV reports and logout as needed

Project Structure
personal-finance-manager/
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

Getting Started with Create React App
This project’s frontend was bootstrapped with Create React App (https://github.com/facebook/create-react-app). Below are the available scripts and additional details.

Available Scripts
In the frontend directory, you can run:

- npm start
  Runs the app in development mode. Open http://localhost:3000 to view it. The page reloads on changes, and lint errors appear in the console.

- npm test
  Launches the test runner in interactive watch mode. See https://facebook.github.io/create-react-app/docs/running-tests for more info.

- npm run build
  Builds the app for production to the build folder, optimized and minified with hashed filenames. See https://facebook.github.io/create-react-app/docs/deployment for more.

- npm run eject
  Note: This is a one-way operation! Removes the single build dependency, copying all config files (webpack, Babel, ESLint, etc.) for full control. Use with caution.

Learn More
- Create React App Documentation: https://facebook.github.io/create-react-app/docs/getting-started
- React Documentation: https://reactjs.org/

Additional Resources
- Code Splitting: https://facebook.github.io/create-react-app/docs/code-splitting
- Analyzing Bundle Size: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size
- Progressive Web App: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
- Advanced Configuration: https://facebook.github.io/create-react-app/docs/advanced-configuration
- Deployment: https://facebook.github.io/create-react-app/docs/deployment
- Troubleshooting npm run build fails to minify: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

Contributing
Fork, create a branch (git checkout -b feature/your-feature), commit, push, and open a PR.

License
MIT License

Acknowledgments
Built by [Your Name]. Thanks to React, Express, Chart.js, and Create React App communities.
