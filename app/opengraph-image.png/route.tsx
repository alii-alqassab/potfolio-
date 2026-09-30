import { ImageResponse } from "next/og";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    <div
      style={{
        background: "#070b14",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "62px 74px",
        color: "#f3f5f7",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 17,
          color: "#f4a62a",
          letterSpacing: 4,
        }}
      >
        THE DEVELOPER SYSTEM
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 85,
              fontWeight: 800,
              letterSpacing: -5,
            }}
          >
            Ali Alqassab<span style={{ color: "#f4a62a" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 30,
              color: "#f4a62a",
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 23,
              color: "#a1aabd",
            }}
          >
            2nd-Year Programming Student
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 290,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              border: "1px solid #354050",
              borderRadius: 10,
              padding: "12px 30px",
              color: "#a1aabd",
              fontSize: 17,
            }}
          >
            FRONTEND
          </div>
          <div style={{ height: 35, width: 1, background: "#f4a62a" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 135,
              height: 135,
              border: "1px solid #f4a62a",
              borderRadius: 20,
              background: "#1a1713",
              fontSize: 48,
              fontWeight: 800,
              color: "#f4a62a",
            }}
          >
            ALI
          </div>
          <div style={{ height: 35, width: 1, background: "#f4a62a" }} />
          <div
            style={{
              border: "1px solid #354050",
              borderRadius: 10,
              padding: "12px 30px",
              color: "#a1aabd",
              fontSize: 17,
            }}
          >
            BACKEND
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #273142",
          paddingTop: 24,
          justifyContent: "space-between",
          fontSize: 17,
          color: "#a1aabd",
        }}
      >
        <span>Interfaces · APIs · Databases · Real-time</span>
        <span>Based in Bahrain</span>
      </div>
    </div>,
    size,
  );
}
