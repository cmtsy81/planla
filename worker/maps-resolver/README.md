# PlanTatil 2.0 – Maps Short Link Resolver (Cloudflare Worker)

Bu klasör, Google Maps kısa linklerini (`maps.app.goo.gl/...`) CORS ve bot engeli olmadan çözen Cloudflare Worker kodunu içerir.

## Neden Bu Çözüm?

| Yöntem | Sorun |
|---|---|
| Genel CORS Proxy (allorigins, corsproxy.io) | Google bot olarak engelliyor → HTTP 444 |
| Google Apps Script | Kullanıcının manuel kurulum yapması gerekiyor; URL client tarafta açıkta kalıyor |
| **Cloudflare Worker (bu çözüm)** | ✅ Cloudflare IP'leri Google tarafından engellenmez. Ücretsiz, hızlı, gizli anahtar gerektirmez |

## Deploy Adımları (5 Dakika)

1. **[dash.cloudflare.com](https://dash.cloudflare.com)** adresine git, ücretsiz hesap aç veya giriş yap.
2. Sol menüden **Workers & Pages** → **Create Application** → **Create Worker** seç.
3. Worker'a bir isim ver (örn: `planla-maps-resolver`) ve **Deploy** butonuna bas.
4. Editör açıldıktan sonra **"Edit Code"** butonuna tıkla.
5. `index.js` dosyasının tüm içeriğini bu klasördeki `index.js` ile değiştir.
6. Önemli: `ALLOWED_ORIGINS` dizisine kendi GitHub Pages URL'ini ekle (örn: `https://KULLANICI_ADI.github.io`).
7. Sağ üstten **Deploy** butonuna bas.
8. Sana bir URL verilecek: `https://planla-maps-resolver.HESABIN.workers.dev`

## Uygulamaya Entegrasyon

Oluşan Worker URL'ini `src/components/map-card-creator.js` dosyasında şu satıra yaz:

```js
// Satır ~600 civarı
MapCardCreator.RESOLVER_WORKER_URL = 'https://planla-maps-resolver.HESABIN.workers.dev';
```

Bu satırı `<script>` bloğu içinde, bileşen başlatılmadan önce eklemen yeterlidir:

```html
<script src="components/map-card-creator.js"></script>
<script>
  // Worker URL'i burada yapılandırılıyor (güvenli, gizli anahtar değil)
  MapCardCreator.RESOLVER_WORKER_URL = 'https://planla-maps-resolver.HESABIN.workers.dev';

  const mapCreator = new MapCardCreator({ ... });
</script>
```

## Güvenlik

- Worker sadece `maps.app.goo.gl`, `maps.google.com` gibi Google Maps domain'lerine yönlendirme yapar.
- `ALLOWED_ORIGINS` ile sadece kendi domaininden gelen isteklere yanıt verir.
- Herhangi bir API anahtarı veya gizli bilgi içermez; URL'i paylaşmak güvenlidir.
