const BACK_IMG = './assets/back_card.webp';

const cards = [
  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/villager.webp', count:0 },
  { id:'seer', name:'Tiên tri', group:'dan', img:'./assets/seer.webp', count:0 },

  { id:'werewolf', name:'Ma sói', group:'soi', img:'./assets/werewolf.webp', count:0 },

  { id:'witch', name:'Phù thủy', group:'char', img:'./assets/witch.webp', count:0 }
];

let deck = [];
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
          <input type="number" min="0" value="0"
            onchange="setCount('${c.id}', this.value)">
        </div>
      `;
    });
  });
}

function setCount(id, value) {
  const card = cards.find(c => c.id === id);
  card.count = Number(value);
  updateTotal();
}

function updateTotal() {
  document.getElementById('totalCards').innerText =
    cards.reduce((s,c)=>s+c.count,0);
}

/* ===== START GAME ===== */
function startGame() {
  deck = [];
  history = [];

  cards.forEach(c => {
    for(let i=0;i<c.count;i++){
      deck.push({...c});
    }
  });

  if(deck.length === 0) return;

  deck.sort(()=>Math.random()-0.5);

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');

  renderDeck();
}

function renderDeck() {
  const d = document.getElementById('deck');
  d.innerHTML = '';
  deck.forEach(()=> {
    d.innerHTML += `
      <div class="card small">
        <img src="${BACK_IMG}">
      </div>
    `;
  });
}

/* ===== DRAW ===== */
function drawCard() {
  if(deck.length === 0){
    endGame();
    return;
  }

  const index = Math.floor(Math.random()*deck.length);
  const card = deck.splice(index,1)[0];
  history.push(card.name);

  const d = document.getElementById('deck');
  d.innerHTML = `
    <div class="card big flip">
      <div class="inner">
        <img class="front" src="${card.img}">
        <img class="back" src="${BACK_IMG}">
      </div>
    </div>
  `;

  setTimeout(renderDeck, 3000);
}

/* ===== END ===== */
function endGame(){
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const h = document.getElementById('history');
  h.innerHTML = '';
  history.forEach((n,i)=>{
    h.innerHTML += `<li>${i+1}. ${n}</li>`;
  });
}

function resetGame(){
  document.getElementById('result').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  renderSetup();
  updateTotal();
}

renderSetup();
