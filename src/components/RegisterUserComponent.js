import React, { useState, useEffect } from "react";
import { setUserLS, getUser } from "../utilities";

export default function NameFormComponent({ user, setUser }) {
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!name.length);
  }, [name]);

  const change = (e) => setName(e.target.value);

  const onSubmit = async () => {
    await setUserLS(name);
    const user = getUser();
    setUser(user);
  };

  return (
    <div
      className="modal is-active"
      style={{ justifyContent: "start", paddingTop: "15%" }}
    >
      <div className="modal-background"></div>
      <div className="modal-content modal-login">
        <div style={{ textAlign: "center" }}>
          <h1 className="game-title">STACK IT!</h1>
          <div className="field">
            <div className="control">
              <input
                className="input font"
                style={{ textAlign: "center" }}
                type="text"
                placeholder="Your name, please"
                onChange={change}
              />
            </div>
          </div>
          <button
            className="button is-success is-small is-outlined font"
            disabled={disabled}
            onClick={onSubmit}
          >
            Let's GO!
          </button>
        </div>
      </div>
    </div>
  );
}
