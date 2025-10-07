import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GenerateurDPA from './pages/GenerateurDPA';
import GenerateurMentionInfo from './pages/GenerateurMentionInfo';
import GenerateurRegistreSimplifie from './pages/GenerateurRegistre'; // ✅ ajout

function App() {
  return (
    <BrowserRouter basename="/generateur-clauses">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dpa" element={<GenerateurDPA />} />
        <Route path="/mention-info" element={<GenerateurMentionInfo />} />
        <Route path="/registre" element={<GenerateurRegistreSimplifie />} /> {/* ✅ nouvelle route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
