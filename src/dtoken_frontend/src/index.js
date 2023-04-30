import { dtoken_backend } from "../../declarations/dtoken_backend";
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";


const init = async () => {
    // Render your React component instead
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
}

init();





