---
id: plan_dnasi
title: "Plan DNA'sı ve Uygunluk Skoru"
status: planned
percentage: 10
dependencies:
  - plan_kopyalama
  - gezi_kartlari
criteria:
  - "Plan DNA'sını oluşturan parametrelerin (tempo, çocuk, lezzet, bütçe vb.) ağırlıklandırılması"
  - "Kullanıcı profili ile plan DNA'sı arasındaki 'Uygunluk Skoru' formülü"
  - "Bir kartın mevcut plana eklenmesindeki yerel uygunluk hesabı"
  - "Kullanıcıya plan önerirken kullanılan global uygunluk hesabı"
  - "Plan DNA'sının kullanıcı hareketlerine göre dinamik güncellenmesi"
---

# 16. Plan DNA’sı ve Uygunluk Skoru

PlanTatil 2.0’da her plan yalnızca durakların sıralandığı bir liste olarak görülmemelidir. Her planın bir karakteri, hedef kitlesi, temposu, bütçesi, ilgi alanı ve uygulanabilirlik profili olmalıdır. Bu karakter bilgisine “Plan DNA’sı” denir.

Plan DNA’sı, kullanıcının bir planı detaylı incelemeden önce “bu plan bana uygun mu?” sorusuna cevap verir. Örneğin aynı şehir için iki farklı Roma planı olabilir. Biri erken başlayan, yoğun tempolu, tarih ve müze ağırlıklı bir plan olabilir. Diğeri çocuklu aileye uygun, daha hafif tempolu, mola ve yeme-içme ağırlıklı bir plan olabilir. İkisi de Roma planıdır; ancak karakterleri farklıdır.

Bu nedenle PlanTatil’de planlar yalnızca şehir, gün sayısı ve duraklardan oluşmamalıdır. Her plan, onu tanımlayan DNA bilgileriyle birlikte saklanmalıdır.

DNA alanı

Örnek değerler

Tempo

Hafif / Orta / Yoğun

Kitle

Çift / Arkadaş / Çocuklu aile / Yalnız gezgin / Yaşlılarla gezi

Bütçe

Ekonomik / Orta / Rahat / Premium

İlgi

Tarih / Lezzet / Alışveriş / Sanat / Fotoğraf / Çocuk etkinliği

Yürüyüş seviyesi

Az / Orta / Çok

Başlama tarzı

Erken / Normal / Geç

Riskler

Kalabalık, sıra, pahalı, çocukla zor, kapalı gün, rezervasyon gerektirir

## 16.1. Plan DNA Alanları

Plan DNA’sında bulunabilecek temel alanlar:

Tempo:Hafif, orta, yoğun.

Hedef kitle:Çift, arkadaş grubu, çocuklu aile, yalnız gezgin, yaşlılarla gezi, kalabalık aile, genç grup.

Bütçe:Ekonomik, orta, rahat, premium.

İlgi alanı:Tarih, lezzet, alışveriş, sanat, fotoğraf, müze, doğa, çocuk etkinliği, gece gezmesi, yerel deneyim.

Yürüyüş seviyesi:Az, orta, çok.

Başlama tarzı:Erken başlayan, normal başlayan, geç başlayan.

Gün bitiş tarzı:Erken biten, akşam yemeğiyle biten, gece gezmesi içeren.

Riskler:Kalabalık, uzun sıra, pahalı, çocukla zor, kapalı gün riski, rezervasyon gerektirir, uzun yürüyüş içerir.

Plan yapısı:Sıralı rota, esnek rota, alternatifli rota, lezzet ağırlıklı rota, kültür ağırlıklı rota, serbest keşif rotası.

Ulaşım tercihi:Yürüyüş ağırlıklı, toplu taşıma destekli, taksi/araç destekli, karma.

Zorluk seviyesi:Kolay, orta, yorucu.

Esneklik:Katı saatli plan, yarı esnek plan, tamamen esnek plan.

## 16.2. Plan DNA’sının Kullanım Alanları

Plan DNA’sı ürünün birçok bölümünde kullanılmalıdır.

Plan keşfetme ekranında:Kullanıcı kendisine uygun planları filtreleyebilir. Örneğin “çocuklu aile”, “hafif tempo”, “ekonomik”, “az yürüyüş” gibi filtrelerle plan arayabilir.

Plan detay ekranında:Kullanıcı planı açmadan önce planın kendisine uygun olup olmadığını görebilir.

Plan kopyalama sırasında:Kullanıcı bir planı kopyalarken sistem, kullanıcının tercihlerine göre planı uyarlayabilir. Örneğin yoğun bir plan hafif tempoya çevrilebilir.

Kart öneri sisteminde:Bir karta ait tür ve lokasyon bilgisi, plan DNA’sıyla karşılaştırılarak “bu karta bu plan uygun mu?” sorusuna cevap verilebilir.

AI destekli plan düzenlemede:Yapay zeka, plan DNA’sına göre planı sadeleştirebilir, yoğunlaştırabilir, çocuklu aileye uygun hale getirebilir veya lezzet ağırlıklı yapabilir.

Topluluk değerlendirmesinde:Kullanıcılar bir planı deneyimledikten sonra “çocukla gerçekten uygun”, “beklenenden yorucu”, “bütçe olarak pahalı” gibi geri bildirimler verebilir. Bu geri bildirimler zamanla plan DNA’sını güçlendirir.

## 16.3. Uygunluk Skoru

Uygunluk skoru, bir planın veya kartın belirli bir bağlama ne kadar uygun olduğunu hesaplayan karar destek sistemidir.

Bu skor farklı durumlarda kullanılabilir:

- Kullanıcıya uygun plan önerirken

- Kartı plana eklerken

- Kartı en uygun güne yerleştirirken

- Haritada yakın alternatif gösterirken

- Topluluk kartlarını filtrelerken

- İlham planlarından kart aktarırken

- Plan yoğunluğunu değerlendirirken

Uygunluk skoru, tek bir puan olarak gösterilebilir; ancak arka planda birçok kriterden oluşmalıdır.

## 16.4. Kartı Plana Eklerken Uygunluk Skoru

Bir kullanıcı Kartlarım arşivindeki bir kartı plana eklemek istediğinde sistem, bu kartın hangi plana daha uygun olduğunu hesaplamalıdır.

Dikkate alınabilecek kriterler:

- Kartın şehir ve ülke bilgisi ile planın şehir ve ülke bilgisi eşleşiyor mu?

- Kartın konumu planın mevcut duraklarına yakın mı?

- Kartın türü planın karakterine uygun mu?

- Plan düzenlemeye açık mı?

- Plan aktif mi yoksa arşivlenmiş mi?

- Plan tarihi yaklaşıyor mu?

- Kullanıcı bu planı son zamanlarda açtı mı?

- Kart daha önce bu plana eklenmiş mi?

- Kartın ortalama süresi günlük akışa uyuyor mu?

- Kart planın temposunu bozuyor mu?

- Kart çocuklu aile, bütçe veya yürüyüş tercihleriyle uyumlu mu?

Örneğin Roma’daki bir dondurmacı kartı, kullanıcının hem Roma hem Milano planı varsa Roma planına daha yüksek uygunluk skoru almalıdır. Eğer Roma planı düzenlemeye açık ve kart Pantheon durağına yakınsa bu plan en üstte gösterilmelidir.

## 16.5. Planı Kullanıcıya Önerirken Uygunluk Skoru

PlanTatil, plan keşfetme ekranında kullanıcının profilini ve tercihlerini dikkate alarak uygun planları öne çıkarabilir.

Örneğin kullanıcı çocuklu aile profiline sahipse ve “az yürüyüş, hafif tempo, ekonomik” tercihleri yapmışsa, sistem yoğun müze rotalarını geriye atabilir; çocuk molası ve kısa yürüyüş içeren planları öne çıkarabilir.

Uygunluk kriterleri:

- Kullanıcının seyahat tipi

- Grup yapısı

- Çocuk olup olmaması

- Bütçe tercihi

- Günlük tempo tercihi

- Yürüyüş toleransı

- İlgi alanları

- Gezi süresi

- Konaklama bölgesi

- Seyahat tarihleri

- Mevsim ve hava durumu

- Planın topluluk geri bildirimi

## 16.6. Kartı Gün İçinde Yerleştirirken Uygunluk Skoru

Kartın doğru plana eklenmesi yeterli değildir. Kartın doğru güne ve doğru sıraya yerleşmesi de önemlidir.

Sistem bir kartın hangi noktaya yerleşebileceğini hesaplarken şu kriterleri kullanabilir:

- Kart mevcut duraklardan hangisine daha yakın?

- Kartın türü günün akışına uygun mu?

- Öğle yemeği kartı öğle saatine yakın mı?

- Dondurma/kahve kartı mola aralığına uygun mu?

- Müze kartı kapanış saatinden önce ziyaret edilebilir mi?

- Kart eklendiğinde gün çok yoğunlaşıyor mu?

- İki durak arasındaki rota mantıklı mı?

- Kullanıcı yürüyüşü azaltmak istiyor mu?

- Grup çocuklu mu?

- Kart opsiyonel olarak mı eklenmeli?

Örneğin Pantheon sonrası bir dondurma kartı, Piazza Navona öncesine veya Pantheon sonrasına yüksek uygunluk alabilir. Ancak Colosseum sabah akışının ortasına düşük uygunluk alabilir.

## 16.7. Plan DNA’sının Zamanla Güncellenmesi

Plan DNA’sı yalnızca planı oluşturan kişinin ilk girdiği bilgilerden oluşmamalıdır. Planı kullanan kişilerin geri bildirimleri zamanla bu DNA’yı zenginleştirmelidir.

Örneğin plan sahibi planı “orta tempo” olarak işaretlemiş olabilir. Ancak planı uygulayan kullanıcıların çoğu “yorucu” olarak geri bildirim verirse sistem planın gerçek temposunu yeniden değerlendirebilir.

Benzer şekilde:

- Kullanıcılar “çocukla zor” diyorsa çocuk uygunluğu düşebilir.

- Birçok kişi “çok yürüdük” diyorsa yürüyüş seviyesi artabilir.

- Kullanıcılar “pahalı restoranlar vardı” diyorsa bütçe seviyesi güncellenebilir.

- Bir durak sık sık “kapalıydı” diye işaretleniyorsa risk uyarısı güçlenebilir.

- Bir plan çok fazla “denedim ve beğendim” alıyorsa güvenilirlik skoru artabilir.

Bu yapı PlanTatil’in zamanla daha akıllı ve gerçekçi hale gelmesini sağlar.

## 16.8. Uygunluk Skorunun Kullanıcıya Gösterimi

Uygunluk skoru teknik bir hesaplama olarak kalmamalıdır. Kullanıcıya sade ve anlaşılır şekilde gösterilmelidir.

Örnek ifadeler:

- Bu plan size çok uygun görünüyor.

- Çocuklu aile için orta uygunlukta.

- Yürüyüş seviyesi yüksek olabilir.

- Bütçe tercihinize göre biraz pahalı kalabilir.

- Bu kart planınızdaki Pantheon durağına çok yakın.

- Bu restoran mevcut rotanızdan 18 dakika sapma gerektiriyor.

- Bu kartı Gün 1 öğleden sonra eklemek daha mantıklı görünüyor.

- Bu plan yoğun tempolu; hafifletmek ister misiniz?

Sistem karar vermeyi kullanıcı adına tamamen üstlenmemeli, kullanıcıya neden-sonuç ilişkisiyle öneri sunmalıdır.

## 16.9. Ürün Değeri

Plan DNA’sı ve uygunluk skoru, PlanTatil’i basit bir plan listesi uygulamasından akıllı karar destek sistemine dönüştürür.

Kullanıcı yalnızca “Roma planları” arasında seçim yapmaz. Kendisine, ailesine, bütçesine, temposuna ve ilgi alanlarına en uygun planı bulur. Kart eklerken rastgele seçim yapmaz; sistem ona en doğru planı, günü ve konumu önerir. Planı uygulayan kullanıcıların gerçek deneyimleri de zamanla bu önerileri güçlendirir.

Bu bölümün temel vaadi şudur:

“Her planın bir karakteri vardır. PlanTatil bu karakteri görünür yapar ve kullanıcının kendisine en uygun planı, kartı ve rotayı seçmesine yardımcı olur.”

## Karar Özeti

- Her plan yalnızca durak listesinden ibaret olmayacak; Plan DNA’sı taşıyacak.

- Plan DNA’sı planın temposunu, hedef kitlesini, bütçesini, ilgi alanını, yürüyüş seviyesini ve risklerini gösterecek.

- Plan DNA’sı plan keşfetme, plan kopyalama, kart önerme, AI uyarlama ve topluluk değerlendirmelerinde kullanılacak.

- Uygunluk skoru, bir kartın veya planın belirli bir kullanıcıya, plana veya güne ne kadar uygun olduğunu hesaplayacak.

- Kartı plana eklerken şehir, ülke, konum yakınlığı, plan durumu, kart türü ve plan karakteri dikkate alınacak.

- Kartı gün içine yerleştirirken rota mantığı, süre, yürüyüş, yoğunluk ve kullanıcı tercihleri değerlendirilecek.

- Plan DNA’sı zamanla kullanıcı geri bildirimleriyle güncellenebilecek.

- Uygunluk skoru kullanıcıya teknik puan olarak değil, anlaşılır öneri cümleleriyle sunulacak.

- Sistem kullanıcı adına karar vermeyecek; kullanıcıya güçlü karar desteği sağlayacak.

Toparlama meselesine gelince: Evet, ileride büyük bir “yeniden düzenleme turu” şart olacak.

Bence şu an karışıklık yaşamamak için dokümanda en sona geçici bir bölüm ekleyelim:

EK: ÇAPRAZ İLİŞKİLER VE BAŞKA BÖLÜMLERİ ETKİLEYEN KARARLAR

Buraya şöyle notlar atarız:

- Plan DNA’sı → Plan keşfetme, AI uyarlama, kart öneri sistemi, harita filtreleri, uygunluk skoru.

- Uygunluk skoru → Karttan plana ekleme, haritadan kart ekleme, ilham planlarından kart aktarma.

- Grup rolleri → Oylamalı öneri, görev paylaşımı, grup planı düzenleme.

- Gezi Kartları → Harita ekranı, plan içi kart ekleme, topluluk kartları, kişisel arşiv.

- Canlı Gezi Modu → Zaman çizelgesi, harita ekranı, hızlı notlar, grup ilerlemesi.

- Topluluk puanları → Kart keşfi, yüksek puanlı öneriler, Plan DNA güncellemesi.

En sonunda bu çapraz ilişkilerden yola çıkarak bölümleri yeniden sıralarız, tekrar eden yerleri birleştiririz ve dokümanı “anayasa” kıvamına getiririz. Şu an fikir yakalama aşamasındayız; tekrar ve dağılma normal.
