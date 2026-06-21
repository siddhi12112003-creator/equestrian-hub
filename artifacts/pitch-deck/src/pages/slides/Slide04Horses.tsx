export default function Slide04Horses() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#F5F0E8" }}
    >
      <div
        className="absolute top-0 right-0 w-[45vw] h-full"
        style={{ background: "linear-gradient(to left, #2C4A1E, transparent)" }}
      />

      <div className="absolute left-[8vw] top-[12vh]" style={{ maxWidth: "48vw" }}>
        <span
          className="font-body text-accent tracking-[0.25em] uppercase block mb-[2vh]"
          style={{ fontSize: "2.2vw", fontWeight: 600 }}
        >
          Feature 01
        </span>
        <h2
          className="font-display text-primary leading-tight tracking-tight"
          style={{ fontSize: "6vw", fontWeight: 700 }}
        >
          Horse Registry
        </h2>
        <div className="w-[8vw] h-[0.4vh] bg-accent mt-[2.5vh] mb-[4vh]" />

        <div className="flex flex-col gap-[2.5vh]">
          <div className="flex items-start gap-[2vw]">
            <div
              className="w-[0.4vw] h-[5vh] bg-primary flex-shrink-0 mt-[0.5vh]"
            />
            <div>
              <p
                className="font-display text-primary"
                style={{ fontSize: "3vw", fontWeight: 700 }}
              >
                Full CRUD management
              </p>
              <p
                className="font-body text-muted mt-[0.5vh]"
                style={{ fontSize: "2.6vw" }}
              >
                Add, edit, and remove horses with instant validation
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[2vw]">
            <div
              className="w-[0.4vw] h-[5vh] bg-accent flex-shrink-0 mt-[0.5vh]"
            />
            <div>
              <p
                className="font-display text-primary"
                style={{ fontSize: "3vw", fontWeight: 700 }}
              >
                Health status tracking
              </p>
              <p
                className="font-body text-muted mt-[0.5vh]"
                style={{ fontSize: "2.6vw" }}
              >
                Healthy · Under Treatment · Retired — visible at a glance
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[2vw]">
            <div
              className="w-[0.4vw] h-[5vh] bg-primary flex-shrink-0 mt-[0.5vh]"
            />
            <div>
              <p
                className="font-display text-primary"
                style={{ fontSize: "3vw", fontWeight: 700 }}
              >
                Dashboard breakdown
              </p>
              <p
                className="font-body text-muted mt-[0.5vh]"
                style={{ fontSize: "2.6vw" }}
              >
                Health status distribution always visible on the main dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[6vw] top-[50%] translate-y-[-50%]" style={{ width: "38vw" }}>
        <div
          className="p-[4vh_3vw] rounded-sm"
          style={{ background: "rgba(245,240,232,0.15)", backdropFilter: "blur(2px)", border: "1px solid rgba(245,240,232,0.3)" }}
        >
          <p
            className="font-display text-white mb-[3vh]"
            style={{ fontSize: "3.2vw", fontWeight: 700 }}
          >
            Sample stable
          </p>
          <div className="flex flex-col gap-[2vh]">
            <div
              className="flex items-center justify-between p-[1.5vh_2vw] rounded-sm"
              style={{ background: "rgba(245,240,232,0.1)" }}
            >
              <span className="font-body text-white" style={{ fontSize: "2.8vw", fontWeight: 600 }}>Thunder</span>
              <span
                className="font-body px-[1vw] py-[0.5vh] rounded-sm"
                style={{ fontSize: "2.2vw", background: "rgba(160,82,45,0.3)", color: "#F5F0E8" }}
              >
                Healthy
              </span>
            </div>
            <div
              className="flex items-center justify-between p-[1.5vh_2vw] rounded-sm"
              style={{ background: "rgba(245,240,232,0.1)" }}
            >
              <span className="font-body text-white" style={{ fontSize: "2.8vw", fontWeight: 600 }}>Storm</span>
              <span
                className="font-body px-[1vw] py-[0.5vh] rounded-sm"
                style={{ fontSize: "2.2vw", background: "rgba(245,240,232,0.2)", color: "#F5F0E8" }}
              >
                Treatment
              </span>
            </div>
            <div
              className="flex items-center justify-between p-[1.5vh_2vw] rounded-sm"
              style={{ background: "rgba(245,240,232,0.1)" }}
            >
              <span className="font-body text-white" style={{ fontSize: "2.8vw", fontWeight: 600 }}>Rio</span>
              <span
                className="font-body px-[1vw] py-[0.5vh] rounded-sm"
                style={{ fontSize: "2.2vw", background: "rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.7)" }}
              >
                Retired
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
