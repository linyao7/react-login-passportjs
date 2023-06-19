import React, { useContext } from 'react';
import { AuthContext } from '.';
import './App.css';

function App() {
  const user = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello{user?.username && ` ${user.username}`}, this is a demo of a Login App using Passport.js</h2>
        <p>
          Passport.js uses Strategies for different authentication methods with popular apps such as Facebook, Twitter,
          Google. It first authenticates with the app, then retrieves the allowed info and returns it to the client.
        </p>
        <p>
          Each strategy first calls the target authentication app's api, then returns the info when the target app calls
          the callback URL.
        </p>
      </header>
    </div>
  );
}

export default App;
