---
id: haritadan_plana
title: "Haritadan Plana Aktarma Akışları"
status: completed
percentage: 100
dependencies:
  - gezi_kartlari
  - harita_ekrani
criteria:
  - "Harita linkinden otomatik veri çekme (adres, isim vb.) mekanizması"
  - "Haritadan arşive (Kartlarım) aktarma akış tasarımı"
  - "Plan içinden arşive gidip kart ekleme akış tasarımı"
  - "Kartın konumuna göre en uygun güne yerleştirme algoritması"
  - "Çift kayıt (duplicate) kontrol mekanizması"
---

# 13. Haritadan Plana Aktarma Akışları

PlanTatil 2.0’ın en önemli kullanım kolaylıklarından biri, kullanıcının Google Maps veya benzeri harita uygulamalarında bulduğu mekanları zahmetsizce PlanTatil’e aktarabilmesidir. Kullanıcı bir restoran, müze, dondurmacı, kahve noktası, alışveriş yeri veya gezi durağı bulduğunda, bu mekanı kaybetmeden kendi gezi sistemine dahil edebilmelidir.

Bu özellik sayesinde kullanıcı gezi araştırması yaparken sürekli not almak, ekran görüntüsü almak, WhatsApp’a link atmak veya farklı uygulamalar arasında kaybolmak zorunda kalmaz. Haritada bulduğu yeri paylaş menüsünden PlanTatil’e gönderir; sistem bu mekanı bir “Gezi Kartı”na dönüştürür.

Haritadan gelen mekan ilk aşamada doğrudan aktif bir plana eklenmek zorunda değildir. Varsayılan davranış, mekanın kullanıcının “Gezi Kartları / Kartlarım” arşivine düşmesidir. Kullanıcı isterse aynı anda bu kartı uygun bir plana da ekleyebilir.

Bu yaklaşım önemlidir. Çünkü kullanıcı aynı anda Roma, Milano, Venedik veya başka şehirler için birden fazla plan hazırlıyor olabilir. Her yeni mekanın doğrudan bir plana girmesi kafa karışıklığı oluşturabilir. Bu nedenle PlanTatil önce mekanı güvenli şekilde arşive alır, sonra bağlama göre en uygun planları önerir.

## 13.1. Akış A: Haritadan Kartlarıma ve Veri Çekme Kapsamı

Bu akış, kullanıcının harita uygulamasında (Google Maps veya Apple Maps) bulduğu bir mekanı "Paylaş" diyerek PlanTatil’e göndermesini anlatır.

- Kullanıcı harita uygulamasında mekanı açar ve Paylaş menüsünden PlanTatil'i seçer.
- Sistem gelen paylaşım bağlantısını (Share Link) analiz ederek arka planda şu temel mekan bilgilerini otomatik olarak ayrıştırır (parse eder):
  - **Mekan Adı** (Örn: Giolitti Gelateria)
  - **Türü / Kategori** (Örn: Kahve / Tatlı)
  - **Puanı / Rating** (Örn: 4.6 / 5)
  - **Coğrafi Konumu / GPS** (Latitude, Longitude)
  - **Öne Çıkan Yorumlar:** Mekana dair en popüler/beğenilen veya en fazla reaksiyon almış 1-2 anonim yorum (kullanıcı isimleri gizlenerek, mekan hakkında fikir verecek nitelikte).
  - **Harita/Navigasyon Linki:** Kullanıcının kart üzerinden tek tıkla orijinal harita sağlayıcısına gidip yol tarifi alabileceği harici bağlantı.
- Sistem bu verileri ortak bir potada eriterek yeni bir **Gezi Kartı** oluşturur ve kullanıcının “Gezi Kartları / Kartlarım” arşivine kaydeder.
- Kullanıcıya iki temel seçenek sunulur: *"Hemen plana ekle"* veya *"Sonra bakarım"*.

Örnek ekran metni:

Yeni gezi kartı oluşturuldu.

**Giolitti Gelateria**  
Tür: Tatlı / Dondurma (Puan: 4.6 ★)  
*Öne Çıkan Yorum:* "Roma'nın en iyi dondurması, kuyruk beklemeye değer ama nakit hazırlayın."  
Kaynak: Google Maps

[Hemen plana ekle] [Sonra bakarım] [Haritada Aç (Yol Tarifi)]

## 13.2. Akış B: Plan İçinden Kartlarımdan Ekle

Bu akış, kullanıcının aktif bir plan üzerinde çalışırken daha önce kaydettiği kartları plana eklemesini anlatır.

- Kullanıcı ilgili planı açar.

- İlgili güne gelir.

- “Kart ekle” düğmesine basar.

- “Kartlarımdan ekle” seçeneğini açar.

- Sistem, planın şehir ve konum bağlamına göre uygun kartları gösterir.

- Kullanıcı listeden bir kart seçer.

- Sistem kartın plana nereye eklenebileceğini önerir.

- Kullanıcı günü, sırayı ve saat bilgisini onaylar.

- Kart plana eklenir.

Bu akışta filtreleme çok önemlidir. Örneğin kullanıcı Roma planı içindeyse sistem öncelikle Roma kartlarını göstermelidir. Milano, Venedik veya başka şehir kartları arka planda kalmalıdır.

Plan içinden Kartlarım açıldığında öne çıkabilecek kart grupları:

- Bu şehirdeki kartlar

- Yakındaki kartlar

- Daha önce bu plana eklenmemiş kartlar

- Yeme / içme kartları

- Müze / ören yeri kartları

- Kahve / tatlı / dondurma kartları

- Alışveriş kartları

- Çocuk molası kartları

- Arkadaş önerileri

- Yüksek puanlı kartlar

- Daha sonra bakılacak kartlar

Bu yapı, kullanıcının büyük bir arşiv içinde kaybolmadan doğru kartı bulmasını sağlar.

## 13.3. Akış C: Karttan Plana Ekle

Bu akış, kullanıcının “Kartlarım” arşivinden bir kart seçerek onu uygun bir plana eklemesini anlatır.

- Kullanıcı Kartlarım arşivini açar.

- Bir karta tıklar.

- “Plana ekle” butonuna basar.

- Sistem, kullanıcının düzenlemeye açık planlarını listeler.

- Kartın şehir, ülke ve konum bilgisine en uygun planlar üstte gösterilir.

- Kullanıcı uygun planı seçer.

- Sistem kart için uygun gün ve yerleşim noktası önerir.

- Kullanıcı öneriyi onaylar veya elle farklı bir gün/sıra seçer.

- Kart plana eklenir.

Bu akışta bütün planlar aynı ağırlıkta gösterilmemelidir. Kullanıcının 10 planı olabilir; bunlardan yalnızca 2 tanesi aktif ve düzenlemeye açık olabilir. Sistem öncelikle düzenlemeye açık planları göstermeli, kapalı veya arşivlenmiş planları geri planda tutmalıdır.

Örnek:

Giolitti kartı Roma’dadır. Kullanıcının hem Roma hem Milano planı düzenlemeye açıktır. Bu durumda Roma planı en üstte görünmelidir. Çünkü kartın konumu Roma planıyla doğrudan eşleşir.

## 13.4. Uygun Planı Otomatik Sıralama

Karttan plana ekleme sırasında sistem, kullanıcının planlarını akıllı şekilde sıralamalıdır. Bu sıralama kullanıcının karar yükünü azaltır.

Uygunluk sıralamasında dikkate alınabilecek kriterler:

- Kartın şehir bilgisi ile planın şehir bilgisi eşleşiyor mu?

- Kartın ülke bilgisi ile planın ülke bilgisi eşleşiyor mu?

- Kartın konumu planın mevcut duraklarına yakın mı?

- Plan düzenlemeye açık mı?

- Plan aktif mi, arşivlenmiş mi?

- Planın tarihleri yaklaşıyor mu?

- Kullanıcı bu planı son zamanlarda açtı mı?

- Kartın türü planın temasına uygun mu?

- Kart daha önce bu plana eklenmiş mi?

- Kart grup planına ekleniyorsa kullanıcının yetkisi var mı?

Sistem bu kriterlere göre en uygun planı üstte gösterir.

Örnek sıralama:

En uygun plan:Roma Aile Tatili 2026Bu kart Roma’da ve planındaki Pantheon durağına yakın.

Diğer uygun planlar:İtalya Yaz TatiliRoma Lezzet Listesi

Daha az uygun:Milano 1 GünVenedik Hafta Sonu

## 13.5. Kartı Planda En Uygun Yere Yerleştirme

Bir kartın doğru plana eklenmesi yeterli değildir. Kartın doğru güne ve doğru sıraya yerleşmesi de önemlidir.

Sistem, kartın konumunu mevcut plan duraklarıyla karşılaştırarak uygun yerleşim önerileri sunmalıdır.

Örneğin Giolitti kartı Roma planına eklenmek istendiğinde sistem şöyle öneriler verebilir:

- Gün 1, Pantheon’dan sonra uygun

- Gün 1, Piazza Navona’dan önce uygun

- Gün 2, öğleden sonra boşlukta uygun

Bu öneriler hazırlanırken şu bilgiler kullanılabilir:

- Kartın konumu

- Mevcut durakların konumu

- Gün içindeki saat akışı

- Kartın türü

- Kartın tahmini ziyaret süresi

- İki durak arası yürüyüş veya ulaşım süresi

- Planın günlük yoğunluğu

- Kullanıcının tempo tercihi

Bu yapı sayesinde kullanıcı, kartı ekledikten sonra rota akışını baştan düzenlemek zorunda kalmaz. Sistem ona makul yerleşim noktaları sunar.

## 13.6. Grup Planlarında Haritadan Kart Ekleme

Kullanıcı bir kartı kendi kişisel planına ekliyorsa işlem doğrudan yapılabilir. Ancak kart bir grup planına eklenmek isteniyorsa kullanıcının yetkisi kontrol edilmelidir.

Örneğin bir katılımcı Google Maps’ten bir dondurmacı paylaşarak PlanTatil’e gönderdi. Sistem kartı oluşturur ve kullanıcıya Roma grup planına eklemek isteyip istemediğini sorar. Eğer kullanıcının doğrudan düzenleme yetkisi yoksa kart plana eklenmez; plan sahibine öneri olarak gönderilir.

Örnek ekran metni:

Giolitti kartı oluşturuldu.

Bu kart Roma Aile Tatili 2026 planına uygun görünüyor.Bu planda doğrudan düzenleme yetkin yok.

[Öneri olarak gönder][Kartlarıma kaydet][Vazgeç]

Plan sahibi bu öneriyi daha sonra onaylayabilir, reddedebilir, düzenleyerek kabul edebilir veya grup oylamasına açabilir.

## 13.7. Aynı Kartın Tekrar Eklenmesini Önleme

Sistem, aynı kartın aynı plana yanlışlıkla tekrar eklenmesini önlemelidir.

Bir kullanıcı daha önce eklenmiş bir kartı aynı plana tekrar eklemek istediğinde uyarı gösterilmelidir.

Örnek:

Bu kart zaten Roma Aile Tatili 2026 planında var.

Gün 1Pantheon sonrası16:20

[Mevcut kartı aç][Başka güne kopyala][Yine de ekle]

Bu uyarı, planın gereksiz şekilde kalabalıklaşmasını ve aynı mekanın fark edilmeden tekrarlanmasını engeller.

## 13.8. Harita Linkinin Yetersiz Olduğu Durumlar

Her harita paylaşım bağlantısından tam mekan bilgisi alınamayabilir. Bazı linkler yalnızca koordinat, bazıları yalnızca kısa URL, bazıları ise eksik başlık bilgisi içerebilir.

Bu durumda sistem kullanıcıdan eksik bilgileri tamamlamasını isteyebilir.

Örnek eksik bilgi ekranı:

Bu mekan için bazı bilgiler eksik.

Başlık:[................]

Tür:[Gezilecek yer / Yeme içme / Kahve / Tatlı / Müze / Alışveriş]

Şehir:[................]

Not:[................]

[Gezi kartı olarak kaydet]

Bu yaklaşım, otomasyon eksik kaldığında bile kullanıcının süreci tamamlamasını sağlar.

## 13.9. Ürün Değeri

Haritadan plana aktarma akışı, PlanTatil’in günlük kullanım alışkanlığı oluşturabilecek en önemli özelliklerinden biridir.

Kullanıcı gezi araştırması yaparken farklı kaynaklarda pek çok mekanla karşılaşır. Bu mekanların çoğu ekran görüntülerinde, WhatsApp mesajlarında, tarayıcı sekmelerinde veya not uygulamalarında kaybolur. PlanTatil bu dağınıklığı çözer.

Haritada bulunan her mekan tek dokunuşla Gezi Kartı’na dönüşür. Bu kart kullanıcının kişisel arşivinde saklanır, uygun plana önerilir, doğru güne yerleştirilir ve gerekirse grup onay sürecine dahil edilir.

Bu sayede PlanTatil, yalnızca gezi planı yapılan bir uygulama değil; gezi araştırması sırasında bulunan her fikri kaybetmeden yakalayan ve doğru plana bağlayan akıllı bir gezi organizasyon aracına dönüşür.

## Karar Özeti

- Harita uygulamalarından gelen mekanlar önce Gezi Kartı’na dönüşür.

- Varsayılan davranış, kartın Kartlarım arşivine kaydedilmesidir.

- Kullanıcı isterse kartı hemen uygun plana ekleyebilir.

- Plan içinden Kartlarım açıldığında sistem ilgili şehir ve bağlama göre kartları filtreler.

- Karttan plana eklerken yalnızca düzenlemeye açık ve konuma uygun planlar öncelikli gösterilir.

- Kartın lokasyonuna en uygun plan en üstte görünür.

- Sistem kartın planda hangi güne ve hangi sıraya yerleşeceğini önerebilir.

- Grup planlarında kullanıcının yetkisi yoksa kart öneri olarak gönderilir.

- Aynı kartın aynı plana tekrar eklenmesi durumunda sistem uyarı verir.

- Eksik harita verilerinde kullanıcıdan başlık, tür, şehir ve not bilgisi tamamlaması istenir.

## 13.10. Global Konum Tekilleştirme Mimarisi (Location Deduplication)

PlanTatil 2.0'da yüzlerce kullanıcının aynı popüler mekanı (örneğin Kolezyum) kendi planlarına veya arşivlerine ayrı ayrı eklemesi durumunda haritada bir "pin çöplüğü" oluşmasını önlemek amacıyla **Global Konum Tekilleştirme** mimarisi uygulanır.

### 13.10.1. Global Düğüm (Node) ve Kart Örneği (Instance) Ayrımı
- **Global Konum Düğümü (Global Location Node):** Her benzersiz fiziksel mekan için veritabanında tek bir kayıt tutulur. Bu kayıt, harita sağlayıcısından gelen benzersiz kimlikle (Google Place ID veya GPS Koordinat Hash'i) eşleştirilir. Mekanın adı, türü, konumu, genel puanı ve öne çıkan ortak yorumları bu düğümde saklanır.
- **Kişisel/Grup Kart Örneği (Personal Card Instance):** Kullanıcılar bu mekanı kendi planlarına veya "Kartlarım" arşivlerine eklediklerinde, sıfırdan yeni bir mekan kaydı oluşturmazlar. Bunun yerine ortak olan *Global Konum Düğümü*'ne referans veren (bağlanan) kişiselleştirilmiş bir kart örneği oluştururlar. Bu kart örneği sadece o kullanıcıya/gruba özel notları (Örn: *"Cem'in Notu: Giriş biletlerini sabah aldık"* veya *"Ali'nin Notu: Buraya akşam gitmek daha iyi"*) ve ziyaret saatlerini barındırır.

### 13.10.2. Tek Pin Altında Ortak Akıl Harita Gösterimi
Uygulama içi haritadan kartları incelemek veya canlı keşif modunu açmak istediğimizde, aynı lokasyonda onlarca farklı pin yerine **tek bir temiz global pin** gösterilir:
1. Haritada Kolezyum için tek bir pin yer alır.
2. Kullanıcı bu pine tıkladığında açılan detay panelinde mekanın global bilgileri (Kolezyum, Tarihi Yer, 4.8 Puan, genel bilgiler) üstte görünür.
3. Panelin alt kısmında ise **"Bu Mekan Hakkındaki Notlarınız"** veya **"Grup Üyelerinin Notları"** başlığı altında, o mekanı planına eklemiş tüm katılımcıların kişisel/grup kartlarındaki özelleştirilmiş notları listelenir:
   - *Cem:* "Sabah 9'da kapıda olunmalı, sıra çok uzun."
   - *Ali:* "Rehberli tur biletini önceden online aldık."
4. Bu sayede harita ekranı temiz kalırken, aynı mekana dair gruptaki herkesin veya topluluğun ortak aklı tek bir çatı altında birleştirilmiş olur.

