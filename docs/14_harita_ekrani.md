---
id: harita_ekrani
title: "Harita Ekranı ve Canlı Keşif Modu"
status: completed
percentage: 100
dependencies:
criteria:
  - "Harita altlığının, kümelendirme (clustering) ve marker tiplerinin belirlenmesi"
  - "Harita katmanları (plana dahil olanlar, kişisel arşiv, popüler mekanlar) yapısı"
  - "Gelişmiş kategori ve puan filtrelerinin tanımlanması"
  - "Plansız gezi (keşif) modu ve rota bazlı olmayan listeleme"
  - "Konuma yakın yüksek puanlı mekan öneri sistemi"
---

# 14. Harita Ekranı ve Canlı Keşif Modu

PlanTatil 2.0’da her gezi kartı konum bilgisi taşıdığı için, uygulamada güçlü bir harita ekranı bulunmalıdır. Bu ekran, kullanıcının kartlarını yalnızca liste veya gün planı içinde değil, gerçek harita üzerinde görmesini sağlar.

Harita ekranı iki farklı kullanım ihtiyacına cevap verir:

Birincisi, kullanıcının önceden hazırladığı planı harita üzerinde görmesi ve durakların birbirine göre konumunu anlamasıdır.

İkincisi ise kullanıcının sıralı bir plana bağlı kalmadan, bulunduğu konuma göre yakınındaki kayıtlı kartları, alternatif mekanları veya topluluk tarafından önerilen noktaları keşfetmesidir.

Bu yapı sayesinde PlanTatil yalnızca “önceden planladığım sırayı takip edeyim” aracı olmaz. Kullanıcı gezi sırasında plan dışına çıktığında, kapalı bir mekanla karşılaştığında, yorulduğunda, acıktığında veya yakınlarda kaydettiği bir yer olup olmadığını merak ettiğinde harita ekranına geçerek hızlı karar verebilir.

## 14.1. Harita Ekranının Temel Mantığı

Harita ekranı, kullanıcının sahip olduğu veya erişim izni olan tüm konumlu gezi kartlarını harita üzerinde gösterir.

Bu kartlar şu kaynaklardan gelebilir:

- Kullanıcının Kartlarım arşivi

- Aktif gezi planındaki duraklar

- Kullanıcının daha önce kaydettiği ama plana eklemediği kartlar

- Grup üyelerinin önerdiği kartlar

- Paylaşıma açık PlanTatil kartları

- Topluluk tarafından yüksek puan almış kartlar

- Harita API servislerinden gelen yakın mekan önerileri

- Daha önce denenmiş, beğenilmiş veya beğenilmemiş kişisel yerler

Kullanıcı haritada hangi kart türlerini görmek istediğini seçebilir. Böylece harita kalabalıklaşmaz ve kullanıcı o anki ihtiyacına göre filtreleme yapabilir.

## 14.2. Harita Katmanları

Harita ekranında sağ tarafta veya mobilde açılır bir panel içinde harita katmanları bulunabilir.

Örnek harita katmanları:

- Standart harita

- Uydu görünümü

- Topografik görünüm

- Toplu taşıma görünümü

- Yürüyüş odaklı görünüm

- Trafik görünümü

- Gece güvenli bölge görünümü

- Turistik yoğunluk görünümü

- Kullanıcının aktif plan rotası

- Sadece yakın çevre görünümü

Bu katmanlar, kullanılan harita servisinin imkanlarına göre değişebilir. İlk sürümde standart harita ve uydu görünümü yeterli olabilir. İlerleyen aşamalarda yürüyüş, toplu taşıma, yoğunluk veya güvenlik gibi katmanlar eklenebilir.

## 14.3. Kart Filtreleri

Harita ekranının sol tarafında veya mobilde alt/yan filtre panelinde kart filtreleri bulunmalıdır. Kullanıcı hangi tür kartları açarsa haritada yalnızca onlar görünür.

Örnek filtreler:

- Kartlarım

- Aktif plandaki duraklar

- Plana eklenmemiş kartlarım

- Gezilecek yerler

- Müze / ören yeri

- Yeme / içme

- Kahve

- Tatlı / dondurma

- Alışveriş

- Manzara / fotoğraf noktası

- Çocuk molası

- Dinlenme noktası

- Ulaşım

- Otel / konaklama

- Grup önerileri

- Yüksek puanlı PlanTatil kartları

- Yakınımdaki popüler kartlar

- Denediklerim

- Beğendiklerim

- Beğenmediklerim

- Daha sonra bakacaklarım

Bu filtre sistemi sayesinde kullanıcı Roma gibi binlerce kartın bulunabileceği şehirlerde bile ihtiyacına göre temiz bir harita görünümü oluşturabilir.

## 14.4. Plan Yapmadan Gezi Modu

PlanTatil yalnızca önceden saat saat plan yapılmış geziler için kullanılmamalıdır. Bazı kullanıcılar veya bazı günler spontane gezmek isteyebilir.

Bu durumda kullanıcı harita ekranını açar ve yakınındaki kartlara bakarak karar verir.

Örnek kullanım:

Kullanıcı Roma’da yürürken plan dışına çıkar. Harita ekranını açar. “Kartlarım” filtresini seçer. Yakınlarda daha önce kaydettiği bir kilise, bir dondurmacı veya küçük bir meydan olduğunu görür. Sıralı plan yapmamış olsa bile “yakındaymış, gidip görelim” diyerek rotasını anlık değiştirebilir.

Bu özellik, PlanTatil’i katı bir rota takip aracı olmaktan çıkarır. Kullanıcı ister planlı, ister yarı planlı, ister tamamen spontane şekilde gezebilir.

## 14.5. Alternatif Bulma Senaryosu

Harita ekranının en güçlü kullanım alanlarından biri, gezi sırasında beklenmedik durumlarda alternatif bulmaktır.

Örnek senaryo:

Kullanıcı planda yer alan bir restorana gider. Restoran kapalıdır veya çok kalabalıktır. Kullanıcı hemen PlanTatil’de harita ekranını açar. “Yeme / içme” filtresini seçer. Sistem yakınlardaki yemek kartlarını gösterir.

Bu kartlar şu kaynaklardan gelebilir:

- Kullanıcının daha önce kaydettiği alternatif restoranlar

- Grup üyelerinin önerdiği yemek kartları

- PlanTatil topluluğunda yüksek puan almış restoranlar

- Yakındaki popüler mekanlar

- Harita servisinden gelen restoran önerileri

Kullanıcı yakınlık, puan, tür, fiyat, çocukla uygunluk veya daha önce kaydedilmiş olma durumuna göre filtreleme yapar. Böylece beklenmedik bir sorun hızlıca çözülebilir.

Örnek ekran akışı:

- Kullanıcı restoranın kapalı olduğunu fark eder.

- PlanTatil harita ekranını açar.

- “Yeme / içme” filtresini seçer.

- “Yakınımdakiler” seçeneğini açar.

- Sistem 500 metre içindeki kayıtlı ve önerilen yemek kartlarını gösterir.

- Kullanıcı yüksek puanlı bir pizzacı seçer.

- “Navigasyon aç” veya “Plana alternatif olarak ekle” butonuna basar.

## 14.6. Kişisel Kartlar ve Topluluk Kartları Ayrımı

Harita ekranında kullanıcıya gösterilen kartların kaynağı açıkça belirtilmelidir.

Örneğin:

- Benim kartım

- Aktif plan kartı

- Grup önerisi

- PlanTatil topluluk kartı

- Harita servisinden gelen mekan

- Daha önce denendi

- Beğenildi

- Beğenilmedi

- Popüler / çok kaydedildi

Bu ayrım güven ve karar kolaylığı sağlar. Kullanıcı kendi kaydettiği bir kartla topluluk tarafından önerilen bir kartı veya dış harita servisinden gelen bir mekanı ayırt edebilmelidir.

Harita üzerinde pin renkleri veya ikonları bu kaynaklara göre farklılaşabilir. Ancak harita çok kalabalıklaşmamalıdır. Kullanıcı istediği kaynakları açıp kapatabilmelidir.

## 14.7. Yakınımdaki Yüksek Puanlı Kartlar ve Yarıçap (Radius) Filtresi

Kullanıcının kendi arşivinde veya planında yeterli alternatif yoksa, sistem yakın çevredeki yüksek puanlı PlanTatil kartlarını gösterebilir. Canlı keşif modu sırasında aramanın kapsamını ve yürüme mesafesini belirlemek amacıyla arayüzde bir **Yarıçap Kaydırıcı (Radius Slider)** yer alır.

**Yarıçap Filtresi Çalışma Mantığı:**
- Kullanıcı arayüzdeki slider (kaydırıcı) veya hızlı butonlar aracılığıyla arama mesafesini sınırlandırır:
  - **500 Metre:** Yaklaşık 5-7 dakikalık çok yakın yürüme mesafesindeki duraklar.
  - **1 Kilometre:** Yaklaşık 12-15 dakikalık orta yürüme mesafesindeki duraklar.
  - **3 Kilometre:** Sürüş, taksi veya toplu taşıma gerektiren yakın çevredeki duraklar.
- Seçilen yarıçapın dışındaki tüm kartlar haritada gizlenir. Böylece kullanıcının o anki yorgunluk ve ulaşım durumuna en uygun alternatifler filtrelenmiş olur.

Sistem yakınlardaki yüksek puanlı kartları şu sırayla sorgular:
- Kullanıcının kendi kartları
- Kullanıcının grup planındaki öneriler
- Kullanıcının kopyaladığı veya incelediği planlardan kartlar
- PlanTatil topluluğunda yüksek puan almış kartlar
- Harita API servisinden gelen popüler mekanlar

Bu sıralama önemlidir. Çünkü kullanıcının kendi kaydettiği veya PlanTatil içinde güvenilir hale gelmiş kartlar, rastgele dış kaynak sonuçlarından önce gelmelidir.

Örnek filtreler:
- En yakındakiler (Seçili Yarıçapa göre)
- En yüksek puanlılar
- En çok kaydedilenler
- En çok denenenler
- Çocukla uygun
- Ekonomik
- Açık olanlar
- Rezervasyonsuz gidilebilir
- Yürüyerek ulaşılabilir
- Yağmurda uygun
- Kalabalık değil

## 14.8. Harita Üzerinden Plana Kart Ekleme ve Hızlı Not Düzenleme

Kullanıcı haritada bir kart veya global konum pini gördüğünde bu kartı doğrudan planına ekleyebilir. 

**Harita Üzerinden Hızlı Not Düzenleme (Inline Edit):**
Kullanıcı haritadaki tekil global pine tıkladığında açılan alt/yan detay panelinde, o mekana dair kendi kişisel arşiv notunu veya grup planı notunu **harita ekranından ayrılmadan** anında yazıp güncelleyebilir:
- Detay panelinde not alanı üzerine tıklanabilir (inline edit moduna geçer).
- Kullanıcı notunu yazıp "Kaydet" dediğinde güncelleme anında veritabanına/plana yansır.
- Böylece haritadan çıkıp plan sayfasına gidip kart aramakla zaman kaybedilmez.

Kart detay panelinde şu aksiyonlar bulunur:
- Navigasyon aç (Google/Apple Maps'e yönlendirme)
- Kartlarıma kaydet
- Aktif plana ekle (Hızlı gün/sıra yerleşimiyle)
- Alternatif olarak ekle
- Grup önerisi olarak gönder
- Durum İşaretle: İstek Listesi (Kalp), Beğendim (Like), Beğenmedim (Dislike)
- Not ekle / düzenle (Inline)

Örneğin kullanıcı yakınında yüksek puanlı bir dondurmacı görür. Karta tıklar, detay panelinden *"Pantheon sonrası iyi bir mola"* notunu inline olarak yazar ve *"Aktif plana ekle"* diyerek rotasına saniyeler içinde dahil eder.

## 14.9. Harita Üzerinde Plan ve Kart Yoğunluğu (Glassmorphism Kümeleme)

Roma gibi büyük turistik şehirlerde binlerce kart olabilir. Bu nedenle harita ekranı hem performans hem de arayüz temizliği açısından **Marker Kümeleme (Clustering)** ile optimize edilir.

**Glassmorphism Kümeleme (Clustering) Tasarımı:**
- Harita zoom seviyesi uzaklaştığında, birbirine yakın kartlar tek bir dairesel "Yoğunluk Kümesi" (Cluster Marker) altında birleştirilir.
- Bu kümelerin görsel stili harita sağlayıcısının varsayılan yapısı yerine [core.css](file:///d:/004_KODLAMA/Planla/src/css/core.css) tasarım anayasasına uygun olarak tasarlanacaktır:
  - **Arka Plan:** Yarı saydam, buzlu cam (backdrop-filter: blur(10px)) efekti taşıyan dairesel yapılar.
  - **Sınırlar ve Gölgeler:** İnce beyaz sınır (border) ve derinlik hissi veren hafif gölge (box-shadow).
  - **Renkler ve Gradyanlar:** Kümenin içindeki kart sayısına göre rengi değişen gradyan kenarlıklar (Örn: 2-5 kart için mavi gradyan, 10+ kart için mor/pembe gradyan).
  - **İçerik:** Kümenin merkezinde, o bölgedeki toplam kart sayısını gösteren şık bir sayaç metni bulunur.
- Kullanıcı bu cam kümelere tıkladığında veya yakınlaştığında (zoom-in), küme dağılır ve tekil parlak pinler görünür hale gelir.

Harita ekranında uygulanacak diğer kurallar:
- Başlangıçta yalnızca aktif plan ve kullanıcının kendi kartları gösterilir.
- Topluluk kartları kullanıcı isterse açılır.
- Yakınlaştırdıkça daha fazla kart detaylı görünür.
- Filtre seçilmeden tüm kartlar açılmaz.
- Kullanıcı “bu bölgede ara” diyerek belirli alanda sonuç ister.
- Harita hareket ettikçe otomatik arama isteğe bağlı olmalıdır.

Bu yaklaşım hem haritanın okunabilirliğini ve estetiğini en üst düzeye çıkarır hem de harita API performansını optimize eder.

## 14.10. Planlı ve Plansız Gezi Arasında Köprü

Harita ekranı PlanTatil’in planlı ve plansız kullanımını birleştirir.

Bazı kullanıcılar gününü saat saat planlamak ister. Bazıları sadece gitmek istediği yerleri kaydeder ve o günkü ruh haline göre gezer. Bazıları ise plan yapar ama gezi sırasında plana tamamen sadık kalmaz.

Harita ekranı tüm bu davranışlara uyum sağlar.

Kullanıcı:

- Hazır planını haritada takip edebilir.

- Plan dışına çıktığında yakınındaki kartları görebilir.

- Kaydettiği ama plana eklemediği yerleri keşfedebilir.

- Kapalı veya kalabalık mekanlara alternatif bulabilir.

- Topluluk tarafından önerilen yüksek puanlı kartları açabilir.

- Kendi anlık rotasını harita üzerinden oluşturabilir.

Bu nedenle harita ekranı yalnızca yardımcı bir ekran değil, ürünün ana kullanım merkezlerinden biri olarak tasarlanmalıdır.

## 14.11. Ürün Değeri

Harita ekranı, PlanTatil’in en güçlü keşif ve karar destek alanlarından biridir.

Kullanıcı plan yapmamış olsa bile PlanTatil içindeki kartlar sayesinde şehirde anlamlı şekilde gezebilir. Plan yapmış olsa bile beklenmedik durumlarda alternatif bulabilir. Bir yere gitmişken yakınlarda daha önce kaydettiği bir kart olduğunu görebilir. Grup önerilerini harita üzerinde değerlendirebilir. Topluluğun yüksek puanlı kartlarını kendi konumuna göre keşfedebilir.

Bu yapı PlanTatil’i klasik “rota listesi” uygulamasından çıkarır ve canlı bir gezi asistanına dönüştürür.

Kullanıcı için temel değer şudur:

“Planım bozulsa bile elimde akıllı bir harita var. Yakınımdaki kendi kartlarımı, grup önerilerini ve güvenilir topluluk kartlarını hemen görebilirim.”

## Karar Özeti

- PlanTatil’de konum bilgisi taşıyan tüm kartları gösteren ayrı bir harita ekranı olacak.

- Harita ekranı yalnızca planı izlemek için değil, plansız veya spontane gezi için de kullanılacak.

- Sağ tarafta veya mobilde açılır panelde harita katmanları bulunacak.

- Sol tarafta veya mobilde filtre panelinde kart türleri bulunacak.

- Kullanıcı hangi kart türlerini açarsa haritada yalnızca onlar görünecek.

- Kartlarım, aktif plan, grup önerileri, topluluk kartları ve harita API sonuçları kaynak olarak ayrılacak.

- Kullanıcı yakınındaki kendi kartlarını görebilecek.

- Kullanıcı kendi kartlarında alternatif yoksa PlanTatil topluluk kartlarını veya harita API önerilerini açabilecek.

- Haritada görülen kartlar doğrudan plana eklenebilecek, kartlara kaydedilebilecek veya grup önerisi olarak gönderilebilecek.

- Yoğun şehirlerde harita kümeleme, filtreleme ve “bu bölgede ara” mantığıyla çalışacak.

- Harita ekranı planlı ve plansız gezi deneyimi arasında köprü kuracak.
