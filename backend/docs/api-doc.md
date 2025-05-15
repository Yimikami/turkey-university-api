# Türkiye Üniversiteleri API Dokümantasyonu

Bu dokümantasyon, Türkiye Üniversiteleri API'sinin tüm endpoint'lerini, parametrelerini, dönüş değerlerini ve örnek kullanımlarını içerir.

## Genel Bakış

Türkiye Üniversiteleri API, Türkiye'deki üniversiteler hakkında kapsamlı bilgi sağlayan RESTful bir API servisidir. Bu API ile üniversiteleri listeleyebilir, filtreleyebilir ve detaylı bilgilerini görüntüleyebilirsiniz.

## Temel URL

```
http://localhost:3000
```

## Endpoint'ler

### 1. API Bilgisi

API hakkında genel bilgi ve kullanılabilir endpoint'leri döndürür.

- **URL:** `/`
- **Metot:** `GET`
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:**
    ```json
    {
      "message": "Türkiye Üniversiteleri API",
      "endpoints": {
        "/api/universities": "Tüm üniversiteleri listeler",
        "/api/universities/:id": "ID'ye göre üniversite getirir",
        "/api/universities/city/:city": "Şehre göre üniversiteleri filtreler",
        "/api/universities/type/:type": "Türe göre üniversiteleri filtreler (Devlet/Vakıf)",
        "/api/search/faculty": "Fakülte adına göre arama yapar (query: name)",
        "/api/search/program": "Program adına göre arama yapar (query: name)"
      }
    }
    ```

### 2. Tüm Üniversiteleri Listele

Türkiye'deki tüm üniversitelerin listesini döndürür.

- **URL:** `/api/universities`
- **Metot:** `GET`
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:** Üniversite nesnelerinden oluşan bir dizi
    ```json
    [
      {
        "id": 117,
        "name": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
        "type": "Devlet",
        "city": "İSTANBUL",
        "website": "https://www.itu.edu.tr",
        "address": "İTÜ Ayazağa Yerleşkesi yeni Rektörlük Binası Kat:2 MASLAK-SARIYER-İSTANBUL",
        "logo": "https://yokatlas.yok.gov.tr/assets/img/logo/115069.png",
        "faculties": [
          {
            "id": 1,
            "name": "Mühendislik Fakültesi",
            "programs": [
              {
                "name": "Bilgisayar Mühendisliği"
              },
              {
                "name": "Elektrik Mühendisliği"
              }
            ]
          }
        ]
      }
      // ... diğer üniversiteler
    ]
    ```

### 3. Üniversite Detayı

Belirtilen ID'ye sahip üniversitenin detaylı bilgilerini döndürür.

- **URL:** `/api/universities/:id`
- **Metot:** `GET`
- **URL Parametreleri:**
  - `id` - Üniversite ID'si (zorunlu)
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:** Üniversite nesnesi
    ```json
    {
      "id": 117,
      "name": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
      "type": "Devlet",
      "city": "İSTANBUL",
      "website": "https://www.itu.edu.tr",
      "address": "İTÜ Ayazağa Yerleşkesi yeni Rektörlük Binası Kat:2 MASLAK-SARIYER-İSTANBUL",
      "logo": "https://yokatlas.yok.gov.tr/assets/img/logo/115069.png",
      "faculties": [
        {
          "id": 1,
          "name": "Mühendislik Fakültesi",
          "programs": [
            {
              "name": "Bilgisayar Mühendisliği"
            },
            {
              "name": "Elektrik Mühendisliği"
            }
          ]
        }
      ]
    }
    ```
- **Hata Yanıtı:**
  - **Kod:** 404
  - **İçerik:**
    ```json
    {
      "error": "Üniversite bulunamadı"
    }
    ```

### 4. Şehre Göre Üniversiteleri Filtrele

Belirtilen şehirdeki üniversitelerin listesini döndürür.

- **URL:** `/api/universities/city/:city`
- **Metot:** `GET`
- **URL Parametreleri:**
  - `city` - Şehir adı (zorunlu)
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:** Üniversite nesnelerinden oluşan bir dizi
    ```json
    [
      {
        "id": 117,
        "name": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
        "type": "Devlet",
        "city": "İSTANBUL",
        "website": "https://www.itu.edu.tr",
        "address": "İTÜ Ayazağa Yerleşkesi yeni Rektörlük Binası Kat:2 MASLAK-SARIYER-İSTANBUL",
        "logo": "https://yokatlas.yok.gov.tr/assets/img/logo/115069.png",
        "faculties": [
          // ... fakülteler
        ]
      }
      // ... diğer üniversiteler
    ]
    ```
- **Hata Yanıtı:**
  - **Kod:** 404
  - **İçerik:**
    ```json
    {
      "error": "Bu şehirde üniversite bulunamadı"
    }
    ```

### 5. Türe Göre Üniversiteleri Filtrele

Belirtilen türdeki (Devlet/Vakıf) üniversitelerin listesini döndürür.

- **URL:** `/api/universities/type/:type`
- **Metot:** `GET`
- **URL Parametreleri:**
  - `type` - Üniversite türü (zorunlu, "devlet" veya "vakıf")
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:** Üniversite nesnelerinden oluşan bir dizi
    ```json
    [
      {
        "id": 117,
        "name": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
        "type": "Devlet",
        "city": "İSTANBUL",
        "website": "https://www.itu.edu.tr",
        "address": "İTÜ Ayazağa Yerleşkesi yeni Rektörlük Binası Kat:2 MASLAK-SARIYER-İSTANBUL",
        "logo": "https://yokatlas.yok.gov.tr/assets/img/logo/115069.png",
        "faculties": [
          // ... fakülteler
        ]
      }
      // ... diğer üniversiteler
    ]
    ```
- **Hata Yanıtı:**
  - **Kod:** 404
  - **İçerik:**
    ```json
    {
      "error": "Bu türde üniversite bulunamadı"
    }
    ```

### 6. Fakülte Ara

Belirtilen ada göre fakülteleri arar.

- **URL:** `/api/search/faculty`
- **Metot:** `GET`
- **Sorgu Parametreleri:**
  - `name` - Aranacak fakülte adı (zorunlu)
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:** Arama sonuçlarından oluşan bir dizi
    ```json
    [
      {
        "id": 1,
        "name": "İstanbul Teknik Üniversitesi",
        "city": "İSTANBUL",
        "type": "Devlet",
        "faculties": [
          {
            "id": 1,
            "name": "Mühendislik Fakültesi",
            "programs": [
              // ... programlar
            ]
          }
        ]
      }
      // ... diğer sonuçlar
    ]
    ```
- **Hata Yanıtları:**
  - **Kod:** 400
  - **İçerik:**
    ```json
    {
      "error": "Fakülte adı belirtilmedi"
    }
    ```
  - **Kod:** 404
  - **İçerik:**
    ```json
    {
      "error": "Eşleşen fakülte bulunamadı"
    }
    ```

### 7. Program Ara

Belirtilen ada göre programları arar.

- **URL:** `/api/search/program`
- **Metot:** `GET`
- **Sorgu Parametreleri:**
  - `name` - Aranacak program adı (zorunlu)
- **Başarı Yanıtı:**
  - **Kod:** 200
  - **İçerik:** Arama sonuçlarından oluşan bir dizi
    ```json
    [
      {
        "id": 1,
        "name": "İstanbul Teknik Üniversitesi",
        "city": "İSTANBUL",
        "type": "Devlet",
        "faculties": [
          {
            "id": 1,
            "name": "Mühendislik Fakültesi",
            "programs": [
              {
                "name": "Bilgisayar Mühendisliği"
              }
            ]
          }
        ]
      }
      // ... diğer sonuçlar
    ]
    ```
- **Hata Yanıtları:**
  - **Kod:** 400
  - **İçerik:**
    ```json
    {
      "error": "Program adı belirtilmedi"
    }
    ```
  - **Kod:** 404
  - **İçerik:**
    ```json
    {
      "error": "Eşleşen program bulunamadı"
    }
    ```

## Veri Modelleri

### Üniversite

```typescript
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
```

### Fakülte

```typescript
interface Faculty {
  id: number;
  name: string;
  programs: Program[];
}
```

### Program

```typescript
interface Program {
  name: string;
}
```

### Fakülte Arama Sonucu

```typescript
interface SearchFacultyResult {
  id: number;
  name: string;
  city: string;
  type: string;
  faculties: Faculty[];
}
```

### Program Arama Sonucu

```typescript
interface SearchProgramResult {
  id: number;
  name: string;
  city: string;
  type: string;
  faculties: {
    id: number;
    name: string;
    programs: Program[];
  }[];
}
```
