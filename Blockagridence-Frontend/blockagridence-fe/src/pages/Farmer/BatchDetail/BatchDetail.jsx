import './BatchDetail.css';

export default function BatchDetail() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Quản lý Xuất xưởng</h1>
        <p className="page-subtitle">Chi tiết lô hàng và Mã QR truy xuất nguồn gốc</p>
      </div>

      <div className="batch-detail-grid">
        <div className="detail-card">
          <div className="card-header">
            <h3>Thông tin Lô hàng #BATCH-88902</h3>
            <span className="badge success">Đã On-chain</span>
          </div>
          
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Sản phẩm / Giống:</span>
              <span className="info-value font-semibold">Dâu tây New Zealand</span>
            </div>
            <div className="info-item">
              <span className="info-label">Ngày tạo:</span>
              <span className="info-value">12/05/2026 - 10:00 AM</span>
            </div>
            <div className="info-item">
              <span className="info-label">Người tạo:</span>
              <span className="info-value">Hợp tác xã Nông nghiệp Đà Lạt</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tọa độ GPS:</span>
              <span className="info-value">11.9404° N, 108.4583° E</span>
            </div>
            <div className="info-item hash-box">
              <span className="info-label">Tx Hash:</span>
              <code>0x8f3c...a1b2e3b0c44298fc1c149afbf4c8996fb9242</code>
            </div>
          </div>
        </div>

        <div className="qr-card">
          <h3>Mã QR Tem Nhãn</h3>
          <p className="text-muted">In và dán mã QR này lên bao bì sản phẩm để người dùng truy xuất.</p>
          
          <div className="qr-container">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://localhost:5173/trace/BATCH-88902" 
              alt="QR Code" 
              className="qr-image"
            />
          </div>

          <div className="qr-actions">
            <button className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Tải Xuống
            </button>
            <button className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              In Tem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
