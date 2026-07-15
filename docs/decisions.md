# PlanTatil 2.0 - Karar Günlüğü ve Değişiklik Günlüğü (Decision Log)

Bu dosya, projede gerçekleştirilen görüşmeler ve oturumlar sırasında alınan kritik mimari, tasarımsal ve işlevsel kararları, yapılan değişiklikleri ve vazgeçilen özellikleri listeler. Projede görev alan tüm AI ajanları (Architect, Coder, Reviewer vb.) kodlama yapmadan önce bu günlüğü okumak ve buradaki kurallara uymak zorundadır.

## Aktif Kararlar & Yönergeler

| Tarih | İlişkili Modül | Karar / Değişiklik | Durum |
| :--- | :--- | :--- | :--- |
| 2026-07-14 | Genel | Çoklu Ajan (Multi-Agent) geliştirme modeline geçildi. | Aktif |
| 2026-07-14 | Genel | Proje kararlarının dinamik olarak `docs/decisions.md` dosyasına işlenmesi kuralı getirildi. | Aktif |
| 2026-07-14 | Modül 13 | Google Maps kısa linklerinin CORS proxy (AllOrigins) ve regex ile çözülmesi kabul edildi. | Aktif |

## Detaylı Değişiklik Geçmişi

### 14 Temmuz 2026 - Çoklu Ajan ve Dinamik Kriter Mimarisi
- **Karar:** AI geliştiricinin kodlama, denetim, mimari planlama ve UI kontrol görevlerini ayrı uzmanlaşmış ajan rolleri altında yapması kabul edildi.
- **Etki:** `.agents/skills/` altında `architect`, `coder`, `reviewer`, `visual_auditor` ve `decision_logger` skilleri oluşturuldu.
- **İlişkili Dosyalar:**
  - `.agents/AGENTS.md` (Güncellendi)
  - `docs/decisions.md` (Yeni)

### 14 Temmuz 2026 - Modül 6: Plan Kopyalama ve Kişiselleştirme Kararları
- **Karar 1 (Gün Sayısı Eşleştirme & AI):** Gün uyuşmazlığında varsayılan olarak yedek havuzu yöntemi (fazla kartların yedek havuzuna alınması, eksik günlerin boş kalması) uygulanacak. AI desteği (sığdırma/tempo uyarlama vb.) için ileride harici bir API/model entegre edilebilecek şekilde esnek veri yapısı kurulacak.
- **Karar 2 (Akıllı Uyarlama Modları):** Çocuklu aile, hafif tempo vb. uyarlama modları şimdilik arayüz ve mantık düzeyinde kodlanmayacak; ancak veri modelinde (tagler ve mod bayrakları) bu genişlemeye izin verecek altyapı hazırlığı yapılacak.
- **Karar 3 (Kart Güncellemeleri ve Bildirim):** Kopyalanan planlar orijinal plandan bağımsız olacak (yapılan değişiklikler birbirini etkilemeyecek). Ancak planda yer alan gezi kartlarındaki global durum değişiklikleri (tadilat, kapanma vb.) kullanıcıya uyarı/bildirim olarak yansıtılacak.
- **Karar 4 (Görünürlük Seviyeleri):** Plan görünürlüğü için 4 temel seviye tanımlandı: 1) Özel (Sadece ben), 2) Bağlantıyla Görüntüleme (kopyalama kapalı), 3) Bağlantıyla Görüntüleme & Kopyalama, 4) Herkese Açık Şablon.
- **İlişkili Dosyalar:**
  - `docs/06_plan_kopyalama.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 7: Grup Paylaşımı, Roller ve İzinler Kararları
- **Karar 1 (Rol Modeli):** Yetki matrisi 3 temel rol (Sahip, Editör, Katılımcı) ve 1 pasif rol (Link İzleyicisi - sadece görüntüleyen misafir) olarak sınırlandırıldı. Görev bazlı kısıtlayıcı yazılım rolleri yerine sosyal işbirliği modeli benimsendi.
- **Karar 2 (Öneri/Karar Akışı):** Varsayılan olarak "Admin Onaylı Öneri" sistemi uygulanacak. Katılımcıların kart önerileri Sahip veya Editör onayından geçtikten sonra ortak plana yansıyacak.
- **Karar 3 (İşbirliği Özellikleri - Cem'in Fikirleri):** Grup işbirliğini artırmak için şu 3 ek özellik mimariye dahil edildi:
  1. *Canlı Konum Paylaşımı:* Gezi anında haritada grup üyelerinin anlık konum takibi.
  2. *Ortak Not Tahtası/Mesaj Panosu:* Plan içi geziye özel serbest notlar ve mesajlaşma alanı.
  3. *Bütçe ve Görev Dağılımı:* Kart bazlı bütçe sahipliği ve rezervasyon görevlileri atama alanı.
- **İlişkili Dosyalar:**
  - `docs/07_grup_paylasimi.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 8: Ortak Plan Oluşturma ve Görev Paylaşımı Kararları
- **Karar 1 (Görev Kartları Kapsamı):** Görevler yalnızca bağımsız genel görev kartları (yapılacaklar listesi / TO-DO) şeklinde tasarlanacak; gezi kartlarının içi sade ve temiz tutulacak. Bir genel görev tamamlandığında ortaya çıkan konum önerisi, onay mekanizmasıyla plan kartına dönüşebilecek.
- **Karar 2 (Gezi Başladı Kilit Mekanizması):** Gezi başladığı andan itibaren rota otomatik olarak kilitlenecek ve düzenlemeye kapatılacak. Bu aşamada yalnızca canlı konum paylaşımı, navigasyon ve katılımcıların bireysel "Gezildi" işaretlemeleri aktif olacak.
- **İlişkili Dosyalar:**
  - `docs/08_ortak_plan.md` (Güncellenecek)

### 14 Temmuz 2026 - Arayüz, Renkler ve Tema Mimarisi Kararları
- **Karar 1 (Tasarım ve Renk Zamanlaması):** Arayüzün detaylı görsel renk uyarlamaları ve tema cilalamaları projenin son aşamalarına bırakılacak.
- **Karar 2 (Light Mode ve Renk Paleti Altyapısı):** Uygulama varsayılan koyu (dark) görünümünün yanına bir Açık Mod (Light Mode) desteği alacak. Ayrıca son aşamada kullanıcıya sunulmak üzere 4-5 farklı renk paleti (mavi, turuncu, yeşil vb. ana tema renkleri) seçeneği sunulacak.
- **Karar 3 (CSS Değişkenleri Standardı):** Bu hedefleri kolayca gerçekleştirmek için tüm CSS değişkenleri (renkler, arka planlar, kart camı efektleri) [core.css](file:///d:/004_KODLAMA/Planla/src/css/core.css) dosyasında `.light-mode` ve `.theme-orange` gibi CSS sınıflarıyla ezilebilecek şekilde dinamik değişkenlerle (`var()`) kurgulanacak. Böylece son aşamada kod refactoring yapmaya gerek kalmayacak.

### 14 Temmuz 2026 - Modül 13: Haritadan Plana Aktarma ve Global Tekilleştirme Kararları
- **Karar 1 (Haritadan Mekan Verisi Çekme):** Google veya Apple Maps'ten paylaşılan bağlantılardan (Share Link) otomatik olarak: Mekan Adı, Türü (Kategori), Puanı (Rating), Koordinatları (Konum) ve öne çıkan 1-2 anonim/popüler yorum (isim belirtilmeden, en agresif/en beğenilen) çekilecek. Yol tarifi ve detaylar için harici haritaya yönlendiren basit bir link butonu konulacak.
- **Karar 2 (Global Konum Tekilleştirme Mimarisi):** Haritada her benzersiz mekan için tek bir **Global Konum Düğümü (Global Location Node)** tutulacak (Google Place ID veya Koordinat Hash'i ile). Kullanıcılar bu mekanı kopyalayıp kendi planlarına eklediklerinde, aslında bu ortak Global Konum'a referans veren kişisel kart kopyaları oluşturacaklar.
- **Karar 3 (Harita Görünümü & Not Birleştirme):** Haritada onlarca aynı mekan pini yerine tek bir temiz pin gösterilecek. Pine tıklandığında mekanın global bilgileri ile altında o mekana dair plana katılan kişilerin yazdığı farklı kişisel/grup notları (örn: "Cem'in Notu: Biletler alındı", "Ali'nin Notu: Rehberli tur") listelenecek.
- **İlişkili Dosyalar:**
  - `docs/13_haritadan_plana.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 10: Günlük Akış, Süre ve Varış Zamanı Hesaplama Kararları
- **Karar 1 (Sabit Saat / Rezervasyon Kilitleri):** Kullanıcı plan içindeki belirli kritik durakları (müze rezervasyonu, uçuş saati vb.) "Sabit Saatli" olarak kilitleyebilecek. Sistem bu durakların saatlerini sabit tutarak öncesindeki ve sonrasındaki serbest durakların saatlerini geçiş/ziyaret sürelerine göre otomatik hesaplayacak ve çakışma durumunda uyarı verecek.
- **Karar 2 (Çevrimdışı / Fallback Ulaşım Hesabı):** Harita API limitlerinde veya çevrimdışı kullanımda, iki durağın GPS koordinatları arasındaki kuş uçuşu mesafe (Haversine formülüyle) hesaplanacak. Geçiş süreleri ortalama yürüme (4.5 km/s) ve taksi/araç (25 km/s) hız kabulleriyle otomatik tahmin edilecek.
- **Karar 3 (Çok Günlü Görünüm & Kanban):** Çok günlük yönetim ekranı masaüstünde yan yana gün sütunlarından (Kanban tahtası) oluşacak ve kartlar sürükle-bırak ile taşınabilecek. Mobil ekranlarda ise dikey daraltılabilir akordeon gün kartları kullanılacak; kartlar basılı tutularak diğer günün başlığına sürüklenip bırakılabilecek.
- **İlişkili Dosyalar:**
  - `docs/10_gunluk_akis.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 11: Oylamalı Öneri ve Karar Sistemi Kararları
- **Karar 1 (Oylama Süresi ve Kapanma):** Oylamalar varsayılan olarak süresiz olacak. Admin (Sahip/Editör) oylamayı manuel sonlandırana veya gruptaki herkes oyunu kullanana kadar oylama açık kalacak.
- **Karar 2 (Oy Gerekçesi / Neden Notu):** Grup üyeleri oy kullanırken (Evet/Hayır/Kararsız) tercihlerine isteğe bağlı olarak kısa bir "Neden / Gerekçe" notu ekleyebilecekler (Örn: "Hayır, çünkü o gün müze kapalı"). Bu gerekçe oy sayım panelinde görüntülenecek.
- **Karar 3 (Değişiklik Geçmişi ve Undo Stack):** Plana uygulanan değişiklikler için son 10 işlemi hafızada tutan bir "Değişiklik Geçmişi Belleği" (Undo Stack) kurulacak. Admin son 10 değişikliği adım adım geri (Undo) alabilecek.
- **İlişkili Dosyalar:**
  - `docs/11_oylamali_oneri.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 12: Gezi Kartları / Kartlarım Arşivi Kararları
- **Karar 1 (Kütüphane İçi Mükerrer Kontrolü):** Kullanıcının kişisel "Kartlarım" kütüphanesine aynı mekan (Place ID/GPS koordinatıyla) tekrar eklenmek istendiğinde mükerrer kayıt oluşturulmayacak. Sistem kullanıcıya mevcut kartı göstererek, karta yeni bir kişisel not eklemesini veya notunu güncellemesini teklif edecek.
- **Karar 2 (İkon Bazlı Deneyim Durumları):** Kütüphanedeki kartların kişisel deneyim durumları 3 temel ikon üzerinden yönetilecek:
  1. *Kalp İkonu (Heart):* Gitmek istenen ve planlanan yerler (Wishlist / Favoriler).
  2. *Beğeni İkonu (Like/Thumbs-Up):* Gidilen ve beğenilen yerler.
  3. *Beğenmeme İkonu (Dislike/Thumbs-Down):* Gidilen ama memnun kalınmayan yerler.
- **İlişkili Dosyalar:**
  - `docs/12_gezi_kartlari.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 14: Harita Ekranı ve Canlı Keşif Modu Kararları
- **Karar 1 (Haritadan Not Düzenleme):** Haritadaki tekil global pine tıklandığında açılan alt/yan detay panelinde kullanıcı, haritadan ayrılmadan kendi kişisel notunu veya grup notunu anında yazıp güncelleyebilecek (inline-edit desteği).
- **Karar 2 (Keşif Modu Yarıçap Filtresi):** Canlı keşif modunda kullanıcının etrafındaki alternatif mekanları görmek için bir "Yarıçap Kaydırıcı" (Radius Slider: 500m, 1km, 3km) bulunacak. Böylece yürüme veya sürüş mesafesine göre aramalar daraltılabilecek.
- **Karar 3 (Glassmorphism Kümeleme Tasarımı):** Yoğun kart bulunan bölgelerdeki kümelenmeler (marker clustering), varsayılan Google/Apple harita balonları yerine [core.css](file:///d:/004_KODLAMA/Planla/src/css/core.css) gradyan renklerini ve yarı saydam cam efektini (blur/glassmorphism) kullanan şık dairesel yapılardan oluşacak.
- **İlişkili Dosyalar:**
  - `docs/14_harita_ekrani.md` (Güncellenecek)

### 14 Temmuz 2026 - Modül 15: Plan İçi Zaman Çizelgesi ve Harita Deneyimi Kararları
- **Karar 1 (Mobil Arayüz Yerleşimi):** Masaüstünde sol zaman tüneli, sağ harita şeklinde ikiye bölünmüş (Split-Screen) ekran kullanılacak. Mobil cihazlarda ise ekran kısıtından dolayı tam ekran Zaman Çizelgesi listesi gösterilecek; sağ altta yüzen şık bir harita butonuyla (Floating Action Button) tam ekran harita görünümüne geçiş yapılacak.
- **Karar 2 (Konum ve Sapma Yönetimi):** Gizliliği korumak, batarya tüketimini azaltmak ve kullanıcıyı rahatsız etmemek adına sistem arka planda konumu izleyerek "planda olmayan yeni yer önerisi" yapmayacak. Plan dışı sapmaların eklenmesi tamamen kullanıcının manuel kontrolünde kalacak.
- **İlişkili Dosyalar:**
  - `docs/15_zaman_cizelgesi.md` (Güncellenecek)


## Sonraki Oturum Yol Haritası (Kodlama & İnşa Aşaması)

Kullanıcı döndüğünde doğrudan kodlama ve test aşamasına geçilecek olup, sırasıyla şu adımlar uygulanacaktır:

1. **Harita Görünümü Ekranının İnşa Edilmesi:**
   - Haritadan doğrudan kart oluşturma arayüzü kurulacak.
   - "Kartlarım" katmanındaki kartların harita üzerinde şık ve tekil global pinler olarak gösterilmesi sağlanacak.
2. **Kütüphane Yönetim Testleri:**
   - Bize ait olmayan veya dışarıdan gelen kartların tek tıkla kendi kütüphanemize (Kartlarım arşivine) eklenmesi.
3. **Plan ve Rota Düzenleme Testleri:**
   - Yeni gezi planı oluşturma akışı.
   - Plana kart ekleme, kartın yerini/türünü/gününü/saatini zaman çizelgesi üzerinde değiştirme ve otomatik saat hesaplama entegrasyon testleri.








### 14 Temmuz 2026 - Modül 9: İlham Planlarından Kart Aktarma Kararları
- **Karar 1 (Mobil Arayüz):** İki panelli görünüm masaüstünde sol-sağ panel şeklinde yan yana duracak; mobil ekranlarda ise sol panel (kullanıcı planı) tam ekran olacak, sağ panel (ilham kartları) alt çekmece (bottom sheet) olarak açılıp yukarı sürüklenebilecek.
- **Karar 2 (Konum Öneri Algoritması):** Plana yeni bir kart aktarılmak istendiğinde, kartın coğrafi konumu (GPS) ile mevcut rotadaki durakların konumları arasındaki mesafeler hesaplanacak. En yakın duraktan hemen sonrasındaki zaman boşluğu (boş saatler) kontrol edilerek en uygun ekleme noktası kullanıcıya önerilecek.
- **İlişkili Dosyalar:**
  - `docs/09_ilham_planlari.md` (Güncellenecek)

### 14 Temmuz 2026 - Arayüz, Renkler ve Tema Mimarisi Kararları
- **Karar 1 (Tasarım ve Renk Zamanlaması):** Arayüzün detaylı görsel renk uyarlamaları ve tema cilalamaları projenin son aşamalarına bırakılacak.
- **Karar 2 (Light Mode ve Renk Paleti Altyapısı):** Uygulama varsayılan koyu (dark) görünümünün yanına bir Açık Mod (Light Mode) desteği alacak. Ayrıca son aşamada kullanıcıya sunulmak üzere 4-5 farklı renk paleti (mavi, turuncu, yeşil vb. ana tema renkleri) seçeneği sunulacak.
- **Karar 3 (CSS Değişkenleri Standardı):** Bu hedefleri kolayca gerçekleştirmek için tüm CSS değişkenleri (renkler, arka planlar, kart camı efektleri) [core.css](file:///d:/004_KODLAMA/Planla/src/css/core.css) dosyasında `.light-mode` ve `.theme-orange` gibi CSS sınıflarıyla ezilebilecek şekilde dinamik değişkenlerle (`var()`) kurgulanacak. Böylece son aşamada kod refactoring yapmaya gerek kalmayacak.

### 14 Temmuz 2026 - Modül 13: Google Maps Link Çözümleme ve Google Apps Script (GAS) Kararı
- **Karar:** Google Maps kısa linklerinin çözümlenmesinde, genel CORS proxy servislerinin (AllOrigins, corsproxy vb.) Google tarafından bot olarak engellenmesini ve local geliştirme SSL hatalarını engellemek amacıyla **Google Apps Script (GAS)** tabanlı bir yönlendirme takip (redirect-follower) API servisi kullanıldı.
- **Detay:** GAS servisinden dönen uzun URL bilgisi, koordinatlar ve yer adı tespiti için regex desenleriyle taranarak çözümlendi. Uzun koordinatlı linklerde ise hiç ağ isteği yapılmadan istemci tarafında doğrudan regex ile hızlı ayrıştırma yapıldı.
- **İlişkili Dosyalar:**
  - `src/js/locales.js` (Güncellendi)
  - `src/components/map-card-creator.js` (Güncellendi)

### 15 Temmuz 2026 - Modül 13: Google Haritalar Zengin Veri Çekme (Scraping) Entegrasyonu
- **Karar:** Google Maps linkleri çözümlenirken koordinat ve mekan adına ek olarak Puan (Rating), Yorum Sayısı (Reviews) ve Fiyat Seviyesi (Price Level) verilerinin de otomatik olarak çekilmesi kabul edildi.
- **Detay:** Google'ın arayüz güncellemelerine karşı direnci artırmak için kazıma (scraping) regex mantığı tamamen Google Apps Script (GAS) tarafında kurgulandı. Böylece Google'ın HTML yapısı değişirse istemci uygulamasını güncellemeye gerek kalmadan sadece GAS kodu güncellenebilecektir. Ayrıca puan/fiyat okunamasa dahi sistemin kırılmadan enlem/boylam dönmeye devam etmesi (hata toleransı) tasarlandı. Çekilen bu zengin veriler kart oluşturucu formundaki "Notlar/Açıklama" alanına otomatik doldurulacaktır.
- **İlişkili Dosyalar:**
  - `src/components/map-card-creator.js` (Güncellendi)

### 15 Temmuz 2026 - Mobil UX: Akümülatif Süre ve Bütçe Butonları Kararı
- **Karar:** Gezi kartı oluşturma formundaki süre ve bütçe alanlarına, mobilde veri girişini kolaylaştıracak toplanabilir (akümülatif) hızlı seçim butonları eklenmesi kabul edildi.
- **Detay:** Butonlar toggle/multiple-select mantığıyla çalışacak, seçilen rozetlerin değerleri üst üste toplanarak input alanına yazılacaktır. Hiçbir buton seçili değilse başlangıç varsayılan değerleri geçerli olacaktır.
- **İlişkili Dosyalar:**
  - `src/components/map-card-creator.js` (Güncellendi)

### 15 Temmuz 2026 - Mobil UX: Alt Çekmece (Bottom-Sheet) Yerleşim Kararı
- **Karar:** Mobilde haritanın dikeyde sıkışmasını önlemek ve kullanım kolaylığı sağlamak için form alanının "Bottom-Sheet" (Alt Çekmece) yapısına dönüştürülmesi kabul edildi.
- **Detay:** Çekmece iki aşamalı (Collapsed: Kapalı/Minibar ve Expanded: Tam Açık) olarak çalışacaktır. Haritadan konum seçildiğinde veya üstteki tutamaca tıklandığında çekmece yukarı kayarak açılacak; kart plana eklendiğinde veya tutamaca tekrar basıldığında aşağı inecektir.
- **İlişkili Dosyalar:**
  - `src/components/map-card-creator.js` (Güncellendi)

### 15 Temmuz 2026 - Mobil UX: Dikey Akışlı Açılır Form Kararı
- **Karar:** Farklı mobil tarayıcılardaki (iOS Safari vb.) viewport ve klavye uyumsuzlukları nedeniyle "Bottom-Sheet" (Alt Çekmece) tasarımı iptal edildi. Yerine, haritanın dikey akışta üstte sabit kaldığı, formun ise haritanın altında pürüzsüzce (height transition ile) açılıp kapandığı kararlı dikey yerleşim yapısına geçilmesi kabul edildi.
- **İlişkili Dosyalar:**
  - `src/components/map-card-creator.js` (Güncellendi)
