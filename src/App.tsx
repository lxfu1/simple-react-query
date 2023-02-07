import React, { useState, useContext } from "react";
import { Demo1 } from "./examples/demo1";
import { Demo2 } from "./examples/demo2";
import "./App.css";

function App() {
  const [count, setCount] = useState(3);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <button
        onClick={onClick}
        style={{
          background: "#000",
          padding: "4px 12px",
          border: "1px solid #fff",
          color: "#fff",
        }}
      >
        +1
      </button>
      {new Array(count).fill("").map((_, index) => {
        return (
          <React.Fragment key={index}>
            <Demo1 tag={`list${index % 2 == 0 ? "1" : "2"}`} />
            <Demo2 tag={`list${index % 2 == 0 ? "1" : "2"}`} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
