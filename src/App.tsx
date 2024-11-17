import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Panel from "./components/Panel/Panel";
function App() {
  return (
    <Router>
      <Panel />
    </Router>
  );
}

export default App;
