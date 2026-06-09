# Portfolio Project Compilation Specification Template

This template defines the exact schema and detail density required to compile high-fidelity case studies and portfolio listings. When preparing project briefs for other AI agents to compile, fill out this template thoroughly. Do not abbreviate or use placeholders. High architectural precision and descriptive maturity are requested.

---

## 1. EXECUTIVE METADATA

*   **Project ID**: `[lowercase-hyphenated-slug (e.g., white-label-hub)]`
*   **English Title**: `[e.g., White-Label Learning Diary Hub]`
*   **Korean Title**: `[e.g., White-Label 모바일 포트폴리오 허브]`
*   **English Tagline**: `[One concise sentence summarizing the application value and delivery architecture]`
*   **Korean Tagline**: `[한글 요약 문장]`
*   **Live Web/App URL**: `[Production URL]`
*   **Fallback Image/Asset URL**: `[Unsplash or Cloudinary hero screenshot]`

### Key Metrics & Stats

Provide exactly **3 numerical performance or efficiency markers**:

1.  **Metric 1**: `[Label (EN)]` / `[Label (KO)]` | Value: `[e.g., 15s per Student]`
2.  **Metric 2**: `[Label (EN)]` / `[Label (KO)]` | Value: `[e.g., 100% Secure]`
3.  **Metric 3**: `[Label (EN)]` / `[Label (KO)]` | Value: `[e.g., Zero Server Cost]`

---

## 2. DEEP ANALYSIS: THE CUSTOMER FRICTION VS. OPTIMIZED FLOW

### The Problem (3 bulleted pain-points)
Provide three real-world operational bottlenecks experienced by users *before* the application's intervention:
*   **Point 1**: `[Describe administrative, cognitive, or physical friction]`
*   **Point 2**: `[Describe technical blocks, mobile browser limitations, etc.]`
*   **Point 3**: `[Describe licensing, cost, or customization limitations]`

### The Solution (3 bulleted operational offsets)
Describe the direct programmatic remedy to each pain-point:
*   **Offset 1**: `[Direct user experience correction]`
*   **Offset 2**: `[Backend or cloud coordination offset]`
*   **Offset 3**: `[SaaS cost, customization, or localization resolution]`

---

## 3. ARCHITECTURE BLUEPRINT (EXECUTION LIFECYCLE)

### Lifecycle Stages
Identify **exactly 4 chronological phases** describing data ingestion, transmutation, storage, and customer delivery:

*   **01 Ingestion**: `[How data enters the client boundary]`
*   **02 Processing**: `[How backend proxies / AI endpoints execute logic]`
*   **03 Storage**: `[How records are persisted and isolated securely]`
*   **04 Distribution**: `[How final assets are compiled and rendered to users]`

### Platform Security & Operational Guardrails
Provide **exactly 3 architectural guidelines** shielding sensitive components:
*   **Guardrail 1**: `[API shielding, key environment containment]`
*   **Guardrail 2**: `[Authentication, tenant isolation rule details]`
*   **Guardrail 3**: `[Memory sanitization, client-side caching filters]`

---

## 4. PROMPT ENGINEERING & STRUCTURED AI DESIGN

Detail the precise prompt architecture and JSON guidelines utilized for generative interfaces:

### LLM System Instructions
```markdown
[Paste actual high-fidelity System Prompt guiding the LLM reasoning here]
```

### Constraints & Negative Controls
*   **Token/Formatting Constraints**: `[Strict sentence restrictions, maximum length limits, word limits]`
*   **Structural Guidelines**: `[Specific output pattern requirements (e.g., Sentence 1 target, Sentence 2 target)]`
*   **Negative Rules**: `[What the AI is strictly forbidden from returning (e.g., generic praise, verbose descriptions)]`

### Structured JSON Response Schema
```json
{
  "type": "OBJECT",
  "properties": {
    "[key_1]": { "type": "STRING", "description": "[description]" },
    "[key_2]": { "type": "STRING", "description": "[description]" }
  },
  "required": ["[key_1]", "[key_2]"]
}
```

---

## 5. BEHIND THE ARCHITECTURE (PRODUCT DEEP-DIVE)

Provide a thorough narrative of the strategic and technical decisions behind this project:
*   **The Core Operational Hassle**: `[What is the high-friction environment behind the problem?]`
*   **The Unified Vision**: `[How does this software streamline standard operational patterns?]`
*   **The Rationale for Technology Selection**: `[Why were these specific frameworks, languages, databases, or AI models chosen?]`

---

## 6. HARD TECHNICAL HURDLES & RESOLUTIONS

Describe **at least 1 massive technical blocker** encountered during development containing deep diagnostics and a robust, scalable engineering fix:

*   **Hurdle Title**: `[e.g., Unicode Character Rendering Blank Boxes in PDF Compiler]`
*   **The Incident / Symptom**: `[Detailed description of what broke during runtime validation]`
*   **The Root Cause Diagnosis**: `[The deeply technical 'why' explaining the exact technical deficiency]`
*   **The Production Resolution**: `[The step-by-step code and network configurations implementing a self-healing fix]`

---

## 7. FULL TECHNICAL STACK LISTING

Specify every library, framework, utility, and API tool used in compile form:
*   `[e.g., React 18]`
*   `[e.g., TypeScript]`
*   `[e.g., Vite]`
*   `[e.g., Tailwind CSS]`
*   `[e.g., Express.js / Node.js]`
*   `[e.g., PostgreSQL Supabase (RLS)]`
*   `[e.g., @react-pdf/renderer]`
*   `[e.g., Google Gemini 1.5 Flash]`
