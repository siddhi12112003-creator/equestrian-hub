export default function Slide07Stack() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      <div
        className="absolute top-0 left-0 w-[0.5vw] h-full bg-accent"
      />
      <div
        className="absolute top-0 left-[8vw] right-[8vw] h-[0.5vh] bg-primary"
        style={{ top: "12vh" }}
      />

      <div className="absolute left-[10vw] top-[7vh]">
        <span
          className="font-body text-accent tracking-[0.25em] uppercase"
          style={{ fontSize: "2.2vw", fontWeight: 600 }}
        >
          Technical Stack
        </span>
      </div>

      <div
        className="absolute left-[10vw] right-[8vw] top-[18vh] grid gap-[2.5vw]"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <p
            className="font-display text-primary mb-[2.5vh]"
            style={{ fontSize: "3.5vw", fontWeight: 700 }}
          >
            Frontend
          </p>
          <div className="flex flex-col gap-[2vh]">
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-primary flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>React + Vite + TypeScript</p>
            </div>
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-primary flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>Tailwind CSS + shadcn/ui</p>
            </div>
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-primary flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>TanStack Query + wouter</p>
            </div>
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-primary flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>Session-based auth + bcrypt</p>
            </div>
          </div>
        </div>

        <div>
          <p
            className="font-display text-primary mb-[2.5vh]"
            style={{ fontSize: "3.5vw", fontWeight: 700 }}
          >
            Backend
          </p>
          <div className="flex flex-col gap-[2vh]">
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-accent flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>Node.js 24 + Express 5</p>
            </div>
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-accent flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>PostgreSQL + Drizzle ORM</p>
            </div>
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-accent flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>OpenAPI spec + Orval codegen</p>
            </div>
            <div className="flex items-center gap-[2vw]">
              <div className="w-[0.5vw] h-[3.5vh] bg-accent flex-shrink-0" />
              <p className="font-body text-text" style={{ fontSize: "3vw" }}>Zod validation · pnpm monorepo</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[8vh] left-[10vw] right-[8vw] p-[2.5vh_3vw]"
        style={{ background: "#EDE7D8" }}
      >
        <p
          className="font-body text-muted"
          style={{ fontSize: "2.6vw" }}
        >
          Contract-first API design: OpenAPI spec generates React Query hooks and Zod schemas automatically — the server and client always agree on the shape.
        </p>
      </div>
    </div>
  );
}
