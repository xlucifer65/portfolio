const navy = "var(--accent)";
const gold = "var(--gold)";
const line = "var(--line)";
const ink = "var(--ink)";

export function ProjectCoverArt({ slug }: { slug: string }) {
  let art;
  switch (slug) {
    case "eu-ai-act-assistant":
      art = <>
        <path d="M110 42h224l40 40v226H110z" fill="white" stroke={navy} strokeWidth="3" />
        <path d="M334 42v40h40" stroke={navy} strokeWidth="3" />
        <text x="140" y="102" fill={ink} fontSize="24">EU AI Act</text>
        {[135,164,193,222,251].map((y,i)=><g key={y}><rect x="140" y={y-8} width={i===2?184:0} height="17" fill={gold} fillOpacity=".55"/><path d={`M140 ${y}h${i%2?145:184}`} stroke={line} strokeWidth="4" /></g>)}
        <path d="M327 197c55 0 58-71 111-71" stroke={navy} strokeWidth="2" strokeDasharray="4 6" />
        <rect x="433" y="89" width="211" height="161" rx="10" fill="var(--surface-2)" stroke={navy} strokeWidth="2" />
        <text x="456" y="124" fill={ink} fontSize="20">Cited answer</text>
        <path d="M456 153h163M456 176h139M456 199h151" stroke={line} strokeWidth="4" />
        <rect x="456" y="214" width="93" height="20" rx="3" fill={gold}/>
        <text x="539" y="285" textAnchor="middle" fill={navy} fontSize="17">Evidence, then answer</text>
      </>; break;
    case "house-price-mlops":
      art = <>
        <path d="M45 290h630M45 244h630M45 198h630M45 152h630M45 106h630" stroke={line} strokeWidth="1" />
        <path d="M96 285V157l91-82 91 82v128z" fill="var(--surface-2)" stroke={navy} strokeWidth="3" />
        <path d="m74 163 113-102 113 102" stroke={navy} strokeWidth="5" />
        <rect x="128" y="181" width="36" height="36" fill={gold}/><rect x="208" y="181" width="36" height="36" fill={gold}/><path d="M170 285v-49h35v49" stroke={navy} strokeWidth="2" />
        <path d="M350 280V83M350 280h293" stroke={navy} strokeWidth="2" />
        {[ [386,235],[419,200],[456,217],[493,164],[534,128],[575,143],[611,96] ].map(([x,y])=><circle key={x} cx={x} cy={y} r="7" fill={gold} />)}
        <path d="m374 245 245-143" stroke={navy} strokeWidth="3" />
        <text x="360" y="56" fill={ink} fontSize="22">Validated data. Served model.</text>
        <text x="497" y="319" textAnchor="middle" fill={navy} fontSize="17">Illustrative model view</text>
      </>; break;
    case "linkedin-hr-agent":
      art = <>
        <path d="M90 55h176v221H90z" fill="var(--surface-2)" stroke={line} strokeWidth="2" transform="rotate(-9 178 165)" />
        <path d="M116 100h110M116 128h86M116 156h110M116 184h95" stroke={line} strokeWidth="4" transform="rotate(-9 178 165)" />
        <rect x="228" y="32" width="265" height="289" rx="10" fill="white" stroke={navy} strokeWidth="3" />
        <circle cx="258" cy="61" r="10" fill={navy}/><path d="M280 57h105M280 69h66" stroke={line} strokeWidth="4" />
        <rect x="248" y="91" width="225" height="135" fill="var(--surface-2)" />
        <path d="m248 205 76-78 77 99H248z" fill={navy}/><circle cx="423" cy="130" r="25" fill={gold}/>
        <path d="M248 246h224M248 264h184M248 282h205" stroke={line} strokeWidth="4" />
        <circle cx="533" cy="246" r="43" fill={gold}/><path d="m513 246 14 14 27-29" stroke={ink} strokeWidth="4" />
        <text x="540" y="118" textAnchor="middle" fill={ink} fontSize="20">Draft.</text><text x="540" y="147" textAnchor="middle" fill={ink} fontSize="20">Review.</text><text x="540" y="176" textAnchor="middle" fill={ink} fontSize="20">Publish.</text>
      </>; break;
    case "epita-scheduler":
      art = <>
        <rect x="95" y="44" width="530" height="273" rx="9" fill="white" stroke={navy} strokeWidth="3" />
        <path d="M95 101h530M201 101v216M307 101v216M413 101v216M519 101v216M95 155h530M95 209h530M95 263h530" stroke={line} strokeWidth="2" />
        <path d="M143 27v35M577 27v35" stroke={navy} strokeWidth="6" strokeLinecap="round" />
        <text x="360" y="81" textAnchor="middle" fill={ink} fontSize="22">Constraint-based scheduling · Z3</text>
        {[[101,107,94],[313,107,200],[207,161,94],[419,215,200],[101,269,200]].map(([x,y,w])=><rect key={`${x}-${y}`} x={x} y={y} width={w} height="42" rx="4" fill={navy} />)}
        <rect x="525" y="161" width="94" height="42" rx="4" fill={gold}/>
      </>; break;
    case "valeurs-foncieres":
      art = <>
        <path d="m172 77 85-41 90 17 56 66-17 54 32 62-68 78-115-18-66-91 22-52z" fill="var(--surface-2)" stroke={navy} strokeWidth="3" />
        <path d="m172 135 155 36 70 64M257 36l16 166-38 93" stroke={line} strokeWidth="2" />
        {[[270,102],[330,168],[218,218],[353,251],[293,267],[202,137]].map(([x,y],i)=><g key={x}><circle cx={x} cy={y} r={i%2?14:9} fill={gold} fillOpacity=".65"/><circle cx={x} cy={y} r="3" fill={navy}/></g>)}
        <text x="468" y="98" fill={ink} fontSize="21">French property</text><text x="468" y="125" fill={ink} fontSize="21">transactions</text>
        <path d="M468 154h161M468 193h161M468 232h161M468 271h161M505 154v117M568 154v117" stroke={line} strokeWidth="2" />
        <rect x="507" y="195" width="59" height="35" fill={gold} fillOpacity=".5" />
        <text x="85" y="321" fill={navy} fontSize="17">Clean, merge, explore</text>
      </>; break;
    default:
      art = <>
        <path d="M92 95 360 24l268 71-268 72z" fill="var(--surface-2)" stroke={navy} strokeWidth="3" />
        <path d="m92 95 268 72v64L92 159z" fill="white" stroke={navy} strokeWidth="3" /><path d="m360 167 268-72v64l-268 72z" fill={navy}/>
        <path d="m92 183 268 72 268-72v52l-268 72-268-72z" fill="var(--surface-2)" stroke={navy} strokeWidth="3" />
        <path d="m92 259 268 72 268-72" stroke={navy} strokeWidth="3" />
        <text x="360" y="104" textAnchor="middle" fill={ink} fontSize="24">RAG starter kit</text>
        <text x="221" y="170" textAnchor="middle" fill={ink} fontSize="17" transform="rotate(15 221 170)">Retrieval + citations</text>
        <text x="490" y="189" textAnchor="middle" fill="white" fontSize="17" transform="rotate(-15 490 189)">pgvector</text>
        <rect x="45" y="265" width="177" height="46" rx="5" fill={gold}/><text x="133" y="294" textAnchor="middle" fill={ink} fontSize="18">DeepEval · CI</text>
      </>;
  }
  return <svg viewBox="0 0 720 350" fill="none" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif" aria-hidden="true" focusable="false" className="h-auto w-full">{art}</svg>;
}
