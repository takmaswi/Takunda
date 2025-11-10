# Deployment Checklist

Before deploying your 3D portfolio to production, complete this checklist:

## 📋 Pre-Deployment Checklist

### Assets Ready
- [ ] `public/models/mud_hut.glb` - 3D model is optimized (<5MB, <10K polys)
- [ ] `public/hdri/studio_small_08_4k.exr` - HDRI file is present
- [ ] `public/images/image.jpg` - Profile photo is optimized (<500KB)

### Content Updated
- [ ] Updated bio and tagline in `FoundationSection.tsx`
- [ ] Added real projects in `PortfolioSection.tsx`
- [ ] Updated services in `ServicesSection.tsx`
- [ ] Added real social links in `ContactSection.tsx`
- [ ] Updated metadata in `app/layout.tsx` (title, description)

### Performance Optimization
- [ ] Tested on desktop browsers (Chrome, Firefox, Safari)
- [ ] Tested on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Checked loading time (<3 seconds)
- [ ] Verified smooth 60fps animations
- [ ] Optimized images (WebP format recommended)

### SEO & Meta
- [ ] Updated site title and description
- [ ] Added Open Graph meta tags (optional)
- [ ] Created `robots.txt` (optional)
- [ ] Added `sitemap.xml` (optional)

### Functionality
- [ ] Contact form submission works
- [ ] All social links are correct
- [ ] 3D model loads and rotates smoothly
- [ ] All sections visible on scroll
- [ ] Responsive design works on all devices

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Made by Next.js creators
- Zero configuration
- Automatic deployments
- Free SSL certificate
- CDN included

**Steps:**

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: 3D portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Deploy to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy" (it auto-detects Next.js)

3. Done! Your site will be live at `your-project.vercel.app`

**Custom Domain:**
- Add custom domain in Vercel dashboard
- Follow DNS configuration instructions

### Option 2: Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect GitHub repo

Build settings:
- Build command: `npm run build`
- Publish directory: `.next`

### Option 3: Self-Hosted (VPS/Cloud)

**Requirements:**
- Node.js 18+ installed
- PM2 for process management

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Transfer files to server:
```bash
rsync -avz . user@your-server:/path/to/app
```

3. Install PM2:
```bash
npm install -g pm2
```

4. Start the app:
```bash
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

5. Configure Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. Install SSL certificate:
```bash
sudo certbot --nginx -d yourdomain.com
```

## 🔧 Environment Variables

If you add form submission or analytics, create a `.env.local` file:

```env
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
FORM_SUBMISSION_ENDPOINT=your-api-endpoint
```

**Never commit `.env.local` to Git!** (Already in `.gitignore`)

## 📊 Post-Deployment

### Monitor Performance
- [ ] Set up Vercel Analytics (built-in)
- [ ] Add Google Analytics (optional)
- [ ] Monitor Core Web Vitals

### Test Production Build
- [ ] Test site on real devices
- [ ] Check Lighthouse scores (aim for 90+)
- [ ] Verify HTTPS is working
- [ ] Test social media previews

### Maintenance
- [ ] Set up automated dependency updates (Dependabot)
- [ ] Schedule regular content updates
- [ ] Monitor error logs

## 🎯 Performance Targets

Your site should achieve:
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🐛 Common Issues

### Model Not Loading in Production
- Ensure GLB file is committed to Git
- Check file size (<5MB recommended)
- Verify path is correct: `/models/mud_hut.glb`

### HDRI Not Working
- EXR files are large - consider hosting on CDN
- Verify file is committed to repository
- Check browser console for CORS errors

### Slow Loading
- Enable Next.js Image Optimization
- Use WebP format for images
- Reduce 3D model complexity
- Enable compression in hosting platform

## 🔒 Security

Before going live:
- [ ] No API keys in client-side code
- [ ] Form has spam protection
- [ ] Rate limiting on API routes (if any)
- [ ] Security headers configured

## 📱 Social Media Preview

Add these to `app/layout.tsx` for better social sharing:

```tsx
export const metadata = {
  title: 'TAKUNDA - Portfolio',
  description: 'Interactive 3D portfolio experience',
  openGraph: {
    title: 'TAKUNDA - Portfolio',
    description: 'Interactive 3D portfolio experience',
    url: 'https://yoursite.com',
    siteName: 'TAKUNDA Portfolio',
    images: ['/og-image.jpg'], // Create a 1200x630 preview image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAKUNDA - Portfolio',
    description: 'Interactive 3D portfolio experience',
    images: ['/og-image.jpg'],
  },
};
```

---

Good luck with your deployment! 🚀
