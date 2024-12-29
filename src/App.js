import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MüşteriEkle from './components/MüşteriEkle';
import PoliçeListesi from './components/PoliçeListesi';
import HasarKayitlari from './components/HasarKayitlari';
import OdemeTakibi from './components/OdemeTakibi';
import SigortaPaneli from './components/sigortalar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/musteri-ekle" element={<MüşteriEkle />} />
        <Route path="/police-listesi" element={<PoliçeListesi />} />
        <Route path="/hasar-kayitlari" element={<HasarKayitlari />} />
        <Route path="/odeme-takibi" element={<OdemeTakibi />} />
        <Route path="/sigortalar" element={<SigortaPaneli />} /> 
      </Routes>
    </Router>
  );
}

export default App;
