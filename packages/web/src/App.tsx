import axios from "axios";
import { MyData } from "common";
import React, { useState } from "react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const myData1 = new MyData();
  myData1.text = "";
  const [myData, setMyData] = useState(myData1);

  const getMyData = async function () {
    try {
      const response = await axios.get("http://localhost:4000/api/mydata/");
      setMyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onClick = () => {
    getMyData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{myData.text}</p>
        <p>
          <button onClick={onClick}>click</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
