---
id: zaman_cizelgesi
title: "Plan İçi Zaman Çizelgesi ve Harita Deneyimi"
status: completed
percentage: 100
dependencies:
  - gunluk_akis
  - harita_ekrani
criteria:
  - "Zaman çizelgesi (timeline) ve harita ekranının iki yönlü senkronizasyonu"
  - "Kompakt ve detaylı kart görünümleri arası geçiş kuralları"
  - "Canlı gezi modu arayüzü ve 'sıradaki durak' yönlendirmesi"
  - "Gezi anında grup üyelerinin harita üzerindeki anlık konum takibi"
  - "Hızlı not alma, fotoğraf yükleme ve sapma (plan dışı duraklar) yönetimi"
---

# 15. Plan İçi Zaman Çizelgesi ve Harita Deneyimi

PlanTatil 2.0’da bir gezi planı iki ana görünüm üzerinden kullanılmalıdır: zaman çizelgesi görünümü ve harita görünümü.

Zaman çizelgesi görünümü, kullanıcının “bugün sırada ne var?” sorusuna cevap verir. Harita görünümü ise “duraklar birbirine göre nerede, nasıl ilerleyeceğiz?” sorusuna cevap verir.

Bu iki görünüm birbirinin alternatifi değil, tamamlayıcısıdır. Kullanıcı gezi öncesinde planı düzenlerken iki görünüm arasında geçiş yapabilir. Gezi sırasında ise zaman çizelgesi sıradaki adımı, harita ise konum ve yön bilgisini sağlar.

## 15.1. Zaman Çizelgesi Görünümü

Zaman çizelgesi, planın gün gün ve saat saat takip edildiği ana ekrandır. Özellikle gezi sırasında kullanıcıya basit, okunabilir ve hızlı karar verdiren bir yapı sunmalıdır.

Zaman çizelgesinde her gün ayrı bir akış olarak gösterilir. Her kart ilgili güne, saate ve sıraya göre dizilir.

Her durak kartında şu bilgiler bulunabilir:

- Saat

- Durak adı

- Kart türü

- Tahmini ziyaret süresi

- Kısa açıklama

- Adres veya bölge bilgisi

- Bilet / rezervasyon notu

- Harita / navigasyon butonu

- Geldim / gördüm / denedim işaretleri

- Kişisel not

- Grup önerileri

- Alternatif kartlar

- Öncelik durumu

- Opsiyonel olup olmadığı

Bu görünüm gezi sırasında gereksiz detaylarla kalabalıklaşmamalıdır. Kullanıcı hızlıca sıradaki durağı, varış saatini, yapılacak işi ve navigasyon butonunu görebilmelidir.

## 15.2. Kompakt ve Detaylı Kart Mantığı

Zaman çizelgesi görünümünde kartlar varsayılan olarak kompakt görünebilir. Kompakt kartta yalnızca en kritik bilgiler yer alır:

- Saat

- Durak adı

- Kısa tür bilgisi

- Navigasyon butonu

- Geldim / gördüm / denedim butonu

- Durak süresi veya tahmini bitiş saati

Kullanıcı karta dokunduğunda detay alanı açılır. Detayda açıklama, adres, bilet notu, rezervasyon bilgisi, lezzet önerileri, grup yorumları, alternatif kartlar ve kişisel notlar görünür.

Bu yapı mobil kullanım için önemlidir. Gezi sırasında kullanıcı telefon ekranında uzun metinlerle boğulmamalıdır. Sıradaki adımı hızlıca görmeli, gerekirse detaya inmelidir.

## 15.3. Harita Görünümü ve Mobil Yüzen Buton (FAB) Yapısı

Plan içi harita görünümü, seçili günün veya tüm planın duraklarını harita üzerinde gösterir. Duraklar haritada zaman çizelgesindeki sıralarına göre numaralı pinlerle gösterilir.

**Mobil Arayüz Geçiş Mantığı (Full-Screen Toggle):**
- Mobil cihazların küçük ekranlarında harita ve zaman çizelgesi bölünmüş olarak gösterilmez (okunabilirliği korumak için).
- Zaman Çizelgesi ekranı tam ekran olarak açılır. Ekranın sağ alt köşesinde dairesel, buzlu cam (glassmorphism) efektli ve harita ikonlu şık bir **Yüzen Harita Butonu (FAB)** konumlandırılır.
- Kullanıcı bu butona bastığında, zaman çizelgesi akıcı bir geçişle kaybolur ve tam ekran Harita Görünümü açılır. Harita görünümünde aynı buton bu kez "Liste" ikonuna dönüşür ve tıklandığında tam ekran zaman çizelgesine geri döner.

Harita görünümünde şu bilgiler bulunabilir:
- Numaralı duraklar
- Gün rengine göre pinler
- Rota çizgisi (duraklar arası bağlantı yolları)
- Aktif konum (GPS ile mavi nokta)
- Sıradaki durak bilgisi
- Navigasyon açma butonu

Bu görünüm, kullanıcının planın coğrafi mantığını anlamasını sağlar ve gereksiz zaman kayıplarının önüne geçer.

## 15.4. Zaman Çizelgesi ve Harita Senkronizasyonu

Zaman çizelgesi ve harita birbirine bağlı çalışmalıdır.

Kullanıcı zaman çizelgesinde bir karta dokunduğunda, haritada ilgili pin vurgulanmalıdır. Kullanıcı haritada bir pine dokunduğunda ise zaman çizelgesindeki ilgili kart açılmalıdır.

Bu senkronizasyon, plan düzenleme sırasında çok önemlidir. Kullanıcı bir durağın yerini haritada görür, sonra zaman çizelgesinde sırasını değiştirebilir. Ya da zaman çizelgesindeki yoğunluğu fark eder, haritada yakın alternatiflere bakabilir.

Örnek etkileşimler:

- Zaman çizelgesinde “Pantheon” kartına dokunulur, haritada Pantheon pini büyür.

- Haritada “Giolitti” kartına dokunulur, zaman çizelgesinde ilgili öneri kartı açılır.

- Kullanıcı haritada bir kartı seçer ve “Gün 1’e ekle” der.

- Sistem kartı zaman çizelgesinde en uygun yere yerleştirmeyi önerir.

## 15.5. Canlı Gezi Modu

Canlı Gezi Modu, kullanıcının gezi sırasında uygulamayı takip ekranı gibi kullanmasını sağlar.

Bu modda uygulama, kullanıcının o anki gününe ve konumuna göre en önemli bilgileri öne çıkarır.

Canlı Gezi Modu’nda gösterilebilecek bilgiler:

- Bugünün planı

- Sıradaki durak

- Sıradaki durağa uzaklık

- Tahmini varış süresi

- Navigasyon butonu

- Durak için kısa not

- Bilet / rezervasyon uyarısı

- Geldim / gördüm / denedim butonu

- Grup ilerleme durumu

- Hızlı not alma

- Yakındaki alternatifler

- Planın gerisinde veya ilerisinde olma durumu

Örneğin kullanıcı plan saatinin gerisinde kaldıysa sistem şöyle uyarabilir:

“Bugünkü planın yaklaşık 45 dakika gerisindesiniz. İsterseniz Piazza Navona durağını opsiyonel yapabilir veya akşam yemeği saatini ileri alabilirsiniz.”

Bu uyarılar kullanıcıyı zorlamamalı, sadece karar desteği vermelidir.

## 15.6. Sıradaki Durak Mantığı

Canlı Gezi Modu’nun merkezinde “sıradaki durak” bulunur.

Sistem sıradaki durağı şu bilgilere göre belirleyebilir:

- Günün saat akışı

- Kullanıcının geldi/gördü işaretleri

- Kullanıcının mevcut konumu

- Atlanan veya opsiyonel yapılan duraklar

- Grup kararları

- Rezervasyon saatleri

Örneğin kullanıcı Colosseum’u “gördüm” olarak işaretlediyse sistem sıradaki kart olarak Roman Forum’u öne çıkarır. Kullanıcı Roman Forum’u atladıysa sistem öğle molasını sıradaki durak olarak gösterebilir.

Sıradaki durak kartı her zaman kolay erişilebilir olmalıdır. Mobilde ekranın üstünde veya altında sabit küçük bir alan olarak gösterilebilir.

## 15.7. Grup İlerlemesi

Grup planlarında her kullanıcı kendi cihazında işaretleme yapabilir. Bu işaretlemeler plan ayarlarına göre kişisel kalabilir veya grup ilerlemesi olarak gösterilebilir.

Örnek grup ilerleme seçenekleri:

- Sadece kendi işaretlerim görünsün

- Grup ilerlemesi anonim görünsün

- Herkes herkesin durumunu görsün

Grup ilerlemesi özellikle kalabalık seyahatlerde işe yarar. Örneğin bir aile grubunda bazı kişiler müzeye girmiş, bazıları kafede bekliyor olabilir. Uygulama herkesin nerede olduğunu canlı takip etmek zorunda değildir; ancak kart bazlı “geldim / gördüm / bekliyorum / denedim” gibi hafif durum bilgileri verebilir.

Örnek durumlar:

- Geldim

- Gördüm

- Denedim

- Bekliyorum

- Pas geçtim

- Sonra bakalım

- Beğendim

- Beğenmedim

Bu bilgiler hem gezi sırasında koordinasyon sağlar hem de gezi sonrasında deneyim verisine dönüşür.

## 15.8. Hızlı Not Alma

Gezi sırasında kullanıcı uzun yorum yazmak istemeyebilir. Bu yüzden hızlı not alma sistemi olmalıdır.

Örnek hızlı notlar:

- Çok kalabalık

- Çocukla zor

- Beklediğimize değdi

- Tekrar gelinir

- Pahalı

- Kapalıydı

- Rezervasyon şart

- Fotoğraf için güzel

- Temiz tuvalet var

- Dinlenmek için iyi

- Yemek iyi değildi

- Tatlı çok iyi

Kullanıcı isterse bu hızlı notlara kısa açıklama ekleyebilir. Gezi sonunda sistem bu notları toparlayarak kullanıcıya deneyim özeti hazırlatabilir.

## 15.9. Alternatifli Plan Senaryoları

PlanTatil’de tek bir plan akışı olmak zorunda değildir. Bazı günler için alternatif senaryolar hazırlanabilir.

Örnek alternatifler:

- Güneşli hava planı

- Yağmurlu hava planı

- Çocuklar yorulursa kısa rota

- Daha ekonomik rota

- Müze ağırlıklı rota

- Lezzet ağırlıklı rota

- Akşam canlı bölge rotası

- Yürüyüşü azaltılmış rota

Bu alternatifler plan sahibi tarafından elle hazırlanabilir veya sistem tarafından önerilebilir.

Örneğin Roma Gün 1 için ana plan Colosseum, Forum, Pantheon, Trevi şeklinde olabilir. Ancak çocuklar yorulursa Forum durağı opsiyonel yapılır, araya kahve/dondurma molası eklenir ve gün daha kısa bir rotaya dönüşür.

Alternatifli plan sistemi, gezi sırasında gerçek hayatın değişkenliğine uyum sağlar. Çünkü planlar her zaman birebir uygulanmaz; hava, yorgunluk, kalabalık, kapalı mekanlar, çocukların durumu veya grup kararları planı değiştirebilir.

## 15.10. Plan Dışı Sapmalar ve Gizlilik Odaklı Yönetim

Kullanıcı gezi sırasında plana sadık kalmayıp farklı rotalara sapabilir. Bu durum bir hata olarak kabul edilmez ve sistem kullanıcıyı planda kalmaya zorlamaz.

**Gizlilik ve Batarya Odaklı Manuel Yönetim:**
- **Arka Plan Takibi Yapılmaz:** Kullanıcının gizlilik haklarını korumak, batarya tüketimini en aza indirmek ve gereksiz bildirim kirliliğini (spam) önlemek amacıyla sistem arka planda GPS konumunu sürekli izleyerek *"Plan dışı bir yerdesiniz, plana ekleyelim mi?"* gibi otomatik uyarılar göndermez.
- **Manuel Kontrol:** Plan dışı sapmaların plana veya kütüphaneye dahil edilmesi tamamen kullanıcının manuel kontrolündedir. Kullanıcı dilediğinde harita ekranı veya zaman çizelgesi üzerinden yeni bir mekanı plana ekleyebilir veya o günkü rotayı manuel olarak yeniden optimize edebilir.

Kullanıcı plan dışına çıktığında sistem şu kolaylaştırıcı manuel seçenekleri sunar:
- Bulunduğu yeni konuma göre yakın kartları gösterme.
- Bugünkü planı manuel olarak yeniden düzenleme.
- Atlanan veya gidilemeyen durakları "Opsiyonel" veya "Pas Geçildi" olarak işaretleme.
- Rota zamanlamasını kalan zamana göre manuel kaydırma.
- Bu sapmayı kişisel bir gezi notu olarak kaydetme.

Bu yaklaşım, PlanTatil’i baskıcı bir asistan olmaktan çıkarıp kullanıcının özgürlüğüne saygı duyan, esnek ve pratik bir karar destek aracına dönüştürür.

## 15.11. Ürün Değeri

Plan içi zaman çizelgesi ve harita deneyimi, PlanTatil’in gezi sırasında gerçekten kullanılabilir olmasını sağlar.

Kullanıcı planı yalnızca gezi öncesinde hazırlamaz; gezi sırasında da aktif olarak kullanır. Zaman çizelgesi sıradaki adımı gösterir. Harita durakların konum ilişkisini anlatır. Canlı Gezi Modu gecikmeleri, alternatifleri ve grup işaretlerini yönetir. Hızlı notlar ise gezi sonrasında topluluk deneyimine dönüşür.

Bu bölümün temel vaadi şudur:

“PlanTatil, gezi planını kağıt üzerindeki bir liste olarak bırakmaz. Planı gezi sırasında takip edilebilir, değiştirilebilir ve deneyimle zenginleşen canlı bir akışa dönüştürür.”

## Karar Özeti

- Plan içinde iki ana görünüm olacak: zaman çizelgesi ve harita.

- Zaman çizelgesi “sıradaki adım ne?” sorusuna cevap verecek.

- Harita görünümü durakların mekansal ilişkisini ve rota çizgisini gösterecek.

- Zaman çizelgesi ve harita senkronize çalışacak.

- Canlı Gezi Modu sıradaki durak, navigasyon, grup ilerlemesi ve hızlı not alma özelliklerini içerecek.

- Sıradaki durak; saat, konum, işaretleme ve plan durumuna göre belirlenecek.

- Grup üyeleri kendi geldi/gördü/denedi işaretlerini yapabilecek.

- Grup ilerlemesi plan ayarlarına göre kişisel, anonim veya açık gösterilebilecek.

- Hızlı notlar gezi sırasında kolay deneyim kaydı sağlayacak.

- Alternatifli planlar desteklenecek: güneşli hava, yağmur, çocuklar yorulursa kısa rota vb.

- Kullanıcı plan dışına çıktığında sistem bunu hata olarak görmeyecek; yeni duruma göre destek sunacak.
