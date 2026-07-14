# PlanTatil 2.0 - Yapay Zeka Geliştirici Manifestosu & Kuralları

Bu dosya, projede çalışacak tüm AI kodlama ajanları (Antigravity vb.) için zorunlu kurallar ve mimari standartlar manifestosudur. Projeye kod yazmadan önce bu kuralları okuyup uygulamak zorundasınız.

## 1. Tasarım Sistemi Standartları (Shared CSS)
- Tüm HTML ve JS bileşenlerinde [core.css](file:///d:/004_KODLAMA/Planla/src/css/core.css) dosyasındaki CSS sınıfları kullanılmalıdır. Ad-hoc (rastgele) stil tanımları veya inline stiller yazılmamalıdır.
- Arayüz renkleri, animasyonlar ve kartlar için CSS değişkenleri (`var(--primary)`, `var(--bg-card)` vb.) kullanılmalıdır.
- Tasarımlarda koyu mod, glassmorphism ve mikro animasyon ilkelerine sadık kalınmalıdır.

## 2. Çoklu Dil (i18n) Standartları
- Uygulama içinde yer alan hiçbir butona, etikete veya form elemanına **sert kodlanmış (hardcoded) metinler yazılmamalıdır**.
- Tüm kullanıcı arayüzü (UI) metinleri [locales.js](file:///d:/004_KODLAMA/Planla/src/js/locales.js) dosyasındaki merkezi sözlükten okunmalıdır.
- Bileşenler `lang` (varsayılan: 'tr') parametresini alacak şekilde tasarlanmalı ve metinleri `locales[lang][key]` şeklinde çekmelidir.

## 3. Modüler Geliştirme Standartları
- Yeni bir özellik geliştirileceği zaman, öncelikle [docs/](file:///d:/004_KODLAMA/Planla/docs/) klasörü altındaki ilgili `.md` modül dosyası okunmalı ve oradaki **kriterler** (criteria) sırasıyla tamamlanmalıdır.
- Modüller arası ilişkileri bozacak bağımlılıklar eklenmemelidir. Eğer bağımlılık değişirse, modülün en üstündeki `dependencies` YAML bloğu güncellenmeli ve `python update_modules_data.py` komutu çalıştırılarak veri derlenmelidir.
- Her bileşen, `src/playgrounds/` altında kendi mock verileriyle çalışan bağımsız bir oyun alanına (playground) sahip olmalıdır. Bileşen geliştirilirken ana sayfa koduna müdahale edilmemelidir.
