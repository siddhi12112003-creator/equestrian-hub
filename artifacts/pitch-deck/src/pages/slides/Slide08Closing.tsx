export default function Slide08Closing() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#1A2E12" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #1A2E12 0%, #2C4A1E 60%, #1A2E12 100%)" }}
      />
      <div
        className="absolute top-0 left-0 w-full h-[0.6vh] bg-accent"
      />
      <div
        className="absolute top-[6vh] right-0 w-[30vw] h-full opacity-10"
        style={{ background: "radial-gradient(ellipse at right, #A0522D 0%, transparent 70%)" }}
      />

      <div className="absolute left-[8vw] top-[50%] translate-y-[-50%]">
        <div className="flex items-center gap-[2vw] mb-[4vh]">
          <div className="w-[0.4vw] h-[7vh] bg-accent" />
          <span
            className="font-body text-accent tracking-[0.3em] uppercase"
            style={{ fontSize: "2.2vw", fontWeight: 600 }}
          >
            Academy Hub
          </span>
        </div>

        <h2
          className="font-display text-white leading-tight tracking-tight"
          style={{ fontSize: "6.5vw", fontWeight: 900, textWrap: "balance", maxWidth: "55vw" }}
        >
          Every stable operation, in one place
        </h2>

        <div className="w-[10vw] h-[0.4vh] bg-accent mt-[4vh] mb-[4vh]" />

        <div className="flex gap-[4vw]">
          <div>
            <p
              className="font-display text-accent"
              style={{ fontSize: "6vw", fontWeight: 900, lineHeight: 1 }}
            >
              5
            </p>
            <p
              className="font-body text-white/60 mt-[0.5vh]"
              style={{ fontSize: "2.4vw" }}
            >
              horses registered
            </p>
          </div>
          <div>
            <p
              className="font-display text-accent"
              style={{ fontSize: "6vw", fontWeight: 900, lineHeight: 1 }}
            >
              6
            </p>
            <p
              className="font-body text-white/60 mt-[0.5vh]"
              style={{ fontSize: "2.4vw" }}
            >
              active riders
            </p>
          </div>
          <div>
            <p
              className="font-display text-accent"
              style={{ fontSize: "6vw", fontWeight: 900, lineHeight: 1 }}
            >
              10
            </p>
            <p
              className="font-body text-white/60 mt-[0.5vh]"
              style={{ fontSize: "2.4vw" }}
            >
              sessions scheduled
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute right-[8vw] bottom-[8vh] text-right"
      >
        <p
          className="font-body text-white/40 tracking-widest uppercase"
          style={{ fontSize: "2.2vw", letterSpacing: "0.2em" }}
        >
          Built with React · Express · PostgreSQL
        </p>
      </div>
    </div>
  );
}
