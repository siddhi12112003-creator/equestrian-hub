export default function Slide03Solution() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#2C4A1E" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #2C4A1E 0%, #1A2E12 100%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[50vw] h-[50vh] opacity-10"
        style={{ background: "radial-gradient(ellipse, #A0522D 0%, transparent 70%)" }}
      />

      <div className="absolute top-[10vh] left-[8vw]">
        <span
          className="font-body text-accent tracking-[0.25em] uppercase"
          style={{ fontSize: "2.2vw", fontWeight: 600 }}
        >
          The Solution
        </span>
        <h2
          className="font-display text-white mt-[2vh] leading-tight tracking-tight"
          style={{ fontSize: "5.5vw", fontWeight: 700, maxWidth: "55vw", textWrap: "balance" }}
        >
          One hub for every stable operation
        </h2>
        <div className="w-[8vw] h-[0.35vh] bg-accent mt-[2.5vh]" />
      </div>

      <div
        className="absolute bottom-[8vh] left-[8vw] right-[8vw] grid gap-[2vw]"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        <div
          className="p-[3vh_2vw] rounded-sm"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="font-display text-accent mb-[1.5vh]"
            style={{ fontSize: "3.5vw", fontWeight: 700 }}
          >
            01
          </div>
          <p
            className="font-display text-white"
            style={{ fontSize: "2.8vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            Horse Registry
          </p>
          <p
            className="font-body mt-[1vh]"
            style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.6)" }}
          >
            Health status · breed · age
          </p>
        </div>
        <div
          className="p-[3vh_2vw] rounded-sm"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="font-display text-accent mb-[1.5vh]"
            style={{ fontSize: "3.5vw", fontWeight: 700 }}
          >
            02
          </div>
          <p
            className="font-display text-white"
            style={{ fontSize: "2.8vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            Rider Profiles
          </p>
          <p
            className="font-body mt-[1vh]"
            style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.6)" }}
          >
            Skill level · contact info
          </p>
        </div>
        <div
          className="p-[3vh_2vw] rounded-sm"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="font-display text-accent mb-[1.5vh]"
            style={{ fontSize: "3.5vw", fontWeight: 700 }}
          >
            03
          </div>
          <p
            className="font-display text-white"
            style={{ fontSize: "2.8vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            Session Scheduler
          </p>
          <p
            className="font-body mt-[1vh]"
            style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.6)" }}
          >
            Assign rider + horse + time
          </p>
        </div>
        <div
          className="p-[3vh_2vw] rounded-sm"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="font-display text-accent mb-[1.5vh]"
            style={{ fontSize: "3.5vw", fontWeight: 700 }}
          >
            04
          </div>
          <p
            className="font-display text-white"
            style={{ fontSize: "2.8vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            Attendance
          </p>
          <p
            className="font-body mt-[1vh]"
            style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.6)" }}
          >
            One-click per-session tracking
          </p>
        </div>
      </div>
    </div>
  );
}
