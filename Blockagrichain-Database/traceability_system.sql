-- Kích hoạt extension hỗ trợ sinh UUID tự động trong PostgreSQL
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- PHẦN 1: QUẢN LÝ ĐỊNH DANH & PHÂN QUYỀN (KYB & Maker-Checker)
-- ==========================================

-- 1. BẢNG TỔ CHỨC (Doanh nghiệp, HTX, Siêu thị - Đầu mối ký On-chain)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_wallet_address VARCHAR(42) UNIQUE NOT NULL, 
    name VARCHAR(255) NOT NULL,
    tax_code VARCHAR(50),
    
    org_type VARCHAR(50) NOT NULL,
    CONSTRAINT chk_org_type CHECK (org_type IN ('FARM', 'TRANSPORTER', 'FACTORY', 'RETAILER', 'SYSTEM_ADMIN')),
    
    status VARCHAR(50) DEFAULT 'PENDING',
    CONSTRAINT chk_org_status CHECK (status IN ('PENDING', 'VERIFIED', 'BANNED')),
    
    reputation_score INT DEFAULT 100, 

    -- Tiêu chuẩn Doanh nghiệp
    version INT DEFAULT 0, 
    is_deleted BOOLEAN DEFAULT FALSE, 
    created_by VARCHAR(255), 
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG NHÂN VIÊN (Tài khoản thao tác Web2)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id), -- Multi-tenancy
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    
    role VARCHAR(50) NOT NULL,
    CONSTRAINT chk_user_role CHECK (role IN ('ADMIN', 'MANAGER', 'WAREHOUSE_STAFF')),
    
    version INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. BẢNG LỊCH SỬ UY TÍN (Append-only Log)
CREATE TABLE reputation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) NOT NULL,
    score_change INT NOT NULL, 
    reason TEXT NOT NULL, 
    related_batch_id UUID, 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHẦN 2: LÕI TRUY XUẤT NGUỒN GỐC (Event Sourcing & JSONB)
-- ==========================================

-- 4. BẢNG LÔ HÀNG GỐC (Root Entity)
CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_code VARCHAR(100) UNIQUE NOT NULL,
    creator_org_id UUID REFERENCES organizations(id) NOT NULL,
    current_owner_org_id UUID REFERENCES organizations(id) NOT NULL, 
    
    product_type VARCHAR(50) NOT NULL,
    CONSTRAINT chk_product_type CHECK (product_type IN ('RAW_MATERIAL', 'PROCESSED_FOOD')),
    
    is_active BOOLEAN DEFAULT TRUE, 
    onchain_hash VARCHAR(255), 
    
    version INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. BẢNG SỰ KIỆN LÔ HÀNG (Lưu vết Trust but Verify)
CREATE TABLE batch_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES batches(id) NOT NULL,
    actor_user_id UUID REFERENCES users(id) NOT NULL, 
    
    event_type VARCHAR(50) NOT NULL,
    CONSTRAINT chk_event_type CHECK (event_type IN ('CREATED', 'FARMING_ACTIVITY', 'PROCESSING', 'TRANSPORTING', 'STORED_AND_VERIFIED', 'REJECTED', 'TRANSFORMED', 'SPLIT', 'MERGED'))
    
    gps_latitude DECIMAL(10, 8),
    gps_longitude DECIMAL(11, 8),
    device_info VARCHAR(255), 
    image_cids JSONB, 
    metadata JSONB, 
    onchain_event_hash VARCHAR(255),
    
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. BẢNG PHẢ HỆ LÔ HÀNG (Giải quyết gộp/tách thực phẩm)
CREATE TABLE batch_lineage (
    parent_batch_id UUID REFERENCES batches(id),
    child_batch_id UUID REFERENCES batches(id),
    
    action_type VARCHAR(50) NOT NULL,
    CONSTRAINT chk_action_type CHECK (action_type IN ('MERGE', 'SPLIT')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (parent_batch_id, child_batch_id)
);

-- ==========================================
-- PHẦN 3: XÁC THỰC & BẢO MẬT (JWT Auth Lifecycle)
-- ==========================================

-- 7. BẢNG REFRESH TOKEN (Duy trì phiên đăng nhập)
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL, 
    expiry_date TIMESTAMP NOT NULL, 
    is_revoked BOOLEAN DEFAULT FALSE, 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_ip VARCHAR(50), 
    device_info VARCHAR(255) 
);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);

-- 8. BẢNG PASSWORD RESET TOKEN (Quên mật khẩu)
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL, 
    expiry_date TIMESTAMP NOT NULL, 
    is_used BOOLEAN DEFAULT FALSE, 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);

-- ==========================================
-- PHẦN 4: MASTER DATA (Chuẩn hóa dữ liệu danh mục)
-- ==========================================

-- 9. Danh mục Loại sản phẩm (VD: Cà phê, Thịt heo, Lúa gạo)
CREATE TABLE master_product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Danh mục Đơn vị tính (VD: KG, Tấn, Thùng, Lít)
CREATE TABLE master_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Danh mục Địa chính (Tỉnh/Thành phố - Phục vụ GPS Mapping)
CREATE TABLE master_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES master_locations(id), -- Để phân cấp Tỉnh -> Huyện -> Xã
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('PROVINCE', 'DISTRICT', 'WARD')),
    is_deleted BOOLEAN DEFAULT FALSE
);

-- ==========================================
-- PHẦN 5: NOTIFICATION & WEB PUSH (Thông báo đẩy)
-- ==========================================

-- 12. Quản lý Đăng ký Web Push (Lưu Token thiết bị)
CREATE TABLE notification_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    endpoint TEXT NOT NULL, -- URL của trình duyệt (Google, Firefox, etc.)
    p256dh VARCHAR(255) NOT NULL, -- Khóa công khai của trình duyệt
    auth VARCHAR(255) NOT NULL, -- Khóa xác thực
    device_type VARCHAR(100), -- Ví dụ: Chrome on Windows
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Nội dung thông báo
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID REFERENCES users(id) NOT NULL, -- Người nhận
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    link_url TEXT, -- Link để nhấn vào xem chi tiết lô hàng
    is_read BOOLEAN DEFAULT FALSE,
    
    -- Phân loại thông báo (VD: Cảnh báo, Yêu cầu xác nhận, Hệ thống)
    type VARCHAR(50) DEFAULT 'INFO',
    CONSTRAINT chk_noti_type CHECK (type IN ('INFO', 'WARNING', 'ACTION_REQUIRED', 'SYSTEM')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. Cấu hình thông báo của người dùng (Bật/Tắt các loại thông báo)
CREATE TABLE user_notification_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    enable_push BOOLEAN DEFAULT TRUE,
    enable_email BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);