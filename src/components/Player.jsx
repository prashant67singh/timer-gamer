import { useState, useRef } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  const playerRef = useRef();
  function onSetNameHandler(){
    const inputVal = playerRef.current.value;
    setPlayerName(inputVal);
  }

  
  return (
    <section id="player">
      <h2>Welcome {playerName ?? "Undefined" }</h2>
      <p>
        <input type="text" ref={playerRef}/>
        <button onClick={onSetNameHandler} >Set Name</button>
      </p>
    </section>
  );
}
