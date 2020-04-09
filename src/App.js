import React from "react";
import Profile from "./components/Profile";
import Counter from "./components/Counter";
import TodoApp from "./components/TodoApp";
import DelayedToggle from "./components/DelayedToggle";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <Profile username="AimHo" name="조준호" />
      <hr />
      <Counter />
      <hr />
      <TodoApp />
      <hr />
      <DelayedToggle />
    </div>
  );
}

export default App;
