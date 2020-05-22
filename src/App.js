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

  return (
    <div className="App">
      <h3>Gamuxa</h3>
      {user ? <h2>HI, {user.name}</h2> : null}
      <GameComponent />
      {!user ? <RegisterUserComponent user={user} setUser={setUser} /> : null}
    </div>
  );
}

export default App;
