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
  { 
    id: 'c1', name: 'Cabana Ipê', category: 'classica', catLabel: 'Clássica', price: 780, capacity: 2, 
    img: 'img/ipe.jpg', 
    desc: 'Aconchego em meio à mata, com lareira e deck privativo.', 
    features: ['Lareira a lenha', 'Banheira dupla', 'Deck com rede', 'Café da manhã'] 
  },
  { 
    id: 'c2', name: 'Cabana Jatobá', category: 'classica', catLabel: 'Clássica', price: 820, capacity: 2, 
    img: 'img/jatoba.jpg', 
    desc: 'Charme rústico com varanda e lareira a lenha.', 
    features: ['Lareira a lenha', 'Varanda', 'Rede', 'Café artesanal'] 
  },
  { 
    id: 'c3', name: 'Cabana Araucária', category: 'superior', catLabel: 'Superior', price: 1280, capacity: 2, 
    img: 'img/araucaria.jpg', 
    desc: 'Vista panorâmica da serra com ofurô externo aquecido.', 
    features: ['Ofurô externo', 'Lareira', 'Vista panorâmica', 'Jantar incluso'] 
  },
  { 
    id: 'c4', name: 'Cabana Sequoia', category: 'superior', catLabel: 'Superior', price: 1890, capacity: 2, 
    img: 'img/sequoia.jpg', 
    desc: 'Charmosa cabana de madeira com lareira, varanda e vista para o bosque.', 
    features: ['Spa privativo', 'Adega exclusiva', 'Chef privativo', 'Heliponto'] 
  },
  { 
    id: 'c5', name: 'Cabana Canela', category: 'premium', catLabel: 'Premium', price: 1380, capacity: 2, 
    img: 'img/canela.jpg', 
    desc: 'Arquitetura em madeira nobre com piscina aquecida privativa.', 
    features: ['Piscina aquecida', 'Sauna seca', 'Lareira', 'Mordomo 24h'] 
  },
  { 
    id: 'c6', name: 'Cabana Jequitibá', category: 'premium', catLabel: 'Premium', price: 2890, capacity: 2, 
    img: 'img/jequitiba.jpg', 
    desc: 'A experiência suprema: dois pavimentos, cinema e observatório.', 
    features: ['Observatório', 'Cinema privativo', 'Piscina infinita', 'Butler dedicado'] 
  }
];
// Bookings in localStorage
function getBookings() { return JSON.parse(localStorage.getItem('fc_bookings') || '[]'); }
function saveBookings(b) { localStorage.setItem('fc_bookings', JSON.stringify(b)); }

// Preload some bookings for demo
if (getBookings().length === 0) {
  const today = new Date();
  const sample = [
    { code: 'FC-00001', cabinId: 'c6', name: 'Ana Silva', checkin: formatDate(addDays(today, 5)), checkout: formatDate(addDays(today, 8)), total: 9103, status: 'confirmed', method: 'credit' },
    { code: 'FC-00002', cabinId: 'c3', name: 'Carlos Mendes', checkin: formatDate(addDays(today, 10)), checkout: formatDate(addDays(today, 13)), total: 4032, status: 'confirmed', method: 'pix' },
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
// ============ DISPONIBILIDADE ============
function searchAvailability() {
  const cin = document.getElementById('checkin').value;
  const cout = document.getElementById('checkout').value;
  if (!cin || !cout) return showToast('Selecione as datas', 'error');
  const available = cabins.filter(c => isCabinAvailable(c.id, cin, cout));
  if (available.length === 0) {
    showToast('Nenhuma cabana disponível nesse período. Tente outras datas.', 'error');
  } else {
    showToast(`${available.length} cabana(s) disponível(is) no período! Veja abaixo.`, 'success');
    document.getElementById('cabanas').scrollIntoView({ behavior: 'smooth' });
    const grid = document.getElementById('cabinsGrid');
    grid.innerHTML = '';
    available.forEach(c => {
      const el = document.createElement('div');
      el.innerHTML = `
        <div class="cabin-card bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition ring-2 ring-cedar-300">
          <div class="relative overflow-hidden h-64">
            <img src="${c.img}" class="cabin-img w-full h-full object-cover">
            <div class="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">Disponível</div>
          </div>
          <div class="p-6">
            <h3 class="font-serif text-2xl text-forest-900 mb-2">${c.name}</h3>
            <p class="text-forest-700/70 text-sm mb-4">${c.desc}</p>
            <div class="flex items-center justify-between pt-4 border-t border-cedar-100">
              <div class="font-serif text-2xl text-cedar-500">R$ ${c.price.toLocaleString('pt-BR')}<span class="text-xs text-forest-700/60 font-sans">/noite</span></div>
              <button onclick="openBooking('${c.id}', '${cin}', '${cout}')" class="bg-cedar-400 hover:bg-cedar-500 text-white px-5 py-2.5 rounded-full text-sm">Reservar agora</button>
            </div>
          </div>
        </div>`;
      grid.appendChild(el.firstElementChild);
    });
  }
}

// ============ BOOKING FLOW ============
let selectedCabin = null, selectedPay = 'credit';

function openBooking(cabinId, preCin = null, preCout = null) {
  selectedCabin = cabins.find(c => c.id === cabinId);
  document.getElementById('modalBg').style.backgroundImage = `url(${selectedCabin.img})`;
  document.getElementById('modalTitle').textContent = selectedCabin.name;
  document.getElementById('modalCategory').textContent = selectedCabin.catLabel;
  const minCheckin = formatDate(addDays(new Date(), 1));
  document.getElementById('bCheckin').min = minCheckin;
  document.getElementById('bCheckout').min = minCheckin;
  if (preCin) document.getElementById('bCheckin').value = preCin;
  if (preCout) document.getElementById('bCheckout').value = preCout;
  document.getElementById('modalPrice').textContent = `R$ ${selectedCabin.price.toLocaleString('pt-BR')}/noite`;
  resetBookingSteps();
  checkAvailabilityLive();
  document.getElementById('bookingModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function resetBookingSteps() {
  ['step1', 'step2', 'step3', 'successStep'].forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('bookingSteps').classList.remove('hidden');
}

document.addEventListener('change', e => {
  if (e.target.id === 'bCheckin' || e.target.id === 'bCheckout') checkAvailabilityLive();
});

function checkAvailabilityLive() {
  const cin = document.getElementById('bCheckin').value;
  const cout = document.getElementById('bCheckout').value;
  const info = document.getElementById('availabilityInfo');
  if (!cin || !cout || !selectedCabin) { info.innerHTML = ''; return; }
  const nights = (parseDate(cout) - parseDate(cin)) / (1000 * 60 * 60 * 24);
  if (nights <= 0) {
    info.className = 'p-4 rounded-sm mb-6 text-sm bg-rose-100 text-rose-800';
    info.innerHTML = '⚠️ Data de check-out inválida.';
    return;
  }
  const available = isCabinAvailable(selectedCabin.id, cin, cout);
  if (available) {
    info.className = 'p-4 rounded-sm mb-6 text-sm bg-green-100 text-green-800';
    info.innerHTML = `✓ <strong>${selectedCabin.name}</strong> está disponível! ${nights} noite(s).`;
  } else {
    info.className = 'p-4 rounded-sm mb-6 text-sm bg-rose-100 text-rose-800';
    info.innerHTML = `✗ <strong>${selectedCabin.name}</strong> não está disponível neste período. Tente outras datas.`;
  }
}

function goToStep2() {
  const cin = document.getElementById('bCheckin').value;
  const cout = document.getElementById('bCheckout').value;
  if (!cin || !cout) return showToast('Preencha as datas', 'error');
  if (!isCabinAvailable(selectedCabin.id, cin, cout)) return showToast('Esta cabana foi reservada. Escolha outra.', 'error');
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('modalPrice2').textContent = `R$ ${selectedCabin.price.toLocaleString('pt-BR')}/noite`;
}
function backToStep1() {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
}

function backToStep2() {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
}

function goToStep3() {
  const n = document.getElementById('gName').value.trim();
  const e = document.getElementById('gEmail').value.trim();
  const p = document.getElementById('gPhone').value.trim();
  const d = document.getElementById('gDoc').value.trim();
  const l = document.getElementById('gLGPD').checked;

  if (!n || !e || !p || !d) return showToast('Preencha todos os campos', 'error');
  if (n.split(' ').length < 2) return showToast('Digite seu nome completo (nome e sobrenome)', 'error');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(e)) return showToast('Insira um e-mail válido (ex: nome@dominio.com)', 'error');

  const phoneDigits = p.replace(/\D/g, '');
  if (phoneDigits.length < 10) return showToast('Telefone inválido. Informe DDD + número.', 'error');

  const cpfDigits = d.replace(/\D/g, '');
  if (cpfDigits.length !== 11) return showToast('CPF inválido. Digite os 11 números.', 'error');
  if (!validarCPF(cpfDigits)) return showToast('CPF inválido. Verifique os dígitos.', 'error');
  
  if (!l) return showToast('É necessário aceitar a LGPD', 'error');

  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step3').classList.remove('hidden');
  
  const nights = (parseDate(document.getElementById('bCheckout').value) - parseDate(document.getElementById('bCheckin').value)) / (1000 * 60 * 60 * 24);
  const subtotal = nights * selectedCabin.price;
  const total = subtotal * 1.05;
  document.getElementById('sumNights').textContent = `${nights} × R$ ${selectedCabin.price.toLocaleString('pt-BR')}`;
  document.getElementById('sumTotal').textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('modalPrice3').textContent = `Total: R$ ${total.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
}

function selectPay(m) {
  selectedPay = m;
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('border-cedar-500', 'bg-cedar-50'));
  event.currentTarget.classList.add('border-cedar-500', 'bg-cedar-50');
  document.getElementById('payDetails').classList.toggle('hidden', m !== 'credit');
}

function confirmBooking() {
  const cin = document.getElementById('bCheckin').value;
  const cout = document.getElementById('bCheckout').value;
  if (!isCabinAvailable(selectedCabin.id, cin, cout)) {
    showToast('Esta cabana foi reservada por outro hóspede. Escolha outra.', 'error');
    closeModal('bookingModal');
    return;
  }
  const btn = document.getElementById('confirmBtn');
  btn.disabled = true;
  btn.textContent = 'Processando...';
  setTimeout(() => {
    const bookings = getBookings();
    const code = 'FC-' + String(bookings.length + 1).padStart(5, '0');
    const nights = (parseDate(cout) - parseDate(cin)) / (1000 * 60 * 60 * 24);
    const total = nights * selectedCabin.price * 1.05;
    bookings.push({
      code,
      cabinId: selectedCabin.id,
      name: document.getElementById('gName').value,
      email: document.getElementById('gEmail').value,
      phone: document.getElementById('gPhone').value,
      cpf: document.getElementById('gDoc').value.replace(/\D/g, ''),
      checkin: cin,
      checkout: cout,
      total: Math.round(total * 100) / 100,
      status: 'confirmed',
      method: selectedPay,
      createdAt: new Date().toISOString()
    });
    saveBookings(bookings);
    document.getElementById('bookingSteps').classList.add('hidden');
    document.getElementById('successStep').classList.remove('hidden');
    document.getElementById('bookingCode').textContent = code;
    document.getElementById('bookingSummary').innerHTML = `
      <div><strong>Cabana:</strong> ${selectedCabin.name}</div>
      <div><strong>Check-in:</strong> ${formatDateBR(cin)}</div>
      <div><strong>Check-out:</strong> ${formatDateBR(cout)}</div>
      <div><strong>Pagamento:</strong> ${selectedPay.toUpperCase()}</div>
      <div><strong>Total:</strong> R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
    `;
    btn.disabled = false;
    btn.textContent = 'Confirmar Reserva';
    showToast('Reserva confirmada com sucesso!', 'success');
  }, 1500);
}

function formatDateBR(d) {
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// ============ ADMIN ============
function openAdmin() {
  document.getElementById('adminModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}
function adminLogin() {
  const u = document.getElementById('adminUser').value;
  const p = document.getElementById('adminPass').value;
  if (u === 'recepcionista' && p === 'flor2026') {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDash').classList.remove('hidden');
    renderAdmin();
  } else showToast('Credenciais inválidas', 'error');
}
function adminLogout() {
  document.getElementById('adminLogin').classList.remove('hidden');
  document.getElementById('adminDash').classList.add('hidden');
}
function renderAdmin() {
  const bookings = getBookings();
  
  const active = bookings.filter(b => b.status === 'confirmed');
  const canceled = bookings.filter(b => b.status === 'canceled');
  
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);
  const revenue = active.filter(b => parseDate(b.checkin) >= monthStart).reduce((s, b) => s + b.total, 0);
  document.getElementById('statActive').textContent = active.length;
  document.getElementById('statCanceled').textContent = canceled.length;
  document.getElementById('statRevenue').textContent = 'R$ ' + revenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  const today = formatDate(new Date());
  const tomorrow = formatDate(addDays(new Date(), 1));
  const free = cabins.filter(c => isCabinAvailable(c.id, today, tomorrow)).length;
  document.getElementById('statFree').textContent = `${free}/${cabins.length}`;

  // Mostra o botão "Limpar Canceladas" apenas na aba de canceladas
  const btnClear = document.getElementById('btnClearCanceled');
  if (btnClear) btnClear.style.display = adminFilter === 'canceled' ? 'block' : 'none';

  const tbody = document.getElementById('adminTable');
  let filtered = [];
  
  if (adminFilter === 'all') filtered = bookings.filter(b => b.status !== 'trash');
  else filtered = bookings.filter(b => b.status === adminFilter);
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-forest-700/60">Nenhuma reserva nesta aba.</td></tr>`;
    return;
  }
  
  tbody.innerHTML = filtered.sort((a, b) => b.createdAt?.localeCompare(a.createdAt)).map(b => {
    const c = cabins.find(x => x.id === b.cabinId);
    let st = '';
    let actions = '';

    if (b.status === 'confirmed') {
      st = '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmada</span>';
      actions = `<button onclick="cancelBooking('${b.code}')" class="text-rose-600 text-xs hover:underline">Cancelar</button>`;
    } else if (b.status === 'canceled') {
      st = '<span class="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs">Cancelada</span>';
      actions = `<button onclick="moveToTrash('${b.code}')" class="text-gray-500 text-xs hover:underline">Mover p/ Lixeira</button>`;
    } else if (b.status === 'trash') {
      st = '<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">Na Lixeira</span>';
      actions = `
        <button onclick="restoreBooking('${b.code}')" class="text-green-600 text-xs hover:underline mr-2">Restaurar</button>
        <button onclick="deleteForever('${b.code}')" class="text-rose-600 text-xs hover:underline">Apagar</button>
      `;
    }

    return `<tr class="border-t border-cedar-100">
      <td class="p-3 font-mono text-xs">${b.code}</td>
      <td class="p-3">${b.name}</td>
      <td class="p-3">${c?.name || '-'}</td>
      <td class="p-3 text-xs">${formatDateBR(b.checkin)} → ${formatDateBR(b.checkout)}</td>
      <td class="p-3">${st}</td>
      <td class="p-3">${actions}</td>
    </tr>`;
  }).join('');
}
function cancelBooking(code) {
  showConfirm('Cancelar reserva?', 'A reserva será marcada como cancelada.', () => {
    const b = getBookings();
    const idx = b.findIndex(x => x.code === code);
    if (idx >= 0) {
      b[idx].status = 'canceled';
      saveBookings(b);
      renderAdmin();
      showToast('Reserva cancelada. Valor será estornado.', 'success');
    }
  });
}

// ============ UI ============
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.classList.add('bg-forest-900/95', 'backdrop-blur', 'py-2', 'shadow-lg');
  else nav.classList.remove('bg-forest-900/95', 'backdrop-blur', 'py-2', 'shadow-lg');
});

function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `fixed bottom-6 right-6 z-50 px-6 py-4 rounded-sm shadow-2xl max-w-sm text-white ${type === 'error' ? 'bg-rose-700' : type === 'success' ? 'bg-green-700' : 'bg-forest-800'}`;
  setTimeout(() => t.classList.add('hidden'), 4000);
}

function acceptLGPD(v) {
  localStorage.setItem('fc_lgpd', v ? 'full' : 'essential');
  document.getElementById('lgpdBanner').classList.add('hidden');
}
if (localStorage.getItem('fc_lgpd')) document.getElementById('lgpdBanner').classList.add('hidden');

// Set min dates
const minDate = formatDate(addDays(new Date(), 1));
document.getElementById('checkin').min = minDate;
document.getElementById('checkout').min = minDate;
document.getElementById('bCheckin').min = minDate;

// ============ MÁSCARAS E VALIDAÇÕES ============
function mascaraCPF(i) {
  let v = i.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  i.value = v;
}

function mascaraTelefone(i) {
  let v = i.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
  v = v.replace(/(\d)(\d{4})$/, '$1-$2');
  i.value = v;
}

function mascaraCartao(i) {
  let v = i.value.replace(/\D/g, '');
  v = v.replace(/(\d{4})(\d)/, '$1 $2');
  v = v.replace(/(\d{4})(\d)/, '$1 $2');
  v = v.replace(/(\d{4})(\d)/, '$1 $2');
  v = v.replace(/(\d{4})(\d{1,4})$/, '$1 $2');
  i.value = v;
}

function mascaraValidade(i) {
  let v = i.value.replace(/\D/g, '');
  if (v.length > 4) v = v.slice(0, 4);
  if (v.length > 2) v = v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  i.value = v;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

// ============ MINHAS RESERVAS ============
function openMyBookings() {
  document.getElementById('myBookingsModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetMyBookings();
}

function resetMyBookings() {
  document.getElementById('myBookingsSearch').classList.remove('hidden');
  document.getElementById('myBookingsResults').classList.add('hidden');
  document.getElementById('searchCpf').value = '';
}

function findMyBookings() {
  const cpf = document.getElementById('searchCpf').value.trim();
  if (!cpf) return showToast('Digite seu CPF', 'error');
  if (!validarCPF(cpf)) return showToast('CPF inválido', 'error');

  const bookings = getBookings().filter(b => b.cpf === cpf.replace(/\D/g, ''));
  
  if (bookings.length === 0) {
    return showToast('Nenhuma reserva encontrada para este CPF.', 'error');
  }

  document.getElementById('myBookingsSearch').classList.add('hidden');
  document.getElementById('myBookingsResults').classList.remove('hidden');

  const list = document.getElementById('myBookingsList');
  list.innerHTML = bookings.map(b => {
    const c = cabins.find(x => x.id === b.cabinId);
    const st = b.status === 'confirmed' 
      ? '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmada</span>'
      : '<span class="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs">Cancelada</span>';
    
    return `
      <div class="bg-white border border-cedar-200 p-4 rounded-sm">
        <div class="flex justify-between items-center mb-2">
          <div class="font-mono text-sm font-bold">${b.code}</div>
          ${st}
        </div>
        <div class="text-sm">
          <strong>Cabana:</strong> ${c?.name || '-'}<br>
          <strong>Período:</strong> ${formatDateBR(b.checkin)} a ${formatDateBR(b.checkout)}<br>
          <strong>Total:</strong> R$ ${b.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>
    `;
  }).join('');
}

// ============ LIXEIRA E FILTROS DO ADMIN ============
let adminFilter = 'all';

// --- Filtros ---
function filterAdminBookings(f) {
  adminFilter = f;
  document.querySelectorAll('.admin-filter-btn').forEach(b => b.classList.remove('active', 'bg-forest-800', 'text-white', 'border-forest-800'));
  event.target.classList.add('active', 'bg-forest-800', 'text-white', 'border-forest-800');
  renderAdmin();
}

// --- Ações da Lixeira ---
function moveToTrash(code) {
  showConfirm('Mover para a lixeira?', 'A reserva ficará na lixeira por tempo indeterminado.', () => {
    const b = getBookings();
    const idx = b.findIndex(x => x.code === code);
    if (idx >= 0) {
      b[idx].status = 'trash';
      saveBookings(b);
      renderAdmin();
      showToast('Reserva movida para a lixeira.', 'success');
    }
  });
}

function restoreBooking(code) {
  const b = getBookings();
  const idx = b.findIndex(x => x.code === code);
  if (idx >= 0) {
    b[idx].status = 'canceled';
    saveBookings(b);
    renderAdmin();
    showToast('Reserva restaurada.', 'success');
  }
}

function deleteForever(code) {
  showConfirm('Apagar permanentemente?', 'Esta ação não pode ser desfeita. A reserva será excluída para sempre.', () => {
    const b = getBookings().filter(x => x.code !== code);
    saveBookings(b);
    renderAdmin();
    showToast('Reserva apagada permanentemente.', 'success');
  });
}

function clearCanceledBookings() {
  showConfirm('Limpar canceladas?', 'Todas as reservas canceladas serão movidas para a lixeira.', () => {
    const bookings = getBookings();
    let moved = 0;
    bookings.forEach(b => {
      if (b.status === 'canceled') { b.status = 'trash'; moved++; }
    });
    
    if (moved === 0) return showToast('Nenhuma reserva cancelada para mover.', 'info');
    
    saveBookings(bookings);
    renderAdmin();
    showToast(`${moved} reserva(s) movida(s) para a lixeira.`, 'success');
  });
}

// ============ MODAL DE CONFIRMAÇÃO ============
let confirmCallback = null;

function showConfirm(title, message, callback) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  confirmCallback = callback;
  document.getElementById('confirmModal').classList.remove('hidden');
}

function closeConfirm() {
  document.getElementById('confirmModal').classList.add('hidden');
  confirmCallback = null;
}

document.getElementById('confirmBtnAction').addEventListener('click', () => {
  if (confirmCallback) confirmCallback();
  closeConfirm();
});

// ============ MODAL LGPD ============
function openLgpdModal() {
  document.getElementById('lgpdModal').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeLgpdModal() {
  document.getElementById('lgpdModal').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// Init
renderCabins();
document.querySelectorAll('.filter-btn')[0].classList.add('active', 'bg-forest-800', 'text-white', 'border-forest-800');

// Close modals on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal('bookingModal');
    closeModal('adminModal');
  }
});