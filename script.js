const BACK_IMG = './assets/back_card.webp';

const cards = [
  { id:'villager', name:'Dân làng', group:'dan', img:'./assets/villager.webp', count:0 },
  { id:'seer', name:'Tiên tri', group:'dan', img:'./assets/seer.webp', count:0 },

  { id:'werewolf', name:'Ma sói', group:'soi', img:'./assets/werewolf.webp', count:0 },

  { id:'witch', name:'Phù thủy', group:'char', img:'./assets/witch.webp', count:0 }
];

let deck = [];
let gameDeck = [];
let history = [];

/* ===== SETUP VIEW ===== */
function renderSetup(){
  ['dan','soi','char'].forEach(g=>{
    const box = document.getElementById(`group-${g}`);
    box.innerHTML = '';

    cards.filter(c=>c.group===g).forEach(c=>{
      box.innerHTML += `
        <div class="card-config">
          <img src="${c.img}">
          <div class="name">${c.name}</div>
          <div class="counter">
            <button onclick="changeCount('${c.id}',-1)">−</button>
            <span id="count-${c.id}">${c.count}</span>
            <button onclick="changeCount('${c.id}',1)">+</button>
          </div>
        </div>
      `;
    });
  });

  renderPreview();
}

/* ===== CHANGE COUNT ===== */
function changeCount(id, delta){
  const card = cards.find(c=>c.id===id);
  card.count = Math.max(0, card.count + delta);

  document.getElementById(`count-${id}`).innerText = card.count;
  updateTotal();
  renderPreview();
}

/* ===== PREVIEW DECK (SETUP PHASE) ===== */
function renderPreview(){
  const preview = document.getElementById('deck');
  preview.innerHTML = '';

  ['dan','soi','char'].forEach(g=>{
    const section = document.createElement('div');
    section.className = 'deck-group';
    section.innerHTML = `<h3>${groupName(g)}</h3>`;

    cards.filter(c=>c.group===g && c.count>0).forEach(c=>{
      for(let i=0;i<c.count;i++){
        section.innerHTML += `
          <div class="card small">
            <img src="${c.img}">
          </div>
        `;
      }
    });

    preview.appendChild(section);
  });
}

/* ===== TOTAL ===== */
function updateTotal(){
  document.getElementById('totalCards').innerText =
    cards.reduce((s,c)=>s+c.count,0);
}

/* ===== START GAME ===== */
function startGame(){
  gameDeck = [];
  history = [];

  cards.forEach(c=>{
    for(let i=0;i<c.count;i++){
      gameDeck.push({...c});
    }
  });

  if(gameDeck.length === 0) return;

  gameDeck.sort(()=>Math.random()-0.5);

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');

  renderGameDeck();
}

/* ===== GAME DECK ===== */
function renderGameDeck(){
  const d = document.getElementById('deck');
  d.innerHTML = '';
  gameDeck.forEach(()=>{
    d.innerHTML += `
      <div class="card small">
        <img src="${BACK_IMG}">
      </div>
    `;
  });
}

/* ===== DRAW ===== */
function drawCard(){
  if(gameDeck.length===0){
    endGame();
    return;
  }

  const i = Math.floor(Math.random()*gameDeck.length);
  const card = gameDeck.splice(i,1)[0];
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

  setTimeout(renderGameDeck,3000);
}

/* ===== END ===== */
function endGame(){
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const h = document.getElementById('history');
  h.innerHTML='';
  history.forEach((n,i)=>{
    h.innerHTML += `<li>${i+1}. ${n}</li>`;
  });
}

function resetGame(){
  document.getElementById('result').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
  cards.forEach(c=>c.count=0);
  renderSetup();
  updateTotal();
}

function groupName(g){
  return g==='dan'?'Phe Dân':g==='soi'?'Phe Sói':'Character';
}

renderSetup();
updateTotal();
