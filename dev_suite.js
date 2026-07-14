/**
 * PlanTatil 2.0 DevSuite Javascript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if data is loaded
    if (typeof PLAN_TATIL_MODULES === 'undefined') {
        console.error("Error: PLAN_TATIL_MODULES data is not loaded.");
        return;
    }

    // Coordinates for graph nodes (spaced visually for 1100x600 SVG viewBox)
    const nodeCoords = {
        "dokuman_amaci": { x: 100, y: 70 },
        "urun_vizyonu": { x: 300, y: 70 },
        "kullanici_problemi": { x: 500, y: 70 },
        "urun_felsefesi": { x: 700, y: 70 },
        "kullanici_tipleri": { x: 900, y: 70 },
        
        "gezi_kartlari": { x: 200, y: 200 },
        "harita_ekrani": { x: 800, y: 200 },
        
        "plan_kopyalama": { x: 150, y: 320 },
        "grup_paylasimi": { x: 500, y: 200 },
        
        "ortak_plan": { x: 420, y: 320 },
        "gunluk_akis": { x: 280, y: 320 },
        "ilham_planlari": { x: 100, y: 440 },
        "oylamali_oneri": { x: 550, y: 320 },
        
        "haritadan_plana": { x: 900, y: 320 },
        "zaman_cizelgesi": { x: 680, y: 320 },
        
        "plan_dnasi": { x: 250, y: 440 },
        "yapay_zeka": { x: 450, y: 460 },
        "teknik_park": { x: 850, y: 440 },
        "urun_ozeti": { x: 1000, y: 200 }
    };

    // Playgrounds mapping
    const playgrounds = {
        "gezi_kartlari": "src/playgrounds/travel-card-playground.html",
        "haritadan_plana": "src/playgrounds/map-card-creator-playground.html",
        "harita_ekrani": "src/playgrounds/map-card-creator-playground.html",
        "zaman_cizelgesi": "src/playgrounds/travel-card-playground.html",
        "plan_kopyalama": "src/playgrounds/travel-card-playground.html"
    };

    // Load criteria checked state from localStorage
    let checkedState = JSON.parse(localStorage.getItem('plantatil_criteria_states') || '{}');
    
    let activeModuleId = null;
    let activeFilter = 'all';
    let searchQuery = '';

    // Initialize module percentage calculations
    PLAN_TATIL_MODULES.forEach(mod => {
        // If they have criteria, we override percentage based on checks
        if (mod.criteria && mod.criteria.length > 0) {
            if (!checkedState[mod.id]) {
                // Initialize default checklist state: if YAML percentage is high, we check some boxes
                const defaultCheckedCount = Math.round((mod.percentage / 100) * mod.criteria.length);
                const checks = [];
                for (let i = 0; i < mod.criteria.length; i++) {
                    checks.push(i < defaultCheckedCount);
                }
                checkedState[mod.id] = checks;
            }
            
            // Recalculate percentage
            const checkedCount = checkedState[mod.id].filter(Boolean).length;
            mod.percentage = Math.round((checkedCount / mod.criteria.length) * 100);
            
            // Update status based on percentage
            if (mod.percentage === 100) mod.status = 'completed';
            else if (mod.percentage > 0) mod.status = 'in_progress';
        } else {
            // For modules with no criteria (e.g. index/table of contents)
            if (mod.percentage === 100) mod.status = 'completed';
        }
    });
    
    // Save updated initialized state back to storage
    localStorage.setItem('plantatil_criteria_states', JSON.stringify(checkedState));

    // Calculate Dashboard Global Metrics
    function updateGlobalMetrics() {
        let totalPercentage = 0;
        let completedCount = 0;
        let progressCount = 0;
        let plannedCount = 0;
        
        let totalCriteria = 0;
        let completedCriteria = 0;
        
        PLAN_TATIL_MODULES.forEach(mod => {
            totalPercentage += mod.percentage;
            
            if (mod.status === 'completed') completedCount++;
            else if (mod.status === 'in_progress') progressCount++;
            else if (mod.status === 'planned') plannedCount++;
            
            if (mod.criteria && mod.criteria.length > 0) {
                totalCriteria += mod.criteria.length;
                if (checkedState[mod.id]) {
                    completedCriteria += checkedState[mod.id].filter(Boolean).length;
                }
            }
        });
        
        const globalProgress = Math.round(totalPercentage / PLAN_TATIL_MODULES.length);
        
        // Update Circular Progress
        const circle = document.getElementById('project-progress-circle');
        const text = document.getElementById('project-progress-text');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (globalProgress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        text.textContent = `${globalProgress}%`;
        
        // Update ratios and badges
        document.getElementById('checked-criteria-ratio').textContent = `${completedCriteria}/${totalCriteria} kriter tamamlandı`;
        document.getElementById('count-completed').textContent = completedCount;
        document.getElementById('count-progress').textContent = progressCount;
        document.getElementById('count-planned').textContent = plannedCount;
    }

    // Sidebar lists rendering
    const moduleNavList = document.getElementById('module-nav-list');
    
    function renderSidebarList() {
        moduleNavList.innerHTML = '';
        
        const filteredModules = PLAN_TATIL_MODULES.filter(mod => {
            // Exclude icindekiler from navigation to keep it clean
            if (mod.id === 'icindekiler') return false;
            
            // Search query filter
            const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  mod.id.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Status chip filter
            let matchesStatus = true;
            if (activeFilter !== 'all') {
                matchesStatus = (mod.status === activeFilter);
            }
            
            return matchesSearch && matchesStatus;
        });
        
        if (filteredModules.length === 0) {
            moduleNavList.innerHTML = `<li class="empty-select-message" style="padding: 1rem 0;">Sonuç bulunamadı</li>`;
            return;
        }
        
        filteredModules.forEach(mod => {
            const li = document.createElement('li');
            li.className = `module-nav-item ${activeModuleId === mod.id ? 'active' : ''}`;
            li.setAttribute('data-id', mod.id);
            
            li.innerHTML = `
                <div class="item-top">
                    <span class="item-title" title="${mod.title}">${mod.title}</span>
                    <span class="item-status-dot ${mod.status}"></span>
                </div>
                <div class="item-progress-row">
                    <div class="item-progress-outer">
                        <div class="item-progress-inner" style="width: ${mod.percentage}%;"></div>
                    </div>
                    <span class="item-progress-val">${mod.percentage}%</span>
                </div>
            `;
            
            li.addEventListener('click', () => {
                selectModule(mod.id);
            });
            
            moduleNavList.appendChild(li);
        });
    }

    // SVG Node graph builder
    const linksGroup = document.getElementById('graph-links-group');
    const nodesGroup = document.getElementById('graph-nodes-group');
    
    function renderDependencyGraph() {
        linksGroup.innerHTML = '';
        nodesGroup.innerHTML = '';
        
        // Define paths & lines for dependencies
        const activeMod = PLAN_TATIL_MODULES.find(m => m.id === activeModuleId);
        
        PLAN_TATIL_MODULES.forEach(mod => {
            const startCoords = nodeCoords[mod.id];
            if (!startCoords) return;
            
            if (mod.dependencies && mod.dependencies.length > 0) {
                mod.dependencies.forEach(depId => {
                    const endCoords = nodeCoords[depId];
                    if (!endCoords) return;
                    
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("class", `graph-edge edge-from-${depId} edge-to-${mod.id}`);
                    
                    // Bezier curves look premium
                    const dx = startCoords.x - endCoords.x;
                    const dy = startCoords.y - endCoords.y;
                    const cx1 = endCoords.x + dx * 0.25;
                    const cy1 = endCoords.y + dy * 0.75;
                    const cx2 = endCoords.x + dx * 0.75;
                    const cy2 = endCoords.y + dy * 0.25;
                    
                    path.setAttribute("d", `M ${endCoords.x} ${endCoords.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${startCoords.x} ${startCoords.y}`);
                    path.setAttribute("marker-end", "url(#arrow)");
                    
                    linksGroup.appendChild(path);
                });
            }
        });
        
        // Draw Nodes
        PLAN_TATIL_MODULES.forEach(mod => {
            const coords = nodeCoords[mod.id];
            if (!coords) return;
            
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute("class", `graph-node ${mod.status} ${activeModuleId === mod.id ? 'active' : ''}`);
            g.setAttribute("data-id", mod.id);
            g.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
            
            // Outer glowing ring & base shape
            g.innerHTML = `
                <circle cx="0" cy="0" r="18" class="node-bg"></circle>
                <circle cx="12" cy="-12" r="4" class="node-badge-circle"></circle>
                <text x="0" y="32" text-anchor="middle" class="node-title">${mod.title.split(' ve ')[0].split(' / ')[0].substr(0,18)}</text>
                <text x="0" y="44" text-anchor="middle" class="node-subtitle">${mod.percentage}%</text>
            `;
            
            // Node clicks selects module
            g.addEventListener('click', () => {
                selectModule(mod.id);
            });
            
            // Mouse hover highlights paths
            g.addEventListener('mouseenter', () => {
                // Thicken outgoing dependency links
                document.querySelectorAll(`.edge-from-${mod.id}`).forEach(el => {
                    el.classList.add('active');
                    el.setAttribute("marker-end", "url(#arrow-active)");
                });
                // Thicken incoming dependency links
                document.querySelectorAll(`.edge-to-${mod.id}`).forEach(el => {
                    el.classList.add('active');
                    el.setAttribute("marker-end", "url(#arrow-active)");
                });
            });
            
            g.addEventListener('mouseleave', () => {
                document.querySelectorAll('.graph-edge').forEach(el => {
                    el.classList.remove('active');
                    el.setAttribute("marker-end", "url(#arrow)");
                });
            });
            
            nodesGroup.appendChild(g);
        });
    }

    // Select module handler
    function selectModule(moduleId) {
        activeModuleId = moduleId;
        
        const mod = PLAN_TATIL_MODULES.find(m => m.id === moduleId);
        if (!mod) return;
        
        // Update active class in sidebar items
        document.querySelectorAll('.module-nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('data-id') === moduleId) {
                el.classList.add('active');
            }
        });
        
        // Highlight in graph
        document.querySelectorAll('.graph-node').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('data-id') === moduleId) {
                el.classList.add('active');
            }
        });
        
        // Populate Tab 2: Documentation
        document.getElementById('selected-module-title').textContent = mod.title;
        
        const badge = document.getElementById('selected-module-badge');
        badge.className = `pt-badge pt-badge-${mod.status === 'completed' ? 'completed' : mod.status === 'in_progress' ? 'progress' : 'planned'}`;
        badge.textContent = mod.status.replace("_", " ").toUpperCase();
        
        document.getElementById('selected-module-progress-bar').style.width = `${mod.percentage}%`;
        document.getElementById('selected-module-progress-text').textContent = `${mod.percentage}%`;
        
        document.getElementById('module-document-content').innerHTML = mod.html;
        
        // Populate Tab 3: Checklist
        renderChecklist(mod);
        
        // Populate Tab 4: Component Sandbox iframe
        const sandboxFrameContainer = document.getElementById('sandbox-frame-container');
        const sandboxSubtitle = document.getElementById('sandbox-component-subtitle');
        const sandboxTitle = document.getElementById('sandbox-component-title');
        const tabSandboxBtn = document.getElementById('tab-sandbox-btn');
        
        const playUrl = playgrounds[mod.id];
        
        if (playUrl) {
            sandboxTitle.textContent = `${mod.title} Sandbox Oyun Alanı`;
            sandboxSubtitle.textContent = `Bileşen URL'si: /${playUrl}. Bağımsız çalışmaktadır.`;
            
            const iframe = document.createElement('iframe');
            iframe.className = 'sandbox-iframe';
            iframe.src = playUrl;
            iframe.onload = () => {
                const isLight = document.body.classList.contains('light-mode');
                if (isLight && iframe.contentDocument && iframe.contentDocument.body) {
                    iframe.contentDocument.body.classList.add('light-mode');
                    setTimeout(() => {
                        const iframeWindow = iframe.contentWindow;
                        if (iframeWindow && iframeWindow.creator && typeof iframeWindow.creator.updateMapTheme === 'function') {
                            iframeWindow.creator.updateMapTheme();
                        }
                    }, 200);
                }
            };
            sandboxFrameContainer.innerHTML = '';
            sandboxFrameContainer.appendChild(iframe);
            tabSandboxBtn.style.display = 'flex';
        } else {
            tabSandboxBtn.style.display = 'none';
            // Switch tabs if active tab was sandbox and it got hidden
            const activeTabBtn = document.querySelector('.tab-btn.active');
            if (activeTabBtn && activeTabBtn.getAttribute('data-tab') === 'sandbox-tab') {
                switchTab('graph-tab');
            }
            
            sandboxFrameContainer.innerHTML = `
                <div class="no-sandbox-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17v-4M15 17v-8M12 17v-6"/></svg>
                    <p>Bu Modülün Görsel Oyun Alanı Yok</p>
                    <span>"${mod.title}" mimari veya dokümantasyonel bir modüldür. Frontend görsel oyun alanına ihtiyaç duymaz.</span>
                </div>
            `;
        }
    }

    // Render checklist for selected module
    const checklistContainer = document.getElementById('criteria-checklist-container');
    
    function renderChecklist(module) {
        checklistContainer.innerHTML = '';
        
        if (!module.criteria || module.criteria.length === 0) {
            checklistContainer.innerHTML = `<p class="empty-select-message">Bu modül için yazılmış bir geliştirme kriteri bulunmuyor.</p>`;
            return;
        }
        
        const checks = checkedState[module.id] || [];
        
        module.criteria.forEach((crit, index) => {
            const isChecked = checks[index] || false;
            
            const div = document.createElement('div');
            div.className = `criteria-item ${isChecked ? 'checked' : ''}`;
            
            div.innerHTML = `
                <input type="checkbox" id="check-${module.id}-${index}" ${isChecked ? 'checked' : ''}>
                <label class="criteria-text" for="check-${module.id}-${index}">${crit}</label>
            `;
            
            // Checkbox change listener
            const checkbox = div.querySelector('input');
            checkbox.addEventListener('change', () => {
                const checked = checkbox.checked;
                div.classList.toggle('checked', checked);
                
                // Save state
                checkedState[module.id][index] = checked;
                localStorage.setItem('plantatil_criteria_states', JSON.stringify(checkedState));
                
                // Recalculate module percentage
                const total = module.criteria.length;
                const completed = checkedState[module.id].filter(Boolean).length;
                module.percentage = Math.round((completed / total) * 100);
                
                // Update module status
                if (module.percentage === 100) module.status = 'completed';
                else if (module.percentage > 0) module.status = 'in_progress';
                else module.status = 'planned';
                
                // Update views
                updateGlobalMetrics();
                renderSidebarList();
                
                // Update details badge/progress
                document.getElementById('selected-module-progress-bar').style.width = `${module.percentage}%`;
                document.getElementById('selected-module-progress-text').textContent = `${module.percentage}%`;
                
                const badge = document.getElementById('selected-module-badge');
                badge.className = `pt-badge pt-badge-${module.status === 'completed' ? 'completed' : module.status === 'in_progress' ? 'progress' : 'planned'}`;
                badge.textContent = module.status.replace("_", " ").toUpperCase();
                
                // Re-render SVG node values without redrawing entire graph to prevent jumpiness
                const nodeGroup = document.querySelector(`.graph-node[data-id="${module.id}"]`);
                if (nodeGroup) {
                    nodeGroup.className.baseVal = `graph-node ${module.status} active`;
                    const subtitle = nodeGroup.querySelector('.node-subtitle');
                    if (subtitle) subtitle.textContent = `${module.percentage}%`;
                }
            });
            
            checklistContainer.appendChild(div);
        });
    }

    // Tabs toggle handler
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    function switchTab(tabId) {
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            }
        });
        
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === tabId) {
                panel.classList.add('active');
            }
        });
        
        // Re-render graph if switching to it to ensure proper coordinates layout
        if (tabId === 'graph-tab') {
            renderDependencyGraph();
        }
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Sidebar search and filters
    const searchInput = document.getElementById('module-search');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderSidebarList();
    });
    
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            activeFilter = chip.getAttribute('data-status');
            renderSidebarList();
        });
    });

    // Initial setup
    updateGlobalMetrics();
    renderSidebarList();
    renderDependencyGraph();
    
    // Theme initialization & Toggle
    const savedTheme = localStorage.getItem('plantatil_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('plantatil_theme', isLight ? 'light' : 'dark');
            
            // Sync with active sandbox iframe if any (handled with try-catch for local CORS bypass)
            const iframe = document.querySelector('.sandbox-iframe');
            if (iframe) {
                try {
                    if (iframe.contentDocument && iframe.contentDocument.body) {
                        iframe.contentDocument.body.classList.toggle('light-mode', isLight);
                        const iframeWindow = iframe.contentWindow;
                        if (iframeWindow && iframeWindow.creator && typeof iframeWindow.creator.updateMapTheme === 'function') {
                            iframeWindow.creator.updateMapTheme();
                        }
                    } else {
                        iframe.src = iframe.src;
                    }
                } catch (e) {
                    // Fallback to reloading iframe if file:/// protocol blocks direct frame access
                    iframe.src = iframe.src;
                }
            }
        });
    }

    // Select first module as default
    const firstMod = PLAN_TATIL_MODULES.find(m => m.id !== 'icindekiler');
    if (firstMod) {
        selectModule(firstMod.id);
    }
});
