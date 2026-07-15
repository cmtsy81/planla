/**
 * PlanTatil 2.0 Reusable Map Card Creator Component
 * Uses shared styles from core.css and localization from locales.js
 * Integrated with Leaflet.js Map and Leaflet.markercluster
 */

class MapCardCreator {
    constructor(options = {}) {
        this.options = {
            onCardCreated: options.onCardCreated || null,
            onMapClick: options.onMapClick || null,
            onLandmarkSelected: options.onLandmarkSelected || null,
            onRadiusFilterApplied: options.onRadiusFilterApplied || null,
            interactive: options.interactive !== false,
            lang: options.lang || 'tr',
            currency: options.currency || '€'
        };
        this.currency = this.options.currency;
        
        // Rome Landmarks mock database with real LatLng coordinates
        this.landmarks = [
            { id: 'colosseum', name: 'Kolezyum (Colosseum)', type: 'place', duration: 90, cost: '€25', desc: 'Antik Roma arenası, biletler önceden alınmalı.', lat: 41.8902, lng: 12.4922 },
            { id: 'trevi', name: 'Trevi Çeşmesi (Aşk Çeşmesi)', type: 'photo', duration: 20, cost: 'Ücretsiz', desc: 'Dilek dilemek için bozuk para fırlatın.', lat: 41.9009, lng: 12.4833 },
            { id: 'pantheon', name: 'Panteon (Pantheon)', type: 'place', duration: 40, cost: '€5', desc: 'Mükemmel korunmuş antik tapınak, beton kubbe.', lat: 41.8986, lng: 12.4769 },
            { id: 'giolitti', name: 'Giolitti Gelateria', type: 'coffee', duration: 30, cost: '€6', desc: 'Roma\'nın en eski dondurmacılarından biri.', lat: 41.9001, lng: 12.4777 },
            { id: 'navona', name: 'Navona Meydanı', type: 'place', duration: 30, cost: 'Ücretsiz', desc: 'Bernini çeşmeleri ve barok mimari.', lat: 41.8989, lng: 12.4731 },
            { id: 'vatican', name: 'Vatikan Müzeleri & Sistine Şapeli', type: 'place', duration: 180, cost: '€30', desc: 'Michelangelo\'nun tavan freskleri, büyük kalabalık.', lat: 41.9067, lng: 12.4547 },
            { id: 'popolo', name: 'Piazza del Popolo', type: 'place', duration: 30, cost: 'Ücretsiz', desc: 'Büyük neoklasik meydan, kuzey kapısı.', lat: 41.9107, lng: 12.4764 },
            { id: 'spagna', name: 'İspanyol Merdivenleri', type: 'photo', duration: 25, cost: 'Ücretsiz', desc: 'Kült merdivenler, Trinita dei Monti kilisesine çıkar.', lat: 41.9059, lng: 12.4828 },
            { id: 'borghese', name: 'Villa Borghese Parkı', type: 'place', duration: 120, cost: 'Ücretsiz', desc: 'Roma\'nın kalbinde devasa yeşil park alanı.', lat: 41.9131, lng: 12.4862 },
            { id: 'pompi', name: 'Pompi Tiramisu', type: 'food', duration: 20, cost: '€5', desc: 'Roma\'nın en ünlü tiramisucusu (İspanyol merdivenleri yakını).', lat: 41.9062, lng: 12.4820 },
            { id: 'tazza', name: 'La Casa del Caffè Tazza d\'Oro', type: 'coffee', duration: 15, cost: '€3', desc: 'Pantheon yakınında tarihi kahve kavurucusu, granitası meşhurdur.', lat: 41.8990, lng: 12.4775 }
        ];
        
        this.map = null;
        this.markerCluster = null;
        this.markersList = [];
        this.customPinMarker = null;
        this.radiusCircle = null;
        this.selectedPoint = null;
        this.element = null;
        this.selectedRadiusCenter = [41.8986, 12.4769]; // Default centered at Pantheon
    }
    
    getTranslation(key, defaultValue = '') {
        const lang = this.options.lang;
        if (window.PLAN_TATIL_LOCALES && window.PLAN_TATIL_LOCALES[lang] && window.PLAN_TATIL_LOCALES[lang][key]) {
            return window.PLAN_TATIL_LOCALES[lang][key];
        }
        const fallback = {
            tr: { 
                add_card: "Kartı Plana Ekle", 
                free: "Ücretsiz", 
                custom_point: "Yeni Keşif Noktası",
                radius_filter_lbl: "Keşif Yarıçapı",
                radius_all: "Tüm Mesafe",
                radius_500m: "500m (Yürüme)",
                radius_1km: "1km (Yürüme/Mola)",
                radius_3km: "3km (Araç/Toplu Taşıma)",
                custom_point_desc: "Haritada işaretlenmiş kişisel nokta."
            },
            en: { 
                add_card: "Add Card to Plan", 
                free: "Free", 
                custom_point: "New Discovery Point",
                radius_filter_lbl: "Discovery Radius",
                radius_all: "All Distances",
                radius_500m: "500m (Walking)",
                radius_1km: "1km (Walk/Break)",
                radius_3km: "3km (Driving/Transit)",
                custom_point_desc: "Personal point marked on the map."
            }
        };
        return (fallback[lang] && fallback[lang][key]) || defaultValue || key;
    }
    
    render(container) {
        const creatorDiv = document.createElement('div');
        creatorDiv.className = 'map-card-creator-container';
        
        creatorDiv.innerHTML = `
            <div class="creator-layout">
                <!-- Map Panel -->
                <div class="map-panel pt-card">
                    <div class="map-panel-header">
                        <div>
                            <h3 class="panel-title">${this.getTranslation('landmark_explorer')}</h3>
                            <p class="panel-subtitle">${this.getTranslation('landmark_sub')}</p>
                        </div>
                    </div>
                    
                    <!-- Interactive Map Container -->
                    <div class="map-canvas-wrapper">
                        <div id="pt-leaflet-map" style="width: 100%; height: 380px;"></div>
                    </div>

                    <!-- Radius Filter Slider -->
                    <div class="radius-filter-panel pt-card" style="margin-top: 1rem; background: rgba(255,255,255,0.02); padding: 1rem; border-color: rgba(255,255,255,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <label class="pt-label" style="margin-bottom: 0; font-weight: 600;">${this.getTranslation('radius_filter_lbl')}</label>
                            <span class="pt-badge pt-badge-progress" id="radius-val-display">${this.getTranslation('radius_all')}</span>
                        </div>
                        <input type="range" id="radius-slider" class="pt-range" min="0" max="3" value="0" style="width: 100%; accent-color: var(--primary);">
                        <div class="radius-ticks" style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem; font-family: var(--font-heading);">
                            <span>${this.getTranslation('radius_all')}</span>
                            <span>500m</span>
                            <span>1km</span>
                            <span>3km</span>
                        </div>
                    </div>
                </div>
                
                <!-- Form Panel -->
                <div class="form-panel pt-card">
                    <!-- Mobil Bottom Sheet Handle -->
                    <div class="bottom-sheet-handle-wrapper">
                        <div class="bottom-sheet-handle"></div>
                    </div>
                    <!-- Google Maps Link Import Section -->
                    <div class="link-import-panel" style="margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px dashed var(--border-color);">
                        <label class="pt-label" style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span>🌐</span> ${this.getTranslation('import_link_lbl')}
                        </label>
                        <div style="display: flex; gap: 0.5rem;">
                            <input type="text" id="maps-import-url" class="pt-input" placeholder="${this.getTranslation('import_link_placeholder')}" style="flex: 1; font-size: 0.8rem;">
                            <button type="button" id="maps-import-btn" class="pt-btn pt-btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem; white-space: nowrap;">
                                ${this.getTranslation('import_btn')}
                            </button>
                        </div>
                        <div id="import-status-msg" style="display: none; font-size: 0.75rem; margin-top: 0.4rem; font-weight: 500; transition: color 0.2s;"></div>
                    </div>

                    <h3 class="panel-title">${this.getTranslation('creator_title')}</h3>
                    <p class="panel-subtitle">${this.getTranslation('creator_sub')}</p>
                    
                    <form id="card-creator-form" class="creator-form">
                        <input type="hidden" id="coord-lat" value="">
                        <input type="hidden" id="coord-lng" value="">
                        
                        <div class="pt-form-group">
                            <label class="pt-label" for="card-title">${this.getTranslation('card_title_lbl')}</label>
                            <input type="text" id="card-title" class="pt-input" placeholder="Örn: Kolezyum Turu" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="pt-form-group col-6">
                                <label class="pt-label" for="card-type">${this.getTranslation('category_lbl')}</label>
                                <select id="card-type" class="pt-select">
                                    <option value="place">${this.getTranslation('place')}</option>
                                    <option value="food">${this.getTranslation('food')}</option>
                                    <option value="coffee">${this.getTranslation('coffee')}</option>
                                    <option value="shop">${this.getTranslation('shop')}</option>
                                    <option value="photo">${this.getTranslation('photo')}</option>
                                    <option value="child">${this.getTranslation('child')}</option>
                                </select>
                            </div>
                            <div class="pt-form-group col-6">
                                <label class="pt-label" for="card-time">${this.getTranslation('start_time_lbl')}</label>
                                <input type="time" id="card-time" class="pt-input" value="10:00" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="pt-form-group col-6">
                                <label class="pt-label" for="card-duration">${this.getTranslation('duration_minutes_lbl')}</label>
                                <input type="number" id="card-duration" class="pt-input" min="5" max="480" value="45" required>
                                <div class="quick-accumulation-container duration-accumulator" style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem;">
                                    <button type="button" class="pt-badge-btn" data-value="15">15d</button>
                                    <button type="button" class="pt-badge-btn" data-value="30">30d</button>
                                    <button type="button" class="pt-badge-btn" data-value="45">45d</button>
                                    <button type="button" class="pt-badge-btn" data-value="60">1s</button>
                                    <button type="button" class="pt-badge-btn" data-value="120">2s</button>
                                    <button type="button" class="pt-badge-btn" data-value="240">4s</button>
                                </div>
                            </div>
                            <div class="pt-form-group col-6">
                                <label class="pt-label" for="card-cost">${this.getTranslation('cost')}</label>
                                <div class="input-group-currency" style="position: relative; display: flex; align-items: center;">
                                    <span class="currency-addon" style="position: absolute; left: 12px; color: var(--text-muted); font-size: 0.95rem; pointer-events: none; font-weight: 500;">${this.currency}</span>
                                    <input type="number" id="card-cost" class="pt-input" min="0" placeholder="0" style="padding-left: 28px;" value="0">
                                </div>
                                <div class="quick-accumulation-container cost-accumulator" style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem;">
                                    <button type="button" class="pt-badge-btn" data-value="5">5</button>
                                    <button type="button" class="pt-badge-btn" data-value="10">10</button>
                                    <button type="button" class="pt-badge-btn" data-value="20">20</button>
                                    <button type="button" class="pt-badge-btn" data-value="50">50</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pt-form-group">
                            <label class="pt-label" for="card-desc">${this.getTranslation('notes_lbl')}</label>
                            <textarea id="card-desc" class="pt-textarea" placeholder="..."></textarea>
                        </div>
                        
                        <div class="pt-form-group">
                            <label class="pt-label">${this.getTranslation('tags_lbl')}</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="card-mode" value="child-friendly"> ${this.getTranslation('child-friendly')}
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="card-mode" value="gourmet"> ${this.getTranslation('gourmet')}
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="card-mode" value="heavy"> ${this.getTranslation('heavy')}
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="card-mode" value="budget"> ${this.getTranslation('budget')}
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit" class="pt-btn pt-btn-primary full-width">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
                            ${this.getTranslation('add_card')}
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        this.element = creatorDiv;
        if (container) {
            container.appendChild(creatorDiv);
        }
        
        // Initialize Map and Slider after rendering is completed in DOM
        setTimeout(() => {
            this.initMap();
            this.bindSliderEvents();
        }, 100);

        // Form Submit Handler
        const form = creatorDiv.querySelector('#card-creator-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(form);
        });

        // Google Maps Link Import Bindings
        this.bindLinkImportEvents(creatorDiv);
        
        // Mobil UX Accumulator Bindings
        this.bindQuickAccumulatorEvents(creatorDiv);
        
        // Mobil Bottom Sheet Bindings
        this.bindBottomSheetEvents(creatorDiv);
        
        return creatorDiv;
    }
    
    initMap() {
        if (!window.L) {
            console.error("Leaflet.js is not loaded.");
            return;
        }

        // Initialize Leaflet Map centered in Rome Pantheon
        this.map = L.map('pt-leaflet-map', {
            zoomControl: true,
            doubleClickZoom: false // Disable double click zoom so we can use double click for custom pin
        }).setView([41.8986, 12.4769], 14);

        // Load Map Tiles dynamically based on active Light/Dark Theme
        const isLight = document.body.classList.contains('light-mode') || document.documentElement.classList.contains('light-mode');
        const tileUrl = isLight 
            ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

        this.tileLayer = L.tileLayer(tileUrl, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);

        // Initialize Marker Cluster Group with Glassmorphism Design overriding standard leaflet clusters
        this.markerCluster = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: (cluster) => {
                const childCount = cluster.getChildCount();
                let sizeClass = 'cluster-small';
                if (childCount >= 5) sizeClass = 'cluster-medium';
                if (childCount >= 10) sizeClass = 'cluster-large';
                
                return L.divIcon({
                    html: `<div class="glass-cluster ${sizeClass}"><span>${childCount}</span></div>`,
                    className: 'custom-cluster-icon-wrapper',
                    iconSize: [40, 40]
                });
            }
        });

        // Add Simgesel Mekanlar (Landmarks) to Map
        this.renderLandmarks();
        
        // Listen Map Click Events to place Custom Pins
        this.map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            this.placeCustomPin(lat, lng);
            
            // Set Selected Radius Center to the clicked location
            this.selectedRadiusCenter = [lat, lng];
            
            // Trigger filter recalculation if filter is active
            const slider = this.element.querySelector('#radius-slider');
            const radiusVal = parseInt(slider.value, 10);
            if (radiusVal > 0) {
                this.applyRadiusFilter(lat, lng, radiusVal);
            }

            if (this.options.onMapClick) {
                this.options.onMapClick(lat, lng);
            }
        });

        this.map.on('dblclick', (e) => {
            const { lat, lng } = e.latlng;
            this.placeCustomPin(lat, lng);
            this.selectedRadiusCenter = [lat, lng];
            
            const slider = this.element.querySelector('#radius-slider');
            const radiusVal = parseInt(slider.value, 10);
            if (radiusVal > 0) {
                this.applyRadiusFilter(lat, lng, radiusVal);
            }
        });
    }

    renderLandmarks() {
        if (!this.map || !this.markerCluster) return;

        this.markerCluster.clearLayers();
        this.markersList = [];

        this.landmarks.forEach(l => {
            // Category specific styling
            const markerHtml = `
                <div class="custom-map-marker ${l.type}-marker">
                    <div class="marker-dot"></div>
                    <div class="marker-radar"></div>
                </div>
            `;

            const customIcon = L.divIcon({
                html: markerHtml,
                className: 'custom-marker-icon-wrapper',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker([l.lat, l.lng], { icon: customIcon });
            
            // Popup details
            marker.bindPopup(`
                <div class="map-popup-content" style="font-family: var(--font-heading); color: var(--text-primary);">
                    <strong style="font-size: 0.9rem; display:block; margin-bottom:0.25rem;">${l.name}</strong>
                    <span class="pt-badge pt-badge-progress" style="font-size:0.7rem; padding: 0.1rem 0.4rem; margin-bottom: 0.5rem; display:inline-block;">${this.getTranslation(l.type)}</span>
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0 0 0.5rem 0;">${l.desc}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; border-top:1px solid var(--border-color); padding-top:0.5rem;">
                        <span>⏱ ${l.duration}dk</span>
                        <span style="color:var(--secondary); font-weight:bold;">${l.cost}</span>
                    </div>
                </div>
            `);

            // Select on click
            marker.on('click', () => {
                this.selectLandmark(l);
                this.selectedRadiusCenter = [l.lat, l.lng];
                
                // Recalculate radius filter if active
                const slider = this.element.querySelector('#radius-slider');
                const radiusVal = parseInt(slider.value, 10);
                if (radiusVal > 0) {
                    this.applyRadiusFilter(l.lat, l.lng, radiusVal);
                }

                if (this.options.onLandmarkSelected) {
                    this.options.onLandmarkSelected(l);
                }
            });

            // Keep reference to landmark data inside marker object for filtering
            marker.landmarkData = l;

            this.markerCluster.addLayer(marker);
            this.markersList.push(marker);
        });

        this.map.addLayer(this.markerCluster);
    }
    
    selectLandmark(landmark) {
        const formPanel = this.element.querySelector('.form-panel');
        if (formPanel) formPanel.classList.add('expanded');

        // Clear custom pin
        if (this.customPinMarker) {
            this.map.removeLayer(this.customPinMarker);
            this.customPinMarker = null;
        }
        
        const form = this.element.querySelector('#card-creator-form');
        form.querySelector('#card-title').value = landmark.name;
        form.querySelector('#card-type').value = landmark.type;
        form.querySelector('#card-duration').value = landmark.duration;
        
        // Parse cost to numeric value
        let numericCost = 0;
        if (landmark.cost && landmark.cost !== 'Ücretsiz' && landmark.cost !== 'Free') {
            numericCost = parseFloat(landmark.cost.replace(/[^0-9.]/g, '')) || 0;
        }
        form.querySelector('#card-cost').value = numericCost;
        form.querySelector('#card-desc').value = landmark.desc;
        form.querySelector('#coord-lat').value = landmark.lat;
        form.querySelector('#coord-lng').value = landmark.lng;
        
        // Tick checkboxes automatically
        const checkboxes = form.querySelectorAll('input[name="card-mode"]');
        checkboxes.forEach(cb => {
            cb.checked = false;
            if (landmark.type === 'child' && cb.value === 'child-friendly') cb.checked = true;
            if (landmark.type === 'food' && cb.value === 'gourmet') cb.checked = true;
            if (landmark.duration >= 90 && cb.value === 'heavy') cb.checked = true;
            if ((landmark.cost === 'Ücretsiz' || landmark.cost === 'Free' || landmark.cost === '0') && cb.value === 'budget') cb.checked = true;
        });
        
        // Pan map smoothly to the selected landmark
        this.map.panTo([landmark.lat, landmark.lng]);
    }
    
    placeCustomPin(lat, lng) {
        const formPanel = this.element.querySelector('.form-panel');
        if (formPanel) formPanel.classList.add('expanded');

        // Remove existing custom pin
        if (this.customPinMarker) {
            this.map.removeLayer(this.customPinMarker);
        }

        const customPinHtml = `
            <div class="custom-map-marker custom-placement-marker">
                <div class="marker-dot"></div>
                <div class="marker-radar"></div>
            </div>
        `;

        const customPinIcon = L.divIcon({
            html: customPinHtml,
            className: 'custom-marker-icon-wrapper',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        this.customPinMarker = L.marker([lat, lng], { icon: customPinIcon }).addTo(this.map);
        
        // Fill form fields
        const form = this.element.querySelector('#card-creator-form');
        form.querySelector('#card-title').value = `${this.getTranslation('custom_point')} (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
        form.querySelector('#card-type').value = 'place';
        form.querySelector('#card-duration').value = 30;
        form.querySelector('#card-cost').value = 0;
        form.querySelector('#card-desc').value = this.getTranslation('custom_point_desc');
        form.querySelector('#coord-lat').value = lat;
        form.querySelector('#coord-lng').value = lng;

        // Reset checkboxed for new point
        form.querySelectorAll('input[name="card-mode"]').forEach(cb => cb.checked = false);

        // Center on the custom pin
        this.map.panTo([lat, lng]);
    }

    bindSliderEvents() {
        const slider = this.element.querySelector('#radius-slider');
        const display = this.element.querySelector('#radius-val-display');

        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            
            // Text display localization mapping
            let label = this.getTranslation('radius_all');
            if (val === 1) label = this.getTranslation('radius_500m');
            if (val === 2) label = this.getTranslation('radius_1km');
            if (val === 3) label = this.getTranslation('radius_3km');
            
            display.textContent = label;

            // Recalculate filtering
            const lat = this.selectedRadiusCenter[0];
            const lng = this.selectedRadiusCenter[1];
            this.applyRadiusFilter(lat, lng, val);

            if (this.options.onRadiusFilterApplied) {
                this.options.onRadiusFilterApplied(lat, lng, val);
            }
        });
    }

    applyRadiusFilter(lat, lng, val) {
        if (!this.map) return;

        // Remove previous circle
        if (this.radiusCircle) {
            this.map.removeLayer(this.radiusCircle);
            this.radiusCircle = null;
        }

        // Yarıçap değerleri (Metre cinsinden)
        let radiusMeters = 0;
        if (val === 1) radiusMeters = 500;
        if (val === 2) radiusMeters = 1000;
        if (val === 3) radiusMeters = 3000;

        if (radiusMeters === 0) {
            // Show all markers
            this.markersList.forEach(marker => {
                if (!this.markerCluster.hasLayer(marker)) {
                    this.markerCluster.addLayer(marker);
                }
            });
            return;
        }

        // Draw Discovery Radius Circle
        this.radiusCircle = L.circle([lat, lng], {
            radius: radiusMeters,
            color: 'var(--primary)',
            fillColor: 'var(--primary)',
            fillOpacity: 0.08,
            weight: 1.5,
            dashArray: '5, 5'
        }).addTo(this.map);

        // Filter markers based on Haversine distance on Earth
        this.markersList.forEach(marker => {
            const distance = this.map.distance([lat, lng], marker.getLatLng()); // returns distance in meters
            if (distance <= radiusMeters) {
                if (!this.markerCluster.hasLayer(marker)) {
                    this.markerCluster.addLayer(marker);
                }
            } else {
                if (this.markerCluster.hasLayer(marker)) {
                    this.markerCluster.removeLayer(marker);
                }
            }
        });
    }
    
    handleSubmit(form) {
        const modes = [];
        const checkboxes = form.querySelectorAll('input[name="card-mode"]:checked');
        checkboxes.forEach(cb => modes.push(cb.value));

        const latVal = parseFloat(form.querySelector('#coord-lat').value) || 41.8986;
        const lngVal = parseFloat(form.querySelector('#coord-lng').value) || 12.4769;
        
        const rawCost = parseFloat(form.querySelector('#card-cost').value) || 0;
        const formattedCost = rawCost === 0 ? this.getTranslation('free') : `${this.currency}${rawCost}`;

        const cardData = {
            id: 'map_card_' + Math.random().toString(36).substr(2, 9),
            title: form.querySelector('#card-title').value,
            type: form.querySelector('#card-type').value,
            time: form.querySelector('#card-time').value,
            duration: parseInt(form.querySelector('#card-duration').value, 10),
            cost: formattedCost,
            description: form.querySelector('#card-desc').value,
            modes: modes,
            location: `Roma, İtalya (Lat: ${latVal.toFixed(4)}, Lng: ${lngVal.toFixed(4)})`,
            rating: 4.8,
            votes: 0,
            completed: false,
            lat: latVal,
            lng: lngVal
        };
        
        if (this.options.onCardCreated) {
            this.options.onCardCreated(cardData);
        }
        
        // Clear custom pin from map
        if (this.customPinMarker) {
            this.map.removeLayer(this.customPinMarker);
            this.customPinMarker = null;
        }

        // Reset radius slider filter
        const slider = this.element.querySelector('#radius-slider');
        if (slider) {
            slider.value = 0;
            this.element.querySelector('#radius-val-display').textContent = this.getTranslation('radius_all');
            this.applyRadiusFilter(latVal, lngVal, 0);
        }
        
        form.reset();
        form.querySelector('#card-time').value = '10:00';
        form.querySelector('#card-cost').value = 0;
        form.querySelectorAll('.pt-badge-btn').forEach(btn => btn.classList.remove('active'));
    }

    updateMapTheme() {
        if (!this.map || !this.tileLayer) return;
        const isLight = document.body.classList.contains('light-mode') || document.documentElement.classList.contains('light-mode');
        const newUrl = isLight 
            ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        this.tileLayer.setUrl(newUrl);
    }

    bindLinkImportEvents(creatorDiv) {
        // Google Apps Script URL – resolves Google Maps short links server-side.
        // GAS uses Google's own infrastructure so bot detection never triggers.
        // This URL is not a secret: it has no billing or quota implications for callers.
        const GAS_RESOLVER_URL = 'https://script.google.com/macros/s/AKfycbxA0XCSIaDD3Q7iG7sJGxcQhVPa-j-brUXKxadcn8DgMsPCSe4pOVOto0gbSeJu3coykQ/exec';

        const input = creatorDiv.querySelector('#maps-import-url');
        const btn = creatorDiv.querySelector('#maps-import-btn');
        const statusMsg = creatorDiv.querySelector('#import-status-msg');

        if (!input || !btn || !statusMsg) return;

        const showStatus = (text, type) => {
            statusMsg.textContent = text;
            statusMsg.style.display = 'block';
            statusMsg.style.color = type === 'error'
                ? 'var(--text-danger, #ff4d4d)'
                : type === 'success'
                    ? 'var(--text-success, #2ecc71)'
                    : 'var(--text-muted, #8e44ad)';
            setTimeout(() => {
                if (statusMsg.textContent === text) statusMsg.style.display = 'none';
            }, 5000);
        };

        // Extract coords + place name from a long Google Maps URL using regex (zero network)
        const parseResolvedUrl = (resolvedUrl) => {
            const coordsMatch = resolvedUrl.match(/@([0-9.-]+),([0-9.-]+)/);
            if (!coordsMatch) return null;
            const lat = parseFloat(coordsMatch[1]);
            const lng = parseFloat(coordsMatch[2]);
            let placeName = this.getTranslation('custom_point');
            const placeMatch = resolvedUrl.match(/\/place\/([^\/@?]+)/);
            if (placeMatch && placeMatch[1]) {
                placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
            }
            return { lat, lng, placeName };
        };

        const handleImport = async () => {
            const url = input.value.trim();
            if (!url) return;

            if (!url.includes('maps.app.goo.gl') && !url.includes('google.com/maps') && !url.includes('maps.google')) {
                showStatus(this.getTranslation('parse_error'), 'error');
                return;
            }

            // PATH A: Long URL – coordinates already in URL, zero network requests
            const directCoordsMatch = url.match(/@([0-9.-]+),([0-9.-]+)/);
            if (directCoordsMatch) {
                const parsed = parseResolvedUrl(url);
                if (parsed) {
                    this._applyParsedLocation(parsed, input);
                    showStatus(this.getTranslation('parse_success'), 'success');
                }
                return;
            }

            // PATH B: Short URL (maps.app.goo.gl) – resolve via Google Apps Script
            showStatus(this.getTranslation('parsing_status'), 'info');
            btn.disabled = true;

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 12000);

                const res = await fetch(
                    `${GAS_RESOLVER_URL}?url=${encodeURIComponent(url)}`,
                    { signal: controller.signal }
                );
                clearTimeout(timeoutId);

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();

                // GAS returns { unshortened_url, contents }
                // Worker returns { ok, lat, lng, placeName }
                // Handle both formats:
                let parsed = null;

                if (data.unshortened_url) {
                    parsed = parseResolvedUrl(data.unshortened_url);
                }

                if (!parsed && data.lat != null && data.lng != null) {
                    parsed = {
                        lat: data.lat,
                        lng: data.lng,
                        placeName: data.placeName || this.getTranslation('custom_point')
                    };
                }

                if (parsed) {
                    // Attach rich metadata from GAS response
                    parsed.rating = data.rating;
                    parsed.reviews = data.reviews;
                    parsed.priceLevel = data.priceLevel;
                }

                if (!parsed) throw new Error(data.error || 'Could not extract coordinates');

                this._applyParsedLocation(parsed, input);
                showStatus(this.getTranslation('parse_success'), 'success');

            } catch (err) {
                console.error('Maps link resolver error:', err);
                showStatus(`${this.getTranslation('parse_error')} (${err.message})`, 'error');
            } finally {
                btn.disabled = false;
            }
        };

        btn.addEventListener('click', handleImport);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); handleImport(); }
        });
        input.addEventListener('paste', () => setTimeout(handleImport, 100));
    }

    bindQuickAccumulatorEvents(creatorDiv) {
        const durationInput = creatorDiv.querySelector('#card-duration');
        const costInput = creatorDiv.querySelector('#card-cost');
        
        const durationBadges = creatorDiv.querySelectorAll('.duration-accumulator .pt-badge-btn');
        const costBadges = creatorDiv.querySelectorAll('.cost-accumulator .pt-badge-btn');

        if (!durationInput || !costInput) return;

        // Helper: Calculate sum of active buttons
        const calculateSum = (badges) => {
            let total = 0;
            badges.forEach(btn => {
                if (btn.classList.contains('active')) {
                    total += parseInt(btn.getAttribute('data-value'), 10) || 0;
                }
            });
            return total;
        };

        // Duration badges click handler
        durationBadges.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const total = calculateSum(durationBadges);
                // If total is 0 (all inactive), return to default value 45
                durationInput.value = total > 0 ? total : 45;
            });
        });

        // Cost badges click handler
        costBadges.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const total = calculateSum(costBadges);
                costInput.value = total;
            });
        });

        // Keyboard input bypass: If user types manually, reset active badges selection
        durationInput.addEventListener('input', () => {
            durationBadges.forEach(btn => btn.classList.remove('active'));
        });

        costInput.addEventListener('input', () => {
            costBadges.forEach(btn => btn.classList.remove('active'));
        });
    }

    bindBottomSheetEvents(creatorDiv) {
        const handle = creatorDiv.querySelector('.bottom-sheet-handle-wrapper');
        const formPanel = creatorDiv.querySelector('.form-panel');

        if (!handle || !formPanel) return;

        // Toggle expanded status when clicking the handle
        handle.addEventListener('click', () => {
            formPanel.classList.toggle('expanded');
        });
    }

    /** Shared helper: pin the map, fill the form, fire onLandmarkSelected */
    _applyParsedLocation({ lat, lng, placeName, rating, reviews, priceLevel }, inputEl) {
        this.placeCustomPin(lat, lng);
        const form = this.element.querySelector('#card-creator-form');
        
        let descText = '';
        if (rating) {
            descText += `Puan: ${rating} ★`;
            if (reviews) descText += ` (${reviews} yorum)`;
        }
        if (priceLevel) {
            descText += descText ? ` | Fiyat: ${priceLevel}` : `Fiyat: ${priceLevel}`;
        }

        if (form) {
            form.querySelector('#card-title').value = placeName;
            if (descText) {
                form.querySelector('#card-desc').value = descText;
            }
        }
        if (inputEl) inputEl.value = '';
        if (this.options.onLandmarkSelected) {
            this.options.onLandmarkSelected({
                name: placeName, lat, lng,
                type: 'place', cost: priceLevel || 'Ücretsiz', duration: 30, desc: descText
            });
        }
    }
}

// Add Stylesheets dynamically to support Leaflet, glassmorphism clustering, and markers
const creatorStyle = document.createElement('style');
creatorStyle.textContent = `
    .creator-layout {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 1.5rem;
        width: 100%;
    }
    
    @media (max-width: 900px) {
        .creator-layout {
            grid-template-columns: 1fr;
        }
    }
    
    .panel-title {
        font-size: 1.25rem;
        margin-bottom: 0.25rem;
        font-family: var(--font-heading);
    }
    
    .panel-subtitle {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 1.25rem;
    }
    
    .map-canvas-wrapper {
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--border-color);
        background: #090d16;
        position: relative;
    }

    /* Override Leaflet UI to fit core.css */
    .leaflet-container {
        background: #090d16 !important;
        font-family: var(--font-body) !important;
    }
    
    .leaflet-bar {
        border: 1px solid var(--border-color) !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        border-radius: 6px !important;
        overflow: hidden;
    }

    .leaflet-bar a {
        background-color: var(--bg-card) !important;
        color: var(--text-primary) !important;
        border-bottom: 1px solid var(--border-color) !important;
        transition: var(--transition) !important;
    }

    .leaflet-bar a:hover {
        background-color: var(--primary) !important;
        color: #fff !important;
    }

    .leaflet-popup-content-wrapper {
        background: rgba(15, 23, 42, 0.95) !important;
        backdrop-filter: blur(12px) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: var(--radius-md) !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.7) !important;
        padding: 4px;
    }

    .leaflet-popup-tip {
        background: rgba(15, 23, 42, 0.95) !important;
        border-left: 1px solid var(--border-color) !important;
        border-bottom: 1px solid var(--border-color) !important;
    }

    .leaflet-popup-close-button {
        color: var(--text-muted) !important;
        padding: 8px !important;
    }

    .leaflet-popup-close-button:hover {
        color: #fff !important;
    }

    /* Glassmorphism Marker Clustering Styling */
    .custom-cluster-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .glass-cluster {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        font-family: var(--font-heading);
        color: #fff;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: all 0.3s ease;
    }

    .glass-cluster:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
    }

    .cluster-small {
        background: rgba(59, 130, 246, 0.25);
        border: 2px solid rgba(59, 130, 246, 0.6);
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
    }

    .cluster-medium {
        background: rgba(139, 92, 246, 0.25);
        border: 2px solid rgba(139, 92, 246, 0.6);
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
    }

    .cluster-large {
        background: rgba(236, 72, 153, 0.25);
        border: 2px solid rgba(236, 72, 153, 0.6);
        box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
    }

    /* Custom Leaflet Marker Styling */
    .custom-marker-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .custom-map-marker {
        position: relative;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 8px rgba(0,0,0,0.5);
        transition: all 0.3s ease;
    }

    .custom-map-marker:hover {
        transform: scale(1.25);
        z-index: 1000;
    }

    .marker-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
    }

    .marker-radar {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 50%;
        border: 1px solid inherit;
        opacity: 0.4;
        animation: markerRadarPulse 2s infinite ease-out;
        pointer-events: none;
    }

    @keyframes markerRadarPulse {
        0% { transform: scale(0.6); opacity: 0.8; }
        100% { transform: scale(1.8); opacity: 0; }
    }

    /* Category marker colors matching core.css colors */
    .place-marker { background: #3b82f6; border-color: #93c5fd; }
    .place-marker .marker-radar { border-color: #3b82f6; }
    
    .food-marker { background: #f43f5e; border-color: #fca5a5; }
    .food-marker .marker-radar { border-color: #f43f5e; }
    
    .coffee-marker { background: #10b981; border-color: #6ee7b7; }
    .coffee-marker .marker-radar { border-color: #10b981; }
    
    .shop-marker { background: #ec4899; border-color: #fbcfe8; }
    .shop-marker .marker-radar { border-color: #ec4899; }
    
    .photo-marker { background: #eab308; border-color: #fef08a; }
    .photo-marker .marker-radar { border-color: #eab308; }

    .child-marker { background: #8b5cf6; border-color: #ddd6fe; }
    .child-marker .marker-radar { border-color: #8b5cf6; }

    /* Custom Custom Pin placement marker */
    .custom-placement-marker {
        background: #ec4899;
        border-color: #fff;
        width: 18px;
        height: 18px;
        animation: customPinJump 0.5s ease-out;
    }

    .custom-placement-marker .marker-dot {
        width: 8px;
        height: 8px;
        background: #fff;
    }

    .custom-placement-marker .marker-radar {
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
        border-color: #ec4899;
    }

    @keyframes customPinJump {
        0% { transform: translateY(-20px); opacity: 0; }
        50% { transform: translateY(5px); }
        100% { transform: translateY(0); opacity: 1; }
    }
    
    .creator-form {
        display: flex;
        flex-direction: column;
    }
    
    .form-row {
        display: flex;
        gap: 0.75rem;
    }
    
    .col-6 {
        flex: 1;
    }
    
    .checkbox-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
        background: rgba(0,0,0,0.15);
        border: 1px solid var(--border-color);
        padding: 0.75rem;
        border-radius: 6px;
    }
    
    .checkbox-label {
        font-size: 0.8rem;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 0.35rem;
        cursor: pointer;
        user-select: none;
    }
    
    .checkbox-label input {
        cursor: pointer;
    }
    
    .full-width {
        width: 100%;
        margin-top: 0.5rem;
    }

    /* Range slider override */
    .pt-range {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: rgba(255,255,255,0.1);
        outline: none;
        margin: 0.5rem 0;
        transition: background 0.3s;
    }

    .pt-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--primary);
        cursor: pointer;
        box-shadow: 0 0 8px var(--primary);
        transition: transform 0.1s, background 0.3s;
    }

    .pt-range::-webkit-slider-thumb:hover {
        transform: scale(1.2);
    }

    /* Accumulation quick badges */
    .pt-badge-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.2rem 0.45rem;
        font-size: 0.72rem;
        border-radius: 4px;
        cursor: pointer;
        font-family: var(--font-body);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        outline: none;
    }
    
    .pt-badge-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        border-color: rgba(255, 255, 255, 0.2);
    }
    
    .pt-badge-btn.active {
        background: var(--primary);
        border-color: var(--primary);
        color: #fff;
        box-shadow: 0 0 8px var(--primary-glow, rgba(139, 92, 246, 0.4));
    }

    /* Bottom Sheet Handle Styling (Desktop hides it) */
    .bottom-sheet-handle-wrapper {
        display: none;
    }

    /* Mobile Responsive styling for Bottom Sheet Layout */
    @media (max-width: 600px) {
        .creator-layout {
            grid-template-columns: 1fr;
            position: relative;
            height: 480px; /* fixed fallback height for playground layout */
            overflow: hidden;
        }

        .map-panel {
            height: 100%;
            margin-bottom: 0;
            padding: 0.2rem !important;
        }

        #pt-leaflet-map {
            height: 100% !important;
            min-height: 450px;
        }

        /* Hide map header panel elements to save space on mobile */
        .map-panel-header, .radius-filter-panel {
            display: none !important;
        }

        .form-panel {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2500;
            background: rgba(15, 23, 42, 0.96) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 16px 16px 0 0 !important;
            padding: 1.25rem 1.25rem 2.5rem 1.25rem !important;
            box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.8) !important;
            transform: translateY(calc(100% - 68px)); /* Minibar size */
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            margin: 0 !important;
        }

        .form-panel.expanded {
            transform: translateY(0) !important;
            overflow-y: auto;
            max-height: 75vh;
        }

        /* Prevent iOS Safari auto-zoom on inputs */
        .form-panel .pt-input, 
        .form-panel select, 
        .form-panel textarea {
            font-size: 16px !important;
        }

        .bottom-sheet-handle-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 20px;
            margin-top: -8px;
            margin-bottom: 8px;
            cursor: pointer;
        }

        .bottom-sheet-handle {
            width: 40px;
            height: 5px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 3px;
            transition: background 0.3s;
        }

        .bottom-sheet-handle-wrapper:hover .bottom-sheet-handle {
            background: rgba(255, 255, 255, 0.4);
        }
    }
`;
document.head.appendChild(creatorStyle);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapCardCreator;
} else {
    window.MapCardCreator = MapCardCreator;
}

