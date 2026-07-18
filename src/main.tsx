import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Logger } from "./logging/Logger";
import "./styles/global.css";

export class MainBootstrap {
  public static start(): void {
    Logger.info("start", "Bootstrapping Business & Beyond website");
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      Logger.error("start", "Root element #root not found");
      throw new Error("Root element #root not found");
    }

    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );

    Logger.info("start", "React root rendered successfully");
  }
}

MainBootstrap.start();
