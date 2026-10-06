import { useId } from "react";

type Kind = "overview" | "documents" | "clean" | "retrieve" | "gate" | "answer" | "agent" | "evaluate";

function Document({ x, y, selected = false }: { x: number; y: number; selected?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0h47l15 15v74H0z" fill="var(--surface)" stroke={selected ? "var(--accent)" : "var(--line)"} strokeWidth="1.5" />
      <path d="M47 0v15h15" fill="none" stroke="var(--line)" />
      {[31, 42, 53, 64].map((n) => <path key={n} d={`M12 ${n}h36`} stroke={selected && n === 42 ? "var(--gold)" : "var(--line)"} strokeWidth={selected && n === 42 ? 5 : 2} />)}
    </g>
  );
}

function Stack({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>{[24, 12, 0].map((n, i) => <g key={n} transform={`translate(0 ${n})`}><path d="m0 25 55-25 55 25-55 25z" fill={i === 2 ? "var(--surface)" : "var(--surface-2)"} stroke="var(--accent)" strokeWidth="1.2" /><path d="m0 25v8l55 25 55-25v-8l-55 25z" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.2" /></g>)}</g>;
}

export function RAGIllustration({ kind, legal = true }: { kind: Kind; legal?: boolean }) {
  const arrow = `rag-arrow-${useId().replace(/:/g, "")}`;
  const line = { fill: "none", stroke: "var(--accent)", strokeWidth: 1.5, markerEnd: `url(#${arrow})` };
  return (
    <svg viewBox="0 0 460 300" fill="none" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" aria-hidden="true" focusable="false" className="h-auto w-full">
      <defs><marker id={arrow} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="var(--accent)" strokeWidth="1.2" /></marker></defs>
      <path d="M30 250h400M30 50h400" stroke="var(--line)" strokeDasharray="2 7" />
      {kind === "overview" && <>
        <Document x={40} y={98} /><Document x={56} y={82} selected />
        <path d="M128 130h33" {...line} /><Stack x={175} y={98} />
        <path d="M294 130h32" {...line} />
        <rect x="342" y="92" width="82" height="83" rx="4" fill="var(--surface)" stroke="var(--accent)" />
        <path d="M355 110h54M355 121h45M355 132h51" stroke="var(--line)" strokeWidth="2" /><rect x="355" y="149" width="22" height="9" fill="var(--gold)" /><path d="M383 153h22" stroke="var(--line)" />
        <text x="84" y="216" textAnchor="middle" fill="var(--muted)" fontSize="12">{legal ? "EU AI Act" : "Documents"}</text>
        <text x="230" y="216" textAnchor="middle" fill="var(--muted)" fontSize="12">{legal ? "FAISS + BM25" : "pgvector"}</text>
        <text x="382" y="216" textAnchor="middle" fill="var(--muted)" fontSize="12">Page citations</text>
      </>}
      {kind === "documents" && <>
        <Document x={61} y={80} /><Document x={79} y={96} selected /><path d="M154 143h43" {...line} />
        {[0,1,2].map((n) => <g key={n} transform={`translate(217 ${72+n*53})`}><rect width="154" height="38" rx="3" fill="var(--surface)" stroke="var(--line)" /><rect x="11" y="10" width="20" height="18" fill={n === 1 ? "var(--gold)" : "var(--surface-2)"} /><path d="M43 14h96M43 24h74" stroke="var(--line)" strokeWidth="2" /></g>)}
      </>}
      {kind === "clean" && <>
        <Document x={56} y={93} /><path d="M134 140h33" {...line} />
        <path d="m217 74 47 17v45c0 41-47 69-47 69s-47-28-47-69V91z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" /><path d="m196 137 14 14 28-30" stroke="var(--accent)" strokeWidth="2" />
        <path d="M278 140h33" {...line} /><Document x={329} y={93} selected />
      </>}
      {kind === "retrieve" && <>
        <rect x="38" y="115" width="87" height="50" rx="4" fill="var(--surface)" stroke="var(--line)" /><path d="M53 132h50M53 145h36" stroke="var(--line)" strokeWidth="2" />
        <path d="M125 140h25v-54h25M150 140v62h25" {...line} />
        <rect x="183" y="56" width="112" height="61" rx="4" fill="var(--surface)" stroke="var(--accent)" /><rect x="183" y="172" width="112" height="61" rx="4" fill="var(--surface)" stroke="var(--accent)" />
        <text x="239" y="91" textAnchor="middle" fill="var(--ink)" fontSize="13">{legal ? "FAISS" : "pgvector"}</text><text x="239" y="207" textAnchor="middle" fill="var(--ink)" fontSize="13">{legal ? "BM25" : "LangGraph"}</text>
        <path d="M295 86h22v54M295 202h22v-62" fill="none" stroke="var(--accent)" strokeWidth="1.5" /><path d="M317 140h31" {...line} /><Document x={363} y={95} selected />
        <text x="386" y="219" textAnchor="middle" fill="var(--muted)" fontSize="12">{legal ? "RRF" : "Context"}</text>
      </>}
      {kind === "gate" && <>
        {[0,1,2].map((n) => <Document key={n} x={34+n*16} y={78+n*17} selected={n === 2} />)}
        <path d="M142 140h37" {...line} />
        <path d="M193 76h61v129h-61" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" /><path d="m206 138 11 11 23-24" stroke="var(--accent)" strokeWidth="2" />
        <path d="M268 139h50" {...line} /><Document x={337} y={94} selected />
        <text x="223" y="230" textAnchor="middle" fill="var(--muted)" fontSize="12">{legal ? "Relevance gate ≥ 0.05" : "DeepEval · CI"}</text>
      </>}
      {kind === "answer" && <>
        <Document x={47} y={84} selected /><path d="M130 135h48" {...line} />
        <rect x="204" y="77" width="200" height="126" rx="5" fill="var(--surface)" stroke="var(--accent)" /><text x="220" y="115" fill="var(--accent)" fontSize="13" fontFamily="SFMono-Regular, Consolas, monospace">[1] p. 115</text><path d="M220 140h163M220 151h134M220 162h153" stroke="var(--line)" strokeWidth="2" /><rect x="220" y="180" width="31" height="10" fill="var(--gold)" /><path d="M259 185h59" stroke="var(--line)" strokeWidth="2" />
      </>}
      {kind === "agent" && <>
        <circle cx="216" cy="142" r="42" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" /><text x="216" y="146" textAnchor="middle" fill="var(--ink)" fontSize="13">Tool loop</text>
        <path d="M258 142h67" {...line} /><rect x="333" y="119" width="75" height="47" rx="3" fill="var(--surface)" stroke="var(--accent)" /><path d="m352 141 10 10 21-23" stroke="var(--accent)" strokeWidth="2" />
        <path d="M333 154h-50v63H216v-27" {...line} /><Document x={66} y={99} /><path d="M140 142h25" {...line} />
        <text x="365" y="190" textAnchor="middle" fill="var(--muted)" fontSize="11">Human approval</text>
      </>}
      {kind === "evaluate" && <>
        <rect x="83" y="70" width="264" height="147" rx="4" fill="var(--surface)" stroke="var(--line)" />
        {[0,1,2].map((n) => <g key={n} transform={`translate(106 ${96+n*38})`}><rect width="16" height="16" fill="var(--surface-2)" stroke="var(--accent)" /><path d="m3 8 4 4 6-8" stroke="var(--accent)" strokeWidth="1.3" /><path d="M31 5h167M31 13h122" stroke="var(--line)" strokeWidth="2" /></g>)}
        <circle cx="348" cy="211" r="25" fill="var(--gold)" /><path d="m336 211 8 8 15-18" stroke="var(--ink)" strokeWidth="2" />
      </>}
    </svg>
  );
}
