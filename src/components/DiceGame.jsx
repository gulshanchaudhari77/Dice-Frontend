
import { useState } from "react";
import axios from "axios";
import "./style.css";

const DiceGame = () => {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState("");
  const [roll, setRoll] = useState(null);
  const [message, setMessage] = useState("");

  const rollDice = async () => {
    if (bet <= 0 || bet > balance) {
      setMessage("Invalid bet amount");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/roll-dice", { bet });
      setRoll(res.data.roll);
      setBalance(res.data.balance);
      setMessage(res.data.roll >= 4 ? "You Win aahhhhh! 🎉" : "You Lose 😢");
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="game-container">
      <h1>Provably Fair Dice Game 🎲</h1>
      <p>Balance: ${balance}</p>
      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        placeholder="Enter bet amount"
      />
      <button onClick={rollDice}>Roll Dice</button>
      {roll !== null && <p>Dice Rolled: {roll}</p>}
      <p>{message}</p>
    </div>
  );
};

export default DiceGame;
