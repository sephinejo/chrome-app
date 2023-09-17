const bgs = [
  'bg-images/bg1.jpg',
  'bg-images/bg2.jpg',
  'bg-images/bg3.jpg',
  'bg-images/bg4.jpg',
  'bg-images/bg5.jpg',
  'bg-images/bg6.jpg',
  'bg-images/bg7.jpg',
  'bg-images/bg8.jpg',
];

const body = document.querySelector('body');
const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-input');
const header = document.querySelector('.header');
const greeting = document.querySelector('.greeting');
const clock = document.querySelector('.clock');
const loginStatus = document.querySelector('.login-status');
const todo = document.querySelector('.todo');
const toDoList = document.getElementById('todo-list');
const toDoForm = document.getElementById('todo-form');
const toDoInput = document.getElementById('todo-input');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';
const TODOS_KEY = 'todos';

let toDos = [];

/* Random Background Images */
function changeRandomBg() {
  const randomBgIndex = Math.floor(Math.random() * bgs.length);
  body.style.background = `url(${bgs[randomBgIndex]}`;
  body.style.backgroundPosition = 'center';
  body.style.backgroundSize = 'cover';
  body.style.backgroundRepeat = 'no-repeat';
}

changeRandomBg();
setInterval(() => {
  changeRandomBg();
}, 10000);

/* Login */
function onLoginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

if (localStorage.getItem(USERNAME_KEY) !== null) {
  paintGreetings(localStorage.getItem(USERNAME_KEY));
}

loginForm.addEventListener('submit', onLoginSubmit);

/* Greetings (Header) */
function paintGreetings(username) {
  loginForm.classList.add(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello${username ? `, ${username}!` : ', Stranger!'}`;
  loginStatus.innerText = `${
    username ? `${username} is logged in!` : `Please log in!`
  }`;
  header.classList.remove(HIDDEN_CLASSNAME);
  todo.classList.remove(HIDDEN_CLASSNAME);

  clockFn();
  setInterval(() => {
    clockFn();
  }, 1000);
}

/* Real-Time Clock */
function clockFn() {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  clock.innerText = `[${monthNames[month]} ${date}, ${year}] ${String(
    hours
  ).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`;
}

/* Login Status */
function displayLoginStatus(username) {
  loginStatus.innerText = `${username} is logged in`;
}

/* Todo List */
function paintToDo(newToDo) {
  const li = document.createElement('li');
  li.id = newToDo.id;
  const span = document.createElement('span');
  const button = document.createElement('button');
  button.innerText = '🆇';
  button.classList.add('button-delete');
  button.addEventListener('click', deleteToDo);
  li.appendChild(span);
  li.classList.add('todo-item');
  li.appendChild(button);
  span.innerText = newToDo.text;
  span.classList.add('todo-item-text');
  toDoList.appendChild(li);
}

/* Todo Form */
function handleToDoSubmit(e) {
  e.preventDefault();
  const newToDo = { id: Date.now(), text: toDoInput.value };
  toDoInput.value = '';
  toDos.push(newToDo);
  saveToDos();
  paintToDo(newToDo);
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => parseInt(li.id) !== toDo.id);
  saveToDos();
}
