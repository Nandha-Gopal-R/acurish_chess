import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import LearnLevel from "./pages/LearnLevel";
import LessonPage from "./pages/LessonPage";
import Analyze from "./pages/Analyze";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:levelId" element={<LearnLevel />} />
        <Route path="/learn/:levelId/:lessonId" element={<LessonPage />} />
        <Route path="/analyze" element={<Analyze />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;