import React, { useEffect, useState } from 'react';
import api from '../services/api';

function MüşteriListesi() {
  const [musteriler, setMusteriler] = useState([]);

  useEffect(() => {
    api.get('/musteriler') // Backend'deki doğru endpointi kullan
      .then((response) => {
        setMusteriler(response.data);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error); // Hata mesajını konsola yazdır
      });
  }, []);

  return (
    <div>
      <h1>Müşteri Listesi</h1>
      <ul>
        {musteriler.map((musteri) => (
          <li key={musteri.id}>
            {musteri.adı} {musteri.soyadı} - Telefon: {musteri.telefon}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MüşteriListesi;
