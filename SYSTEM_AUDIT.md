# System Audit: Jason Benjamin Portfolio

## 1. Executive Summary
This application is a live demonstration of simple tools built for schools. It is designed to bridge the gap between complex technology and everyday classroom needs. The primary audience is parents, teachers, and school leaders who value clear, working solutions over technical hype.

## 2. Positioning & Identity
- **Role**: Teacher & Builder (Transitioned from 10 years in the classroom).
- **Core Philosophy**: "Human-First." Every tool must solve a friction point identifiable by a non-technical user.
- **Design Language**: "Alpine Minimalism." High-contrast, focused, and free of clutter to allow the tools to speak for themselves.

## 3. Feature Audit
### A. The Idea Explorer (`InteractiveDemo.tsx`)
- **Function**: A conceptual bridge. It converts plain-English problems into three concrete "Helper" ideas.
- **AI Logic**: Uses `gemini-3-flash-preview` with a JSON schema to provide structured, predictable results without technical jargon.
- **Status**: Active and optimized for low-latency ideation.

### B. Chat Helper (`AIChat.tsx`)
- **Function**: A concierge that answers questions about the tools and Jason's history in Korea.
- **Tone**: Friendly, calm, and professional. Strictly limited to 2-sentence responses to ensure clarity.
- **Constraint**: Prohibited from using engineering terminology.

## 4. Technical Architecture
- **Framework**: React 19 (ESM-only for performance).
- **Styling**: Tailwind CSS for a lean, utility-first UI.
- **Intelligence**: Google Gemini API integration using high-reasoning tokens for creative "Helper" generation.

## 5. Potential Improvements (For ChatGPT Analysis)
1. **Interactive Previews**: Currently, "Launch App" links to external demos. Integrating a small "Live Sandbox" for one tool could increase trust.
2. **Contextual Awareness**: The Chat Helper could be updated to know which section of the page the user is currently viewing.
3. **Localisation**: Given the Seoul, Korea background, a toggle for simple Korean translations would reinforce the "Chekki AI" project story.
