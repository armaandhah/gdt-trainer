// ================= LESSON FIGURES =================
function figWhat() {
  var s = "";
  s += R(30, 60, 140, 130, "pf") + R(30, 60, 140, 130, "v");
  s += '<circle cx="100" cy="125" r="30" class="v" style="fill:var(--sheet)"/>';
  s += L(64, 125, 136, 125, "c") + L(100, 89, 100, 161, "c");
  s += arrow(112, 44, 121.5, 103.5) + T(70, 38, "Ø10 ±0.1", { a: "start" });
  s += T(100, 222, "DRAWING", { c: "tmu", a: "middle" });
  s += T(355, 50, "REAL PARTS (size exaggerated)", { c: "tmu", a: "middle" });
  [[10.03, 1], [9.98, 1], [10.11, 0]].forEach(function (p, i) {
    var cx = 255 + i * 100, r = 30 + (p[0] - 10) * 60;
    s += R(cx - 45, 75, 90, 100, "pf") + R(cx - 45, 75, 90, 100, "v");
    s += '<circle cx="' + cx + '" cy="125" r="' + r2(r) + '" class="' + (p[1] ? "v" : "real") + '" style="fill:var(--sheet)"/>';
    s += T(cx, 200, "Ø" + p[0].toFixed(2), { a: "middle" });
    s += T(cx, 222, p[1] ? "PASS" : "FAIL", { c: p[1] ? "tz" : "tr", a: "middle", w: 600 });
  });
  svgSet("fig-what", s);
}

function figSheet() {
  var s = R(6, 6, 508, 328, "t") + R(20, 20, 480, 300, "v");
  [1, 2, 3].forEach(function (i) { var x = 20 + 120 * i; s += L(x, 6, x, 20) + L(x, 320, x, 334); });
  [1, 2].forEach(function (i) { var y = 20 + 100 * i; s += L(6, y, 20, y) + L(500, y, 514, y); });
  ["4", "3", "2", "1"].forEach(function (n, i) { s += T(80 + 120 * i, 16, n, { c: "tsm", a: "middle" }); });
  ["C", "B", "A"].forEach(function (n, i) { s += T(13, 74 + 100 * i, n, { c: "tsm", a: "middle" }); });
  // views
  s += P("M60 230H144V209H81V167H60Z") + R(60, 120, 84, 42) + L(81, 120, 81, 162, "v") + R(160, 167, 42, 63) + L(160, 209, 202, 209, "v");
  s += L(144, 230, 144, 238, "t") + dimH(60, 144, 244, 230, "60");
  // notes
  s += T(40, 270, "NOTES:", { c: "tsm" }) + R(40, 278, 210, 4, "pf") + R(40, 290, 170, 4, "pf") + R(40, 302, 190, 4, "pf");
  // title block
  s += R(300, 240, 200, 80, "t") + L(300, 262, 500, 262) + L(300, 292, 500, 292) + L(400, 292, 400, 320);
  s += T(308, 255, "GD&T TRAINER", { c: "tsm" }) + T(308, 282, "SHOCK MOUNT PLATE", { w: 600 }) + T(308, 310, "GT-1001", { c: "tsm" }) + T(408, 310, "REV A", { c: "tsm" });
  // revision block
  s += R(360, 20, 140, 36, "t") + L(360, 34, 500, 34) + T(366, 30, "REV  DESCRIPTION", { c: "tsm", fs: 8 }) + T(366, 48, "A    INITIAL RELEASE", { c: "tsm", fs: 8 });
  s += mark(1, 36, 36) + mark(2, 228, 150) + mark(3, 268, 270) + mark(4, 300, 226) + mark(5, 344, 40);
  svgSet("fig-sheet", s);
}

function figViews() {
  var k = 2.2, fx = function (x) { return 70 + x * k; }, fy = function (y) { return 300 - y * k; };
  var pts = [[0, 0], [60, 0], [60, 15], [15, 15], [15, 45], [0, 45]];
  var s = "";
  // construction lines
  [0, 15, 60].forEach(function (x) { s += L(fx(x), x === 60 ? fy(15) : fy(45), fx(x), 180, "con"); });
  [[45, 15], [15, 60], [0, 60]].forEach(function (p) { s += L(fx(p[1]), fy(p[0]), 230, fy(p[0]), "con"); });
  // front
  s += P("M" + pts.map(function (p) { return r2(fx(p[0])) + " " + r2(fy(p[1])); }).join("L") + "Z", "v", ' style="fill:var(--tint)"');
  // top (z = 0 nearest the front view)
  s += R(fx(0), 180 - 30 * k, 60 * k, 30 * k, "v", ' style="fill:var(--tint)"') + L(fx(15), 180 - 30 * k, fx(15), 180, "v");
  // right
  s += R(230, fy(45), 30 * k, 45 * k, "v", ' style="fill:var(--tint)"') + L(230, fy(15), 230 + 30 * k, fy(15), "v");
  s += T(136, 320, "FRONT", { c: "tmu", a: "middle" }) + T(136, 106, "TOP", { c: "tmu", a: "middle" }) + T(263, 320, "RIGHT SIDE", { c: "tmu", a: "middle" });
  // isometric
  var ox = 365, oy = 168, kk = 1.6;
  function p(x, y, z) { return r2(ox + (x + z) * 0.866 * kk) + " " + r2(oy + ((x - z) * 0.5 - y) * kk); }
  function face(arr, fill) { return P("M" + arr.map(function (q) { return p(q[0], q[1], q[2]); }).join("L") + "Z", "v", ' style="fill:' + fill + '"'); }
  s += face([[0, 45, 0], [15, 45, 0], [15, 45, 30], [0, 45, 30]], "var(--sheet)");
  s += face([[15, 15, 0], [15, 45, 0], [15, 45, 30], [15, 15, 30]], "var(--line)");
  s += face([[15, 15, 0], [60, 15, 0], [60, 15, 30], [15, 15, 30]], "var(--sheet)");
  s += face([[60, 0, 0], [60, 15, 0], [60, 15, 30], [60, 0, 30]], "var(--line)");
  s += face(pts.map(function (q) { return [q[0], q[1], 0]; }), "var(--tint)");
  s += T(430, 250, "3D VIEW", { c: "tmu", a: "middle" });
  s += T(330, 290, "front face = the L you see", { c: "tmu" }) + T(330, 306, "in the FRONT view", { c: "tmu" });
  svgSet("fig-views", s);
}

function figProj() {
  var s = "";
  s += P("M40 35L100 47V73L40 85Z") + L(30, 60, 180, 60, "c") + C(150, 60, 25) + C(150, 60, 13) + L(150, 28, 150, 92, "c");
  s += T(100, 104, "THIRD ANGLE (US, ASME)", { c: "tmu", a: "middle" });
  s += P("M300 47L360 35V85L300 73Z") + L(290, 60, 440, 60, "c") + C(410, 60, 25) + C(410, 60, 13) + L(410, 28, 410, 92, "c");
  s += T(365, 104, "FIRST ANGLE (ISO)", { c: "tmu", a: "middle" });
  svgSet("fig-proj", s);
}

function figLines() {
  var s = "";
  s += R(60, 70, 200, 100, "pf") + R(60, 70, 200, 100, "v");
  s += L(140, 70, 140, 170, "h") + L(180, 70, 180, 170, "h") + L(160, 56, 160, 184, "c");
  s += R(260, 105, 70, 65, "ph");
  s += dimV(70, 170, 30, 60, "40");
  s += T(60, 58, "visible edges", { c: "tmu" });
  s += T(196, 48, "center line", { c: "tmu" }) + L(194, 46, 164, 58, "t", ' style="stroke:var(--muted)"');
  s += T(160, 200, "hidden edges (hole)", { c: "tmu", a: "middle" }) + L(150, 190, 141, 172, "t", ' style="stroke:var(--muted)"') + L(170, 190, 179, 172, "t", ' style="stroke:var(--muted)"');
  s += T(295, 190, "phantom: mating part", { c: "tmu", a: "middle" });
  s += T(14, 214, "dimension + extension lines", { c: "tmu" });
  s += R(370, 70, 50, 100, "hatch") + R(370, 70, 50, 100, "v") + R(460, 70, 50, 100, "hatch") + R(460, 70, 50, 100, "v") + L(440, 58, 440, 182, "c");
  s += T(440, 200, "section view:", { c: "tmu", a: "middle" }) + T(440, 214, "hatching = cut material", { c: "tmu", a: "middle" });
  svgSet("fig-lines", s);
  var rows = [
    ['<line x1="2" y1="7" x2="118" y2="7" class="v"/>', "Visible line", "Edges and outlines you can see from this view. Thick and solid."],
    ['<line x1="2" y1="7" x2="118" y2="7" class="h"/>', "Hidden line", "Edges behind the surface you're looking at, like a hole inside the part. Medium dashes."],
    ['<line x1="2" y1="7" x2="118" y2="7" class="c"/>', "Center line", "Axis of a hole or round feature, or a line of symmetry. Thin, long-short-long."],
    ['<line x1="2" y1="7" x2="118" y2="7" class="t" marker-start="url(#ah)" marker-end="url(#ah)"/>', "Dimension / extension line", "Thin lines that carry measurements. Extension lines lead off the part, dimension lines span between them."],
    ['<line x1="2" y1="7" x2="118" y2="7" class="ph"/>', "Phantom line", "Neighboring parts, alternate positions, or a part's motion. Long-short-short."],
    ['<line x1="2" y1="7" x2="118" y2="7" class="v" style="stroke-dasharray:18 4 4 4;stroke-width:2.4"/>', "Cutting plane line", "Where a section view is cut. Arrows at the ends show which way you look."],
    ['<rect x="2" y="1" width="116" height="12" class="hatch"/>', "Section lining (hatching)", "Solid material exposed by a section cut."]
  ];
  var tb = document.getElementById("lineTable");
  rows.forEach(function (r) {
    var tr = document.createElement("tr");
    tr.innerHTML = '<td class="lt"><svg viewBox="0 0 120 14" class="fig">' + r[0] + '</svg></td><td><strong>' + r[1] + '</strong></td><td>' + r[2] + '</td>';
    tb.appendChild(tr);
  });
}

function figDim() {
  var s = R(120, 90, 280, 100, "pf") + R(120, 90, 280, 100, "v");
  s += '<circle cx="180" cy="140" r="16" class="v" style="fill:var(--sheet)"/>' + L(156, 140, 204, 140, "c") + L(180, 116, 180, 164, "c");
  s += dimH(120, 400, 50, 90, "70");
  s += dimV(90, 190, 470, 400, "25");
  s += arrow(62, 70, 169, 129) + T(20, 64, "Ø8 THRU", { a: "start" });
  s += mark(1, 104, 58) + mark(2, 190, 36) + mark(3, 290, 36) + mark(4, 108, 80) + mark(5, 218, 140);
  svgSet("fig-dim", s);
}

function figCbore() {
  var l = "M110 70H227V109H240.2V190H110Z", r = "M293 70H410V190H279.8V109H293Z", s = "";
  s += P(l, "hatch") + P(l, "v") + P(r, "hatch") + P(r, "v");
  s += R(230, 73, 60, 36, "ph") + R(248, 73, 24, 12, "ph") + R(242, 109, 36, 112, "ph");
  s += L(260, 50, 260, 236, "c");
  s += arrow(326, 36, 294, 68) + T(330, 30, "Ø6.6 THRU", { a: "start" });
  s += gIc("cbore", 330, 37, 14) + T(348, 49, "Ø11", { a: "start" }) + gIc("depth", 378, 37, 14) + T(396, 49, "6.5", { a: "start" });
  s += dimV(70, 190, 70, 110, "20");
  s += T(300, 232, "M6 socket head screw (phantom)", { c: "tmu", a: "start" }) + L(298, 228, 279, 214, "t", ' style="stroke:var(--muted)"');
  s += T(110, 252, "SECTION THROUGH HOLE", { c: "tmu" });
  svgSet("fig-cbore", s);
}

function figTol() {
  var x = function (v) { return 60 + (v - 24.8) * 1000; }, s = "";
  s += R(x(24.9), 96, 200, 28, "zf") + L(40, 110, 480, 110, "v");
  [24.8, 24.85, 24.9, 24.95, 25.0, 25.05, 25.1, 25.15, 25.2].forEach(function (v) {
    var major = Math.abs(v * 10 - Math.round(v * 10)) < 1e-6;
    s += L(x(v), 110, x(v), major ? 120 : 116);
    if (major) s += T(x(v), 134, v.toFixed(1), { c: "tsm", a: "middle" });
  });
  [[24.87, 0], [24.95, 1], [25.04, 1], [25.12, 0]].forEach(function (p) {
    var px = x(p[0]);
    s += L(px, 110, px, 76, p[1] ? "t" : "t", ' style="stroke:' + (p[1] ? "var(--ok)" : "var(--red)") + '"') + '<circle cx="' + px + '" cy="74" r="4" style="fill:' + (p[1] ? "var(--ok)" : "var(--red)") + '"/>';
    s += T(px, 62, p[0].toFixed(2), { a: "middle" }) + T(px, 46, p[1] ? "PASS" : "FAIL", { c: p[1] ? "tz" : "tr", a: "middle", w: 600 });
  });
  s += T(260, 166, "25 ±0.1  →  anything from 24.9 to 25.1 passes", { a: "middle" });
  svgSet("fig-tol", s);
}

function figStack() {
  var s = "";
  [100, 200, 300].forEach(function (x) { s += R(x, 40, 100, 50, "pf") + R(x, 40, 100, 50, "v"); });
  s += dimH(100, 200, 120, 90, "10 ±0.1") + dimH(200, 300, 120, 90, "10 ±0.1", { noExt: [0] }) + dimH(300, 400, 120, 90, "10 ±0.1", { noExt: [0] });
  s += dimH(100, 400, 160, 90, "30 ±0.3 worst case", { noExt: [0, 1] }) + L(100, 126, 100, 166) + L(400, 126, 400, 166);
  s += T(260, 190, "max 30.3 (all at 10.1) · min 29.7 (all at 9.9)", { c: "tmu", a: "middle" });
  svgSet("fig-stack", s);
}

function figSquare() {
  var s = "", cx = 140, cy = 140;
  s += C(cx, cy, 99, "zf") + C(cx, cy, 99, "zone") + R(70, 70, 140, 140, "v");
  s += L(30, cy, 250, cy, "c") + L(cx, 30, cx, 250, "c");
  s += L(cx, cy, 210, 70, "t", ' style="stroke:var(--muted)"');
  s += T(178, 120, "0.141", { c: "tmu" });
  // A: 0.11 right (outside square)
  s += P("M211 134L223 146M211 146L223 134", "real") + T(222, 132, "A", { c: "tr", w: 600 });
  // B: 0.095, 0.095 (inside square)
  s += '<circle cx="206.5" cy="73.5" r="4.5" style="fill:var(--ok)"/>' + T(214, 66, "B", { c: "tz", w: 600 });
  var y = 52, tx = 280;
  s += R(tx, y - 9, 12, 12, "v") + T(tx + 20, y + 2, "± zone: 0.2 × 0.2 square", { a: "start" });
  s += T(tx + 20, y + 18, "area 0.040 mm²", { c: "tmu" });
  y = 104;
  s += C(tx + 6, y - 3, 6, "zone") + T(tx + 20, y + 2, "position zone: Ø0.283", { a: "start" });
  s += T(tx + 20, y + 18, "area 0.063 mm²  (+57%)", { c: "tmu" });
  s += T(tx, 166, "A: 0.110 off center", { c: "tr" }) + T(tx, 182, "   rejected by the square", { c: "tr" });
  s += T(tx, 206, "B: 0.134 off center", { c: "tz" }) + T(tx, 222, "   accepted by the square", { c: "tz" });
  s += T(tx, 248, "The bolt fits both. Only the", { c: "tmu" }) + T(tx, 262, "round zone treats them fairly.", { c: "tmu" });
  svgSet("fig-square", s);
}

function figOrigin() {
  var s = P("M60 40L300 40L300 190L80 190Z", "v", ' style="fill:var(--tint)"');
  s += '<circle cx="200" cy="115" r="14" class="v" style="fill:var(--sheet)"/>' + L(180, 115, 220, 115, "c") + L(200, 95, 200, 135, "c");
  s += dimH(60, 200, 22, [40, 101], "20.0") + dimH(80, 200, 208, [190, 129], "17.1");
  var x = 330;
  s += T(x, 60, "Measured at the top: 20.0", { a: "start" }) + T(x, 80, "At the bottom: 17.1", { a: "start" });
  s += T(x, 112, "Which is right?", { c: "tr" }) + T(x, 128, "Plus/minus doesn't say.", { c: "tmu" });
  s += T(x, 160, "A datum does: the part sits", { c: "tmu" }) + T(x, 176, "on a perfect fixture plane,", { c: "tmu" }) + T(x, 192, "and you measure from that.", { c: "tmu" });
  svgSet("fig-origin", s);
}

function figMMC() {
  var s = R(30, 40, 200, 150, "pf") + R(30, 40, 200, 150, "v");
  s += '<circle cx="130" cy="115" r="52" class="h" style="fill:var(--sheet)"/>' + C(130, 115, 40);
  s += T(130, 112, "MMC", { a: "middle", w: 600 }) + T(130, 128, "Ø10.0", { a: "middle" });
  s += arrow(196, 52, 167, 79) + T(198, 50, "LMC Ø10.2", { c: "tmu", a: "start" });
  s += T(130, 215, "HOLE Ø10.0–10.2", { a: "middle" });
  s += '<circle cx="390" cy="115" r="52" class="v" style="fill:var(--tint)"/>' + C(390, 115, 40, "h");
  s += T(390, 112, "LMC", { a: "middle", w: 600 }) + T(390, 128, "Ø9.8", { a: "middle" });
  s += arrow(456, 52, 427, 79) + T(458, 50, "MMC Ø10.0", { c: "tmu", a: "start" });
  s += T(390, 215, "PIN Ø9.8–10.0", { a: "middle" });
  svgSet("fig-mmc", s);
}

function figRule1() {
  var s = R(60, 50, 400, 70, "zone"), top = "", bot = "";
  for (var i = 0; i <= 40; i++) {
    var t = i / 40, x = 60 + 400 * t, c = 88.5 - 7 * Math.sin(Math.PI * t);
    top += (i ? "L" : "M") + r2(x) + " " + r2(c - 31.5);
    bot = "L" + r2(x) + " " + r2(c + 31.5) + bot;
  }
  s += P(top + bot.replace(/^L/, "L") + "Z", "real", ' style="fill:var(--tint)"');
  s += T(60, 40, "perfect-form boundary at MMC: Ø10.2 cylinder", { c: "tz" });
  s += T(260, 150, "Ø10.1 pin, bowed 0.1: still inside, so it passes Rule #1", { c: "tmu", a: "middle" });
  svgSet("fig-rule1", s);
}

function figDRF() {
  var ox = 160, oy = 150, k = 1.5;
  function p(x, y, z) { return r2(ox + (x - z) * 0.866 * k) + " " + r2(oy + (x + z) * 0.5 * k - y * k); }
  function poly(a, style) { return P("M" + a.map(function (q) { return p(q[0], q[1], q[2]); }).join("L") + "Z", "t", ' style="' + style + '"'); }
  var s = "";
  s += poly([[0, 0, 0], [100, 0, 0], [100, 0, 80], [0, 0, 80]], "fill:var(--tint);stroke:var(--muted)");
  s += poly([[0, 0, 0], [100, 0, 0], [100, 70, 0], [0, 70, 0]], "fill:var(--line);fill-opacity:.35;stroke:var(--muted)");
  s += poly([[0, 0, 0], [0, 0, 80], [0, 70, 80], [0, 70, 0]], "fill:var(--line);fill-opacity:.6;stroke:var(--muted)");
  function lbl(x, y, z, t) { var q = p(x, y, z).split(" "); return T(q[0], q[1], t, { c: "tl", a: "middle" }); }
  s += lbl(88, 0, 66, "A") + lbl(85, 52, 0, "B") + lbl(0, 52, 66, "C");
  // block wireframe x0..60 y0..30 z0..40
  var V = function (x, y, z) { return p(x, y, z); };
  var edges = [
    [[60, 0, 0], [60, 0, 40]], [[0, 0, 40], [60, 0, 40]], [[60, 0, 0], [60, 30, 0]], [[60, 0, 40], [60, 30, 40]], [[0, 0, 40], [0, 30, 40]],
    [[0, 30, 0], [60, 30, 0]], [[0, 30, 40], [60, 30, 40]], [[0, 30, 0], [0, 30, 40]], [[60, 30, 0], [60, 30, 40]]
  ];
  edges.forEach(function (e) { s += P("M" + V.apply(null, e[0]) + "L" + V.apply(null, e[1]), "v"); });
  [[[0, 0, 0], [60, 0, 0]], [[0, 0, 0], [0, 0, 40]], [[0, 0, 0], [0, 30, 0]]].forEach(function (e) { s += P("M" + V.apply(null, e[0]) + "L" + V.apply(null, e[1]), "h"); });
  [[12, 0, 8], [50, 0, 12], [28, 0, 34], [10, 15, 0], [50, 15, 0], [0, 15, 25]].forEach(function (d) { var q = p(d[0], d[1], d[2]).split(" "); s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="4.5" class="dot"/>'; });
  var x = 330;
  s += T(x, 70, "A  primary", { w: 600 }) + T(x, 86, "3 points · stops 3 DOF", { c: "tmu" });
  s += T(x, 120, "B  secondary", { w: 600 }) + T(x, 136, "2 points · stops 2 DOF", { c: "tmu" });
  s += T(x, 170, "C  tertiary", { w: 600 }) + T(x, 186, "1 point · stops 1 DOF", { c: "tmu" });
  s += T(x, 226, "3 + 2 + 1 = all 6 degrees", { c: "tz" }) + T(x, 242, "of freedom locked", { c: "tz" });
  svgSet("fig-drf", s);
}

function figDFS() {
  var s = R(40, 40, 180, 70, "pf") + R(40, 40, 180, 70, "v") + datumS(130, 110, "A", "down");
  s += T(130, 164, "on a surface → datum plane", { c: "tmu", a: "middle" });
  s += R(320, 50, 170, 50, "pf") + R(320, 50, 170, 50, "v") + L(306, 75, 504, 75, "c");
  s += L(317, 50, 290, 50) + L(317, 100, 290, 100) + arrow2(296, 50, 296, 100) + T(288, 79, "Ø10", { a: "end" });
  s += datumS(296, 104, "B", "down");
  s += T(400, 164, "in line with Ø dim → datum axis", { c: "tmu", a: "middle" });
  svgSet("fig-dfs", s);
}

function figBasic() {
  var s = R(40, 60, 430, 120, "pf") + R(40, 60, 430, 120, "v");
  [100, 220, 340].forEach(function (x) {
    s += '<circle cx="' + x + '" cy="120" r="14" class="v" style="fill:var(--sheet)"/>' + L(x - 22, 120, x + 22, 120, "c") + L(x, 98, x, 142, "c") + C(x, 120, 6, "zone");
  });
  s += dimH(40, 100, 210, [180, 137], "20", { basic: 1 }) + dimH(100, 220, 210, [137, 137], "40", { basic: 1, noExt: [0] }) + dimH(220, 340, 210, [137, 137], "40", { basic: 1, noExt: [0] });
  s += dimV(120, 180, 20, [83, 37], "20", { basic: 1 });
  s += datumS(40, 82, "B", "left") + datumS(440, 180, "C", "down");
  var f = fcfS(250, 28, [{ g: "position" }, "Ø0.2", "A", "B", "C"]);
  s += T(250, 22, "3X Ø8.0–8.2", { a: "start" }) + f.s + arrow(300, 48, 330, 107);
  s += T(470, 250, "A = back face (not shown)", { c: "tmu", a: "end" });
  svgSet("fig-basic", s);
}

function figFCF() {
  var k = 1.6, f = fcfS(150, 90, [{ g: "position" }, "Ø0.25(M)", "A", "B", "C"], k), s = f.s, xs = f.xs, h = f.h, by = 90 + h;
  var cw = 7.2 * k, symC = (xs[0] + xs[1]) / 2, oX = xs[1] + 6 * k + cw / 2, vC = xs[1] + 6 * k + cw * 3, mC = xs[1] + 6 * k + 5 * cw + 9 * k;
  s += T(symC, 40, "characteristic", { a: "middle" }) + L(symC, 46, symC, 88, "t", ' style="stroke:var(--red)"');
  s += T(vC - 10, 64, "tolerance value", { a: "start" }) + L(vC, 70, vC, 88, "t", ' style="stroke:var(--red)"');
  s += L(oX, by + 2, oX, by + 30, "t", ' style="stroke:var(--red)"') + T(oX + 4, by + 44, "zone shape: Ø = cylinder", { a: "end" });
  s += L(mC, by + 2, mC, by + 30, "t", ' style="stroke:var(--red)"') + T(mC - 4, by + 44, "modifier: M = MMC", { a: "start" });
  ["1st", "2nd", "3rd"].forEach(function (o, i) { s += T((xs[2 + i] + xs[3 + i]) / 2, by + 16, o, { c: "tsm", a: "middle" }); });
  s += T(xs[2] - 4, 40, "datums, in order", { a: "start" }) + L((xs[2] + xs[5]) / 2, 46, (xs[2] + xs[5]) / 2, 88, "t", ' style="stroke:var(--red)"');
  svgSet("fig-fcf", s);
}

function fcfInline(cells) {
  var f = fcfS(1, 1, cells);
  return '<svg class="fig" viewBox="0 0 ' + r2(f.w + 2) + ' 22" style="width:' + r2(f.w + 2) + 'px;max-width:100%;display:inline-block;vertical-align:middle">' + f.s + '</svg>';
}

function lessonExtras() {
  var ex = [
    [[{ g: "flatness" }, "0.05"], "The surface must be flat within 0.05. No datums, because flatness compares the surface only to itself."],
    [[{ g: "perpendicularity" }, "Ø0.02", "A"], "The axis of this hole must lie inside a Ø0.02 cylinder that's exactly 90° to datum A."],
    [[{ g: "position" }, "Ø0.25(M)", "A", "B", "C"], "The hole's axis must be inside a Ø0.25 cylinder at true position, measured from A, then B, then C. It gets bonus tolerance as the hole grows past its smallest size."],
    [[{ g: "profileSurface" }, "0.5", "A", "B"], "The surface must lie within a 0.5-wide band around its exact CAD shape, located from A, then B."],
    [[{ g: "parallelism" }, "0.05", "A"], "The surface must lie between two planes 0.05 apart that are exactly parallel to datum A."],
    [[{ g: "totalRunout" }, "0.03", "A-B"], "Spinning on the common axis of A and B, the whole surface can't make a dial indicator swing more than 0.03 total."]
  ];
  document.getElementById("fcfExamples").innerHTML = ex.map(function (e) { return '<div style="margin:0 0 12px">' + fcfInline(e[0]) + '<p style="margin:6px 0 0">' + e[1] + '</p></div>'; }).join("");
  Object.keys(CATS).forEach(function (c) {
    var td = document.getElementById("fam-" + c);
    if (td) td.innerHTML = S.filter(function (s) { return s.cat === c; }).map(function (s) { return '<span title="' + s.name + '" class="sy" style="margin-right:4px' + (s.removed ? ';opacity:.5' : '') + '">' + glyph(s.id, 18) + '</span>'; }).join("");
  });
  // inline special symbols
  document.querySelectorAll(".sy[data-g]").forEach(function (el) { el.innerHTML = glyph(el.dataset.g, 18); });
  document.querySelectorAll(".m").forEach(function (el) {
    if (/[⌴↧⌵]/.test(el.innerHTML) && !/<svg/.test(el.innerHTML)) {
      el.innerHTML = el.innerHTML.replace(/⌴/g, '<span class="sy">' + glyph("cbore", 15) + '</span>').replace(/↧/g, '<span class="sy">' + glyph("depth", 15) + '</span>').replace(/⌵/g, '<span class="sy">' + glyph("csk", 15) + '</span>');
    }
  });
  // glossary
  var GL = [
    ["Basic dimension", "A boxed, theoretically exact value. Its tolerance comes from a feature control frame."],
    ["Bonus tolerance", "Extra geometric tolerance earned when a feature with an Ⓜ or Ⓛ modifier departs from that size."],
    ["Datum", "A perfect plane, axis, or point that measurements start from."],
    ["Datum feature", "The real surface on the part that establishes a datum."],
    ["Datum reference frame", "Three mutually perpendicular datum planes that lock all six degrees of freedom."],
    ["Feature", "Any physical surface on a part."],
    ["Feature of size", "A feature with opposing points you can measure across: hole, pin, slot, tab, thickness."],
    ["Feature control frame", "The row of boxes that states a GD&T requirement: symbol, tolerance, modifier, datums."],
    ["FIM", "Full indicator movement: total needle swing on a dial indicator. Used for runout."],
    ["General tolerance", "The default tolerance in the title block for dimensions with none of their own."],
    ["Hidden line", "Dashed line showing an edge you can't see from this view."],
    ["LMC", "Least material condition: smallest pin, largest hole."],
    ["MMC", "Maximum material condition: largest pin, smallest hole."],
    ["Nominal", "The target size before tolerance is applied, like the 25 in 25 ±0.1."],
    ["Orthographic view", "A flat view looking straight at one side of the part."],
    ["Reference dimension", "A value in parentheses. Information only, not inspected."],
    ["RFS", "Regardless of feature size. No modifier: the zone stays the same at any size."],
    ["Rule #1", "A feature of size can't exceed a boundary of perfect form at MMC."],
    ["Section view", "A view of the part cut open, with hatching on cut material."],
    ["Stack-up", "Adding tolerances along a chain to find worst-case variation."],
    ["Third-angle projection", "US/ASME view layout: top view above, right view to the right."],
    ["Title block", "Box in the corner with part number, material, units, scale, and general tolerances."],
    ["Tolerance", "Total amount a dimension is allowed to vary."],
    ["True position", "The exact location defined by basic dimensions."],
    ["Virtual condition", "Worst-case boundary from size plus geometric tolerance. Sets functional gauge pin size."]
  ];
  document.getElementById("glossary").innerHTML = GL.map(function (g) { return '<div><dt>' + esc(g[0]) + '</dt><dd>' + esc(g[1]) + '</dd></div>'; }).join("");
  // TOC
  var toc = document.getElementById("toc");
  document.querySelectorAll("#p-basics .lesson").forEach(function (a, i) {
    var b = document.createElement("button"); b.className = "chip";
    b.textContent = String(i + 1).padStart(2, "0") + " " + a.dataset.title.replace("&amp;", "&");
    b.addEventListener("click", function () { a.scrollIntoView({ behavior: "smooth", block: "start" }); });
    toc.appendChild(b);
  });
}

function tolTry() {
  var D = [
    ["25 ±0.1", 24.9, 25.1], ["25 +0.2/−0.1", 24.9, 25.2], ["25 +0.2/0", 25.0, 25.2], ["25.2 / 25.0 (limit)", 25.0, 25.2],
    ["80 (title block X ±0.5)", 79.5, 80.5], ["12.5 (title block X.X ±0.2)", 12.3, 12.7], ["6.35 (title block X.XX ±0.05)", 6.30, 6.40], ["Ø22.000–22.021 bearing bore", 22.000, 22.021]
  ];
  var sel = document.getElementById("ttDim"), inp = document.getElementById("ttVal"), out = document.getElementById("ttOut");
  D.forEach(function (d, i) { var o = document.createElement("option"); o.value = i; o.textContent = d[0]; sel.appendChild(o); });
  function upd() {
    var d = D[+sel.value], v = parseFloat(inp.value);
    if (isNaN(v)) { out.textContent = "Enter a measurement."; return; }
    var dec = d[2] - d[1] < 0.1 ? 3 : 2, ok = v >= d[1] - 1e-9 && v <= d[2] + 1e-9;
    var why = ok ? "Inside " + d[1].toFixed(dec) + " – " + d[2].toFixed(dec) + "." : (v > d[2] ? "Over the max by " + (v - d[2]).toFixed(3) + "." : "Under the min by " + (d[1] - v).toFixed(3) + ".");
    out.innerHTML = '<span class="verdict ' + (ok ? "pass" : "fail") + '" style="font-size:16px">' + (ok ? "ACCEPT" : "REJECT") + '</span> <span style="margin-left:8px">' + why + '</span>';
  }
  sel.addEventListener("change", function () { var d = D[+sel.value]; inp.value = ((d[1] + d[2]) / 2 + (d[2] - d[1]) * 0.6).toFixed(3); upd(); });
  inp.addEventListener("input", upd);
  upd();
}

function buildLessons() {
  figWhat(); figSheet(); figViews(); figProj(); figLines(); figDim(); figCbore(); figTol(); figStack();
  figSquare(); figOrigin(); figMMC(); figRule1(); figDRF(); figDFS(); figBasic(); figFCF();
  lessonExtras(); tolTry();
}
