import { ImageResponse } from "next/og";

export const dynamic = "force-static";
const size = { width: 180, height: 180 };

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d1422",
        color: "#f3f5f7",
        fontSize: 115,
        fontWeight: 800,
        border: "3px solid #f4a62a",
        borderRadius: 35,
      }}
    >
      a<span style={{ color: "#f4a62a" }}>.</span>
    </div>,
    size,
  );
}
