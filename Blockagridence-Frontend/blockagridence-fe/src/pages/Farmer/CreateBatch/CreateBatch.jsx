import { useState } from 'react';
import MetaMaskModal from '../../../components/MetaMaskModal/MetaMaskModal';
import './CreateBatch.css';

export default function CreateBatch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, signing, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSign = () => {
    setStatus('signing');
    // Simulate Blockchain delay
    setTimeout(() => {
      setIsModalOpen(false);
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="page-container success-container">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Khởi tạo Lô hàng Thành công!</h2>
        <p>Hash SHA-256 đã được đẩy lên Blockchain an toàn.</p>
        <button className="btn-primary mt-3" onClick={() => setStatus('idle')}>Tạo lô hàng mới</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Khởi tạo Lô hàng</h1>
        <p className="page-subtitle">Nhập thông tin giống, phân bón, ảnh hiện trường và tọa độ GPS</p>
      </div>

      <form className="batch-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Tên Sản Phẩm / Giống</label>
            <input type="text" placeholder="Vd: Dâu tây New Zealand" required />
          </div>
          <div className="form-group">
            <label>Ngày Xuống Giống</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Phân Bón Sử Dụng</label>
            <input type="text" placeholder="Vd: Hữu cơ sinh học" required />
          </div>
          <div className="form-group">
            <label>Tọa Độ GPS (Tự động)</label>
            <div className="gps-input">
              <input type="text" value="11.9404° N, 108.4583° E" readOnly />
              <button type="button" className="btn-gps">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="form-group mt-4">
          <label>Hình Ảnh Hiện Trường</label>
          <div className="image-upload-area">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <p>Tải lên ảnh chụp thực tế tại vườn</p>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-large">
            Khởi tạo & Ký Blockchain
          </button>
        </div>
      </form>

      <MetaMaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSign={handleSign}
      />
    </div>
  );
}
