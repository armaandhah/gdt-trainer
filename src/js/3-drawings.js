// ================= EXAMPLE DRAWINGS =================
function sheetFrame(W, H) {
  var s = R(10, 10, W - 20, H - 20, "t") + R(22, 22, W - 44, H - 44, "v"), zw = (W - 44) / 6, zh = (H - 44) / 4;
  for (var i = 0; i < 6; i++) {
    if (i) s += L(22 + zw * i, 10, 22 + zw * i, 22) + L(22 + zw * i, H - 22, 22 + zw * i, H - 10);
    s += T(22 + zw * (i + 0.5), 19, String(6 - i), { c: "tsm", a: "middle" }) + T(22 + zw * (i + 0.5), H - 13, String(6 - i), { c: "tsm", a: "middle" });
  }
  for (var j = 0; j < 4; j++) {
    if (j) s += L(10, 22 + zh * j, 22, 22 + zh * j) + L(W - 22, 22 + zh * j, W - 10, 22 + zh * j);
    s += T(16, 22 + zh * (j + 0.5) + 3, "DCBA"[j], { c: "tsm", a: "middle" }) + T(W - 16, 22 + zh * (j + 0.5) + 3, "DCBA"[j], { c: "tsm", a: "middle" });
  }
  return s;
}
function titleBlock(x, y, h, o) {
  var s = R(x, y, 160, h, "t") + R(x + 160, y, 218, h, "t");
  s += T(x + 8, y + 16, "UNLESS OTHERWISE SPECIFIED:", { c: "tsm", fs: 8 }) + T(x + 8, y + 32, "DIMENSIONS IN MM", { c: "tsm" });
  s += T(x + 8, y + 52, "X      ±0.5", { c: "tsm" }) + T(x + 8, y + 68, "X.X    ±0.2", { c: "tsm" }) + T(x + 8, y + 84, "X.XX   ±0.05", { c: "tsm" }) + T(x + 8, y + 100, "ANGLES ±0.5°", { c: "tsm" });
  s += T(x + 8, y + h - 10, "ASME Y14.5-2018", { c: "tsm" });
  var rx = x + 168;
  s += T(rx, y + 17, "GD&T TRAINER · EXAMPLE PART", { c: "tsm" }) + L(x + 160, y + 26, x + 378, y + 26);
  s += T(rx, y + 40, "TITLE", { c: "tmu", fs: 8.5 }) + T(rx, y + 62, o.title, { c: "tl", fs: 16 }) + L(x + 160, y + 72, x + 378, y + 72);
  s += T(rx, y + 86, "PART NO.", { c: "tmu", fs: 8.5 }) + T(rx, y + 99, o.pn, { c: "tsm", w: 600 }) + L(x + 300, y + 72, x + 300, y + 104) + T(x + 308, y + 86, "REV", { c: "tmu", fs: 8.5 }) + T(x + 308, y + 99, "A", { c: "tsm", w: 600 }) + L(x + 160, y + 104, x + 378, y + 104);
  s += T(rx, y + 116, "MATL", { c: "tmu", fs: 8.5 }) + T(rx, y + h - 8, o.matl, { c: "tsm" }) + T(x + 262, y + 116, "SCALE", { c: "tmu", fs: 8.5 }) + T(x + 262, y + h - 8, "1:1", { c: "tsm" });
  var px = x + 320, py = y + 104 + (h - 104) / 2;
  s += P("M" + px + " " + (py - 8) + "L" + (px + 16) + " " + (py - 4) + "V" + (py + 4) + "L" + px + " " + (py + 8) + "Z", "t") + C(px + 34, py, 8, "t") + C(px + 34, py, 4, "t");
  return s;
}
function balloon(n, x, y) { return '<g class="bal" data-n="' + n + '" tabindex="0" role="button" aria-label="Callout ' + n + '"><circle cx="' + x + '" cy="' + y + '" r="11"/><text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle">' + n + '</text></g>'; }
function notes(x, y, lines) {
  var s = T(x, y, "NOTES:", { c: "tsm", w: 600 });
  lines.forEach(function (l, i) { s += T(x, y + 18 + i * 16, (i + 1) + ". " + l, { c: "tsm" }); });
  return s;
}

function drawBracket() {
  var s = sheetFrame(1000, 700);
  // ---- FRONT VIEW ----
  s += '<rect x="140" y="200" width="320" height="200" rx="20" class="pf"/>';
  s += grp("12 6", P("M160 200H440M460 220V380M440 400H160M140 380V220"));
  s += grp("11 12", P("M440 200A20 20 0 0 1 460 220M460 380A20 20 0 0 1 440 400M160 400A20 20 0 0 1 140 380M140 220A20 20 0 0 1 160 200"));
  var holes = [[172, 232], [428, 232], [172, 368], [428, 368]];
  holes.forEach(function (h) {
    s += grp("7 12", '<circle cx="' + h[0] + '" cy="' + h[1] + '" r="13.4" class="v" style="fill:var(--sheet)"/>');
    s += grp("8 12", L(h[0] - 20, h[1], h[0] + 20, h[1], "c") + L(h[0], h[1] - 20, h[0], h[1] + 20, "c"));
  });
  s += grp("9 10 12", '<circle cx="300" cy="300" r="44" class="v" style="fill:var(--sheet)"/>');
  s += grp("8 12", L(244, 300, 356, 300, "c") + L(300, 244, 300, 356, "c"));
  // ---- RIGHT SIDE VIEW ----
  s += R(640, 200, 40, 200, "pf");
  s += grp("12", L(640, 200, 680, 200, "v") + L(640, 400, 680, 400, "v"));
  s += grp("3 4 12", L(640, 200, 640, 400, "v"));
  s += grp("2 4 12", L(680, 200, 680, 400, "v"));
  [232, 368].forEach(function (y) { s += grp("7 12", L(640, y - 13.4, 680, y - 13.4, "h") + L(640, y + 13.4, 680, y + 13.4, "h")); s += grp("12", L(628, y, 692, y, "c")); });
  s += grp("9 12", L(640, 256, 680, 256, "h") + L(640, 344, 680, 344, "h")) + grp("12", L(628, 300, 692, 300, "c"));
  // ---- 2: datum A + flatness ----
  s += grp("2", datumS(680, 375, "A", "right") + fcfS(700, 300, [{ g: "flatness" }, "0.05"]).s + arrow(706, 320, 681, 344));
  // ---- 3: parallelism ----
  s += grp("3", fcfS(530, 250, [{ g: "parallelism" }, "0.05", "A"]).s + arrow(616, 260, 639, 260));
  // ---- 4: thickness ----
  s += grp("4", dimH(640, 680, 175, 200, "10 ±0.1"));
  // ---- 5: datums B, C ----
  s += grp("5", datumS(140, 270, "B", "left") + datumS(380, 400, "C", "down"));
  // ---- 6: overall size ----
  s += grp("6", dimH(140, 460, 505, 400, "80") + dimV(200, 400, 35, 140, "50"));
  // ---- 7: hole callout ----
  s += grp("7", T(470, 111, "4X Ø6.6–6.8 THRU", { a: "start" }) + fcfS(470, 118, [{ g: "position" }, "Ø0.25(M)", "A", "B", "C"]).s + arrow(482, 138, 440, 221));
  // ---- 8: basic dims ----
  s += grp("8",
    dimH(140, 172, 430, [400, 382], "8", { basic: 1 }) + dimH(140, 300, 455, [400, 344], "40", { basic: 1, noExt: [0] }) + dimH(140, 428, 480, [400, 382], "72", { basic: 1, noExt: [0] }) +
    dimV(368, 400, 110, [158.6, 140], "8", { basic: 1 }) + dimV(300, 400, 85, [256, 140], "25", { basic: 1 }) + dimV(232, 400, 60, [158.6, 140], "42", { basic: 1 }));
  // ---- 9 / 10: bore ----
  s += grp("9", T(150, 86, "Ø22.000–22.021", { a: "start" }));
  s += grp("10", fcfS(150, 92, [{ g: "position" }, "Ø0.05", "A", "B", "C"]).s + fcfS(150, 112, [{ g: "perpendicularity" }, "Ø0.02", "A"]).s + fcfS(150, 132, [{ g: "cylindricity" }, "0.01"]).s);
  s += grp("9 10", arrow(176, 152, 268, 268));
  // ---- 11: radii ----
  s += grp("11", T(500, 421, "4X R5", { a: "start" }) + arrow(498, 416, 455, 395));
  // ---- 13: notes ----
  s += grp("13", notes(36, 560, ["INTERPRET PER ASME Y14.5-2018.", "MATERIAL: 6061-T6 ALUMINUM PLATE.", "FINISH: CLEAR ANODIZE, TYPE II.", "BREAK ALL SHARP EDGES 0.2–0.5.", "REMOVE ALL BURRS."]));
  // ---- 1: title block ----
  s += grp("1", titleBlock(600, 540, 138, { title: "SHOCK MOUNT PLATE", pn: "GT-1001", matl: "6061-T6 AL" }));
  // balloons
  [[1, 600, 526], [2, 786, 310], [3, 518, 238], [4, 712, 168], [5, 410, 430], [6, 300, 527], [7, 640, 128], [8, 448, 470], [9, 290, 82], [10, 300, 122], [11, 552, 416], [12, 712, 410], [13, 42, 528]]
    .forEach(function (b) { s += balloon(b[0], b[1], b[2]); });
  return s;
}

function drawShaft() {
  var s = sheetFrame(1000, 620);
  s += P("M164 240H280V220H520V240H636L640 244V316L636 320H520V340H280V320H164L160 316V244Z", "pf");
  s += grp("2 1", P("M164 240H280M164 320H280"));
  s += grp("7 1", P("M160 244L164 240M160 316L164 320M636 240L640 244M636 320L640 316") );
  s += grp("1", P("M160 244V316M640 244V316M164 240V320M636 240V320M520 220V340"));
  s += grp("4 1", P("M280 220H520M280 340H520"));
  s += grp("5 1", P("M280 220V340"));
  s += grp("3 1", P("M520 240H636M520 320H636"));
  s += grp("1", L(140, 280, 660, 280, "c"));
  // 2: datum A journal
  s += grp("2", L(157, 240, 114, 240) + L(157, 320, 114, 320) + arrow2(120, 240, 120, 320) + T(112, 272, "Ø20.000", { a: "end" }) + T(112, 288, "19.987", { a: "end" }) + fcfS(40, 296, [{ g: "cylindricity" }, "0.005"]).s + datumS(120, 326, "A", "down"));
  // 3: datum B journal
  s += grp("3", L(643, 240, 686, 240) + L(643, 320, 686, 320) + arrow2(680, 240, 680, 320) + T(690, 272, "Ø20.000", { a: "start" }) + T(690, 288, "19.987", { a: "start" }) + fcfS(690, 296, [{ g: "cylindricity" }, "0.005"]).s + datumS(680, 326, "B", "down"));
  // 4: body
  s += grp("4", arrow2(460, 220, 460, 340) + R(424, 272, 72, 16, "bg") + T(460, 284, "Ø30 ±0.1", { a: "middle" }) + fcfS(330, 150, [{ g: "totalRunout" }, "0.03", "A-B"]).s + arrow(390, 170, 390, 219));
  // 5: shoulder face
  s += grp("5", fcfS(180, 150, [{ g: "circularRunout" }, "0.02", "A-B"]).s + arrow(250, 170, 279, 229));
  // 6: lengths
  s += grp("6", dimH(160, 280, 410, [316, 340], "30") + dimH(520, 640, 410, [340, 316], "30") + dimH(280, 520, 410, [340, 340], "(60)", { noExt: [0, 1] }) + dimH(160, 640, 445, [316, 316], "120"));
  // 7: chamfer
  s += grp("7", T(200, 372, "2X 1 × 45°", { a: "start" }) + arrow(204, 360, 163, 319));
  // 8: notes + title
  s += grp("8", notes(36, 482, ["INTERPRET PER ASME Y14.5-2018.", "MATERIAL: 4140 STEEL, 28–32 HRC.", "JOURNAL SURFACE FINISH 0.8 Ra.", "BREAK ALL SHARP EDGES 0.2–0.5."]) + titleBlock(600, 460, 138, { title: "PIVOT SHAFT", pn: "GT-1002", matl: "4140 STEEL" }));
  [[1, 560, 200], [2, 44, 266], [3, 790, 280], [4, 448, 160], [5, 166, 160], [6, 664, 445], [7, 292, 366], [8, 584, 450]]
    .forEach(function (b) { s += balloon(b[0], b[1], b[2]); });
  return s;
}

var DRAWINGS = [
  { id: "bracket", name: "GT-1001 Shock mount plate", vb: "0 0 1000 700", draw: drawBracket,
    intro: "A machined aluminum plate that bolts flat to a frame tab with four M6 bolts and holds a spherical bearing for a shock eye. Two views: front (the plate face) and right side (the edge).",
    callouts: [
      { t: "Title block", says: "SHOCK MOUNT PLATE · GT-1001 · REV A · 6061-T6 AL · SCALE 1:1 · X ±0.5 · X.X ±0.2 · X.XX ±0.05 · ANGLES ±0.5°",
        plain: "What the part is, what it's made of, and the default tolerances. Any dimension without its own tolerance gets one from this block, chosen by how many decimal places it has. The cone symbol means third-angle projection, so the side view sits to the right of the front view.",
        inspect: "Not inspected directly. The inspector reads it first to know the material, units, and default tolerances.",
        why: "Writing a tolerance on every single dimension would clutter the drawing. The title block sets a reasonable default, and only the important features get their own tolerances.",
        ex: [["The 80 width has no tolerance. It's a whole number, so X ±0.5 applies: 79.5 to 80.5.", 1], ["The R5 corners: also whole numbers, so R4.5 to R5.5.", 1]] },
      { t: "Datum A and its flatness", says: "Datum feature symbol A on the back face · ⏥ 0.05",
        plain: "The back face is datum A, the primary datum. It's the face that clamps flat against the frame tab in the car. It also has to be flat within 0.05, so it's a reliable surface to measure everything else from.",
        inspect: "The part is placed back-face-down on a granite surface plate. That plate simulates perfect datum A. For flatness, the face is swept with an indicator (or probed on a CMM) and the high-to-low spread is checked.",
        why: "How the plate sits in the car is set by this face. Measuring from the same face the part mounts on means a part that passes inspection will also fit.",
        ex: [["Flatness sweep reads 0.03 total.", 1], ["Flatness sweep reads 0.07 total.", 0]] },
      { t: "Parallelism of the front face", says: "∥ 0.05 | A  on the front face",
        plain: "The front face must lie between two planes 0.05 apart that are perfectly parallel to datum A. This also limits how flat the front face can be.",
        inspect: "Datum A down on the surface plate. Run a height gauge or indicator over the whole front face. Highest reading minus lowest must be 0.05 or less.",
        why: "A spacer for the shock eye clamps against this face. If it isn't parallel to the mounting face, the bearing ends up tilted.",
        ex: [["Readings range 10.02 to 10.06 above the plate. Spread 0.04.", 1], ["Readings range 9.95 to 10.03. Spread 0.08.", 0]] },
      { t: "Plate thickness", says: "10 ±0.1",
        plain: "The plate must be between 9.9 and 10.1 thick everywhere. Because of Rule #1, a plate at exactly 10.1 everywhere would also have to be perfectly flat and parallel.",
        inspect: "Micrometer at several spots around the plate.",
        why: "It sets the clamped stack height in the assembly, so it gets a tighter tolerance than the title block default of ±0.5.",
        ex: [["Micrometer reads 10.08, 10.04, 10.06.", 1], ["One corner reads 9.88.", 0]] },
      { t: "Datums B and C", says: "Datum feature symbols B (left edge) and C (bottom edge)",
        plain: "B is the secondary datum and C is the tertiary datum. With A, they form the datum reference frame: three perpendicular planes that every basic dimension starts from. A gets 3 contact points, B gets 2, C gets 1.",
        inspect: "On a fixture: back face down on the plate (A), pushed against a rail along the left edge (B), then slid along until the bottom edge touches a stop (C). The CMM sets its zero there.",
        why: "Edges are used here because they're easy to fixture on a simple plate. On a real suspension part you'd often use the bolt holes or a locating pin instead, because those are what actually locate the part in the car.",
        ex: [["The left edge is slightly curved. It still works as datum B: the fixture rail touches its two high points.", 1]] },
      { t: "Overall size", says: "80  and  50  (no tolerance shown)",
        plain: "No tolerance next to them, so the title block applies. Whole numbers get ±0.5: width 79.5 to 80.5, height 49.5 to 50.5.",
        inspect: "Calipers.",
        why: "The outline doesn't affect function much, so the loose default is fine and keeps the part cheap.",
        ex: [["Width measures 80.4.", 1], ["Width measures 80.6.", 0]] },
      { t: "Bolt holes and their position", says: "4X Ø6.6–6.8 THRU  ·  ⌖ Ø0.25 Ⓜ | A | B | C",
        plain: "Four through holes, each between 6.6 and 6.8 in diameter, for M6 bolts. Each hole's axis must sit inside a Ø0.25 cylinder at its true position (set by the boxed dimensions from B and C), and the cylinder is perpendicular to A. The Ⓜ means that as a hole grows from 6.6 toward 6.8, the extra size is added to the position tolerance as bonus.",
        inspect: "Either a CMM, or a functional gauge: a plate with four fixed pins Ø6.35 (the virtual condition: 6.6 − 0.25) at the exact true positions. If the part drops onto the gauge, all four holes pass position.",
        why: "Bolt holes only need to line up well enough for bolts to pass through. A bigger hole has more clearance, so it can be a little further off and the bolt still fits. MMC captures exactly that and passes more good parts.",
        ex: [["Hole Ø6.75, center off ΔX 0.12, ΔY 0.09. Actual position Ø0.30. Allowed: 0.25 + bonus 0.15 = Ø0.40.", 1], ["Hole Ø6.60, actual position Ø0.30. No bonus at MMC, so allowed is Ø0.25.", 0], ["Hole Ø6.85, perfectly located.", 0, "Fails on size. 6.85 is over the 6.8 max."]] },
      { t: "Basic dimensions", says: "Boxed: 8, 40, 72 from B · 8, 25, 42 from C",
        plain: "The boxed numbers are exact. They define true position for the four holes and the bore. They have no ± tolerance; the position tolerance in each feature control frame says how far the real feature may be from that exact spot.",
        inspect: "They aren't measured on their own. The CMM uses them as the target, then reports how far each real axis is from it.",
        why: "Every dimension starts from the datums instead of chaining hole to hole, so there's no tolerance stack-up between holes.",
        ex: [["The top-left hole is at X 8.10, Y 42.05 from B and C. Offset from true position is √(0.10² + 0.05²) × 2 = Ø0.22.", 1, "Judged against position, not against the 8 or the 42."]] },
      { t: "Bearing bore size", says: "Ø22.000–22.021",
        plain: "A limit dimension: the bore can be any diameter from 22.000 to 22.021. That's a 0.021 total tolerance, much tighter than anything else on the part, because a spherical bearing is pressed into it.",
        inspect: "Bore gauge, or go/no-go pin gauges: the 22.000 pin must go in, and the 22.021 pin must not.",
        why: "Too small and the bearing won't press in or will distort. Too large and it will be loose and work its way out.",
        ex: [["Bore gauge reads 22.012.", 1], ["Reads 22.025. The bearing would be loose.", 0], ["Reads 21.998.", 0]] },
      { t: "Bearing bore: position, perpendicularity, cylindricity", says: "⌖ Ø0.05 | A | B | C  ·  ⟂ Ø0.02 | A  ·  ⌭ 0.01",
        plain: "Three stacked requirements on the bore. Position: its axis must be within Ø0.05 of exact center. No Ⓜ, so no bonus at any size. Perpendicularity: the axis must also be within a Ø0.02 cylinder square to A, a tighter refinement of orientation. Cylindricity: the bore surface must be round and straight within 0.01.",
        inspect: "CMM with many points around and down the bore: it fits an axis and a cylinder and reports all three values.",
        why: "The bearing location sets the suspension geometry, so it has to be in the right place at every size. That's why there's no bonus. Each refinement is tighter than the one above it, which is how stacked frames should work: position 0.05, then orientation 0.02, then form 0.01.",
        ex: [["Position Ø0.03, perpendicularity Ø0.015, cylindricity 0.006.", 1], ["Position Ø0.03, perpendicularity Ø0.025.", 0, "Perpendicularity is out even though position passed."]] },
      { t: "Corner radii", says: "4X R5",
        plain: "All four outside corners get a 5 mm radius. Whole number, so the title block gives ±0.5: R4.5 to R5.5.",
        inspect: "Radius gauge.",
        why: "Rounded corners are safer to handle and easy to make with an end mill. The exact radius isn't important.",
        ex: [["Radius gauge matches R5 within visible gap.", 1]] },
      { t: "Views and line types", says: "Front view + right side view (third angle)",
        plain: "The front view shows the plate's face: outline, holes, bore. The right side view shows the plate's edge, 10 thick. The holes go through the thickness, so in the side view they appear as dashed hidden lines. Center lines mark each hole's axis in both views.",
        inspect: "Not applicable.",
        why: "Two views are enough for a flat plate. A top view would only repeat the side view.",
        ex: [["Find the four pairs of hidden lines in the side view: two pairs for the holes at heights 8 and 42, and one wide pair for the bore.", 1]] },
      { t: "Notes", says: "1. ASME Y14.5-2018 · 2. 6061-T6 · 3. CLEAR ANODIZE · 4. BREAK EDGES 0.2–0.5 · 5. REMOVE BURRS",
        plain: "Requirements that apply to the whole part. Note 1 says which standard to use when reading the GD&T. Note 4 means every sharp edge not otherwise dimensioned gets a small chamfer or round between 0.2 and 0.5.",
        inspect: "Material by cert from the supplier. Edge breaks by eye and feel. Finish by visual check.",
        why: "Some requirements are easier as text than as dimensions. A common real-world gotcha: anodize adds a little thickness, so very tight features like the bore may need to be masked or machined after coating.",
        ex: [["Sharp edge on the bore entrance that cuts your finger.", 0, "Violates note 4."]] }
    ] },
  { id: "shaft", name: "GT-1002 Pivot shaft", vb: "0 0 1000 620", draw: drawShaft,
    intro: "A turned steel shaft that spins in two bearings, one on each Ø20 journal. The middle Ø30 body carries a part that must spin true. One view is enough because the Ø symbols show it's round.",
    callouts: [
      { t: "One view and a center line", says: "Single side view · center line along the axis",
        plain: "Turned parts are round, and every diameter has a Ø symbol, so one view describes the whole shape. The long-short center line marks the axis of rotation.",
        inspect: "Not applicable.",
        why: "An end view would only show circles you already know are there.",
        ex: [["Three diameters along one axis: Ø20, Ø30, Ø20.", 1]] },
      { t: "Left journal: datum A", says: "Ø20.000 / 19.987 · ⌭ 0.005 · datum A",
        plain: "A limit dimension: diameter between 19.987 and 20.000. For limit dimensions the larger value goes on top. The datum symbol sits in line with the diameter dimension, which makes the journal's axis (not its surface) datum A. Cylindricity 0.005 keeps it round and straight for the bearing.",
        inspect: "Micrometer for size at several spots. Roundness or CMM scan for cylindricity.",
        why: "A bearing's inner race fits here. This size range is a standard fit class for a bearing journal, so the race neither spins on the shaft nor needs a press to install.",
        ex: [["Micrometer reads 19.995 at all spots.", 1], ["Reads 20.003.", 0], ["Reads 19.988 at one end, 19.999 at the other.", 0, "Size passes, but that taper is 0.0055 per side, which alone breaks cylindricity 0.005."]] },
      { t: "Right journal: datum B", says: "Ø20.000 / 19.987 · ⌭ 0.005 · datum B",
        plain: "Same as the left journal. Its axis is datum B. When a frame calls out A-B, it means one common axis through both journals, like holding the shaft in its two real bearings.",
        inspect: "Same as A. For A-B, the shaft is supported on both journals at once, in V-blocks or in matched bearings.",
        why: "The shaft actually spins on both journals, so the axis through both is the true rotation axis.",
        ex: [["Both journals 19.993, cylindricity 0.003.", 1]] },
      { t: "Body: total runout", says: "Ø30 ±0.1  ·  ⌰ 0.03 | A-B",
        plain: "The body diameter is 29.9 to 30.1. Total runout says: spin the shaft on axis A-B and slide a dial indicator along the full length of the body. The needle can't swing more than 0.03 total. That limits wobble, bend, taper, and out-of-round all at once.",
        inspect: "Journals in V-blocks, indicator on the body, rotate while traversing end to end. Record highest minus lowest.",
        why: "Whatever mounts on the body has to spin true relative to the bearings, or it vibrates.",
        ex: [["Full sweep: 0.022 total.", 1], ["At each spot the swing is only 0.015, but the body tapers, so the full sweep reads 0.04.", 0, "Total runout catches taper; circular runout would have passed it."]] },
      { t: "Shoulder face: circular runout", says: "↗ 0.02 | A-B  on the shoulder face",
        plain: "The flat face where the body steps down to the left journal. Spin the shaft on A-B with an indicator touching the face: at each radius you check, the needle can't swing more than 0.02.",
        inspect: "Indicator pointed axially at the face, shaft rotated on A-B. Checked at a few radii.",
        why: "The bearing's inner race seats against this shoulder. If the face wobbles, the bearing gets cocked and wears out fast.",
        ex: [["0.012 at the inner radius, 0.015 at the outer.", 1], ["0.025 at the outer radius.", 0]] },
      { t: "Lengths and a reference dimension", says: "30 · 30 · 120 · (60)",
        plain: "The 30s and 120 get the title block default, ±0.5. The (60) in parentheses is a reference dimension: it's there for convenience, has no tolerance, and isn't inspected. It's already determined by 120 − 30 − 30.",
        inspect: "Calipers or height gauge for 30, 30, 120. Skip the (60).",
        why: "If the 60 had its own tolerance, it could conflict with the others. That's double dimensioning. Marking it as reference avoids the conflict while still helping the reader.",
        ex: [["Lengths 30.2, 29.8, 119.9. The middle comes out 59.9.", 1, "The 59.9 isn't checked."]] },
      { t: "Chamfers", says: "2X 1 × 45°",
        plain: "Both ends get a 1 mm × 45° chamfer. Whole number, so ±0.5 on the length and ±0.5° on the angle per the title block.",
        inspect: "By eye or a chamfer gauge.",
        why: "A lead-in so the bearing slides on without catching, and no sharp edge.",
        ex: [["Chamfer 0.8 × 45°.", 1]] },
      { t: "Notes and title block", says: "4140 STEEL, 28–32 HRC · JOURNAL FINISH 0.8 Ra",
        plain: "Material and hardness (Rockwell C scale). Ra is average surface roughness in micrometers; 0.8 Ra is a smooth, typically ground finish appropriate for a bearing seat.",
        inspect: "Hardness tester for HRC. Profilometer for Ra.",
        why: "Hardness gives wear resistance and strength. Smooth journals keep the bearing fit consistent.",
        ex: [["Hardness 30 HRC, journals 0.6 Ra.", 1], ["Journals 1.6 Ra.", 0]] }
    ] }
];

var dwgState = { d: 0, n: 1 };
function renderDrawing() {
  var D = DRAWINGS[dwgState.d], svg = document.getElementById("dwgSvg");
  svg.setAttribute("viewBox", D.vb);
  svg.innerHTML = D.draw();
  svg.querySelectorAll(".bal").forEach(function (b) {
    b.addEventListener("click", function () { selectCallout(+b.dataset.n); });
    b.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectCallout(+b.dataset.n); } });
  });
  var cl = document.getElementById("clist"); cl.innerHTML = "";
  D.callouts.forEach(function (c, i) {
    var b = document.createElement("button"); b.innerHTML = "<b>" + (i + 1) + "</b>" + esc(c.t);
    b.addEventListener("click", function () { selectCallout(i + 1); });
    cl.appendChild(b);
  });
  document.querySelectorAll("#dwgPick .chip").forEach(function (c, i) { c.setAttribute("aria-pressed", i === dwgState.d ? "true" : "false"); });
  selectCallout(1);
}
function selectCallout(n) {
  var D = DRAWINGS[dwgState.d], N = D.callouts.length;
  n = ((n - 1 + N) % N) + 1; dwgState.n = n;
  var svg = document.getElementById("dwgSvg");
  svg.querySelectorAll(".hl").forEach(function (e) { e.classList.remove("hl"); });
  svg.querySelectorAll('[data-c~="' + n + '"]').forEach(function (e) { e.classList.add("hl"); });
  svg.querySelectorAll(".bal").forEach(function (b) { b.classList.toggle("on", +b.dataset.n === n); });
  document.querySelectorAll("#clist button").forEach(function (b, i) { b.setAttribute("aria-pressed", i + 1 === n ? "true" : "false"); });
  var c = D.callouts[n - 1];
  var ex = c.ex.map(function (e) { return '<li><span class="pill ' + (e[1] ? "ok" : "no") + '">' + (e[1] ? "ACCEPT" : "REJECT") + '</span><span>' + esc(e[0]) + (e[2] ? ' <em style="color:var(--muted)">' + esc(e[2]) + '</em>' : '') + '</span></li>'; }).join("");
  document.getElementById("callout").innerHTML =
    '<div class="callout-nav"><button id="cPrev">‹ Prev</button><span>' + n + ' of ' + N + '</span><button id="cNext">Next ›</button></div>' +
    (n === 1 ? '<p style="margin:0 0 12px;color:var(--muted);font-size:14px">' + esc(D.intro) + '</p>' : '') +
    '<h3>' + n + '. ' + esc(c.t) + '</h3><div class="says">' + esc(c.says) + '</div>' +
    '<section><h4>In plain English</h4><p>' + esc(c.plain) + '</p></section>' +
    '<section><h4>How it\'s checked</h4><p>' + esc(c.inspect) + '</p></section>' +
    '<section><h4>Why it\'s there</h4><p>' + esc(c.why) + '</p></section>' +
    '<section><h4>Examples</h4><ul class="cases">' + ex + '</ul></section>';
  document.getElementById("cPrev").addEventListener("click", function () { selectCallout(n - 1); });
  document.getElementById("cNext").addEventListener("click", function () { selectCallout(n + 1); });
}
function buildDrawings() {
  var pick = document.getElementById("dwgPick");
  DRAWINGS.forEach(function (d, i) {
    var b = document.createElement("button"); b.className = "chip"; b.textContent = d.name;
    b.addEventListener("click", function () { dwgState.d = i; renderDrawing(); });
    pick.appendChild(b);
  });
  renderDrawing();
}
