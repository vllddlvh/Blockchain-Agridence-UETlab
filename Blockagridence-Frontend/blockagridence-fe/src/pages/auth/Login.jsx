import { useState } from 'react';
import './Login.css';

export default function Login({ onLogin, onConsumerScan }) {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
  };

  const handleMetaMaskConnect = () => {
    if (onLogin) onLogin();
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h3>{isLoginView ? 'Đăng nhập Hệ thống' : 'Đăng ký Tài khoản'}</h3>
        <p>Truy cập nền tảng truy xuất nguồn gốc nông sản</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLoginView && (
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ và tên" required />
          </div>
        )}
        <div className="form-group">
          <label>Email hoặc Số điện thoại</label>
          <input type="text" placeholder="Nhập email hoặc số điện thoại" required />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" required />
        </div>
        
        {isLoginView && (
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>
        )}

        <button type="submit" className="btn-primary">
          {isLoginView ? 'Đăng nhập' : 'Đăng ký'}
        </button>
      </form>

      <div className="divider">
        <span>HOẶC</span>
      </div>

      <button className="btn-metamask" onClick={handleMetaMaskConnect} type="button">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
          alt="MetaMask" 
          width="24" 
          height="24"
        />
        Liên kết Ví MetaMask 
        <span className="tooltip-text">(Định danh Smart Contract)</span>
      </button>

      <button className="btn-consumer-scan" onClick={onConsumerScan} type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <rect x="7" y="7" width="3" height="3"></rect>
          <rect x="14" y="7" width="3" height="3"></rect>
          <rect x="7" y="14" width="3" height="3"></rect>
          <rect x="14" y="14" width="3" height="3"></rect>
        </svg>
        Mô phỏng Quét QR (Người Tiêu Dùng)
      </button>

      <div className="auth-footer">
        {isLoginView ? (
          <p>Chưa có tài khoản? <button className="btn-link" onClick={() => setIsLoginView(false)}>Đăng ký ngay</button></p>
        ) : (
          <p>Đã có tài khoản? <button className="btn-link" onClick={() => setIsLoginView(true)}>Đăng nhập</button></p>
        )}
      </div>
    </div>
  );
}
