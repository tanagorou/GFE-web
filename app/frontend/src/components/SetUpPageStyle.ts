import { styled } from "@mui/material/styles";


export const Overlay = styled("div")({
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  padding: 16,
  background: "rgba(2, 6, 23, .55)", // slate-950 55%
  backdropFilter: "blur(6px)",
  zIndex: 999,
});

export const Card = styled("div")({
  width: "min(920px, 100%)",
  borderRadius: 20,
  padding: "28px clamp(16px, 3vw, 40px)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.86))",
  border: "1px solid rgba(15, 23, 42, .08)",
  boxShadow:
    "0 10px 30px rgba(2,6,23,.25), 0 1px 0 rgba(255,255,255,.6) inset",
});

export const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 12,
});

export const TitleWrap = styled("div")({
  display: "flex",
  alignItems: "baseline",
  gap: 12,
});

export const Title = styled("h3")({
  margin: 0,
  fontSize: "clamp(18px, 2.6vw, 28px)",
  fontWeight: 800,
  color: "#0f172a",
  letterSpacing: ".02em",
});

export const Subtitle = styled("p")({
  margin: 0,
  fontSize: "clamp(11px, 1.2vw, 13px)",
  color: "rgba(15, 23, 42, .65)",
});

export const IconGhostBtn = styled("button")({
  display: "grid",
  placeItems: "center",
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid rgba(15, 23, 42, .08)",
  background: "rgba(255,255,255,.7)",
  cursor: "pointer",
  transition: "transform .12s ease, background .2s ease, box-shadow .2s ease",
  boxShadow: "0 1px 0 rgba(255,255,255,.7) inset",
  "&:hover": {
    background: "rgba(248,250,252,.9)",
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0px) scale(.98)" },
  "& svg": { fontSize: 20, color: "#0f172a" },
});

export const Display = styled("div")({
  marginTop: 10,
  marginBottom: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
  padding: "18px clamp(8px, 2vw, 16px)",
  borderRadius: 16,
  background: "rgba(2,6,23,.04)",
  border: "1px solid rgba(15,23,42,.06)",
  fontVariantNumeric: "tabular-nums",
  fontWeight: 700,
  lineHeight: 1,
  color: "#0f172a",
});

export const DisplayText = styled("div")({
  fontSize: "clamp(28px, 7vw, 68px)",
  letterSpacing: "0.03em",
});

export const UnitHints = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
  marginTop: 6,
  color: "rgba(15,23,42,.55)",
  fontSize: 12,
  textAlign: "center",
});

export const Grid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0,1fr))",
  gap: 18,
  marginTop: 16,
});

export const Column = styled("div")({
  display: "grid",
  gridTemplateRows: "auto auto",
  gap: 6,
  justifyItems: "center",
});

export const ControlButton = styled("button")({
  width: "clamp(56px, 8vw, 72px)",
  height: "clamp(56px, 8vw, 72px)",
  borderRadius: 16,
  border: "1px solid rgba(2,6,23,.08)",
  background: "linear-gradient(180deg, #fff, rgba(248,250,252,.9))",
  cursor: "pointer",
  transition: "transform .12s ease, box-shadow .2s ease, background .2s ease",
  boxShadow:
    "0 2px 8px rgba(2,6,23,.08), 0 1px 0 rgba(255,255,255,.8) inset",
  display: "grid",
  placeItems: "center",
  // ← アイコンだけ拡大／縮小させ、ボタン本体は動かさない
  "& svg": {
    fontSize: "clamp(28px, 6vw, 44px)",
    transition: "transform .12s ease",
  },
  "&:hover svg": { transform: "scale(1.08)" },
  "&:active svg": { transform: "scale(.96)" },
});

export const Actions = styled("div")({
  marginTop: 22,
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "flex-end",
});

// const Primary = styled("button")({
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   padding: "12px 16px",
//   borderRadius: 12,
//   border: "none",
//   cursor: "pointer",
//   fontWeight: 700,
//   fontSize: 14,
//   color: "#fff",
//   background:
//     "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #7c3aed 100%)",
//   boxShadow: "0 8px 18px rgba(14,165,233,.35)",
//   transition: "transform .12s ease, box-shadow .2s ease, filter .2s ease",
//   "&:hover": { filter: "brightness(1.03)", transform: "translateY(-1px)" },
//   "&:active": { transform: "translateY(0)" },
// });

export const Primary = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: 12,
  border:'none',
  background:
    "linear-gradient(90deg, #99FFCC 0%, #99FF66 50%, 	#99FF00 100%)",
  boxShadow: '0 3px 7px rgba(0, 0, 0, 0.10)',
  transition: 'filter .2s ease',
  '&:hover': {
    filter: 'brightness(1.12)',
    transform: 'translateY(-0.5px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
})

export const Secondary = styled("button")({
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(2,6,23,.12)",
  background: "#fff",
  fontWeight: 700,
  fontSize: 14,
  color: "#0f172a",
  cursor: "pointer",
  transition: "transform .12s ease, background .2s ease",
  "&:hover": { background: "rgba(248,250,252,.8)", transform: "translateY(-1px)" },
  "&:active": { transform: "translateY(0)" },
});

export const TextBtn = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 8px",
  border: "none",
  background: "transparent",
  fontWeight: 700,
  fontSize: 13,
  color: "rgba(15,23,42,.75)",
  cursor: "pointer",
  "&:hover": { textDecoration: "underline" },
});


export const ResetBtn = styled('button')({
  padding: '0px 12px',
  display: 'inline-flex',
  alignItems: 'center',
  border: 'none',
  borderRadius: 999,
  background: 'none',
  cursor: 'pointer',
  transition: 'transform .12s ease',
  '& svg': {
    fontSize: 24,
    transition: 'transform .12s ease',
  },
  '&:hover svg': { transform: 'scale(1.10)' },
  '&:active svg': {transform: 'scale(.96)' },
})