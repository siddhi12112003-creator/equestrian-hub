export default function Slide06Attendance() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#2C4A1E" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #2C4A1E 0%, #3D6929 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-10"
        style={{ background: "radial-gradient(ellipse at bottom left, #A0522D 0%, transparent 70%)" }}
      />

      <div className="absolute left-[8vw] top-[10vh]">
        <span
          className="font-body text-accent tracking-[0.25em] uppercase"
          style={{ fontSize: "2.2vw", fontWeight: 600 }}
        >
          Feature 04
        </span>
        <h2
          className="font-display text-white mt-[2vh] leading-tight tracking-tight"
          style={{ fontSize: "6vw", fontWeight: 700 }}
        >
          Attendance Tracker
        </h2>
        <div className="w-[8vw] h-[0.4vh] bg-accent mt-[2.5vh]" />
        <p
          className="font-body mt-[3vh]"
          style={{ fontSize: "2.8vw", color: "rgba(255,255,255,0.7)", maxWidth: "38vw", textWrap: "pretty" }}
        >
          Mark each rider present or absent per session with a single toggle. No forms, no friction.
        </p>
      </div>

      <div
        className="absolute right-[8vw] top-[50%] translate-y-[-50%]"
        style={{ width: "40vw" }}
      >
        <div
          className="p-[4vh_3vw] rounded-sm"
          style={{ background: "rgba(245,240,232,0.08)" }}
        >
          <p
            className="font-display text-white mb-[3vh]"
            style={{ fontSize: "3vw", fontWeight: 700 }}
          >
            Today's session
          </p>
          <div className="flex flex-col gap-[2.5vh]">
            <div className="flex items-center justify-between">
              <span className="font-body text-white" style={{ fontSize: "3vw", fontWeight: 600 }}>Sarah Mitchell</span>
              <div
                className="px-[2vw] py-[1vh] rounded-sm font-body"
                style={{ background: "#A0522D", color: "#F5F0E8", fontSize: "2.4vw", fontWeight: 700 }}
              >
                Present
              </div>
            </div>
            <div className="h-[0.1vh] bg-white opacity-20" />
            <div className="flex items-center justify-between">
              <span className="font-body text-white" style={{ fontSize: "3vw", fontWeight: 600 }}>James Carter</span>
              <div
                className="px-[2vw] py-[1vh] rounded-sm font-body"
                style={{ background: "#A0522D", color: "#F5F0E8", fontSize: "2.4vw", fontWeight: 700 }}
              >
                Present
              </div>
            </div>
            <div className="h-[0.1vh] bg-white opacity-20" />
            <div className="flex items-center justify-between">
              <span className="font-body" style={{ fontSize: "3vw", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>Emma Rodriguez</span>
              <div
                className="px-[2vw] py-[1vh] rounded-sm font-body"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontSize: "2.4vw" }}
              >
                Absent
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-[3vh] flex gap-[2vw]"
        >
          <div
            className="flex-1 p-[2.5vh_2vw] rounded-sm text-center"
            style={{ background: "rgba(245,240,232,0.08)" }}
          >
            <p className="font-display text-accent" style={{ fontSize: "7vw", fontWeight: 900, lineHeight: 1 }}>67%</p>
            <p className="font-body text-white/60 mt-[1vh]" style={{ fontSize: "2.2vw" }}>attendance rate</p>
          </div>
          <div
            className="flex-1 p-[2.5vh_2vw] rounded-sm text-center"
            style={{ background: "rgba(245,240,232,0.08)" }}
          >
            <p className="font-display text-white" style={{ fontSize: "7vw", fontWeight: 900, lineHeight: 1 }}>2</p>
            <p className="font-body text-white/60 mt-[1vh]" style={{ fontSize: "2.2vw" }}>present today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
