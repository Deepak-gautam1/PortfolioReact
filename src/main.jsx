import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// StrictMode removed — it double-invokes effects and adds runtime overhead
// that hurts Lighthouse performance score
createRoot(document.getElementById("root")).render(<App />);
