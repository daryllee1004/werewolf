const BACK_IMG = './assets/back_card.webp';

const cards = [
  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/villager.webp', count:0 },
  { id:'seer', name:'Tiên tri', group:'dan', img:'./assets/seer.webp', count:0 },

  { id:'werewolf', name:'Ma sói', group:'soi', img:'./assets/werewolf.webp', count:0 },

  { id:'witch', name:'Phù thủy', group:'char', img:'./assets/witch.webp', count:0 }
];

let gameDeck = [];
let history = [];

/* ===== SETUP ===== */
function renderSetup() {
  ['dan','soi','char'].forEach(g => {
    const box = document.getElementById(`group-${g}`);
    box.innerHTML = '';

    cards.filter(c => c.group === g).forEach(c => {
      box.innerHTML += `
        <div class="card-config">
          <img src="${c.img}">
          <div class="name">${c.name}</div>
          <div class="counter">
            <button onclick="changeCount('${c.id}',-1)">−</button>
            <span>${c.count}</span>
            <button onclick="changeCount('${c.id}',1)">+</button>
          </div>
        </div>
      `;
    });
  });

  updateTotal();
}

function changeCount(id, delta) {
  const c = cards.find(x => x.id === id);
  c.count = Math.max(0, c.count + delta);
  renderSetup();
}

function updateTotal() {
  document.getElementById('totalCards').innerText =
    cards.reduce((s,c)=>s+c.count,0);
}

/* ===== START ===== */
function startGame() {
  gameDeck = [];
  history = [];

  cards.forEach(c => {
    for (let i=0;i<c.count;i++) gameDeck.push({...c});
  });

  if (!gameDeck.length) return;

  gameDeck.sort(()=>Math.random()-0.5);

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');

  renderBackDeck();
}

function renderBackDeck() {
  const d = document.getElementById('deck');
  d.innerHTML = '';
  gameDeck.forEach(() => {
    d.innerHTML += `<img src="${BACK_IMG}">`;
  });
}

/* ===== DRAW ===== */
function drawCard() {
  if (!gameDeck.length) return endGame();

  const i = Math.floor(Math.random()*gameDeck.length);
  const card = gameDeck.splice(i,1)[0];
  history.push(card.name);

  const d = document.getElementById('deck');
  d.innerHTML = `
    <div class="card-big">
      <div class="card-inner">
        <img class="card-face card-front" src="${card.img}">
        <img class="card-face" src="${BACK_IMG}">
      </div>
    </div>
  `;

  setTimeout(renderBackDeck, 3000);
}

/* ===== END ===== */
function endGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const h = document.getElementById('history');
  h.innerHTML = '';
  history.forEach((n,i)=>h.innerHTML+=`<li>${i+1}. ${n}</li>`);
}

function resetGame() {
  cards.forEach(c=>c.count=0);
  document.getElementById('result').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  renderSetup();
}

renderSetup();
