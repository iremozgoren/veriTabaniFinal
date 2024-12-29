import React, { useState } from 'react';
import api from '../services/api';

function MüşteriEkle() {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    telefon: '',
    cinsiyet: '',
    adres: '',
    sehir: '',
    araba: false, // Checkbox için başlangıç değeri
    ev: false,    // Checkbox için başlangıç değeri
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Checkbox için checked, diğerleri için value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/musteriler', formData)
      .then(() => {
        alert('Müşteri başarıyla eklendi!');
        setFormData({
          ad: '',
          soyad: '',
          telefon: '',
          cinsiyet: '',
          adres: '',
          sehir: '',
          araba: false,
          ev: false,
        });
      })
      .catch((error) => {
        console.error('Müşteri eklenirken hata oluştu:', error);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a1b9a, #8e44ad)',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          width: '500px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2 style={{ color: '#6a1b9a', marginBottom: '20px' }}>Müşteri Ekle</h2>
        <input
          type="text"
          name="ad"
          placeholder="Ad"
          value={formData.ad}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          name="soyad"
          placeholder="Soyad"
          value={formData.soyad}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          name="telefon"
          placeholder="Telefon"
          value={formData.telefon}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          name="cinsiyet"
          placeholder="Cinsiyet"
          value={formData.cinsiyet}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          name="adres"
          placeholder="Adres"
          value={formData.adres}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          name="sehir"
          placeholder="Şehir"
          value={formData.sehir}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <div style={{ textAlign: 'left', margin: '10px 0', width: '100%' }}>
          <label style={{ display: 'block', color: '#6a1b9a' }}>
            <input
              type="checkbox"
              name="araba"
              checked={formData.araba}
              onChange={handleInputChange}
            />
            Araba
          </label>
          <label style={{ display: 'block', color: '#6a1b9a' }}>
            <input
              type="checkbox"
              name="ev"
              checked={formData.ev}
              onChange={handleInputChange}
            />
            Ev
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#6a1b9a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 15px',
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

export default MüşteriEkle;
