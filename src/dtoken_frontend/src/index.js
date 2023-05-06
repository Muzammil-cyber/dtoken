import { dtoken_backend } from "../../declarations/dtoken_backend";
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";


const init = async () => {
    // Render your React component instead

    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        handleAuth(authClient);
    } else {
        await authClient.login(
            {
                //     identityProvider: "https://identity.ic0.app/#authorize",
                onSuccess: () => {
                    handleAuth(authClient);
                },
                onError: (error) => {
                    console.error('Login Failed: ', error);
                }
            }
        )

    }

}

async function handleAuth(authclient) {
    // IF DEPLOYED TO SERVER
    // const Authid = await authclient.getIdentity();
    // const principal = Authid._principal.toString();
    // alert("Your Id is: " + principal);
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
}

init();





