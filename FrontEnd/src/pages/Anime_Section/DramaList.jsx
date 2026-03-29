import React, { useState } from "react";

// ── initial data ──────────────────────────────────────────────────────────────
const initialData = {
  cdrama: [
    {
      id: 1,
      title: "How Dare You",
      review: "A fierce, enemies-to-lovers slow burn that keeps you on the edge.",
      images: [],
    },
    {
      id: 2,
      title: "Fated Hearts",
      review: "Beautifully shot with chemistry that jumps off the screen.",
      images: [],
    },
    {
      id: 3,
      title: "Love In Clouds",
      review: "Light and dreamy — perfect feel-good watch.",
      images: [],
    },
  ],
  kdrama: [
    {
      id: 4,
      title: "Crash Landing on You",
      review: "Legendary. The story that started it all for so many fans.",
      images: [],
    },
    {
      id: 5,
      title: "Our Beloved Summer",
      review: "Soft, nostalgic, and painfully real — a quiet masterpiece.",
      images: [],
    },
    {
      id: 6,
      title: "Twenty Five Twenty One",
      review: "Youthful energy and heartache wrapped in one gorgeous package.",
      images: [],
    },
  ],
};

// ── tiny unique-id helper ─────────────────────────────────────────────────────
let _id = 100;
const uid = () => ++_id;

// ── placeholder gradient covers ──────────────────────────────────────────────
const gradients = [
  "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
  "linear-gradient(135deg,#2d1b69 0%,#11998e 100%)",
  "linear-gradient(135deg,#360033 0%,#0b8793 100%)",
  "linear-gradient(135deg,#1a1a2e 0%,#e94560 100%)",
  "linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
  "linear-gradient(135deg,#141e30 0%,#243b55 100%)",
];

// ── Card ──────────────────────────────────────────────────────────────────────
const DramaCard = ({ item, index }) => {
  const [imgErr, setImgErr] = useState(false);
  const bg = gradients[index % gradients.length];
  const firstImg = item.images?.[0];

  return (
    <div className="drama-card">
      <div
        className="card-cover"
        style={{ background: firstImg && !imgErr ? undefined : bg }}
      >
        {firstImg && !imgErr ? (
          <img
            src={firstImg}
            alt={item.title}
            onError={() => setImgErr(true)}
          />
        ) : (
          <span className="cover-letter">
            {item.title.charAt(0).toUpperCase()}
          </span>
        )}
        {item.images?.length > 1 && (
          <div className="img-count">+{item.images.length - 1}</div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        {item.review && <p className="card-review">{item.review}</p>}
      </div>
    </div>
  );
};

// ── Add Modal ────────────────────────────────────────────────────────────────
const AddModal = ({ activeTab, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [images, setImages] = useState([]);
  const [tab, setTab] = useState(activeTab); // cdrama | kdrama

  const addImg = () => {
    const url = imgUrl.trim();
    if (url && images.length < 2) {
      setImages((prev) => [...prev, url]);
      setImgUrl("");
    }
  };

  const submit = () => {
    if (!title.trim()) return;
    onAdd(tab, {
      id: uid(),
      title: title.trim(),
      review: review.trim(),
      images,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-heading">Add New Drama</h2>

        {/* tab switcher inside modal */}
        <div className="modal-tabs">
          {["cdrama", "kdrama"].map((t) => (
            <button
              key={t}
              className={`modal-tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t === "cdrama" ? "C-Drama" : "K-Drama"}
            </button>
          ))}
        </div>

        <label className="field-label">Title *</label>
        <input
          className="field-input"
          placeholder="Drama title…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="field-label">Short Review (optional)</label>
        <textarea
          className="field-input field-textarea"
          placeholder="Your thoughts…"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <label className="field-label">
          Image URLs (max 2, optional)
        </label>
        <div className="img-row">
          <input
            className="field-input img-input"
            placeholder="Paste image URL…"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addImg()}
            disabled={images.length >= 2}
          />
          <button
            className="add-img-btn"
            onClick={addImg}
            disabled={images.length >= 2 || !imgUrl.trim()}
          >
            Add
          </button>
        </div>
        {images.length > 0 && (
          <div className="img-chips">
            {images.map((url, i) => (
              <div key={i} className="img-chip">
                <span>{url.slice(0, 32)}…</span>
                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, j) => j !== i))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="submit-btn" onClick={submit} disabled={!title.trim()}>
          Add to List
        </button>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const DramaList = () => {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("cdrama");
  const [showModal, setShowModal] = useState(false);

  const addDrama = (tab, item) => {
    setData((prev) => ({
      ...prev,
      [tab]: [...prev[tab], item],
    }));
  };

  const list = data[activeTab];

  return (
    <>
      <style>{`
        /* ── base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d1117; color: #e6edf3; font-family: 'Segoe UI', system-ui, sans-serif; }

        .drama-page {
          min-height: 100vh;
          background: #0d1117;
          padding-bottom: 80px;
        }

        /* ── header tabs (same dark-purple style as screenshot) ── */
        .drama-tabs-bar {
          background: linear-gradient(90deg, #2d1b69 0%, #6d28d9 60%, #7c3aed 100%);
          padding: 0 16px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .drama-tabs-bar::-webkit-scrollbar { display: none; }

        .tab-btn {
          background: rgba(255,255,255,0.08);
          border: none;
          color: #c4b5fd;
          padding: 14px 28px;
          border-radius: 12px;
          margin: 10px 0;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .tab-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .tab-btn.active {
          background: rgba(255,255,255,0.22);
          color: #fff;
          font-weight: 700;
        }

        /* ── section heading ── */
        .section-label {
          font-size: 13px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #8b949e;
          padding: 28px 32px 12px;
        }

        /* ── grid ── */
        .drama-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 24px;
          padding: 8px 32px 32px;
        }

        /* ── card ── */
        .drama-card {
          border-radius: 14px;
          overflow: hidden;
          background: #161b22;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .drama-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }

        .card-cover {
          width: 100%;
          aspect-ratio: 2/3;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .card-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cover-letter {
          font-size: 72px;
          font-weight: 900;
          color: rgba(255,255,255,0.15);
          user-select: none;
        }
        .img-count {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }

        .card-body {
          padding: 12px 14px 14px;
        }
        .card-title {
          font-size: 14px;
          font-weight: 700;
          color: #e6edf3;
          line-height: 1.3;
          margin-bottom: 6px;
          text-align: center;
        }
        .card-review {
          font-size: 12px;
          color: #8b949e;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: center;
        }

        /* ── empty state ── */
        .empty-state {
          text-align: center;
          color: #8b949e;
          padding: 80px 32px;
          font-size: 15px;
        }
        .empty-state span { font-size: 48px; display: block; margin-bottom: 12px; }

        /* ── FAB ── */
        .fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          color: #fff;
          font-size: 26px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(124,58,237,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          z-index: 50;
        }
        .fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(124,58,237,0.7);
        }

        /* ── modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 16px;
        }
        .modal {
          background: #161b22;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px 28px 28px;
          width: 100%;
          max-width: 440px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.08);
          border: none;
          color: #8b949e;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.16); color: #fff; }

        .modal-heading {
          font-size: 20px;
          font-weight: 800;
          color: #e6edf3;
        }

        .modal-tabs {
          display: flex;
          gap: 8px;
        }
        .modal-tab {
          flex: 1;
          padding: 9px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #8b949e;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .modal-tab.active {
          background: rgba(124,58,237,0.3);
          border-color: #7c3aed;
          color: #c4b5fd;
          font-weight: 700;
        }

        .field-label {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8b949e;
          margin-bottom: -8px;
        }
        .field-input {
          width: 100%;
          background: #0d1117;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #e6edf3;
          padding: 11px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .field-input:focus { border-color: #7c3aed; }
        .field-textarea { resize: vertical; min-height: 80px; font-family: inherit; }

        .img-row { display: flex; gap: 8px; }
        .img-input { flex: 1; }
        .add-img-btn {
          padding: 11px 18px;
          background: rgba(124,58,237,0.25);
          border: 1px solid #7c3aed;
          border-radius: 10px;
          color: #c4b5fd;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .add-img-btn:hover:not(:disabled) { background: rgba(124,58,237,0.4); }
        .add-img-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .img-chips { display: flex; flex-direction: column; gap: 6px; }
        .img-chip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          color: #8b949e;
          gap: 8px;
        }
        .img-chip button {
          background: none;
          border: none;
          color: #8b949e;
          cursor: pointer;
          font-size: 12px;
          flex-shrink: 0;
        }
        .img-chip button:hover { color: #e6edf3; }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 4px;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="drama-page">
        {/* tab bar */}
        <div className="drama-tabs-bar">
          <button
            className={`tab-btn ${activeTab === "cdrama" ? "active" : ""}`}
            onClick={() => setActiveTab("cdrama")}
          >
            C-Drama List
          </button>
          <button
            className={`tab-btn ${activeTab === "kdrama" ? "active" : ""}`}
            onClick={() => setActiveTab("kdrama")}
          >
            K-Drama List
          </button>
        </div>

        {/* section label */}
        <p className="section-label">
          {activeTab === "cdrama" ? "Chinese Dramas" : "Korean Dramas"} —{" "}
          {list.length} title{list.length !== 1 ? "s" : ""}
        </p>

        {/* grid */}
        {list.length > 0 ? (
          <div className="drama-grid">
            {list.map((item, i) => (
              <DramaCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🎬</span>
            No titles yet — add your first one!
          </div>
        )}

        {/* FAB */}
        {/* <button className="fab" onClick={() => setShowModal(true)} title="Add drama">
          +
        </button>

        
        {showModal && (
          <AddModal
            activeTab={activeTab}
            onClose={() => setShowModal(false)}
            onAdd={addDrama}
          />
        )} */}
      </div>
    </>
  );
};

export default DramaList;