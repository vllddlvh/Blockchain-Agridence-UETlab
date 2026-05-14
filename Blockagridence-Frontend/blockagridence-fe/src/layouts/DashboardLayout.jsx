import './DashboardLayout.css';

export default function DashboardLayout({ children, currentPath, setCurrentPath }) {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">BA</div>
          <h2>BlockAgridence</h2>
        </div>

          <div className="sidebar-section">
            <p className="sidebar-title">HỆ THỐNG</p>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${currentPath === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPath('dashboard')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Truy xuất nguồn gốc
              </button>
            </nav>
          </div>

          <div className="sidebar-section">
          <p className="sidebar-title">VAI TRÒ: NÔNG DÂN</p>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${currentPath === 'certificates' ? 'active' : ''}`}
                onClick={() => setCurrentPath('certificates')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Quản lý Chứng nhận
              </button>
              <button 
                className={`nav-item ${currentPath === 'create-batch' ? 'active' : ''}`}
                onClick={() => setCurrentPath('create-batch')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Khởi tạo Lô hàng
              </button>
              <button 
                className={`nav-item ${currentPath === 'batch-detail' ? 'active' : ''}`}
                onClick={() => setCurrentPath('batch-detail')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Quản lý Xuất xưởng
              </button>
            </nav>
          </div>

          <div className="sidebar-section">
          <p className="sidebar-title">VAI TRÒ: VẬN CHUYỂN</p>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${currentPath === 'transfer-ownership' ? 'active' : ''}`}
                onClick={() => setCurrentPath('transfer-ownership')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                Chuyển giao Sở hữu
              </button>
              <button 
                className={`nav-item ${currentPath === 'update-transit' ? 'active' : ''}`}
                onClick={() => setCurrentPath('update-transit')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                Nhật ký Hành trình
              </button>
            </nav>
          </div>

          <div className="sidebar-section">
          <p className="sidebar-title">VAI TRÒ: NHÀ BÁN LẺ</p>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${currentPath === 'receive-goods' ? 'active' : ''}`}
                onClick={() => setCurrentPath('receive-goods')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Nhập hàng vào Kho
              </button>
              <button 
                className={`nav-item ${currentPath === 'retail-dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPath('retail-dashboard')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Quản lý Phân phối
              </button>
            </nav>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">ADMIN / CƠ QUAN QL</p>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${currentPath === 'risk-management' ? 'active' : ''}`}
                onClick={() => setCurrentPath('risk-management')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Quản trị Rủi ro
              </button>
              <button 
                className={`nav-item ${currentPath === 'audit' ? 'active' : ''}`}
                onClick={() => setCurrentPath('audit')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M9 15L11 17L15 13"></path>
                </svg>
                Thanh tra (Audit)
              </button>
            </nav>
          </div>
      </aside>
      
      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-search">
            <input type="text" placeholder="Tìm kiếm mã lô hàng, mã hash..." />
          </div>
          <div className="topbar-actions">
            <div className="system-status">
              <span className="pulse-dot"></span>
              <span>Blockchain Node: Active</span>
            </div>
            <div className="user-profile">
              <div className="avatar" style={{backgroundColor: '#1e293b'}}>AD</div>
              <span>Quản trị viên Hệ thống</span>
            </div>
          </div>
        </header>
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
