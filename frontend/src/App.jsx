import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";

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
    </main>
  );
};

export default App;