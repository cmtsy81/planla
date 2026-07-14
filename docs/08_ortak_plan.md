---
id: ortak_plan
title: "Ortak Plan Oluşturma ve Görev Paylaşımı"
status: completed
percentage: 100
dependencies:
  - grup_paylasimi
criteria:
  - "Grup planı hazırlık akışının tanımlanması"
  - "Görev kartlarının oluşturulması ve kullanıcılara atanması"
  - "Görev kartlarının plan kartına onay mekanizmasıyla dönüştürülmesi"
  - "Aşama bazlı yetkilendirmenin (taslak, gezi başladı vb.) kurulması"
---

# 8. Ortak Plan Oluşturma ve Görev Paylaşımı

PlanTatil 2.0’da gezi planı oluşturma süreci yalnızca bireysel bir işlem olarak görülmemelidir. Gerçek hayatta gezi planları çoğu zaman aile, arkadaş grubu veya deneyimli kişilerin katkısıyla hazırlanır. Bir kişi ana planı başlatır; ancak yemek yerleri, çocuk molaları, alışveriş noktaları, ulaşım detayları veya alternatif rotalar farklı kişiler tarafından araştırılabilir.

Bu nedenle PlanTatil’de plan oluşturma süreci işbirliğine açık ama kontrollü olmalıdır.

Plan sahibi bir plan oluşturduğunda, isterse belirli kişileri plan hazırlığına davet edebilir. Bu kişiler tüm planı düzenleme yetkisine sahip yardımcı adminler olabileceği gibi, sadece belirli bir konuda görev alan kullanıcılar da olabilir.

Örneğin:

- “Yemek yenecek yerleri sen ayarla.”

- “Kahve ve tatlı duraklarını sen ekle.”

- “Çocukların dinlenebileceği noktaları sen belirle.”

- “Bilet ve rezervasyon gereken yerleri sen kontrol et.”

- “Yürüyüş mesafelerini ve günlük tempoyu sen düzenle.”

Bu görev dağılımı, plan hazırlama yükünü azaltır ve grup üyelerinin planı sahiplenmesini sağlar.

## 8.1. Görev Kartları (Genel TO-DO Yapısı)

Plan hazırlığı sürecinde işbirliğini kolaylaştırmak için bağımsız genel görev kartları (TO-DO listesi) kullanılır. **Gezi kartlarının (konumların) kendi iç veri yapısını sade ve temiz tutmak amacıyla sorumluluklar ve görevler doğrudan gezi kartının içine gömülmez;** bunun yerine plandan bağımsız görev kartları olarak atanır.

Örnek görev kartları:

- Gün 1 için öğle yemeği alternatifi bul

- Pantheon çevresinde dondurma önerisi ekle

- Colosseum bilet saatlerini kontrol et

- Çocuklar için ara mola noktası öner

- Akşam yemeği bölgesi için 3 seçenek ekle

- Yağmurlu gün alternatifi oluştur

Her görev bir kullanıcıya atanabilir ve görevin durumu takip edilebilir:

- Bekliyor

- Üzerinde çalışılıyor

- Öneri eklendi

- Onaylandı

- Reddedildi

- Tamamlandı

Bu genel görev kartları tamamlandığında (örneğin bir dondurmacı önerisi eklendiğinde), görevlinin önerdiği nokta bir "Plan Kartı" (Gezi Durağı) adayına dönüşür.

## 8.2. Görevden Plan Kartına Dönüşüm

Bir görev tamamlandığında ortaya çıkan öneri doğrudan plan kartına dönüşebilir veya plan sahibinin onayına düşebilir.

Örneğin “Pantheon çevresinde dondurma önerisi ekle” görevi tamamlandığında, görevli kullanıcı Giolitti adlı bir dondurma kartı ekler. Bu kart plan sahibinin onayına gelir. Plan sahibi kartı kabul ederse ilgili güne ve sıraya eklenir.

Bu yapı sayesinde grup içi konuşmalar ve araştırmalar dağınık mesajlar halinde kaybolmaz; doğrudan planın içine bağlanır.

## 8.3. Hazırlık ve Gezi Kullanımı Ayrımı (Kilit Mekanizması)

Plan oluşturma sürecindeki yetkiler ile gezi sırasında kullanılacak yetkiler farklıdır. Rota güvenliğini ve grup koordinasyonunu sağlamak amacıyla bir planın yaşam döngüsü aşamalı olarak yönetilir.

Örnek aşamalar:

- Taslak

- Hazırlıkta

- Grup incelemesinde

- Onaylandı

- **Gezi Başladı (Rota Kilitli)**: Gezi günü gelip bu aşamaya geçildiğinde ortak rota **otomatik olarak kilitlenir** ve tüm kullanıcılar için (Sahip ve Editörler dahil) düzenlemeye kapatılır. Bu sayede gezi anında rota sırasının yanlışlıkla değiştirilmesi veya kartların silinmesi engellenir. Bu aşamada yalnızca:
  - Canlı konum paylaşımı (haritada kim nerede)
  - Canlı navigasyon ve yol tarifi
  - Katılımcıların bireysel "Gezildi / Ziyaret Edildi" işaretlemeleri aktif kalır.

- Gezi tamamlandı

- Arşivlendi

Bu kilit mekanizması, planın hem hazırlık aşamasında esnek ve katılımcı bir şekilde şekillenmesini, hem de uygulama (gezi) anında güvenli ve stabil kalmasını sağlar.
