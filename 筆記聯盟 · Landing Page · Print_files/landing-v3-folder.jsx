/* global React */
// V3 — 學科資料夾版：tab 切換、接近產品感、系統化
const { useState: useState3, useRef: useRef3 } = React;

const v3 = {
  paper: '#F5EFE1',
  paperAlt: '#ECE4D0',
  card: '#FFFDF6',
  ink: '#1C1C1A',
  inkSoft: '#45443E',
  muted: '#8F8A7B',
  rule: '#D8CFB8',
  accent: '#C24A2C',
  yellow: '#F2C94C',
  blue: '#4A6FA5',
  green: '#4E7A4A',
};

const HW3 = ({ children, size = 22, color = v3.accent, rotate = -2, style }) => (
  <span style={{
    fontFamily: '"Caveat", cursive', fontWeight: 700,
    fontSize: size, color, display: 'inline-block',
    transform: `rotate(${rotate}deg)`, lineHeight: 1, ...style,
  }}>{children}</span>
);

const SUBJECTS = [
  { id: 'chinese', name: '國文', color: v3.accent, hand: '紅樓夢・古文' },
  { id: 'math', name: '數學', color: v3.blue, hand: '三角・微積分' },
  { id: 'english', name: '英文', color: v3.green, hand: '文法・克漏字' },
  { id: 'history', name: '歷史', color: v3.yellow, hand: '冷戰・辛亥' },
  { id: 'bio', name: '生物', color: '#7C5CB9', hand: '細胞・遺傳' },
  { id: 'chem', name: '化學', color: '#C07B2F', hand: '酸鹼・氧化' },
];

function TabbedGalleryV3() {
  const [active, setActive] = useState3(SUBJECTS[0].id);
  const [lb, setLb] = useState3(null);
  const [uploads, setUploads] = useState3({});
  const inp = useRef3(null);

  const add = (files) => {
    const arr = Array.from(files).map((f, i) => ({
      id: Date.now() + i, uploaded: true,
      src: URL.createObjectURL(f), label: f.name.replace(/\.[^.]+$/, ''),
    }));
    setUploads(p => ({ ...p, [active]: [...arr, ...(p[active] || [])] }));
  };

  const subj = SUBJECTS.find(s => s.id === active);
  const defaultNotes = Array.from({ length: 3 }, (_, i) => ({
    id: `${active}-${i}`, label: `${subj.name} · 範例 ${String(i + 1).padStart(2, '0')}`,
  }));
  const all = [...(uploads[active] || []), ...defaultNotes];

  return (
    <div>
      {/* tabs row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, position: 'relative', zIndex: 2 }}>
        {SUBJECTS.map(s => {
          const isActive = s.id === active;
          return (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{
                background: isActive ? v3.card : v3.paperAlt,
                color: isActive ? v3.ink : v3.muted,
                border: `1.5px solid ${v3.ink}`,
                borderBottom: isActive ? 'none' : `1.5px solid ${v3.ink}`,
                padding: isActive ? '18px 28px 22px' : '14px 24px 16px',
                fontFamily: '"Noto Serif TC", serif',
                fontSize: isActive ? 18 : 15,
                fontWeight: 900, letterSpacing: '0.02em',
                cursor: 'pointer', position: 'relative',
                marginBottom: isActive ? -1.5 : 0,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
              <span style={{ width: 10, height: 10, background: s.color, borderRadius: 2 }}/>
              {s.name}
            </button>
          );
        })}
        <div style={{ flex: 1 }}/>
        <button onClick={() => inp.current?.click()}
          style={{
            background: 'transparent', border: `1.5px dashed ${v3.ink}`,
            padding: '14px 20px', fontSize: 13, color: v3.ink, cursor: 'pointer',
            fontFamily: '"Noto Sans TC", sans-serif', fontWeight: 600,
          }}>
          ＋ 上傳你的 {subj.name} 筆記
        </button>
        <input ref={inp} type="file" accept="image/*" multiple hidden onChange={e => add(e.target.files)}/>
      </div>

      {/* folder body */}
      <div style={{
        background: v3.card, border: `1.5px solid ${v3.ink}`,
        padding: '40px 40px 48px', position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 30, paddingBottom: 20, borderBottom: `1px dashed ${v3.rule}` }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.15em', color: v3.muted, marginBottom: 4 }}>FOLDER / {subj.id.toUpperCase()}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 40, fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>{subj.name}</h3>
              <HW3 size={22} color={subj.color} rotate={-3}>{subj.hand}</HW3>
            </div>
          </div>
          <div style={{ fontSize: 13, color: v3.muted }}>{all.length} 頁 · 點擊任一張放大</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {all.map((img, i) => (
            <div key={img.id} onClick={() => setLb(img)}
              style={{
                aspectRatio: '4/5', background: v3.paper,
                border: `1px solid ${v3.rule}`, position: 'relative',
                cursor: 'zoom-in', overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.12)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {img.uploaded ? (
                <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              ) : (
                <NoteMockV3 subject={subj} seed={i}/>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 16px 12px',
                background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))',
                color: v3.paper, fontSize: 13, fontWeight: 600,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              }}>
                <span>{img.label}</span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>⤢</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lb && (
        <div onClick={() => setLb(null)} style={{
          position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(28,28,26,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40, cursor: 'zoom-out',
        }}>
          <div onClick={e => e.stopPropagation()}>
            <button onClick={() => setLb(null)} style={{
              position: 'absolute', top: 24, right: 32, background: 'transparent',
              color: v3.paper, border: 'none', fontSize: 22, cursor: 'pointer',
            }}>✕ 關閉</button>
            {lb.uploaded ? (
              <img src={lb.src} alt={lb.label} style={{ maxWidth: '85vw', maxHeight: '80vh' }}/>
            ) : (
              <div style={{ width: 'min(70vw, 640px)', aspectRatio: '4/5' }}>
                <NoteMockV3 subject={subj} seed={0} large/>
              </div>
            )}
            <div style={{ color: v3.paper, fontFamily: '"Noto Serif TC", serif', fontSize: 20, marginTop: 16, textAlign: 'center' }}>{lb.label}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoteMockV3({ subject, seed = 0, large = false }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `
        repeating-linear-gradient(180deg, transparent 0 ${large ? 30 : 18}px, ${v3.rule} ${large ? 30 : 18}px ${large ? 31 : 19}px),
        #FFFDF6
      `,
      padding: large ? '30px 36px' : '20px 18px',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: large ? 60 : 36, top: 0, bottom: 0, width: 1, background: `${subject.color}66` }}/>
      <div style={{
        fontFamily: '"Noto Serif TC", serif', fontWeight: 900,
        fontSize: large ? 24 : 14, color: v3.ink,
        display: 'inline-block',
        borderBottom: `2px solid ${subject.color}`, paddingBottom: 4,
        marginBottom: large ? 16 : 8,
      }}>{subject.name}</div>
      <div style={{ fontSize: large ? 12 : 7, lineHeight: large ? '30px' : '19px', color: v3.inkSoft }}>
        {Array.from({ length: large ? 14 : 9 }).map((_, i) => {
          const w = 40 + ((i * 17 + seed * 13) % 55);
          const hi = i % 4 === 1;
          return (
            <div key={i} style={{ display: 'flex', gap: 5 }}>
              {i % 3 === 0 && <span style={{ color: subject.color, fontWeight: 900 }}>▪</span>}
              <div style={{
                height: large ? 8 : 4, width: `${w}%`,
                background: hi ? v3.yellow : v3.inkSoft,
                opacity: hi ? 0.7 : 0.5, borderRadius: 1,
              }}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingV3({ formUrl = '#', ytUrl = '' }) {
  const ytEmbed = ytUrl ? ytUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') : '';

  return (
    <div style={{ background: v3.paper, color: v3.ink, fontFamily: '"Noto Sans TC", sans-serif', minHeight: '100%' }}>
      {/* NAV */}
      <nav style={{
        padding: '18px 60px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: `1px solid ${v3.rule}`,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 32, height: 32, background: v3.ink, color: v3.paper,
            display: 'grid', placeItems: 'center', fontFamily: '"Noto Serif TC", serif',
            fontWeight: 900, fontSize: 16,
          }}>聯</div>
          <div style={{ fontFamily: '"Noto Serif TC", serif', fontWeight: 900, fontSize: 18 }}>筆記聯盟</div>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: v3.inkSoft }}>
          <a href="#pain" style={{ color: 'inherit', textDecoration: 'none' }}>痛點</a>
          <a href="#flow" style={{ color: 'inherit', textDecoration: 'none' }}>流程</a>
          <a href="#notes" style={{ color: 'inherit', textDecoration: 'none' }}>範例</a>
          <a href="#video" style={{ color: 'inherit', textDecoration: 'none' }}>影片</a>
        </div>
        <a href="#final-cta" style={{
          background: v3.ink, color: v3.paper, padding: '8px 16px',
          fontSize: 13, textDecoration: 'none',
        }}>填問卷</a>
      </nav>

      {/* HERO — product-ish */}
      <section style={{ padding: '80px 60px 100px', position: 'relative' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: v3.card, border: `1.5px solid ${v3.ink}`,
              padding: '6px 14px', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', marginBottom: 28,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: v3.accent }}/>
              ROUND 01 · 驗證中
            </div>
            <h1 style={{
              fontFamily: '"Noto Serif TC", serif', fontSize: 80, fontWeight: 900,
              lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0,
            }}>
              你的筆記，<br/>
              <span style={{ color: v3.accent, fontStyle: 'italic' }}>應該要</span>
              <span style={{ position: 'relative' }}>
                越寫越強
                <svg width="340" height="14" viewBox="0 0 340 14" style={{ position: 'absolute', left: -4, bottom: -10 }}>
                  <path d="M4 9 C 80 2, 180 13, 336 7" fill="none" stroke={v3.yellow} strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>。
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: v3.inkSoft, marginTop: 36, maxWidth: 540 }}>
              一套把筆記變系統的方法。<strong>學霸親自教你怎麼寫</strong>，
              再用 AI 幫你整理、複習、出題——
              讓你的筆記變成可查詢、可累積、<strong>考前會救你一命</strong>的個人知識庫。
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
              <a href="#final-cta" style={{
                background: v3.ink, color: v3.paper, padding: '18px 32px',
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                加入體驗名單 <span>→</span>
              </a>
              <a href="#notes" style={{
                background: v3.card, color: v3.ink,
                border: `1.5px solid ${v3.ink}`,
                padding: '18px 28px', fontSize: 16, fontWeight: 600, textDecoration: 'none',
              }}>
                看筆記範例
              </a>
            </div>

            <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { k: '2–3', v: '位學霸' },
                { k: '6–8', v: '堂線上課' },
                { k: '6', v: '個學科模板' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: `2px solid ${v3.ink}`, paddingLeft: 14 }}>
                  <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{s.k}</div>
                  <div style={{ fontSize: 12, color: v3.muted, marginTop: 4, letterSpacing: '0.05em' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right hero illustration — stacked folders */}
          <div style={{ position: 'relative', height: 520 }}>
            {SUBJECTS.slice(0, 4).map((s, i) => {
              const rot = [-6, -2, 2, 6][i];
              const top = i * 40;
              const left = i * 20;
              return (
                <div key={s.id} style={{
                  position: 'absolute', top, left, width: 380, height: 460,
                  background: v3.card, border: `1.5px solid ${v3.ink}`,
                  transform: `rotate(${rot}deg)`,
                  boxShadow: `0 10px 20px rgba(0,0,0,0.08)`,
                  padding: 24, zIndex: 10 - i,
                }}>
                  {/* folder tab */}
                  <div style={{
                    position: 'absolute', top: -28, left: 20,
                    background: s.color, color: v3.card,
                    padding: '6px 20px 10px', fontFamily: '"Noto Serif TC", serif',
                    fontWeight: 900, fontSize: 15, letterSpacing: '0.05em',
                    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                    minWidth: 80, textAlign: 'center',
                  }}>{s.name}</div>
                  <div style={{ paddingTop: 8 }}>
                    <NoteMockV3 subject={s} seed={i} large={false}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PAIN POINTS — bento-ish */}
      <section id="pain" style={{ padding: '100px 60px', background: v3.paperAlt }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <HW3 size={26} rotate={-2}>超有感對吧</HW3>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 60, fontWeight: 900, margin: '10px 0 0', letterSpacing: '-0.02em' }}>
              做筆記的<span style={{ color: v3.accent }}>四大地獄</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'auto',
            gap: 20,
          }}>
            {[
              { n: '01', t: '做了，但沒用', d: '寫得再漂亮，考前翻開還是看不懂自己當時在寫什麼。', icon: '📓' },
              { n: '02', t: '抓不到重點', d: '每一頁都密密麻麻，不知道哪個才是考點。', icon: '🔍' },
              { n: '03', t: '不會複習', d: '筆記收進抽屜，考前兩週才翻出來——從哪一頁看起？', icon: '⏳' },
              { n: '04', t: '亂到懷疑人生', d: '科目混一起、錯題本跟講義沒分開，最後全部重抄。', icon: '🌀' },
            ].map((p, i) => (
              <div key={i} style={{
                background: v3.card, border: `1.5px solid ${v3.ink}`,
                padding: '32px 28px 36px', position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 280,
              }}>
                <div>
                  <div style={{
                    display: 'inline-block', background: v3.ink, color: v3.paper,
                    padding: '4px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                    marginBottom: 20,
                  }}>{p.n}</div>
                  <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 26, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{p.t}</h3>
                  <p style={{ fontSize: 15, color: v3.inkSoft, lineHeight: 1.7, margin: 0 }}>{p.d}</p>
                </div>
                <div style={{ fontSize: 42, alignSelf: 'flex-end', marginTop: 20, opacity: 0.6 }}>{p.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FLOW — horizontal stepper */}
      <section id="flow" style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <HW3 size={26} rotate={-2} color={v3.blue}>只要 4 步</HW3>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 60, fontWeight: 900, margin: '10px 0 0', letterSpacing: '-0.02em' }}>
              從講義到<span style={{
                background: `linear-gradient(180deg, transparent 60%, ${v3.yellow} 60%)`,
              }}>你的知識庫</span>
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* connecting line */}
            <div style={{
              position: 'absolute', top: 48, left: '12%', right: '12%', height: 2,
              background: `repeating-linear-gradient(90deg, ${v3.ink} 0 8px, transparent 8px 14px)`,
            }}/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, position: 'relative' }}>
              {[
                { n: '1', t: '丟進講義', d: '課本、講義、上課筆記，直接上傳原檔。', tag: 'UPLOAD' },
                { n: '2', t: 'AI 抓重點', d: 'RAG 依學科模板生成大標、副標、重點。', tag: 'PROCESS' },
                { n: '3', t: '你來微調', d: '搭配學霸課程學會判斷重點，親手修版本。', tag: 'REVIEW' },
                { n: '4', t: '累積知識庫', d: '可查詢、出題、錯題分析——越用越強。', tag: 'COMPOUND' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: v3.card, border: `2px solid ${v3.ink}`,
                    margin: '0 auto 20px', display: 'grid', placeItems: 'center',
                    fontFamily: '"Noto Serif TC", serif', fontWeight: 900, fontSize: 40,
                    color: v3.accent, position: 'relative', zIndex: 2,
                  }}>{s.n}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', color: v3.muted, marginBottom: 6 }}>{s.tag}</div>
                  <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>{s.t}</h3>
                  <p style={{ fontSize: 14, color: v3.inkSoft, lineHeight: 1.7, margin: 0, maxWidth: 240, marginInline: 'auto' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOTES GALLERY — tabbed by subject */}
      <section id="notes" style={{ padding: '100px 60px', background: v3.paperAlt }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <HW3 size={26} rotate={-2} color={v3.accent}>依學科翻閱</HW3>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 60, fontWeight: 900, margin: '10px 0 12px', letterSpacing: '-0.02em' }}>
              真實筆記資料夾
            </h2>
            <p style={{ fontSize: 16, color: v3.inkSoft, maxWidth: 600 }}>
              點擊分頁切換學科、點擊任一頁筆記放大。你也可以上傳自己的筆記比較看看。
            </p>
          </div>
          <TabbedGalleryV3/>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <HW3 size={26} rotate={-2} color={v3.accent}>Ep.01 · 試看</HW3>
          <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 60, fontWeight: 900, margin: '10px 0 16px', letterSpacing: '-0.02em' }}>
            學霸親自示範怎麼寫
          </h2>
          <p style={{ fontSize: 17, color: v3.inkSoft, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            從文具準備、上課聽講、抓重點到回家整理——每一步都有邏輯，不是天賦。
          </p>

          <div style={{
            position: 'relative', aspectRatio: '16/9',
            background: '#111', maxWidth: 960, margin: '0 auto',
            border: `1.5px solid ${v3.ink}`,
            boxShadow: `8px 8px 0 0 ${v3.ink}`,
          }}>
            {ytEmbed ? (
              <iframe src={ytEmbed} style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen/>
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'repeating-linear-gradient(45deg, #1C1C1A 0 16px, #2A2A28 16px 17px)',
                display: 'grid', placeItems: 'center', color: v3.paper,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: v3.yellow, color: v3.ink,
                    display: 'grid', placeItems: 'center', margin: '0 auto 14px',
                  }}>
                    <div style={{ width: 0, height: 0, borderLeft: '24px solid currentColor', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 7 }}/>
                  </div>
                  <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 22, fontWeight: 900 }}>YouTube 影片預留位置</div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>之後會嵌入學霸真人教學</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 32, display: 'inline-flex', gap: 40, fontSize: 13, color: v3.muted }}>
            <span>EP.01 · 約 12 分鐘</span>
            <span>·</span>
            <span>主講：潮汐（111 指考榜首）</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final-cta" style={{ padding: '140px 60px', background: v3.ink, color: v3.paper }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: v3.yellow, color: v3.ink,
            padding: '6px 14px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em',
            marginBottom: 28,
          }}>限量 10 位深度體驗者</div>
          <h2 style={{
            fontFamily: '"Noto Serif TC", serif', fontSize: 80, fontWeight: 900,
            lineHeight: 1.0, margin: 0, letterSpacing: '-0.02em',
          }}>
            花 <span style={{ color: v3.yellow, fontStyle: 'italic' }}>2 分鐘</span>，<br/>
            決定我們要不要把這件事<br/>
            <span style={{ color: v3.yellow }}>做下去</span>。
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(245,239,225,0.7)', maxWidth: 560, margin: '32px auto 0', lineHeight: 1.7 }}>
            告訴我們你的筆記痛點、願意付多少錢、希望有什麼功能——你的回答會直接影響課程方向與定價。
          </p>

          <a href={formUrl} style={{
            display: 'inline-block', marginTop: 48,
            background: v3.yellow, color: v3.ink,
            padding: '28px 56px', fontSize: 22, fontWeight: 900,
            textDecoration: 'none', boxShadow: `8px 8px 0 0 ${v3.accent}`,
            letterSpacing: '-0.01em', fontFamily: '"Noto Serif TC", serif',
          }}>
            → 填寫付費意願問卷
          </a>
          <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(245,239,225,0.5)' }}>
            ⏱ 約 2 分鐘 · 匿名 · 完整填寫可收到小獎勵
          </div>

          <div style={{ marginTop: 100, paddingTop: 32, borderTop: '1px solid rgba(245,239,225,0.15)', fontSize: 12, color: 'rgba(245,239,225,0.4)', letterSpacing: '0.1em' }}>
            筆記聯盟 © 2026 · TAIWAN HIGH SCHOOL · VALIDATION ROUND 01
          </div>
        </div>
      </section>
    </div>
  );
}

window.LandingV3 = LandingV3;
