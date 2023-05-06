import React, { useRef, useState } from "react";
import { Principal } from "@dfinity/principal"
import { dtoken_backend } from "../../../declarations/dtoken_backend";


function Transfer() {

  const to = useRef(0);
  const amount = useRef(0);
  const [btnDisabled, setDisabled] = useState(false)
  const [isHidden, setHidden] = useState(true);
  const [txt, setTxt] = useState("");

  async function handleClick() {
    setDisabled(true);
    setHidden(true);
    const principal = Principal.fromText(to.current.value);

    // IF DEPLOYED TO SERVER
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();
    // const authCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity
    //   }
    // });
    // const newTxt = await authCansiter.transfer(principal, Number(amount.current.value));

    // IF RUNNING LOCALLY
    const newTxt = await dtoken_backend.transfer(principal, Number(amount.current.value));

    setTxt(newTxt);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                ref={to}
                type="text"
                id="transfer-to-id"
                required
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                ref={amount}
                type="number"
                id="amount"
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={btnDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>
          {txt}
        </p>
      </div>
    </div>
  );
}

export default Transfer;
