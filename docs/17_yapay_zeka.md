---
id: yapay_zeka
title: "Yapay Zeka Kullanım Alanları"
status: planned
percentage: 5
dependencies:
  - gunluk_akis
  - plan_dnasi
criteria:
  - "Plana ait gün yoğunluğu ve zaman çakışması analiz motoru"
  - "Boş zaman aralıklarına uygun mekan/aktivite önerme mantığı"
  - "Uzun yorumlardan ve incelemelerden özet deneyim çıkarma sistemi"
  - "Hava durumu, yorgunluk ve sapmalara göre alternatif rota oluşturma yapısı"
  - "Harita ve konum paylaşım linklerinden veri anlamlandırma"
---

# 17. Yapay Zeka Kullanım Alanları

PlanTatil 2.0’da yapay zeka, ürünün merkezinde sürekli öne çıkarılan ayrı bir gösteri özelliği olarak değil; kullanıcının kararlarını kolaylaştıran, planlama yükünü azaltan ve dağınık bilgiyi uygulanabilir önerilere dönüştüren arka plan yardımcısı olarak konumlandırılmalıdır.

Kullanıcı gezi planı yaparken çoğu zaman çok fazla bilgiyle karşılaşır. Hangi plan daha uygun, hangi durak fazla, hangi gün çok yorucu, hangi restoran çocukla uygun, yağmur yağarsa ne yapılır, bu kadar durak bir güne sığar mı gibi kararlar kullanıcının zihnini yorar. Yapay zeka bu noktada devreye girerek planı analiz eder, sade öneriler sunar ve gerektiğinde kullanıcıya alternatif senaryolar üretir.

Bu sistemin temel ilkesi şudur:

Yapay zeka planı kullanıcının yerine yönetmez; kullanıcıya daha iyi karar vermesi için yardımcı olur.

## 17.1. Planı Kişiye Göre Uyarlama

Yapay zekanın en önemli kullanım alanlarından biri, hazır bir planı kullanıcının ihtiyaçlarına göre uyarlamaktır.

Kullanıcı bir planı kopyaladıktan sonra şu tarz istekler yazabilir:

- Bu planı çocuklu aileye göre düzenle.

- Yürüyüşü azalt.

- Sabah geç başlayacak şekilde ayarla.

- Daha ekonomik restoranlar öner.

- Müze sayısını azalt.

- Lezzet duraklarını artır.

- Planı 8 saatten 5 saate indir.

- Yaşlılarla gidilecek şekilde hafiflet.

- Fotoğraf noktalarını öne çıkar.

- Alışveriş için daha fazla boşluk bırak.

Yapay zeka bu istekleri planın günleri, kartları, süreleri, konumları ve Plan DNA’sı ile birlikte değerlendirir. Kullanıcıya doğrudan değişiklik yapmak yerine önce öneri sunabilir.

Örnek:

“Bu plan çocuklu aile için biraz yoğun görünüyor. Roman Forum durağını opsiyonel yapabilir, Pantheon sonrası 40 dakikalık dondurma molası ekleyebilir ve akşam yemeği saatini 19:30’a çekebilirim.”

Kullanıcı bu önerileri tek tek kabul edebilir veya topluca uygulayabilir.

## 17.2. Gün Yoğunluğu Analizi

Yapay zeka, bir günün fazla yoğun olup olmadığını analiz edebilmelidir.

Sistem şu unsurları birlikte değerlendirir:

- Gün içindeki durak sayısı

- Her durağın tahmini ziyaret süresi

- İki durak arası yürüyüş veya ulaşım süresi

- Toplam gün süresi

- Yemek ve dinlenme molaları

- Müze / ören yeri gibi yorucu aktivitelerin yoğunluğu

- Çocuklu aile veya yaşlılarla gezi durumu

- Rezervasyon saatleri

- Gün bitiş saati

Örnek uyarılar:

“Bu güne 9 durak eklediniz. Çocuklu aile için yoğun olabilir.”

“Toplam yürüyüş süresi yaklaşık 2 saat 20 dakika görünüyor. Yürüyüşü azaltmak ister misiniz?”

“Öğle molası 14:30’a kalıyor. Daha erken bir yemek molası eklemek iyi olabilir.”

“İki büyük ören yeri arka arkaya planlanmış. Bu bölüm yorucu olabilir.”

Bu analiz, planı engellemez. Kullanıcı isterse uyarıları görmezden gelebilir. Ama sistem planın uygulanabilirliğini artırmak için görünür destek sağlar.

## 17.3. Boşluk Bulucu

PlanTatil’de yapay zeka, gün içindeki boşlukları veya uygun mola aralıklarını bulabilmelidir.

Kullanıcı şöyle bir istek verebilir:

“15:00 ile 17:00 arasında yakınlarda kahve molası öner.”

veya:

“Pantheon’dan sonra 30 dakikalık tatlı molası ekleyelim.”

Sistem şu bilgilere bakar:

- Kullanıcının mevcut konumu veya plan akışı

- İlgili saat aralığı

- Yakındaki Gezi Kartları

- Kullanıcının Kartlarım arşivi

- Grup önerileri

- PlanTatil topluluk kartları

- Kart türü

- Açık olup olmama bilgisi varsa çalışma saatleri

- Yürüyüş mesafesi

- Planın günlük yoğunluğu

Sonuç olarak kullanıcıya birkaç mantıklı seçenek sunar.

Örnek:

“Pantheon’dan sonra 3 uygun mola noktası buldum:

- Giolitti - Dondurma - 6 dk yürüme

- Sant’Eustachio Il Caffè - Kahve - 5 dk yürüme

- Piazza Navona çevresi - Serbest mola - 7 dk yürüme

Giolitti, çocuklu aileler tarafından daha çok kaydedilmiş görünüyor.”

## 17.4. Yorum ve Deneyim Özeti

PlanTatil’de zamanla planlar, kartlar ve duraklar altında çok sayıda yorum, öneri ve deneyim notu birikebilir. Kullanıcının yüzlerce yorumu tek tek okuması gerçekçi değildir.

Yapay zeka bu yorumları özetleyerek uygulanabilir sonuçlara dönüştürmelidir.

Örnek özetler:

“Bu rota hakkında en sık yapılan yorumlar: Colosseum sonrası Forum bölümü yorucu bulunmuş, öğle molasının daha erken yapılması önerilmiş, Trevi Fountain akşam saatlerinde daha etkileyici ama kalabalık olarak belirtilmiş.”

“Bu restoran için kullanıcıların çoğu lezzeti beğenmiş ancak rezervasyonsuz gitmenin riskli olduğunu söylemiş.”

“Çocuklu aile yorumlarında bu müzenin kısa tutulması ve sonrasında park molası verilmesi öneriliyor.”

Bu özetler yalnızca metin olarak kalmamalı, plana uygulanabilir önerilere dönüşebilmelidir.

Örneğin:

- Öğle molasını öne çek

- Bu durağı opsiyonel yap

- Buraya rezervasyon uyarısı ekle

- Çocuk molası ekle

- Akşam saatine taşı

- Alternatif mekan göster

## 17.5. Yağmur, Yorgunluk ve Beklenmedik Durum Alternatifleri

Gezi planları gerçek hayatta her zaman planlandığı gibi işlemez. Hava bozulabilir, çocuklar yorulabilir, mekan kapalı olabilir, sıra çok uzun olabilir veya grup planın gerisinde kalabilir.

Yapay zeka bu durumlarda alternatif akışlar önerebilmelidir.

Örnek istekler:

- Yarın yağmur var, bu planı kapalı alanlara göre düzenle.

- Çocuklar yoruldu, bugünü kısalt.

- Bu restoran kapalı, yakında alternatif bul.

- Planın 1 saat gerisindeyiz, kalan günü yeniden düzenle.

- Bugün sadece en önemli 3 durağı görmek istiyoruz.

- Açık hava duraklarını azalt.

- Akşam yemeğini konaklama bölgesine yaklaştır.

Örnek çıktı:

“Bugünkü planı kısaltmak için Roman Forum’u opsiyonel yapabilir, Piazza Navona sonrası Trevi Fountain’a geçip Spanish Steps’i başka güne taşıyabilirsiniz. Böylece günü yaklaşık 2 saat kısaltırsınız.”

Bu tür öneriler, kullanıcının gezi sırasında stresini azaltır.

## 17.6. Harita Linkinden Gelen Kartı Anlama

Kullanıcı Google Maps veya başka bir harita uygulamasından PlanTatil’e mekan gönderdiğinde, yapay zeka bu kartı anlamlandırmak için kullanılabilir.

Yapay zeka şu tahminleri yapabilir:

- Mekan adı

- Şehir

- Ülke

- Kart türü

- Yeme/içme, müze, alışveriş, manzara, çocuk molası gibi kategori

- Hangi aktif plana uygun olduğu

- Hangi güne veya hangi durağın sonrasına eklenebileceği

- Ortalama ziyaret süresi

- Kısa açıklama taslağı

- Kullanıcıya sorulması gereken eksik bilgiler

Örnek:

“Bu kart Roma’da bir dondurma mekanı gibi görünüyor. Roma Aile Tatili 2026 planındaki Pantheon durağına yakın. Gün 1’de Pantheon sonrasına eklemek ister misiniz?”

Bu özellik, haritadan gelen kartların boş ve anlamsız kayıtlar olarak kalmasını engeller.

## 17.7. Plan DNA’sı ve Uygunluk Skoru ile Yapay Zeka İlişkisi

Yapay zeka, Plan DNA’sı ve uygunluk skoru sistemleriyle birlikte çalışmalıdır.

Plan DNA’sı planın karakterini tanımlar. Uygunluk skoru, bir kartın veya planın belirli bir bağlama ne kadar uyduğunu hesaplar. Yapay zeka ise bu verileri kullanıcıya anlaşılır öneriler olarak sunar.

Örneğin sistem teknik olarak şunu hesaplayabilir:

“Bu kart planla yüzde 82 uyumlu.”

Ama kullanıcıya şöyle gösterilmelidir:

“Bu dondurma noktası Pantheon’a yakın olduğu ve planınızda öğleden sonra boşluk bulunduğu için uygun görünüyor.”

Yapay zeka, teknik skoru insan diline çeviren katman gibi çalışır.

## 17.8. Otomatik Plan Üretimi

Uzun vadede yapay zeka, kullanıcının verdiği kısa bilgilerle sıfırdan plan taslağı üretebilir.

Örnek kullanıcı girişi:

“Roma’da 3 gün kalacağız. 2 çocuk var. Sabah geç başlarız. Çok müze istemiyoruz. Dondurma ve güzel meydanlar olsun. Yürüyüş çok fazla olmasın.”

Sistem bu bilgiye göre bir plan taslağı oluşturabilir:

- Gün 1: Klasik Roma ama hafif tempo

- Gün 2: Vatikan ve çevresi

- Gün 3: Lezzet, meydanlar ve alışveriş

- Her güne çocuk molası

- Daha kısa yürüyüşler

- Opsiyonel duraklar

- Yağmur alternatifi

Ancak otomatik plan üretimi MVP’nin ilk şartı olmak zorunda değildir. Öncelik hazır planları kopyalama, kartları ekleme, harita ve zaman çizelgesi deneyimini sağlam kurmak olmalıdır. AI plan üretimi bu temel sistemlerin üzerine oturmalıdır.

## 17.9. Akıllı Uyarılar

Yapay zeka, plan oluşturma ve gezi sırasında kullanıcıya bağlama duyarlı uyarılar verebilir.

Örnek uyarılar:

- Bu güne çok fazla durak eklediniz.

- Bu iki durak arasında yürüyüş uzun görünüyor.

- Bu müze kapanış saatine yakın planlanmış olabilir.

- Bu restoran için rezervasyon gerekebilir.

- Bu rota çocuklu aile için yorucu olabilir.

- Öğle molası çok geç kalıyor.

- Bugünkü plan yağmurda zor olabilir.

- Bu durak zaten başka bir gününüzde var.

- Bu kart aktif plana çok uzak görünüyor.

- Gezi planınızın gerisindesiniz, kalan günü sadeleştirebilirim.

Bu uyarılar sade, anlaşılır ve kullanıcıyı rahatsız etmeyecek şekilde sunulmalıdır. Kullanıcı istediğinde uyarıları kapatabilmelidir.

## 17.10. Deneyimden Öğrenme

Yapay zeka, kullanıcıların gezi sonrası bıraktığı deneyim notlarından ve işaretlemelerinden öğrenebilir.

Örneğin birçok kullanıcı bir kart için “kapalıydı”, “çok kalabalıktı”, “çocukla zor”, “rezervasyon şart” gibi notlar bırakırsa sistem bu bilgileri gelecekteki planlara yansıtabilir.

Bu öğrenme şu alanlarda kullanılabilir:

- Plan DNA’sını güncelleme

- Kart güvenilirlik skorunu artırma veya düşürme

- Risk etiketleri oluşturma

- Daha gerçekçi ziyaret süresi önerme

- Çocuk uygunluğu tahmini

- Bütçe seviyesi tahmini

- Popüler saat uyarısı

- Alternatif önerme

Bu özellik PlanTatil’in zamanla daha değerli hale gelmesini sağlar. Platform ne kadar çok kullanılırsa, öneriler o kadar gerçek deneyime dayanır.

## 17.11. AI Kararlarının Şeffaflığı

Yapay zeka önerileri kullanıcıya gerekçesiyle sunulmalıdır. Kullanıcı yalnızca “bunu yap” önerisi görmemeli; önerinin neden verildiğini anlamalıdır.

Örnek:

“Bu durağı başka güne taşımanızı öneriyorum çünkü Gün 1’de toplam yürüyüş süresi 2 saati geçiyor ve bu durak Gün 2’deki otel bölgenize daha yakın.”

veya:

“Bu restoranı öneriyorum çünkü mevcut konumunuza 450 metre uzaklıkta, daha önce 128 kullanıcı tarafından kaydedilmiş ve çocuklu aile yorumlarında olumlu geçiyor.”

Bu şeffaflık kullanıcı güvenini artırır.

## 17.12. Gizlilik ve Kişisel Veri İlkesi

Yapay zeka kullanılırken kullanıcıların özel planları, gezi tarihleri, grup bilgileri ve kişisel notları dikkatli korunmalıdır.

AI sistemi kişisel veya özel plan bilgilerini herkese açık önerilere dönüştürmemelidir. Kullanıcı özel notlarını paylaşmadığı sürece bu notlar topluluk verisi olarak kullanılmamalıdır.

Topluluk öğrenmesi yapılacaksa anonimleştirilmiş ve izinli veriler kullanılmalıdır.

Örnek ilke:

- Kişisel notlar özel kalır.

- Grup içi yorumlar grup içinde kalır.

- Herkese açık deneyim notları topluluk özetlerine dahil edilebilir.

- Kullanıcı isterse verilerinin AI iyileştirmelerinde kullanılmasını kapatabilir.

## 17.13. Ürün Değeri

Yapay zeka PlanTatil’de bir sohbet robotu gibi ayrı bir köşede durmak zorunda değildir. Asıl değer, ürünün her noktasında küçük ama doğru karar destekleri sunmasıdır.

Kullanıcı bir kart eklerken doğru planı önerir. Bir gün çok yoğunlaştığında uyarır. Yüzlerce yorumu özetler. Yağmurda alternatif rota üretir. Çocuklu aileye uygun olmayan durakları işaretler. Google Maps linkinden gelen kartı anlamlandırır. Gezi sırasında plan aksarsa yeni duruma göre akışı sadeleştirir.

Bu bölümün temel vaadi şudur:

“PlanTatil’de yapay zeka, kullanıcı yerine karar veren bir otopilot değil; gezi planını daha uygulanabilir, daha kişisel ve daha güvenli hale getiren akıllı yardımcıdır.”

## Karar Özeti

- Yapay zeka ürünün merkezinde gösteriş amaçlı değil, arka planda karar destek sistemi olarak kullanılacak.

- Hazır planlar çocuklu aile, ekonomik gezi, hafif tempo, lezzet ağırlıklı gezi gibi modlara göre uyarlanabilecek.

- Gün yoğunluğu, yürüyüş süresi, mola eksikliği ve rezervasyon çakışmaları analiz edilecek.

- Boşluk bulucu ile belirli saat aralıklarına yakın kahve, yemek, mola veya gezi önerileri sunulacak.

- Çok sayıdaki yorum ve deneyim notu özetlenerek uygulanabilir önerilere dönüştürülecek.

- Yağmur, yorgunluk, mekan kapalı olması veya planın gerisinde kalma gibi durumlarda alternatif akış önerilecek.

- Harita linkinden gelen kartlar tür, şehir, uygun plan ve uygun gün açısından anlamlandırılacak.

- Yapay zeka Plan DNA’sı ve uygunluk skoru ile birlikte çalışacak.

- Uzun vadede kısa kullanıcı girdisinden sıfırdan plan taslağı üretilebilecek.

- AI önerileri gerekçeli ve şeffaf sunulacak.

- Kişisel veriler, özel planlar ve grup notları korunacak.

- Topluluk öğrenmesi yalnızca izinli ve anonimleştirilmiş verilerle yapılacak.
