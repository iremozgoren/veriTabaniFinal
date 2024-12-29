import React, { useState, useEffect } from 'react';
import axios from '../services/api';

function HasarKayitlari() {
  const [hasarlar, setHasarlar] = useState([]);
  const [musteriler, setMusteriler] = useState([]);
  const [policeler, setPoliceler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    police_id: '',
    hasar_turu: '',
    hasar_tarihi: '',
    durum: 'Devam Ediyor',
  });

  useEffect(() => {
    // Tüm verileri yükle
    Promise.all([
      axios.get('/hasar'),
      axios.get('/musteriler'),
      axios.get('/policeler'),
    ])
      .then(([hasarRes, musteriRes, policeRes]) => {
        setHasarlar(hasarRes.data);
        setMusteriler(musteriRes.data);
        setPoliceler(policeRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Veri alınırken hata:', err);
        setError('Veri alınırken bir hata oluştu.');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/hasar', formData)
      .then(() => {
        alert('Hasar kaydı başarıyla eklendi!');
        setFormData({ police_id: '', hasar_turu: '', hasar_tarihi: '', durum: 'Devam Ediyor' });
        axios.get('/hasar').then((response) => setHasarlar(response.data));
      })
      .catch(() => alert('Hasar kaydı eklenirken bir hata oluştu.'));
  };

  const uygunPoliceler = policeler.filter((police) => {
    // Örneğin, sadece aktif poliçeleri göster
    return police.durum === 'Aktif';
  });

  if (loading) return <div style={{ textAlign: 'center', color: '#6a1b9a' }}>Yükleniyor...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hasar Kayıtları</h1>

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
        {hasarlar.map((hasar) => (
          <li
            key={hasar.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #ddd',
              textAlign: 'center',
            }}
          >
            <strong>Hasar ID:</strong> {hasar.id}, <strong>Tür:</strong> {hasar.hasar_turu}, <strong>Tarih:</strong>{' '}
            {hasar.hasar_tarihi}, <strong>Durum:</strong> {hasar.durum}, <strong>Poliçe ID:</strong> {hasar.police_id}
          </li>
        ))}
      </ul>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Yeni Hasar Kaydı Ekle</h2>
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
        <select
          name="police_id"
          value={formData.police_id}
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
          <option value="">Poliçe Seç</option>
          {uygunPoliceler.map((police) => (
            <option key={police.id} value={police.id}>
              Poliçe ID: {police.id}, Sigorta Bedeli: {police.sigorta_bedeli}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="hasar_turu"
          placeholder="Hasar Türü"
          value={formData.hasar_turu}
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

        <input
          type="date"
          name="hasar_tarihi"
          value={formData.hasar_tarihi}
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

        <select
          name="durum"
          value={formData.durum}
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
          <option value="Devam Ediyor">Devam Ediyor</option>
          <option value="Tamamlandı">Tamamlandı</option>
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

export default HasarKayitlari;
