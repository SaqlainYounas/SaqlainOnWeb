import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "muhammad saqlain younas - full-stack developer";
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
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "6px",
            color: "#888",
            marginBottom: "24px",
          }}
        >
          full-stack developer
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              fontSize: "128px",
              fontWeight: 600,
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
              fontWeight: 600,
              color: "#555",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            .dev
          </div>
        </div>
        <div
          style={{
            fontSize: "20px",
            fontFamily: "monospace",
            color: "#666",
            maxWidth: "500px",
            lineHeight: 1.6,
            marginTop: "32px",
          }}
        >
          building modern web applications with clean code and thoughtful design.
        </div>
      </div>
    ),
    { ...size }
  );
}
