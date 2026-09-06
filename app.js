/* ===================== 通用 ===================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
const fmt = s => { s = Math.max(0, s | 0); const m = (s / 60) | 0; const x = s % 60; return `${m}:${x < 10 ? '0' : ''}${x}`; };
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const dayIndex = len => Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000) % len;
const esc = s => String(s == null ? '' : s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

/* ===================== 导航 ===================== */
const VIEWS = { listening: '听力练习', slang: '每日俚语', news: '新闻拆解', quotes: '经典书摘', vocab: '生词本', checkin: '学习打卡' };
const sidebar = document.querySelector('.sidebar');
$$('.nav-item').forEach(b => b.addEventListener('click', () => {
  const t = b.dataset.target;
  $$('.nav-item').forEach(x => x.classList.toggle('active', x === b));
  $$('.view').forEach(v => v.classList.toggle('active', v.id === t));
  $('#topTitle').textContent = VIEWS[t];
  sidebar.classList.remove('open');
}));
$('#menuToggle')?.addEventListener('click', () => sidebar.classList.toggle('open'));
$('#todayLabel').textContent = todayStr();

/* ===================== 听力练习 ===================== */
let materials = LS.get('el_materials', null);
if (!materials) { materials = JSON.parse(JSON.stringify(SEED_MATERIALS)); LS.set('el_materials', materials); }
let cur = null, loopA = null, loopB = null, activeLine = null;
const mediaWrap = $('#mediaWrap'), transcriptEl = $('#transcript');

function renderMaterialSelect() {
  const sel = $('#materialSelect');
  sel.innerHTML = materials.map((m, i) => `<option value="${i}">${m.title}</option>`).join('');
}
function loadMaterial(i) {
  cur = materials[i];
  loopA = loopB = activeLine = null;
  $('#loopState').textContent = '未设定循环段';
  const url = cur._fileUrl || cur.url;
  if (!url) { mediaWrap.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-3)">该素材无可播放的媒体，请编辑并填入链接或本地文件。</div>'; transcriptEl.innerHTML = ''; return; }
  const el = document.createElement(cur.type === 'video' ? 'video' : 'audio');
  el.src = url; el.controls = true; el.preload = 'metadata';
  el.addEventListener('timeupdate', onTime);
  el.addEventListener('loadedmetadata', () => { $('#speed').onchange = () => el.playbackRate = parseFloat($('#speed').value); el.playbackRate = parseFloat($('#speed').value); });
  mediaWrap.innerHTML = ''; mediaWrap.appendChild(el);
  renderTranscript();
}
function renderTranscript() {
  if (!cur.transcript || !cur.transcript.length) { transcriptEl.innerHTML = '<div style="color:var(--text-3);padding:10px">暂无字幕，可在“添加素材”中补充。</div>'; return; }
  transcriptEl.innerHTML = cur.transcript.map((t, i) => `
    <div class="tr-line" data-i="${i}">
      <div class="tr-time">${fmt(t[0])}</div>
      <div>
        <div class="tr-en">${t[2]}</div>
        <div class="tr-zh">${t[3] || ''}</div>
      </div>
    </div>`).join('');
  $$('.tr-line', transcriptEl).forEach(line => line.addEventListener('click', () => {
    const i = +line.dataset.i, t = cur.transcript[i];
    loopA = t[0]; loopB = t[1]; activeLine = i;
    $$('.tr-line', transcriptEl).forEach(x => x.classList.toggle('active', x === line));
    updateLoopState();
    const media = mediaWrap.firstChild;
    media.currentTime = loopA; media.play();
  }));
}
function onTime(e) {
  const m = e.target;
  if (loopA == null) return;
  if (loopB != null && m.currentTime >= loopB) m.currentTime = loopA;
  else if (loopB == null && m.ended) m.currentTime = loopA;
}
function updateLoopState() {
  const s = $('#loopState');
  if (loopA != null && loopB != null) s.textContent = `循环 A–B：${fmt(loopA)} – ${fmt(loopB)}`;
  else if (loopA != null) s.textContent = `已设 A 点：${fmt(loopA)}（再设 B 点即从 A 循环到结尾）`;
  else s.textContent = '未设定循环段';
}
$('#materialSelect').addEventListener('change', e => loadMaterial(+e.target.value));
$('#setA').addEventListener('click', () => { const m = mediaWrap.firstChild; if (!m) return; loopA = m.currentTime; activeLine = null; $$('.tr-line', transcriptEl).forEach(x => x.classList.remove('active')); updateLoopState(); });
$('#setB').addEventListener('click', () => { const m = mediaWrap.firstChild; if (!m) return; loopB = m.currentTime; updateLoopState(); });
$('#clearLoop').addEventListener('click', () => { loopA = loopB = null; $$('.tr-line', transcriptEl).forEach(x => x.classList.remove('active')); updateLoopState(); });

/* 添加素材弹层 */
const modal = $('#materialModal');
$('#addMaterialBtn').addEventListener('click', () => {
  modal.hidden = false;
  aiReset();
});
$('#mCancel').addEventListener('click', () => modal.hidden = true);
$('#mSave').addEventListener('click', () => {
  const title = $('#mTitle').value.trim(); if (!title) { alert('请填写标题'); return; }
  const type = $('#mType').value;
  const url = $('#mUrl').value.trim();
  const file = $('#mFile').files[0];
  let _fileUrl = null;
  if (file) _fileUrl = URL.createObjectURL(file);
  const lines = $('#mTranscript').value.split('\n').map(l => l.trim()).filter(Boolean);
  const transcript = [];
  lines.forEach(l => { const m = l.match(/^\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*(.*?)\s*,\s*(.*?)\s*$/); if (m) transcript.push([parseFloat(m[1]), parseFloat(m[2]), m[3], m[4]]); });
  if (!url && !_fileUrl) { alert('请填写媒体链接或选择本地文件'); return; }
  materials.push({ id: 'm' + Date.now(), title, type, url, _fileUrl, transcript });
  LS.set('el_materials', materials);
  modal.hidden = true;
  renderMaterialSelect();
  $('#materialSelect').value = materials.length - 1;
  loadMaterial(materials.length - 1);
});

/* ===================== AI 自动生成字幕（浏览器端 Whisper） ===================== */
const aiGenBtn = $('#aiGenBtn'), aiTranslate = $('#aiTranslate'), aiNeed = $('#aiNeed');
const aiProgressWrap = $('#aiProgressWrap'), aiBar = $('#aiBar'), aiStatus = $('#aiStatus');
const mFile = $('#mFile'), mTranscript = $('#mTranscript'), mTitle = $('#mTitle');
let aiBusy = false;

function aiReset() {
  aiBusy = false;
  const has = mFile.files && mFile.files[0];
  aiGenBtn.disabled = !has;
  aiNeed.style.display = has ? 'none' : 'inline';
  aiProgressWrap.hidden = true;
  aiBar.style.width = '0%';
  aiStatus.textContent = '';
}
function aiSet(t) { aiStatus.textContent = t; }
function r2(n) { return Math.round(n * 100) / 100; }

mFile.addEventListener('change', () => {
  if (aiBusy) return;
  const has = mFile.files && mFile.files[0];
  aiGenBtn.disabled = !has;
  aiNeed.style.display = has ? 'none' : 'inline';
});

async function translateEn2Zh(text) {
  try {
    const u = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|zh-CN';
    const r = await fetch(u);
    const j = await r.json();
    const t = j && j.responseData && j.responseData.translatedText;
    if (!t || /MYMEMORY WARNING/i.test(t)) return '';
    return t.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  } catch { return ''; }
}

aiGenBtn.addEventListener('click', async () => {
  const file = mFile.files && mFile.files[0];
  if (!file || aiBusy) return;
  aiBusy = true; aiGenBtn.disabled = true;
  aiProgressWrap.hidden = false; aiBar.style.width = '0%';
  aiSet('正在加载语音识别引擎…');
  try {
    const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.2');
    env.allowLocalModels = false;
    const device = (typeof navigator !== 'undefined' && navigator.gpu) ? 'webgpu' : 'wasm';
    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {
      device,
      dtype: device === 'webgpu' ? 'fp32' : 'q8',
      progress_callback: p => {
        if (p.status === 'progress' && p.file) {
          aiBar.style.width = Math.round(p.progress || 0) + '%';
          aiSet(`下载模型 ${p.file}：${Math.round(p.progress || 0)}%`);
        } else if (p.status === 'ready') {
          aiSet('模型已就绪，开始识别语音…');
        }
      }
    });
    aiSet('模型已加载，正在转写音频…');
    const blobUrl = URL.createObjectURL(file);
    const out = await transcriber(blobUrl, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: 'english',
      task: 'transcribe',
      return_timestamps: true,
    });
    URL.revokeObjectURL(blobUrl);
    const chunks = (out.chunks || []).filter(c => Array.isArray(c.timestamp) && c.timestamp[1] != null);
    if (!chunks.length) throw new Error('未能识别出字幕，请换一段清晰音频重试。');
    let lines = chunks.map(c => {
      const [s, e] = c.timestamp;
      return [r2(s), r2(e), (c.text || '').trim(), ''];
    });
    if (aiTranslate.checked) {
      for (let i = 0; i < lines.length; i++) {
        lines[i][3] = await translateEn2Zh(lines[i][2]);
        aiBar.style.width = Math.round((i + 1) / lines.length * 100) + '%';
        aiSet(`翻译中 ${i + 1}/${lines.length}`);
      }
    }
    mTranscript.value = lines.map(l => `${l[0]},${l[1]},${l[2]},${l[3]}`).join('\n');
    if (!mTitle.value.trim()) mTitle.value = file.name.replace(/\.[^.]+$/, '');
    aiBar.style.width = '100%';
    aiSet(`✓ 已生成 ${lines.length} 条字幕，点击【保存】即可添加到听力列表。`);
  } catch (err) {
    console.error(err);
    aiSet('出错了：' + (err && err.message ? err.message : err) + '（可重试，或手动填写字幕）');
  } finally {
    aiBusy = false;
    aiGenBtn.disabled = !(mFile.files && mFile.files[0]);
  }
});

/* ===================== 每日俚语 ===================== */
function renderSlang(idx) {
  const s = SLANGS[idx];
  $('#slangCard').innerHTML = `
    <div class="slang-date">${idx === dayIndex(SLANGS.length) ? '今日俚语 · ' + todayStr() : '俚语 No.' + (idx + 1)}</div>
    <div class="slang-word">${s.word}</div>
    <div class="slang-phon">${s.phon}</div>
    <div class="slang-mean">${s.mean}</div>
    <div class="slang-eg"><div class="en">${s.en}</div><div class="zh">${s.zh}</div></div>
    <button class="btn ghost small" id="slangCollect" style="margin-top:16px">＋ 收藏此俚语</button>`;
  $('#slangCollect').onclick = () => addVocab(s.word, s.mean.replace(/<[^>]+>/g, ''), '俚语');
}
function renderSlangArchive() {
  $('#slangArchive').innerHTML = SLANGS.map((s, i) => `<div class="chip" data-i="${i}">${s.word}</div>`).join('');
  $$('#slangArchive .chip').forEach(c => c.addEventListener('click', () => renderSlang(+c.dataset.i)));
}
$('#slangRandom').addEventListener('click', () => renderSlang(Math.floor(Math.random() * SLANGS.length)));
$('#slangToday').addEventListener('click', () => renderSlang(dayIndex(SLANGS.length)));

/* ===================== 新闻拆解 ===================== */
function renderNews() {
  $('#newsList').innerHTML = NEWS.map((n, i) => `
    <div class="news-item" data-i="${i}">
      <div class="news-head">
        <span class="tag">${n.tag}</span>
        <h3>${n.title}</h3>
        <span class="arrow">▸</span>
      </div>
      <div class="news-body"><div class="news-inner">
        <p class="news-en">${n.en}</p>
        <p class="news-zh">${n.zh}</p>
        <div class="block-title">高频生词</div>
        <div class="vocab">${n.vocab.map(v => `<span class="v collect" data-w="${esc(v.w)}" data-m="${esc(v.m)}" title="点击收藏到生词本"><b>${v.w}</b> ${esc(v.m)}<span class="plus">＋</span></span>`).join('')}</div>
        <div class="block-title">语法拆解</div>
        <ul class="grammar">${n.grammar.map(g => `<li>${esc(g)}</li>`).join('')}</ul>
        <div class="news-source">来源：${esc(n.source ? n.source : '示例材料（非真实新闻，仅供练习格式演示）')}</div>
      </div></div>
    </div>`).join('');
  $$('#newsList .news-item').forEach(it => it.querySelector('.news-head').addEventListener('click', () => it.classList.toggle('open')));
  $$('#newsList .collect').forEach(c => c.addEventListener('click', () => addVocab(c.dataset.w, c.dataset.m, '新闻')));
}

/* ===================== 名人名言 ===================== */
function renderQuotes() {
  const idx = dayIndex(QUOTES.length);
  const f = QUOTES[idx];
  $('#quoteFeature').innerHTML = `<div class="q">“${f.q}”</div><div class="a">— ${f.a}</div><div class="e">${f.e}</div>`;
  $('#quoteGrid').innerHTML = QUOTES.map(q => `<div class="quote-card"><div class="q">“${q.q}”</div><div class="a">— ${q.a}</div><div class="e">${q.e}</div></div>`).join('');
  $('#topQuote').textContent = `“${f.q}” — ${f.a}`;
}

/* ===================== 学习打卡 ===================== */
let checkins = LS.get('el_checkins', []);
let diaries = LS.get('el_diaries', {});
function renderCheckin() {
  $('#streakNum').textContent = streak();
  $('#totalNum').textContent = checkins.length;
  renderCalendar();
  const t = todayStr();
  $('#diary').value = diaries[t] || '';
  renderDiaryHistory();
  const done = checkins.includes(t);
  const btn = $('#checkinBtn');
  btn.textContent = done ? '今日已打卡 ✓' : '今日打卡';
  btn.disabled = done;
  btn.style.opacity = done ? .6 : 1;
}
function streak() {
  if (!checkins.length) return 0;
  const set = new Set(checkins);
  let n = 0; const d = new Date();
  // 若今天未打卡，从昨天起算连续
  if (!set.has(todayStr())) d.setDate(d.getDate() - 1);
  while (set.has(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)) {
    n++; d.setDate(d.getDate() - 1);
  }
  return n;
}
function renderCalendar() {
  const now = new Date(), y = now.getFullYear(), mo = now.getMonth();
  const first = new Date(y, mo, 1).getDay();
  const days = new Date(y, mo + 1, 0).getDate();
  const set = new Set(checkins); const t = todayStr();
  const heads = ['日', '一', '二', '三', '四', '五', '六'].map(h => `<div class="cal-cell head">${h}</div>`).join('');
  let cells = '';
  for (let i = 0; i < first; i++) cells += '<div class="cal-cell"></div>';
  for (let d = 1; d <= days; d++) {
    const ds = `${y}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const cls = ['cal-cell']; if (set.has(ds)) cls.push('on'); if (ds === t) cls.push('today');
    cells += `<div class="${cls.join(' ')}"><span class="d">${d}</span>${set.has(ds) ? '★' : ''}</div>`;
  }
  $('#calendar').innerHTML = heads + cells;
}
$('#checkinBtn').addEventListener('click', () => {
  const t = todayStr();
  if (!checkins.includes(t)) { checkins.push(t); LS.set('el_checkins', checkins); renderCheckin(); }
});
$('#saveDiary').addEventListener('click', () => {
  const t = todayStr(); const v = $('#diary').value.trim();
  if (v) diaries[t] = v; else delete diaries[t];
  LS.set('el_diaries', diaries);
  $('#diaryHint').textContent = '已保存 ✓';
  setTimeout(() => $('#diaryHint').textContent = '', 2000);
  renderCheckin();
});
function renderDiaryHistory() {
  const entries = Object.entries(diaries).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 8);
  $('#diaryHistory').innerHTML = entries.length ? entries.map(([d, tx]) => `<div class="diary-entry"><div class="dt">${d}</div><div class="tx">${tx.replace(/</g, '&lt;')}</div></div>`).join('') : '<div style="color:var(--text-3);font-size:13px">还没有日记，写下第一篇吧。</div>';
}

/* ===================== 生词本 ===================== */
let vocabBook = LS.get('el_vocab', []);
function renderVocab() {
  $('#vCount').textContent = vocabBook.length ? `共 ${vocabBook.length} 个词` : '';
  if (!vocabBook.length) { $('#vocabBook').innerHTML = '<div style="color:var(--text-3);font-size:13px">还没有收藏生词，去「新闻拆解」点生词上的 ＋，或上方手动添加。</div>'; return; }
  $('#vocabBook').innerHTML = vocabBook.map((w, i) => `
    <div class="vb-item">
      <div class="vb-word">${esc(w.word)}</div>
      <div><div class="vb-mean">${esc(w.mean)}</div>${w.note ? `<div class="vb-note">${esc(w.note)}</div>` : ''}</div>
      <button class="vb-del" data-i="${i}" title="删除">×</button>
    </div>`).join('');
  $$('#vocabBook .vb-del').forEach(b => b.addEventListener('click', () => { vocabBook.splice(+b.dataset.i, 1); LS.set('el_vocab', vocabBook); renderVocab(); }));
}
function addVocab(word, mean, from) {
  word = (word || '').trim(); mean = (mean || '').trim();
  if (!word || !mean) return;
  if (vocabBook.some(v => v.word.toLowerCase() === word.toLowerCase())) { flashHint(`「${word}」已在生词本`); return; }
  vocabBook.unshift({ word, mean, note: from ? `来自：${from}` : '' });
  LS.set('el_vocab', vocabBook); renderVocab(); flashHint(`已收藏「${word}」`);
}
function flashHint(t) {
  const el = $('#vCount'); const old = el.textContent; el.textContent = t;
  setTimeout(() => { el.textContent = vocabBook.length ? `共 ${vocabBook.length} 个词` : old; }, 1600);
}
$('#vAdd').addEventListener('click', () => {
  const word = $('#vWord').value.trim(), mean = $('#vMean').value.trim();
  if (!word || !mean) { alert('请填写单词和释义'); return; }
  addVocab(word, mean, $('#vNote').value.trim() ? `笔记：${$('#vNote').value.trim()}` : '');
  $('#vWord').value = $('#vMean').value = $('#vNote').value = '';
});
function exportVocab(type) {
  if (!vocabBook.length) { alert('生词本为空'); return; }
  let content, mime, ext;
  if (type === 'csv') {
    const rows = [['word', 'meaning', 'note']].concat(vocabBook.map(w => [w.word, w.mean, w.note || '']));
    content = '﻿' + rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\r\n');
    mime = 'text/csv'; ext = 'csv';
  } else {
    content = JSON.stringify(vocabBook, null, 2); mime = 'application/json'; ext = 'json';
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = `vocab-book.${ext}`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
$('#vExportCsv').addEventListener('click', () => exportVocab('csv'));
$('#vExportJson').addEventListener('click', () => exportVocab('json'));

/* ===================== 初始化 ===================== */
renderMaterialSelect();
loadMaterial(0);
renderSlang(dayIndex(SLANGS.length));
renderSlangArchive();
renderNews();
renderQuotes();
renderVocab();
renderCheckin();
