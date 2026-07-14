---
id: plan_kopyalama
title: "Plan Kopyalama ve Kişiselleştirme Sistemi"
status: completed
percentage: 100
dependencies:
  - urun_vizyonu
  - kullanici_tipleri
criteria:
  - "Kopyalama akışının ve parametrelerinin (tarih, kişi sayısı, tempo vb.) belirlenmesi"
  - "Kişiselleştirme işlemlerinin (durak ekleme/silme, saat kaydırma vb.) tanımlanması"
  - "Akıllı uyarlama modlarının (çocuklu aile, lezzet vb.) detaylandırılması"
  - "Plan fork/soy ağacı yapısının kurulması"
  - "Orijinal plan gizlilik ve veri koruma modelinin tasarımı"
---

# 6. Plan Kopyalama ve Kişiselleştirme Sistemi

PlanTatil 2.0’ın temel değer önerilerinden biri, kullanıcıların sıfırdan gezi planı yapmak zorunda kalmadan, daha önce uygulanmış veya topluluk tarafından geliştirilmiş gezi planlarını kendi tatillerine uyarlayabilmesidir.

Klasik gezi planlama sürecinde kullanıcılar blog yazıları, YouTube videoları, sosyal medya gönderileri, Google Maps listeleri ve arkadaş tavsiyeleri arasında dağınık şekilde araştırma yapar. PlanTatil bu süreci sadeleştirir. Kullanıcı, kendisine uygun bir planı bulur, tek dokunuşla kendi hesabına kopyalar ve artık bu plan üzerinde özgürce değişiklik yapabilir.

Kopyalanan plan, orijinal planın birebir aynısı olarak başlar; ancak kopyalama işleminden sonra kullanıcının kişisel planına dönüşür. Kullanıcı isterse durakları silebilir, yeni duraklar ekleyebilir, sıralamayı değiştirebilir, bazı durakları başka güne taşıyabilir veya tüm saatleri topluca ileri/geri kaydırabilir. Böylece hazır plan, kullanıcının kendi tatil tarihine, aile yapısına, temposuna, bütçesine ve ilgi alanlarına göre yeniden şekillenir.

Bu sistemin amacı, kullanıcıya “hazır planı aynen uygula” demek değildir. Amaç, güvenilir bir başlangıç noktası vererek planlama yükünü azaltmak ve kullanıcının bu başlangıç noktasını kendi gerçekliğine göre kolayca uyarlamasını sağlamaktır.

## 6.1. Kopyalanabilir Plan Mantığı

Platformdaki uygun planlarda “Bu planı kendi tatilime kopyala” butonu bulunur. Kullanıcı bu bütona bastığında planın yeni bir kişisel kopyası oluşturulur. Bu kopya, kullanıcının kendi hesabına bağlıdır ve orijinal planı değiştirmez.

Kullanıcı zaten planı ararken ve seçerken kendi bütçe, tempo, çocuk durumu ve ilgi alanlarına göre filtreleme yaptığı için, kopyalama anında tekrar uzun anket formları doldurulmaz. Kopyalama ekranında kullanıcıya yalnızca şu minimal ve kritik parametreler sunulur:

- **Gezi Başlangıç ve Bitiş Tarihleri**: Takvim günlerinin eşleştirilmesi için.
- **Evden Çıkış ve Eve Giriş Saatleri (Giriş/Çıkış Tercihleri)**: Sürüklenebilir slider filtreler ile sabah başlama saati ve akşam otele dönüş saatlerinin belirlenmesi.
- **Gün Sayısı Eşleştirme Tercihi**: Kopyalanan plan ile kullanıcının gezi gün sayısı uyuşmadığında sistem otomatik kırpma veya yapay zeka ile otomatik silme işlemleri yapmaz. Bunun yerine:
  - **Eksik Gün Durumu (Örn: 3 günlük tatile 2 günlük plan kopyalama)**: Kalan 3. gün boş bırakılır. Kullanıcı plan düzenleme ekranında bazı kartları 3. güne taşıyarak planı rahatlatır (tempo hafifletme).
  - **Fazla Gün Durumu (Örn: 3 günlük tatile 4 günlük plan kopyalama)**: 4. gündeki fazla kartlar plana dahil edilmez, doğrudan bir "Yedek/Havuz Kartlar" çekmecesine alınır. Kullanıcı plan ekranına girdiğinde haritadan ve konum yakınlığından yararlanarak bu yedek kartları diğer 3 güne dengeli şekilde kendisi dağıtır.

## 6.2. Kişiselleştirme İşlemleri

Kopyalanan plan üzerinde kullanıcı şu işlemleri yapabilir:

- Durak silme

- Yeni durak ekleme

- Durak sıralamasını değiştirme

- Durakları başka güne taşıma

- Durak saatlerini tek tek değiştirme

- Tüm günü topluca ileri veya geri kaydırma

- Lezzet, alışveriş, çocuk molası veya fotoğraf noktası ekleme

- Planı hafif, orta veya yoğun tempoya göre yeniden düzenleme

- Belirli bir güne alternatif rota oluşturma

- Yağmurlu gün alternatifi oluşturma

- Bazı durakları “opsiyonel” olarak işaretleme

Bu işlemler kullanıcıya özgürlük verirken, planın temel yapısının da korunmasını sağlar. Büyük değişikliklerde sistem kullanıcıyı uyarabilir. Örneğin “Bu değişiklik yürüyüş mesafesini artırabilir” veya “Bu güne çok fazla durak eklendi” gibi bilgilendirmeler yapılabilir.

## 6.3. Akıllı Uyarlama Modları ve AI Altyapısı

PlanTatil 2.0’da hazır planların kullanıcının seçtiği modlara göre akıllı biçimde de uyarlanabilmesi hedeflenmiştir. **İlk aşamada bu uyarlama modları (Çocuklu Aile, Hafif Tempo vb.) aktif bir motor olarak çalıştırılmayacak; ancak veri modelinde (tagler, mod bayrakları) bu genişlemeye izin verecek altyapı hazırlığı yapılacaktır.** İleride harici bir AI/LLM API'si entegrasyonu veya mini bir AI modeli desteğiyle bu akıllı uyarlamaların dinamik olarak yapılması planlanmaktadır.

Örnek uyarlama modları:

- Çocuklu aile modu

- Hafif tempo modu

- Lezzet ağırlıklı mod

- Ekonomik gezi modu

- Müze ağırlıklı mod

- Fotoğraf rotası modu

- Akşam canlı bölgeler modu

- Yağmurlu gün modu

- Kısa rota modu

- Yürüyüşü azalt modu

Örneğin kullanıcı “Çocuklu aile modu” seçtiğinde sistem uzun yürüyüşleri, çok yoğun günleri, sıra bekleme ihtimali yüksek durakları ve çocuklar için yorucu olabilecek bölümleri işaretleyebilecek yapıyı veri modeli düzeyinde (kart etiketleri ve mod eşleşmeleriyle) hazır tutacaktır. Gerekirse bazı durakları opsiyonel hale getirebilecek veya araya mola noktaları eklenmesini önerebilecek altyapı sağlanacaktır.

## 6.4. Plan Soy Ağacı / Fork Sistemi

Bir plan başka bir plandan kopyalandığında, sistem bu ilişkiyi saklar. Böylece her planın hangi orijinal plandan türediği görülebilir.

Örneğin:

“Cem’in Roma Aile Tatili 2026 planı”, “Çocuklu Aile İçin 3 Günlük Roma” planından türetilmiş olabilir.

Bu yapı sayesinde planların zaman içinde nasıl geliştiği izlenebilir. Kullanıcılar aynı orijinal plandan türemiş farklı versiyonları görebilir. Örneğin biri planı çocuklu aileye göre hafifletmiş, biri lezzet odaklı hale getirmiş, biri de yürüyüşü azaltacak şekilde düzenlemiş olabilir.

Plan soy ağacı sistemi uzun vadede platform için çok değerli bir bilgi ağı oluşturur. En çok kopyalanan, en çok tamamlanan, en çok beğenilen ve en çok kişiselleştirilen planlar öne çıkarılabilir.

## 6.5. Orijinal Plan Koruma İlkesi

Kopyalanan plan üzerinde yapılan hiçbir değişiklik orijinal planı bozmaz. Orijinal plan, onu yayınlayan kullanıcının veya içerik üreticisinin kontrolünde kalır.

Bu ilke çok önemlidir. Çünkü kullanıcılar başkalarının planlarını gönül rahatlığıyla kopyalayabilmeli, üzerinde denemeler yapabilmeli ve hata yapmaktan korkmamalıdır.

Kişisel kopya üzerinde yapılan değişiklikler sadece o kullanıcıya veya onun gezi grubuna aittir. Kullanıcı isterse kendi versiyonunu daha sonra herkese açık hale getirebilir. Bu durumda yeni plan, orijinal planın yeni bir türevi olarak platformda yer alır.

## 6.6. Örnek Kullanıcı Akışı

- Kullanıcı "Çocuklu aileler için Roma" araması yaparak zaten kendi tarzına uygun planları listeler.
- Beğendiği "Roma'da 3 Gün" planını açar ve "Bu planı kendi tatilime kopyala" butonuna basar.
- Modal ekranda kendi gezi tarihlerini girer ve sabah çıkış saatini slider ile 10:00 olarak ayarlar.
- Gezi gün sayısı kopyalanan planla tam eşleştiği için sistem doğrudan planı kopyalar. (Eğer kullanıcı 2 günlük plan kopyalasaydı 3. günü boş bırakacak, 4 günlük plan kopyalasaydı 4. günün kartlarını yedek havuzuna alacaktı).
- Kullanıcı kişisel plan ekranında sabah saati 10:00 seçildiği için otomatik ileri kayan saatleri inceler.
- Harita üzerinden konum yakınlığına bakarak yedek havuzundan veya kişisel arşivinden yeni dondurma ve kahve kartlarını plana ekler.
- Planı ailesiyle kısa link üzerinden paylaşarak katılımcı rolündeki grup üyelerinden öneriler toplar.
- Plan sahibi önerileri onaylayarak son rotayı oluşturur.

## 6.7. Ürün Değeri

Plan kopyalama ve kişiselleştirme sistemi, PlanTatil 2.0’ın klasik gezi planlama araçlarından ayrıldığı ana noktadır. Kullanıcıya boş bir ekran sunmak yerine, daha önce denenmiş bir planı başlangıç noktası olarak verir. Böylece planlama süreci hızlanır, araştırma yükü azalır ve kullanıcı kendi tatiline daha güvenli hazırlanır.

Bu sistem sayesinde PlanTatil yalnızca “plan oluşturma aracı” değil, gerçek gezgin deneyimlerinden çoğalan ve her kullanıcıyla yeniden şekillenen yaşayan bir gezi planı platformu haline gelir.

## 6.8. Plan Gizliliği, Paylaşım ve Orijinal Plandan Bağımsızlık

PlanTatil 2.0’da oluşturulan veya başka bir plandan kopyalanan hiçbir plan varsayılan olarak herkese açık yayınlanmaz. Kullanıcının kişisel gezi planı özel kabul edilir. 

Plan sahibi kendi planını paylaşırken **4 temel görünürlük seviyesinden** birini seçebilir:
1. **Özel (Sadece ben):** Plana sadece sahibi erişebilir.
2. **Bağlantıya Sahip Olanlar (Sadece görüntüleyebilir):** Paylaşılan linke sahip olanlar planı açıp inceleyebilir ancak kendi hesaplarına kopyalayamazlar.
3. **Bağlantıya Sahip Olanlar (Görüntüleyebilir ve Kopyalayabilir):** Paylaşılan linke sahip olanlar planı açıp tek dokunuşla kendi hesaplarına kopyalayabilirler.
4. **Herkese Açık Şablon:** Plan, platform genelinde listelenir, aramalarda çıkar ve herkes tarafından kopyalanıp kullanılabilir.

Bir plan başka bir plandan türetilmiş olsa bile, kopyalama işleminden sonra **tamamen bağımsız** bir kullanıcı planına dönüşür. Kopyalanan plan, orijinal planın canlı ve zorunlu bağlı bir kopyası değildir. Orijinal plan sahibi kendi planını değiştirse, silse veya gizlese bile kopyalanan planlar bozulmaz. 

Ancak, planda yer alan gezi kartlarının (konumların) kendisinde oluşan global değişiklikler takip edilir:
- **Kart Değişiklik Uyarısı:** Eğer plandaki bir gezi kartı (nokta) global veritabanında "tadilat nedeniyle kapalı", "kalıcı kapandı" veya "çalışma saatleri değişti" şeklinde güncellenirse, bu kartı kullanan bağımsız plan sahiplerine plan ekranında bir uyarı bildirimi gösterilir ("Planınızda yer alan Kolezyum durağı şu tarihler arasında restorasyon nedeniyle kapalıdır"). Böylece kullanıcı planın güncelliğini koruyabilir.

Bu yapı sayesinde PlanTatil 2.0, hem kullanıcı mahremiyetini hem de topluluk içinde planların çoğalmasını dengeli biçimde yönetir. Kullanıcılar başkalarının planlarından güvenle ilham alabilir, kendi kopyalarını oluşturabilir ve isterlerse kendi versiyonlarını yeni bir plan olarak paylaşabilir.
