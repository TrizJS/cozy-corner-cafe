Cozy Corner Cafe   
*A responsive JAMstack restaurant website built with React + Vite*

Project Overview
Cozy Corner Cafe is a modern, responsive website designed for a small café.  
The project focuses on JAMstack architecture, clean UI design, performance, and secure handling of environment variables.

The site includes:
- Hero/banner section
- Feature/content sections
- Menu page
- Mobile-first responsive layout
- Deployed production build

---

Tech Stack
- **React** (Vite)
- **HTML / CSS**
- **JavaScript**
- **Netlify** (deployment)
- **GitHub** (version control)

 AI Image Generation (MCP)
This project attempted AI-generated imagery using:
- **Claude Code**
- **Model Context Protocol (MCP)**
- **nano-banana MCP server**
- **Google AI Studio (Gemini image models)**

MCP Setup Included
- `.env` file for API keys (not committed)
- `.env` added to `.gitignore`
- `.mcp.json` configured for nano-banana

---

 Image Generation Notes
AI image generation was attempted using Gemini image models via nano-banana MCP.  
During development, image generation was blocked due to:
- Gemini model availability changes
- Free-tier API quota limitations

Per assignment troubleshooting guidance, **professional fallback images** were used while documenting the AI generation attempts and MCP setup process.

All images are:
- Properly integrated into React components
- Responsive across mobile and desktop
- Optimized for layout stability and performance

---

Security
- API keys stored in `.env`
- `.env` is excluded from version control via `.gitignore`
- No secrets are exposed in the repository

An example environment file is provided for reference:
