import { validateEmail, validatePassword, validatePasswordsMatch, getInitials, getGreeting} from "./logic.js";

// STORAGE 
function getUsers() { return JSON.parse(localStorage.getItem('mood_users')||'{}'); }
function saveUsers(u) { localStorage.setItem('mood_users', JSON.stringify(u)); }

// AUTH TAB 
function switchTab(tab) {
  ['login','register'].forEach(t => {
    document.getElementById('panel-'+t).classList.toggle('active', t===tab);
    document.getElementById('tab-'+t).classList.toggle('active', t===tab);
  });
  document.getElementById('auth-footer').innerHTML = tab==='login'
    ? `don't have an account? <a onclick="switchTab('register')">register</a>`
    : `already have an account? <a onclick="switchTab('login')">sign in</a>`;
  document.getElementById('login-error').textContent='';
  document.getElementById('reg-error').textContent='';
}

// LOGIN 
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const err   = document.getElementById('login-error');
  if (!email||!pass) { err.textContent='fill in all fields'; return; }
  const users = getUsers();
  if (!users[email]) { err.textContent='user not found'; return; }
  if (users[email].password !== btoa(pass)) { err.textContent='wrong password'; return; }
  enterApp({ email, name: users[email].name });
}

// REGISTER
function handleRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;
  const err   = document.getElementById('reg-error');
  if (!name||!email||!pass||!pass2){ err.textContent='fill in all fields'; return; }
  if (!validateEmail(email)){ err.textContent='invalid email'; return; }
  if (!validatePassword(pass)){ err.textContent='password min. 6 characters'; return; }
  if (!validatePasswordsMatch(pass, pass2)){ err.textContent='passwords do not match'; return; }
  const users = getUsers();
  if (users[email])                 { err.textContent='email already registered'; return; }
  users[email] = { name, password: btoa(pass) };
  saveUsers(users);
  enterApp({ email, name });
  showToast('welcome, '+name+'! 👋');
}

// ENTER APP 
function enterApp(user) {
  localStorage.setItem('mood_session', JSON.stringify(user));
  const initials = getInitials(user.name);
  document.getElementById('user-ava').textContent = initials;
  document.getElementById('user-chip-name').textContent = user.name;

  const h = new Date().getHours();
  const greet = getGreeting(h);
  document.getElementById('greeting-title').textContent = greet+', '+user.name.split(' ')[0];

  document.getElementById('auth-screen').classList.remove('active');
  document.getElementById('app-screen').classList.add('active');
}

// LOGOUT 
function handleLogout() {
  localStorage.removeItem('mood_session');
  document.getElementById('app-screen').classList.remove('active');
  document.getElementById('auth-screen').classList.add('active');
  document.getElementById('login-email').value='';
  document.getElementById('login-pass').value='';
  switchTab('login');
}

// TOAST 
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2600);
}

// AUTO SESSION 
const saved = localStorage.getItem('mood_session');
if (saved) { try { enterApp(JSON.parse(saved)); } catch(e) { localStorage.removeItem('mood_session'); } }

// ENTER KEY 
document.getElementById('login-pass').addEventListener('keydown', e=>{ if(e.key==='Enter') handleLogin(); });
document.getElementById('reg-pass2').addEventListener('keydown', e=>{ if(e.key==='Enter') handleRegister(); });

// MAKE FUNCTIONS GLOBAL FOR HTML
window.switchTab = switchTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;