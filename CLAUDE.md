# Cozy Corner Cafe - Project Instructions

## Image Generation (nano-banana MCP Server)

Generate professional mockup images for each section of the Cozy Corner Cafe site using the nano-banana MCP server tools. The API key is stored in `.env` as `NANO_BANANA_API_KEY`.

### Setup (Local Installation)
- nano-banana is installed locally at `mcp/node_modules/nano-banana-mcp/`
- `.mcp.json` runs it via `node` (not npx) so it never re-downloads
- The Gemini model is patched to `gemini-2.5-flash-image` in `mcp/node_modules/nano-banana-mcp/dist/index.js` (lines 190 and 298)
- **Do NOT run `npm install` inside `mcp/`** — it would overwrite the patched model name
- API key is read from `.env` (`NANO_BANANA_API_KEY`) and passed via `.mcp.json` env config

### Usage
1. Configure the Gemini token using `mcp__nano-banana__configure_gemini_token` with the key from `.env`
2. Use `mcp__nano-banana__generate_image` for new images
3. Use `mcp__nano-banana__edit_image` or `mcp__nano-banana__continue_editing` for refinements

### Brand Guidelines for Image Generation
- **Tone:** Warm, inviting, modern cafe aesthetic
- **Lighting:** Soft golden/amber warm lighting, Edison bulbs, natural window light
- **Color palette:** Earth tones — browns, creams, soft ambers matching CSS vars:
  - Primary: #8b5a2b (dark brown)
  - Secondary: #d4a574 (light brown/tan)
  - Accent: #f5e6d3 (cream)
- **Style:** Editorial quality photography, shallow depth of field
- **Atmosphere:** Cozy, welcoming, community-focused

### Section-Specific Image Prompts

#### Hero / Banner (index.html)
- Wide-angle cozy cafe interior with people enjoying coffee
- Warm ambient lighting, Edison bulbs, exposed brick
- Must work as a background image with text overlay
- Save to: `images/hero-cafe.png`

#### About Page (about.html)
- Cafe owner/barista portrait or team photo behind the counter
- Warm, personal, storytelling feel
- Save to: `images/about-cafe.png`

#### Menu Page (menu.html)
- Close-up styled shots of featured items (cappuccino, chai latte, cinnamon roll, avocado toast)
- Overhead or 45-degree angle, natural lighting
- Save to: `images/menu-[item-name].png`

#### Contact Page (contact.html)
- Exterior storefront shot or cozy interior reading nook
- Inviting "come visit us" feel
- Save to: `images/contact-cafe.png`

### Image Workflow
1. Generate initial image with detailed prompt
2. Review output and refine using `continue_editing` if needed
3. Save generated images to the `images/` directory
4. Reference images in HTML using relative paths: `images/filename.png`

## Tech Stack
- Static HTML/CSS site (no framework)
- Vite for local dev server
- Vanilla JavaScript for interactivity
- Semantic HTML, Flexbox/Grid layouts
- Responsive breakpoints: 768px (tablet), 480px (mobile)

## Design System
- Font: Georgia, serif
- See CSS custom properties in `:root` of styles.css
- Rounded corners (8-10px border-radius)
- Subtle box shadows for cards
