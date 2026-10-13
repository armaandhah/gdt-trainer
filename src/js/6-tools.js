// ================= BONUS CALCULATOR =================
var feat = "hole";
function f3(n) { return (Math.round(n * 1000) / 1000).toFixed(3); }
function calc() {
  var g = function (id) { return document.getElementById(id); };
  var lo = +g("cMin").value, hi = +g("cMax").value, tol = +g("cTol").value, mod = g("cMod").value, act = +g("cAct").value, dx = +g("cDx").value, dy = +g("cDy").value;
  var res = g("cResults"), work = g("cWork"), verdict = g("cVerdict");
  if (!(hi >= lo) || isNaN(tol) || isNaN(act)) { res.innerHTML = '<dt>Check inputs</dt><dd>Max size must be ≥ min size</dd>'; return; }
  var mmc = feat === "hole" ? lo : hi, lmc = feat === "hole" ? hi : lo;
  var sizeOK = act >= lo - 1e-9 && act <= hi + 1e-9, bonus = 0;
  if (mod === "M") bonus = Math.abs(act - mmc);
  if (mod === "L") bonus = Math.abs(act - lmc);
  if (!sizeOK) bonus = 0;
  var allowed = tol + bonus, actualPos = 2 * Math.sqrt(dx * dx + dy * dy), posOK = actualPos <= allowed + 1e-9, vc, vcLabel;
  if (mod === "L") { vc = feat === "hole" ? lmc + tol : lmc - tol; vcLabel = "Virtual cond. (LMC)"; }
  else { vc = feat === "hole" ? mmc - tol : mmc + tol; vcLabel = mod === "M" ? "Virtual cond. (gauge pin)" : "Virtual cond. (if MMC)"; }
  if (feat === "pin" && vcLabel.indexOf("gauge") > 0) vcLabel = "Virtual cond. (gauge hole)";
  res.innerHTML =
    '<dt>MMC size</dt><dd>Ø' + f3(mmc) + '</dd><dt>LMC size</dt><dd>Ø' + f3(lmc) + '</dd>' +
    '<dt>Bonus tolerance</dt><dd>' + (mod === "R" ? "none (RFS)" : "Ø" + f3(bonus)) + '</dd>' +
    '<dt>Allowed position</dt><dd><strong>Ø' + f3(allowed) + '</strong></dd>' +
    '<dt>Actual position</dt><dd><strong>Ø' + f3(actualPos) + '</strong></dd>' +
    '<dt>' + vcLabel + '</dt><dd>Ø' + f3(vc) + '</dd>';
  var pass = sizeOK && posOK;
  verdict.innerHTML = '<span class="verdict ' + (pass ? "pass" : "fail") + '">' + (pass ? "ACCEPT" : "REJECT") + '</span>';
  var lines = ["Actual position = 2 × √(" + dx + "² + " + dy + "²) = Ø" + f3(actualPos)];
  if (!sizeOK) lines.push("Size Ø" + act + " is outside " + lo + "–" + hi + ": rejected on size.");
  else if (mod === "M") lines.push("Bonus = |" + act + " − " + f3(mmc) + " (MMC)| = " + f3(bonus));
  else if (mod === "L") lines.push("Bonus = |" + act + " − " + f3(lmc) + " (LMC)| = " + f3(bonus));
  else lines.push("RFS: no bonus, zone stays Ø" + f3(tol));
  lines.push("Allowed = " + f3(tol) + " + " + f3(bonus) + " = Ø" + f3(allowed));
  lines.push(f3(actualPos) + (posOK ? " ≤ " : " > ") + f3(allowed) + "  →  position " + (posOK ? "OK" : "out"));
  work.textContent = lines.join("\n");
  drawZone(tol, allowed, dx, dy);
}
function drawZone(tol, allowed, dx, dy) {
  var C0 = 150, extent = Math.max(allowed / 2, Math.sqrt(dx * dx + dy * dy), tol / 2, 0.01) * 1.25, k = 120 / extent;
  var px = C0 + dx * k, py = C0 - dy * k, h = "";
  h += L(C0, 14, C0, 286, "t", ' style="stroke:var(--line)"') + L(14, C0, 286, C0, "t", ' style="stroke:var(--line)"');
  h += '<circle cx="' + C0 + '" cy="' + C0 + '" r="' + r2(allowed / 2 * k) + '" style="fill:var(--ok-soft);stroke:var(--ok);stroke-width:2"/>';
  h += '<circle cx="' + C0 + '" cy="' + C0 + '" r="' + r2(tol / 2 * k) + '" style="fill:none;stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 4"/>';
  h += L(C0, C0, px, py, "t", ' style="stroke:var(--red);stroke-dasharray:3 3"') + C(C0, C0, 3, "df");
  h += P("M" + r2(px - 6) + " " + r2(py - 6) + "L" + r2(px + 6) + " " + r2(py + 6) + "M" + r2(px - 6) + " " + r2(py + 6) + "L" + r2(px + 6) + " " + r2(py - 6), "real");
  h += T(C0 + 6, C0 + 16, "true pos.", { c: "tmu" }) + T(286, C0 - 6, "+X", { c: "tmu", a: "end" }) + T(C0 + 6, 24, "+Y", { c: "tmu" }) + T(14, 292, "radius shown = " + f3(extent) + " mm", { c: "tmu" });
  document.getElementById("zoneSvg").innerHTML = h;
}
function buildBonus() {
  document.querySelectorAll("#featSeg button").forEach(function (b) {
    b.addEventListener("click", function () {
      feat = b.dataset.v;
      document.querySelectorAll("#featSeg button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      var g = function (id) { return document.getElementById(id); };
      if (feat === "pin") { g("cMin").value = "9.80"; g("cMax").value = "10.00"; g("cAct").value = "9.90"; g("cTol").value = "0.10"; }
      else { g("cMin").value = "6.60"; g("cMax").value = "6.80"; g("cAct").value = "6.75"; g("cTol").value = "0.25"; }
      calc();
    });
  });
  ["cMin", "cMax", "cTol", "cMod", "cAct", "cDx", "cDy"].forEach(function (id) { document.getElementById(id).addEventListener("input", calc); });
  calc();
}

// ================= FCF BUILDER =================
function buildFCF() {
  var fSym = document.getElementById("fSym"), fDia = document.getElementById("fDia"), fTol = document.getElementById("fTol"),
      fMod = document.getElementById("fMod"), fA = document.getElementById("fA"), fB = document.getElementById("fB"), fC = document.getElementById("fC");
  S.forEach(function (s) { var o = document.createElement("option"); o.value = s.id; o.textContent = s.name.replace(" (roundness)", ""); fSym.appendChild(o); });
  [fA, fB, fC].forEach(function (sel) {
    ["", "A", "B", "C", "D", "A-B", "A Ⓜ", "B Ⓜ", "C Ⓜ"].forEach(function (v) { var o = document.createElement("option"); o.value = v; o.textContent = v || "—"; sel.appendChild(o); });
  });
  var PRESETS = [
    { n: "Bolt holes (GT-1001)", v: ["position", "1", "0.25", "M", "A", "B", "C"] },
    { n: "Bearing bore (GT-1001)", v: ["position", "1", "0.05", "", "A", "B", "C"] },
    { n: "Square bore to face", v: ["perpendicularity", "1", "0.02", "", "A", "", ""] },
    { n: "Cast surface", v: ["profileSurface", "0", "0.80", "", "A", "B", "C"] },
    { n: "Sealing face", v: ["flatness", "0", "0.02", "", "", "", ""] },
    { n: "Shaft body (GT-1002)", v: ["totalRunout", "0", "0.03", "", "A-B", "", ""] },
    { n: "Find the mistake", v: ["flatness", "1", "0.05", "M", "A", "", ""] },
    { n: "Find the mistake 2", v: ["circularRunout", "0", "0.05", "M", "", "", ""] }
  ];
  var presets = document.getElementById("presets");
  PRESETS.forEach(function (p) {
    var b = document.createElement("button"); b.className = "chip"; b.textContent = p.n;
    b.addEventListener("click", function () { fSym.value = p.v[0]; fDia.value = p.v[1]; fTol.value = p.v[2]; fMod.value = p.v[3]; fA.value = p.v[4]; fB.value = p.v[5]; fC.value = p.v[6]; fcf(); });
    presets.appendChild(b);
  });
  [fSym, fDia, fTol, fMod, fA, fB, fC].forEach(function (i) { i.addEventListener("input", fcf); i.addEventListener("change", fcf); });
  function circ(ch) { return '<span class="circ">' + ch + '</span>'; }
  function datumCell(v) { var parts = v.split(" "); return esc(parts[0]) + (parts[1] ? " " + circ("M") : ""); }
  function dl(d) { return d.split(" ")[0]; }
  var ORD = ["primary", "secondary", "tertiary"], DOF = ["3 points of contact (stops 3 DOF)", "2 points (stops 2 more)", "1 point (stops the last)"];
  function fcf() {
    var s = byId[fSym.value], dia = fDia.value === "1", tol = fTol.value || "0", mod = fMod.value;
    var ds = [fA.value, fB.value, fC.value], datums = ds.filter(function (d) { return d; });
    var cells = '<div>' + glyph(s.id, 30) + '</div><div>' + (dia ? "Ø" : "") + esc(tol) + (mod ? " " + circ(mod) : "") + '</div>';
    datums.forEach(function (d) { cells += '<div>' + datumCell(d) + '</div>'; });
    document.getElementById("fcfOut").innerHTML = cells;
    var issues = [];
    if (s.datum === "never" && datums.length) issues.push(s.name + " is a form control. It can't reference a datum.");
    if (s.datum === "required" && !datums.length) issues.push(s.name + " needs at least one datum reference.");
    if (dia && /^(No)/.test(s.dia)) issues.push("A Ø zone doesn't apply to " + s.name.toLowerCase() + ".");
    if (mod && /RFS only|^No$/.test(s.mod)) issues.push(s.name + " can't take an " + (mod === "M" ? "MMC" : "LMC") + " modifier. It's always RFS.");
    if (mod && s.id === "flatness" && !dia) issues.push("MMC on flatness only works for a derived median plane of a feature of size, which is rare. Check the intent.");
    if (mod && /^(Yes, when|Only when)/.test(s.mod)) issues.push("OK only if this frame applies to a feature of size (hole, pin, slot), not a plain surface.");
    if (s.id === "position" && !dia) issues.push("Position on a round hole or pin normally uses a Ø zone. Width zones are for slots and tabs.");
    var seen = {}; ds.forEach(function (d) { if (!d) return; dl(d).split("-").forEach(function (L1) { if (seen[L1]) issues.push("Datum " + L1 + " appears twice."); seen[L1] = 1; }); });
    if (!fA.value && (fB.value || fC.value)) issues.push("Fill datums in order: primary first.");
    if (s.removed) issues.push(s.name + " was removed in Y14.5-2018. Use position, runout, or profile on new drawings.");
    if (+tol <= 0) issues.push("Tolerance must be greater than zero.");
    var names = datums.map(dl).join(", ");
    var zoneWord = dia ? "a Ø" + tol + " cylinder" : "two parallel " + (s.cat === "profile" ? "offset boundaries" : "planes") + " " + tol + " apart";
    var subject = { form: "The surface", profile: "The surface", orientation: dia ? "The axis of this feature" : "The surface", location: dia ? "The axis of this feature" : "The center plane of this feature", runout: "The surface" }[s.cat];
    var rel = s.id === "perpendicularity" ? " oriented at exactly 90° to" : s.id === "parallelism" ? " exactly parallel to" : " at the basic angle to", txt;
    if (s.cat === "runout") txt = "When the part is rotated 360° about datum axis " + (datums[0] ? dl(datums[0]) : "?") + ", the dial indicator reading " + (s.id === "totalRunout" ? "over the whole surface" : "at each circular element") + " can't move more than " + tol + " total.";
    else if (s.cat === "form") txt = subject + " must lie within " + zoneWord + ". This controls shape only, with no relationship to other features.";
    else if (s.cat === "orientation") txt = subject + " must lie within " + zoneWord + rel + " datum " + names + ". This controls orientation, not location.";
    else if (s.cat === "location") txt = subject + " must lie within " + zoneWord + " centered on its true position, which is located by basic dimensions from " + (datums.length ? "datums " + names : "the datums") + ".";
    else txt = subject + " must lie within " + zoneWord + " centered on the true profile defined by basic dimensions" + (datums.length ? ", located and oriented from datums " + names + "." : ". With no datums this controls form only.");
    var html = '<p>' + esc(txt) + '</p>';
    if (mod === "M") html += '<p>Ⓜ: the stated tolerance applies when the feature is at maximum material. As it moves toward LMC, the difference is added as bonus tolerance.</p>';
    else if (mod === "L") html += '<p>Ⓛ: the stated tolerance applies at least material, typically used to protect minimum wall thickness.</p>';
    else if (s.mod.indexOf("Yes") === 0) html += '<p>No modifier means RFS: the zone stays the same size regardless of the feature\'s actual size.</p>';
    if (datums.length) html += '<p style="color:var(--muted);font-size:14px">' + datums.map(function (d, i) { return (dl(d).indexOf("-") > 0 ? "Datum " + dl(d) + " is a common axis from two features, used as " + ORD[i] : "Datum " + dl(d) + " is " + ORD[i] + ": " + DOF[i]) + (d.indexOf("Ⓜ") > 0 ? ", referenced at MMB so the datum can shift" : "") + "."; }).join(" ") + '</p>';
    document.getElementById("fRead").innerHTML = html;
    document.getElementById("fIssues").innerHTML = issues.length ? issues.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join("") : '<li class="ok">Valid callout per Y14.5-2018.</li>';
  }
  fSym.value = "position"; fDia.value = "1"; fTol.value = "0.25"; fMod.value = "M"; fA.value = "A"; fB.value = "B"; fC.value = "C";
  fcf();
}
