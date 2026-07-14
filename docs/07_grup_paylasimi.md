---
id: grup_paylasimi
title: "Grup Paylaşımı, Roller ve İzinler"
status: completed
percentage: 100
dependencies:
  - kullanici_tipleri
criteria:
  - "Bireysel hesaplar ile ortak planlar arasındaki ayrımın belirlenmesi"
  - "Temel rollerin (Sahip, Editör, Katılımcı, Link İzleyicisi) yetki matrisinin tanımlanması"
  - "Görev bazlı yetki sınırlarının (yemek, çocuk molası vb.) çizilmesi"
  - "Paylaşım adımlarının ve link izinlerinin yönetimi"
  - "Canlı konum paylaşımı ile gezi anında haritada grup üyelerinin takibi"
  - "Ortak not tahtası ve mesaj panosunun tasarlanması"
  - "Kart bazlı bütçe sahipliği ve görev dağılımı altyapısının kurulması"
---

# 7. Grup Paylaşımı, Roller ve İzinler

PlanTatil 2.0’da her kullanıcı sisteme giriş yapmış bireysel bir hesaba sahiptir. Bir kullanıcı yeni bir gezi planı oluşturmaya karar verdiğinde, bu plan başlangıçta kullanıcının kişisel çalışma alanında özel olarak oluşturulur. Plan sahibi daha sonra bu plana farklı kullanıcıları farklı rollerle davet edebilir.

Plan paylaşımı yalnızca gezi bittikten sonra herkese açık şekilde yayınlama anlamına gelmez. Plan sahibi, plan henüz hazırlık aşamasındayken de bazı kişileri planına davet edebilir. Bu kişiler geziye katılacak aile veya arkadaş grubu üyeleri olabileceği gibi, daha önce aynı destinasyona gitmiş bir tanıdık, harita ve rota planlama konusunda iyi olan biri veya sadece belirli bir konuda fikir verecek yardımcı bir kullanıcı da olabilir.

Bu nedenle PlanTatil’de davet ve yetki sistemi iki farklı ihtiyacı karşılamalıdır:

- Plan hazırlığına katkı almaKullanıcı planını oluştururken güvendiği kişileri yardımcı olarak davet eder. Bu kişiler planı düzenleyebilir, öneri sunabilir veya belirli görevleri üstlenebilir.

- Gezi grubuyla planı paylaşmaPlan belli bir aşamaya geldiğinde geziye katılacak kişiler plana davet edilir. Bu kişiler planı görebilir, öneri sunabilir, oy kullanabilir veya yalnızca kendi kişisel işaretlemelerini yapabilir.

Plan sahibi her davet edilen kullanıcı için ayrı rol belirleyebilir. Böylece ortak plan korunur; ancak katkı yapmak isteyen kişiler de sürece dahil edilebilir.

## 7.1. Temel Roller

Sistemin esnek ama güvenli kalması için rol karmaşası azaltılmış ve yetki matrisi 4 temel role indirgenmiştir:

1. **Sahip (Owner)**: Planı oluşturan ana kullanıcıdır. Plan üzerinde tam yetkiye sahiptir. Rota duraklarını düzenleyebilir, planı tamamen silebilir, gizlilik seviyelerini değiştirebilir, kullanıcıları davet edebilir ve rollerini belirleyebilir.
2. **Ortak Editör / Yardımcı Admin (Co-Editor)**: Plan sahibinin geziye katkı vermesi için tam yetki tanımladığı kişilerdir (eş, yakın arkadaşlar vb.). Kart ekleyebilir, düzenleyebilir ve taşıyabilirler. Ancak planı tamamen silemezler ve sahiplik/genel gizlilik ayarlarını değiştiremezler.
3. **Katılımcı / Grup Üyesi (Participant)**: Geziye katılacak diğer grup üyeleridir. Ortak rotayı bozmamaları için doğrudan plan duraklarını değiştiremezler. Ancak planı görüntüler, navigasyon açar, yeni durak önerisi (teklif) sunar, oylamalara katılır, ortak not panosunu kullanır ve gezi anında durakları kendi hesaplarında "Gezildi" olarak işaretleyebilirler.
4. **Link İzleyicisi (Link Viewer)**: Plan sahibinin paylaştığı bağlantı ile planı inceleyen pasif misafir kullanıcıdır. Oy kullanamaz, kart öneremez veya not yazamaz; yalnızca planı görüntüler ve izin varsa kendi hesabına kopyalayabilir.

## 7.2. Görev Dağılımı ve Yetkilendirme İlkesi

PlanTatil 2.0'da "yemek editörü", "müze editörü" gibi kodla sınırlandırılmış görev bazlı yetki kısıtlamaları bulunmaz. Kalabalık arkadaş gruplarında karmaşayı önlemek için:
- Katılımcılar doğrudan planı değiştiremez; her türlü kategori önerisini sunabilirler.
- Değişiklikler Sahip veya Editörler tarafından onaylandıktan sonra plana yansıtılır.
- Görev dağılımı sistem sınırlandırmaları yerine grup içi işbölümü (ortak akıl) ve sosyal koordinasyonla çözülür.

## 7.3. Paylaşım Aşamaları

Bir planın paylaşım süreci aşamalı düşünülmelidir.

Hazırlık PaylaşımıPlan sahibi, plan henüz tamamlanmadan yardımcı kişileri davet eder. Bu aşamada plan özel kalabilir ve yalnızca davet edilen kişiler erişebilir.

Grup PaylaşımıPlan belli bir olgunluğa ulaştığında geziye katılacak kişiler plana davet edilir. Grup üyeleri planı takip eder, öneri sunar, oylamalara katılır ve kendi durum işaretlemelerini yapar.

Kısa Link ile PaylaşımPlan sahibi isterse planı kısa bir bağlantı ile WhatsApp, e-posta veya sosyal medya üzerinden paylaşabilir. Bu linkin ne tür erişim verdiği plan ayarlarında belirlenir.

Herkese Açık YayınlamaPlan sahibi isterse planını platformda keşfedilebilir hale getirir. Bu durumda diğer kullanıcılar planı inceleyebilir, izin varsa kendi hesaplarına kopyalayabilir veya kendi planlarına ilham olarak kullanabilir.

## 7.4. Paylaşım Ayarları

Plan sahibi, linke sahip olan kullanıcıların ne yapabileceğini ayrıntılı biçimde belirleyebilmelidir.

Örnek ayarlar:

- Sadece görüntüleyebilir

- Öneri yapabilir

- Öneri yapabilir ve oy kullanabilir

- Belirli türde kart ekleyebilir

- Planı doğrudan düzenleyebilir

- Sadece kendi işaretlerini görebilir

- Anonim grup ilerlemesini görebilir

- Herkesin durumunu görebilir

Yeni önerilerin plana nasıl yansıyacağı da ayrıca belirlenmelidir:

- Admin onayından sonra plana eklensin

- Grup oylamasından sonra admin onayına düşsün

- Çoğunluk sağlanırsa otomatik eklensin

- Doğrudan plana eklensin

Varsayılan güvenli model, katılımcıların doğrudan planı değiştirmemesi; öneri sunması ve plan sahibinin bu önerileri onaylamasıdır. Böylece ortak rota bozulmadan grup katkısı alınabilir.

## 7.5. Grup İşbirliği ve Ortak Alan Özellikleri

Grup üyelerinin gezi planlama ve uygulama süreçlerinde aktif etkileşimini artırmak amacıyla şu üç temel özellik tasarlanmıştır:

### 7.5.1. Canlı Konum Paylaşımı
- **Amaç**: Gezi anında grup üyelerinin harita üzerinde birbirlerinin anlık konumunu görmesini sağlamak.
- **Detay**: Özellikle kalabalık grupların serbest zamanlarda veya duraklar arası geçişlerde kopmasını önler. Kullanıcılar isteğe bağlı olarak (opt-in) konum paylaşımını açıp kapatabilir. Konumlar sadece gezi günlerinde ve sadece planın gezi haritası ekranında anlık (real-time) olarak güncellenir.

### 7.5.2. Ortak Not Tahtası / Mesaj Panosu
- **Amaç**: Geziye özel bilet, otel rezervasyonu, genel notlar ve anlık mesajlaşmaların tutulduğu ortak bir alan sunmak.
- **Detay**: Grup üyeleri plana dahil olan her gezi kartının altına notlar/yorumlar bırakabileceği gibi, tüm geziyi kapsayan ortak bir "Not Tahtası" (Bulletin Board) üzerinden de önemli belgeleri (uçuş kartı PDF linki vb.) ve yapılacaklar listesini paylaşabilir.

### 7.5.3. Bütçe ve Görev Dağılımı
- **Amaç**: Plan içindeki gezi kartları ve harcamalar için basit bir işbölümü ve sorumluluk ataması sağlamak.
- **Detay**: Her gezi kartına veya harcama kalemine bir "Sorumlu / Görevli" atanabilir. Örneğin: "Vatikan biletlerini almak ve ödemek: Cem (Görevli)". Sistem, kimin hangi durakla ilgili rezervasyonu yapacağını ve harcamaların kimler arasında paylaştırılacağını (basit bütçe eşlemesi) takip eder.

