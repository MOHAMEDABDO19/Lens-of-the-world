import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import postsData from "./date/posts.json";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "المدونة", path: "/blogs" },
    { name: "من نحن", path: "/about" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <div className="logo-text">
            <strong>{postsData.siteInfo?.name || "عدسة"}</strong>
            <span>{postsData.siteInfo?.tagline || "عالم التصوير"}</span>
          </div>
        </Link>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={location.pathname === link.path ? "nav-link active" : "nav-link"}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          className="nav-cta"
          onClick={() => {
            navigate("/blogs");
            setMenuOpen(false);
          }}
        >
          ابدأ القراءة
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            <div className="logo-text">
              <strong>{postsData.siteInfo?.name || "عدسة"}</strong>
              <span>{postsData.siteInfo?.tagline}</span>
            </div>
          </Link>
          <p>{postsData.siteInfo?.description || "منصة متخصصة في عالم التصوير الفوتوغرافي."}</p>
        </div>

        <div className="footer-column">
          <h3>استكشف</h3>
          <Link to="/">الرئيسية</Link>
          <Link to="/blogs">المدونة</Link>
          <Link to="/about">من نحن</Link>
        </div>

        <div className="footer-column">
          <h3>التصنيفات</h3>
          {postsData.categories?.slice(0, 4).map((category) => (
            <Link key={category.name} to={`/blogs?category=${category.name}`}>
              {category.name}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>تواصل معنا</h3>
          <a href={`mailto:${postsData.siteInfo?.email}`}>
            ✉️ {postsData.siteInfo?.email}
          </a>
          <span>نحن نحب أن نسمع منك ✨</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 {postsData.siteInfo?.name || "عدسة"} — جميع الحقوق محفوظة</p>
        <span>صُنع بشغف للتصوير</span>
      </div>
    </footer>
  );
}

function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <article className="post-card" onClick={() => navigate(`/blog/${post.id}`)}>
      <div className="post-image-wrapper">
        <img src={post.image} alt={post.title} className="post-image" />
        <div className="image-overlay"></div>
        <span className="post-category">{post.category}</span>
        
        <span className="read-arrow gold-star-badge">
          ⭐
        </span>
      </div>

      <div className="post-content">
        <div className="post-meta">
          <span>📅 {post.date}</span>
          <span>•</span>
          <span>⏱️ {post.readTime}</span>
        </div>

        <h3>{post.title}</h3>
        <p>
          {post.excerpt?.substring(0, 120)}
          {post.excerpt?.length > 120 ? "..." : ""}
        </p>

        <div className="post-author">
          <img src={post.author?.avatar} alt={post.author?.name} />
          <div>
            <strong>{post.author?.name}</strong>
            <span>كاتب المقال</span>
          </div>
          <span className="author-arrow">←</span>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const navigate = useNavigate();
  const featuredPosts = postsData.posts?.filter((post) => post.featured) || [];
  const categories = postsData.categories || [];

  return (
    <>
      <main className="home">
        <section className="hero">
          <div className="hero-background"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              منصة التصوير الأولى
            </div>

            <h1>
              اكتشف فن <span>التصوير الفوتوغرافي</span>
            </h1>

            <p>{postsData.siteInfo?.description || "تعلم التصوير واكتشف أسراره وتقنيات المحترفين."}</p>

            <div className="hero-buttons">
              <button className="primary-button" onClick={() => navigate("/blogs")}>
                استكشف المقالات
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <button className="secondary-button" onClick={() => navigate("/about")}>
                تعرف علينا
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{postsData.posts?.length || 0}+</strong>
                <span>مقال</span>
              </div>
              <div>
                <strong>{categories.length}</strong>
                <span>تصنيفات</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>محتوى مفيد</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="section-heading">
            <div>
              <span className="section-label">اكتشف أكثر</span>
              <h2>استكشف حسب الموضوع</h2>
            </div>
            <Link to="/blogs" className="view-all">
              جميع المقالات ←
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link key={category.name} to={`/blogs?category=${category.name}`} className="category-card">
                <div className="category-number">0{index + 1}</div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <span>{category.count} مقالات</span>
                </div>
                <span className="category-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section container">
          <div className="section-heading">
            <div>
              <span className="section-label">محتوى مميز</span>
              <h2>مقالات مختارة</h2>
            </div>
            <Link to="/blogs" className="view-all">
              عرض الكل ←
            </Link>
          </div>

          <div className="posts-grid">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="cta-section container">
          <div className="cta-box">
            <div>
              <span className="section-label">مستعد تبدأ؟</span>
              <h2>خلي كل صورة<br />تحكي قصة.</h2>
              <p>اكتشف المقالات والنصائح التي تساعدك تطور مهاراتك في التصوير.</p>
            </div>
            <button className="primary-button" onClick={() => navigate("/blogs")}>
              ابدأ الآن
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const posts = postsData.posts || [];
  const categories = ["All", ...(postsData.categories?.map((c) => c.name) || [])];

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = post.title?.toLowerCase().includes(query) || post.excerpt?.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const changeCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") setSearchParams({});
    else setSearchParams({ category });
  };

  return (
    <>
      <main className="blogs-page">
        <div className="container">
          <section className="page-hero">
            <span className="section-label">مكتبة المعرفة</span>
            <h1>استكشف <span>مقالاتنا</span></h1>
            <p>دروس، نصائح وتجارب تساعدك على تطوير مهاراتك في التصوير.</p>
          </section>

          <section className="filter-box">
            <div className="search-wrapper">
              <span>⌕</span>
              <input
                type="text"
                placeholder="ابحث عن مقال..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              {searchQuery && <button onClick={() => setSearchQuery("")}>✕</button>}
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? "filter-button active" : "filter-button"}
                  onClick={() => changeCategory(category)}
                >
                  {category === "All" ? "الكل" : category}
                </button>
              ))}
            </div>
          </section>

          <div className="results-info">
            <span>{filteredPosts.length} مقال متاح</span>
            {selectedCategory !== "All" && <span>التصنيف: <strong>{selectedCategory}</strong></span>}
          </div>

          {currentPosts.length === 0 ? (
            <div className="empty-state">
              <div>🔎</div>
              <h2>لم نجد ما تبحث عنه</h2>
              <p>جرب كلمة بحث مختلفة أو تصنيف آخر.</p>
              <button className="primary-button" onClick={() => { setSearchQuery(""); changeCategory("All"); }}>
                عرض كل المقالات
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>←</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>→</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = postsData.posts?.find((item) => String(item.id) === String(id));

  if (!post) {
    return (
      <>
        <main className="not-found" style={{ textAlign: "center", padding: "100px 20px" }}>
          <div className="not-found-icon">404</div>
          <h1>المقال غير موجود</h1>
          <p style={{ color: "#9ca3af", marginBottom: "25px" }}>يبدو أن المقال الذي تبحث عنه غير موجود أو تم حذفه.</p>
          <button className="primary-button" onClick={() => navigate("/blogs")} style={{ margin: "0 auto" }}>
            العودة للمدونة ←
          </button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="details-page">
        <div className="article-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            → العودة
          </button>

          <div className="article-header">
            <span className="post-category">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
            <div className="article-author">
              <img src={post.author?.avatar} alt={post.author?.name} />
              <div>
                <strong>{post.author?.name}</strong>
                <span>{post.date} • {post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="article-image-wrapper">
            <img src={post.image} alt={post.title} />
          </div>

          <article className="article-content">{post.content}</article>

          <div className="article-bottom">
            <button className="primary-button" onClick={() => navigate("/blogs")} style={{ margin: "0 auto" }}>
              استكشف المزيد ←
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function About() {
  const authors = [
    {
      name: "إبراهيم حسن",
      role: "مصور طبيعة",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      linkedin: "#",
      behance: "#",
      x: "#"
    },
    {
      name: "محمد علي",
      role: "مصور بورتريه",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      linkedin: "#",
      behance: "#",
      x: "#"
    },
    {
      name: "سالم أحمد",
      role: "مصور محترف",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      linkedin: "#",
      behance: "#",
      x: "#"
    }
  ];

  return (
    <>
      <main className="about-page">
        <div className="about-container">
          <span className="section-label">قصتنا</span>
          <h1>من نحن؟</h1>
          <p className="about-description">{postsData.siteInfo?.description}</p>

          <div className="about-grid">
            <div className="about-card">
              <span>01</span>
              <h3>نتعلم</h3>
              <p>نقدم محتوى تعليمي يساعدك تفهم أساسيات التصوير.</p>
            </div>
            <div className="about-card">
              <span>02</span>
              <h3>نطور</h3>
              <p>نشارك نصائح وتقنيات عملية لتطوير مستواك.</p>
            </div>
            <div className="about-card">
              <span>03</span>
              <h3>نلهم</h3>
              <p>نساعدك تشوف التصوير بطريقة مختلفة.</p>
            </div>
          </div>

          <div className="authors-section" style={{ marginTop: "60px", textAlign: "center" }}>
            <span className="section-label">فريقنا</span>
            <h2 style={{ marginBottom: "15px", color: "#fff" }}>تعرف على كتابنا</h2>
            <p style={{ color: "#9ca3af", marginBottom: "40px" }}>فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.</p>
            
            <div className="authors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
              {authors.map((author, index) => (
                <div key={index} className="author-box" style={{ background: "#111827", padding: "30px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                  <img src={author.image} alt={author.name} style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", margin: "0 auto 15px", border: "3px solid #f59e0b" }} />
                  <h3 style={{ color: "#fff", marginBottom: "5px" }}>{author.name}</h3>
                  <span style={{ color: "#f59e0b", fontSize: "14px", display: "block", marginBottom: "20px" }}>{author.role}</span>
                  
                  <div className="author-socials" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <a href={author.linkedin} style={{ width: "36px", height: "36px", background: "#1f2937", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href={author.behance} style={{ width: "36px", height: "36px", background: "#1f2937", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path><line x1="15" y1="11" x2="22" y2="11"></line><path d="M19 8l3 3-3 3"></path></svg>
                    </a>
                    <a href={author.x} style={{ width: "36px", height: "36px", background: "#1f2937", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-card" style={{ marginTop: "50px" }}>
            <span className="section-label">تواصل معنا</span>
            <h2>عندك سؤال؟</h2>
            <p>لا تتردد في التواصل معنا.</p>
            <a href={`mailto:${postsData.siteInfo?.email}`}>
              {postsData.siteInfo?.email}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        {/* أي مسار غير معروف هيحول المستخدم على الهوم علطول */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;