import os
import re
import sys

# PlanTatil 2.0 Agent Linter - Standart Denetim Aracı
# Reviewer Agent bu aracı kullanarak kod doğrulaması yapar.

print("=== PlanTatil 2.0 Agent Linter Başlatılıyor ===")

workspace_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src_dir = os.path.join(workspace_dir, "src")

# Hata ve uyarı sayıları
errors = 0
warnings = 0

# Dosya taramaları
def check_file(filepath):
    global errors, warnings
    rel_path = os.path.relpath(filepath, workspace_dir)
    
    # Git veya .agents klasörlerini atla
    if ".agents" in rel_path or "node_modules" in rel_path or "modules_data.js" in rel_path or "locales.js" in rel_path:
        return
        
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        lines = content.splitlines()

    # 1. Inline Style (style="...") Kontrolleri (HTML)
    if filepath.endswith(".html"):
        for i, line in enumerate(lines, 1):
            if 'style=' in line and 'style-radar' not in line and 'style="cursor' not in line:
                # Bazı dinamik SVG kısımları hariç (style="cursor: pointer" vb.) inline style'ları raporla
                print(f"[HATA] {rel_path}:{i} - Satırında inline 'style=' tanımlaması tespit edildi: {line.strip()}")
                errors += 1
            
            # i18n kontrolü: HTML etiketleri arasında doğrudan Türkçe/İngilizce metin yazılmış mı?
            # Örneğin: <div>Kaydet</div> gibi. window.PLAN_TATIL_LOCALES kullanılmalı.
            tag_text_match = re.search(r'>\s*([a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,})\s*<', line)
            if tag_text_match:
                matched_text = tag_text_match.group(1).strip()
                # scripts, styles veya boşlukları atla
                if matched_text and not re.match(r'^(const|let|var|function|import|export|class|@import)', matched_text):
                    print(f"[UYARI] {rel_path}:{i} - HTML etiketleri arasında sert kodlanmış metin olabilir: '{matched_text}'")
                    warnings += 1

    # 2. JS Dosyalarında inline CSS ve i18n Kontrolleri
    if filepath.endswith(".js"):
        for i, line in enumerate(lines, 1):
            # JS element.style.color = "..." gibi inline müdahaleler
            if '.style.' in line and '=' in line and 'style.css' not in line:
                print(f"[HATA] {rel_path}:{i} - Javascript tarafında inline style müdahalesi tespit edildi: {line.strip()}")
                errors += 1
            
            # i18n kontrolü: JS içinde doğrudan string atamaları
            # locales[lang] dışında sert kodlanmış Türkçe/İngilizce kelimeler içeren metin atamaları
            # Basitçe: tırnak içindeki kelimeler (en az 4 karakter ve Türkçe karakterler içerebilen)
            # Ama console.log, class, event listener, querySelector vb. olmayanları filtreleyelim
            string_matches = re.findall(r'["\']([a-zA-ZğüşıöçĞÜŞİÖÇ\s]{4,})["\']', line)
            for match in string_matches:
                # İzin verilen anahtar kelimeler ve teknik terimler
                skip_keywords = [
                    'use strict', 'click', 'change', 'input', 'mouseover', 'mouseout',
                    'active', 'hidden', 'visible', 'error', 'warning', 'success', 'info',
                    'class', 'div', 'span', 'button', 'loading', 'pointer', 'none', 'block',
                    'flex', 'grid', 'inline', 'absolute', 'relative', 'fixed', 'sticky',
                    'const', 'let', 'var', 'px', 'rem', 'em', 'auto', 'width', 'height',
                    'category', 'place', 'food', 'coffee', 'shop', 'photo', 'child',
                    'gourmet', 'heavy', 'budget', 'tr', 'en', 'PLAN_TATIL_LOCALES',
                    'map-card-creator-container', 'map-landmark-group', 'landmark-radar',
                    'landmark-dot', 'landmark-label', 'creator-layout'
                ]
                if match.lower() not in skip_keywords and not any(k in line for k in ['console.', 'querySelector', 'getElementById', 'addEventListener', 'classList']):
                    # Eğer metin büyük/küçük harf ve Türkçe karakter barındırıyorsa i18n adayıdır
                    if re.search(r'[ğüşıöçĞÜŞİÖÇ]', match) or len(match.split()) > 1:
                        print(f"[UYARI] {rel_path}:{i} - Sert kodlanmış i18n adayı string: '{match}'")
                        warnings += 1

def scan_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith((".html", ".js", ".css")):
                check_file(os.path.join(root, file))

# Tarama başlat
scan_dir(src_dir)

print("\n=== Tarama Sonucu ===")
print(f"Toplam Hata: {errors}")
print(f"Toplam Uyarı: {warnings}")

if errors > 0:
    print("Sonuç: Hatalar tespit edildi! Kod denetimden GEÇEMEDİ.")
    sys.exit(1)
else:
    print("Sonuç: Kritik hata bulunamadı. Kod denetimden BAŞARIYLA GEÇTİ.")
    sys.exit(0)
