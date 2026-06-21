export default function Slide01Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-primary">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #2C4A1E 0%, #1A2E12 100%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[40vw] h-full opacity-10"
        style={{ background: "radial-gradient(ellipse at top right, #A0522D 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[30vw] h-[40vh] opacity-10"
        style={{ background: "radial-gradient(ellipse at bottom left, #8B9E6B 0%, transparent 70%)" }}
      />

      <div className="absolute left-[8vw] top-[50%] translate-y-[-50%]">
        <div className="flex items-center gap-[1.5vw] mb-[4vh]">
          <div className="w-[0.3vw] h-[6vh] bg-accent" />
          <span
            className="font-body text-accent tracking-[0.3em] uppercase"
            style={{ fontSize: "2.2vw", fontWeight: 600 }}
          >
            Project Overview
          </span>
        </div>

        <h1
          className="font-display text-white leading-[0.95] tracking-tight"
          style={{ fontSize: "9vw", fontWeight: 900, textWrap: "balance" }}
        >
          Academy
          <br />
          Hub
        </h1>

        <div
          className="mt-[4vh] w-[12vw] h-[0.4vh] bg-accent"
        />

        <p
          className="font-body text-white/70 mt-[3vh] leading-relaxed"
          style={{ fontSize: "2.8vw", maxWidth: "36vw", textWrap: "pretty" }}
        >
          Horse Riding Academy Management System
        </p>

        <p
          className="font-body mt-[2vh]"
          style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.45)" }}
        >
          Full-stack · React · Express · PostgreSQL
        </p>
      </div>

      <div
        className="absolute right-[8vw] bottom-[6vh] font-body text-white/30 tracking-widest uppercase"
        style={{ fontSize: "2.2vw", letterSpacing: "0.25em" }}
      >
        2026
      </div>
    </div>
  );
}
