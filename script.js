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

  renderDeck();
}

function renderDeck() {
  document.getElementById('deck').innerHTML = `
    <div class="deck-info">
      <div class="remain">Còn lại: <strong>${deck.length}</strong> lá</div>

      <div class="card-flip" onclick="drawCard()">
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
  const card = deck[i];

  const inner = document.querySelector('.card-inner');
  const front = document.querySelector('.card-front');
  const remain = document.querySelector('.remain strong');

  front.innerHTML = `<img src="${card.img}">`;

  inner.classList.add('flip');

  setTimeout(()=>{
    inner.classList.remove('flip');

    // remove card AFTER close
    deck.splice(i,1);
    history.push(card.name);
    remain.innerText = deck.length;

    isFlipping = false;

    if (!deck.length) endGame();
  },2000);
}

/* ===== END ===== */
function endGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const ul = document.getElementById('history');
  ul.innerHTML='';
  history.forEach((n,i)=>ul.innerHTML+=`<li>${i+1}. ${n}</li>`);
}
