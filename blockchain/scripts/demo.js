const hre = require("hardhat");
const crypto = require("crypto");

async function main() {
  // 1. Tạo object sản phẩm giả
  const product = {
    name: "Rau cải Đà Lạt",
    harvestDate: "2026-05-14",
  };

  // 2. Chuyển thành JSON string
  const productJson = JSON.stringify(product);

  // 3. Tạo SHA-256 hash bằng Node.js crypto
  const originalHash = crypto
    .createHash("sha256")
    .update(productJson)
    .digest("hex");

  // 4. Deploy HashStorage contract
  const HashStorage = await hre.ethers.getContractFactory("HashStorage");
  const hashStorage = await HashStorage.deploy();
  await hashStorage.waitForDeployment();
  const contractAddress = await hashStorage.getAddress();

  // 5. Gọi storeHash(hash) — ghi hash lên blockchain
  const tx = await hashStorage.storeHash(originalHash);

  // 6. Chờ transaction được confirm
  const receipt = await tx.wait();

  // 7. Đọc hash đã lưu bằng getHash(0)
  const storedHash = await hashStorage.getHash(0);

  // 8. So sánh hash gốc và hash đọc về
  const isMatch = originalHash === storedHash;

  // 9. In kết quả
  console.log("=".repeat(60));
  console.log("  BLOCKCHAIN DEMO — HashStorage");
  console.log("=".repeat(60));

  console.log("\n[1] Du lieu goc:");
  console.log(JSON.stringify(product, null, 2));

  console.log("\n[2] JSON string:");
  console.log(productJson);

  console.log("\n[3] SHA-256 Hash (goc):");
  console.log(originalHash);

  console.log("\n[4] Contract address:");
  console.log(contractAddress);

  console.log("\n[5] Transaction hash (txHash):");
  console.log(receipt.hash);

  console.log("\n[6] Hash doc tu blockchain (getHash(0)):");
  console.log(storedHash);

  console.log("\n[7] Ket qua xac minh:");
  if (isMatch) {
    console.log("  => THANH CONG: Hash khop chinh xac!");
  } else {
    console.log("  => THAT BAI: Hash khong khop!");
  }

  console.log("=".repeat(60));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
