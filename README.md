# TAKUNDA - 3D Portfolio Website

A stunning, photorealistic 3D portfolio website built with Next.js 15, Three.js, and GSAP. Features a scroll-linked rotating mud hut model with premium dark theme design.

## Features

- **3D Mud Hut Centerpiece**: Photorealistic 3D model that rotates 360° as you scroll
- **HDRI Lighting**: Premium studio lighting using Poly Haven's "Studio Small 08" HDRI
- **Dark Theme**: Modern dark design (#0F0F0F) with glassmorphism effects
- **Scroll-Linked Animations**: Smooth GSAP ScrollTrigger-powered transitions
- **4 Interactive Sections**:
  - **0° (Front)**: Foundation/About - Bio, skills, and stats
  - **90°**: Portfolio - Featured projects with hover effects
  - **180°**: Services - Service offerings with icons
  - **270°**: Contact - Form and profile with social links
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Performance Optimized**: Fast loading, optimized assets, smooth 60fps animations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **3D**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP with ScrollTrigger
- **Styling**: Tailwind CSS
- **UI/UX**: Glassmorphism, micro-interactions, parallax effects

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Your 3D model at `public/models/mud_hut.glb`
- HDRI file at `public/hdri/studio_small_08_4k.exr`
- Profile image at `public/images/image.jpg`

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Make sure your assets are in place:
   - `public/models/mud_hut.glb` - Your 3D mud hut model
   - `public/hdri/studio_small_08_4k.exr` - Studio HDRI for lighting
   - `public/images/image.jpg` - Your profile/contact photo

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and utilities
├── components/
│   ├── MudHutScene.tsx     # 3D scene with mud hut model
│   ├── ScrollContext.tsx   # Scroll progress management
│   ├── ScrollProgress.tsx  # Visual scroll indicator
│   ├── LoadingScreen.tsx   # Initial loading animation
│   └── sections/
│       ├── FoundationSection.tsx  # About/Foundation (0°)
│       ├── PortfolioSection.tsx   # Portfolio/Work (90°)
│       ├── ServicesSection.tsx    # Services (180°)
│       └── ContactSection.tsx     # Contact (270°)
├── public/
│   ├── models/
│   │   └── mud_hut.glb
│   ├── hdri/
│   │   └── studio_small_08_4k.exr
│   └── images/
│       └── image.jpg
└── ...config files
\`\`\`

## Customization Guide

### Update Content

#### Foundation Section
Edit \`components/sections/FoundationSection.tsx\`:
- Bio text
- Years of experience
- Number of projects
- Skills array

#### Portfolio Section
Edit \`components/sections/PortfolioSection.tsx\`:
- Add/remove projects in the \`projects\` array
- Update project titles, descriptions, and tech stacks

#### Services Section
Edit \`components/sections/ServicesSection.tsx\`:
- Modify the \`services\` array
- Update icons, titles, descriptions, and features

#### Contact Section
Edit \`components/sections/ContactSection.tsx\`:
- Update social links in the \`socialLinks\` array
- Customize form fields
- Update email/contact information

### Styling

#### Colors
Edit \`tailwind.config.js\` to change accent colors:
\`\`\`javascript
colors: {
  dark: {
    bg: '#0F0F0F',    // Main background
    card: '#181818',  // Card backgrounds
  },
  accent: {
    gold: '#D4AF37',  // Primary accent
    cyan: '#00D9FF',  // Secondary accent
  },
}
\`\`\`

#### Typography
Change font in \`app/globals.css\`:
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800&display=swap');
\`\`\`

### 3D Scene

#### Adjust Model
Edit \`components/MudHutScene.tsx\`:
- Change \`scale\` to resize the model
- Adjust \`position\` to reposition it
- Modify camera \`position\` and \`fov\` for different angles

#### Lighting
Modify lighting in \`SceneLighting\` component:
- Adjust \`intensity\` values
- Change light colors
- Add/remove lights

## Performance Tips

1. **Optimize 3D Model**: Keep polygon count under 10K for best performance
2. **Image Optimization**: Use WebP format for images, compress your profile photo
3. **HDRI Size**: The 4K HDRI is optimal. Avoid going larger unless necessary
4. **Lazy Loading**: The 3D scene is dynamically imported to improve initial load

## Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables

No environment variables required for basic setup. Add them as needed for:
- Form submission endpoints
- Analytics
- CMS integration

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### 3D Model Not Loading
- Verify the file path: \`public/models/mud_hut.glb\`
- Check the browser console for errors
- Ensure the GLB file is valid (test in https://gltf-viewer.donmccurdy.com/)

### HDRI Not Working
- Confirm the file is at \`public/hdri/studio_small_08_4k.exr\`
- EXR format is required for proper HDR lighting
- File size should be reasonable (<50MB)

### Scroll Animation Not Smooth
- Check if GSAP is properly installed
- Ensure ScrollTrigger plugin is registered
- Try adjusting \`scrub\` value in \`ScrollContext.tsx\`

### Image Not Displaying
- Verify \`public/images/image.jpg\` exists
- Check image format (JPG, PNG, WebP supported)
- Ensure Next.js Image component can access the file

## License

This project is open source and available under the MIT License.

## Credits

- **HDRI**: Poly Haven - Studio Small 08
- **Framework**: Next.js by Vercel
- **3D Library**: Three.js and React Three Fiber
- **Animations**: GSAP by GreenSock

---

Built with ❤️ by TAKUNDA
