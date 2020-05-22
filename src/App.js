import React, { useState, useEffect } from "react";
import "./App.css";
import GameComponent from "./GameComponent";
import RegisterUserComponent from "./RegisterUserComponent";
import { getUser } from "./utilities";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (user) setUser(user);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App">
      <h3 className="game-title">STACK IT!</h3>
      {user ? (
        <div>
          <h2>HI, {user.name}</h2>
          <GameComponent />
        </div>
      ) : (
        <RegisterUserComponent user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
