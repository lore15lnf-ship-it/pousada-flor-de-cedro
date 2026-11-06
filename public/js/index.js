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
