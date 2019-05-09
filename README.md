# Gradus 0.1.0 Rollout

---

Gradus is a music composition software run entirely within the browser (just Chrome for now, cross-browser functionality planned for 1.0.0 release). The app comes ready to be deployed for both personal use and to clients.

## Features

- Create and save unique user profiles using MongoDB and MLab if you deploy with Heroku
  - profile passwords securely hashed in database
  - users authenticated on server side, optional security to prevent unregistered users from accessing features
- Direct support for USB MIDI inputs
- Inline virtual piano with full range of octaves
- Pre-generated counterpoint exercises
- Real-time music staff and note rendering
- Real-time togglable music theory feedback algorithms (in development, planned for 0.1.1)
- Inline MIDI to hear created music (planned for 0.2.0)
- Create and save custom counterpoint exercises (planned for 1.0.0)

## Current Bugs/Issues (0.1.0)

- Private routes must be commented out in `client/src/App.js` or local connection must be connected to Mlab or code must be changed to work with local database. Otherwise, components rendered within private routes cannot be tested.

- In `client/src/utils/API/APIroute1.js` axios post routes may have to be switched between localhost and deployed api routes depending on how your front and back ends handle proxying. Restarting the server will often fix proxying errors. We're not sure why it's so tempermental yet.

- back button does not work for external MIDI inputs

- external MIDI octave range limited to keyboard size

- Graphs component needs timeout or something as it will fail to render initially but render upon refreshing when app is first started (maybe local only?)

## How to Use

1.  clone repository
2.  run `npm -i` from root to install necessary packages
3.  run `npm start` from root to start express and development servers

## Dependencies

Gradus uses the following npm packages. Simply install by running `npm -i` in the root directory.

##### In root:

1. axios: 0.18.0
2. bcryptjs: 2.4.3
3. body-parser: 1.19.0
4. dotenv: 7.0.0
5. express: 4.16.4
6. gravatar: 1.8.0
7. if-env: 1.0.4
8. jsonwebtoken: 8.5.1
9. mongoose: 5.5.5
10. passport: 0.4.0
11. passport-jwt: 4.0.0
12. react: 16.8.6
13. react-dom: 16.8.6
14. react-scripts: 3.0.0
15. validator: 10.11.0
16. webmidi: 2.3.3

##### In client:

1. axios: 0.18.0
2. body-parser: 1.19.0
3. bootstrap: 4.3.1
4. classnames: 2.2.6
5. jwt-decode: 2.2.0
6. react: "16.8.6
7. react-abcjs: 0.1.2
8. react-dom: 16.8.6
9. react-redux: 7.0.3
10. react-router-dom: 5.0.0
11. react-scripts: 3.0.0
12. reactstrap: 8.0.0
13. redux: 4.0.1
14. redux-thunk: 2.3.0
15. webmidi: 2.3.3

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
