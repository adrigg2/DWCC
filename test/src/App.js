//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // Ej 2

  // const searchEngines = [
  //   { name: 'Google', url: 'https://www.google.com' },
  //   { name: 'Bing', url: 'https://www.bing.com' },
  //   { name: 'DuckDuckGo', url: 'https://www.duckduckgo.com' }
  // ];

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       {searchEngines.map(engine => (
  //         <a
  //           key={engine.name}
  //           className="App-link"
  //           href={engine.url}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {engine.name}
  //         </a>
  //       ))}
  //     </header>
  //   </div>
  // );

  // Ej 4a
  // function generateRandom() {
  //   const random = Math.trunc(Math.random() * 10);
  //   setNumber(random);
  // }

  // const [number, setNumber] = useState(0);

  // return (
  //   <div className="App">
  //     <p>Random number: {number}</p>
  //     <button onClick={generateRandom}>Generate random number</button>
  //   </div>
  // );

  // Ej 4b
  function generateRandom() {
    var numbersArray = numbers;
    const random = Math.trunc(Math.random() * 10);
    numbersArray.push(random);
    setNumber(numbersArray);
  }

  const [numbers, setNumber] = useState([]);

  return (
    <div className="App">
      <p>Random number: {numbers.join(", ")}</p>
      <button onClick={generateRandom}>Generate random number</button>
    </div>
  );
}

export default App;
