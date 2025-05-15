import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Veri tiplerini tanımlayalım
interface Program {
  name: string;
}

interface Faculty {
  id: number;
  name: string;
  programs: Program[];
}

interface University {
  id: number;
  name: string;
  type: string;
  city: string;
  website: string;
  address: string;
  logo: string;
  faculties: Faculty[];
}

// Express uygulamasını oluştur
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "docs")));

// JSON dosyasını oku
const universitiesData: University[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "turkey-universities.json"), "utf-8")
);

// Ana sayfa
app.get("/", (req, res) => {
  res.json({
    message: "Türkiye Üniversiteleri API",
    endpoints: {
      "/api/universities": "Tüm üniversiteleri listeler",
      "/api/universities/:id": "ID'ye göre üniversite getirir",
      "/api/universities/city/:city": "Şehre göre üniversiteleri filtreler",
      "/api/universities/type/:type":
        "Türe göre üniversiteleri filtreler (Devlet/Vakıf)",
      "/api/search/faculty": "Fakülte adına göre arama yapar (query: name)",
      "/api/search/program": "Program adına göre arama yapar (query: name)",
    },
  });
});

// Tüm üniversiteleri getir
app.get("/api/universities", (req, res) => {
  res.json(universitiesData);
});

// Şehre göre üniversiteleri filtrele
app.get("/api/universities/city/:city", (req, res) => {
  const city = req.params.city.toUpperCase();
  const universities = universitiesData.filter((uni) =>
    uni.city.toUpperCase().includes(city)
  );

  if (universities.length === 0) {
    return res.status(404).json({ error: "Bu şehirde üniversite bulunamadı" });
  }

  res.json(universities);
});

// Türe göre üniversiteleri filtrele (Devlet/Vakıf)
app.get("/api/universities/type/:type", (req, res) => {
  const type = req.params.type.toUpperCase();
  const universities = universitiesData.filter((uni) =>
    uni.type.toUpperCase().includes(type)
  );

  if (universities.length === 0) {
    return res.status(404).json({ error: "Bu türde üniversite bulunamadı" });
  }

  res.json(universities);
});

// ID'ye göre üniversite getir
app.get("/api/universities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const university = universitiesData.find((uni) => uni.id === id);

  if (!university) {
    return res.status(404).json({ error: "Üniversite bulunamadı" });
  }

  res.json(university);
});

// Fakülte adına göre arama
app.get("/api/search/faculty", (req, res) => {
  const name = req.query.name as string;

  if (!name) {
    return res.status(400).json({ error: "Fakülte adı belirtilmedi" });
  }

  const results = universitiesData
    .map((uni) => {
      const matchingFaculties = uni.faculties.filter((faculty) =>
        faculty.name.toUpperCase().includes(name.toUpperCase())
      );

      if (matchingFaculties.length > 0) {
        return {
          id: uni.id,
          name: uni.name,
          city: uni.city,
          type: uni.type,
          faculties: matchingFaculties,
        };
      }

      return null;
    })
    .filter(Boolean);

  if (results.length === 0) {
    return res.status(404).json({ error: "Eşleşen fakülte bulunamadı" });
  }

  res.json(results);
});

// Program adına göre arama
app.get("/api/search/program", (req, res) => {
  const name = req.query.name as string;

  if (!name) {
    return res.status(400).json({ error: "Program adı belirtilmedi" });
  }

  const results = universitiesData
    .map((uni) => {
      const matchingFaculties = uni.faculties
        .map((faculty) => {
          const matchingPrograms = faculty.programs.filter((program) =>
            program.name.toUpperCase().includes(name.toUpperCase())
          );

          if (matchingPrograms.length > 0) {
            return {
              id: faculty.id,
              name: faculty.name,
              programs: matchingPrograms,
            };
          }

          return null;
        })
        .filter(Boolean);

      if (matchingFaculties.length > 0) {
        return {
          id: uni.id,
          name: uni.name,
          city: uni.city,
          type: uni.type,
          faculties: matchingFaculties,
        };
      }

      return null;
    })
    .filter(Boolean);

  if (results.length === 0) {
    return res.status(404).json({ error: "Eşleşen program bulunamadı" });
  }

  res.json(results);
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
