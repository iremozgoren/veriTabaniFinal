import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [musteriSayisi, setMusteriSayisi] = useState(0);
  const [policeSayisi, setPoliceSayisi] = useState(0);

  useEffect(() => {
    // Toplam müşteri sayısını al
    axios.get('/musteriler').then((response) => setMusteriSayisi(response.data.length));

    // Toplam poliçe sayısını al
    axios.get('/policeler').then((response) => setPoliceSayisi(response.data.length));
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #6a1b9a, #8e44ad)',
        color: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Sigorta Yönetim Paneline Hoş Geldiniz</h1>
      <p>Buradan müşteriler, poliçeler, ödemeler ve hasar kayıtlarını yönetebilirsiniz.</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            border: '2px solid #ffffff',
            padding: '20px',
            borderRadius: '12px',
            width: '150px',
            backgroundColor: '#8e44ad',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h2 style={{ margin: '0', fontSize: '2rem' }}>{musteriSayisi}</h2>
          <p style={{ margin: '0', fontSize: '1.2rem' }}>Müşteri</p>
        </div>
        <div
          style={{
            border: '2px solid #ffffff',
            padding: '20px',
            borderRadius: '12px',
            width: '150px',
            backgroundColor: '#8e44ad',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h2 style={{ margin: '0', fontSize: '2rem' }}>{policeSayisi}</h2>
          <p style={{ margin: '0', fontSize: '1.2rem' }}>Poliçe</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Link
          to="/musteri-ekle"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderRadius: '8px',
            backgroundColor: '#6a1b9a',
            transition: 'background-color 0.3s ease',
          }}
        >
          Müşteri Yönetimi
        </Link>
        <Link
          to="/police-listesi"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderRadius: '8px',
            backgroundColor: '#6a1b9a',
            transition: 'background-color 0.3s ease',
          }}
        >
          Poliçe Yönetimi
        </Link>
        <Link
          to="/hasar-kayitlari"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderRadius: '8px',
            backgroundColor: '#6a1b9a',
            transition: 'background-color 0.3s ease',
          }}
        >
          Hasar Kayıtları
        </Link>
        <Link
          to="/odeme-takibi"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '10px 15px',
            borderRadius: '8px',
            backgroundColor: '#6a1b9a',
            transition: 'background-color 0.3s ease',
          }}
        >
          Ödeme Takibi
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
