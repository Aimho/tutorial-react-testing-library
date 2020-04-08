import React from "react";
import Profile from "./components/Profile";
import Counter from "./components/Counter";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <Profile username="AimHo" name="조준호" />
      <hr />
      <Counter />
    </div>
  );
}

export default App;
