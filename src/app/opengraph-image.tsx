// Link-preview image (LinkedIn, Slack, iMessage, etc.), generated at build time
import { ImageResponse } from "next/og";

export const alt = "Luis E. Román Lizasoain — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "#18181b",
                    color: "#fafafa",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 34, color: "#a1a1aa", marginBottom: 24 }}>le-rl.com</div>
                <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Luis E. Román Lizasoain</div>
                <div style={{ fontSize: 33, color: "#d4d4d8", marginTop: 28 }}>
                    AI & Software Engineering · Research · Photonics · Hardware
                </div>
                <div style={{ display: "flex", height: 6, width: 160, background: "#3b82f6", marginTop: 48, borderRadius: 3 }} />
            </div>
        ),
        size
    );
}
