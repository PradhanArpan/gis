import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { renderMd, enhance } from "./md.js";
import { WIDGETS } from "./widgets.jsx";
import { 
  Compass, Map as MapIcon, Layers, BookOpen, CheckCircle2, Circle, 
  Search, Moon, Sun, Laptop, Menu, X, ExternalLink, Download, FileText, ChevronRight 
} from "lucide-react";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const s = localStorage.getItem("ce452-theme");
      if (s) return s;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch (e) {}
    return "light";
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("ce452-theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}

function useRoute() {
  const get = () => {
    const hash = location.hash.replace(/^#\/?/, "").replace(/\?.*$/, "");
    return hash || "lab/L01";
  };
  const [route, setRoute] = useState(get);

  useEffect(() => {
    const onHash = () => {
      setRoute(get());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

export function App() {
  const [courseData, setCourseData] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, toggleTheme] = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ce452-completed-labs") || "[]");
    } catch (e) {
      return [];
    }
  });

  const contentRef = useRef(null);
  const route = useRoute();

  // Load sessions.json
  useEffect(() => {
    fetch("sessions.json")
      .then(res => res.json())
      .then(data => {
        setCourseData(data);
      })
      .catch(err => console.error("Error loading sessions.json:", err));
  }, []);

  // Load Markdown file based on route
  useEffect(() => {
    if (!courseData) return;
    setLoading(true);

    let filePath = "";
    if (route.startsWith("lab/")) {
      const labId = route.split("/")[1];
      const lab = courseData.labs.find(l => l.id === labId);
      filePath = lab ? lab.file : "labs/L01.md";
    } else if (route.startsWith("page/")) {
      const pageId = route.split("/")[1];
      const page = courseData.pages.find(p => p.id === pageId);
      filePath = page ? page.file : "pages/setup.md";
    } else {
      filePath = "labs/L01.md";
    }

    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        setContent(`# Content Not Available\n\nCould not load \`${filePath}\`.`);
        setLoading(false);
      });
  }, [route, courseData]);

  // Mount KaTeX, Code, and Widgets
  useEffect(() => {
    if (!contentRef.current || loading) return;
    enhance(contentRef.current);

    // Mount interactive widgets
    contentRef.current.querySelectorAll(".wg-mount").forEach(el => {
      const widgetName = el.dataset.w;
      const WidgetComponent = WIDGETS[widgetName];
      if (WidgetComponent) {
        const root = createRoot(el);
        root.render(<WidgetComponent />);
      }
    });
  }, [content, loading]);

  const toggleLabCompletion = (labId) => {
    setCompletedLabs(prev => {
      const next = prev.includes(labId) ? prev.filter(id => id !== labId) : [...prev, labId];
      try {
        localStorage.setItem("ce452-completed-labs", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const filteredLabs = courseData ? courseData.labs.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.dataset && l.dataset.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <div className="fb-shell">
      {/* Mobile Header */}
      <header className="fb-mobile-header">
        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <span className="fb-mobile-title">CE452 GIS Laboratory</span>
        <button onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fb-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="fb-sidebar__header">
          <div className="fb-sidebar__brand">
            <Compass className="fb-brand-icon" size={24} />
            <div>
              <div className="fb-brand-code">CE452</div>
              <div className="fb-brand-name">GIS Laboratory</div>
            </div>
          </div>
          <button className="fb-sidebar__close" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="fb-sidebar__quickactions">
          <button className="fb-search-btn" onClick={() => setSearchOpen(true)}>
            <Search size={14} />
            <span>Search labs... (Ctrl+K)</span>
          </button>
        </div>

        <nav className="fb-sidebar__nav">
          <div className="fb-nav-section-title">Course Information</div>
          {courseData && courseData.pages.map(page => (
            <a 
              key={page.id} 
              href={`#page/${page.id}`}
              className={`fb-nav-link ${route === `page/${page.id}` ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <BookOpen size={16} />
              <span>{page.title}</span>
            </a>
          ))}

          <div className="fb-nav-section-title" style={{ marginTop: "1.25rem" }}>
            <span>Hands-on Labs (15 Weeks)</span>
            <span className="fb-progress-pill">
              {courseData ? `${completedLabs.length}/${courseData.labs.length}` : ""}
            </span>
          </div>

          {courseData && courseData.labs.map(lab => {
            const isDone = completedLabs.includes(lab.id);
            const isActive = route === `lab/${lab.id}`;
            return (
              <a 
                key={lab.id} 
                href={`#lab/${lab.id}`}
                className={`fb-nav-link fb-lab-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <button 
                  type="button" 
                  className={`fb-check-btn ${isDone ? "done" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLabCompletion(lab.id);
                  }}
                  title={isDone ? "Mark as pending" : "Mark as completed"}
                >
                  {isDone ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                </button>
                <div className="fb-lab-link-text">
                  <span className="fb-lab-id">{lab.id}</span>
                  <span className="fb-lab-title">{lab.title}</span>
                </div>
              </a>
            );
          })}
        </nav>

        <div className="fb-sidebar__footer">
          <div className="fb-instructor-info">
            <div className="name">Dr Arpan Pradhan</div>
            <div className="dept">Civil Engineering, Christ University</div>
          </div>
          <div className="fb-footer-actions">
            <button onClick={toggleTheme} className="fb-theme-toggle" title="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/PradhanArpan/gis" target="_blank" rel="noreferrer" title="GitHub Repository">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="fb-main">
        {loading ? (
          <div className="fb-loading">
            <div className="fb-spinner"></div>
            <p>Loading courseware module...</p>
          </div>
        ) : (
          <div className="fb-content-wrapper">
            <article 
              className="fb-article markdown-body" 
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: renderMd(content) }}
            />
          </div>
        )}
      </main>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fb-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="fb-modal-card" onClick={e => e.stopPropagation()}>
            <div className="fb-modal-header">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search exercises, datasets, algorithms, and tools..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)}><X size={18} /></button>
            </div>
            <div className="fb-modal-results">
              {filteredLabs.length === 0 ? (
                <div className="fb-no-results">No matching laboratory exercises found.</div>
              ) : (
                filteredLabs.map(lab => (
                  <a 
                    key={lab.id}
                    href={`#lab/${lab.id}`}
                    className="fb-search-result-item"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="id-badge">{lab.id}</div>
                    <div className="details">
                      <div className="title">{lab.title}</div>
                      <div className="meta">Software: {lab.software} | Dataset: {lab.dataset}</div>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Global keyboard shortcut for search (Ctrl+K or /)
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    const btn = document.querySelector(".fb-search-btn");
    if (btn) btn.click();
  }
});

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
