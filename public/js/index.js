// ============ TAILWIND CONFIG ============
tailwind.config = {
  theme: {
    extend: {
      colors: {
        cedar: {
          50: '#faf6f0',
          100: '#f0e8d8',
          200: '#d9c9a8',
          300: '#b89a6b',
          400: '#9a7a4f',
          500: '#7a5e3c',
          600: '#5c4529',
          700: '#43321d',
          800: '#2d2113',
          900: '#1a130b',
        },
        forest: {
          50: '#f2f5f2',
          500: '#3d4a3a',
          700: '#2a332a',
          800: '#1f2620',
          900: '#141a15',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
};
// ============ DADOS ============
const cabins = [
  { id: 'c1', name: 'Cabana Ipê', category: 'standard', catLabel: 'Clássica', price: 780, capacity: 2, img: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80', desc: 'Aconchego em meio à mata, com lareira e deck privativo.', features: ['Lareira a lenha', 'Banheira dupla', 'Deck com rede', 'Café da manhã'] },
  { id: 'c2', name: 'Cabana Araucária', category: 'premium', catLabel: 'Premium', price: 1280, capacity: 2, img: 'https://images.unsplash.com/photo-1618767689160-da3fb810aad7?auto=format&fit=crop&w=800&q=80', desc: 'Vista panorâmica da serra com ofurô externo aquecido.', features: ['Ofurô externo', 'Lareira', 'Vista panorâmica', 'Jantar incluso'] },
  { id: 'c3', name: 'Cabana Canela', category: 'premium', catLabel: 'Premium', price: 1380, capacity: 2, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', desc: 'Arquitetura em madeira nobre com piscina aquecida privativa.', features: ['Piscina aquecida', 'Sauna seca', 'Lareira', 'Mordomo 24h'] },
  { id: 'c4', name: 'Cabana Sequoia', category: 'luxo', catLabel: 'Luxo', price: 1890, capacity: 2, img: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80', desc: 'Suíte suspensa com vista 180° e spa privativo.', features: ['Spa privativo', 'Adega exclusiva', 'Chef privativo', 'Heliponto'] },
  { id: 'c5', name: 'Cabana Jequitibá', category: 'master', catLabel: 'Master Suite', price: 2890, capacity: 2, img: 'https://images.unsplash.com/photo-1601918774946-25832a444939?auto=format&fit=crop&w=800&q=80', desc: 'A experiência suprema: dois pavimentos, cinema e observatório.', features: ['Observatório', 'Cinema privativo', 'Piscina infinita', 'Butler dedicado'] },
  { id: 'c6', name: 'Cabana Jatobá', category: 'standard', catLabel: 'Clássica', price: 820, capacity: 2, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', desc: 'Charme rústico com varanda e lareira a lenha.', features: ['Lareira a lenha', 'Varanda', 'Rede', 'Café artesanal'] },
];
// Bookings in localStorage
function getBookings() { return JSON.parse(localStorage.getItem('fc_bookings') || '[]'); }
function saveBookings(b) { localStorage.setItem('fc_bookings', JSON.stringify(b)); }

// Preload some bookings for demo
if (getBookings().length === 0) {
  const today = new Date();
  const sample = [
    { code: 'FC-00001', cabinId: 'c5', name: 'Ana Silva', checkin: formatDate(addDays(today, 5)), checkout: formatDate(addDays(today, 8)), total: 8670, status: 'confirmed', method: 'credit' },
    { code: 'FC-00002', cabinId: 'c2', name: 'Carlos Mendes', checkin: formatDate(addDays(today, 10)), checkout: formatDate(addDays(today, 13)), total: 3840, status: 'confirmed', method: 'pix' },
  ];
  saveBookings(sample);
}

function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function formatDate(d) { return d.toISOString().split('T')[0]; }
function parseDate(s) { return new Date(s + 'T00:00:00'); }

function isCabinAvailable(cabinId, checkin, checkout, excludeCode = null) {
  const c = parseDate(checkin), co = parseDate(checkout);
  if (c >= co) return false;
  const bookings = getBookings();
  for (const b of bookings) {
    if (b.status !== 'confirmed') continue;
    if (b.cabinId !== cabinId) continue;
    if (excludeCode && b.code === excludeCode) continue;
    const bc = parseDate(b.checkin), bco = parseDate(b.checkout);
    if (c < bco && co > bc) return false;
  }
  return true;
}

// ============ RENDER CABANAS ============
let currentFilter = 'all';
function renderCabins() {
  const grid = document.getElementById('cabinsGrid');
  const filtered = currentFilter === 'all' ? cabins : cabins.filter(c => c.category === currentFilter);
  grid.innerHTML = filtered.map(c => `
    <div class="cabin-card bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group">
      <div class="relative overflow-hidden h-64">
        <img src="${c.img}" alt="${c.name}" class="cabin-img w-full h-full object-cover">
        <div class="absolute top-4 left-4 bg-forest-900/80 text-cedar-200 text-xs px-3 py-1 rounded-full uppercase tracking-wider">${c.catLabel}</div>
      </div>
      <div class="p-6">
        <h3 class="font-serif text-2xl text-forest-900 mb-2">${c.name}</h3>
        <p class="text-forest-700/70 text-sm mb-4 leading-relaxed">${c.desc}</p>
        <div class="flex flex-wrap gap-2 mb-5">
          ${c.features.slice(0, 3).map(f => `<span class="text-xs bg-cedar-100 text-cedar-700 px-2 py-1 rounded-full">${f}</span>`).join('')}
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-cedar-100">
          <div>
            <div class="text-xs text-forest-700/60">A partir de</div>
            <div class="font-serif text-2xl text-cedar-500">R$ ${c.price.toLocaleString('pt-BR')}<span class="text-xs text-forest-700/60 font-sans">/noite</span></div>
          </div>
          <button onclick="openBooking('${c.id}')" class="bg-forest-800 hover:bg-forest-900 text-white px-5 py-2.5 rounded-full text-sm transition">Reservar</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCabins(f) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-forest-800', 'text-white', 'border-forest-800'));
  event.target.classList.add('active', 'bg-forest-800', 'text-white', 'border-forest-800');
  renderCabins();
}

