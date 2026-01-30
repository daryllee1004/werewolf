const BACK_IMG = './assets/back_card.webp';

/* ===== CONFIG ===== */
const MULTI_CARDS = ['villager', 'werewolf', 'twin'];

const cards = [
  { id:'guard', name:'Bảo vệ', group:'dan', img:'./assets/bodyguard.webp', count:0 },
  { id:'revealer', name:'Tiết lộ', group:'dan', img:'./assets/revealer.webp', count:0 },
  { id:'witch', name:'Phù thủy', group:'dan', img:'./assets/witch.webp', count:0 },
  { id:'seer', name:'Tiên tri', group:'dan', img:'./assets/seer.webp', count:0 },
  { id:'mentalist', name:'Tâm linh', group:'dan', img:'./assets/mentalist.webp', count:0 },
  { id:'tough', name:'Cứng cỏi', group:'dan', img:'./assets/tough_guy.webp', count:0 },
  { id:'prince', name:'Hoàng tử', group:'dan', img:'./assets/prince.webp', count:0 },
  { id:'priest', name:'Tu sĩ', group:'dan', img:'./assets/priest.webp', count:0 },
  { id:'empathist', name:'Thấu cảm', group:'dan', img:'./assets/empathist.webp', count:0 },
  { id:'insomniac', name:'Mất ngủ', group:'dan', img:'./assets/insomniac.webp', count:0 },
  { id:'spellcaster', name:'Liễu', group:'dan', img:'./assets/spellcaster.webp', count:0 },
  { id:'martyr', name:'Thiếu nữ', group:'dan', img:'./assets/martyr.webp', count:0 },
  { id:'twin', name:'Song sinh', group:'dan', img:'./assets/twins.webp', count:0 },

  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/villager.webp', count:0 },
  { id:'werewolf', name:'Ma sói', group:'soi', img:'./assets/werewolf.webp', count:0 },
  { id:'hunter', name:'Thợ săn', group:'char', img:'./assets/hunter.webp', count:0 },
];

 
let deck = [];
let history = [];
let isFlipping = false;

/* ===== ACCORDION ===== */
function toggleGroup(group) {
  document.getElementById(`group-${group}`).classList.toggle('open');
}

/* ===== SETUP RENDER ===== */
function renderSetup() {
  ['dan','soi','char'].forEach(group => {
    const box = document.getElementById(`group-${group}`);
    if (!box) return;

    const oldGrid = box.querySelector('.card-grid');
    const scrollTop = oldGrid ? oldGrid.scrollTop : 0;

    box.innerHTML = `<div class="card-grid"></div>`;
    const grid = box.querySelector('.card-grid');

    cards.filter(c => c.group === group).forEach(c => {
      const isMulti = MULTI_CARDS.includes(c.id);

      grid.insertAdjacentHTML('beforeend', `
        <div class="card-config ${c.count>0?'selected':''}">
          <img src="${c.img}">
          <div class="name">${c.name}</div>
          <div class="counter">
            ${isMulti ? `
              <button onclick="changeCount('${c.id}',-1)">−</button>
              <span>${c.count}</span>
              <button onclick="changeCount('${c.id}',1)">+</button>
            ` : `
              <button onclick="changeCount('${c.id}',1)">
                ${c.count ? '✓' : '+'}
              </button>
            `}
          </div>
        </div>
      `);
    });

    grid.scrollTop = scrollTop;
  });

  updateSummary();
}

function changeCount(id, delta) {
  const c = cards.find(x=>x.id===id);
  if (!c) return;

  if (MULTI_CARDS.includes(id)) {
    c.count = Math.max(0, c.count + delta);
  } else {
    c.count = c.count ? 0 : 1;
  }
  renderSetup();
}

/* ===== SUMMARY ===== */
function updateSummary() {
  const total = cards.reduce((s,c)=>s+c.count,0);
  const dan = cards.filter(c=>c.group==='dan').reduce((s,c)=>s+c.count,0);
  const soi = cards.filter(c=>c.group==='soi').reduce((s,c)=>s+c.count,0);
  const char = cards.filter(c=>c.group==='char').reduce((s,c)=>s+c.count,0);

  document.getElementById('totalCards').innerText = total;
  document.getElementById('count-dan').innerText = dan;
  document.getElementById('count-soi').innerText = soi;
  document.getElementById('count-char').innerText = char;
}

/* ===== GAME ===== */
function startGame() {
  deck = [];
  history = [];

  cards.forEach(c=>{
    for(let i=0;i<c.count;i++) deck.push({...c});
  });

  if (!deck.length) return alert('Chưa chọn lá bài!');

  deck.sort(()=>Math.random()-0.5);

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');

  renderDeckBack();
}

function renderDeckBack() {
  document.getElementById('deck').innerHTML = `
    <div class="deck-info">
      <div class="remain">Còn lại: <strong>${deck.length}</strong> lá</div>
      <div class="card-flip">
        <div class="card-inner">
          <div class="card-face card-back">
            <img src="${BACK_IMG}">
          </div>
          <div class="card-face card-front"></div>
        </div>
      </div>
    </div>
  `;
}

function drawCard() {
  if (isFlipping || !deck.length) return;
  isFlipping = true;

  const i = Math.floor(Math.random()*deck.length);
  const card = deck.splice(i,1)[0];
  history.push(card.name);

  const inner = document.querySelector('.card-inner');
  const front = document.querySelector('.card-front');
  const remain = document.querySelector('.remain strong');

  front.innerHTML = `<img src="${card.img}">`;
  remain.innerText = deck.length;

  requestAnimationFrame(()=>inner.classList.add('flip'));

  setTimeout(()=>{
    inner.classList.remove('flip');
    isFlipping = false;
    if (!deck.length) endGame();
  },3000);
}

/* ===== END ===== */
function endGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const ul = document.getElementById('history');
  ul.innerHTML='';
  history.forEach((n,i)=>ul.innerHTML+=`<li>${i+1}. ${n}</li>`);
}

function resetGame() {
  cards.forEach(c=>c.count=0);
  document.getElementById('result').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  renderSetup();
}

document.addEventListener('DOMContentLoaded', renderSetup);


