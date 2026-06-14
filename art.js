/* =========================================================
   Orenj — illustrated art kit (hand-built SVG)
   Pip the citrus sprite, audience characters, scenery.
   All vector, animation-studio styling via gradients +
   layered shapes. No external images.
   ========================================================= */
"use strict";

const ART = {};

/* ---------- Pip: the guide character ---------- */
/* A round little orange sprite with a leaf sprout, big
   expressive eyes and rosy cheeks. mood drives eyes+mouth. */
ART.pip = function (mood = "happy") {
  let eyes, mouth, brows = "", extra = "";

  const eyeWhite = (cx) => `<ellipse cx="${cx}" cy="98" rx="17" ry="20" fill="#fffdf7"/>`;
  const sparkle = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="3.4" fill="#fff"/>`;

  switch (mood) {
    case "cheer":
      eyes = `
        <path d="M55 100 q14 -20 28 0" stroke="#3a2412" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M117 100 q14 -20 28 0" stroke="#3a2412" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      mouth = `<path d="M74 128 q26 34 52 0 q-26 14 -52 0Z" fill="#7a2e1e"/>
               <path d="M88 140 q12 10 24 0Z" fill="#ff7a8a"/>`;
      extra = `<g class="pip-spark">
                 <path d="M30 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4Z" fill="#ffe66d"/>
                 <path d="M168 70 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" fill="#fff4b0"/>
               </g>`;
      break;
    case "wow":
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="72" cy="100" r="9" fill="#2a1a10"/>
              <circle cx="132" cy="100" r="9" fill="#2a1a10"/>
              ${sparkle(75, 95)}${sparkle(135, 95)}`;
      mouth = `<ellipse cx="100" cy="132" rx="16" ry="19" fill="#7a2e1e"/>
               <ellipse cx="100" cy="140" rx="9" ry="8" fill="#ff7a8a"/>`;
      brows = `<path d="M52 70 q18 -8 34 -2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/>
               <path d="M114 68 q18 -6 34 2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      break;
    case "think":
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="74" cy="92" r="8" fill="#2a1a10"/>
              <circle cx="134" cy="92" r="8" fill="#2a1a10"/>
              ${sparkle(77, 88)}${sparkle(137, 88)}`;
      mouth = `<path d="M82 134 q18 -6 34 2" stroke="#7a2e1e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      brows = `<path d="M52 74 q18 -10 32 -2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      extra = `<text x="150" y="56" font-size="34" class="pip-think">?</text>`;
      break;
    case "encourage":
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="71" cy="100" r="8" fill="#2a1a10"/>
              <circle cx="131" cy="100" r="8" fill="#2a1a10"/>
              ${sparkle(74, 96)}${sparkle(134, 96)}`;
      mouth = `<path d="M78 130 q22 16 44 0" stroke="#7a2e1e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      break;
    default: // happy
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="72" cy="101" r="9" fill="#2a1a10"/>
              <circle cx="132" cy="101" r="9" fill="#2a1a10"/>
              ${sparkle(75, 96)}${sparkle(135, 96)}`;
      mouth = `<path d="M76 126 q24 24 48 0" stroke="#7a2e1e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }

  return `
  <svg class="pip mood-${mood}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="pipBody" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stop-color="#ffd27a"/>
        <stop offset="42%" stop-color="#ff9f29"/>
        <stop offset="100%" stop-color="#ec6a00"/>
      </radialGradient>
      <linearGradient id="pipLeaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#7ed957"/>
        <stop offset="100%" stop-color="#2f9e44"/>
      </linearGradient>
    </defs>
    <ellipse class="pip-shadow" cx="100" cy="206" rx="52" ry="10" fill="rgba(40,20,0,.25)"/>
    <g class="pip-body">
      <!-- sprout -->
      <path d="M100 34 C96 8 78 6 70 14 C84 16 90 28 96 40Z" fill="url(#pipLeaf)"/>
      <path d="M100 36 C104 10 124 6 132 16 C116 18 110 30 104 42Z" fill="url(#pipLeaf)"/>
      <rect x="96" y="34" width="8" height="20" rx="4" fill="#3f7d2f"/>
      <!-- body -->
      <circle cx="100" cy="118" r="80" fill="url(#pipBody)"/>
      <circle cx="100" cy="118" r="80" fill="none" stroke="#c85700" stroke-width="2.5" opacity=".5"/>
      <!-- dimple texture -->
      <g fill="#e8720a" opacity=".25">
        <circle cx="60" cy="150" r="3"/><circle cx="140" cy="150" r="3"/>
        <circle cx="100" cy="178" r="3"/><circle cx="48" cy="110" r="3"/><circle cx="152" cy="112" r="3"/>
      </g>
      <!-- arms -->
      <path class="pip-arm-l" d="M28 132 q-18 6 -22 26 q14 -6 26 -10Z" fill="#ef7a00"/>
      <path class="pip-arm-r" d="M172 132 q18 6 22 26 q-14 -6 -26 -10Z" fill="#ef7a00"/>
      <!-- feet -->
      <ellipse cx="74" cy="196" rx="16" ry="9" fill="#d96200"/>
      <ellipse cx="126" cy="196" rx="16" ry="9" fill="#d96200"/>
      <!-- cheeks -->
      <ellipse cx="58" cy="122" rx="13" ry="9" fill="#ff7a8a" opacity=".55"/>
      <ellipse cx="142" cy="122" rx="13" ry="9" fill="#ff7a8a" opacity=".55"/>
      ${brows}${eyes}${mouth}
    </g>
    ${extra}
  </svg>`;
};

/* ---------- Audience characters (circular portrait) ---------- */
ART.audience = function (kind = "abstract") {
  const frame = (inner, bg, ring) => `
    <svg class="aud" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="audClip"><circle cx="100" cy="100" r="92"/></clipPath>
        ${bg}
      </defs>
      <circle cx="100" cy="100" r="96" fill="${ring}"/>
      <g clip-path="url(#audClip)">${inner}</g>
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3"/>
    </svg>`;

  switch (kind) {
    case "alien":
      return frame(`
        <radialGradient id="agA" cx="50%" cy="30%" r="80%"><stop offset="0%" stop-color="#3b2f6b"/><stop offset="100%" stop-color="#140e2e"/></radialGradient>
        <rect width="200" height="200" fill="url(#agA)"/>
        <g fill="#fff"><circle cx="40" cy="44" r="2"/><circle cx="160" cy="38" r="2.4"/><circle cx="150" cy="150" r="1.8"/><circle cx="56" cy="150" r="2"/><circle cx="100" cy="30" r="1.6"/></g>
        <ellipse cx="100" cy="120" rx="46" ry="52" fill="#76e0a1"/>
        <ellipse cx="100" cy="106" rx="52" ry="46" fill="#8af0b3"/>
        <path d="M78 64 q-8 -34 6 -42" stroke="#8af0b3" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M122 64 q8 -34 -6 -42" stroke="#8af0b3" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="80" cy="56" r="5" fill="#bdf7ce"/><circle cx="120" cy="56" r="5" fill="#bdf7ce"/>
        <ellipse cx="82" cy="104" rx="14" ry="20" fill="#10131f" transform="rotate(-12 82 104)"/>
        <ellipse cx="118" cy="104" rx="14" ry="20" fill="#10131f" transform="rotate(12 118 104)"/>
        <circle cx="86" cy="96" r="4" fill="#fff"/><circle cx="122" cy="96" r="4" fill="#fff"/>
        <path d="M86 138 q14 10 28 0" stroke="#2f8f5b" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        "", "#2a2150");
    case "robot":
      return frame(`
        <linearGradient id="agR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c4a5a"/><stop offset="100%" stop-color="#0b2530"/></linearGradient>
        <rect width="200" height="200" fill="url(#agR)"/>
        <rect x="92" y="22" width="16" height="22" rx="6" fill="#7fd3e6"/><circle cx="100" cy="20" r="7" fill="#ffe66d"/>
        <rect x="52" y="56" width="96" height="92" rx="20" fill="#c9d6dd"/>
        <rect x="52" y="56" width="96" height="92" rx="20" fill="none" stroke="#8aa0ab" stroke-width="3"/>
        <rect x="64" y="78" width="72" height="40" rx="10" fill="#10242c"/>
        <rect x="74" y="90" width="16" height="16" rx="4" fill="#5ee0ff" class="bot-eye"/>
        <rect x="110" y="90" width="16" height="16" rx="4" fill="#5ee0ff" class="bot-eye"/>
        <g stroke="#5b6f78" stroke-width="4" stroke-linecap="round"><line x1="72" y1="132" x2="80" y2="132"/><line x1="90" y1="132" x2="98" y2="132"/><line x1="108" y1="132" x2="116" y2="132"/><line x1="126" y1="132" x2="134" y2="132"/></g>`,
        "", "#10343f");
    case "animal":
      return frame(`
        <linearGradient id="agAn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd9a0"/><stop offset="100%" stop-color="#f6a14f"/></linearGradient>
        <rect width="200" height="200" fill="url(#agAn)"/>
        <path d="M52 70 L40 30 L82 58Z" fill="#d9772e"/><path d="M148 70 L160 30 L118 58Z" fill="#d9772e"/>
        <ellipse cx="100" cy="116" rx="56" ry="50" fill="#f08a3c"/>
        <ellipse cx="100" cy="138" rx="38" ry="34" fill="#fff1dc"/>
        <circle cx="80" cy="104" r="9" fill="#2a1a10"/><circle cx="120" cy="104" r="9" fill="#2a1a10"/>
        <circle cx="83" cy="101" r="3" fill="#fff"/><circle cx="123" cy="101" r="3" fill="#fff"/>
        <path d="M92 126 q8 8 16 0Z" fill="#2a1a10"/>
        <path d="M100 134 v8 M100 142 q-10 8 -20 4 M100 142 q10 8 20 4" stroke="#a9622c" stroke-width="3" fill="none" stroke-linecap="round"/>`,
        "", "#c9742e");
    case "fish":
      return frame(`
        <linearGradient id="agF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2aa6c9"/><stop offset="100%" stop-color="#0e5f80"/></linearGradient>
        <rect width="200" height="200" fill="url(#agF)"/>
        <g fill="#bfe9f5" opacity=".5"><circle cx="40" cy="50" r="6"/><circle cx="58" cy="34" r="4"/><circle cx="150" cy="150" r="5"/><circle cx="168" cy="120" r="3"/></g>
        <path d="M150 100 l34 -24 v48Z" fill="#ff9f4a"/>
        <ellipse cx="92" cy="104" rx="58" ry="44" fill="#ffb84d"/>
        <path d="M70 64 q24 -18 44 0Z" fill="#ff9f4a"/>
        <circle cx="74" cy="98" r="13" fill="#fff"/><circle cx="76" cy="100" r="7" fill="#1a2a30"/><circle cx="79" cy="96" r="2.5" fill="#fff"/>
        <path d="M40 110 q-12 6 0 14" stroke="#e07c1f" stroke-width="5" fill="none" stroke-linecap="round"/>`,
        "", "#0c4a63");
    case "ancient":
      return frame(`
        <linearGradient id="agK" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#caa46a"/><stop offset="100%" stop-color="#8a6a3a"/></linearGradient>
        <rect width="200" height="200" fill="url(#agK)"/>
        <path d="M64 60 q36 -30 72 0 v18 H64Z" fill="#b5bcc4"/>
        <rect x="64" y="74" width="72" height="78" rx="14" fill="#cdd4db"/>
        <rect x="96" y="60" width="8" height="56" fill="#aab2ba"/>
        <path d="M98 36 l6 0 4 22 -14 0Z" fill="#e23b3b"/>
        <rect x="72" y="104" width="22" height="14" rx="4" fill="#10131a"/>
        <rect x="106" y="104" width="22" height="14" rx="4" fill="#10131a"/>
        <path d="M86 138 q14 8 28 0" stroke="#6a4f2a" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        "", "#7a5c30");
    case "child":
      return frame(`
        <radialGradient id="agC" cx="50%" cy="35%" r="80%"><stop offset="0%" stop-color="#ffe6c2"/><stop offset="100%" stop-color="#ffd29e"/></radialGradient>
        <rect width="200" height="200" fill="#ffefd6"/>
        <circle cx="100" cy="112" r="62" fill="url(#agC)"/>
        <path d="M44 96 q4 -56 56 -58 q52 2 56 58 q-18 -28 -56 -28 q-38 0 -56 28Z" fill="#7a4a22"/>
        <circle cx="76" cy="110" r="10" fill="#2a1a10"/><circle cx="124" cy="110" r="10" fill="#2a1a10"/>
        <circle cx="79" cy="106" r="3.5" fill="#fff"/><circle cx="127" cy="106" r="3.5" fill="#fff"/>
        <ellipse cx="64" cy="128" rx="11" ry="8" fill="#ff9aa8" opacity=".6"/><ellipse cx="136" cy="128" rx="11" ry="8" fill="#ff9aa8" opacity=".6"/>
        <path d="M80 136 q20 22 40 0" stroke="#9c3b2e" stroke-width="6" fill="none" stroke-linecap="round"/>`,
        "", "#f2c48c");
    default: // abstract — a swirling idea
      return frame(`
        <radialGradient id="agX" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#3a2c66"/><stop offset="100%" stop-color="#160f2c"/></radialGradient>
        <rect width="200" height="200" fill="url(#agX)"/>
        <g class="abstract-swirl">
          <path d="M100 100 m-58 0 a58 58 0 1 1 116 0" stroke="#ff8c1a" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>
          <path d="M100 100 m-38 0 a38 38 0 1 0 76 0" stroke="#b98aff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>
          <path d="M100 100 m-18 0 a18 18 0 1 1 36 0" stroke="#5ab1ff" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>
        <g fill="#fff"><circle cx="100" cy="100" r="5"/><circle cx="44" cy="60" r="2"/><circle cx="156" cy="140" r="2"/></g>`,
        "", "#241a44");
  }
};

/* ---------- decorative silhouettes for the world ---------- */
ART.mountainLayer = function (fill) {
  return `<svg viewBox="0 0 1000 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 240 L0 150 L120 60 L220 140 L340 40 L470 150 L600 70 L740 160 L860 80 L1000 150 L1000 240Z" fill="${fill}"/>
  </svg>`;
};
ART.hillLayer = function (fill) {
  return `<svg viewBox="0 0 1000 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 200 L0 120 Q250 40 500 120 T1000 120 L1000 200Z" fill="${fill}"/>
  </svg>`;
};
ART.cloud = function () {
  return `<svg viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
    <g fill="rgba(255,255,255,.85)"><ellipse cx="60" cy="55" rx="46" ry="28"/><ellipse cx="110" cy="45" rx="54" ry="34"/><ellipse cx="150" cy="58" rx="40" ry="24"/></g>
  </svg>`;
};

/* ---------- full illustrated scenes (Paper Citrus Co.) ----------
   Returns SVG + texture overlays for an exercise hero banner.
   Classes/keyframes are all "og-" prefixed (see style.css) so they
   never collide with the rest of the app's animations.            */
ART.scene = function (name) {
  if (name !== "orange-grove") return "";

  const PAL = {
    skyTop:"#FCEBCB", skyBot:"#FAD9A6",
    hillBack:"#9FC08A", hillFront:"#7FA968", groundBack:"#8FAE77", groundFront:"#6E9A56", groundEdge:"#5C8A46",
    bark:"#A6663A", barkDark:"#824D2A", barkLight:"#BE7E4E",
    leafA:"#5C9440", leafB:"#3F7A33", leafC:"#7BAE5E", leafHi:"#9CC46A", teal:"#2E8B8B",
    orange:"#E2622B", orangeDk:"#C24A18", coral:"#F3996B", spec:"#FBD089", cap:"#4E8B3A",
    cloud:"#FBF1DE", sun:"#E9B949", sunCore:"#F6D27A", ink:"#20304A", misprint:"#FF5DA0",
  };
  const f = (n) => n.toFixed(1);
  function rng(seed){let s=seed%2147483647;if(s<=0)s+=2147483646;return()=>(s=s*16807%2147483647)/2147483647;}
  function blob(cx,cy,r,wob,pts,rand){
    let d="";
    for(let i=0;i<pts;i++){
      const a=(i/pts)*Math.PI*2, rr=r*(1-wob/2+rand()*wob);
      const x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr*0.92;
      if(i===0){d=`M ${x.toFixed(1)} ${y.toFixed(1)}`;}
      else{const pa=((i-0.5)/pts)*Math.PI*2, prr=r*(1-wob/2+rand()*wob);
        const mx=cx+Math.cos(pa)*prr*1.04, my=cy+Math.sin(pa)*prr*0.96;
        d+=` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;}
    }
    return d+" Z";
  }
  function orangeShapes(r){return `
    <circle cx="0" cy="0" r="${f(r)}" fill="${PAL.orange}"/>
    <ellipse cx="${f(r*0.32)}" cy="${f(r*0.4)}" rx="${f(r*0.6)}" ry="${f(r*0.52)}" fill="${PAL.orangeDk}" opacity=".5"/>
    <ellipse cx="${f(-r*0.3)}" cy="${f(-r*0.34)}" rx="${f(r*0.5)}" ry="${f(r*0.38)}" fill="${PAL.coral}"/>
    <ellipse cx="${f(-r*0.4)}" cy="${f(-r*0.44)}" rx="${f(r*0.2)}" ry="${f(r*0.14)}" fill="${PAL.spec}"/>
    <circle cx="0" cy="${f(r*0.82)}" r="${f(r*0.1)}" fill="${PAL.orangeDk}"/>
    <rect x="-1.6" y="${f(-r-4)}" width="3.2" height="7" rx="1.6" fill="${PAL.barkDark}"/>
    <path d="M1 ${f(-r-1)} q 11 -9 20 -2 q -8 9 -20 4 Z" fill="${PAL.cap}"/>
    <path d="M3 ${f(-r-1)} H 17" stroke="${PAL.leafB}" stroke-width="1.1" opacity=".6"/>`;}
  function blossom(x,y,sc){return `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${sc.toFixed(2)})">
    <g fill="#FFF6EA"><circle cx="0" cy="-5" r="3.6"/><circle cx="5" cy="-1" r="3.6"/><circle cx="3" cy="5" r="3.6"/><circle cx="-3" cy="5" r="3.6"/><circle cx="-5" cy="-1" r="3.6"/></g>
    <circle r="2.1" fill="${PAL.spec}"/></g>`;}
  const orange=(x,y,r,delay)=>`<g transform="translate(${f(x)} ${f(y)})"><g class="og-orange" style="animation-delay:${delay}s">${orangeShapes(r)}</g></g>`;

  const R = rng(7);
  let s = "";

  s+=`<defs>
    <linearGradient id="ogSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${PAL.skyTop}"/><stop offset="100%" stop-color="${PAL.skyBot}"/></linearGradient>
    <radialGradient id="ogSunGlow" cx="81%" cy="16%" r="58%"><stop offset="0%" stop-color="#FFEAB0" stop-opacity=".6"/><stop offset="62%" stop-color="#FFEAB0" stop-opacity="0"/></radialGradient>
    <filter id="ogDropBig" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="9" stdDeviation="8" flood-color="${PAL.ink}" flood-opacity=".16"/></filter>
    <filter id="ogDropMid" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="${PAL.ink}" flood-opacity=".18"/></filter>
    <filter id="ogDropSm" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="2.5" stdDeviation="2" flood-color="${PAL.ink}" flood-opacity=".22"/></filter>
  </defs>`;

  s+=`<rect width="1000" height="690" fill="url(#ogSky)"/><rect width="1000" height="690" fill="url(#ogSunGlow)"/>`;

  /* sun */
  const sx=812, sy=128;
  s+=`<g filter="url(#ogDropMid)" transform="translate(${sx} ${sy})">
    <circle cx="5" cy="5" r="62" fill="${PAL.coral}" opacity=".35"/><g class="og-rays">`;
  for(let i=0;i<12;i++){const a=i*30*Math.PI/180;
    s+=`<path d="M ${(Math.cos(a)*70).toFixed(1)} ${(Math.sin(a)*70).toFixed(1)} L ${(Math.cos(a+0.13)*104).toFixed(1)} ${(Math.sin(a+0.13)*104).toFixed(1)} L ${(Math.cos(a-0.13)*104).toFixed(1)} ${(Math.sin(a-0.13)*104).toFixed(1)} Z" fill="${PAL.sun}"/>`;}
  s+=`</g><g class="og-sun"><circle r="60" fill="${PAL.sun}"/><circle r="60" fill="none" stroke="${PAL.sunCore}" stroke-width="7" opacity=".7"/><circle r="40" fill="${PAL.sunCore}"/><circle cx="-16" cy="-14" r="9" fill="#FFE9B0" opacity=".8"/></g></g>`;

  /* clouds + birds */
  const cloud=(scale,top,dur,delay,op)=>`<g transform="translate(0 ${top})"><g class="og-cloud" style="animation-duration:${dur}s;animation-delay:${delay}s">
     <g filter="url(#ogDropSm)" transform="scale(${scale})" opacity="${op}"><ellipse cx="60" cy="36" rx="46" ry="26" fill="${PAL.cloud}"/><ellipse cx="104" cy="26" rx="40" ry="30" fill="${PAL.cloud}"/><ellipse cx="146" cy="38" rx="38" ry="22" fill="${PAL.cloud}"/><rect x="20" y="48" width="150" height="20" rx="10" fill="${PAL.cloud}"/></g></g></g>`;
  s+=cloud(1,70,46,-6,.95)+cloud(.7,150,62,-30,.8)+cloud(.85,40,54,-44,.55);
  s+=`<g transform="translate(0 116)"><g class="og-bird"><g transform="scale(.78)"><path class="og-birdwing" d="M0 0 q-22 -16 -40 -6 q22 4 40 6Z" fill="${PAL.ink}"/><path d="M0 0 q22 -16 40 -6 q-22 4 -40 6Z" fill="${PAL.ink}"/></g></g></g>`;
  const mbird=(x,y,sc)=>`<g transform="translate(${x} ${y}) scale(${sc})" opacity=".6"><path d="M0 0 q-10 -9 -19 -3 M0 0 q10 -9 19 -3" stroke="${PAL.ink}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
  s+=mbird(606,92,0.95)+mbird(648,112,0.75);

  /* hills + ground */
  s+=`<g filter="url(#ogDropMid)"><path d="M0 470 Q 250 380 520 452 T 1000 440 L1000 690 L0 690Z" fill="${PAL.hillBack}"/></g>`;
  s+=`<g filter="url(#ogDropMid)"><path d="M0 520 Q 320 452 640 512 T 1000 508 L1000 690 L0 690Z" fill="${PAL.hillFront}"/></g>`;
  s+=`<g transform="translate(150 470)" opacity=".9"><rect x="-6" y="-6" width="12" height="40" rx="4" fill="${PAL.barkDark}"/><circle cx="0" cy="-26" r="34" fill="${PAL.leafB}"/><circle cx="-18" cy="-12" r="24" fill="${PAL.leafA}"/><circle cx="18" cy="-14" r="22" fill="${PAL.leafA}"/></g>`;
  s+=`<path d="M0 560 Q 500 520 1000 560 L1000 690 L0 690Z" fill="${PAL.groundBack}"/>`;
  s+=`<path d="M0 600 Q 500 568 1000 600 L1000 690 L0 690Z" fill="${PAL.groundFront}"/>`;
  s+=`<path d="M0 600 Q 500 568 1000 600 L1000 612 Q 500 580 0 612Z" fill="${PAL.groundEdge}" opacity=".6"/>`;

  /* tree */
  const tx=410;
  s+=`<ellipse cx="${tx+6}" cy="640" rx="186" ry="28" fill="${PAL.ink}" opacity=".12"/>`;
  s+=`<g filter="url(#ogDropBig)">
    <path d="M${tx-44} 622 Q ${tx-72} 612 ${tx-92} 626 Q ${tx-60} 610 ${tx-38} 596 Z" fill="${PAL.barkDark}"/>
    <path d="M${tx+40} 620 Q ${tx+74} 612 ${tx+98} 628 Q ${tx+62} 610 ${tx+36} 596 Z" fill="${PAL.barkDark}"/>
    <path d="M${tx-42} 626 C ${tx-50} 520, ${tx-30} 430, ${tx-26} 360 L ${tx+30} 360 C ${tx+34} 430, ${tx+52} 540, ${tx+42} 626 Z" fill="${PAL.bark}"/>
    <path d="M${tx-26} 360 C ${tx-30} 430, ${tx-46} 540, ${tx-38} 626 L ${tx-16} 626 C ${tx-20} 520, ${tx-12} 430, ${tx-12} 360 Z" fill="${PAL.barkLight}" opacity=".55"/>
    <g stroke="${PAL.barkDark}" stroke-width="3" stroke-linecap="round" opacity=".45" fill="none"><path d="M${tx-10} 470 q5 18 0 42"/><path d="M${tx+12} 504 q-3 16 0 36"/><path d="M${tx} 408 q4 14 0 30"/></g>
  </g>`;

  s+=`<g class="og-canopy">`;
  s+=`<g stroke="${PAL.bark}" stroke-width="18" stroke-linecap="round" fill="none" filter="url(#ogDropMid)"><path d="M${tx} 372 C ${tx-34} 320 ${tx-94} 300 ${tx-150} 272"/><path d="M${tx} 372 C ${tx+34} 320 ${tx+94} 296 ${tx+150} 264"/><path d="M${tx} 366 C ${tx-6} 300 ${tx-10} 250 ${tx-8} 198"/></g>`;
  const masses=[
    [tx-130,250,118,PAL.leafB],[tx+130,238,120,PAL.leafB],[tx,166,142,PAL.leafB],
    [tx-70,300,106,PAL.leafA],[tx+78,296,110,PAL.leafA],[tx-160,316,88,PAL.leafA],[tx+168,310,88,PAL.leafA],[tx,252,130,PAL.leafA],
    [tx-92,360,74,PAL.leafA],[tx+96,356,76,PAL.leafA],[tx,360,90,PAL.leafB],
    [tx-60,210,84,PAL.leafC],[tx+70,206,82,PAL.leafC],[tx,150,78,PAL.leafC],[tx-150,260,64,PAL.leafB],[tx+158,256,60,PAL.leafA],
  ];
  s+=`<g filter="url(#ogDropBig)">`;
  masses.forEach((m,i)=>{ s+=`<path d="${blob(m[0],m[1],m[2],0.28,11,rng(11+i*3))}" fill="${m[3]}"/>`; });
  s+=`</g>`;
  const hi=[[tx+60,150,46],[tx+120,196,38],[tx-4,118,40],[tx+150,250,30],[tx-70,180,30]];
  s+=`<g fill="${PAL.leafHi}" opacity=".7">`;
  hi.forEach((h,i)=>{ s+=`<path d="${blob(h[0],h[1],h[2],0.3,9,rng(40+i*5))}"/>`; });
  s+=`</g>`;
  const ocx=tx, ocy=250, oax=200, oay=150, oranges=[]; let tries=0;
  while(oranges.length<13 && tries<700){
    tries++;
    const a=R()*6.283, rad=Math.sqrt(R());
    const x=ocx+Math.cos(a)*oax*rad, y=ocy+Math.sin(a)*oay*rad;
    if(y>ocy+112) continue;
    const r=15+R()*6;
    if(oranges.some(o=>Math.hypot(o.x-x,o.y-y) < o.r+r+12)) continue;
    oranges.push({x,y,r,d:(R()*3).toFixed(2)});
  }
  oranges.forEach(o=>{ s+=`<ellipse cx="${(o.x+3).toFixed(1)}" cy="${(o.y+6).toFixed(1)}" rx="${(o.r*0.95).toFixed(1)}" ry="${(o.r*0.72).toFixed(1)}" fill="${PAL.leafB}" opacity=".45"/>`; });
  for(let i=0;i<9;i++){const a=R()*6.283, rad=Math.sqrt(R());
    const bx=ocx+Math.cos(a)*oax*0.95*rad, by=ocy+Math.sin(a)*oay*0.92*rad;
    if(by>ocy+96) continue; s+=blossom(bx,by,0.7+R()*0.4);}
  oranges.forEach(o=> s+=orange(o.x,o.y,o.r,o.d));
  s+=`</g>`;

  s+=`<g transform="translate(${tx+150} 300)"><g class="og-fall">${orangeShapes(20)}</g></g>`;

  const leaf=(x,y,delay,fill)=>`<g transform="translate(${x} ${y})"><g class="og-leaf" style="animation-delay:${delay}s"><path d="M0 0 q14 -10 26 0 q-12 12 -26 0Z" fill="${fill}"/><path d="M3 0 H22" stroke="${PAL.leafB}" stroke-width="1.5"/></g></g>`;
  s+=leaf(tx+120,250,0,PAL.leafA)+leaf(tx-100,230,2.4,PAL.leafC)+leaf(tx+40,200,4.8,PAL.leafA)+leaf(tx-160,280,3.5,PAL.leafA);

  s+=`<g filter="url(#ogDropSm)">`+orange(tx-150,632,18,"1.2")+orange(tx+210,640,16,"2.1")+orange(tx+250,628,14,"0.4")+`</g>`;
  s+=`<g filter="url(#ogDropMid)" transform="translate(700 600)"><rect x="0" y="0" width="120" height="62" rx="8" fill="${PAL.bark}"/><rect x="0" y="0" width="120" height="62" rx="8" fill="none" stroke="${PAL.barkDark}" stroke-width="4"/><line x1="0" y1="21" x2="120" y2="21" stroke="${PAL.barkDark}" stroke-width="4"/><line x1="40" y1="0" x2="40" y2="62" stroke="${PAL.barkDark}" stroke-width="3" opacity=".6"/><line x1="80" y1="0" x2="80" y2="62" stroke="${PAL.barkDark}" stroke-width="3" opacity=".6"/></g>`;
  s+=orange(722,596,17,"0.7")+orange(756,590,17,"1.5")+orange(790,596,17,"0.2")+orange(740,580,16,"1.9");

  for(let i=0;i<26;i++){
    const gx=20+i*38+R()*16, gy=636+R()*30, h=18+R()*22, col=[PAL.groundEdge,PAL.leafB,PAL.groundFront][i%3];
    s+=`<g transform="translate(${gx.toFixed(0)} ${gy.toFixed(0)})"><g class="og-grass" style="animation-delay:${(R()*4).toFixed(2)}s"><path d="M0 0 Q -4 -${h} -10 -${h+4}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M0 0 Q 0 -${h+6} 2 -${h+10}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M0 0 Q 5 -${h} 12 -${h+2}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>`;
  }
  const flower=(x,y,c)=>`<g transform="translate(${x} ${y})"><g fill="${c}"><circle cx="0" cy="-6" r="4"/><circle cx="6" cy="0" r="4"/><circle cx="-6" cy="0" r="4"/><circle cx="0" cy="6" r="4"/></g><circle r="3.4" fill="${PAL.spec}"/></g>`;
  s+=flower(120,660,PAL.misprint)+flower(560,662,"#fff")+flower(880,656,PAL.misprint)+flower(300,668,"#fff");

  s+=`<g transform="translate(560 612)"><g class="og-bf"><g transform="scale(.82)"><path class="og-wing" d="M0 0 q-26 -22 -30 4 q-2 24 30 8Z" fill="${PAL.teal}"/><path class="og-wing r" d="M0 0 q26 -22 30 4 q2 24 -30 8Z" fill="${PAL.misprint}"/><ellipse cx="0" cy="2" rx="3.5" ry="10" fill="${PAL.ink}"/><path d="M0 -8 q-5 -8 -10 -9 M0 -8 q5 -8 10 -9" stroke="${PAL.ink}" stroke-width="2" fill="none" stroke-linecap="round"/></g></g></g>`;

  s+=`<g transform="translate(176 560) scale(.62)">
      <ellipse cx="107" cy="212" rx="60" ry="12" fill="${PAL.ink}" opacity=".18"/>
      <g class="og-pip">
        <g filter="url(#ogDropSm)"><path d="M107 44 C101 16 80 14 72 23 C88 25 96 36 102 50Z" fill="${PAL.leafA}"/><path d="M107 46 C113 18 135 15 143 25 C125 27 117 38 111 52Z" fill="${PAL.cap}"/></g>
        <rect x="102" y="42" width="9" height="20" rx="4" fill="${PAL.cap}"/>
        <circle cx="102" cy="124" r="80" fill="${PAL.misprint}" opacity=".18"/>
        <g filter="url(#ogDropMid)"><circle cx="107" cy="124" r="80" fill="${PAL.orange}"/></g>
        <clipPath id="ogPBody"><circle cx="107" cy="124" r="80"/></clipPath>
        <g clip-path="url(#ogPBody)"><circle cx="78" cy="88" r="62" fill="${PAL.coral}"/><circle cx="150" cy="176" r="66" fill="#C84E1E"/></g>
        <path d="M30 150 q-24 7 -28 30 q18 -8 30 -15Z" fill="#D9560F"/><path d="M184 150 q24 7 28 30 q-18 -8 -30 -15Z" fill="#D9560F"/>
        <circle cx="60" cy="132" r="11" fill="#EE6F6F"/><circle cx="154" cy="132" r="11" fill="#EE6F6F"/>
        <ellipse cx="83" cy="110" rx="11" ry="14" fill="${PAL.ink}"/><ellipse cx="131" cy="110" rx="11" ry="14" fill="${PAL.ink}"/>
        <circle cx="86" cy="102" r="3.6" fill="#fbf1de"/><circle cx="134" cy="102" r="3.6" fill="#fbf1de"/>
        <rect class="og-lid" x="72" y="101" width="22" height="9" rx="4" fill="${PAL.orange}"/>
        <rect class="og-lid" x="120" y="101" width="22" height="9" rx="4" fill="${PAL.orange}" style="animation-delay:.04s"/>
        <path d="M92 144 q15 13 30 0 q-15 7 -30 0Z" fill="${PAL.ink}"/>
      </g>
    </g>`;

  return `<svg class="og-art" viewBox="0 0 1000 690" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${s}</svg>
    <div class="og-halftone"></div><div class="og-grain"></div><div class="og-vignette"></div>`;
};
