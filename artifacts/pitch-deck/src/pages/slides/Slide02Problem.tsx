export default function Slide02Problem() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      <div
        className="absolute top-0 left-0 w-[6vw] h-full"
        style={{ background: "linear-gradient(to right, #2C4A1E, transparent)" }}
      />

      <div className="absolute left-[10vw] top-[12vh]">
        <span
          className="font-body text-accent tracking-[0.25em] uppercase block mb-[2vh]"
          style={{ fontSize: "2.2vw", fontWeight: 600 }}
        >
          The Problem
        </span>
        <h2
          className="font-display text-primary leading-tight tracking-tight"
          style={{ fontSize: "6vw", fontWeight: 700, textWrap: "balance", maxWidth: "50vw" }}
        >
          Running a stable means juggling everything at once
        </h2>
        <div className="w-[8vw] h-[0.4vh] bg-accent mt-[3vh]" />
      </div>

      <div className="absolute right-[8vw] top-[12vh] flex flex-col gap-[3vh]" style={{ width: "36vw" }}>
        <div
          className="p-[3vh_2.5vw] rounded-sm"
          style={{ background: "#EDE7D8", borderLeft: "0.4vw solid #2C4A1E" }}
        >
          <p
            className="font-display text-primary"
            style={{ fontSize: "3.2vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            Fragmented records
          </p>
          <p
            className="font-body text-muted mt-[1vh]"
            style={{ fontSize: "2.8vw" }}
          >
            Horses, riders, and lessons tracked in separate spreadsheets and paper forms
          </p>
        </div>
        <div
          className="p-[3vh_2.5vw] rounded-sm"
          style={{ background: "#EDE7D8", borderLeft: "0.4vw solid #A0522D" }}
        >
          <p
            className="font-display text-primary"
            style={{ fontSize: "3.2vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            No health visibility
          </p>
          <p
            className="font-body text-muted mt-[1vh]"
            style={{ fontSize: "2.8vw" }}
          >
            Horse health status buried in notebooks — scheduling an unfit horse is easy to miss
          </p>
        </div>
        <div
          className="p-[3vh_2.5vw] rounded-sm"
          style={{ background: "#EDE7D8", borderLeft: "0.4vw solid #2C4A1E" }}
        >
          <p
            className="font-display text-primary"
            style={{ fontSize: "3.2vw", fontWeight: 700, lineHeight: 1.2 }}
          >
            Attendance gaps
          </p>
          <p
            className="font-body text-muted mt-[1vh]"
            style={{ fontSize: "2.8vw" }}
          >
            No reliable record of who showed up — disputes with riders, no trend data
          </p>
        </div>
      </div>
    </div>
  );
}
