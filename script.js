const BACK_IMG = './assets/back_card.webp';

const cards = [
  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/dan/villager.webp', count:0 },
  { id:'seer', name:'Tiên tri', group:'dan', img:'./assets/dan/seer.webp', count:0 },

  { id:'werewolf', name:'Ma sói', group:'soi', img:'./assets/soi/werewolf.webp', count:0 },

  { id:'witch', name:'Phù thủy', group:'char', img:'./assets/char/witch.webp', count:0 }
];

let deck = [];
let currentIndex = 0;

/* ===== RENDER SETUP ===== */
function renderSetup() {
  ['dan','soi','char'].forEach(g => {
    const box = document.getElementById(`group-${g}`);
    box.innerHTML = '';
    cards.filter(c => c.group === g).forEach(c => {
      box.innerHTML += `
        <div class="card-config">
          <img src="${c.img}">
          <div>${c.name}</div>
          <input type="number" min="0" value="${c.count}"
            onchange="updateCount('${c.id}', this.value)">
        </div>
      `;
    });
  });
}

function updateCount(id, value) {
  const card = cards.find(c => c.id === id);
  card.count = Number(value);
  updateTotal();
}

function updateTotal() {
  const total = cards.reduce((s,c) => s + c.count, 0);
  document.getElementById('totalCards').innerText = total;
}

/* ===== START GAME ===== */
function startGame() {
  deck = [];
  cards.forEach(c => {
    for (let i = 0; i < c.count; i++) {
      deck.push({ ...c });
    }
  });

  deck.sort(() => Math.random() - 0.5);
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  currentIndex = 0;
}

/* ===== DRAW CARD ===== */
function drawCard() {
  if (currentIndex >= deck.length) return;

  const cardData = deck[currentIndex];
  const deckBox = document.getElementById('deck');
  deckBox.innerHTML = `
    <div class="card" id="card">
      <div class="card-inner">
        <img class="card-face card-back" src="${BACK_IMG}">
        <img class="card-face card-front" src="${cardData.img}">
      </div>
    </div>
  `;

  const card = document.getElementById('card');
  setTimeout(() => card.classList.add('flip'), 100);

  setTimeout(() => {
    card.classList.remove('flip');
    currentIndex++;
  }, 3000);
}

renderSetup();
