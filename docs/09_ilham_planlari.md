---
id: ilham_planlari
title: "İlham Planlarından Kart Aktarma Sistemi"
status: completed
percentage: 100
dependencies:
  - plan_kopyalama
  - gezi_kartlari
criteria:
  - "İki panelli planlama ekranı arayüz tasarım kuralları"
  - "Kart aktarma mantığının (kopyalanan/kopyalanmayan veriler) belirlenmesi"
  - "Lokasyon bazlı akıllı filtreleme ve arama altyapısı"
  - "Kartın plan içinde en uygun konuma yerleştirilme öneri algoritması"
---

# 9. İlham Planlarından Kart Aktarma Sistemi

PlanTatil 2.0’da kullanıcılar yalnızca tek bir hazır planı kopyalamak zorunda değildir. Kullanıcı, kendi planını oluştururken başka planlardan da ilham alabilir ve beğendiği kartları kendi planına aktarabilir.

Bu sistem, tam plan kopyalamadan farklıdır. Kullanıcı başkasının planını tamamen kendi hesabına almak yerine, kendi planı üzerinde çalışırken başka planları referans olarak açar ve sadece ihtiyaç duyduğu durakları, lezzet önerilerini veya notları kendi planına ekler.

Bu özellik özellikle aynı şehir için birçok farklı planın bulunduğu durumlarda çok değerlidir. Kullanıcı bir plandan tarihi durakları, başka bir plandan yemek önerilerini, başka bir plandan çocuk molalarını alarak kendi özgün rotasını oluşturabilir.

## 9.1. İki Panelli Planlama Görünümü (Responsive Yapı)

Plan oluşturma ekranında kullanıcıya masaüstü ve mobil ekran boyutlarına göre uyarlanan dinamik bir çalışma alanı sunulur.

**Masaüstü Görünümü (Yan Yana Çift Panel):**
Sol panelde kullanıcının kendi planı yer alır. Sağ panelde ise ilham alınacak planlar, öneri listeleri veya arama sonuçları bulunur.
- Sol taraf: Benim Roma Aile Tatili Planım
- Sağ taraf: İlham alınacak planlar (Çocuklu Aile İçin Roma, Roma Lezzet Rotası vb.)
Masaüstü ekranlarda kullanıcı sağdaki planlarda gördüğü kartları kendi planına sürükle-bırak yöntemiyle ekleyebilir veya “Planıma ekle” butonuna basabilir.

**Mobil Görünümü (Alt Çekmece - Bottom Sheet):**
Mobil cihazlarda ekran kısıtı nedeniyle iki panel yan yana gösterilmez. Bunun yerine kullanıcının aktif planı tam ekran olarak gösterilirken, ilham panelindeki kartlar ve listeler ekranın altından yukarı doğru sürüklenebilen bir **Alt Çekmece (Bottom Sheet)** içinde sunulur. Kullanıcı çekmeceyi yukarı kaydırarak kartları inceler, "Ekle" butonuna bastığında kart doğrudan arka plandaki plana dahil edilir.

## 9.2. Kart Aktarma Mantığı

Bir kart başka bir plandan kullanıcının planına aktarıldığında, kartın temel bilgileri kullanıcının planına kopyalanır.

Aktarılabilecek bilgiler:

- Kart başlığı

- Türü

- Açıklama

- Ortalama süre

- Konum

- Harita bağlantısı

- Bilet/rezervasyon notları

- Lezzet önerisi bilgileri

- Uyarılar

- Kaynak plan bilgisi

Ancak kişisel bilgiler ve başka kullanıcıya ait özel notlar aktarılmaz.

Kartın altında kaynak bilgisi gösterilebilir:

“Bu kart, Roma Lezzet Rotası planından alınmıştır.”

Bu kaynak bilgisi hem güven hem de plan soy ağacı açısından önemlidir.

## 9.3. Akıllı Filtreleme

Kullanıcının kendi planı Roma planıysa, sağ panelde öncelikle Roma ile ilgili planlar ve kartlar görünmelidir. Kullanıcı Milano planı hazırlıyorsa Milano kartları öne çıkmalıdır.

Filtreler:

- Şehir

- Bölge

- Gün sayısı

- Tempo

- Çocukla uygunluk

- Lezzet yoğunluğu

- Yürüyüş mesafesi

- Müze/ören yeri

- Yeme/içme

- Kahve/tatlı

- Alışveriş

- Fotoğraf noktası

- Akşam aktivitesi

Bu filtreler sayesinde kullanıcı yüzlerce kart arasında kaybolmadan kendi planına uygun içerikleri bulabilir.

## 9.4. Kartı Nereye Ekleyelim? (Konum Öneri Algoritması)

Kullanıcı ilham panelinden bir kartı seçip plana eklemek istediğinde sistem, bu kartın mevcut rotada coğrafi ve zamansal olarak en uygun nereye yerleşeceğini otomatik olarak hesaplar ve önerir.

**Öneri Algoritmasının Çalışma Adımları:**
1. **Coğrafi Yakınlık Analizi (GPS):** Eklenecek yeni kartın GPS koordinatları ile kullanıcının planında yer alan mevcut durakların koordinatları arasındaki mesafeler hesaplanır. En yakın olan mevcut durak (referans nokta) tespit edilir. (Örneğin: Yeni kart "Giolitti Gelateria", plana en yakın durak 300 metre mesafedeki "Pantheon").
2. **Zamansal Eşleşme ve Boşluk Kontrolü:** Sistem, referans noktasının (Pantheon) hemen öncesi veya sonrasındaki zaman çizelgesini kontrol eder. Eğer o saatlerde gezi programında boşluk (serbest zaman) varsa veya rota sıkışmıyorsa, kartın Pantheon'dan hemen sonra ziyaret edilmesi önerilir.
3. **Alternatif Gün/Saat Önerisi:** Eğer referans noktası çevresindeki zaman dilimi tamamen doluysa (başka duraklarla sıkışmışsa), sistem coğrafi olarak en yakın 2. noktayı kontrol eder veya kullanıcının planındaki diğer günlerin boş saatlerini analiz ederek en az seyahat süresi gerektiren alternatifi sunar.

Örnek öneri arayüz mesajları:
- *"Bu durak 1. Gün ziyaret edeceğiniz Pantheon'a 3 dk yürüme mesafesinde. 14:30'daki Pantheon durağının hemen sonrasına eklemek ister misiniz?"*
- *"1. Gün programınız çok yoğun. Bu durak 2. Gün otelinize yakın konumda bulunuyor, 2. Gün sabah başlangıcına eklenmesi önerilir."*

Bu algoritma, kullanıcıların şehir içi transfer ve yürüme sürelerini en aza indirerek optimize rotalar çıkarmasını sağlar.

## 9.5. Tam Plan Kopyalama ile Kart Aktarma Arasındaki Fark

PlanTatil’de iki ayrı aktarım modeli bulunmalıdır:

Tam plan kopyalama:Kullanıcı bir planın tamamını kendi hesabına alır ve üzerinde düzenleme yapar.

Kart aktarma:Kullanıcı kendi planı üzerinde çalışırken başka planlardan sadece seçtiği kartları alır.

Bu iki model birbirini tamamlar. Bazı kullanıcılar hazır bir planı tamamen kopyalayıp düzenlemek ister. Bazıları ise sıfırdan kendi planını yaparken farklı planlardan parça parça ilham almayı tercih eder.
