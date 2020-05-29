import React, { useState, useEffect } from "react";
import "./App.css";
import GameComponent from "./components/GameComponent";
import RegisterUserComponent from "./components/RegisterUserComponent";
import { getUser } from "./utilities";
import SocialLinks from "./components/SocialLinks";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (user) setUser(user);
  }, []);

  useEffect(() => {}, [user]);

  return (
    <div className="App">
      <SocialLinks />
      {user ? (
        <div className="game">
          <div className="header">
            <div className="user-name">Let's go, {user.name}!</div>
            <div className="game-title">STACK IT!</div>
          </div>

          <GameComponent user={user} />
        </div>
      ) : (
        <RegisterUserComponent user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
