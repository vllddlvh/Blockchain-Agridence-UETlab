const { expect } = require("chai");
const { ethers } = require("hardhat");
const crypto = require("crypto");

describe("HashStorage", function () {
  let hashStorage;

  beforeEach(async function () {
    const HashStorage = await ethers.getContractFactory("HashStorage");
    hashStorage = await HashStorage.deploy();
    await hashStorage.waitForDeployment();
  });

  // Test 1: storeHash() ghi đúng hash
  it("should store a hash correctly via storeHash()", async function () {
    const hash = "abc123deadbeef";
    await hashStorage.storeHash(hash);
    const stored = await hashStorage.getHash(0);
    expect(stored).to.equal(hash);
  });

  // Test 2: getHash() trả về đúng hash đã lưu
  it("should return the correct hash via getHash()", async function () {
    const hash = "9f86d081884c7d659a2feaa0c55ad015";
    await hashStorage.storeHash(hash);
    const result = await hashStorage.getHash(0);
    expect(result).to.equal(hash);
  });

  // Test 3: nhiều hash được lưu đúng thứ tự
  it("should store multiple hashes at correct indexes", async function () {
    const hashes = ["hash_alpha", "hash_beta", "hash_gamma"];

    for (const h of hashes) {
      await hashStorage.storeHash(h);
    }

    for (let i = 0; i < hashes.length; i++) {
      const stored = await hashStorage.getHash(i);
      expect(stored).to.equal(hashes[i]);
    }
  });

  // Test 4: luồng đầy đủ SHA-256 → store → verify
  it("should verify SHA-256 hash integrity end-to-end", async function () {
    const product = {
      name: "Rau cải Đà Lạt",
      harvestDate: "2026-05-14",
    };

    const json = JSON.stringify(product);
    const originalHash = crypto
      .createHash("sha256")
      .update(json)
      .digest("hex");

    const tx = await hashStorage.storeHash(originalHash);
    await tx.wait();

    const storedHash = await hashStorage.getHash(0);

    expect(storedHash).to.equal(originalHash);
  });
});
