import React, { useState } from "react";
import { dtoken_backend, canisterId, createActor } from "../../../declarations/dtoken_backend";
import { AuthClient } from "@dfinity/auth-client";



function Faucet() {

  const [btnText, setBtnText] = useState("Gimme gimme")
  const [isDisabled, setDisabled] = useState(false);

  async function handleClick(event) {
    setDisabled(true);

    // IF DEPLOYED TO SERVER
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();
    // const authCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity
    //   }
    // });
    // const txt = await authCanister.newUser();

    // IF RUNNING LOCALLY
    const txt = await dtoken_backend.newUser();
    const id = await dtoken_backend.UserID();
    alert("Your Id is: " + id);

    setBtnText(txt);
  }


  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free ZINGer tokens here! Claim 10,000 ZINC coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
