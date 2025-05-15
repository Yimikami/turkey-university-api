# Türkiye Üniversiteleri API Frontend Uygulaması

Türkiye’deki üniversiteleri, fakülteleri ve programları keşfetmek için kullanıcı dostu bir arayüz sunan modern bir web uygulamasıdır. Bu frontend, Türkiye Üniversiteleri API Backend ile bağlantı kurar.

## Başlangıç

Frontend uygulamasını çalıştırmak için:

```bash
# Bağımlılıkları yükle
bun install  # veya npm install

# Geliştirme sunucusunu başlat
bun run dev  # veya npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## Özellikler

- Türkiye’deki tüm üniversiteleri görüntüleme
- Şehre ve türe (Devlet/Vakıf) göre üniversiteleri filtreleme
- Belirli bir üniversite hakkında ayrıntılı bilgi görüntüleme
- Tüm üniversitelerde fakülteleri arama
- Tüm üniversitelerde programları arama
- Masaüstü ve mobil cihazlar için duyarlı tasarım

## API Entegrasyonu

Bu frontend uygulaması Türkiye Üniversiteleri API Backend ile bağlantı kurar. Backend sunucusunun `http://localhost:3000` adresinde çalıştığından emin olun veya gerekirse `src/services/api.ts` dosyasındaki API temel URL’sini güncelleyin.
