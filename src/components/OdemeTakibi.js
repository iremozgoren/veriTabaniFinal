import React, { useState, useEffect } from 'react';
import axios from '../services/api';

function OdemeTakibi() {
  const [odemeler, setOdemeler] = useState([]); // Ödeme kayıtları
  const [musteriler, setMusteriler] = useState([]); // Müşteri listesi
  const [formData, setFormData] = useState({
    musteri_id: '',
    odeme_tarihi: '',
    odeme_tutari: '',
    odeme_turu: '',
  });

  useEffect(() => {
    // Ödemeleri ve müşterileri çek
    axios
      .get('/odeme')
      .then((response) => setOdemeler(response.data))
      .catch((err) => console.error('Ödemeler alınırken hata:', err));

    axios
      .get('/musteriler')
      .then((response) => setMusteriler(response.data))
      .catch((err) => console.error('Müşteriler alınırken hata:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/odeme', formData)
      .then(() => {
        alert('Ödeme kaydı başarıyla eklendi!');
        setFormData({ musteri_id: '', odeme_tarihi: '', odeme_tutari: '', odeme_turu: '' });
        axios.get('/odeme').then((response) => setOdemeler(response.data));
      })
      .catch((err) => {
        console.error('Ödeme kaydı eklenirken hata:', err);
        alert('Bir hata oluştu. Ödeme kaydı eklenemedi.');
      });
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #6a1b9a, #8e44ad)',
        minHeight: '100vh',
        padding: '20px',
        color: '#ffffff',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Ödeme Takibi</h1>

      {/* Ödeme Listesi */}
      <ul
        style={{
          listStyleType: 'none',
          padding: '0',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          color: '#6a1b9a',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        {odemeler.map((odeme) => (
          <li
            key={odeme.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #ddd',
              textAlign: 'center',
            }}
          >
            <strong>Müşteri ID:</strong> {odeme.musteri_id}, <strong>Tutar:</strong> {odeme.odeme_tutari}, <strong>Tarih:</strong> {odeme.odeme_tarihi}, <strong>Tür:</strong> {odeme.odeme_turu}
          </li>
        ))}
      </ul>

      {/* Ödeme Ekleme Formu */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Yeni Ödeme Ekle</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          color: '#6a1b9a',
        }}
      >
        {/* Müşteri Seçimi */}
        <select
          name="musteri_id"
          value={formData.musteri_id}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Müşteri Seç</option>
          {musteriler.map((musteri) => (
            <option key={musteri.id} value={musteri.id}>
              {musteri.ad} {musteri.soyad}
            </option>
          ))}
        </select>

        {/* Ödeme Tarihi */}
        <input
          type="date"
          name="odeme_tarihi"
          value={formData.odeme_tarihi}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />

        {/* Ödeme Tutarı */}
        <input
          type="number"
          name="odeme_tutari"
          placeholder="Ödeme Tutarı"
          value={formData.odeme_tutari}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />

        {/* Ödeme Türü */}
        <select
          name="odeme_turu"
          value={formData.odeme_turu}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Ödeme Türü Seç</option>
          <option value="Nakit">Nakit</option>
          <option value="Kredi Kartı">Kredi Kartı</option>
          <option value="Banka Havalesi">Banka Havalesi</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: '#6a1b9a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 15px',
            width: '100%',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#8e44ad')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#6a1b9a')}
        >
          Ekle
        </button>
      </form>
    </div>
  );
}

export default OdemeTakibi;
