import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-tooltip/dist/react-tooltip.css";
import "./themes/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
