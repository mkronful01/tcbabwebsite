import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { BusinessTransformationPage } from "./pages/BusinessTransformationPage";
import { ConsultingServicesPage } from "./pages/ConsultingServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { Logger } from "./logging/Logger";

export class AppController {
  public static logBoot(): void {
    Logger.info("logBoot", "Business & Beyond app router mounted");
  }
}

export default function App() {
  AppController.logBoot();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/consulting-services"
          element={<ConsultingServicesPage />}
        />
        <Route
          path="/business-transformation"
          element={<BusinessTransformationPage />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
