# events-app
## Description
Simple full stack app for adding events.

### Technologies
#### Frontend
- React
- TypeScript
- Redux Toolkit
- Webpack
- Jest, Cypress

#### Backend
- Node.js
- Express.js
- MongoDB
- TypeScript
- Jest, Supertest

---

## How to use

- Clone this repo
- Create ``.env`` file in ``server`` directory, it can be the same as ``.env.example``
- In terminal hit ``cd server``, ``npm i``, ``npm run build`` and then ``npm run dev``, API should be running now
- Open new terminal in the root directory
- In terminal hit ``cd client``, ``npm i``, ``npm run build`` and then ``npm run dev``, client should be running
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### How to run tests

App should be running before running tests.

#### Frontend

- To run frontend tests go to client directory with ``cd client`` and hit ``npm run test`` to run unit and integration tests
- To run e2e tests hit ``npm run cypress`` in the same directory, if you want to see e2e tests running in the window you can type ``npm run cypress:open`` and choose ``e2e``

#### Backend

- To run backend tests go to server directory with ``cd server`` and hit in terminal ``npm run test``