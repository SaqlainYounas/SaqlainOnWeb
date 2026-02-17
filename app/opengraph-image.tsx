import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Saqlain Younas - Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Dot grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "48px",
            padding: "24px",
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
          <div
            style={{
              fontSize: "24px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "6px",
              color: "#888",
            }}
          >
            full-stack developer
          </div>
          <div
            style={{
              fontSize: "128px",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            saqlain
          </div>
          <div
            style={{
              fontSize: "128px",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: "-2px",
              marginTop: "-20px",
            }}
          >
            <span style={{ color: "#888" }}>.dev</span>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontFamily: "monospace",
              color: "#666",
              maxWidth: "500px",
              lineHeight: 1.6,
              marginTop: "8px",
            }}
          >
            building modern web applications with clean code and thoughtful design.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
