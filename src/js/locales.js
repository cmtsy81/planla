/**
 * PlanTatil 2.0 i18n Translation Dictionary
 */

const PLAN_TATIL_LOCALES = {
    tr: {
        add_card: "Kartı Plana Ekle",
        completed: "Gezildi",
        mark_completed: "Gezildi İşaretle",
        budget: "Bütçe",
        duration: "Süre",
        duration_mins: "dk ziyaret",
        cost: "Maliyet",
        free: "Ücretsiz",
        landmark_explorer: "İnteraktif Keşif Haritası",
        landmark_sub: "Harita üzerinde bir konuma tıklayın veya simgelere dokunun.",
        creator_title: "Gezi Kartı Oluştur",
        creator_sub: "Seçili noktanın detaylarını belirleyin ve plana aktarın.",
        card_title_lbl: "Kart Başlığı",
        category_lbl: "Kategori",
        start_time_lbl: "Başlangıç Saati",
        duration_minutes_lbl: "Ziyaret Süresi (Dakika)",
        notes_lbl: "Gezgin Notları",
        tags_lbl: "Kart Modları (Etiketler)",
        custom_point: "Yeni Keşif Noktası",
        custom_point_desc: "Haritada işaretlenmiş kişisel nokta.",
        upvote_tooltip: "Öneriyi Beğen",
        downvote_tooltip: "Öneriyi Beğenme",
        
        // Categories
        place: "Gezilecek Yer",
        food: "Yemek / Restoran",
        coffee: "Kahve / Tatlı",
        shop: "Alışveriş",
        photo: "Fotoğraf Noktası",
        child: "Çocuk Aktivitesi",
        
        // Modes
        "child-friendly": "Çocuk Dostu",
        "gourmet": "Lezzet Odaklı",
        "heavy": "Yoğun Rota",
        "budget": "Bütçe Dostu",
        
        // Core messages
        total_duration: "Toplam Rota Süresi",
        dev_panel: "Geliştirici Paneli (DevSuite)",
        live_share: "Canlı Paylaşım Aktif",
        radius_filter_lbl: "Keşif Yarıçapı",
        radius_all: "Tüm Mesafe",
        radius_500m: "500m (Yürüme)",
        radius_1km: "1km (Yürüme/Mola)",
        radius_3km: "3km (Araç/Toplu Taşıma)",
        
        // Link Import Translations
        import_link_lbl: "Google Maps Linki İçe Aktar",
        import_link_placeholder: "Google Maps linkini buraya yapıştırın...",
        import_btn: "Çözümle",
        parsing_status: "Çözümleniyor...",
        parse_error: "Link çözümlenemedi. Geçerli bir Google Maps linki girin.",
        parse_success: "Mekan başarıyla çözümlendi!"
    },
    en: {
        add_card: "Add Card to Plan",
        completed: "Visited",
        mark_completed: "Mark as Visited",
        budget: "Budget",
        duration: "Duration",
        duration_mins: "min visit",
        cost: "Cost",
        free: "Free",
        landmark_explorer: "Interactive Discovery Map",
        landmark_sub: "Click on a location on the map or tap the icons.",
        creator_title: "Create Trip Card",
        creator_sub: "Set details of the selected point and add to plan.",
        card_title_lbl: "Card Title",
        category_lbl: "Category",
        start_time_lbl: "Start Time",
        duration_minutes_lbl: "Visit Duration (Minutes)",
        notes_lbl: "Traveler Notes",
        tags_lbl: "Card Modes (Tags)",
        custom_point: "New Discovery Point",
        custom_point_desc: "Personal point marked on the map.",
        upvote_tooltip: "Upvote Suggestion",
        downvote_tooltip: "Downvote Suggestion",
        
        // Categories
        place: "Place to Visit",
        food: "Food / Restaurant",
        coffee: "Coffee / Dessert",
        shop: "Shopping",
        photo: "Photo Point",
        child: "Child Activity",
        
        // Modes
        "child-friendly": "Child Friendly",
        "gourmet": "Gourmet Choice",
        "heavy": "Heavy Pace",
        "budget": "Budget Friendly",
        
        // Core messages
        total_duration: "Total Route Duration",
        dev_panel: "Developer Suite (DevSuite)",
        live_share: "Live Share Active",
        radius_filter_lbl: "Discovery Radius",
        radius_all: "All Distances",
        radius_500m: "500m (Walking)",
        radius_1km: "1km (Walk/Break)",
        radius_3km: "3km (Driving/Transit)",
        
        // Link Import Translations
        import_link_lbl: "Import Google Maps Link",
        import_link_placeholder: "Paste Google Maps link here...",
        import_btn: "Parse",
        parsing_status: "Parsing...",
        parse_error: "Failed to parse link. Enter a valid Google Maps link.",
        parse_success: "Location successfully parsed!"
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PLAN_TATIL_LOCALES;
} else {
    window.PLAN_TATIL_LOCALES = PLAN_TATIL_LOCALES;
}
