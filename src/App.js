import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderQuestions from "./components/HeaderQuestions";
import TiresQuestions from "./components/TiresQuestions";
import Navigation from "./components/Navigation";
import { LanguageProvider } from "./context/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/header" element={<HeaderQuestions />} />
            <Route path="/tires" element={<TiresQuestions />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
