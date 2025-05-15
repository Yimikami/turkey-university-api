# Türkiye Üniversiteleri API Dokümantasyonu

Bu klasör, Türkiye Üniversiteleri API'sinin dokümantasyonunu içerir.

## Dokümantasyon Dosyaları

1. **api-doc.md**: API'nin tüm endpoint'lerini, parametrelerini, dönüş değerlerini ve örnek kullanımlarını içeren detaylı Markdown dokümantasyonu.

2. **swagger.json**: API'nin Swagger/OpenAPI formatında tanımı. Bu dosya, Swagger UI veya diğer OpenAPI uyumlu araçlarla görüntülenebilir.

## Swagger UI ile Dokümantasyonu Görüntüleme

Swagger UI, API dokümantasyonunuzu interaktif bir şekilde görüntülemenizi sağlar. Swagger UI'ı kullanmak için:

1. Swagger UI'ı çevrimiçi olarak kullanabilirsiniz:
   - [Swagger Editor](https://editor.swagger.io/) sayfasını açın
   - `swagger.json` dosyasının içeriğini editöre yapıştırın

2. Alternatif olarak, Swagger UI'ı yerel olarak çalıştırabilirsiniz:
   ```bash
   # Swagger UI Docker imajını çalıştırma
   docker run -p 8080:8080 -e SWAGGER_JSON=/swagger.json -v $(pwd)/swagger.json:/swagger.json swaggerapi/swagger-ui
   ```
   Ardından tarayıcınızda `http://localhost:8080` adresini açın.

## Postman Koleksiyonu

API'yi test etmek için Postman kullanabilirsiniz. Swagger JSON dosyasını Postman'e aktarmak için:

1. Postman'i açın
2. "Import" düğmesine tıklayın
3. "Raw text" sekmesini seçin
4. `swagger.json` dosyasının içeriğini yapıştırın
5. "Import" düğmesine tıklayın

Bu, API'nin tüm endpoint'lerini içeren bir Postman koleksiyonu oluşturacaktır.

## API Kullanım Örnekleri

### cURL Örnekleri

#### Tüm üniversiteleri listele
```bash
curl -X GET http://localhost:3000/api/universities
```

#### ID'ye göre üniversite getir
```bash
curl -X GET http://localhost:3000/api/universities/1
```

#### Şehre göre üniversiteleri filtrele
```bash
curl -X GET http://localhost:3000/api/universities/city/istanbul
```

#### Türe göre üniversiteleri filtrele
```bash
curl -X GET http://localhost:3000/api/universities/type/devlet
```

#### Fakülte ara
```bash
curl -X GET "http://localhost:3000/api/search/faculty?name=mühendislik"
```

#### Program ara
```bash
curl -X GET "http://localhost:3000/api/search/program?name=bilgisayar"
```

### JavaScript Örnekleri

#### Tüm üniversiteleri listele
```javascript
fetch('http://localhost:3000/api/universities')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Hata:', error));
```

#### ID'ye göre üniversite getir
```javascript
fetch('http://localhost:3000/api/universities/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Hata:', error));
```

#### Şehre göre üniversiteleri filtrele
```javascript
fetch('http://localhost:3000/api/universities/city/istanbul')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Hata:', error));
```

## Daha Fazla Bilgi

Daha detaylı bilgi için `api-doc.md` dosyasına bakabilirsiniz.
