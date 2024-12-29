const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Veritabanı bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ozgoreni14.',
  database: 'veri_tabani_odev',
});

db.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu:', err);
  } else {
    console.log('Veritabanına başarıyla bağlanıldı.');
  }
});

// **Poliçe Listeleme Endpointi**
app.get('/api/policeler', (req, res) => {
  const query = `
    SELECT 
      PoliceID AS id, 
      BaslangicTarihi AS baslangic_tarihi, 
      BitisTarihi AS bitis_tarihi, 
      SigortaBedeli AS sigorta_bedeli, 
      MusteriID AS musteri_id, 
      TurID AS tur_id 
    FROM policeler
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Poliçeler alınırken hata:', err);
      return res.status(500).send('Poliçeler alınırken bir hata oluştu.');
    }
    res.json(results);
  });
});

// **Yeni Poliçe Ekleme Endpointi**
app.post('/api/policeler', (req, res) => {
  const { baslangic_tarihi, bitis_tarihi, sigorta_bedeli, musteri_id, tur_id } = req.body;

  if (!baslangic_tarihi || !bitis_tarihi || !sigorta_bedeli || !musteri_id || !tur_id) {
    return res.status(400).send('Tüm alanlar doldurulmalıdır.');
  }

  const query = `
    INSERT INTO policeler (BaslangicTarihi, BitisTarihi, SigortaBedeli, MusteriID, TurID) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [baslangic_tarihi, bitis_tarihi, sigorta_bedeli, musteri_id, tur_id], (err, result) => {
    if (err) {
      console.error('Poliçe eklenirken hata:', err);
      return res.status(500).send('Poliçe eklenirken bir hata oluştu.');
    }
    res.send('Poliçe başarıyla eklendi.');
  });
});

// **Müşteri Listeleme Endpointi**
app.get('/api/musteriler', (req, res) => {
  const query = `
    SELECT 
      MusteriID AS id, 
      Adi AS ad, 
      Soyadi AS soyad 
    FROM musteriler
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Müşteri verileri alınırken hata:', err);
      return res.status(500).send('Müşteri verileri alınırken bir hata oluştu.');
    }
    res.json(results);
  });
});

// **Yeni Müşteri Ekleme Endpointi**
app.post('/api/musteriler', (req, res) => {
  const { ad, soyad, telefon, cinsiyet, adres, sehir, araba, ev } = req.body;

  if (!ad || !soyad || !telefon || !cinsiyet || !adres || !sehir) {
    return res.status(400).send('Tüm alanlar doldurulmalıdır.');
  }

  const query = `
    INSERT INTO musteriler (Adi, Soyadi, Telefon, Cinsiyet, Adres, Sehir, Araba, Ev) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [ad, soyad, telefon, cinsiyet, adres, sehir, araba ? 1 : 0, ev ? 1 : 0],
    (err, result) => {
      if (err) {
        console.error('Yeni müşteri eklenirken hata:', err);
        return res.status(500).send('Yeni müşteri eklenirken bir hata oluştu.');
      }
      res.send('Müşteri başarıyla eklendi.');
    }
  );
});

// **Hasar Listeleme Endpointi**
app.get('/api/hasar', (req, res) => {
  const query = `
    SELECT 
      HasarID AS id, 
      HasarTuru AS hasar_turu, 
      HasarTarihi AS hasar_tarihi, 
      Durum AS durum, 
      PoliceID AS police_id 
    FROM hasarislemleri
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Hasar kayıtları alınırken hata:', err);
      return res.status(500).send('Hasar kayıtları alınırken bir hata oluştu.');
    }
    res.json(results);
  });
});

// **Yeni Hasar Kaydı Ekleme Endpointi**
app.post('/api/hasar', (req, res) => {
  const { hasar_turu, hasar_tarihi, durum, police_id } = req.body;

  if (!hasar_turu || !hasar_tarihi || !police_id) {
    return res.status(400).send('Tüm alanlar doldurulmalıdır.');
  }

  const query = `
    INSERT INTO hasarislemleri (HasarTuru, HasarTarihi, Durum, PoliceID) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [hasar_turu, hasar_tarihi, durum, police_id], (err, result) => {
    if (err) {
      console.error('Hasar kaydı eklenirken hata:', err);
      return res.status(500).send('Hasar kaydı eklenirken bir hata oluştu.');
    }
    res.send('Hasar kaydı başarıyla eklendi.');
  });
});

// **Ödeme Listeleme Endpointi**
app.get('/api/odeme', (req, res) => {
  const query = `
    SELECT 
      OdemeID AS id, 
      MusteriID AS musteri_id, 
      OdemeTarihi AS odeme_tarihi, 
      OdemeTutari AS odeme_tutari, 
      OdemeTuru AS odeme_turu 
    FROM odemeler
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ödemeler alınırken hata:', err);
      return res.status(500).send('Ödemeler alınırken bir hata oluştu.');
    }
    res.json(results);
  });
});

// **Yeni Ödeme Kaydı Ekleme Endpointi**
app.post('/api/odeme', (req, res) => {
  const { musteri_id, odeme_tarihi, odeme_tutari, odeme_turu } = req.body;

  if (!musteri_id || !odeme_tarihi || !odeme_tutari || !odeme_turu) {
    return res.status(400).send('Tüm alanlar doldurulmalıdır.');
  }

  const query = `
    INSERT INTO odemeler (MusteriID, OdemeTarihi, OdemeTutari, OdemeTuru) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [musteri_id, odeme_tarihi, odeme_tutari, odeme_turu], (err, result) => {
    if (err) {
      console.error('Ödeme kaydı eklenirken hata:', err);
      return res.status(500).send('Ödeme kaydı eklenirken bir hata oluştu.');
    }
    res.send('Ödeme kaydı başarıyla eklendi.');
  });
});

// **Sunucuyu Başlat**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
