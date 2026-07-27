/* ═══════════════════════════════════════════
   api-features.js - API Integrations Module
   Add this file to your project and include it
   after your main script in the HTML
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   API MANAGER
   ═══════════════════════════════════════════ */
class APIManager {
  constructor() {
    this.keys = this.loadKeys();
    this.cache = new Map();
    this.cacheTimeout = 3600000; // 1 hour
  }
  
  loadKeys() {
    try {
      const saved = localStorage.getItem('hwa_api_keys');
      return saved ? JSON.parse(saved) : { googleBooks: '', unsplash: '' };
    } catch(e) {
      return { googleBooks: '', unsplash: '' };
    }
  }
  
  saveKeys() {
    localStorage.setItem('hwa_api_keys', JSON.stringify(this.keys));
  }
  
  isConfigured(service) {
    return !!this.keys[service];
  }
  
  async fetchWithCache(url, options = {}) {
    const cacheKey = url;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.warn('API fetch failed:', error);
      return null;
    }
  }
}

/* ═══════════════════════════════════════════
   GOOGLE BOOKS API
   ═══════════════════════════════════════════ */
class GoogleBooksAPI {
  constructor(apiManager) {
    this.api = apiManager;
    this.baseURL = 'https://www.googleapis.com/books/v1/volumes';
  }
  
  async searchAuthorBooks(authorName, lang = 'ar') {
    if (!this.api.isConfigured('googleBooks')) {
      console.warn('Google Books API key not configured');
      return [];
    }
    
    const url = `${this.baseURL}?q=inauthor:"${encodeURIComponent(authorName)}"&langRestrict=${lang}&maxResults=5&key=${this.api.keys.googleBooks}`;
    
    try {
      const data = await this.api.fetchWithCache(url);
      return this.formatResults(data);
    } catch (error) {
      console.error('Google Books API error:', error);
      return [];
    }
  }
  
  formatResults(data) {
    if (!data || !data.items) return [];
    
    return data.items.map(item => {
      const volumeInfo = item.volumeInfo || {};
      return {
        id: item.id,
        title: volumeInfo.title || 'غير معروف',
        authors: volumeInfo.authors || ['غير معروف'],
        description: volumeInfo.description || '',
        coverUrl: volumeInfo.imageLinks?.thumbnail || '',
        previewLink: volumeInfo.previewLink || '',
        publishedDate: volumeInfo.publishedDate || '',
        pageCount: volumeInfo.pageCount || 0,
        language: volumeInfo.language || '',
        categories: volumeInfo.categories || []
      };
    });
  }
  
  renderBookCard(book) {
    return `
      <div class="book-card" style="background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:1rem;margin:.8rem 0;display:flex;gap:1rem;align-items:center">
        ${book.coverUrl ? 
          `<img src="${book.coverUrl}" alt="${this.escape(book.title)}" class="book-cover" loading="lazy" style="width:80px;height:120px;border-radius:4px;object-fit:cover;flex-shrink:0">` :
          `<div style="width:80px;height:120px;background:var(--card);border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--muted)">📚</div>`
        }
        <div>
          <div style="font-family:Amiri,serif;font-size:1.1rem;font-weight:700;color:var(--ink);margin-bottom:.3rem">${this.escape(book.title)}</div>
          <div style="color:var(--muted);font-size:.85rem;margin-bottom:.5rem">
            ${book.authors.join('، ')} · ${book.publishedDate}
            ${book.pageCount ? ` · ${book.pageCount} صفحة` : ''}
          </div>
          ${book.description ? 
            `<p style="font-size:.85rem;line-height:1.7;color:var(--ink);margin-bottom:.7rem">${this.escape(book.description).substring(0, 150)}...</p>` : ''
          }
          ${book.previewLink ? 
            `<a href="${book.previewLink}" target="_blank" rel="noopener" style="color:var(--lapis);text-decoration:none;font-size:.85rem;font-weight:500">📖 معاينة الكتاب ←</a>` : ''
          }
        </div>
      </div>
    `;
  }
  
  escape(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/* ═══════════════════════════════════════════
   TEXT-TO-SPEECH API
   ═══════════════════════════════════════════ */
class TextToSpeechAPI {
  constructor() {
    this.synth = window.speechSynthesis;
    this.utterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.queue = [];
  }
  
  getArabicVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices().filter(voice => 
      voice.lang.startsWith('ar') || 
      voice.name.includes('Arabic') ||
      voice.name.includes('Mehdi') ||
      voice.name.includes('Tarik') ||
      voice.name.includes('Maged') ||
      voice.name.includes('Laila') ||
      voice.name.includes('Mariam') ||
      voice.name.includes('Zira')
    );
  }
  
  getBestArabicVoice() {
    const voices = this.getArabicVoices();
    
    const preferred = voices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Natural') ||
      v.name.includes('Premium')
    );
    
    return preferred || voices[0] || (this.synth ? this.synth.getVoices()[0] : null);
  }
  
  speak(text, options = {}) {
    if (!this.synth) return;
    
    this.stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'ar-SA';
    utterance.rate = options.rate || 0.85;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    
    const voice = options.voice || this.getBestArabicVoice();
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      if (options.onStart) options.onStart();
    };
    
    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      if (options.onEnd) options.onEnd();
      
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        this.speak(next.text, next.options);
      }
    };
    
    utterance.onerror = (event) => {
      console.warn('Speech error:', event);
      this.isPlaying = false;
      if (options.onError) options.onError(event);
    };
    
    this.utterance = utterance;
    this.synth.speak(utterance);
  }
  
  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }
  
  resume() {
    if (this.synth && this.isPlaying && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }
  
  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.utterance = null;
    }
  }
  
  addToQueue(text, options = {}) {
    this.queue.push({ text, options });
  }
  
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      queueLength: this.queue.length,
      voicesAvailable: this.getArabicVoices().length
    };
  }
}

/* ═══════════════════════════════════════════
   INITIALIZE API SERVICES
   ═══════════════════════════════════════════ */
const apiManager = new APIManager();
const googleBooks = new GoogleBooksAPI(apiManager);
const tts = new TextToSpeechAPI();

/* ═══════════════════════════════════════════
   ENHANCED AUTHOR MODAL
   ═══════════════════════════════════════════ */
const originalOpenAuthor = window.openAuthor;

window.openAuthor = async function(name) {
  // Call original function first
  originalOpenAuthor(name);
  
  // Add Google Books section if API is configured
  if (apiManager.isConfigured('googleBooks')) {
    const modal = document.getElementById('authorModal');
    const mQuotes = document.getElementById('mQuotes');
    
    // Check if books section already exists
    let booksSection = document.getElementById('authorBooks');
    if (booksSection) booksSection.remove();
    
    booksSection = document.createElement('div');
    booksSection.id = 'authorBooks';
    booksSection.innerHTML = `
      <div class="modal-sub" style="margin-top:1.5rem">
        📚 كتب ${name} 
        <span class="api-badge books" style="display:inline-block;font-size:.7rem;padding:.2rem .6rem;border-radius:999px;margin-inline-start:.5rem;font-weight:500;background:rgba(66,133,244,.2);color:#4285f4">Google Books</span>
      </div>
      <div style="margin-top:.8rem;text-align:center;padding:1rem">
        <span class="loading-spinner" style="display:inline-block;width:20px;height:20px;border:2px solid var(--muted);border-radius:50%;border-top-color:var(--ochre);animation:spin .8s linear infinite;margin-inline-end:.5rem"></span>
        جاري البحث عن الكتب...
      </div>
    `;
    
    mQuotes.after(booksSection);
    
    // Fetch books
    googleBooks.searchAuthorBooks(name)
      .then(books => {
        if (books.length === 0) {
          booksSection.innerHTML = `
            <div class="modal-sub" style="margin-top:1.5rem">
              📚 كتب ${name}
              <span class="api-badge books">Google Books</span>
            </div>
            <p style="color:var(--muted);text-align:center;padding:1rem">لم يتم العثور على كتب</p>
          `;
        } else {
          booksSection.innerHTML = `
            <div class="modal-sub" style="margin-top:1.5rem">
              📚 كتب ${name}
              <span class="api-badge books">Google Books</span>
            </div>
            ${books.map(book => googleBooks.renderBookCard(book)).join('')}
          `;
        }
      })
      .catch(() => {
        booksSection.innerHTML = `
          <div class="modal-sub" style="margin-top:1.5rem">
            📚 كتب ${name}
            <span class="api-badge books">Google Books</span>
          </div>
          <p style="color:var(--muted);text-align:center;padding:1rem">تعذّر تحميل الكتب</p>
        `;
      });
  }
};

/* ═══════════════════════════════════════════
   ENHANCED CARD WITH VOICE BUTTON
   ═══════════════════════════════════════════ */
const originalCard = window.card;

window.card = function(q, i) {
  // Call original card function
  let html = originalCard(q, i);
  
  // Add voice button if Web Speech API is available
  if (window.speechSynthesis) {
    const voiceBtn = `<button class="voice-btn" onclick="readQuote('${q.id}')" id="voice-${q.id}" 
      style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(76,175,80,.1);border:1px solid rgba(76,175,80,.3);color:#4caf50;font-family:Tajawal,sans-serif;font-size:.85rem;padding:.4rem 1rem;border-radius:999px;cursor:pointer;transition:all .2s"
      aria-label="استمع للاقتباس">
      🔊 <span>استمع</span>
    </button>`;
    
    // Insert voice button before closing post-actions div
    html = html.replace('</div>\n      <div class="cpreview"', `${voiceBtn}</div>\n      <div class="cpreview"`);
  }
  
  return html;
};

/* ═══════════════════════════════════════════
   TEXT-TO-SPEECH FUNCTION
   ═══════════════════════════════════════════ */
window.readQuote = function(quoteId) {
  const q = allQuotes().find(x => x.id === quoteId);
  if (!q) return;
  
  const btn = document.getElementById(`voice-${quoteId}`);
  if (!btn) return;
  
  if (tts.isPlaying && !tts.isPaused) {
    tts.pause();
    btn.classList.remove('playing');
    btn.style.background = 'rgba(76,175,80,.1)';
    btn.style.color = '#4caf50';
    btn.innerHTML = '🔊 <span>استمع</span>';
    return;
  }
  
  if (tts.isPaused) {
    tts.resume();
    btn.classList.add('playing');
    btn.style.background = '#4caf50';
    btn.style.color = '#fff';
    btn.innerHTML = '⏸️ <span>إيقاف</span>';
    return;
  }
  
  btn.classList.add('playing');
  btn.style.background = '#4caf50';
  btn.style.color = '#fff';
  btn.innerHTML = '⏸️ <span>إيقاف</span>';
  
  tts.speak(q.text, {
    rate: 0.8,
    onEnd: () => {
      btn.classList.remove('playing');
      btn.style.background = 'rgba(76,175,80,.1)';
      btn.style.color = '#4caf50';
      btn.innerHTML = '🔊 <span>استمع</span>';
    },
    onError: () => {
      btn.classList.remove('playing');
      btn.style.background = 'rgba(76,175,80,.1)';
      btn.style.color = '#4caf50';
      btn.innerHTML = '🔊 <span>استمع</span>';
      showToast('تعذّر تشغيل الصوت');
    }
  });
};

/* ═══════════════════════════════════════════
   ENHANCED DAILY QUOTE
   ═══════════════════════════════════════════ */
const originalRenderDaily = window.renderDaily;

window.renderDaily = function() {
  originalRenderDaily();
  
  // Add voice button to daily quote
  if (window.speechSynthesis) {
    const daily = document.getElementById('daily');
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-btn';
    voiceBtn.id = 'voice-daily';
    voiceBtn.style.cssText = 'margin-top:1rem;position:relative;z-index:2;display:inline-flex;align-items:center;gap:.4rem;background:rgba(76,175,80,.1);border:1px solid rgba(76,175,80,.3);color:#4caf50;font-family:Tajawal,sans-serif;font-size:.85rem;padding:.4rem 1rem;border-radius:999px;cursor:pointer';
    voiceBtn.innerHTML = '🔊 استمع للاقتباس';
    voiceBtn.onclick = readDailyQuote;
    daily.appendChild(voiceBtn);
  }
};

window.readDailyQuote = function() {
  const text = document.querySelector('.daily .dtext').textContent;
  const btn = document.getElementById('voice-daily');
  
  if (tts.isPlaying && !tts.isPaused) {
    tts.stop();
    btn.classList.remove('playing');
    btn.style.background = 'rgba(76,175,80,.1)';
    btn.style.color = '#4caf50';
    btn.innerHTML = '🔊 استمع للاقتباس';
    return;
  }
  
  btn.classList.add('playing');
  btn.style.background = '#4caf50';
  btn.style.color = '#fff';
  btn.innerHTML = '⏸️ إيقاف';
  
  tts.speak(text, {
    rate: 0.8,
    onEnd: () => {
      btn.classList.remove('playing');
      btn.style.background = 'rgba(76,175,80,.1)';
      btn.style.color = '#4caf50';
      btn.innerHTML = '🔊 استمع للاقتباس';
    }
  });
};

/* ═══════════════════════════════════════════
   API SETTINGS MODAL
   ═══════════════════════════════════════════ */
window.openApiSettings = function() {
  // Create modal if it doesn't exist
  let modal = document.getElementById('apiSettingsModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'apiSettingsModal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'إعدادات API');
    
    modal.innerHTML = `
      <div class="modal-box" style="max-width:500px">
        <button class="modal-close" onclick="closeApiSettings()" aria-label="إغلاق">&times;</button>
        <h2 class="modal-name">⚙️ إعدادات API</h2>
        <div class="modal-era">أدخل مفاتيح API لتفعيل الميزات الإضافية</div>
        
        <div style="margin:1.5rem 0">
          <label style="display:block;margin-bottom:.5rem;color:var(--ink);font-weight:500">📚 Google Books API Key</label>
          <input id="googleBooksKey" type="password" placeholder="AIzaSy..." style="width:100%;padding:.7rem;background:var(--paper);border:1px solid var(--line);border-radius:8px;color:var(--ink);font-family:Tajawal,sans-serif">
          <small style="color:var(--muted)">احصل عليه من <a href="https://console.cloud.google.com/apis/library/books.googleapis.com" target="_blank" style="color:var(--lapis)">Google Cloud Console</a></small>
        </div>
        
        <div style="margin:1.5rem 0">
          <label style="display:block;margin-bottom:.5rem;color:var(--ink);font-weight:500">🎨 Unsplash Access Key</label>
          <input id="unsplashKey" type="password" placeholder="Client-ID..." style="width:100%;padding:.7rem;background:var(--paper);border:1px solid var(--line);border-radius:8px;color:var(--ink);font-family:Tajawal,sans-serif">
          <small style="color:var(--muted)">احصل عليه من <a href="https://unsplash.com/developers" target="_blank" style="color:var(--lapis)">Unsplash Developers</a></small>
        </div>
        
        <button onclick="saveApiKeys()" style="width:100%;padding:.8rem;background:var(--ochre);color:#fff;border:none;border-radius:10px;font-family:Tajawal,sans-serif;font-size:1rem;cursor:pointer;margin-top:1rem">💾 حفظ الإعدادات</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click handler to close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeApiSettings();
    });
  }
  
  // Populate keys
  document.getElementById('googleBooksKey').value = apiManager.keys.googleBooks || '';
  document.getElementById('unsplashKey').value = apiManager.keys.unsplash || '';
  
  modal.classList.add('open');
};

window.closeApiSettings = function() {
  const modal = document.getElementById('apiSettingsModal');
  if (modal) modal.classList.remove('open');
};

window.saveApiKeys = function() {
  apiManager.keys.googleBooks = document.getElementById('googleBooksKey').value.trim();
  apiManager.keys.unsplash = document.getElementById('unsplashKey').value.trim();
  apiManager.saveKeys();
  
  showToast('تم حفظ الإعدادات ✔');
  closeApiSettings();
  
  console.log('✅ Google Books API:', apiManager.isConfigured('googleBooks') ? 'Ready' : 'Not configured');
  console.log('✅ Unsplash API:', apiManager.isConfigured('unsplash') ? 'Ready' : 'Not configured');
};

/* ═══════════════════════════════════════════
   ADD API BUTTON TO AUTH BAR
   ═══════════════════════════════════════════ */
const originalUpdateAuthUI = window.updateAuthUI;

window.updateAuthUI = function() {
  originalUpdateAuthUI();
  
  const bar = document.getElementById('authbar');
  const existingBtn = bar.querySelector('[onclick="openApiSettings()"]');
  
  if (!existingBtn && bar.querySelector('.auth-user')) {
    const apiBtn = document.createElement('button');
    apiBtn.className = 'auth-fav';
    apiBtn.style.cssText = 'border-color:var(--muted);color:var(--muted)';
    apiBtn.textContent = '⚙️ API';
    apiBtn.onclick = openApiSettings;
    
    const userSpan = bar.querySelector('.auth-user');
    userSpan.appendChild(apiBtn);
  }
};

/* ═══════════════════════════════════════════
   ADD CSS ANIMATIONS
   ═══════════════════════════════════════════ */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  
  .voice-btn:hover { background: rgba(76,175,80,.2) !important; }
  .voice-btn.playing { background: #4caf50 !important; color: #fff !important; }
`;
document.head.appendChild(styleSheet);

/* ═══════════════════════════════════════════
   INITIALIZE VOICES
   ═══════════════════════════════════════════ */
if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => {
    const voices = tts.getArabicVoices();
    if (voices.length > 0) {
      console.log('✅ Arabic voices loaded:', voices.length);
    }
  };
}

/* ═══════════════════════════════════════════
   LOG STATUS
   ═══════════════════════════════════════════ */
console.log('🚀 API Features Module Loaded:');
console.log('  📚 Google Books:', apiManager.isConfigured('googleBooks') ? '✅ Ready' : '⚠️ Not configured');
console.log('  🎨 Unsplash:', apiManager.isConfigured('unsplash') ? '✅ Ready' : '⚠️ Not configured');
console.log('  🔊 Text-to-Speech:', window.speechSynthesis ? '✅ Ready' : '❌ Not available');
console.log('  ⚙️ API Settings: Click ⚙️ API button in navbar to configure');