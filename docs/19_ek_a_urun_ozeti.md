---
id: urun_ozeti
title: "Ek A. Kısa Ürün Özeti"
status: completed
percentage: 100
dependencies:
  - urun_vizyonu
criteria:
  - "Ürün asgari gereksinimlerinin ve MVP kapsamının özetlenmesi"
---

# Ek A. Kısa ürün özeti

PlanTatil 2.0; hazır gezi planlarını kopyalama, kişiselleştirme, grup içinde paylaşma, haritadan mekan aktarma, kart arşivi oluşturma, önerileri oylama ve gezi sonrası deneyim biriktirme üzerine kurulu yaşayan bir gezi planı platformudur.

Platform, Google Maps’in mekan ve navigasyon gücünü tamamlayan; ancak ondan farklı olarak gün gün rota akışı, grup kararları, kişisel checklist, deneyimlerden aksiyona dönüşen öneriler ve plan soy ağacı mantığı sunan bağımsız bir ürün olarak tasarlanır.

2026-07-10 - Gezi Kartlarında Konum, Kaynak ve Güncellik

KARARLAR

1. Kart yalnızca işletme veya resmi mekan değildir; konumlu her gezi deneyimi kart olabilir.

2. Meydan, manzara noktası, nehir kıyısı, park içi heykel, gizli hikaye noktası gibi mekan dışı kart türleri desteklenecek.

3. Kart sisteminde en kritik alan konum bilgisidir.

4. PlanTatil tek bir harita uygulamasına bağımlı olmamalı; farklı servislerden gelen mekanları ortak kart yapısında birleştirmelidir.

5. Navigasyon kullanıcı tercihine bırakılmalıdır: Google Maps, Apple Maps, Waze, Yandex veya varsayılan harita uygulaması.

6. Kartlarda “Değişiklik öner” sistemi bulunmalıdır.

7. Kullanıcılar mekanın kapandığını, geçici olarak hizmet vermediğini, saatlerin değiştiğini, konumun hatalı olduğunu veya kart bilgisinin güncellenmesi gerektiğini bildirebilmelidir.

8. Değişiklik önerileri doğrudan uygulanmamalı; kart sahibi, plan sahibi, editör, moderasyon veya topluluk doğrulamasıyla onaylanmalıdır.

9. Çok kullanılan kartlarda güncellik bilgisi özellikle önemlidir.

10. Kartlar için güncellik skoru veya güncellik durumu gösterilebilir.

11. Harita servisinden gelen bilgi ile kullanıcı bildirimleri çelişirse kartta uyarı gösterilmelidir.

12. PlanTatil’in farkı, farklı harita uygulamalarındaki mekanları ortak gezi planı ve deneyim katmanında birleştirmesidir.

2026-07-10 - Onaylı Kartlar ve Kalite Katmanları Sistemi

KARARLAR

1. PlanTatil’de tüm kartlar aynı güven seviyesinde gösterilmemelidir.

2. Harita ekranında farklı kart katmanları bulunmalıdır:

- Benim Kartlarım

- Aktif Plan Kartları

- Grup Önerileri

- Onaylı Kartlar

- Topluluk Kartları

- Tüm Kartlar

3. “Onaylı Kartlar” katmanı, editör veya yetkili kullanıcılar tarafından kontrol edilmiş, doğru ve faydalı bilgi içerdiği kabul edilen kartları göstermelidir.

4. Yeni kullanıcılar veya hızlı karar vermek isteyen kullanıcılar için varsayılan güvenilir keşif katmanı “Onaylı Kartlar” olabilir.

5. “Tüm Kartlar” katmanı varsayılan olarak açık gelmemelidir. Çünkü çok fazla kullanıcı kartı harita ekranında bilgi kirliliği oluşturabilir.

6. “Tüm Kartlar” açıldığında bile ekranda gösterilecek kart sayısı sınırlandırılmalı, yakınlaştırma seviyesi, filtreler ve harita alanı dikkate alınmalıdır.

7. Kullanıcı tarafından yeni oluşturulan kartlar doğrudan onaylı kart sayılmamalıdır.

8. Bir kartın onaylı hale gelmesi için şu kriterlerden biri veya birkaçı aranabilir:

- Editör kontrolü

- Çok sayıda kullanıcı tarafından kaydedilmesi

- Çok sayıda olumlu deneyim alması

- Güncel konum ve açıklama bilgisi taşıması

- Harita servisiyle konum uyumu

- Şikayet veya hata bildirimi almaması

- Faydalı notlar ve doğru kategori bilgisi içermesi

9. Kartlarda sorun oluşursa bu durum kartın güven seviyesini etkileyebilmelidir.

10. Kartın altında olumsuz yorumlar, hata bildirimleri, “kapalıydı”, “konum yanlış”, “bilgi eski” gibi işaretler birikirse kart onaylı statüsünü kaybedebilir veya incelemeye düşebilir.

11. Kartlar için kalite/güven durumları tanımlanmalıdır:

- Yeni kart

- Kullanıcı kartı

- Topluluk kartı

- İncelemede

- Onaylı kart

- Güncelleme bekliyor

- Sorun bildirildi

- Güvenilirliği düşük

- Arşivlendi / yayından kaldırıldı

12. Editörler, kartların başlık, tür, konum, açıklama, harita bağlantısı, açılış saatleri, uyarılar ve kaynak bilgilerini kontrol ederek kartları onaylayabilmelidir.

13. Editör sistemi ilk etapta manuel olabilir; ancak yapay zeka editörlerin işini hızlandırmalıdır.

14. Yapay zeka editöre şu konularda yardımcı olabilir:

- Kart başlığını düzeltme

- Tür/kategori önerme

- Açıklamayı sadeleştirme

- Aynı mekanın mükerrer kartlarını bulma

- Konum tutarsızlıklarını işaretleme

- Kullanıcı yorumlarından sorun sinyali çıkarma

- Kartın onaylanmaya uygun olup olmadığını ön değerlendirme

- Güncellik riski olan kartları editöre bildirme

15. Yapay zeka kartı tek başına kesin onaylamamalıdır. Özellikle popüler ve herkese açık kartlarda son karar editörde veya topluluk doğrulamasında olmalıdır.

16. Harita ekranında kart pinleri güven seviyesine göre ayırt edilebilir. Ancak bu ayrım haritayı karmaşıklaştırmamalıdır.

17. Onaylı kartlar, PlanTatil’in güvenilir keşif katmanı olarak konumlandırılmalıdır.

18. PlanTatil’in farkı yalnızca herkesin kart ekleyebilmesi değil, bu kartların kalite ve güven süzgecinden geçerek kullanıcılara anlamlı şekilde sunulmasıdır.
