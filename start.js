#!/usr/bin/env node

/**
 * Türkiye Üniversiteleri API Başlatma Script'i
 *
 * Bu script, backend ve frontend sunucularını aynı anda başlatır.
 * Backend için Bun, frontend için Vite kullanılır.
 * Ayrıca frontend uygulamasını varsayılan tarayıcıda otomatik olarak açar.
 */

const { spawn, exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

// Renkli konsol çıktıları için
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

// Ana dizin
const rootDir = __dirname;
const backendDir = path.join(rootDir, "backend");
const frontendDir = path.join(rootDir, "frontend");

// Bun'ın yüklü olup olmadığını kontrol eder
function checkBun() {
  try {
    require("child_process").execSync("bun --version", { stdio: "pipe" });
    return true;
  } catch (error) {
    return false;
  }
}

// Sunucuları başlat
function startServers() {
  console.log(
    `\n${colors.bright}${colors.cyan}=== Türkiye Üniversiteleri API Başlatılıyor ====${colors.reset}\n`
  );

  // Dizinlerin varlığını kontrol et
  if (!fs.existsSync(backendDir)) {
    console.error(
      `${colors.red}Backend dizini bulunamadı: ${backendDir}${colors.reset}`
    );
    return;
  }

  if (!fs.existsSync(frontendDir)) {
    console.error(
      `${colors.red}Frontend dizini bulunamadı: ${frontendDir}${colors.reset}`
    );
    return;
  }

  // Bun kontrolü
  const hasBun = checkBun();
  const backendCommand = hasBun ? "bun" : "node";

  // Backend sunucusunu başlat
  console.log(`${colors.cyan}Backend sunucusu başlatılıyor...${colors.reset}`);
  const backendProcess = spawn(backendCommand, ["index.ts"], {
    cwd: backendDir,
    shell: true,
    stdio: "pipe",
  });

  backendProcess.stdout.on("data", (data) => {
    console.log(
      `${colors.blue}[Backend] ${colors.reset}${data.toString().trim()}`
    );
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(
      `${colors.red}[Backend Hata] ${colors.reset}${data.toString().trim()}`
    );
  });

  backendProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(
        `${colors.red}Backend sunucusu kapandı, çıkış kodu: ${code}${colors.reset}`
      );
    } else {
      console.log(`${colors.yellow}Backend sunucusu kapandı${colors.reset}`);
    }
  });

  // Frontend sunucusunu başlat
  console.log(`${colors.cyan}Frontend sunucusu başlatılıyor...${colors.reset}`);
  const frontendProcess = spawn("npm", ["run", "dev"], {
    cwd: frontendDir,
    shell: true,
    stdio: "pipe",
  });

  frontendProcess.stdout.on("data", (data) => {
    console.log(
      `${colors.magenta}[Frontend] ${colors.reset}${data.toString().trim()}`
    );
  });

  frontendProcess.stderr.on("data", (data) => {
    console.error(
      `${colors.red}[Frontend Hata] ${colors.reset}${data.toString().trim()}`
    );
  });

  frontendProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(
        `${colors.red}Frontend sunucusu kapandı, çıkış kodu: ${code}${colors.reset}`
      );
    } else {
      console.log(`${colors.yellow}Frontend sunucusu kapandı${colors.reset}`);
    }
  });

  console.log(`\n${colors.green}Sunucular başlatıldı!${colors.reset}`);
  console.log(
    `${colors.cyan}Backend: ${colors.bright}http://localhost:3000${colors.reset}`
  );
  console.log(
    `${colors.magenta}Frontend: ${colors.bright}http://localhost:5173${colors.reset}`
  );

  // Tarayıcıyı aç
  setTimeout(() => {
    const frontendUrl = "http://localhost:5173";
    console.log(
      `\n${colors.green}Tarayıcı açılıyor: ${colors.bright}${frontendUrl}${colors.reset}`
    );

    // İşletim sistemine göre tarayıcı açma komutu
    let command;
    switch (os.platform()) {
      case "win32":
        command = `start ${frontendUrl}`;
        break;
      case "darwin": // macOS
        command = `open ${frontendUrl}`;
        break;
      default: // Linux ve diğerleri
        command = `xdg-open ${frontendUrl}`;
    }

    // Tarayıcıyı aç
    exec(command, (error) => {
      if (error) {
        console.log(
          `${colors.yellow}Tarayıcı otomatik açılamadı. Lütfen manuel olarak açın: ${colors.bright}${frontendUrl}${colors.reset}`
        );
      }
    });
  }, 3000); // Frontend sunucusunun başlaması için 3 saniye bekle

  // Çıkış işleyicisi
  process.on("SIGINT", () => {
    console.log(`\n${colors.yellow}Sunucular kapatılıyor...${colors.reset}`);
    backendProcess.kill();
    frontendProcess.kill();
    process.exit(0);
  });
}

// Sunucuları başlat
startServers();
