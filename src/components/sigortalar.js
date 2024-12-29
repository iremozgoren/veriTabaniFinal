import React, { useState, useEffect } from "react";
import axios from "axios";

const SigortaPaneli = () => {
    const [sigortaTurleri, setSigortaTurleri] = useState([]);
    const [yeniSigorta, setYeniSigorta] = useState("");

    useEffect(() => {
        // Sigorta türlerini yükle
        axios.get("/api/sigorta-turleri")
            .then(response => setSigortaTurleri(response.data))
            .catch(error => console.error("Hata:", error));
    }, []);

    const sigortaEkle = () => {
        axios.post("/api/sigorta-turleri", { SigortaAdi: yeniSigorta })
            .then(response => {
                setSigortaTurleri([...sigortaTurleri, response.data]);
                setYeniSigorta("");
            })
            .catch(error => console.error("Ekleme hatası:", error));
    };

    const sigortaSil = (id) => {
        axios.delete(`/api/sigorta-turleri/${id}`)
            .then(() => setSigortaTurleri(sigortaTurleri.filter(tur => tur.TurID !== id)))
            .catch(error => console.error("Silme hatası:", error));
    };

    return (
        <div>
            <h2>Sigorta Türleri</h2>
            <ul>
                {sigortaTurleri.map(tur => (
                    <li key={tur.TurID}>
                        {tur.SigortaAdi}
                        <button onClick={() => sigortaSil(tur.TurID)}>Sil</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={yeniSigorta}
                onChange={(e) => setYeniSigorta(e.target.value)}
                placeholder="Sigorta türü adı girin"
            />
            <button onClick={sigortaEkle}>Ekle</button>
        </div>
    );
};

export default SigortaPaneli;
