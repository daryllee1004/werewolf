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
  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/villager.webp', count:0 }, 
  { id:'twin', name:'Song sinh', group:'dan', img:'./assets/twins.webp', count:0 },
  { id:'diseased', name:'Con bệnh', group:'dan', img:'./assets/diseased.webp', count:0 }, 
  { id:'martyr', name:'Thiếu nữ', group:'dan', img:'./assets/martyr.webp', count:0 },
  { id:'beholder', name:'Kẻ nắm giữ', group:'dan', img:'./assets/beholder.webp', count:0 },
  { id:'magician', name:'Pháp sư', group:'dan', img:'./assets/great-magician.webp', count:0 },
  { id:'huntress', name:'Nữ thợ săn', group:'dan', img:'./assets/huntress.webp', count:0 },
  { id:'pacifist', name:'Yêu hòa bình', group:'dan', img:'./assets/pacifist.webp', count:0 },
  { id:'idiot', name:'Thằng ngốc', group:'dan', img:'./assets/idiot.webp', count:0 },
  

  
  { id:'traitor', name:'Phản bội', group:'soi', img:'./assets/traitor.webp', count:0 },
  { id:'alphawolf', name:'Sói nguyền', group:'soi', img:'./assets/alphawolf.webp', count:0 },
  { id:'wolfman', name:'Sói người', group:'soi', img:'./assets/wolfman.webp', count:0 },
  { id:'werewolf', name:'Sói', group:'soi', img:'./assets/werewolf.webp', count:0 },
  { id:'wolfcub', name:'Sói con', group:'soi', img:'./assets/wolfcub.webp', count:0 },
  { id:'snowwolf', name:'Sói tuyết', group:'soi', img:'./assets/snowwolf.webp', count:0 },
  { id:'sorceress', name:'Pháp sư sói', group:'soi', img:'./assets/sorceress.webp', count:0 },
  { id:'seedofevil', name:'Trứng quỷ', group:'soi', img:'./assets/seed-of-evil.webp', count:0 },
  { id:'motherdevil', name:'Mẹ quỷ', group:'soi', img:'./assets/mother-devil.webp', count:0 },
  { id:'cloak', name:'Áo choàng', group:'soi', img:'./assets/cloak.webp', count:0 },


  
  { id:'hunter', name:'Thợ săn', group:'char', img:'./assets/hunter.webp', count:0 },
  { id:'cultleader', name:'Trưởng giáo phái', group:'char', img:'./assets/cult-leader.webp', count:0 },
  { id:'cupid', name:'Cupid', group:'char', img:'./assets/cupid.webp', count:0 },
  { id:'cursed', name:'Kẻ bị nguyền', group:'char', img:'./assets/cursed.webp', count:0 },
  { id:'doppelganger', name:'Nhân bản', group:'char', img:'./assets/doppelganger.webp', count:0 },
  { id:'elder', name:'Già làng', group:'char', img:'./assets/elder.webp', count:0 },
  { id:'moonmaiden', name:'Nguyệt nữ', group:'char', img:'./assets/moon-maiden.webp', count:0 },
  { id:'pi', name:'Thám tử', group:'char', img:'./assets/pi.webp', count:0 },
  { id:'swapper', name:'Hoán đổi', group:'char', img:'./assets/swapper.webp', count:0 },
  { id:'thief', name:'Tên trộm', group:'char', img:'./assets/the-thief.webp', count:0 },
  { id:'villagechief', name:'Trưởng làng', group:'char', img:'./assets/village-chief.webp', count:0 },
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

  // front.innerHTML = `<img src="${card.img}">`;
  front.innerHTML = `
  <img src="${card.img}">
  <span class="card-name">${card.name}</span>
  `;

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


/* ===== PASSWORD PROTECTION ===== */
const GAME_PASSWORD = 'bananhdung';

function checkPassword() {
  const input = document.getElementById('passwordInput');
  const error = document.getElementById('passwordError');

  if (input.value === GAME_PASSWORD) {
    document.getElementById('passwordOverlay').style.display = 'none';
  } else {
    error.style.display = 'block';
    input.value = '';
    input.focus();
  }
}

/* ENTER TO SUBMIT */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('passwordOverlay')) {
    checkPassword();
  }
});

