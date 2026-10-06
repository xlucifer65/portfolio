const navy = "var(--accent)";
const gold = "var(--gold)";
const line = "var(--line)";

export function ProjectStepArt({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 460 300" fill="none" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" aria-hidden="true" focusable="false" className="h-auto w-full">
      <path d="M35 250h390" stroke={line} strokeDasharray="2 8" />
      {kind === "documents" && <>
        <path d="M66 79h89l19 19v112H66z" fill="white" stroke={line} strokeWidth="2" /><path d="M83 61h89l19 19v112H83z" fill="white" stroke={navy} strokeWidth="2" /><path d="M100 101h67M100 118h67M100 135h52M100 152h63" stroke={line} strokeWidth="3" />
        <path d="M212 137h37m-7-6 7 6-7 6" stroke={navy} strokeWidth="2" />
        {[0,1,2].map(n=><g key={n} transform={`translate(273 ${68+n*49})`}><rect width="123" height="34" rx="3" fill="white" stroke={line} /><rect x="10" y="10" width="14" height="14" fill={n===1?gold:"var(--surface-2)"} /><path d="M34 12h74M34 22h55" stroke={line} strokeWidth="2" /></g>)}
      </>}
      {kind === "data" && <>
        <rect x="90" y="59" width="196" height="167" rx="5" fill="white" stroke={navy} strokeWidth="2" />
        {Array.from({length:20},(_,i)=><rect key={i} x={111+(i%5)*31} y={80+Math.floor(i/5)*35} width="18" height="18" rx="2" fill={i===7||i===12?gold:"var(--surface-2)"} stroke={line} />)}
        <circle cx="310" cy="158" r="45" fill="white" stroke={navy} strokeWidth="3" /><path d="m340 193 43 42" stroke={navy} strokeWidth="8" strokeLinecap="round" /><path d="M290 151h40M290 166h30" stroke={line} strokeWidth="3" />
      </>}
      {kind === "contract" && <>
        <rect x="102" y="58" width="234" height="173" rx="5" fill="white" stroke={navy} strokeWidth="2" />
        {[0,1,2].map(n=><g key={n} transform={`translate(126 ${85+n*47})`}><rect width="20" height="20" rx="2" fill="var(--surface-2)" stroke={navy} /><path d="m4 10 5 5 8-10" stroke={navy} strokeWidth="2" /><path d="M37 6h138M37 16h108" stroke={line} strokeWidth="3" /></g>)}
        <circle cx="337" cy="225" r="26" fill={gold} /><path d="m324 224 9 9 17-19" stroke="var(--ink)" strokeWidth="3" />
      </>}
      {kind === "alert" && <>
        <rect x="53" y="78" width="138" height="126" rx="5" fill="white" stroke={line} /><path d="M70 107h104M70 129h104M70 151h86M70 173h97" stroke={line} strokeWidth="3" /><path d="M211 140h43m-7-6 7 6-7 6" stroke={navy} strokeWidth="2" />
        <path d="M304 180h88l-12-18v-44a32 32 0 0 0-64 0v44z" fill="white" stroke={navy} strokeWidth="2.5" /><path d="M336 194a13 13 0 0 0 25 0M348 78v-8" stroke={navy} strokeWidth="2.5" /><circle cx="385" cy="93" r="18" fill={gold} /><path d="M385 84v10M385 100v2" stroke="var(--ink)" strokeWidth="2.5" />
      </>}
      {kind === "service" && <>
        {[0,1,2].map(n=><g key={n} transform={`translate(77 ${54+n*60})`}><rect width="296" height="45" rx="4" fill="white" stroke={navy} strokeWidth="1.5" /><circle cx="19" cy="23" r="5" fill={n===1?gold:navy} /><path d="M38 16h100M38 29h71" stroke={line} strokeWidth="3" /><path d="M241 16v13M253 16v13M265 16v13" stroke={navy} strokeWidth="2" /></g>)}
      </>}
      {kind === "containers" && <>
        {[0,1,2].map(n=><g key={n} transform={`translate(${102+n*74} ${80+n*23})`}><path d="m0 19 37-19 37 19-37 19z" fill={n===1?gold:"white"} stroke={navy} strokeWidth="1.8" /><path d="M0 19v65l37 20 37-20V19L37 38zM37 38v66" fill="white" stroke={navy} strokeWidth="1.8" /></g>)}
      </>}
      {kind === "image" && <>
        <rect x="94" y="60" width="266" height="174" rx="6" fill="white" stroke={navy} strokeWidth="2" /><rect x="109" y="75" width="236" height="127" rx="3" fill="var(--surface-2)" /><path d="m109 202 86-90 96 90z" fill={navy} /><path d="m204 202 75-64 66 64z" fill={navy} fillOpacity=".45" /><circle cx="301" cy="104" r="19" fill={gold} /><path d="M111 218h124" stroke={line} strokeWidth="3" />
      </>}
      {kind === "review" && <>
        <rect x="113" y="50" width="207" height="187" rx="6" fill="white" stroke={navy} strokeWidth="2" /><path d="M134 79h122M134 104h163M134 124h147M134 144h161M134 164h112" stroke={line} strokeWidth="3" /><rect x="134" y="190" width="64" height="15" rx="2" fill={gold} /><circle cx="326" cy="213" r="32" fill={gold} /><path d="m311 212 10 11 23-25" stroke="var(--ink)" strokeWidth="3" />
      </>}
    </svg>
  );
}
