// Manayush 
const $ = (s, d=document)=> d.querySelector(s);
const $$ = (s, d=document)=> Array.from(d.querySelectorAll(s));


const i18n = {
  en: {
    tagline: "Digital Psychological Support for Students",
    "nav.home":"Home","nav.chat":"AI First‑Aid","nav.booking":"Book Session","nav.resources":"Resources","nav.peer":"Peer Support","nav.admin":"Admin Dashboard","nav.about":"About",
    panic:"Need Help?",
    "hero.title":"You’re not alone. Support is one click away.",
    "hero.desc":"Confidential, stigma‑free tools to help you manage stress, anxiety, sleep, and academic pressure - designed for your campus.",
    "hero.cta1":"Try AI First‑Aid","hero.cta2":"Book a Counsellor",
    "feat.ai":"AI‑guided coping strategies","feat.confidential":"Confidential appointments","feat.local":"Regional languages & context","feat.analytics":"Anonymous campus analytics",
    "hero.quickCheck":"Quick Check‑In","hero.quickCheckDesc":"How are you feeling today?","hero.quickCheckCTA":"Get tips",
    "chat.selfcare":"Self‑care tools",
    "booking.title":"Confidential Booking","booking.desc":"Book a private session with your campus counsellor or request a helpline callback.",
    "resources.title":"Psychoeducational Resources"
  },
  hi: {
    tagline: "छात्रों के लिए डिजिटल मनोवैज्ञानिक सहायता",
    "nav.home":"होम","nav.chat":"एआई फर्स्ट‑एड","nav.booking":"सेशन बुक करें","nav.resources":"संसाधन","nav.peer":"पीयर सपोर्ट","nav.admin":"एडमिन डैशबोर्ड","nav.about":"परिचय",
    panic:"तुरंत मदद चाहिए?",
    "hero.title":"आप अकेले नहीं हैं। सहायता बस एक क्लिक दूर है।",
    "hero.desc":"गोपनीय, कलंक‑मुक्त उपकरण—तनाव, चिंता, नींद और शैक्षणिक दबाव में मदद—आपके कैम्पस के लिए।",
    "hero.cta1":"एआई फर्स्ट‑एड आज़माएँ","hero.cta2":"काउंसलर बुक करें",
    "feat.ai":"एआई आधारित कॉपिंग स्ट्रैटेजी","feat.confidential":"गोपनीय अपॉइंटमेंट","feat.local":"स्थानीय भाषा व संदर्भ","feat.analytics":"अनाम एनालिटिक्स",
    "hero.quickCheck":"त्वरित चेक‑इन","hero.quickCheckDesc":"आज आप कैसा महसूस कर रहे हैं?","hero.quickCheckCTA":"सलाह लें",
    "chat.selfcare":"सेल्फ‑केयर टूल्स",
    "booking.title":"गोपनीय बुकिंग","booking.desc":"कैंपस काउंसलर के साथ निजी सेशन बुक करें या हेल्पलाइन कॉल‑बैक माँगें।",
    "resources.title":"मनोशैक्षणिक संसाधन"
  }
};

// Counsellor (institution custom)
const CAMPUS = {
  name: "Your College",
  counsellorPhone: "+910000000000"
};

// Demo data store
const store = {
  key: "campuscare-demo",
  read(){ try{ return JSON.parse(localStorage.getItem(this.key) || "{}"); } catch{ return {} } },
  write(data){ localStorage.setItem(this.key, JSON.stringify(data)); },
  up(updater){
    const data = this.read();
    const next = updater({...data});
    this.write(next);
    return next;
  }
};

// Router
function setRoute(id){
  $$(".route").forEach(s=> s.classList.toggle("active", s.id === id));
  $$(".nav-link").forEach(b=> b.classList.toggle("active", b.dataset.target === id));
  if(id==="admin") renderAdmin();
  if(id==="resources") renderResources();
}
$$(".nav-link").forEach(btn=> btn.addEventListener("click", ()=> setRoute(btn.dataset.target)));
$$("[data-jump]").forEach(btn=> btn.addEventListener("click", ()=> setRoute(btn.dataset.jump)));

// Language
const langSelect = $("#langSelect");
function applyLang(lang){
  const dict = i18n[lang] || i18n.en;
  $$("[data-i18n]").forEach(el=> {
    const key = el.dataset.i18n;
    if(dict[key]) el.textContent = dict[key];
  });
  $("#resLang").value = lang;
  store.up(d=> (d.lang = lang, d));
}
langSelect.addEventListener("change", e=> applyLang(e.target.value));
applyLang(store.read().lang || "en");

// Year
$("#year").textContent = new Date().getFullYear();

// Panic modal
$("#counsellorLine").textContent = CAMPUS.counsellorPhone;
$("#panicBtn").addEventListener("click", ()=> $("#panicModal").showModal());

// Mood check‑in
const moodMsgs = {
  calm:"Nice! Keep doing what works for you.",
  stressed:"Try box‑breathing: inhale 4, hold 4, exhale 4, hold 4 (×4).",
  anxious:"Name 3 things you see, 2 you hear,1 you feel.",
  sad:"It’s okay to feel this. A short walk or a chat may help.",
  angry:"Pause. Breathe. Splash water or step away to reset.",
  tired:"A 20‑min nap or gentle stretch could help."
};
$$(".mood").forEach(btn=> btn.addEventListener("click", ()=>{
  const mood = btn.dataset.mood;
  $("#moodMsg").textContent = moodMsgs[mood] || "";
  // log check‑in
  store.up(d=> {
    d.checkins = d.checkins || [];
    d.checkins.push({ mood, ts: Date.now() });
    return d;
  });
}));

// Chips prompt fill
$$(".chip").forEach(ch=> ch.addEventListener("click", ()=> {
  $("#chatText").value = ch.dataset.prompt;
  $("#chatText").focus();
}));


function botReply(text){
  const t = text.toLowerCase();
  const reply = [];
  // Keyword intents
  if(/sleep|insomnia|tired/.test(t)){
    reply.push("Sleep tips: keep a fixed schedule, avoid screens 1 hour before bed, try 10‑minute breathing.");
  }
  if(/exam|exams|test|study|studies|academic|assign/.test(t)){
    reply.push("Study stress: try Pomodoro (25/5), break tasks, and plan 3 priorities for today.");
  }
  if(/anx|panic|worry/.test(t)){
    reply.push("Anxiety first‑aid: 5‑4‑3‑2‑1 grounding and slow exhale‑focused breathing (6‑8 seconds).");
  }
  if(/lonely|alone|isolation/.test(t)){
    reply.push("Feeling isolated: consider a walk with a friend or join a small campus club activity.");
  }
  if(/depress|hopeless|harm|suicide|kill/.test(t)){
    reply.push("If you feel unsafe or have thoughts of self‑harm, please use ‘Need Help?’ for immediate support.");
  }
  if(reply.length===0){
    reply.push("I’m here to help. Can you share a bit more about what you’re feeling right now?");
  }
  reply.push("Would you like to book a counsellor or read a quick guide?");
  return reply;
}
function addMsg(role, text){
  const row = document.createElement("div");
  row.className = `msg ${role}`;
  row.innerHTML = `<div class="bubble">${text}</div>`;
  const w = $("#chatWindow");
  w.appendChild(row);
  w.scrollTop = w.scrollHeight;
}
addMsg("bot", "Hi! I’m your support companion. Share what’s on your mind.");
$("#chatForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const text = $("#chatText").value.trim();
  if(!text) return;
  addMsg("user", text);
  $("#chatText").value = "";
  const replies = botReply(text);
  replies.forEach((r,i)=> setTimeout(()=> addMsg("bot", r), 300*i));
});

// Self‑care tools
$("#timerBtn").addEventListener("click", ()=>{
  $("#toolArea").innerHTML = `<p>Focus on a slow inhale and longer exhale. Timer: <span id="sec">180</span>s</p>`;
  let s = 180;
  const el = $("#sec");
  const id = setInterval(()=>{
    s--; el.textContent = s;
    if(s<=0) clearInterval(id);
  }, 1000);
});
$("#groundBtn").addEventListener("click", ()=>{
  $("#toolArea").innerHTML = `<ol>
    <li>5 things you can see</li><li>4 things you can touch</li><li>3 things you can hear</li><li>2 things you can smell</li><li>1 thing you can taste</li>
  </ol>`;
});
$("#journalBtn").addEventListener("click", ()=>{
  const data = store.read();
  const text = prompt("Write a quick journal entry:");
  if(text){
    const entry = { ts: Date.now(), text };
    store.up(d=> { d.journal = d.journal || []; d.journal.push(entry); return d; });
    alert("Saved locally. You can export from the footer.");
  }
});

// Booking form (local demo)
$("#bookForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const topics = $$("input[name='topics']:checked").map(i=> i.value);
  const booking = {
    firstName: fd.get("firstName"),
    lastName: fd.get("lastName"),
    email: fd.get("email"),
    sid: fd.get("sid"),
    mode: fd.get("mode"),
    date: fd.get("date"),
    time: fd.get("time"),
    topics,
    notes: fd.get("notes") || "",
    ts: Date.now()
  };
  store.up(d=> { d.bookings = d.bookings || []; d.bookings.push(booking); return d; });
  $("#bookMsg").textContent = "Request submitted. You’ll receive a confirmation via campus channel (demo).";
  renderBookings();
  e.target.reset();
  setTimeout(()=> $("#bookMsg").textContent = "", 4000);
});

function renderBookings(){
  const list = $("#myBookings");
  list.innerHTML = "";
  const { bookings=[] } = store.read();
  bookings.slice().reverse().forEach(b=> {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${b.date} ${b.time}</strong> — ${b.mode} • ${b.topics.join(", ") || "general"} <br><span class="muted">${b.firstName} ${b.lastName} • ${b.email}</span>`;
    list.appendChild(li);
  });
}
store.up(d => { d.bookings = []; return d; });

renderBookings();

// Resources (embedded demo dataset)
const RESOURCES = [
  {id:1, lang:"en", type:"video", title:"Guided Breathing (3‑min)", by:"Campus Wellness", url:"https://www.youtube.com", tags:["anxiety","breathing"]},
  {id:2, lang:"en", type:"guide", title:"Exam Stress Toolkit", by:"Student Affairs", url:"#", tags:["exam","stress"]},
  {id:3, lang:"en", type:"audio", title:"Sleep Relaxation (10‑min)", by:"Counselling Center", url:"#", tags:["sleep"]},
  {id:4, lang:"hi", type:"guide", title:"तनाव प्रबंधन – शुरुआती गाइड", by:"मनोविज्ञान विभाग", url:"#", tags:["stress"]},
  {id:5, lang:"hi", type:"video", title:"नींद को बेहतर कैसे करें", by:"आईक्यूएसी", url:"#", tags:["sleep"]},
  {id:6, lang:"en", type:"guide", title:"Loneliness: Small Steps", by:"Peer Team", url:"#", tags:["lonely"]}
];

function renderResources(){
  const grid = $("#resGrid");
  const lang = $("#resLang").value;
  const type = $("#resType").value;
  const q = $("#resSearch").value.toLowerCase();
  grid.innerHTML = "";
  RESOURCES.filter(r=> (lang==="all" || r.lang===lang) && (type==="all" || r.type===type))
    .filter(r=> !q || r.title.toLowerCase().includes(q) || r.tags.some(t=> t.includes(q)))
    .forEach(r=> {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="content">
          <div class="meta">${r.lang.toUpperCase()} • ${r.type.toUpperCase()}</div>
          <h4>${r.title}</h4>
          <div class="meta">By ${r.by}</div>
          <a class="btn" href="${r.url}" target="_blank" rel="noopener">Open</a>
        </div>`;
      grid.appendChild(card);
    });
}
["resLang","resType","resSearch"].forEach(id=> $("#"+id).addEventListener("input", renderResources));
renderResources();

// Peer support — basic client‑side moderation
const BAD_WORDS = /(suicide|self\-harm|kill myself|harm others|violence)/i;
$("#postForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const content = (fd.get("content")||"").trim();
  if(BAD_WORDS.test(content)){
    addBanner();
  }
  store.up(d=> { d.posts = d.posts || []; d.posts.push({ content, ts: Date.now(), flagged: BAD_WORDS.test(content) }); return d; });
  $("#postMsg").textContent = "Posted (demo).";
  e.target.reset();
  renderPosts();
  setTimeout(()=> $("#postMsg").textContent = "", 3000);
});
function addBanner(){
  if(!$("#panicModal").open) $("#panicModal").showModal();
}
function renderPosts(){
  const list = $("#postList"); list.innerHTML = "";
  const { posts=[] } = store.read();
  posts.slice().reverse().forEach(p=> {
    const li = document.createElement("li");
    const date = new Date(p.ts).toLocaleString();
    li.innerHTML = `<div>${escapeHtml(p.content)}</div><div class="muted" style="margin-top:6px">${date}${p.flagged?' • <strong>FLAGGED</strong>':''}</div>`;
    list.appendChild(li);
  });
}
function escapeHtml(str){ return str.replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m])); }
renderPosts();

// Admin charts & stats
let moodChart, topicChart;
function renderAdmin(){
  const data = store.read();
  // Stats
  $("#statUsers").textContent = 1 + (data.posts?.length?1:0) + (data.bookings?.length?1:0); // demo
  $("#statCheckins").textContent = data.checkins?.length || 0;
  $("#statBookings").textContent = data.bookings?.length || 0;

  // Mood distribution
  const moodCounts = (data.checkins||[]).reduce((acc, c)=> (acc[c.mood]=(acc[c.mood]||0)+1, acc), {});
  const mctx = $("#moodChart");
  if(moodChart) moodChart.destroy();
  moodChart = new Chart(mctx, {
    type: "doughnut",
    data: { labels: Object.keys(moodCounts), datasets: [{ data: Object.values(moodCounts) }] },
    options: { plugins: { legend: { position: "bottom" } } }
  });

  // Booking topics
  const topicCounts = {};
  (data.bookings||[]).forEach(b=> (b.topics||[]).forEach(t=> topicCounts[t]=(topicCounts[t]||0)+1));
  const tctx = $("#topicChart");
  if(topicChart) topicChart.destroy();
  topicChart = new Chart(tctx, {
    type: "bar",
    data: { labels: Object.keys(topicCounts), datasets: [{ label:"Topics", data: Object.values(topicCounts) }] },
    options: { plugins: { legend: { display:false } }, scales: { y: { beginAtZero:true } } }
  });
}

// Export demo data
$("#exportBtn").addEventListener("click", (e)=>{
  e.preventDefault();
  const data = store.read();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "Manayush-demo-data.json";
  a.click();
  URL.revokeObjectURL(url);
});


if(location.hash){
  const target = location.hash.replace("#","");
  if($("#"+target)) setRoute(target);
}