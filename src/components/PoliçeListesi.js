import React, { useState } from 'react';

function PoliçeListesi() {
  // Sabit poliçe listesi
  const [policeler] = useState([
    {
      id: 1,
      baslangic_tarihi: '2024-01-01',
      bitis_tarihi: '2025-01-01',
      sigorta_bedeli: 1000,
      musteri_id: 101,
      tur_id: 1,
    },
    {
      id: 2,
      baslangic_tarihi: '2024-06-15',
      bitis_tarihi: '2025-06-15',
      sigorta_bedeli: 2000,
      musteri_id: 102,
      tur_id: 2,
    },
    {
      id: 3,
      baslangic_tarihi: '2023-11-10',
      bitis_tarihi: '2024-11-10',
      sigorta_bedeli: 1500,
      musteri_id: 103,
      tur_id: 3,
    },
  ]);

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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Poliçe Listesi</h1>
      {policeler.length > 0 ? (
        <table
          style={{
            width: '90%',
            margin: '0 auto',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
            color: '#6a1b9a',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Poliçe ID</th>
              <th style={tableHeaderStyle}>Başlangıç Tarihi</th>
              <th style={tableHeaderStyle}>Bitiş Tarihi</th>
              <th style={tableHeaderStyle}>Sigorta Bedeli</th>
              <th style={tableHeaderStyle}>Müşteri ID</th>
              <th style={tableHeaderStyle}>Tür ID</th>
            </tr>
          </thead>
          <tbody>
            {policeler.map((police) => (
              <tr key={police.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{police.id}</td>
                <td style={tableCellStyle}>{police.baslangic_tarihi}</td>
                <td style={tableCellStyle}>{police.bitis_tarihi}</td>
                <td style={tableCellStyle}>{police.sigorta_bedeli}</td>
                <td style={tableCellStyle}>{police.musteri_id}</td>
                <td style={tableCellStyle}>{police.tur_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>Henüz bir poliçe bulunmamaktadır.</p>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '2px solid #6a1b9a',
  textAlign: 'center',
  fontWeight: 'bold',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
};

const tableRowStyle = {
  backgroundColor: '#f9f9f9',
  transition: 'background-color 0.3s',
};

export default PoliçeListesi;
