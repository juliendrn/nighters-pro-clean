#!/usr/bin/env node

/**
 * Script pour télécharger les vidéos Instagram/TikTok
 * 
 * Installation des dépendances :
 * npm install yt-dlp
 * 
 * Usage :
 * node scripts/download-videos.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration des vidéos à télécharger
const videos = [
  {
    url: "https://www.instagram.com/reel/DQKebzgiOj2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    filename: "demo-instagram-1.mp4",
    type: "instagram"
  },
  {
    url: "https://www.instagram.com/reel/C_vp0gPo6ci/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    filename: "demo-instagram-2.mp4", 
    type: "instagram"
  },
  {
    url: "https://www.tiktok.com/@nighters.app/video/7559321778099703062",
    filename: "demo-tiktok-1.mp4",
    type: "tiktok"
  }
];

const outputDir = path.join(__dirname, '../public/videos');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎬 Téléchargement des vidéos...\n');

videos.forEach((video, index) => {
  try {
    console.log(`📥 Téléchargement ${index + 1}/${videos.length}: ${video.filename}`);
    
    const outputPath = path.join(outputDir, video.filename);
    
    // Commande yt-dlp pour télécharger
    const command = `yt-dlp -f "best[height<=720]" -o "${outputPath}" "${video.url}"`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log(`✅ ${video.filename} téléchargé avec succès\n`);
    
  } catch (error) {
    console.error(`❌ Erreur lors du téléchargement de ${video.filename}:`, error.message);
    console.log(`💡 Alternative: Téléchargez manuellement depuis ${video.url}\n`);
  }
});

console.log('🎉 Téléchargement terminé !');
console.log('📁 Vidéos disponibles dans: public/videos/');
console.log('\n💡 Si certaines vidéos n\'ont pas pu être téléchargées, vous pouvez:');
console.log('   1. Les télécharger manuellement depuis les liens');
console.log('   2. Les convertir au format MP4');
console.log('   3. Les placer dans le dossier public/videos/');
