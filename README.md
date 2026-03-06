# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

---

## Full‑Stack Backend Setup

This repository now consists of a React 18 frontend (`src/…`) and a Spring Boot
back end located in the `backend/` folder. The stack is designed for production
use in an enterprise anonymous reporting application.

### Running Locally

1. **Backend**
   * `cd backend`
   * configure `src/main/resources/application.properties` with your
     PostgreSQL credentials and a JWT secret (see sample file in repository).
   * `mvn spring-boot:run`
   The server listens on port `8080` by default; API routes are prefixed with
   `/api`.

2. **Frontend**
   * `npm install` (run from project root)
   * adjust `.env` or set `REACT_APP_API_URL` to point at the backend.
   * `npm start` launches the React development server on port 3000.

### Deployment

* **Frontend** – build with `npm run build` and deploy the `build/` folder to
  Vercel, Netlify, or a static hosting provider.
* **Backend** – the Spring Boot JAR can be deployed to Render, AWS Elastic
  Beanstalk, Kubernetes, etc. PostgreSQL is required for production.

### Security Notes

* Reports are stored anonymously; the only identifier returned to users is a
  randomly generated tracking token (`UUID`‑based).
* Admin endpoints are protected with JWTs. Passwords should be hashed using
  `BCryptPasswordEncoder` and never stored in plaintext.
* All input is validated using `javax.validation` annotations and controllers
  reject malformed data.
* JPA repositories use parameter binding to prevent SQL injection.

Refer to the back‑end source code for controllers, entities and security logic.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
