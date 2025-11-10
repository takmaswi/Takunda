# Quick Start Guide

Your Next.js 15+ portfolio with 3D mud hut is ready! 🎉

## ⚡ Next Steps

### 1. Add Your Assets

Place these files in the correct locations:

```
public/
├── models/
│   └── mud_hut.glb          ← Your 3D mud hut model
├── hdri/
│   └── studio_small_08_4k.exr  ← Download from polyhaven.com/a/studio_small_08
└── images/
    └── image.jpg            ← Your profile photo
```

**HDRI Download**: Get the Studio Small 08 HDRI (4K EXR format) from:
https://polyhaven.com/a/studio_small_08

### 2. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Customize Content

#### Update Your Info

**Foundation Section** (`components/sections/FoundationSection.tsx`):
- Line 31-41: Update bio text
- Line 45-54: Modify stats (years, projects)
- Line 59-61: Customize skills

**Portfolio Section** (`components/sections/PortfolioSection.tsx`):
- Line 6-37: Edit the `projects` array with your work

**Services Section** (`components/sections/ServicesSection.tsx`):
- Line 6-54: Update the `services` array

**Contact Section** (`components/sections/ContactSection.tsx`):
- Line 8-13: Update social links
- Line 51-86: Customize form behavior

#### Colors & Theme

Edit `app/globals.css` lines 4-9:
```css
@theme {
  --color-dark-bg: #0F0F0F;      /* Main background */
  --color-dark-card: #181818;    /* Card background */
  --color-accent-gold: #D4AF37;  /* Primary accent */
  --color-accent-cyan: #00D9FF;  /* Secondary accent */
}
```

### 4. Test on Mobile

The site is fully responsive! Test it on different devices:
- Desktop: Full scroll-linked 3D rotation
- Tablet: Touch-optimized with snap points
- Mobile: Optimized layout with large touch targets

## 🎯 How It Works

1. **Scroll to Rotate**: As you scroll down, the mud hut rotates 360°
2. **4 Sections**: Each 90° rotation reveals a new section:
   - 0° → Foundation (About)
   - 90° → Portfolio (Work)
   - 180° → Services
   - 270° → Contact

3. **Animations**: GSAP ScrollTrigger powers smooth transitions
4. **3D Lighting**: HDRI provides photorealistic lighting
5. **Dark Theme**: Premium glassmorphism design

## 🚀 Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 🐛 Troubleshooting

### 3D Model Not Showing?
- Verify file path: `public/models/mud_hut.glb`
- Check browser console for errors
- Test your GLB at: https://gltf-viewer.donmccurdy.com/

### HDRI Not Working?
- Confirm file: `public/hdri/studio_small_08_4k.exr`
- Must be EXR format (not JPG or PNG)
- Download from Poly Haven (link above)

### Image Not Displaying?
- Check file: `public/images/image.jpg`
- Supported formats: JPG, PNG, WebP
- Recommended: Square format, 512x512px+

### Animations Laggy?
- Reduce 3D model polygon count (aim for <10K)
- Compress HDRI if file is too large
- Check browser performance in DevTools

## 📝 Next.js Version Note

This project was built with Next.js 16.0.1 (latest version installed automatically).
All features work perfectly with Turbopack for faster builds!

## 🎨 Customization Tips

1. **Change Font**: Edit line 1 in `app/globals.css`
2. **Adjust 3D Model Size**: Edit `scale` in `components/MudHutScene.tsx:30`
3. **Modify Rotation Speed**: Edit `scrub` value in `components/ScrollContext.tsx:25`
4. **Update Metadata**: Edit `app/layout.tsx:6-8`

## 📚 Documentation

See [README.md](./README.md) for comprehensive documentation.

---

Built with Next.js, Three.js, GSAP & Tailwind CSS
