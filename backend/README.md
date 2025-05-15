# Türkiye Üniversiteleri API Backend

Türkiye’deki üniversiteler hakkında fakülteleri ve programları da dahil olmak üzere kapsamlı bilgi sağlayan RESTful API servisi.

## Özellikler

- Türkiye’deki tüm üniversiteleri listele
- Üniversiteleri şehre göre filtrele
- Üniversiteleri türe göre filtrele (Devlet/Vakıf)
- Belirli bir üniversite hakkında ayrıntılı bilgi al
- Tüm üniversitelerde fakülte ara
- Tüm üniversitelerde program ara

## API Uç Noktaları

| Uç Nokta                       | Metot | Açıklama                                           |
| ------------------------------ | ----- | -------------------------------------------------- |
| `/`                            | GET   | API bilgisi ve kullanılabilir uç noktalar          |
| `/api/universities`            | GET   | Tüm üniversiteleri listele                         |
| `/api/universities/:id`        | GET   | ID ile üniversite bilgisi getir                    |
| `/api/universities/city/:city` | GET   | Üniversiteleri şehre göre filtrele                 |
| `/api/universities/type/:type` | GET   | Üniversiteleri türe göre filtrele (Devlet/Vakıf)   |
| `/api/search/faculty`          | GET   | Fakülteyi ada göre ara (sorgu parametresi: `name`) |
| `/api/search/program`          | GET   | Programı ada göre ara (sorgu parametresi: `name`)  |

## Veri Yapısı

API, veri kaynağı olarak `turkey-universities.json` adlı bir JSON dosyası kullanır ve yapısı aşağıdaki gibidir:

```typescript
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
```

## Bilgilendirme

Bu API, Türkiye’deki üniversiteler hakkında genel bilgiler içerir. Ancak, bu bilgilerin güncel olup olmadığını garanti etmiyoruz. Verilerinizi doğrulamak ve güncel tutmak için lütfen ilgili üniversiteye veya resmi web sitesine başvurun. Ayrıca kesinlikle resmi bir API servisi değildir; sadece bilgilendirme ve eğitim amaçlıdır.
