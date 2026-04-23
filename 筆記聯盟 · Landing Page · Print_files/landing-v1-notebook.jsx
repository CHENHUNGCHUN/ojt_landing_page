/* global React */
// V1 — 筆記本版：格線紙 + 貼紙 + 膠帶 + 手寫感
const { useState, useRef } = React;

const v1 = {
  paper: '#F5EFE1',
  paperDark: '#EEE5D0',
  ink: '#2B2B2B',
  inkSoft: '#4A4A44',
  muted: '#8A8578',
  rule: '#D8CFB8',
  accent: '#C24A2C',      // 紅筆
  accentYellow: '#F2C94C',// 螢光黃 (膠帶)
  accentBlue: '#4A6FA5',  // 藍筆
  tapePink: 'rgba(232, 157, 157, 0.72)',
  tapeYellow: 'rgba(242, 201, 76, 0.62)',
};

// ---- tiny utils ----
const Tape = ({ style, color = v1.tapeYellow, rotate = -4, children }) => (
  <div style={{
    position: 'absolute',
    background: color,
    boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
    transform: `rotate(${rotate}deg)`,
    mixBlendMode: 'multiply',
    ...style,
  }}>
    {/* tape texture — vertical stripes */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 2px, transparent 2px 6px)',
    }}/>
    {children}
  </div>
);

const HandWritten = ({ children, size = 28, color = v1.accent, rotate = -3, style }) => (
  <span style={{
    fontFamily: '"Caveat", "Kalam", cursive',
    fontWeight: 700,
    fontSize: size,
    color,
    display: 'inline-block',
    transform: `rotate(${rotate}deg)`,
    lineHeight: 1,
    ...style,
  }}>{children}</span>
);

const Star = ({ size = 16, color = v1.accent, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d="M12 2 L14 9 L22 10 L16 15 L18 22 L12 18 L6 22 L8 15 L2 10 L10 9 Z"
      fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const Arrow = ({ w = 80, color = v1.accent, style }) => (
  <svg width={w} height="30" viewBox="0 0 80 30" style={style}>
    <path d="M4 20 C 20 4, 50 30, 74 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M66 8 L74 12 L70 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Scribble = ({ w = 180, color = v1.accentYellow, style }) => (
  <svg width={w} height="14" viewBox="0 0 180 14" style={style}>
    <path d="M2 9 C 30 2, 60 13, 90 7 S 150 3, 178 9"
      fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.75"/>
  </svg>
);

// ========== Image upload + lightbox ==========
function NoteImagesV1() {
  const [images, setImages] = useState([
    { id: 1, kind: 'placeholder', label: '國文 | 紅樓夢人物關係',
      sourceText: '《紅樓夢》原名《石頭記》，作者曹雪芹。以賈寶玉、林黛玉、薛寶釵三人的愛情悲劇為主線，描寫賈、史、王、薛四大家族的興衰。全書共一百二十回，前八十回為曹雪芹所著，後四十回一般認為為高鶚所續。書中人物眾多，以賈府為中心展開複雜的家族網絡...' },
    { id: 2, kind: 'placeholder', label: '數學 | 三角函數公式',
      sourceText: '和角公式：sin(A+B) = sinA cosB + cosA sinB；cos(A+B) = cosA cosB − sinA sinB；tan(A+B) = (tanA + tanB) / (1 − tanA tanB)。二倍角公式：sin2A = 2 sinA cosA；cos2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1...' },
    { id: 3, kind: 'placeholder', label: '歷史 | 冷戰時序軸',
      sourceText: '第二次世界大戰結束後，美蘇兩大超級強國因意識形態與勢力範圍的分歧，展開長達四十餘年的對峙。1947 年杜魯門主義與馬歇爾計畫宣布，冷戰正式開始。1949 年北大西洋公約組織（NATO）成立，1955 年華沙公約組織成立...' },
    { id: 4, kind: 'placeholder', label: '生物 | 細胞呼吸流程',
      sourceText: '細胞呼吸（Cellular Respiration）是生物將葡萄糖分解以產生 ATP 的過程，分為三個主要階段：糖解作用（Glycolysis）、檸檬酸循環（Citric Acid Cycle / Krebs Cycle）與電子傳遞鏈（Electron Transport Chain）。糖解作用發生於細胞質，將一分子葡萄糖分解為兩分子丙酮酸...' },
  ]);
  const [lightbox, setLightbox] = useState(null);
  const fileInput = useRef(null);

  const addFiles = (files) => {
    const arr = Array.from(files).slice(0, 8).map((f, i) => ({
      id: Date.now() + i,
      kind: 'uploaded',
      src: URL.createObjectURL(f),
      label: f.name.replace(/\.[^.]+$/, ''),
    }));
    setImages(prev => [...arr, ...prev].slice(0, 12));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: v1.accent, marginBottom: 4, transform: 'rotate(-2deg)', display: 'inline-block' }}>
            real notes, real students
          </div>
          <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 44, fontWeight: 900, color: v1.ink, margin: 0, letterSpacing: '-0.01em' }}>
            翻一翻學霸的<span style={{ background: `linear-gradient(180deg, transparent 60%, ${v1.accentYellow} 60%)` }}>真實筆記</span>
          </h2>
          <p style={{ color: v1.inkSoft, fontSize: 17, marginTop: 10, maxWidth: 480 }}>
            點擊任一頁筆記看大圖。你也可以上傳自己的筆記，我們想知道你平常怎麼寫。
          </p>
        </div>
        <button
          onClick={() => fileInput.current?.click()}
          style={{
            border: `2px dashed ${v1.ink}`,
            background: v1.paper,
            padding: '14px 22px',
            fontFamily: '"Noto Sans TC", sans-serif',
            fontSize: 15,
            fontWeight: 600,
            color: v1.ink,
            cursor: 'pointer',
            borderRadius: 2,
            transform: 'rotate(-1deg)',
          }}>
          ＋ 上傳我的筆記
        </button>
        <input ref={fileInput} type="file" accept="image/*" multiple hidden
          onChange={(e) => addFiles(e.target.files)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
        {images.map((img, i) => {
          const rot = [-2, 1.5, -1, 2][i % 4];
          const tapeColor = [v1.tapePink, v1.tapeYellow, 'rgba(180,200,230,0.7)', 'rgba(200,220,180,0.7)'][i % 4];
          return (
            <div
              key={img.id}
              onClick={() => setLightbox(img)}
              style={{
                position: 'relative',
                background: '#FFFDF6',
                padding: 10,
                paddingBottom: 42,
                boxShadow: '0 8px 20px rgba(60,45,20,0.12), 0 2px 4px rgba(60,45,20,0.08)',
                transform: `rotate(${rot}deg)`,
                cursor: 'zoom-in',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = `rotate(0deg) translateY(-4px) scale(1.02)`}
              onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rot}deg)`}
            >
              <Tape style={{ top: -14, left: '35%', width: 70, height: 22, zIndex: 2 }} color={tapeColor} rotate={rot * -2}/>
              {img.kind === 'placeholder' ? (
                <NotePlaceholder subject={img.label} seed={i}/>
              ) : (
                <img src={img.src} alt={img.label} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}/>
              )}
              <div style={{
                position: 'absolute',
                bottom: 10, left: 14, right: 14,
                fontFamily: '"Caveat", cursive',
                fontSize: 20,
                color: v1.inkSoft,
                textAlign: 'center',
              }}>{img.label}</div>
            </div>
          );
        })}
      </div>

      {/* Lightbox — before/after comparison */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(20,18,14,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 40, cursor: 'zoom-out', overflow: 'auto',
          }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: 'min(95vw, 1100px)', cursor: 'default' }}>
            <button onClick={() => setLightbox(null)} style={{
              position: 'absolute', top: -48, right: 0,
              background: 'transparent', color: '#fff', border: 'none',
              fontSize: 22, cursor: 'pointer', fontFamily: '"Noto Sans TC", sans-serif',
            }}>✕ 關閉</button>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ color: '#F5EFE1', fontFamily: '"Noto Serif TC", serif', fontSize: 26, fontWeight: 900 }}>
                {lightbox.label}
              </div>
              <div style={{ color: 'rgba(245,239,225,0.6)', fontFamily: '"Caveat", cursive', fontSize: 20, marginTop: 4 }}>
                原文 vs. 整理後的筆記
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'stretch' }}>
              {/* BEFORE — source text */}
              <div style={{
                background: '#FFFDF6', padding: '20px 24px 24px',
                border: `1.5px solid ${v1.ink}`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -14, left: 16,
                  background: v1.inkSoft, color: v1.paper,
                  padding: '4px 12px', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em',
                }}>BEFORE · 原文</div>
                <div style={{
                  fontSize: 13, lineHeight: 1.9, color: v1.inkSoft,
                  fontFamily: '"Noto Serif TC", serif',
                  marginTop: 10, minHeight: 360, textAlign: 'justify',
                  background: 'repeating-linear-gradient(180deg, transparent 0 25px, rgba(216,207,184,0.5) 25px 26px)',
                  padding: '2px 0',
                }}>
                  {lightbox.sourceText || '（原文內容）這裡放的是課本 / 講義的原始段落，字很多、很密，重點混在裡面，學生讀的時候不知道要抓哪裡。'}
                </div>
                <div style={{
                  fontFamily: '"Caveat", cursive', fontSize: 18, color: v1.muted,
                  marginTop: 12, textAlign: 'right',
                }}>密密麻麻、抓不到重點 →</div>
              </div>

              {/* AFTER — note */}
              <div style={{
                background: '#FFFDF6', padding: 12,
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -14, left: 16, zIndex: 3,
                  background: v1.accent, color: v1.paper,
                  padding: '4px 12px', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em',
                }}>AFTER · 整理後</div>
                <Tape style={{ top: -10, right: 40, width: 70, height: 22, zIndex: 2 }} color={v1.tapeYellow} rotate={4}/>
                {lightbox.kind === 'placeholder' ? (
                  <div style={{ width: '100%', aspectRatio: '3/4' }}>
                    <NotePlaceholder subject={lightbox.label} seed={0} large/>
                  </div>
                ) : (
                  <img src={lightbox.src} alt={lightbox.label} style={{ width: '100%', display: 'block' }}/>
                )}
              </div>
            </div>

            <div style={{ marginTop: 16, textAlign: 'center', color: 'rgba(245,239,225,0.5)', fontSize: 13, letterSpacing: '0.05em' }}>
              ↑ AI 幫你從左邊的原文，生成右邊結構化的筆記 ↑
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Placeholder that looks like a real note page
function NotePlaceholder({ subject, seed = 0, large = false }) {
  const lines = large ? 22 : 14;
  return (
    <div style={{
      width: '100%', aspectRatio: '3/4',
      background: `
        repeating-linear-gradient(180deg, transparent 0 ${large ? 32 : 22}px, ${v1.rule} ${large ? 32 : 22}px ${large ? 33 : 23}px),
        linear-gradient(180deg, #FFFDF6, #FBF5E2)
      `,
      position: 'relative', padding: large ? '24px 28px' : '14px 16px',
      fontFamily: '"Noto Serif TC", serif',
      overflow: 'hidden',
    }}>
      {/* red margin line */}
      <div style={{ position: 'absolute', left: large ? 56 : 38, top: 0, bottom: 0, width: 1, background: 'rgba(194,74,44,0.4)' }}/>
      {/* hole punches */}
      {[0.2, 0.5, 0.8].map((t, i) => (
        <div key={i} style={{
          position: 'absolute', left: 6, top: `${t*100}%`,
          width: large ? 14 : 10, height: large ? 14 : 10, borderRadius: '50%',
          background: 'rgba(0,0,0,0.08)',
        }}/>
      ))}

      {/* subject title */}
      <div style={{
        fontSize: large ? 28 : 15, fontWeight: 900, color: v1.ink,
        borderBottom: `2px solid ${v1.ink}`, paddingBottom: 4, marginBottom: 10,
        display: 'inline-block',
      }}>{subject.split('|')[1]?.trim() || subject}</div>

      {/* mock content lines */}
      <div style={{ fontSize: large ? 14 : 9, color: v1.inkSoft, lineHeight: large ? '32px' : '23px' }}>
        {Array.from({ length: lines - 2 }).map((_, i) => {
          const w = 40 + ((i * 17 + seed * 13) % 55);
          const highlight = i % 5 === 2;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i % 4 === 0 && <span style={{ color: v1.accent, fontWeight: 900 }}>•</span>}
              <div style={{
                height: large ? 10 : 6,
                width: `${w}%`,
                background: highlight ? `linear-gradient(90deg, transparent, ${v1.accentYellow}88 10%, ${v1.accentYellow}88 90%, transparent)` : v1.inkSoft,
                opacity: highlight ? 1 : 0.55,
                borderRadius: 1,
              }}/>
            </div>
          );
        })}
      </div>

      {/* handwritten note in corner */}
      <div style={{ position: 'absolute', bottom: large ? 24 : 10, right: large ? 28 : 14 }}>
        <HandWritten size={large ? 28 : 13} color={v1.accent} rotate={-8}>必考！</HandWritten>
      </div>
    </div>
  );
}

// ========== Main V1 ==========
function LandingV1({ formUrl = '#', ytUrl = '' }) {
  const ytEmbed = ytUrl
    ? ytUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    : '';

  return (
    <div style={{
      background: v1.paper,
      color: v1.ink,
      fontFamily: '"Noto Sans TC", sans-serif',
      minHeight: '100%',
      position: 'relative',
      // paper grain
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(139,114,69,0.06) 0, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(139,114,69,0.05) 0, transparent 50%)
      `,
    }}>
      {/* =============== NAV (from V3) =============== */}
      <nav style={{
        padding: '18px 60px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: `1px solid ${v1.rule}`,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            width: 32, height: 32, background: v1.ink, color: v1.paper,
            display: 'grid', placeItems: 'center', fontFamily: '"Noto Serif TC", serif',
            fontWeight: 900, fontSize: 16,
          }}>聯</div>
          <div style={{ fontFamily: '"Noto Serif TC", serif', fontWeight: 900, fontSize: 18 }}>筆記聯盟</div>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: v1.inkSoft }}>
          <a href="#pain" style={{ color: 'inherit', textDecoration: 'none' }}>痛點</a>
          <a href="#flow" style={{ color: 'inherit', textDecoration: 'none' }}>流程</a>
          <a href="#notes" style={{ color: 'inherit', textDecoration: 'none' }}>範例</a>
          <a href="#video" style={{ color: 'inherit', textDecoration: 'none' }}>影片</a>
        </div>
        <a href="#final-cta" style={{
          background: v1.ink, color: v1.paper, padding: '8px 16px',
          fontSize: 13, textDecoration: 'none',
        }}>填問卷</a>
      </nav>
      <section style={{ padding: '80px 60px 100px', position: 'relative' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#FFFDF6', border: `1.5px solid ${v1.ink}`,
              padding: '6px 14px', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', marginBottom: 28,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: v1.accent }}/>
              ROUND 01 · 驗證中
            </div>
            <h1 style={{
              fontFamily: '"Noto Serif TC", serif', fontSize: 80, fontWeight: 900,
              lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0,
            }}>
              你的筆記，<br/>
              <span style={{ color: v1.accent, fontStyle: 'italic' }}>應該要</span>
              <span style={{ position: 'relative' }}>
                越寫越強
                <svg width="340" height="14" viewBox="0 0 340 14" style={{ position: 'absolute', left: -4, bottom: -10 }}>
                  <path d="M4 9 C 80 2, 180 13, 336 7" fill="none" stroke={v1.accentYellow} strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>。
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: v1.inkSoft, marginTop: 36, maxWidth: 540 }}>
              一套把筆記變系統的方法。<strong>學霸親自教你怎麼寫</strong>，
              再用 AI 幫你整理、複習、出題——
              讓你的筆記變成可查詢、可累積、<strong>考前會救你一命</strong>的個人知識庫。
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
              <a href="#final-cta" style={{
                background: v1.ink, color: v1.paper, padding: '18px 32px',
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                加入體驗名單 <span>→</span>
              </a>
              <a href="#notes" style={{
                background: '#FFFDF6', color: v1.ink,
                border: `1.5px solid ${v1.ink}`,
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
                <div key={i} style={{ borderLeft: `2px solid ${v1.ink}`, paddingLeft: 14 }}>
                  <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{s.k}</div>
                  <div style={{ fontSize: 12, color: v1.muted, marginTop: 4, letterSpacing: '0.05em' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right hero illustration — stacked folders */}
          <div style={{ position: 'relative', height: 520 }}>
            {[
              { name: '國文', color: v1.accent },
              { name: '數學', color: v1.accentBlue },
              { name: '英文', color: '#4E7A4A' },
              { name: '歷史', color: v1.accentYellow },
            ].map((s, i) => {
              const rot = [-6, -2, 2, 6][i];
              const top = i * 40;
              const left = i * 20;
              return (
                <div key={s.name} style={{
                  position: 'absolute', top, left, width: 380, height: 460,
                  background: '#FFFDF6', border: `1.5px solid ${v1.ink}`,
                  transform: `rotate(${rot}deg)`,
                  boxShadow: `0 10px 20px rgba(0,0,0,0.08)`,
                  padding: 24, zIndex: 10 - i,
                }}>
                  <div style={{
                    position: 'absolute', top: -28, left: 20,
                    background: s.color, color: '#FFFDF6',
                    padding: '6px 20px 10px', fontFamily: '"Noto Serif TC", serif',
                    fontWeight: 900, fontSize: 15, letterSpacing: '0.05em',
                    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                    minWidth: 80, textAlign: 'center',
                  }}>{s.name}</div>
                  <div style={{ paddingTop: 8, width: '100%', height: '100%' }}>
                    <div style={{
                      width: '100%', height: '100%',
                      background: `
                        repeating-linear-gradient(180deg, transparent 0 18px, ${v1.rule} 18px 19px),
                        #FFFDF6
                      `,
                      padding: '20px 18px',
                      position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', left: 36, top: 0, bottom: 0, width: 1, background: `${s.color}66` }}/>
                      <div style={{
                        fontFamily: '"Noto Serif TC", serif', fontWeight: 900,
                        fontSize: 14, color: v1.ink, display: 'inline-block',
                        borderBottom: `2px solid ${s.color}`, paddingBottom: 4, marginBottom: 8,
                      }}>{s.name}</div>
                      <div style={{ fontSize: 7, lineHeight: '19px', color: v1.inkSoft }}>
                        {Array.from({ length: 14 }).map((_, j) => {
                          const w = 40 + ((j * 17 + i * 13) % 55);
                          const hi = j % 4 === 1;
                          return (
                            <div key={j} style={{ display: 'flex', gap: 5 }}>
                              {j % 3 === 0 && <span style={{ color: s.color, fontWeight: 900 }}>▪</span>}
                              <div style={{
                                height: 4, width: `${w}%`,
                                background: hi ? v1.accentYellow : v1.inkSoft,
                                opacity: hi ? 0.7 : 0.5, borderRadius: 1,
                              }}/>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== PAIN POINTS =============== */}
      <section id="pain" style={{ padding: '100px 60px', background: v1.paperDark, position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <HandWritten size={28} rotate={-2}>呃⋯⋯是不是超有感</HandWritten>
            <h2 style={{
              fontFamily: '"Noto Serif TC", serif', fontSize: 56, fontWeight: 900,
              margin: '12px 0 0', letterSpacing: '-0.01em',
            }}>
              做筆記的<span style={{ color: v1.accent }}>四大地獄</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {[
              { num: '01', title: '做了，但沒用', desc: '花了一整晚抄得超美，考前翻開才發現——根本看不懂自己在寫什麼。', tape: v1.tapePink, rot: -1 },
              { num: '02', title: '抓不到重點', desc: '老師一講就全部寫下來，結果每一頁都滿滿的字，到底哪個才是重點？', tape: v1.tapeYellow, rot: 1.5 },
              { num: '03', title: '不會複習', desc: '筆記做完就收進抽屜。考前兩週翻出來，根本不知道從哪看起。', tape: 'rgba(180,200,230,0.7)', rot: -1.5 },
              { num: '04', title: '亂到懷疑人生', desc: '國文跟歷史筆記混在一起，錯題本跟講義不知道分開，最後只好全部重抄。', tape: 'rgba(200,220,180,0.7)', rot: 1 },
            ].map((p, i) => (
              <div key={i} style={{
                background: '#FFFDF6',
                padding: '40px 36px 36px',
                position: 'relative',
                transform: `rotate(${p.rot}deg)`,
                boxShadow: '0 12px 28px rgba(60,45,20,0.12)',
              }}>
                <Tape style={{ top: -16, left: 30, width: 90, height: 26 }} color={p.tape} rotate={-4}/>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
                  <span style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 48, fontWeight: 900, color: v1.accent, lineHeight: 1 }}>{p.num}</span>
                  <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 32, fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: 17, color: v1.inkSoft, lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== AI FLOW =============== */}
      <section id="flow" style={{ padding: '120px 60px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 72 }}>
            <HandWritten size={28} rotate={-2} color={v1.accentBlue}>只要 4 步</HandWritten>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 56, fontWeight: 900, margin: '8px 0 12px', letterSpacing: '-0.01em' }}>
              從<span style={{ color: v1.accent }}>講義</span>變成<span style={{
                background: `linear-gradient(180deg, transparent 60%, ${v1.accentYellow} 60%)`,
              }}>你自己的筆記</span>
            </h2>
            <p style={{ fontSize: 18, color: v1.inkSoft, maxWidth: 640 }}>
              不是把筆記丟給 AI 就好。我們幫你設計一套可重複使用的流程，讓 AI 做整理、你做理解。
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }}>
            {[
              { n: '1', title: '丟進講義', desc: '把課本 / 講義 / 上課筆記直接上傳，不用改格式。', hand: '丟就對了' },
              { n: '2', title: 'AI 抓重點', desc: '我們訓練過的 RAG 會依學科模板整理出大標、副標、重點。', hand: '抓出關鍵' },
              { n: '3', title: '你來微調', desc: '搭配學霸課程學會「怎麼判斷重點」，親手修到真正屬於你的版本。', hand: '加上你的腦' },
              { n: '4', title: '累積知識庫', desc: '筆記可查詢、可出題、可錯題分析，越用越強。', hand: 'Lv. Up ↑' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  background: '#FFFDF6',
                  border: `1.5px solid ${v1.ink}`,
                  padding: '28px 24px 32px',
                  minHeight: 280,
                  position: 'relative',
                  boxShadow: `5px 5px 0 0 ${v1.ink}`,
                }}>
                  <div style={{
                    fontFamily: '"Noto Serif TC", serif', fontWeight: 900,
                    fontSize: 72, color: v1.accent, lineHeight: 1, marginBottom: 8,
                  }}>{s.n}</div>
                  <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 26, fontWeight: 900, margin: '0 0 12px' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: v1.inkSoft, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  <div style={{ position: 'absolute', bottom: 12, right: 16 }}>
                    <HandWritten size={20} color={v1.accentBlue} rotate={-6}>{s.hand}</HandWritten>
                  </div>
                </div>
                {i < 3 && (
                  <Arrow color={v1.accent} w={40} style={{
                    position: 'absolute', right: -28, top: 130, zIndex: 2,
                  }}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== NOTES GALLERY =============== */}
      <section id="notes" style={{
        padding: '120px 60px', background: v1.paperDark,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 40px, ${v1.rule}88 40px 41px)`,
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <NoteImagesV1/>
        </div>
      </section>

      {/* =============== VIDEO =============== */}
      <section id="video" style={{ padding: '120px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <HandWritten size={28} rotate={-2} color={v1.accent}>Ep.01 · 試看片段</HandWritten>
              <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 56, fontWeight: 900, margin: '8px 0 12px', letterSpacing: '-0.01em' }}>
                學霸親自示範，<br/>怎麼把一節課寫成一頁筆記
              </h2>
              <p style={{ fontSize: 17, color: v1.inkSoft, maxWidth: 520 }}>
                從文具準備、上課聽講、抓重點到回家整理——每一步都有邏輯，不是天賦。
              </p>
            </div>
            <div style={{
              background: '#FFFDF6', border: `1.5px dashed ${v1.ink}`,
              padding: '18px 24px', transform: 'rotate(2deg)',
            }}>
              <div style={{ fontSize: 12, color: v1.muted, letterSpacing: '0.1em', marginBottom: 4 }}>THIS EPISODE</div>
              <div style={{ fontFamily: '"Noto Serif TC", serif', fontWeight: 900, fontSize: 18, marginBottom: 2 }}>國文 / 紅樓夢人物關係</div>
              <div style={{ fontSize: 13, color: v1.inkSoft }}>主講 · 潮汐（111 指考榜首）</div>
            </div>
          </div>

          {/* video frame mimicking a taped-on photo */}
          <div style={{ position: 'relative', padding: '30px 0' }}>
            <div style={{
              position: 'relative',
              background: '#FFFDF6',
              padding: 18,
              paddingBottom: 60,
              boxShadow: '0 20px 40px rgba(60,45,20,0.2)',
              maxWidth: 1000, margin: '0 auto',
            }}>
              <Tape style={{ top: -16, left: '12%', width: 120, height: 28 }} color={v1.tapeYellow} rotate={-3}/>
              <Tape style={{ top: -16, right: '14%', width: 120, height: 28 }} color={v1.tapePink} rotate={4}/>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#111', overflow: 'hidden' }}>
                {ytEmbed ? (
                  <iframe src={ytEmbed} style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen/>
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: `
                      linear-gradient(135deg, #2B2B2B 0%, #4A4A44 100%),
                      repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,0.03) 12px 13px)
                    `,
                    display: 'grid', placeItems: 'center',
                    color: v1.paper, fontFamily: '"Noto Serif TC", serif',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: 80, height: 80, borderRadius: '50%', background: v1.accent,
                        display: 'grid', placeItems: 'center', margin: '0 auto 16px',
                      }}>
                        <div style={{ width: 0, height: 0, borderLeft: '24px solid white', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 6 }}/>
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 900 }}>YouTube 影片預留位置</div>
                      <div style={{ fontSize: 13, color: 'rgba(245,239,225,0.6)', marginTop: 6, fontFamily: '"Noto Sans TC", sans-serif' }}>
                        之後會嵌入學霸真人教學
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{
                position: 'absolute', bottom: 18, left: 24,
                fontFamily: '"Caveat", cursive', fontSize: 22, color: v1.inkSoft,
              }}>↑ 完整課程 8 堂・現在可以預訂體驗</div>
            </div>
          </div>
        </div>

        {/* =============== CTA below video =============== */}
        <div style={{ maxWidth: 1000, margin: '60px auto 0', textAlign: 'center' }}>
          <a href={formUrl} style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: v1.ink, color: v1.paper,
            padding: '22px 44px', fontSize: 19, fontWeight: 800,
            textDecoration: 'none', letterSpacing: '-0.01em',
            boxShadow: `6px 6px 0 0 ${v1.accent}`,
            fontFamily: '"Noto Serif TC", serif',
          }}>
            填寫付費意願問卷 <span>→</span>
          </a>
          <div style={{ marginTop: 14, fontSize: 13, color: v1.muted }}>
            看完影片了？花 2 分鐘告訴我們你的想法
          </div>
        </div>
      </section>
      <section id="final-cta" style={{
        padding: '140px 60px',
        background: v1.ink, color: v1.paper, position: 'relative', overflow: 'hidden',
      }}>
        {/* ruled paper pattern in dark */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 46px, rgba(245,239,225,0.06) 46px 47px)`,
          pointerEvents: 'none',
        }}/>

        <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px',
            background: v1.accentYellow, color: v1.ink,
            fontSize: 13, fontWeight: 800, letterSpacing: '0.08em',
            marginBottom: 28, transform: 'rotate(-2deg)',
          }}>限量 10 位深度體驗者・獎勵寄送 5/6</div>

          <h2 style={{
            fontFamily: '"Noto Serif TC", serif', fontSize: 88, fontWeight: 900,
            lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em',
          }}>
            花 <span style={{ color: v1.accentYellow, fontStyle: 'italic' }}>2 分鐘</span> 填問卷，<br/>
            讓我們幫你把<br/>筆記變成一套
            <span style={{ position: 'relative', display: 'inline-block', color: v1.accentYellow }}>系統
              <Scribble w={220} color={v1.accent} style={{ position: 'absolute', left: 0, bottom: -8 }}/>
            </span>
          </h2>

          <p style={{ fontSize: 19, color: 'rgba(245,239,225,0.7)', marginTop: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            告訴我們你平常怎麼做筆記、遇到什麼困難、願意付多少錢——我們會根據你的回答決定要不要做下去。
          </p>

          <div style={{ marginTop: 56 }}>
            <a href={formUrl} style={{
              display: 'inline-block',
              background: v1.accentYellow, color: v1.ink,
              padding: '28px 56px',
              fontSize: 22, fontWeight: 900,
              textDecoration: 'none',
              boxShadow: `8px 8px 0 0 ${v1.accent}`,
              transform: 'rotate(-1deg)',
              letterSpacing: '-0.01em',
            }}>
              → 填寫付費意願問卷
            </a>
            <div style={{ marginTop: 20, fontSize: 14, color: 'rgba(245,239,225,0.5)' }}>
              ⏱ 約 2 分鐘 ・ 匿名 ・ 完整填寫可收到小獎勵
            </div>
          </div>

          <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(245,239,225,0.15)', fontSize: 13, color: 'rgba(245,239,225,0.5)' }}>
            筆記聯盟 · 2026 驗證期 · 台灣高中職生限定
          </div>
        </div>
      </section>
    </div>
  );
}

window.LandingV1 = LandingV1;
