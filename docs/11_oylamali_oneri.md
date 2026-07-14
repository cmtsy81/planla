---
id: oylamali_oneri
title: "Oylamalı Öneri ve Karar Sistemi"
status: completed
percentage: 100
dependencies:
  - grup_paylasimi
  - ortak_plan
criteria:
  - "Öneri türlerinin (durak ekle, gün değiştir vb.) yapılandırılması"
  - "Öneri sunma, oylama ve onay/ret akış şemasının oluşturulması"
  - "Grup içi oylama kurallarının (salt çoğunluk, admin onayı vb.) tanımlanması"
  - "Öneri kartı UI tasarımı ve veri şeması"
  - "Yapılan değişikliklerin sürüm kontrolü (geri alma/undo) mantığı"
---

# 11. Oylamalı Öneri ve Karar Sistemi

PlanTatil 2.0’da grup üyelerinin katkıları klasik yorum sistemiyle sınırlı kalmaz. Kullanıcılar yalnızca “bence burası güzel” gibi serbest yorumlar yazmak yerine, doğrudan plana uygulanabilecek yapılandırılmış öneriler sunabilir.

Bu sistemin amacı, gezi planı üzerinde herkesin katkı verebilmesini sağlamak; ancak ortak rotanın kontrolsüz şekilde bozulmasını engellemektir. Bu nedenle varsayılan modelde grup üyeleri planı doğrudan değiştirmez. Bunun yerine yeni durak ekleme, mevcut durağı başka güne taşıma, bir durağın saatini değiştirme, lezzet önerisi ekleme veya bir durağı opsiyonel hale getirme gibi tekliflerde bulunur.

Plan sahibi veya yetkili editör bu önerileri inceleyebilir, düzenleyebilir, reddedebilir, doğrudan onaylayabilir veya grup oylamasına açabilir.

## Öneri Türleri

Sistem içinde öneriler belirli türlere ayrılmalıdır. Böylece öneriler yalnızca metin olarak kalmaz; plan üzerinde uygulanabilir aksiyonlara dönüşür.

Temel öneri türleri:

- Yeni durak ekle

- Mevcut durağı sil

- Durağı başka güne taşı

- Durağın saatini değiştir

- Durağın sırasını değiştir

- Durağı opsiyonel yap

- Alternatif mekan öner

- Lezzet önerisi ekle

- Kahve / tatlı / dondurma molası öner

- Çocuk molası öner

- Alışveriş noktası öner

- Bilet / rezervasyon uyarısı ekle

- Yoğunluk veya yorgunluk uyarısı ekle

- Yağmurlu gün alternatifi öner

- Genel plan notu ekle

Bu yapı sayesinde grup üyelerinin fikirleri dağınık yorumlar halinde kaybolmaz. Her öneri, plan üzerinde neyi değiştirmek istediğini açıkça belirtir.

## Öneri Akışı

Bir grup üyesi öneri oluşturduğunda öneri hemen plana uygulanmaz. Önce “bekleyen öneri” durumuna düşer.

Öneri akışı şu şekilde olabilir:

- Kullanıcı öneri oluşturur.

- Sistem önerinin hangi güne, hangi durağa veya hangi plana ait olduğunu belirler.

- Öneri bekleyen öneriler alanında görünür.

- Plan sahibi veya yetkili editör öneriyi inceler.

- Öneri doğrudan onaylanabilir.

- Öneri reddedilebilir.

- Öneri düzenlenerek kabul edilebilir.

- Öneri grup oylamasına açılabilir.

- Oylama sonucuna göre admin karar verir veya önceden belirlenmiş kurala göre öneri otomatik uygulanır.

- Öneri plana uygulandığında değişiklik geçmişine kaydedilir.

Bu akış, grup içi katkıyı desteklerken planın bütünlüğünü korur.

## Oylama Mantığı, Süresi ve Gerekçelendirme

Her öneri oylamaya açılmak zorunda değildir. Plan sahibi, önerinin önemine göre doğrudan karar verebilir veya grup fikrini almak için oylama başlatabilir.

Oylama seçenekleri basit ve hızlı olmalıdır:
- Evet, ekleyelim
- Hayır, gerek yok
- Kararsızım
- Başka güne alalım
- Opsiyonel kalsın

**Oylama Süresi ve Kapanma Koşulları:**
Oylamalar varsayılan olarak zaman sınırlı değildir. Oylama şu iki durum gerçekleşene kadar açık kalır:
1. **Manuel Kapatma:** Plan sahibi veya yetkili editör oylamayı istediği an manuel olarak kapatabilir ve nihai kararını verebilir.
2. **Tam Katılım (Otomatik Kapatma):** Gruptaki tüm katılımcılar oyunu kullandığı an oylama otomatik olarak kapanır ve sonuçları onay paneline sunar.

**Oy Gerekçesi (Neden / Yorum Notu) Desteği:**
Katılımcılar Evet, Hayır veya Kararsız butonlarına basarken, tercihlerine **isteğe bağlı olarak kısa bir gerekçe notu** (Örn: *"Hayır, çünkü o saatte çok sıra oluyor ve çocuklar yorulur"*) ekleyebilirler. Bu gerekçeler, oylama detay panelinde diğer kullanıcılar ve admin tarafından görüntülenebilir. Bu sayede grup üyeleri sadece oy vermekle kalmaz, kararın nedenlerini de ortaklaşa tartışabilir.

Oylama sonucu iki farklı şekilde kullanılabilir:
- **Danışma amaçlı oylama (Varsayılan):** Oylama sadece grubun fikrini gösterir. Son karar plan sahibindedir.
- **Kural bazlı oylama:** Plan sahibi önceden bir kural belirler. Örneğin “çoğunluk evet derse öneri admin onayına düşsün” veya “çoğunluk evet derse otomatik plana eklensin” gibi.

Varsayılan model danışma amaçlı oylama olmalıdır. Böylece gezi planının kontrolü plan sahibinde kalır.

## Öneri Kartı Tasarımı

Her öneri, ilgili günün veya ilgili durağın altında küçük bir öneri kartı olarak gösterilebilir.

Örnek öneri kartı:

Öneri bekliyor

Giolitti dondurma molası eklensin mi?

Öneren: Elif

Konum önerisi: Gün 1, Pantheon sonrası

Tür: Tatlı / dondurma

Not: Pantheon’dan sonra çocuklar için iyi mola olabilir.

Oy durumu:

3 evet · 1 hayır · 1 kararsız

[Oy ver] [Admin onayla] [Düzenle] [Reddet]

Bu kart, önerinin ne olduğunu, kimin önerdiğini, plana nereye eklenmek istendiğini ve grubun ne düşündüğünü hızlıca göstermelidir.

## Admin Kararı

Plan sahibi veya yetkili editör öneri üzerinde şu işlemleri yapabilir:

- Doğrudan onayla

- Düzenleyerek onayla

- Reddet

- Oylamaya aç

- Daha sonra değerlendir

- Benzer öneriyle birleştir

- Opsiyonel olarak plana ekle

- Başka güne taşıyarak kabul et

Örneğin grup üyesi “Giolitti’yi Gün 1 Pantheon sonrası ekleyelim” diye önerdiğinde, admin bunu aynen kabul edebilir veya “Gün 2 öğleden sonraya alalım” diyerek düzenleyip onaylayabilir.

## Plan Değişikliği ve Sürüm Kontrolü (Geri Alma / Undo)

Oylamalı öneri sistemi mutlaka değişiklik geçmişiyle birlikte çalışmalıdır. Çünkü öneriler plana uygulandığında kart sıralaması, saat akışı, gün yoğunluğu veya grup planı değişebilir.

**Son 10 Değişiklik Geçmişi (Undo Stack) Mimarisi:**
Plana yapılan müdahalelerin güvenliğini sağlamak için sistem dairesel bir geçmiş yığını (History Stack) barındırır:
1. Plana uygulanan her büyük değişiklik (kart ekleme, kart silme, kartı başka güne taşıma, saat kaydırma) bu yığına yeni bir sürüm kaydı (snapshot veya delta) olarak eklenir.
2. Geçmiş yığını **son 10 işlemi** hafızada tutar. Bu sayede bellek şişmesi önlenirken kullanıcının en son yaptığı hataları telafi etmesi sağlanır.
3. Plan sahibi (veya editör) zaman çizelgesi üzerindeki "Geri Al" (Undo) ve "Yinele" (Redo) butonlarını kullanarak son 10 değişikliği adım adım geri alabilir veya tekrar uygulayabilir.

Her büyük değişiklik için sistem şu bilgileri kaydeder:
- Değişikliği kim önerdi?
- Kim onayladı?
- Ne zaman uygulandı?
- Hangi kart eklendi, silindi veya taşındı?
- Değişiklik öncesi zaman akışı/kart sırası (önceki durum)
- Değişiklik geri alınabilir mi? (Sıradaki son 10 işlem içinde mi?)

Örnek değişiklik kaydı:
- 15:42 - Elif, Giolitti dondurma molası eklemeyi önerdi.
- 15:50 - Öneri grup oylamasına açıldı.
- 16:20 - Oylama 3 evet, 1 hayır ile tamamlandı.
- 16:25 - Cem öneriyi onayladı.
- 16:25 - Giolitti kartı Gün 1, Pantheon sonrasına eklendi. (Değişiklik #1)

Admin istediği an "Geri Al" düğmesiyle rota akışını bu eklemeden önceki durumuna döndürebilir. Geri alma işlemi de geçmiş günlüğüne kaydedilir.

## Yetki ve Güvenlik İlkesi

Oylamalı öneri sistemi, grup üyelerinin planı sahiplenmesini sağlar; ancak yetki kontrolü her zaman korunmalıdır. Katılımcılar varsayılan olarak doğrudan planı değiştiremez. Sadece öneri sunabilir ve izin verilmişse oy kullanabilir.

Plan sahibi şu ayarları belirleyebilmelidir:

- Kim öneri sunabilir?

- Kim oy kullanabilir?

- Kim önerileri onaylayabilir?

- Hangi öneriler otomatik oylamaya açılır?

- Hangi öneriler doğrudan admin onayına düşer?

- Oylama sonucu otomatik uygulanabilir mi?

- Öneriler gezi başladıktan sonra da yapılabilir mi?

Bu ayarlar, aile planı, arkadaş grubu veya kalabalık tur planı gibi farklı kullanım senaryolarına göre esneklik sağlar.

## Ürün Değeri

Oylamalı öneri sistemi, PlanTatil’i basit bir gezi listesi uygulamasından çıkarıp grup karar alma aracına dönüştürür.

Gerçek hayatta gezi planları genellikle WhatsApp mesajları, Google Maps linkleri ve sözlü öneriler arasında dağılır. Bir kişi restoran linki gönderir, bir başkası “orası uzak” der, başka biri “çocuklarla zor olur” diye uyarır. Bu konuşmalar zamanla kaybolur ve plana dönüşmez.

PlanTatil bu dağınık süreci yapılandırır. Grup üyelerinin fikirleri doğrudan uygulanabilir önerilere dönüşür. Öneriler oylanabilir, admin tarafından onaylanabilir ve plana kontrollü şekilde işlenebilir. Böylece grup konuşması gerçek bir gezi kararına dönüşür.

## Karar Özeti

1. Katılımcılar varsayılan olarak planı doğrudan değiştirmez, yapılandırılmış öneri sunar.

2. Öneriler klasik yorum değil, uygulanabilir plan değişikliği teklifidir.

3. Öneri türleri sistem tarafından tanımlanır: durak ekle, taşı, sil, saat değiştir, lezzet ekle, alternatif öner vb.

4. Plan sahibi öneriyi onaylayabilir, reddedebilir, düzenleyerek kabul edebilir veya oylamaya açabilir.

5. Oylama varsayılan olarak danışma amaçlıdır; son karar admindedir.

6. Plan sahibi isterse çoğunlukla otomatik uygulama gibi kurallar tanımlayabilir.

7. Her büyük değişiklik değişiklik geçmişine yazılır.

8. Uygulanan değişiklikler geri alınabilir olmalıdır.

9. Öneri sistemi WhatsApp’ta dağılan fikirleri PlanTatil içinde karar ve aksiyona dönüştürür.
