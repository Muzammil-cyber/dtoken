import React, { useRef, useState } from "react";
import { Principal } from "@dfinity/principal"
import { dtoken_backend } from "../../../declarations/dtoken_backend";

function Balance() {

  const inputVal = useRef("");
  const [btnDisabled, setDisabled] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(0);
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    setDisabled(true);
    const principal = Principal.fromText(inputVal.current.value);
    const balance = await dtoken_backend.balanceOf(principal);
    const syb = await dtoken_backend.getSymbol()
    setCurrentBalance(balance.toLocaleString())
    setCryptoSymbol(syb);
    setHidden(false);
    setDisabled(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          ref={inputVal}
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          required
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
          disabled={btnDisabled}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {currentBalance} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
