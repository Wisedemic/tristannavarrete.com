# Tristannavarrete.com

A personal website showcasing project, ideas, and just about anything else my mind ponders.

### Application Structure & Details

##### For the frontend, React and Redux
-  Using React, you are able to create modular website UI components. The ability to reuse, or repurpose a component after being built is an incredibly attractive feature to using a component framwork for the frontend.
- Redux allows for some nice console.logging, easier debugging, and with the addition of Immutable.js, we are able to remove entire entry points for bugs to happen in the code.
- ** Thinking Forward: I'd likely begin to learn Typescript in order to remove TypeError's.

##### For the backend, Express
- Express is a familar, yet battle-hardened framework for building API's.

### Installation
    1. npm i
    2. npm i --only=dev

For Production:

    3. npm run build:clean
    4. npm start

For Development:

    3. npm run dev

### Folder Structure
    .
    ├── build                   # Compiled Webpack Production build
    ├── server                  # Express Server. (Providing React Server Side Rendering)
    ├── app                     # React Client-side files
    ├── config                  # Webpack files for compiler configuration
    ├── Procfile                # Heroku Build Configuration File
    └── README.md

by Tristan Navarrete
