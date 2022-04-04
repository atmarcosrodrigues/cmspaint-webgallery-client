
<h1 align="center">
   MS Paint Web Gallery
</h1>


<p align="center">
  Paint Web Gallery Server
  <br>
  <img src="https://img.shields.io/static/v1?label=Dev&message=AlphaTech&color=8257E5&labelColor=000000" alt="Alphatech" />
</p>

[MS Paint Classic][ms-paint-classic] is a mobile application for drawing and art design creation. The app has a simple and intuitive design, but complete with classic functions lacking in other painting apps. Perfect for kids of all ages and the whole family to have fun.

The application has an online image sharing and storage system. This repository provides The WebGallery Client, a web plataform for storing these data through an rest api using firebase authentication and database.




* ## Technologies 

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)

* ## Installation / Usage

    ```
    yarn create react-app appname —template typescript
    ``` 

    * Git clone this repository
    * Create your project in [Firebase](https://firebase.google.com/)
    * In Firebase console activate the services: Authentication and Realtime Database
    * In firebase console get your authentication credentials as per the .env file below
    * Create a .env file with following content:

   ```
	REACT_APP_API_KEY=YOUR_API_KEY
    REACT_APP_AUTH_DOMAIN=YOUR_APPLICATION.firebaseapp.com
    REACT_APP_DATABASE_URL=https://YOUR_APP.firebaseio.com
    REACT_APP_PROJECT_ID=YOU_PROJECT
    REACT_APP_STORAGE_BUCKET=YOUR_APP.appspot.com
    REACT_APP_MESSAGING_SENDER_ID=YOUR_SENDER_ID
    REACT_APP_APP_ID=YOUR_ID
    REACT_APP_MEASUREMENT_ID=G-ZSZ4FFJVEG
   ```

* Install dependencies:

    
    ``` 
    yarn add firebase
    yarn add node-sass@5.0.0

    yarn add react-router-dom
    yarn add @types/react-router-dom -D 

    yarn add jest-dom

    ```
    ```

* ## Running the Server

    On your terminal, run the server using this one simple command:

    ```bash
    $ yarn start
    ```

    You can now access the app on your local browser by using

    ```bash
    http://localhost:3000
    ```
* ## Running Tests

    On your terminal run:

    ```bash
    $ yarn test
    ```

* ## Learn More

    You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

    To learn React, check out the [React documentation](https://reactjs.org/).

[ms-paint-classic]: http://http://alpha-technology.appspot.com/mspaintclassic "MS Paint Classic"