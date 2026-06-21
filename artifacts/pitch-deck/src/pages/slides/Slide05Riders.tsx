export default function Slide05Riders() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      <div
        className="absolute bottom-0 left-0 w-full h-[0.5vh] bg-primary"
      />
      <div
        className="absolute top-0 left-0 w-full h-[0.5vh] bg-primary"
      />

      <div className="absolute top-[10vh] left-[8vw] right-[8vw]">
        <div className="flex items-center gap-[2vw] mb-[4vh]">
          <span
            className="font-body text-accent tracking-[0.25em] uppercase"
            style={{ fontSize: "2.2vw", fontWeight: 600 }}
          >
            Feature 02 — 03
          </span>
          <div className="flex-1 h-[0.2vh] bg-accent opacity-30" />
        </div>
        <h2
          className="font-display text-primary leading-tight tracking-tight"
          style={{ fontSize: "5.5vw", fontWeight: 700 }}
        >
          Riders &amp; Sessions
        </h2>
      </div>

      <div
        className="absolute top-[38vh] left-[8vw] right-[8vw] grid gap-[3vw]"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <div
          className="p-[4vh_3vw]"
          style={{ background: "#EDE7D8" }}
        >
          <p
            className="font-display text-primary mb-[2vh]"
            style={{ fontSize: "3.2vw", fontWeight: 700 }}
          >
            Rider Profiles
          </p>
          <div className="flex flex-col gap-[1.5vh]">
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[0.8vw] h-[0.8vw] bg-primary rounded-full flex-shrink-0" />
              <p className="font-body text-muted" style={{ fontSize: "2.6vw" }}>
                Name, contact, and skill level
              </p>
            </div>
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[0.8vw] h-[0.8vw] bg-primary rounded-full flex-shrink-0" />
              <p className="font-body text-muted" style={{ fontSize: "2.6vw" }}>
                Four levels: Beginner to Professional
              </p>
            </div>
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[0.8vw] h-[0.8vw] bg-primary rounded-full flex-shrink-0" />
              <p className="font-body text-muted" style={{ fontSize: "2.6vw" }}>
                Full edit and delete with confirmation
              </p>
            </div>
          </div>
        </div>
        <div
          className="p-[4vh_3vw]"
          style={{ background: "#EDE7D8" }}
        >
          <p
            className="font-display text-primary mb-[2vh]"
            style={{ fontSize: "3.2vw", fontWeight: 700 }}
          >
            Session Scheduler
          </p>
          <div className="flex flex-col gap-[1.5vh]">
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[0.8vw] h-[0.8vw] bg-accent rounded-full flex-shrink-0" />
              <p className="font-body text-muted" style={{ fontSize: "2.6vw" }}>
                Assign any rider to any horse
              </p>
            </div>
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[0.8vw] h-[0.8vw] bg-accent rounded-full flex-shrink-0" />
              <p className="font-body text-muted" style={{ fontSize: "2.6vw" }}>
                Date, time, and optional notes
              </p>
            </div>
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[0.8vw] h-[0.8vw] bg-accent rounded-full flex-shrink-0" />
              <p className="font-body text-muted" style={{ fontSize: "2.6vw" }}>
                Upcoming sessions shown on dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
