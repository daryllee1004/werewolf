const BACK_IMG = './assets/back_card.webp';

/* ===== CARD DATA ===== */
const cards = [
  { id:'guard', name:'Bảo vệ', group:'dan', img:'./assets/bodyguard.webp', count:1 },
  { id:'revealer', name:'Tiết lộ', group:'dan', img:'./assets/revealer.webp', count:1 },
  { id:'witch', name:'Phù thủy', group:'dan', img:'./assets/witch.webp', count:1 },
  { id:'seer', name:'Tiên tri', group:'dan', img:'./assets/seer.webp', count:1 },

  { id:'mentalist', name:'Tâm linh', group:'dan', img:'./assets/mentalist.webp', count:1 },
  { id:'tough', name:'Cứng cỏi', group:'dan', img:'./assets/tough-guy.webp', count:1 },
  { id:'prince', name:'Hoàng tử', group:'dan', img:'./assets/prince.webp', count:1 },
  { id:'priest', name:'Tu sĩ', group:'dan', img:'./assets/priest.webp', count:1 },

  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/villager.webp', count:0 },

  { id:'werewolf', name:'Ma sói', group:'soi', img:'./assets/werewolf.webp', count:0 },
  { id:'twin', name:'Song sinh', group:'dan', img:'./assets/twin.webp', count:0 },
];

/* ===== CHỈ NHỮNG LÁ NÀY ĐƯỢC CHỌN SỐ LƯỢNG ===== */
const VARIABLE_CARDS = ['villager', 'werewolf', 'twin'];

let deck = [];
let history = [];

/* ===== ACCORDION ===== */
function toggleGroup(group) {
  const el = document.getElementById(`group-${group}`);
  if (el) el.classList.toggle('open');
}

/* ===== RENDER SETUP ===== */
function renderSetup() {
  ['dan','soi'].forEach(group => {
    const box = document.getElementById(`group-${group}`);
    if (!box) return;

    box.innerHTML = `<div class="card-grid"></div>`;
    const grid = box.querySelector('.card-grid');

    cards.filter(c => c.group === group).forEach(c => {
      const isVariable = VARIABLE_CARDS.includes(c.id);

      grid.insertAdjacentHTML('beforeend', `
        <div class="card-config ${isVariable ? '' : 'fixed'}">
          <img src="${c.img}" alt="${c.name}">
          <div class="name">${c.name}</div>

          ${
            isVariable
            ? `<div class="counter">
                 <button onclick="changeCount('${c.id}',-1)">−</button>
                 <span>${c.count}</span>
                 <button onclick="changeCount('${c.id}',1)">+</button>
               </div>`
            : `<div class="counter fixed">x1</div>`
          }
        </div>
      `);
    });
  });

  updateTotal();
}

function changeCount(id, delta) {
  const c = cards.find(x => x.id === id);
  if (!c) return;
  if (!VARIABLE_CARDS.includes(id)) return;

  c.count = Math.max(0, c.count + delta);
  renderSetup();
}

function updateTotal() {
  const total = cards.reduce((s,c)=>s+c.count,0);
  document.getElementById('totalCards').innerText = total;
}

/* ===== GAME ===== */
function startGame() {
  deck = [];
  history = [];

  cards.forEach(c => {
    const qty = VARIABLE_CARDS.includes(c.id) ? c.count : 1;
    for (let i = 0; i < qty; i++) {
      deck.push({ ...c });
    }
  });

  if (!deck.length) {
    alert('Chưa chọn lá bài nào!');
    return;
  }

  deck.sort(() => Math.random() - 0.5);

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');

  showBack();
}

function showBack() {
  document.getElementById('deck').innerHTML =
    `<img src="${BACK_IMG}" width="150">`;
}

function drawCard() {
  if (!deck.length) return endGame();

  const i = Math.floor(Math.random() * deck.length);
  const card = deck.splice(i,1)[0];
  history.push(card.name);

  document.getElementById('deck').innerHTML = `
    <div class="card-big">
      <div class="card-inner">
        <img class="card-face card-front" src="${card.img}">
        <img class="card-face card-back" src="${BACK_IMG}">
      </div>
    </div>
  `;

  setTimeout(showBack, 3000);
}

function endGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const ul = document.getElementById('history');
  ul.innerHTML = '';
  history.forEach((n,i)=>{
    ul.insertAdjacentHTML('beforeend', `<li>${i+1}. ${n}</li>`);
  });
}

function resetGame() {
  cards.forEach(c => {
    c.count = VARIABLE_CARDS.includes(c.id) ? 0 : 1;
  });

  document.getElementById('result').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  renderSetup();
}

/* INIT */
document.addEventListener('DOMContentLoaded', renderSetup);
