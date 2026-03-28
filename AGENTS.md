<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Tech Stack
- Next.js 16+ (App Router)
- React, TypeScript, Tailwind CSS
- UI Library: Shadcn UI

## Rules & Conventions
- Always write TypeScript with strict types (no `any`).
- Use Functional Components.
- Before completing a task, run `npm run build` or the local linter to verify there are no errors.
- Do not modify existing tests to make them pass; fix the code instead.