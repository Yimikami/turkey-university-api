#!/usr/bin/env node

/**
 * Türkiye Üniversiteleri API Kurulum Script'i
 * 
 * Bu script, projenin backend ve frontend bileşenleri için gerekli bağımlılıkları kurar.
 * Bun paket yöneticisini kullanır.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Renkli konsol çıktıları için
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Ana dizin
const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

/**
 * Komut çalıştırma fonksiyonu
 * @param {string} command - Çalıştırılacak komut
 * @param {string} cwd - Çalışma dizini
 * @param {string} errorMessage - Hata durumunda gösterilecek mesaj
 */
function runCommand(command, cwd, errorMessage) {
  try {
    console.log(`${colors.cyan}Çalıştırılıyor: ${colors.bright}${command}${colors.reset}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}${errorMessage}${colors.reset}`);
    console.error(`${colors.red}Hata: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Bun'ın yüklü olup olmadığını kontrol eder
 */
function checkBun() {
  try {
    execSync('bun --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Ana kurulum fonksiyonu
 */
async function setup() {
  console.log(`\n${colors.bright}${colors.cyan}=== Türkiye Üniversiteleri API Kurulum ====${colors.reset}\n`);
  
  // Bun kontrolü
  if (!checkBun()) {
    console.log(`${colors.yellow}Bun paket yöneticisi bulunamadı. Kurulum için: https://bun.sh${colors.reset}`);
    console.log(`${colors.yellow}Alternatif olarak npm kullanılacak.${colors.reset}\n`);
    var packageManager = 'npm';
  } else {
    console.log(`${colors.green}Bun paket yöneticisi bulundu.${colors.reset}\n`);
    var packageManager = 'bun';
  }

  // Backend bağımlılıklarını kurma
  console.log(`\n${colors.bright}${colors.cyan}Backend bağımlılıkları kuruluyor...${colors.reset}\n`);
  
  if (!fs.existsSync(backendDir)) {
    console.error(`${colors.red}Backend dizini bulunamadı: ${backendDir}${colors.reset}`);
    return;
  }
  
  const backendSuccess = runCommand(
    `${packageManager} install`, 
    backendDir, 
    'Backend bağımlılıkları kurulurken bir hata oluştu.'
  );
  
  if (!backendSuccess) {
    console.log(`${colors.yellow}Backend kurulumu tamamlanamadı. Lütfen manuel olarak kurmayı deneyin.${colors.reset}`);
  } else {
    console.log(`${colors.green}Backend bağımlılıkları başarıyla kuruldu.${colors.reset}`);
  }

  // Frontend bağımlılıklarını kurma
  console.log(`\n${colors.bright}${colors.cyan}Frontend bağımlılıkları kuruluyor...${colors.reset}\n`);
  
  if (!fs.existsSync(frontendDir)) {
    console.error(`${colors.red}Frontend dizini bulunamadı: ${frontendDir}${colors.reset}`);
    return;
  }
  
  const frontendSuccess = runCommand(
    `${packageManager} install`, 
    frontendDir, 
    'Frontend bağımlılıkları kurulurken bir hata oluştu.'
  );
  
  if (!frontendSuccess) {
    console.log(`${colors.yellow}Frontend kurulumu tamamlanamadı. Lütfen manuel olarak kurmayı deneyin.${colors.reset}`);
  } else {
    console.log(`${colors.green}Frontend bağımlılıkları başarıyla kuruldu.${colors.reset}`);
  }

  // Kurulum sonucu
  if (backendSuccess && frontendSuccess) {
    console.log(`\n${colors.bright}${colors.green}Kurulum başarıyla tamamlandı!${colors.reset}`);
    console.log(`\n${colors.cyan}Uygulamayı başlatmak için: ${colors.bright}node start.js${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}Kurulum kısmen tamamlandı. Lütfen hataları kontrol edin.${colors.reset}`);
  }
}

// Kurulumu başlat
setup().catch(error => {
  console.error(`${colors.red}Beklenmeyen bir hata oluştu: ${error.message}${colors.reset}`);
});
