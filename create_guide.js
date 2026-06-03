const PptxGenJs = require('pptxgenjs');

const pres = new PptxGenJs();

const mainColor = '#8B5A00';
const accentColor = '#D4A574';
const darkColor = '#2C2C2C';
const lightBg = '#F5F5F0';

// Slide 1: Title
let slide = pres.addSlide();
slide.background = { color: mainColor };
slide.addText('Guide for Website', {
  x: 0.5, y: 2.5, w: 9, h: 1,
  fontSize: 48, bold: true, color: '#FFFFFF',
  align: 'center', fontFace: 'Arial'
});
slide.addText('Tova Art Catalog', {
  x: 0.5, y: 3.7, w: 9, h: 0.8,
  fontSize: 32, color: accentColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('Welcome!', {
  x: 0.5, y: 5.2, w: 9, h: 0.6,
  fontSize: 28, color: '#FFFFFF',
  align: 'center', fontFace: 'Arial'
});

// Slide 2: Step 1
slide = pres.addSlide();
slide.background = { color: lightBg };
slide.addText('Step 1 - Login', {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 36, bold: true, color: mainColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('Go to: https://tova-production-7028.up.railway.app/admin', {
  x: 0.5, y: 1.5, w: 9, h: 0.5,
  fontSize: 14, color: darkColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('Password: Tov@202!', {
  x: 0.5, y: 2.2, w: 9, h: 0.5,
  fontSize: 14, color: darkColor,
  align: 'center', fontFace: 'Arial'
});

// Slide 3: Buttons
slide = pres.addSlide();
slide.background = { color: lightBg };
slide.addText('Dashboard Buttons', {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 36, bold: true, color: mainColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('Manage Paintings - Add new paintings', {
  x: 1, y: 1.5, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Manage Categories - Organize paintings', {
  x: 1, y: 2.1, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Orders - View customer orders', {
  x: 1, y: 2.7, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Settings - Change email', {
  x: 1, y: 3.3, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('View Catalog - Preview website', {
  x: 1, y: 3.9, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});

// Slide 4: Add Painting
slide = pres.addSlide();
slide.background = { color: lightBg };
slide.addText('Step 2 - Add a Painting', {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 36, bold: true, color: mainColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('1. Click "Manage Paintings"', {
  x: 1, y: 1.5, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('2. Click "Add New Painting"', {
  x: 1, y: 2, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('3. Fill in: Name, Description, Price, Size, Medium, Year, Category, Image', {
  x: 1, y: 2.5, w: 8, h: 0.8,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('4. Click "Save"', {
  x: 1, y: 3.5, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});

// Slide 5: Tips
slide = pres.addSlide();
slide.background = { color: lightBg };
slide.addText('Tips for Success', {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 36, bold: true, color: mainColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('Use clear, well-lit photos', {
  x: 1, y: 1.5, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Write good descriptions about each painting', {
  x: 1, y: 2.1, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Update regularly with new paintings', {
  x: 1, y: 2.7, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Set reasonable prices', {
  x: 1, y: 3.3, w: 8, h: 0.4,
  fontSize: 14, color: darkColor,
  align: 'left', fontFace: 'Arial'
});

// Slide 6: Help
slide = pres.addSlide();
slide.background = { color: lightBg };
slide.addText('Troubleshooting', {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 36, bold: true, color: mainColor,
  align: 'center', fontFace: 'Arial'
});
slide.addText('Wrong password? Use: Tov@202!', {
  x: 1, y: 1.5, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Image not showing? Use JPG or PNG format', {
  x: 1, y: 2.1, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('New painting not visible? Wait and refresh (F5)', {
  x: 1, y: 2.7, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});
slide.addText('Buttons not working? Try a different browser', {
  x: 1, y: 3.3, w: 8, h: 0.4,
  fontSize: 13, color: darkColor,
  align: 'left', fontFace: 'Arial'
});

// Slide 7: Done
slide = pres.addSlide();
slide.background = { color: mainColor };
slide.addText('You are ready!', {
  x: 0.5, y: 2.5, w: 9, h: 1,
  fontSize: 44, bold: true, color: '#FFFFFF',
  align: 'center', fontFace: 'Arial'
});
slide.addText('Good luck with your art website!', {
  x: 0.5, y: 4, w: 9, h: 0.8,
  fontSize: 20, color: accentColor,
  align: 'center', fontFace: 'Arial'
});

pres.writeFile({ fileName: '/tmp/tova_guide.pptx' });
console.log('Success!');
