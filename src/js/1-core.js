// ---------- Symbol glyphs (24x24 grid) ----------
var G = {
  straightness: '<path d="M3 12H21"/>',
  flatness: '<path d="M8 7.5H21L16 16.5H3Z"/>',
  circularity: '<circle cx="12" cy="12" r="7.5"/>',
  cylindricity: '<circle cx="12" cy="12" r="5.5"/><path d="M3.3 17.4L10.2 3.6M13.8 20.4L20.7 6.6"/>',
  profileLine: '<path d="M3 17A9 9 0 0 1 21 17"/>',
  profileSurface: '<path d="M3 17A9 9 0 0 1 21 17Z"/>',
  angularity: '<path d="M3.5 19H20.5M3.5 19L16.5 6"/>',
  perpendicularity: '<path d="M3.5 19.5H20.5M12 19.5V4"/>',
  parallelism: '<path d="M4.5 19.5L11 4.5M13 19.5L19.5 4.5"/>',
  position: '<circle cx="12" cy="12" r="6"/><path d="M12 2.5V21.5M2.5 12H21.5"/>',
  concentricity: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.2"/>',
  symmetry: '<path d="M2.5 12H21.5M6 7H18M6 17H18"/>',
  circularRunout: '<path d="M6 19.5L16 7.5"/><path d="M18.5 4.5L12.6 7.2L16.6 10.6Z" fill="currentColor"/>',
  totalRunout: '<path d="M3 20H12M4 20L11 9.5M11.5 20L18.5 9.5"/><path d="M12.6 6.5L8.6 9.2L11.9 11.4Z M20.1 6.5L16.1 9.2L19.4 11.4Z" fill="currentColor"/>',
  cbore: '<path d="M4 6V18H20V6"/>',
  csk: '<path d="M4 7L12 19L20 7"/>',
  depth: '<path d="M7 4H17M12 4V19M7.5 14.5L12 19L16.5 14.5"/>'
};
function glyph(id, px) {
  return '<svg width="' + px + '" height="' + px + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">' + G[id] + '</svg>';
}

// ---------- Symbol data ----------
var CATS = { form: "Form", profile: "Profile", orientation: "Orientation", location: "Location", runout: "Runout" };
var S = [
  { id: "straightness", name: "Straightness", cat: "form", datum: "never", mod: "Only when applied to a feature of size (derived median line)", dia: "Only for an axis",
    zone: "Surface element: two parallel lines in each cross-section. Axis (derived median line): a cylinder.",
    what: "Controls how straight a line element of a surface is, or how straight the axis of a pin or shaft is.",
    ex: "A long shaft or linear rail where bow along the length matters.",
    read: "Each line element along the pin's surface must lie between two parallel lines 0.02 apart.",
    cases: [["A straightedge along the pin shows a 0.015 bow.", 1], ["The middle of the pin is bowed 0.025 off a straight line.", 0], ["The pin is slightly tapered, but every line along it is straight within 0.01.", 1, "Straightness of a line element doesn't care about taper."]] },
  { id: "flatness", name: "Flatness", cat: "form", datum: "never", mod: "Only for derived median plane (2018)", dia: "No",
    zone: "Two parallel planes the full surface must lie between. The zone can tilt to fit.",
    what: "Controls how flat a single surface is. No orientation or location relative to anything else.",
    ex: "A sealing face or a mounting pad that sits on another part.",
    read: "Every point on the top face must lie between two parallel planes 0.05 apart. Those planes can tilt to best fit the surface.",
    cases: [["Swept with an indicator after leveling: high to low is 0.03.", 1], ["High to low is 0.07.", 0], ["The face is tilted 0.2 across the part but flat within 0.03.", 1, "Flatness has no datum, so tilt doesn't count."]] },
  { id: "circularity", name: "Circularity (roundness)", cat: "form", datum: "never", mod: "No", dia: "No",
    zone: "Two concentric circles, checked independently at each cross-section.",
    what: "Controls how round each cross-section is. Each slice is judged on its own, so taper and bend aren't controlled.",
    ex: "A bearing journal or an O-ring groove diameter.",
    read: "At every cross-section, the outline must fit between two concentric circles 0.01 apart (radially).",
    cases: [["A roundness machine reads 0.008 at the worst section.", 1], ["One section is lobed and reads 0.012.", 0], ["The shaft tapers 0.05 end to end, but every slice is round within 0.006.", 1, "Taper isn't a circularity error."]] },
  { id: "cylindricity", name: "Cylindricity", cat: "form", datum: "never", mod: "No", dia: "No",
    zone: "Two coaxial cylinders the whole surface must lie between, all at once.",
    what: "Combines circularity, straightness, and taper into one control over the entire cylindrical surface.",
    ex: "A hydraulic piston bore or a precision shaft for a press fit.",
    read: "The whole surface must fit between two coaxial cylinders whose radii differ by 0.01.",
    cases: [["Whole-surface scan: 0.008 radial band.", 1], ["Same tapered shaft from the circularity example: each slice is round, but the taper makes the band 0.025.", 0, "Cylindricity catches taper that circularity misses."], ["Slight barrel shape adds up to a 0.009 band.", 1]] },
  { id: "profileLine", name: "Profile of a line", cat: "profile", datum: "optional", mod: "No (the datum references can carry modifiers)", dia: "No",
    zone: "Two curves offset from the true profile, checked at each cross-section.",
    what: "Controls a 2D cross-section of a surface against its basic (true) profile. Without datums it controls form only.",
    ex: "An airfoil section or an extrusion profile.",
    read: "At each cross-section, the curved outline must stay within a band 0.2 wide, centered on the exact curve defined by basic dimensions.",
    cases: [["Optical comparator: worst deviation is ±0.08 from the template.", 1], ["One spot is 0.13 outside the nominal curve.", 0, "The band is ±0.1 either side."]] },
  { id: "profileSurface", name: "Profile of a surface", cat: "profile", datum: "optional", mod: "No (the datum references can carry modifiers)", dia: "No",
    zone: "Two surfaces offset from the true profile (equal split by default, or unequal with the Ⓤ modifier).",
    what: "The most versatile control. With datums it controls size, form, orientation, and location of a surface at once. Very common on castings, sheet metal, and complex machined surfaces.",
    ex: "The outer surface of a cast suspension upright, or any curved surface defined only in CAD.",
    read: "The whole surface must lie within a 0.5 band (±0.25) around the CAD surface, with the part held on datums A and B.",
    cases: [["3D scan: whole surface within ±0.2 of CAD.", 1], ["One corner is 0.3 proud of nominal.", 0, "Half the zone is 0.25."], ["Surface shape is perfect but the whole thing is shifted 0.4 from datum B.", 0, "With datums, profile controls location too."]] },
  { id: "angularity", name: "Angularity", cat: "orientation", datum: "required", mod: "Yes, when applied to a feature of size", dia: "Only for an axis",
    zone: "Two parallel planes at the basic angle to the datum. For an axis, a cylinder at that angle.",
    what: "Controls orientation at any angle other than 0° or 90°. The angle itself is a basic dimension.",
    ex: "A chamfered mounting face or an angled hole for a shock mount bolt.",
    read: "The angled face must lie between two parallel planes 0.1 apart, tilted at exactly 30° to datum A.",
    cases: [["Face is at 30.2° over a 20 mm length: deviation = 20 × tan(0.2°) = 0.07.", 1], ["Face is at 30.4° over 20 mm: deviation = 0.14.", 0]] },
  { id: "perpendicularity", name: "Perpendicularity", cat: "orientation", datum: "required", mod: "Yes, when applied to a feature of size", dia: "Only for an axis",
    zone: "Two parallel planes at 90° to the datum. For an axis, a cylinder at 90° (use Ø).",
    what: "Controls how square a surface or axis is to a datum. Orientation only, not location.",
    ex: "A bore that must be square to its mounting face, like a bearing seat in a hub.",
    read: "The right face must lie between two planes 0.05 apart that are exactly 90° to datum A.",
    cases: [["Part on surface plate, indicator up the face: total 0.04.", 1], ["Indicator reads 0.06.", 0], ["The face is square within 0.02 but 0.3 too far right.", 1, "Perpendicularity doesn't control location."]] },
  { id: "parallelism", name: "Parallelism", cat: "orientation", datum: "required", mod: "Yes, when applied to a feature of size", dia: "Only for an axis",
    zone: "Two planes parallel to the datum. For an axis, a cylinder parallel to it.",
    what: "Controls orientation at 0° to a datum. Also limits flatness of that surface, since the surface must fit in the zone.",
    ex: "The top and bottom faces of a spacer or the two rails of a slide.",
    read: "The top face must lie between two planes 0.05 apart that are exactly parallel to datum A.",
    cases: [["Datum A on surface plate; top face heights read 9.98 to 10.02. Spread 0.04.", 1], ["Heights read 9.97 to 10.03. Spread 0.06.", 0], ["The top face is perfectly flat but tilted: heights run from 9.97 at one end to 10.03 at the other.", 0, "Unlike flatness, the parallelism zone can't tilt. It's locked parallel to A."]] },
  { id: "position", name: "Position", cat: "location", datum: "required", mod: "Yes: MMC, LMC, or RFS", dia: "Yes, for holes and pins",
    zone: "Usually a cylinder centered at true position, located by basic dimensions from the datums.",
    what: "Locates features of size (holes, pins, slots, tabs). The most-used control on real drawings, and where bonus tolerance comes in.",
    ex: "A bolt pattern on a bracket so it lines up with the mating part.",
    read: "The hole's axis must lie inside a Ø0.1 cylinder at its true position (40, 25 from B and C), plus bonus as the hole grows from Ø10.0.",
    cases: [["Hole Ø10.0, center off by Ø0.08.", 1], ["Hole Ø10.0, center off by Ø0.12.", 0, "At MMC there's no bonus, so the limit is Ø0.1."], ["Hole Ø10.15, center off by Ø0.22.", 1, "Bonus 0.15, so the limit is Ø0.25."]] },
  { id: "concentricity", name: "Concentricity", cat: "location", datum: "required", mod: "No (RFS only)", dia: "Yes", removed: true,
    zone: "A cylinder about the datum axis that all derived median points must lie within.",
    what: "Controls the median points of a feature relative to a datum axis. Very hard to inspect, which is why it was removed.",
    ex: "On older drawings. Use runout, position, or profile instead.",
    read: "All median points of the small diameter must lie in a Ø0.04 cylinder on datum axis A.",
    cases: [["In practice, most shops checked this with a runout setup and called it good.", 1, "That's part of why it was removed: nobody measured it the way it's defined."]] },
  { id: "symmetry", name: "Symmetry", cat: "location", datum: "required", mod: "No (RFS only)", dia: "No", removed: true,
    zone: "Two parallel planes centered on the datum center plane that all median points must lie within.",
    what: "The planar version of concentricity. Removed for the same reason.",
    ex: "On older drawings. Use position or profile instead.",
    read: "All median points of the slot must lie between two planes 0.1 apart, centered on datum A's center plane.",
    cases: [["Modern equivalent: position 0.1 on the slot width to datum A, which can use MMC and a gauge.", 1]] },
  { id: "circularRunout", name: "Circular runout", cat: "runout", datum: "required", mod: "No (RFS only)", dia: "No",
    zone: "Full indicator movement at each circular element as the part rotates 360° on the datum axis.",
    what: "Checked with a dial indicator at one location at a time while spinning the part. Catches roundness and wobble at each element.",
    ex: "A brake rotor face or a pulley diameter relative to its bore.",
    read: "Spin the part on datum axis A. At any single spot along the diameter, the indicator needle can't swing more than 0.05 total.",
    cases: [["Indicator swings 0.03 at every position checked.", 1], ["One spot near the end swings 0.06.", 0], ["Each spot swings under 0.03, but the diameter tapers 0.1 along the length.", 1, "Circular runout checks each element separately, so taper isn't caught."]] },
  { id: "totalRunout", name: "Total runout", cat: "runout", datum: "required", mod: "No (RFS only)", dia: "No",
    zone: "Full indicator movement over the entire surface as the part rotates and the indicator traverses the length.",
    what: "Stricter than circular runout. Controls the whole surface at once: roundness, straightness, taper, and coaxiality together.",
    ex: "A high-speed shaft where the whole length must spin true.",
    read: "Spin the part on datum axis A while sliding the indicator along the full length. Highest minus lowest reading over everything must be 0.03 or less.",
    cases: [["Full sweep: 0.025 total.", 1], ["Each spot swings only 0.02, but a taper makes the full-sweep reading 0.04.", 0, "Total runout catches taper."]] }
];
var byId = {}; S.forEach(function (s) { byId[s.id] = s; });

// ---------- Storage (safe) ----------
function sGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function sSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

// ---------- SVG helpers ----------
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function T(x, y, s, o) {
  o = o || {};
  return '<text x="' + x + '" y="' + y + '" class="' + (o.c || "tx") + '"' + (o.a ? ' text-anchor="' + o.a + '"' : "") + (o.fs ? ' font-size="' + o.fs + '"' : "") + (o.w ? ' font-weight="' + o.w + '"' : "") + '>' + esc(s) + '</text>';
}
function L(x1, y1, x2, y2, c, extra) { return '<line x1="' + r2(x1) + '" y1="' + r2(y1) + '" x2="' + r2(x2) + '" y2="' + r2(y2) + '" class="' + (c || "t") + '"' + (extra || "") + '/>'; }
function r2(n) { return Math.round(n * 100) / 100; }
function arrow(x1, y1, x2, y2, c) { return L(x1, y1, x2, y2, c || "t", ' marker-end="url(#ah)"'); }
function arrow2(x1, y1, x2, y2) { return L(x1, y1, x2, y2, "t", ' marker-start="url(#ah)" marker-end="url(#ah)"'); }
function P(d, c, extra) { return '<path d="' + d + '" class="' + (c || "v") + '"' + (extra || "") + '/>'; }
function C(cx, cy, r, c) { return '<circle cx="' + r2(cx) + '" cy="' + r2(cy) + '" r="' + r2(r) + '" class="' + (c || "v") + '"/>'; }
function R(x, y, w, h, c, extra) { return '<rect x="' + r2(x) + '" y="' + r2(y) + '" width="' + r2(w) + '" height="' + r2(h) + '" class="' + (c || "v") + '"' + (extra || "") + '/>'; }
function gIc(id, x, y, s) { return '<g transform="translate(' + r2(x) + ' ' + r2(y) + ') scale(' + (s / 24) + ')" class="gi">' + G[id] + '</g>'; }
function grp(c, s) { return '<g data-c="' + c + '">' + s + '</g>'; }
function mark(n, x, y) { return '<g class="mk"><circle cx="' + x + '" cy="' + y + '" r="9"/><text x="' + x + '" y="' + (y + 3.8) + '" text-anchor="middle">' + n + '</text></g>'; }

// Feature control frame. cells: {g:id} or string; "(M)" / "(L)" become circled letters.
function fcfS(x, y, cells, k) {
  k = k || 1;
  var h = 20 * k, cw = 7.2 * k, cx = x, out = "", xs = [x];
  cells.forEach(function (c) {
    var w, inner = "";
    if (typeof c === "object") {
      w = 26 * k;
      inner = gIc(c.g, cx + (w - 16 * k) / 2, y + (h - 16 * k) / 2, 16 * k);
    } else {
      var m = c.match(/\((M|L)\)/), s = c.replace(/\((M|L)\)/g, "");
      var tw = s.length * cw + (m ? 21 * k : 0);
      w = tw + 12 * k;
      inner = '<text x="' + r2(cx + 6 * k) + '" y="' + r2(y + h / 2 + 4.2 * k) + '" class="tx" font-size="' + r2(12 * k) + '">' + esc(s) + '</text>';
      if (m) {
        var mx = cx + 6 * k + s.length * cw + 11 * k, my = y + h / 2;
        inner += '<circle cx="' + r2(mx) + '" cy="' + r2(my) + '" r="' + r2(6.5 * k) + '" class="t" style="stroke-width:' + r2(1 * k) + '"/>' +
          '<text x="' + r2(mx) + '" y="' + r2(my + 3.3 * k) + '" class="tx" text-anchor="middle" font-size="' + r2(9 * k) + '" font-weight="600">' + m[1] + '</text>';
      }
    }
    out += R(cx, y, w, h, "fb") + inner;
    cx += w; xs.push(cx);
  });
  return { s: out, w: cx - x, xs: xs, h: h };
}
function fcfW(cells) { return fcfS(0, 0, cells).w; }

// Datum feature symbol: triangle on the surface at (x,y), box pointing in dir.
function datumS(x, y, letter, dir) {
  var t, l, b, tx, ty;
  if (dir === "down") { t = [x - 6, y, x + 6, y, x, y + 9]; l = L(x, y + 9, x, y + 20); b = R(x - 9, y + 20, 18, 18, "bx"); tx = x; ty = y + 33.5; }
  else if (dir === "up") { t = [x - 6, y, x + 6, y, x, y - 9]; l = L(x, y - 9, x, y - 20); b = R(x - 9, y - 38, 18, 18, "bx"); tx = x; ty = y - 24.5; }
  else if (dir === "left") { t = [x, y - 6, x, y + 6, x - 9, y]; l = L(x - 9, y, x - 20, y); b = R(x - 38, y - 9, 18, 18, "bx"); tx = x - 29; ty = y + 4.5; }
  else { t = [x, y - 6, x, y + 6, x + 9, y]; l = L(x + 9, y, x + 20, y); b = R(x + 20, y - 9, 18, 18, "bx"); tx = x + 29; ty = y + 4.5; }
  return '<path d="M' + t[0] + ' ' + t[1] + 'L' + t[2] + ' ' + t[3] + 'L' + t[4] + ' ' + t[5] + 'Z" class="df"/>' + l + b + T(tx, ty, letter, { a: "middle", w: 600 });
}

// Horizontal dimension. yf: feature y (number or [y1,y2]) the extension lines come off.
function dimH(x1, x2, y, yf, txt, o) {
  o = o || {};
  var f = Array.isArray(yf) ? yf : [yf, yf], s = "";
  [[x1, f[0]], [x2, f[1]]].forEach(function (p, i) {
    if (o.noExt && o.noExt.indexOf(i) >= 0) return;
    if (y < p[1]) s += L(p[0], p[1] - 3, p[0], y - 6); else s += L(p[0], p[1] + 3, p[0], y + 6);
  });
  s += arrow2(x1, y, x2, y);
  var mid = (x1 + x2) / 2, w = txt.length * 7.2 + 8;
  if (o.basic) s += R(mid - w / 2, y - 18, w, 15, "bx");
  s += T(mid, y - 6, txt, { a: "middle" });
  return s;
}
// Vertical dimension; text is horizontal (unidirectional) and breaks the line.
function dimV(y1, y2, x, xf, txt, o) {
  o = o || {};
  var f = Array.isArray(xf) ? xf : [xf, xf], s = "";
  if (!o.noExt) [[y1, f[0]], [y2, f[1]]].forEach(function (p) {
    if (x < p[1]) s += L(p[1] - 3, p[0], x - 6, p[0]); else s += L(p[1] + 3, p[0], x + 6, p[0]);
  });
  s += arrow2(x, y1, x, y2);
  var mid = (y1 + y2) / 2, w = txt.length * 7.2 + 8;
  s += R(x - w / 2, mid - 8, w, 16, o.basic ? "bx" : "bg");
  s += T(x, mid + 4, txt, { a: "middle" });
  return s;
}
// Wavy line from (x1,y1) to (x2,y2): exaggerated real surface.
function wavy(x1, y1, x2, y2, amp, seed, closeBack) {
  var n = Math.max(6, Math.round(Math.hypot(x2 - x1, y2 - y1) / 5)), dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len, d = "";
  for (var i = 0; i <= n; i++) {
    var t = i / n, w = amp * (0.6 * Math.sin(i * 0.55 + seed) + 0.4 * Math.sin(i * 0.21 + seed * 2.3));
    d += (i ? "L" : "M") + r2(x1 + dx * t + nx * w) + " " + r2(y1 + dy * t + ny * w);
  }
  return d;
}
function svgSet(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }
