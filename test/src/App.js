//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Dado from './Dado';

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
  // function generateRandom() {
  //   var numbersArray = [ ...numbers ];
  //   console.log(numbersArray);
  //   const random = Math.trunc(Math.random() * 10);
  //   numbersArray.push(random);
  //   numbersArray.shift();
  //   setNumber(numbersArray);
  // }

  // const [numbers, setNumber] = useState([0, 0, 0, 0, 0]);

  // return (
  //   <div className="App">
  //     <p>Random number: {numbers.join(", ")}</p>
  //     <button onClick={generateRandom}>Generate random number</button>
  //   </div>
  // );

  // Ej 6a

  function rollDie() {
    setNumeros([
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ]);
  }

  const [numeros, setNumeros] = useState([1, 1, 1]);

  return (
    <div className="App">
      <Dado value={numeros[0]}></Dado>
      <Dado value={numeros[1]}></Dado>
      <Dado value={numeros[2]}></Dado>
      <button onClick={rollDie}>Tirar dados</button>
    </div>
  );
}

export default App;
