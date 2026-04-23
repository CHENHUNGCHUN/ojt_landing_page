/* global React */
// V2 — 編輯部版：雜誌編排、乾淨俐落、手寫只作點綴
const { useState: useState2, useRef: useRef2 } = React;

const v2 = {
  paper: '#F5EFE1',
  paperAlt: '#ECE4D0',
  ink: '#1C1C1A',
  inkSoft: '#45443E',
  muted: '#8F8A7B',
  rule: '#CFC6AE',
  accent: '#C24A2C',
  yellow: '#F2C94C',
};

const HW2 = ({ children, size = 22, color = v2.accent, rotate = -2, style }) => (
  <span style={{
    fontFamily: '"Caveat", "Kalam", cursive', fontWeight: 700,
    fontSize: size, color, display: 'inline-block',
    transform: `rotate(${rotate}deg)`, lineHeight: 1, ...style,
  }}>{children}</span>
);

function NoteGalleryV2() {
  const [images, setImages] = useState2([
    { id: 1, label: '國文 · 紅樓夢人物' },
    { id: 2, label: '數學 · 三角函數' },
    { id: 3, label: '歷史 · 冷戰時序' },
    { id: 4, label: '生物 · 細胞呼吸' },
    { id: 5, label: '英文 · 完成式整理' },
    { id: 6, label: '化學 · 酸鹼平衡' },
  ]);
  const [lb, setLb] = useState2(null);
  const inp = useRef2(null);

  const add = (files) => {
    const arr = Array.from(files).map((f, i) => ({
      id: Date.now() + i, uploaded: true,
      src: URL.createObjectURL(f),
      label: f.name.replace(/\.[^.]+$/, ''),
    }));
    setImages(p => [...arr, ...p].slice(0, 12));
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: v2.ink }}>
        {images.slice(0, 6).map((img, i) => (
          <div key={img.id} onClick={() => setLb(img)}
            style={{
              background: v2.paper, aspectRatio: '4/5',
              position: 'relative', cursor: 'zoom-in', overflow: 'hidden',
            }}
            onMouseEnter={e => e.currentTarget.querySelector('.zoom')?.style.setProperty('opacity', '1')}
            onMouseLeave={e => e.currentTarget.querySelector('.zoom')?.style.setProperty('opacity', '0')}
          >
            {img.uploaded ? (
              <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            ) : (
              <NoteMockV2 label={img.label} seed={i}/>
            )}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '40px 20px 16px',
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.55))',
              color: v2.paper, fontFamily: '"Noto Serif TC", serif',
              fontWeight: 700, fontSize: 15, letterSpacing: '0.02em',
            }}>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', opacity: 0.7, marginBottom: 4 }}>
                NO. {String(i + 1).padStart(2, '0')}
              </div>
              {img.label}
            </div>
            <div className="zoom" style={{
              position: 'absolute', top: 16, right: 16, width: 36, height: 36,
              background: v2.paper, color: v2.ink, display: 'grid', placeItems: 'center',
              fontSize: 14, fontWeight: 700, opacity: 0, transition: 'opacity 0.2s',
            }}>⤢</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, color: v2.muted }}>
          想看更多？我們也想看你的筆記。
        </div>
        <button onClick={() => inp.current?.click()}
          style={{
            background: 'transparent', border: `1.5px solid ${v2.ink}`,
            color: v2.ink, padding: '12px 22px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: '"Noto Sans TC", sans-serif',
          }}>
          上傳我的筆記 →
        </button>
        <input ref={inp} type="file" accept="image/*" multiple hidden onChange={e => add(e.target.files)}/>
      </div>

      {lb && (
        <div onClick={() => setLb(null)} style={{
          position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(28,28,26,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40, cursor: 'zoom-out',
        }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '85vw', maxHeight: '85vh' }}>
            <button onClick={() => setLb(null)} style={{
              position: 'absolute', top: 24, right: 32, background: 'transparent',
              color: v2.paper, border: 'none', fontSize: 22, cursor: 'pointer',
              fontFamily: '"Noto Sans TC", sans-serif',
            }}>✕</button>
            {lb.uploaded ? (
              <img src={lb.src} alt={lb.label} style={{ maxWidth: '85vw', maxHeight: '80vh', display: 'block' }}/>
            ) : (
              <div style={{ width: 'min(70vw, 640px)', aspectRatio: '4/5' }}>
                <NoteMockV2 label={lb.label} seed={0} large/>
              </div>
            )}
            <div style={{
              color: v2.paper, fontFamily: '"Noto Serif TC", serif',
              fontSize: 20, marginTop: 16, textAlign: 'center', fontWeight: 600,
            }}>{lb.label}</div>
          </div>
        </div>
      )}
    </>
  );
}

function NoteMockV2({ label, seed = 0, large = false }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `
        repeating-linear-gradient(180deg, transparent 0 ${large ? 30 : 20}px, ${v2.rule} ${large ? 30 : 20}px ${large ? 31 : 21}px),
        linear-gradient(180deg, #FFFDF6 0%, #F7EFD9 100%)
      `,
      padding: large ? '32px 36px' : '22px 20px',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: large ? 70 : 42, top: 0, bottom: 0, width: 1, background: 'rgba(194,74,44,0.3)' }}/>
      <div style={{
        fontFamily: '"Noto Serif TC", serif', fontWeight: 900,
        fontSize: large ? 26 : 14, color: v2.ink,
        borderBottom: `1.5px solid ${v2.ink}`, paddingBottom: 4,
        display: 'inline-block', marginBottom: large ? 18 : 10,
      }}>{label.split('·')[1]?.trim() || label}</div>
      <div style={{ fontSize: large ? 13 : 8, lineHeight: large ? '30px' : '21px', color: v2.inkSoft }}>
        {Array.from({ length: large ? 14 : 10 }).map((_, i) => {
          const w = 45 + ((i * 19 + seed * 11) % 50);
          const hi = i % 4 === 1;
          return (
            <div key={i} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {i % 3 === 0 && <span style={{ color: v2.accent, fontWeight: 900 }}>▸</span>}
              <div style={{
                height: large ? 8 : 5, width: `${w}%`,
                background: hi ? v2.yellow : v2.inkSoft,
                opacity: hi ? 0.7 : 0.5, borderRadius: 1,
              }}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingV2({ formUrl = '#', ytUrl = '' }) {
  const ytEmbed = ytUrl ? ytUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') : '';

  return (
    <div style={{
      background: v2.paper, color: v2.ink,
      fontFamily: '"Noto Sans TC", sans-serif', minHeight: '100%',
    }}>
      {/* masthead */}
      <div style={{
        padding: '18px 60px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: `2px solid ${v2.ink}`,
      }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: v2.muted }}>ISSUE 01 · 2026 · TAIWAN</div>
        <div style={{ fontFamily: '"Noto Serif TC", serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.02em' }}>
          筆記聯盟
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: v2.muted }}>NT$0 · 驗證階段</div>
      </div>

      {/* HERO as magazine cover */}
      <section style={{ padding: '60px 60px 80px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.2em', color: v2.accent, fontWeight: 700, marginBottom: 24 }}>
              COVER STORY ─ 01
            </div>
            <h1 style={{
              fontFamily: '"Noto Serif TC", serif', fontSize: 120, fontWeight: 900,
              lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0, color: v2.ink,
            }}>
              筆記，<br/>
              不是抄寫，<br/>
              是<span style={{ fontStyle: 'italic', color: v2.accent }}>系統</span>。
            </h1>
            <div style={{
              marginTop: 32, paddingLeft: 20,
              borderLeft: `3px solid ${v2.accent}`,
              fontSize: 20, lineHeight: 1.7, color: v2.inkSoft, maxWidth: 520,
              fontFamily: '"Noto Serif TC", serif',
            }}>
              這不是另一堂教你「把字寫漂亮」的課。我們邀請學霸分享他們做筆記的
              <strong style={{ color: v2.ink }}>真實方法</strong>，再用 AI 幫你把筆記整理成
              可查詢、可複習、可累積的個人知識庫。
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 20, alignItems: 'center' }}>
              <a href="#final-cta" style={{
                background: v2.ink, color: v2.paper, padding: '20px 36px',
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 12,
              }}>
                成為第一批體驗者 <span style={{ fontSize: 20 }}>→</span>
              </a>
              <div style={{ fontSize: 13, color: v2.muted }}>
                <div>限 10 位 · 全程免費</div>
                <div>驗證期 5/18 – 5/29</div>
              </div>
            </div>
          </div>

          {/* right side — stacked index card */}
          <div>
            <div style={{
              background: '#FFFDF6', border: `1.5px solid ${v2.ink}`,
              padding: '32px 28px',
            }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', color: v2.muted, marginBottom: 20 }}>INSIDE THIS ISSUE</div>
              {[
                { n: 'P. 02', title: '做筆記的四大地獄', sub: '你中了幾個？' },
                { n: 'P. 03', title: 'AI × 筆記 四步流程', sub: '從講義到知識庫' },
                { n: 'P. 04', title: '學霸真實筆記集', sub: '六頁範例 · 可放大' },
                { n: 'P. 05', title: '獨家 · 學霸教學影片', sub: '潮汐 / 111 指考榜首' },
                { n: 'P. 06', title: '填問卷 · 加入體驗', sub: '2 分鐘 · 有獎勵' },
              ].map((x, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px dotted ${v2.rule}`,
                }}>
                  <div>
                    <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 17, fontWeight: 700 }}>{x.title}</div>
                    <div style={{ fontSize: 12, color: v2.muted, marginTop: 2 }}>{x.sub}</div>
                  </div>
                  <div style={{ fontSize: 12, color: v2.accent, fontWeight: 700, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{x.n}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <HW2 size={24} rotate={-4}>← 翻開來看吧</HW2>
            </div>
          </div>
        </div>

        {/* byline strip */}
        <div style={{
          marginTop: 80, paddingTop: 24, borderTop: `1px solid ${v2.rule}`,
          display: 'flex', justifyContent: 'space-between', fontSize: 12,
          letterSpacing: '0.08em', color: v2.muted, textTransform: 'uppercase',
        }}>
          <span>筆記 × AI 學習系統</span>
          <span>台灣高中職 · 2026 驗證專案</span>
          <span>Round 01 / 03</span>
        </div>
      </section>

      {/* PAIN POINTS — editorial grid */}
      <section id="pain" style={{ padding: '100px 60px', background: v2.paperAlt }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 60, borderBottom: `2px solid ${v2.ink}`, paddingBottom: 20 }}>
            <div style={{ fontSize: 13, letterSpacing: '0.2em', color: v2.accent, fontWeight: 700 }}>P. 02 ─ 診斷</div>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 64, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
              做筆記的四大地獄
            </h2>
            <div style={{ fontSize: 14, color: v2.muted, maxWidth: 200, textAlign: 'right' }}>
              你是不是也中了其中一項？
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { n: 'I', title: '做了，但沒用', desc: '花一整晚抄得超漂亮。考前翻開才發現——看不懂當時自己在寫什麼。' },
              { n: 'II', title: '抓不到重點', desc: '老師一講就通通寫下來，每一頁密密麻麻，根本分不出哪個才是考點。' },
              { n: 'III', title: '不會複習', desc: '筆記寫完就收進抽屜。考前兩週翻出來，不知道從哪一頁開始看。' },
              { n: 'IV', title: '亂到懷疑人生', desc: '國文歷史混在一起、錯題本跟講義沒分開，考前乾脆全部重新抄一次。' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '36px 28px',
                borderRight: i < 3 ? `1px solid ${v2.rule}` : 'none',
              }}>
                <div style={{
                  fontFamily: '"Noto Serif TC", serif', fontStyle: 'italic',
                  fontSize: 72, fontWeight: 400, color: v2.accent,
                  lineHeight: 1, marginBottom: 20,
                }}>{p.n}.</div>
                <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 26, fontWeight: 900, margin: '0 0 14px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: v2.inkSoft, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FLOW — numbered list */}
      <section id="flow" style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 13, letterSpacing: '0.2em', color: v2.accent, fontWeight: 700, marginBottom: 8 }}>P. 03 ─ 方法論</div>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 64, fontWeight: 900, margin: 0, letterSpacing: '-0.02em', maxWidth: 900 }}>
              四個步驟，<br/>
              把講義變成<span style={{ fontStyle: 'italic', color: v2.accent }}>你自己的</span>知識庫。
            </h2>
          </div>

          <div style={{ borderTop: `2px solid ${v2.ink}` }}>
            {[
              { n: '01', t: '丟進講義', d: '課本、講義、上課筆記，直接上傳。不用改格式，不用整理，原樣就好。', tag: 'UPLOAD' },
              { n: '02', t: 'AI 抓重點', d: '我們訓練過的 RAG 模型會依學科模板，自動生成大標、副標、重點、錯題分析。', tag: 'PROCESS' },
              { n: '03', t: '你來微調', d: '搭配學霸課程學會「怎麼判斷重點」，親手把 AI 的版本修到真正屬於你。', tag: 'REVIEW' },
              { n: '04', t: '累積知識庫', d: '筆記可查詢、可出題、可錯題分析，整學期甚至三年都可以一直累積下去。', tag: 'COMPOUND' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr 1fr 160px', gap: 40,
                padding: '40px 0', borderBottom: `1px solid ${v2.rule}`,
                alignItems: 'baseline',
              }}>
                <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 64, fontWeight: 900, lineHeight: 0.9, color: v2.accent }}>{s.n}</div>
                <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>{s.t}</h3>
                <p style={{ fontSize: 17, color: v2.inkSoft, lineHeight: 1.7, margin: 0 }}>{s.d}</p>
                <div style={{ fontSize: 11, letterSpacing: '0.2em', color: v2.muted, textAlign: 'right' }}>{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTES GALLERY */}
      <section id="notes" style={{ padding: '100px 60px', background: v2.paperAlt }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40, borderBottom: `2px solid ${v2.ink}`, paddingBottom: 20 }}>
            <div style={{ fontSize: 13, letterSpacing: '0.2em', color: v2.accent, fontWeight: 700 }}>P. 04 ─ 圖輯</div>
            <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 60, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
              真實筆記集
            </h2>
            <div style={{ fontSize: 14, color: v2.muted, fontStyle: 'italic' }}>點擊放大 · 看清每個重點</div>
          </div>
          <NoteGalleryV2/>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" style={{ padding: '120px 60px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 60, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.2em', color: v2.accent, fontWeight: 700, marginBottom: 8 }}>P. 05 ─ 獨家影片</div>
              <h2 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 56, fontWeight: 900, margin: 0, letterSpacing: '-0.02em', marginBottom: 24 }}>
                學霸親自示範
              </h2>
              <div style={{ aspectRatio: '16/9', background: '#111', marginBottom: 16 }}>
                {ytEmbed ? (
                  <iframe src={ytEmbed} style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen/>
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'repeating-linear-gradient(45deg, #1C1C1A 0 20px, #2A2A28 20px 21px)',
                    display: 'grid', placeItems: 'center', color: v2.paper,
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: 76, height: 76, borderRadius: '50%',
                        background: v2.yellow, color: v2.ink,
                        display: 'grid', placeItems: 'center', margin: '0 auto 16px',
                      }}>
                        <div style={{ width: 0, height: 0, borderLeft: '22px solid currentColor', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 6 }}/>
                      </div>
                      <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 22, fontWeight: 900 }}>YouTube 影片預留位置</div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: v2.muted, letterSpacing: '0.05em' }}>
                <span>EP.01 · 試看片段 · 約 12 分鐘</span>
                <span>主講：潮汐</span>
              </div>
            </div>
            <aside style={{
              background: '#FFFDF6', border: `1.5px solid ${v2.ink}`,
              padding: '32px 28px', position: 'sticky', top: 40,
            }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', color: v2.muted, marginBottom: 16 }}>ABOUT THE LECTURER</div>
              <h3 style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 28, fontWeight: 900, margin: '0 0 4px' }}>潮汐</h3>
              <div style={{ fontSize: 13, color: v2.muted, marginBottom: 18 }}>111 指考榜首 · 國文 98 級分</div>
              <div style={{ fontSize: 14, color: v2.inkSoft, lineHeight: 1.7, marginBottom: 20 }}>
                擅長結構型筆記，尤其是國文人物關係、歷史時序整理。過去一年有販售自己的手寫筆記超過 300 份。
              </div>
              <div style={{ borderTop: `1px dashed ${v2.rule}`, paddingTop: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.15em', color: v2.muted, marginBottom: 10 }}>本集重點</div>
                {['文具準備與時機', '上課即時抓重點', '課後 10 分鐘整理法', '搭配 AI 生成複習題'].map((x, i) => (
                  <div key={i} style={{ fontSize: 13, padding: '6px 0', color: v2.inkSoft, display: 'flex', gap: 8 }}>
                    <span style={{ color: v2.accent, fontWeight: 900 }}>▸</span>{x}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final-cta" style={{
        padding: '140px 60px', background: v2.ink, color: v2.paper,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.2em', color: v2.yellow, fontWeight: 700, marginBottom: 24 }}>P. 06 ─ 加入驗證</div>
              <h2 style={{
                fontFamily: '"Noto Serif TC", serif', fontSize: 72, fontWeight: 900,
                lineHeight: 1.0, margin: 0, letterSpacing: '-0.02em',
              }}>
                2 分鐘。<br/>
                讓這堂課<br/>
                <span style={{ fontStyle: 'italic', color: v2.yellow }}>真的做出來</span>。
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(245,239,225,0.75)', marginTop: 32, maxWidth: 460 }}>
                告訴我們你的筆記痛點、願意付多少錢、希望有什麼功能——你的回答，會決定這件事要不要做下去。
              </p>
            </div>
            <div>
              <a href={formUrl} style={{
                display: 'block', background: v2.yellow, color: v2.ink,
                padding: '40px 32px', textDecoration: 'none',
                border: `2px solid ${v2.paper}`,
              }}>
                <div style={{ fontSize: 13, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 16 }}>問卷連結</div>
                <div style={{ fontFamily: '"Noto Serif TC", serif', fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  填寫付費<br/>意願問卷 →
                </div>
                <div style={{ borderTop: `1.5px solid ${v2.ink}`, marginTop: 28, paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>
                  <span>⏱ 約 2 分鐘</span>
                  <span>🎁 完整填寫有獎勵</span>
                </div>
              </a>
            </div>
          </div>
          <div style={{ marginTop: 100, paddingTop: 40, borderTop: '1px solid rgba(245,239,225,0.15)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(245,239,225,0.5)', letterSpacing: '0.1em' }}>
            <span>筆記聯盟 © 2026</span>
            <span>ROUND 01 / VALIDATION</span>
            <span>TAIWAN · HIGH SCHOOL ONLY</span>
          </div>
        </div>
      </section>
    </div>
  );
}

window.LandingV2 = LandingV2;
