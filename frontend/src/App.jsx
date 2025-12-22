import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, lazy, Suspense } from "react";

// Dynamically import Analytics component
const Analytics = lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })));

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";

const App = () => {
  const [isIslandMoved, setIsIslandMoved] = useState(false);

  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar isIslandMoved={isIslandMoved} />
        <Routes>
          <Route path='/' element={<Home setIsIslandMoved={setIsIslandMoved} />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </main>
  );
};

export default App;