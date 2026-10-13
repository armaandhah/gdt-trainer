// ================= SYMBOL FIGURES =================
function curvePath(fn, d, noise, seed, n) {
  n = n || 40; var out = "";
  for (var i = 0; i <= n; i++) {
    var t = i / n, p = fn(t), q = fn(Math.min(1, t + 0.001)), r0 = fn(Math.max(0, t - 0.001));
    var tx = q[0] - r0[0], ty = q[1] - r0[1], len = Math.hypot(tx, ty) || 1, nx = ty / len, ny = -tx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    var off = d + (noise ? noise * (0.6 * Math.sin(i * 0.7 + seed) + 0.4 * Math.sin(i * 0.27 + seed * 1.9)) : 0);
    out += (i ? "L" : "M") + r2(p[0] + nx * off) + " " + r2(p[1] + ny * off);
  }
  return out;
}
function cubic(p0, p1, p2, p3) {
  return function (t) {
    var u = 1 - t;
    return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]];
  };
}
function quad(p0, p1, p2) { return cubic(p0, [p0[0] + 2 / 3 * (p1[0] - p0[0]), p0[1] + 2 / 3 * (p1[1] - p0[1])], [p2[0] + 2 / 3 * (p1[0] - p2[0]), p2[1] + 2 / 3 * (p1[1] - p2[1])], p2); }

function indicator(x) {
  return '<circle cx="' + x + '" cy="55" r="22" class="v" style="fill:var(--sheet)"/>' + L(x, 55, x + 12, 42, "v") + R(x - 4, 77, 8, 28, "v", ' style="fill:var(--sheet)"') + C(x, 108, 2.5, "dot");
}

function symFig(id) {
  var s = "", f;
  switch (id) {
    case "flatness":
      s += R(80, 130, 220, 70, "pf") + P("M80 130V200H300V130") + P(wavy(80, 129, 300, 135, 4, 1), "real");
      s += L(70, 121, 310, 127, "zone") + L(70, 137, 310, 143, "zone");
      s += fcfS(150, 40, [{ g: "flatness" }, "0.05"]).s + arrow(178, 60, 182, 124);
      s += T(316, 138, "0.05", { c: "tz" }) + T(80, 228, "the zone may tilt to fit the surface", { c: "tmu" });
      break;
    case "straightness":
      s += R(70, 110, 240, 50, "pf") + P("M70 160H310M70 110V160M310 110V160") + P(wavy(70, 110, 310, 110, 3, 2), "real");
      s += L(60, 104, 320, 104, "zone") + L(60, 116, 320, 116, "zone") + L(56, 135, 324, 135, "c");
      s += fcfS(150, 40, [{ g: "straightness" }, "0.02"]).s + arrow(176, 60, 190, 103);
      s += T(70, 190, "checked along each line element of the surface", { c: "tmu" });
      break;
    case "circularity":
      var d = "";
      for (var i = 0; i <= 72; i++) { var a = i / 72 * Math.PI * 2, r = 60 + 4 * Math.sin(5 * a) + 2 * Math.sin(3 * a + 1); d += (i ? "L" : "M") + r2(190 + r * Math.cos(a)) + " " + r2(140 + r * Math.sin(a)); }
      s += P(d + "Z", "hatch") + P(d + "Z", "real") + C(190, 140, 53, "zone") + C(190, 140, 67, "zone") + L(110, 140, 270, 140, "c") + L(190, 60, 190, 220, "c");
      s += fcfS(30, 30, [{ g: "circularity" }, "0.01"]).s + arrow(80, 50, 145, 95);
      s += T(282, 120, "SECTION A–A", { c: "tmu" }) + T(282, 136, "each slice is", { c: "tmu" }) + T(282, 150, "checked on its own", { c: "tmu" });
      break;
    case "cylindricity":
      s += P("M70 100L310 104V166L70 170Z", "pf") + P(wavy(70, 100, 310, 104, 2, 1), "real") + P(wavy(70, 170, 310, 166, 2, 4), "real") + L(70, 100, 70, 170, "v") + L(310, 104, 310, 166, "v");
      [95, 107, 163, 175].forEach(function (y) { s += L(60, y, 320, y, "zone"); });
      s += L(56, 135, 324, 135, "c") + fcfS(150, 30, [{ g: "cylindricity" }, "0.01"]).s + arrow(176, 50, 200, 97);
      s += T(70, 205, "taper, bow, and lobing all count against one zone", { c: "tmu" });
      break;
    case "profileLine":
      f = quad([70, 130], [190, 30], [310, 130]);
      s += P("M70 130Q190 30 310 130V200H70Z", "pf") + P("M310 130V200H70V130") + P(curvePath(f, 8), "zone") + P(curvePath(f, -8), "zone") + P(curvePath(f, 0, 3.5, 2), "real");
      s += fcfS(30, 20, [{ g: "profileLine" }, "0.2"]).s + arrow(60, 40, 124, 86);
      s += T(70, 228, "band follows the exact curve, slice by slice", { c: "tmu" });
      break;
    case "profileSurface":
      f = cubic([80, 140], [150, 60], [220, 200], [300, 110]);
      s += P("M80 140C150 60 220 200 300 110V200H80Z", "pf") + P("M300 110V200H80V140") + P(curvePath(f, 8), "zone") + P(curvePath(f, -8), "zone") + P(curvePath(f, 0, 3.5, 5), "real");
      s += datumS(190, 200, "A", "down") + datumS(80, 172, "B", "left");
      s += fcfS(120, 20, [{ g: "profileSurface" }, "0.5", "A", "B"]).s + arrow(140, 40, 121, 104);
      s += T(395, 254, "located from A and B, so position counts too", { c: "tmu", a: "end" });
      break;
    case "angularity":
      s += P("M70 200V120H210L310 177.7V200Z", "pf") + P("M210 120H70V200H310V177.7") + P(wavy(210, 120, 310, 179, 1.6, 2), "real");
      s += L(213, 114.8, 313, 172.5, "zone") + L(207, 125.2, 307, 182.9, "zone");
      s += L(213, 120, 300, 120, "t") + P("M290 120A80 80 0 0 1 279.3 160", "t", ' marker-start="url(#ah)" marker-end="url(#ah)"') + R(300, 128, 34, 15, "bx") + T(317, 140, "30°", { a: "middle" });
      s += datumS(100, 200, "A", "down") + fcfS(150, 30, [{ g: "angularity" }, "0.1", "A"]).s + arrow(200, 50, 248, 140);
      s += T(220, 254, "zone tilted at exactly 30° to A", { c: "tmu", a: "middle" });
      break;
    case "perpendicularity":
      s += R(90, 90, 160, 110, "pf") + P("M250 90H90V200H250") + P(wavy(249, 200, 253, 90, 1.5, 3), "real");
      s += L(244, 80, 244, 206, "zone") + L(256, 80, 256, 206, "zone");
      s += datumS(170, 200, "A", "down") + fcfS(200, 30, [{ g: "perpendicularity" }, "0.05", "A"]).s + arrow(268, 50, 254, 104);
      s += T(264, 150, "zone at 90°", { c: "tz" }) + T(264, 164, "to datum A", { c: "tz" });
      break;
    case "parallelism":
      s += R(70, 110, 240, 90, "pf") + P("M70 110V200H310V110") + P(wavy(70, 108, 310, 114, 1.6, 2), "real");
      s += L(60, 104, 320, 104, "zone") + L(60, 118, 320, 118, "zone");
      s += datumS(190, 200, "A", "down") + fcfS(150, 40, [{ g: "parallelism" }, "0.05", "A"]).s + arrow(180, 60, 190, 106);
      s += T(325, 114, "0.05", { c: "tz" }) + T(200, 250, "zone locked parallel to A: it can't tilt", { c: "tmu", a: "middle" });
      break;
    case "position":
      s += R(40, 70, 260, 145, "pf") + R(40, 70, 260, 145, "v");
      s += C(200, 115, 18, "ph") + '<circle cx="206" cy="110" r="18" class="real" style="fill:var(--sheet)"/>' + C(200, 115, 8, "zone") + L(176, 115, 224, 115, "c") + L(200, 91, 200, 139, "c") + C(206, 110, 2.5, "dot");
      s += dimH(40, 200, 242, [215, 136], "40", { basic: 1 }) + dimV(115, 215, 20, [179, 40], "25", { basic: 1 });
      s += datumS(40, 88, "B", "left") + datumS(270, 215, "C", "down");
      s += T(232, 24, "Ø10.0–10.2", { a: "start" }) + fcfS(232, 30, [{ g: "position" }, "Ø0.1(M)", "A", "B", "C"]).s + arrow(252, 50, 219, 96);
      s += T(48, 86, "A = back face", { c: "tmu" }) + T(308, 120, "zone", { c: "tz" }) + T(308, 134, "(magnified)", { c: "tz" }) + T(308, 160, "actual hole", { c: "tr" });
      break;
    case "concentricity":
      s += P("M70 80H200V110H330V170H200V200H70Z", "v", ' style="fill:var(--tint)"') + L(30, 140, 344, 140, "c");
      s += L(67, 80, 40, 80) + L(67, 200, 40, 200) + arrow2(46, 80, 46, 200) + R(28, 132, 36, 16, "bg") + T(46, 144, "Ø40", { a: "middle" }) + datumS(46, 204, "A", "down");
      s += L(200, 133, 330, 133, "zone") + L(200, 147, 330, 147, "zone");
      [[210, 138], [225, 143], [240, 137], [255, 141], [270, 144], [285, 139], [300, 136], [315, 142]].forEach(function (p) { s += C(p[0], p[1], 2.4, "dot"); });
      s += fcfS(220, 40, [{ g: "concentricity" }, "Ø0.04", "A"]).s + arrow(250, 60, 270, 109);
      s += T(200, 238, "median points in a thin cylinder on axis A", { c: "tmu", a: "middle" });
      break;
    case "symmetry":
      s += R(60, 70, 260, 130, "pf") + R(170, 70, 40, 70, "bg") + P("M60 70H170V140H210V70H320V200H60Z");
      s += L(190, 56, 190, 206, "c") + L(184, 60, 184, 150, "zone") + L(196, 60, 196, 150, "zone");
      [[189, 82], [191, 95], [190, 108], [192, 121], [189, 134]].forEach(function (p) { s += C(p[0], p[1], 2.4, "dot"); });
      s += dimH(60, 320, 218, 200, "60") + datumS(260, 218, "A", "down");
      s += fcfS(220, 22, [{ g: "symmetry" }, "0.1", "A"]).s + arrow(250, 42, 211, 98);
      break;
    case "circularRunout":
    case "totalRunout":
      var total = id === "totalRunout";
      s += R(60, 110, 260, 60, "pf") + P("M60 110V170H320V110") + P(wavy(60, 110, 320, 110, 2, 3), "real") + L(46, 140, 334, 140, "c");
      s += L(57, 110, 30, 110) + L(57, 170, 30, 170) + arrow2(36, 110, 36, 170) + datumS(36, 174, "A", "down");
      s += indicator(230) + P("M332 118A10 22 0 1 1 332 162", "t", ' marker-end="url(#ah)"');
      s += fcfS(60, 30, [{ g: id }, total ? "0.03" : "0.05", "A"]).s + arrow(100, 50, 130, 108);
      if (total) s += arrow2(150, 22, 310, 22) + T(316, 26, "traverse", { c: "tmu" });
      else s += T(258, 52, "dial", { c: "tmu" }) + T(258, 66, "indicator", { c: "tmu" });
      s += T(190, 205, total ? "part spins while the indicator slides along" : "indicator stays put; part spins 360°", { c: "tmu", a: "middle" });
      break;
  }
  return '<svg class="fig" viewBox="0 0 400 260" role="img" aria-label="' + esc(byId[id].name) + ' example">' + s + '</svg>';
}

// ================= SYMBOLS TAB =================
var activeCat = "all", activeSym = "flatness";
function renderGrid() {
  var g = document.getElementById("symGrid"); g.innerHTML = "";
  S.filter(function (s) { return activeCat === "all" || s.cat === activeCat; }).forEach(function (s) {
    var b = document.createElement("button");
    b.className = "sym-btn" + (s.removed ? " removed" : "");
    b.setAttribute("aria-pressed", s.id === activeSym ? "true" : "false");
    b.innerHTML = '<span class="glyph">' + glyph(s.id, 28) + '</span><span>' + s.name.replace(" (roundness)", "") + '</span>';
    b.addEventListener("click", function () { activeSym = s.id; renderGrid(); renderDetail(); });
    g.appendChild(b);
  });
}
function renderDetail() {
  var s = byId[activeSym];
  var datum = s.datum === "never" ? "Never. Form controls stand alone." : s.datum === "required" ? '<span class="tag-required">Required</span>' : "Optional. Without datums it controls form only.";
  var cases = s.cases.map(function (c) { return '<li><span class="pill ' + (c[1] ? "ok" : "no") + '">' + (c[1] ? "ACCEPT" : "REJECT") + '</span><span>' + esc(c[0]) + (c[2] ? ' <em style="color:var(--muted)">' + esc(c[2]) + '</em>' : '') + '</span></li>'; }).join("");
  document.getElementById("symDetail").innerHTML =
    '<div class="detail-head"><span class="glyph">' + glyph(s.id, 44) + '</span><div><div class="cat">' + CATS[s.cat] + ' control</div><h3 style="font-size:26px">' + s.name + '</h3></div></div>' +
    '<p>' + s.what + '</p>' +
    (s.removed ? '<p class="note">Removed in ASME Y14.5-2018. Still worth recognizing on legacy drawings.</p>' : '') +
    '<h4 style="margin-top:14px">On a drawing</h4><div class="symfig">' + symFig(s.id) + '</div>' +
    '<div class="legend"><span><i style="border-color:var(--ok);border-top-style:dashed"></i>Tolerance zone</span><span><i style="border-color:var(--red)"></i>Actual surface (exaggerated)</span></div>' +
    '<h4>Read it as</h4><p>' + esc(s.read) + '</p>' +
    '<dl class="facts"><dt>Datum</dt><dd>' + datum + '</dd><dt>Ⓜ / Ⓛ</dt><dd>' + s.mod + '</dd><dt>Ø zone</dt><dd>' + s.dia + '</dd><dt>Zone</dt><dd>' + s.zone + '</dd><dt>Typical use</dt><dd>' + s.ex + '</dd></dl>' +
    '<h4>Examples</h4><ul class="cases">' + cases + '</ul>';
}
function buildSymbols() {
  var filters = document.getElementById("filters");
  [["all", "All 14"]].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k]]; })).forEach(function (f) {
    var b = document.createElement("button");
    b.className = "chip"; b.textContent = f[1]; b.dataset.cat = f[0];
    b.setAttribute("aria-pressed", f[0] === "all" ? "true" : "false");
    b.addEventListener("click", function () {
      activeCat = f[0];
      filters.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.dataset.cat === activeCat ? "true" : "false"); });
      renderGrid();
    });
    filters.appendChild(b);
  });
  renderGrid(); renderDetail();
}
