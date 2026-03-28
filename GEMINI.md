# QuantumCraft Client Dashboard - Gemini Handover Document

## 📌 Project Overview
QuantumCraft is a full-stack SaaS client dashboard designed for a content writing business. It allows clients to request orders (Blog Posts, Articles, Social Media, etc.), track their progress through a Notion-like Kanban board (Drag & Drop), and manage their profiles. 

The aesthetic is heavily inspired by Notion: minimalist, monochrome (blacks, whites, grays), with subtle glassmorphism effects, floating dropdowns, and an absence of standard scrollbars.

### Primary Tech Stack:
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4, custom global CSS for scrollbar hiding
- **Language:** TypeScript
- **UI Components:** Shadcn/ui concepts, `lucide-react`, `react-day-picker`, `@hello-pangea/dnd` (for Kanban)
- **Forms & Validation:** `react-hook-form`, `zod`

---

## ✅ What We Have Accomplished So Far (Phases 1 & 2)

### 1. UI Scaffold & Layouts
- Initialized the Next.js 15 project structure with route groups `(auth)`, `(dashboard)`, and `(marketing)`.
- Built the foundational UI primitives (`Button`, `Input`, `Select`, `Textarea`, `Modal`, `DatePicker`, `Toast`).
- Configured a persistent Layout with a global **Sidebar** offering seamless navigation between Dashboard, Orders, Settings, and Billing.

### 2. The "Notion" Aesthetic Overhaul
- Converted all primary buttons from default blue to Notion's dark gray (`#37352F`).
- Globally disabled scrollbars across the application for a cleaner look.
- Refactored the `DatePicker` to open upwards, using gray dates and an elegant popup matching the monochrome theme.
- Stripped the Sidebar footer of text to feature a minimal `[Avatar] [Notifications Bell] [Log Out]` single-row structure.
- Removed dark overlapping backgrounds from the Kanban dragging interactions, ensuring a flawless floating hover effect.

### 3. Interactivity & State Management (Local)
- Mock Data Integration: Application is fully functional using local React Contexts (`OrdersContext`, `ProfileContext`, `ToastContext`).
- Implemented `@hello-pangea/dnd` to allow users to drag and drop tasks across columns (`Pending`, `In Progress`, `Review`, `Completed`) seamlessly.
- Constructed a complex `NewOrderForm` modal that utilizes `react-hook-form` + `zod` validation. It includes live status assignment, content type selection, and due date validation.
- Built a dynamic Search Input on the Kanban board with a live dropdown menu displaying filtered results.

---

## 🚀 Next Steps & Instructions for Future Models (Phase 3+)

If you are a future AI model (or developer) picking up this project, here is exactly where we left off and what you need to do next:

### Phase 3: Supabase Authentication & Database Integration (Priority)
Currently, all data is stored in React Context memory (`src/data/mock.ts`). Your immediate next task is to bridge this to a real backend.
1. **Database Schema:** Set up Supabase tables for `profiles` and `orders`. Establish Foreign Key relationships.
2. **Row Level Security (RLS):** Ensure strict RLS policies so clients can only read/update their own orders.
3. **Clients:** Create Supabase clients for Next.js App Router (`client.ts`, `server.ts`, `middleware.ts`).
4. **Server Actions:** Replace the Context setters with Next.js Server Actions (e.g., `createOrder`, `updateOrderStatus`).
5. **Auth Flow:** Replace the mock login with Supabase proper Auth routing.

### Phase 4: Marketing / Landing Page
1. Navigate to the `(marketing)` route group.
2. Build a high-converting public landing page, adhering to the same glassmorphism/Notion-like aesthetic.
3. Include Hero sections, Feature highlights, and Pricing tiers.

### Phase 5 & 6: Polish & Deployment
1. Add global Error boundaries (`error.tsx`) and Loading states (`loading.tsx`).
2. Write critical unit tests (Vitest).
3. Ensure accessibility passes Lighthouse audits.
4. Prepare `netlify.toml` / Next config for smooth deployment to Netlify or Vercel.

---

**Notes:** 
* To run the app locally, use `npm run dev`. 
* **Design Rule:** Stick strictly to the monochrome, minimalist aesthetic. Do not introduce vibrant colors (like blue or green) unless specifically requested. Use `#37352F` for dark accents and `#91918E` for muted text.
