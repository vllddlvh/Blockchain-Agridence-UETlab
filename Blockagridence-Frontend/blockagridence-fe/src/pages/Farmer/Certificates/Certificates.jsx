import './Certificates.css';

export default function Certificates() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Quản lý Chứng nhận</h1>
        <p className="page-subtitle">Tải lên giấy tờ chứng nhận ATVSTP, VietGAP (Đầu vào tin cậy)</p>
      </div>

      <div className="upload-card">
        <div className="upload-area">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="upload-icon">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <h3>Kéo thả file chứng nhận vào đây</h3>
          <p>Hỗ trợ định dạng: PDF, JPG, PNG (Max 5MB)</p>
          <button className="btn-primary mt-3">Chọn File Tải Lên</button>
        </div>
      </div>

      <div className="certs-list-container">
        <h3>Chứng nhận đã tải lên</h3>
        <div className="certs-grid">
          <div className="cert-card verified">
            <div className="cert-status">
              <span className="badge success">Đã xác thực</span>
            </div>
            <div className="cert-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h4>Chứng nhận VietGAP 2026</h4>
            <p>Mã: VG-4590-2026</p>
            <p className="date">Cấp ngày: 10/01/2026</p>
          </div>

          <div className="cert-card pending">
            <div className="cert-status">
              <span className="badge pending">Chờ duyệt</span>
            </div>
            <div className="cert-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h4>GCN Cơ sở Đủ Điều Kiện ATVSTP</h4>
            <p>Mã: ATVSTP-HCM-112</p>
            <p className="date">Tải lên: 12/05/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
