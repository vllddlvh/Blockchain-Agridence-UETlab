package BlockchainAgridence.uet.exception;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    // --- Lỗi Hệ thống chung ---
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi hệ thống không xác định", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Thông tin cung cấp không hợp lệ", HttpStatus.BAD_REQUEST),

    // --- Lỗi liên quan đến Tổ chức (Organization) ---
    ORG_WALLET_EXISTED(1002, "Địa chỉ ví tổ chức đã được đăng ký", HttpStatus.BAD_REQUEST),
    ORG_NOT_FOUND(1004, "Không tìm thấy Tổ chức", HttpStatus.NOT_FOUND),

    // --- Lỗi liên quan đến Người dùng (User) ---
    USER_EMAIL_EXISTED(1003, "Email này đã được sử dụng", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1005, "Không tìm thấy Người dùng", HttpStatus.NOT_FOUND),

    // --- Lỗi liên quan đến Phân quyền (RBAC) ---
    ROLE_NOT_FOUND(1006, "Không tìm thấy Vai trò (Role)", HttpStatus.NOT_FOUND),
    PERMISSION_NOT_FOUND(1007, "Không tìm thấy Quyền hạn (Permission)", HttpStatus.NOT_FOUND),

    // --- Lỗi Validation (DTO) ---
    ROLE_LIST_EMPTY(1008, "Danh sách Role không được để trống", HttpStatus.BAD_REQUEST),
    WALLET_ADDRESS_BLANK(1009, "Địa chỉ ví không được để trống", HttpStatus.BAD_REQUEST),
    INVALID_WEB3_WALLET(1010, "Địa chỉ ví Web3 không hợp lệ (Phải bắt đầu bằng 0x và dài 42 ký tự)", HttpStatus.BAD_REQUEST),
    ORG_NAME_BLANK(1011, "Tên tổ chức không được để trống", HttpStatus.BAD_REQUEST),
    ORG_TYPE_NULL(1012, "Loại hình tổ chức không được để trống", HttpStatus.BAD_REQUEST),
    ADMIN_EMAIL_BLANK(1013, "Email quản trị viên không được để trống", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL_FORMAT(1014, "Định dạng email không hợp lệ", HttpStatus.BAD_REQUEST),
    ADMIN_PASSWORD_BLANK(1015, "Mật khẩu quản trị viên không được để trống", HttpStatus.BAD_REQUEST),
    ADMIN_FULLNAME_BLANK(1016, "Họ tên quản trị viên không được để trống", HttpStatus.BAD_REQUEST),
    ROLE_CODE_BLANK(1017, "Mã role không được để trống", HttpStatus.BAD_REQUEST),
    ROLE_NAME_BLANK(1018, "Tên role không được để trống", HttpStatus.BAD_REQUEST),
    PERMISSION_LIST_EMPTY(1019, "Danh sách quyền (permissions) không được để trống", HttpStatus.BAD_REQUEST),
    EMAIL_BLANK(1020, "Email không được để trống", HttpStatus.BAD_REQUEST),
    PASSWORD_BLANK(1021, "Mật khẩu không được để trống", HttpStatus.BAD_REQUEST),
    FULLNAME_BLANK(1022, "Họ tên không được để trống", HttpStatus.BAD_REQUEST),
    METHOD_NOT_ALLOWED(1023, "Phương thức HTTP không được hỗ trợ", HttpStatus.METHOD_NOT_ALLOWED),
    UNAUTHENTICATED(1024, "Không có quyền truy cập (Unauthenticated)", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED_ACCESS(1025, "Bạn không có quyền thực hiện thao tác này", HttpStatus.FORBIDDEN),
    INVALID_JSON_REQUEST(1026, "Định dạng JSON gửi lên không hợp lệ", HttpStatus.BAD_REQUEST);
    int code;
    String message;
    HttpStatusCode statusCode;
}
