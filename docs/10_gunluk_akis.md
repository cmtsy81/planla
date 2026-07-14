---
id: gunluk_akis
title: "Günlük Akış, Süre ve Varış Zamanı Hesaplama"
status: completed
percentage: 100
dependencies:
  - plan_kopyalama
  - gezi_kartlari
criteria:
  - "Kart türlerine göre varsayılan ziyaret sürelerinin tanımlanması"
  - "Kartlar arası mesafe ve geçiş sürelerinin (yürüyüş, taksi, toplu taşıma) tespiti"
  - "Zaman çizelgesinde ardışık saatlerin ve tahmini varış sürelerinin otomatik hesaplanması"
  - "Gün yoğunluğu, yorgunluk ve çakışma uyarı kurallarının belirlenmesi"
  - "Çok günlük plan yönetim paneli tasarımı"
---

# 10. Günlük Akış, Süre ve Varış Zamanı Hesaplama

PlanTatil 2.0’da gezi planı yalnızca durakların alt alta dizildiği bir liste olmamalıdır. Kullanıcı, bir günü planladığında sistem bu günün zaman açısından uygulanabilir olup olmadığını da göstermelidir.

Her plan kartının standart veya kullanıcı tarafından düzenlenebilir bir ziyaret süresi bulunur. Örneğin bir müze kartı için 90 dakika, bir meydan kartı için 25 dakika, bir kahve molası için 35 dakika, bir öğle yemeği için 75 dakika gibi başlangıç süreleri tanımlanabilir. Kullanıcı bu süreleri kendi planına göre değiştirebilir.

İki kart arasındaki geçiş süresi de planın önemli bir parçasıdır. Sistem, kartların konumlarını kullanarak iki durak arasındaki tahmini ulaşım süresini hesaplamalıdır. Bu hesaplama mümkün olduğunda harita servislerinden güncel olarak alınabilir. Ancak sık kullanılan durak çiftleri veya daha önce hesaplanmış geçişler için sistem önbellek ya da geçmiş öğrenmelerden yararlanarak hızlı sonuç verebilir.

## 10.1. Otomatik Gün Akışı ve Sabit Saat Kilitleri

Bir kullanıcı bir güne kartlar eklediğinde sistem şu hesaplamayı yapar:
- İlk kartın başlangıç saati
- Kartın tahmini ziyaret süresi
- Sonraki karta geçiş süresi
- Sonraki kartın tahmini başlangıç saati
- Günün toplam süresi
- Toplam yürüyüş/ulaşım süresi
- Boşluklar veya sıkışmalar

**Sabit Saat (Appointment Lock) Desteği:**
Kullanıcı plan içindeki belirli kritik durakları (örneğin müze rezervasyon saati, uçak/tren saati veya akşam yemeği rezervasyonu) **"Sabit Saatli"** olarak işaretleyip kilitleyebilir. 
- Sabit saatli durakların saati kullanıcı değiştirene kadar kilitli kalır.
- Sistem, kilitli durağın öncesindeki ve sonrasındaki serbest durakların saatlerini (ziyaret ve geçiş sürelerini geriye/ileriye doğru hesaba katarak) otomatik hesaplar.
- Eğer serbest durakların toplam süresi kilitli durağın saatini aşıyor veya çakışıyorsa, sistem bunu otomatik olarak ezmez; kullanıcıya görsel bir uyarı verir ("Pantheon gezisi, 14:00'teki kilitli Colosseum rezervasyonunuzla çakışıyor").

Örnek Akış:
- 09:00 Otelden çıkış
- 09:30 Colosseum’a varış
- **10:00 Colosseum Ziyareti (KİLİTLİ SAAT - Rezervasyon)**
- 11:30 Roman Forum’a geçiş
- 13:00 Öğle molası

Bu yapı sayesinde kullanıcı hem esnek bir zaman planı yapar hem de kaçırılmaması gereken randevularını güvenceye alır.

## 10.2. Standart Süreler

Sistem her kart türü için varsayılan süreler önerebilir.

Örnek:

- Meydan: 20-30 dakika

- Müze: 60-120 dakika

- Ören yeri: 90-180 dakika

- Kahve molası: 25-40 dakika

- Öğle yemeği: 60-90 dakika

- Akşam yemeği: 90-120 dakika

- Alışveriş: 45-90 dakika

- Fotoğraf noktası: 15-25 dakika

- Çocuk molası: 20-45 dakika

Bu süreler sabit zorunluluklar değildir. Kullanıcı isterse her kartın süresini değiştirebilir. Ayrıca platform, kullanıcı deneyimlerinden öğrenerek belirli kartlar için daha gerçekçi süre önerileri oluşturabilir.

## 10.3. Geçiş Süreleri ve Çevrimdışı/Fallback Hesaplama

İki kart arasındaki geçiş süresi planın uygulanabilirliğini doğrudan etkiler. Bu nedenle sistem mümkün olduğunda yürüyüş, toplu taşıma, taksi/araç veya bisiklet gibi ulaşım türlerine göre geçiş süresi gösterebilmelidir.

**Çevrimdışı / API Fallback Hesaplaması:**
Cihazın çevrimdışı olduğu durumlarda veya harita API sınırlarına ulaşıldığında, geçiş sürelerinin hesaplanabilmesi için sistemde yerel bir yedek formül çalışır:
1. İki durağın GPS koordinatları (Latitude, Longitude) arasındaki mesafe, **Haversine Formülü** kullanılarak kuş uçuşu (Great-Circle Distance) olarak hesaplanır.
2. Kuş uçuşu mesafeyi gerçek yol kıvrımlarına uyarlamak için **1.3 katsayısı** ile çarpılarak tahmini kara yolu mesafesi bulunur.
3. Bulunan mesafe, seçilen ulaşım moduna göre varsayılan ortalama hızlara bölünerek geçiş süresi tahmin edilir:
   - **Yürüyüş (Walking):** Ortalama 4.5 km/saat hız kabul edilir.
   - **Taksi/Araç (Driving):** Şehir içi trafik ortalaması göz önüne alınarak 25 km/saat hız kabul edilir.
   - **Toplu Taşıma:** Kuş uçuşu mesafe tabanlı hesaplanamaz, bu durumda varsayılan 20 dakika transit süresi atanır.

Örnek:
Pantheon → Piazza Navona (Yürüyüş)
- Harita API ile: 7 dakika
- Çevrimdışı/Fallback ile (Mesafe ~500m): 7 dakika (Kuş uçuşu * katsayı / hız formülüyle).

Kullanıcı tercih ettiği ulaşım modunu seçebilir. Aile ve çocuklu planlarda sistem uzun yürüyüşleri uyarı olarak gösterebilir.

## 10.4. Zaman Çakışmaları ve Yoğunluk Yönetimi

Zaman tünelinde ardışık saat hesaplamasında bir çakışma (örn: Colosseum rezervasyon saatinin kaçırılması) veya yoğunluk oluştuğunda sistem kullanıcının arkasından saatleri otomatik değiştirmez. Düzeltmeyi kullanıcıya bırakırken şu iki özgün UX çözümünü kullanır:

1. **Üst Üste Binen Zaman Çubukları (Overlapping Time Bars)**:
   - Kartlar dikey zaman tünelinde görsel olarak eşit boyutta listelense de (okunabilirlik için), planın üst veya alt kısmında günün zaman akışını gösteren yatay bir grafik barı bulunur.
   - Bu barda her durak kendi süresine göre (örn: müze 2 saat, dondurmacı 15 dk) yatay bir blok olarak temsil edilir.
   - Zaman çakışması olan durakların çubukları bu grafik üzerinde **üst üste binerek (overlap)** çakışmayı ve yoğunluğu son derece sezgisel, görsel bir şekilde kullanıcıya sunar.

2. **Canlı Gezi Anı Uyarıları (Real-time Check-out Alerts)**:
   - Plan aktif hale gelip gezi başladığında sistem kullanıcının zaman bütçesini korumasına yardım eder.
   - Örneğin 14:00 - 16:00 arası planlanan bir müze durağında saat 15:45 veya 15:50 olduğunda ve kullanıcı durağı hala "Gezildi" olarak işaretlemediyse, telefona akıllı bir bildirim veya arayüze alert düşer:
     *"Rehberli Müze Gezisi görevinizin bitmesine 10 dakika kaldı. Plandan sapmamak için toparlanabilirsiniz."*
   - Bu durum gezginlerin zamanı verimli kullanmasını sağlar.

## 10.5. Çok Günlü Genel Plan Görünümü (Kanban & Akordeon Arayüzü)

Kullanıcı birden fazla günlük plan yapıyorsa, tüm günleri aynı ekranda görerek dengeli bir dağılım yapabilmelidir. Bu ekran, planın son düzenleme ve optimizasyon merkezi gibi çalışır.

**Masaüstü Arayüzü (Sütunlu Kanban Yapısı):**
- Günler yan yana dikey sütunlar halinde gösterilir (Trello/Kanban kart düzeni gibi).
- Kullanıcı gezi kartlarını günler (sütunlar) arasında fareyle sürükleyip bırakarak (drag-and-drop) kolayca taşıyabilir.
- Her sütunun altında o günün toplam süresi, tahmini yürüyüş mesafesi ve yoğunluk durumu anlık olarak güncellenir.

**Mobil Arayüzü (Daraltılabilir Akordeon Paneller):**
- Ekran dar olduğundan günler alt alta daraltılabilir (accordion) paneller şeklinde listelenir.
- Her günün başlığında o günün özeti (Örn: *"1. Gün - 4 Durak - 305 dk"*) yazar.
- Kullanıcı bir kartı başka güne taşımak için karta basılı tutar (long-press), kart yarı saydam hale gelir ve sürükleyerek taşımak istediği günün başlığına veya açılmış panel alanına bırakır.
- Kartların sağındaki menüden de hızlıca *"Başka Güne Taşı... > 2. Gün"* seçeneği sunularak sürükle-bırak yapmak istemeyen kullanıcılara alternatif sağlanır.

Örnek kullanım senaryosu:
- Gün 1 çok yoğun, Gün 3 boş göründüğünde kullanıcı Pantheon'u sürükleyip Gün 1'den Gün 2'ye bırakır.
- Vatikan günü tek başına bırakılarak tempo dengelenir.
- Alışveriş akşamı son güne kolayca kaydırılır.

Bu responsive yapı, kullanıcının büyük planları küçük ekranlarda dahi yorulmadan organize etmesini sağlar.

## Karar Özeti

1. Kartların varsayılan ziyaret süreleri olacak (Müze 2 saat, Dondurma 15 dk vb.) ancak kullanıcı bunları değiştirebilecek.
2. İki durak arası geçiş süreleri harita servislerinden çekilecek veya tahmini önbellekten hesaplanacak.
3. Zaman tünelindeki saatler sıralı olarak otomatik hesaplanacak, ancak çakışmalarda otomatik kaydırma yapılmayacak.
4. Çakışan veya üst üste binen zamanlar, planın altında yer alan yatay zaman grafik barlarının üst üste binmesi (overlapping bars) ile görselleştirilecek.
5. Gezi anında, bir durağın planlanan bitiş süresine 10 dakika kala durak hala "Gezildi" olarak işaretlenmediyse kullanıcıya "Müze görevinin bitmesine 10 dakika kaldı" uyarısı gönderilecek.
6. Gün çok yoğun, uzun yürüyüşlü veya çocuklu aile için yorucuysa karar desteği için görsel uyarılar verilecek.
7. Çok günlük genel görünümde günler sütunlar halinde gösterilecek; kullanıcı kartları günler arasında sürükle-bırak ile taşıyarak planı rahatlatabilecek.
