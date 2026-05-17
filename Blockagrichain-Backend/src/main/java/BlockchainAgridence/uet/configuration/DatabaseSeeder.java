package BlockchainAgridence.uet.configuration;

import BlockchainAgridence.uet.modules.identity.entity.*;
import BlockchainAgridence.uet.modules.identity.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final PermissionRepository permissionRepository;
    private final RoleRepository roleRepository;
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Đang kiểm tra và khởi tạo dữ liệu mẫu (Seeding)...");

        // 1. SEED PERMISSIONS (Quyền hạn hạt nhân)
        if (permissionRepository.count() == 0) {
            log.info("Đang tạo danh sách Permissions...");
            List<Permission> permissions = Arrays.asList(
                    // Nhóm quyền hệ thống
                    createPermission("SYSTEM_ORG_VIEW_ALL", "Xem toàn bộ tổ chức", "SYSTEM"),
                    createPermission("SYSTEM_ORG_MANAGE_STATUS", "Duyệt/Khóa tổ chức", "SYSTEM"),
                    createPermission("SYSTEM_PERMISSION_VIEW", "Xem danh sách quyền", "SYSTEM"),

                    // Nhóm quyền tổ chức & nhân sự nội bộ
                    createPermission("ORG_UPDATE", "Cập nhật hồ sơ tổ chức", "IDENTITY"),
                    createPermission("USER_CREATE", "Tạo nhân viên mới", "IDENTITY"),
                    createPermission("USER_VIEW", "Xem danh sách nhân viên", "IDENTITY"),
                    createPermission("USER_ASSIGN_ROLE", "Gán vai trò cho nhân viên", "IDENTITY"),
                    createPermission("USER_DELETE", "Vô hiệu hóa nhân viên", "IDENTITY"),
                    createPermission("ROLE_VIEW", "Xem danh sách chức danh", "IDENTITY"),

                    // Nhóm quyền truy xuất nguồn gốc (Chuẩn bị cho tương lai)
                    createPermission("BATCH_CREATE", "Tạo lô hàng mới lên Blockchain", "TRACEABILITY"),
                    createPermission("BATCH_APPROVE", "Duyệt lô hàng", "TRACEABILITY")
            );
            permissionRepository.saveAll(permissions);
        }

        // 2. SEED ROLES (Chức danh)
        if (roleRepository.count() == 0) {
            log.info("Đang tạo danh sách Roles...");
            List<Permission> allPerms = permissionRepository.findAll();

            // Role 1: SYSTEM_ADMIN (Cầm full quyền)
            Role systemAdmin = createRole("SYSTEM_ADMIN", "Quản trị viên Hệ thống", "Quyền lực tối cao");
            systemAdmin.setPermissions(new HashSet<>(allPerms));

            // Role 2: ORG_ADMIN (Chỉ cầm quyền nội bộ doanh nghiệp)
            Role orgAdmin = createRole("ORG_ADMIN", "Quản trị viên Tổ chức", "Chủ HTX/Doanh nghiệp");
            Set<Permission> orgAdminPerms = new HashSet<>();
            allPerms.forEach(p -> {
                if (p.getModule().equals("IDENTITY") || p.getModule().equals("TRACEABILITY")) {
                    orgAdminPerms.add(p);
                }
            });
            orgAdmin.setPermissions(orgAdminPerms);

            // Role 3: WAREHOUSE_STAFF (Nhân viên kho - Chỉ tạo lô hàng, không quản lý nhân sự)
            Role warehouseStaff = createRole("WAREHOUSE_STAFF", "Nhân viên Kho", "Thao tác xuất nhập kho");
            Set<Permission> staffPerms = new HashSet<>();
            allPerms.forEach(p -> {
                if (p.getCode().equals("BATCH_CREATE")) staffPerms.add(p);
            });
            warehouseStaff.setPermissions(staffPerms);

            roleRepository.saveAll(Arrays.asList(systemAdmin, orgAdmin, warehouseStaff));
        }

        // 3. SEED TỔ CHỨC CHỦ QUẢN (Platform as a Tenant)
        if (organizationRepository.count() == 0) {
            log.info("Đang tạo Tổ chức quản trị nền tảng Blockagrichain...");
            Organization rootOrg = Organization.builder()
                    .orgWalletAddress("0x0000000000000000000000000000000000000000") // Ví tổng
                    .name("Ban Quản Trị Hệ Thống")
                    .orgType(OrgType.SYSTEM_ADMIN)
                    .status(OrgStatus.VERIFIED)
                    .reputationScore(100)
                    .build();
            organizationRepository.save(rootOrg);

            // 4. SEED TÀI KHOẢN ADMIN TỐI CAO
            log.info("Đang tạo tài khoản System Admin...");
            Role sysAdminRole = roleRepository.findByCode("SYSTEM_ADMIN").orElseThrow();

            User rootAdmin = User.builder()
                    .orgId(rootOrg.getId())
                    .email("admin@blockagrichain.com") // <--- Dùng email này để test Login
                    .passwordHash(passwordEncoder.encode("Admin@123")) // <--- Pass: Admin@123
                    .fullName("Super Admin")
                    .roles(new HashSet<>(Set.of(sysAdminRole)))
                    .build();
            userRepository.save(rootAdmin);

            log.info("=== SEEDING DỮ LIỆU THÀNH CÔNG ===");
        }
    }

    // Các hàm helper hỗ trợ tạo object nhanh
    private Permission createPermission(String code, String name, String module) {
        return Permission.builder().code(code).name(name).module(module).build();
    }

    private Role createRole(String code, String name, String description) {
        return Role.builder().code(code).name(name).description(description).build();
    }
}