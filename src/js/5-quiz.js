// ================= QUIZ =================
var QB = {
  basics: [
    { q: "What does a dashed (hidden) line on a drawing show?", a: "An edge you can't see from this view, like a hole inside the part", w: ["A dimension line", "An optional feature", "A part of a neighboring component"], e: "Hidden lines show edges behind the visible surface. Neighboring parts use phantom lines (long-short-short)." },
    { q: "A thin line in a long-short-long dash pattern through a hole marks:", a: "The hole's center (axis)", w: ["A hidden edge", "A cutting plane", "A break in the part"], e: "Center lines mark axes of round features and lines of symmetry." },
    { q: "US drawings to ASME standards normally use which projection?", a: "Third-angle", w: ["First-angle", "Isometric", "Oblique"], e: "Third-angle places the top view above the front view and the right view to its right. First-angle (ISO) flips them." },
    { q: "In third-angle projection, where does the top view go?", a: "Directly above the front view", w: ["Directly below the front view", "To the right of the front view", "Anywhere, as long as it's labeled"], e: "Picture the glass box unfolding: what you see from above is drawn above." },
    { q: "What does \"4X Ø6.6 THRU\" mean?", a: "Four holes, each 6.6 mm diameter, going all the way through", w: ["One hole 4 × 6.6 = 26.4 mm", "A hole 6.6 deep, repeated four times on one axis", "Four holes with 6.6 mm spacing"], e: "nX means n identical features. THRU means through the whole part." },
    { q: "What does R5 mean?", a: "A radius of 5", w: ["A diameter of 5", "A reference dimension of 5", "Revision 5"], e: "R is radius, Ø is diameter. A reference dimension is shown in parentheses." },
    { q: "A dimension written as (60) in parentheses is:", a: "A reference dimension: information only, not inspected", w: ["A basic dimension", "A dimension with a tighter tolerance", "A dimension that's optional to machine"], e: "Reference dimensions avoid double dimensioning. Basic dimensions are shown in a box." },
    { q: "The drawing says 25 ±0.1. Which measurement fails?", a: "25.12", w: ["24.92", "25.08", "25.00"], e: "The allowed range is 24.9 to 25.1. 25.12 is 0.02 over." },
    { q: "The title block says X.X ±0.2. A dimension reads 12.5 with no tolerance. What's the allowed range?", a: "12.3 to 12.7", w: ["12.0 to 13.0", "12.45 to 12.55", "12.5 exactly"], e: "One decimal place, so the X.X tolerance applies." },
    { q: "25 +0.2/−0.1 allows which range?", a: "24.9 to 25.2", w: ["24.8 to 25.1", "24.9 to 25.1", "25.0 to 25.2"], e: "Unequal bilateral: up 0.2, down 0.1." },
    { q: "Three blocks, each 10 ±0.1, are stacked end to end. Worst-case total?", a: "30 ±0.3", w: ["30 ±0.1", "30 ±0.17", "30 ±0.03"], e: "Worst case adds the tolerances: 0.1 + 0.1 + 0.1." },
    { glyph: "cbore", q: "What does this symbol mean in a hole callout?", a: "Counterbore", w: ["Countersink", "Depth", "Spotface radius"], e: "A counterbore is a flat-bottomed larger hole so a bolt head sits flush or below the surface." },
    { glyph: "depth", q: "What does this symbol mean in a hole callout?", a: "Depth", w: ["Through", "Counterbore", "Thread pitch"], e: "Depth: how far a hole or counterbore goes into the part." },
    { glyph: "csk", q: "What does this symbol mean in a hole callout?", a: "Countersink", w: ["Counterbore", "Chamfer", "Taper"], e: "A countersink is a cone so a flat-head screw sits flush." },
    { q: "In a section view, what does hatching (thin diagonal lines) show?", a: "Solid material that the cutting plane passed through", w: ["Hidden material", "Areas to be painted", "Areas that can be removed"], e: "Empty space like holes stays blank; cut material gets hatched." },
    { q: "Why shouldn't you measure dimensions off a printed drawing with a ruler?", a: "Prints can be scaled or distorted; only the written numbers count", w: ["Rulers aren't precise enough for any dimension", "It's against the ASME standard to own a ruler", "The drawing is always at 2:1 scale"], e: "The numbers on the drawing are the requirement. The picture is just a picture." }
  ],
  concepts: [
    { q: "A hole is dimensioned Ø10.0–10.2 with position Ø0.1 Ⓜ. It measures Ø10.15. How much position tolerance is allowed?", a: "Ø0.25", w: ["Ø0.10", "Ø0.15", "Ø0.30"], e: "MMC of a hole is its smallest size, 10.0. Bonus = 10.15 − 10.0 = 0.15. Total = 0.1 + 0.15 = Ø0.25." },
    { q: "What is the MMC size of a pin dimensioned Ø8.0–8.1?", a: "Ø8.1", w: ["Ø8.0", "Ø8.05", "Depends on the datum"], e: "Maximum material condition is when the part has the most material. For a pin, that's the largest size." },
    { q: "What is the MMC size of a hole dimensioned Ø6.0–6.2?", a: "Ø6.0", w: ["Ø6.2", "Ø6.1", "There is no MMC for holes"], e: "For a hole, the most material is left in the part when the hole is smallest." },
    { q: "Which group of controls never references a datum?", a: "Form: flatness, straightness, circularity, cylindricity", w: ["Orientation: parallelism, perpendicularity, angularity", "Runout: circular and total", "Location: position"], e: "Form controls compare a feature to a perfect version of itself, so there's nothing to reference." },
    { q: "What does Rule #1 (the envelope principle) say?", a: "A feature of size can't extend past a boundary of perfect form at MMC", w: ["All tolerances apply RFS unless stated", "Datums must be 3-2-1", "Basic dimensions have zero tolerance"], e: "Size tolerance also limits form. A Ø10.0–10.2 pin at Ø10.2 everywhere must be perfectly straight." },
    { q: "A plate is 10 ±0.1 thick. Someone adds flatness 0.3 to the top face. What's wrong?", a: "Rule #1 already limits flatness to 0.2, so 0.3 does nothing", w: ["Flatness needs a datum", "Flatness must use Ø", "Nothing, it's fine"], e: "Flatness is only useful here as a refinement smaller than the 0.2 size tolerance." },
    { q: "A hole's measured center is offset ΔX = 0.03, ΔY = 0.04 from true position. Actual position?", a: "Ø0.10", w: ["Ø0.05", "Ø0.07", "Ø0.14"], e: "Radial offset = √(0.03² + 0.04²) = 0.05. Position zones are diameters, so double it." },
    { q: "How many contact points does each datum get in a 3-2-1 setup?", a: "Primary 3, secondary 2, tertiary 1", w: ["Primary 1, secondary 2, tertiary 3", "All three need 3", "Primary 3, secondary 3, tertiary 3"], e: "Together they constrain all six degrees of freedom." },
    { q: "How is a basic dimension shown?", a: "Enclosed in a rectangle, with no tolerance", w: ["In parentheses", "Underlined", "With a ± after it"], e: "Parentheses mean a reference dimension." },
    { q: "Circular vs total runout: what's the difference?", a: "Circular checks each circular element on its own; total checks the whole surface at once", w: ["Circular needs a datum, total doesn't", "Total runout only applies to faces", "There is no difference"], e: "With total runout the indicator traverses the full length while the part spins, so taper shows up." },
    { q: "Which two symbols were removed in ASME Y14.5-2018?", a: "Concentricity and symmetry", w: ["Circularity and cylindricity", "Profile of a line and angularity", "Circular and total runout"], e: "Both require finding median points, which is hard to inspect." },
    { q: "Hole Ø10.0–10.2, position Ø0.1 Ⓜ. What size gauge pin checks it?", a: "Ø9.9", w: ["Ø10.0", "Ø10.1", "Ø10.3"], e: "Virtual condition for a hole at MMC = MMC − tolerance = 9.9." },
    { q: "What does RFS mean for a position callout?", a: "No bonus tolerance; the stated tolerance applies at any size", w: ["Bonus tolerance applies automatically", "Size isn't inspected", "The datum can shift"], e: "RFS is the default when no modifier is shown." },
    { q: "A surface has parallelism 0.05 to A. What else does that control on that surface?", a: "Its flatness, to within 0.05", w: ["Its location", "Its perpendicularity to B", "Nothing else"], e: "The whole surface must fit between two planes 0.05 apart." },
    { q: "Why does GD&T use a round zone for hole position instead of a ± square?", a: "A bolt cares how far the hole is off, not which direction; the round zone gives 57% more usable area", w: ["Round zones are easier to draw", "Squares aren't allowed in ASME", "Round zones are always tighter"], e: "The square passes 0.141 off at its corners but rejects 0.11 off straight sideways." },
    { q: "Which control can control size, form, orientation, and location of a curved surface at once?", a: "Profile of a surface", w: ["Position", "Flatness", "Total runout"], e: "Profile with datums does it all in one callout." }
  ],
  drawings: [
    { q: "On the GT-1001 shock mount plate, which surface is datum A?", a: "The back face that clamps against the frame tab", w: ["The left edge", "The bearing bore", "The top edge"], e: "The primary datum should be the surface that locates the part in the assembly." },
    { q: "GT-1001: a bolt hole measures Ø6.75 and its actual position is Ø0.32. Accept or reject?", a: "Accept: allowed is 0.25 + 0.15 bonus = Ø0.40", w: ["Reject: Ø0.32 is over Ø0.25", "Reject: Ø6.75 is out of size", "Accept: position isn't checked on clearance holes"], e: "Hole MMC is 6.6, so bonus = 6.75 − 6.6 = 0.15." },
    { q: "GT-1001: a bolt hole measures Ø6.60 with actual position Ø0.30. Accept or reject?", a: "Reject: at MMC there's no bonus, so the limit is Ø0.25", w: ["Accept: still under Ø0.40", "Accept: Ø6.60 is in size", "Reject: Ø6.60 is under size"], e: "Bonus is zero when the hole is at its smallest size." },
    { q: "GT-1001: what diameter pins would a functional gauge for the bolt holes use?", a: "Ø6.35", w: ["Ø6.60", "Ø6.80", "Ø6.85"], e: "Virtual condition = 6.6 − 0.25 = 6.35." },
    { q: "GT-1001: the bearing bore measures Ø22.025. Accept or reject?", a: "Reject: the max is 22.021", w: ["Accept: within the X.XX ±0.05 default", "Accept: bonus tolerance covers it", "Reject: the min is 22.025"], e: "The bore has its own limit dimension, so the title block default doesn't apply." },
    { q: "GT-1001: why does the bore's position callout have no Ⓜ modifier?", a: "The bearing location sets suspension geometry, so it can't wander with size", w: ["MMC isn't allowed on bores", "The bore is a datum", "Ⓜ only works on pins"], e: "Bonus tolerance is great for clearance holes, not for features that set geometry." },
    { q: "GT-1001: the overall width (80, no tolerance) measures 80.4. Accept or reject?", a: "Accept: whole numbers get X ±0.5 from the title block", w: ["Reject: it should be exactly 80", "Reject: X.XX ±0.05 applies", "Accept: outline dimensions aren't inspected"], e: "No decimal places, so the X tolerance applies: 79.5 to 80.5." },
    { q: "GT-1001: the corners are 4X R5. One measures R5.7. Accept or reject?", a: "Reject: the range is R4.5 to R5.5", w: ["Accept: radii aren't toleranced", "Accept: within X.X ±0.2", "Reject: R5 must be exact"], e: "Whole number, so ±0.5." },
    { q: "GT-1002 pivot shaft: what does \"A-B\" in a feature control frame mean?", a: "One common axis through both bearing journals", w: ["Datum A, then datum B as secondary", "Either A or B, whichever is easier", "A minus B as a distance"], e: "A hyphen makes a common datum. It simulates holding the shaft in both of its bearings at once." },
    { q: "GT-1002: why is the 60 shown as (60)?", a: "It's a reference dimension, already set by 120 − 30 − 30", w: ["It's a basic dimension", "It's the most important length", "It's measured with tighter tolerance"], e: "Tolerancing it too would double dimension the part." },
    { q: "GT-1002: why does the shoulder face have a runout callout?", a: "The bearing seats against it; wobble would cock the bearing", w: ["To make it look finished", "It's datum C", "To control the shaft's length"], e: "Face runout keeps the seating face square to the rotation axis." },
    { q: "GT-1002: the journal reads 19.995. Accept or reject on size?", a: "Accept: 19.987 to 20.000", w: ["Reject: it must be 20.000", "Reject: over 19.987", "Accept: but only with bonus"], e: "Limit dimension, larger value on top." }
  ]
};
var TOPICS = [["all", "Mix everything"], ["basics", "Drawing basics"], ["symbols", "Symbol ID"], ["concepts", "GD&T concepts"], ["drawings", "Example drawings"]];
var quiz = { qs: [], i: 0, score: 0, answered: false, topic: "all" };
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function symbolQs() {
  return S.map(function (s) {
    var wrong = shuffle(S.filter(function (x) { return x.id !== s.id; })).slice(0, 3).map(function (x) { return x.name; });
    return { glyph: s.id, q: "Which characteristic is this symbol?", a: s.name, w: wrong, e: s.name + " (" + CATS[s.cat].toLowerCase() + "). " + s.what, tag: "Symbols" };
  });
}
function pool(t) {
  function tag(arr, name) { return arr.map(function (q) { q.tag = name; return q; }); }
  if (t === "symbols") return symbolQs();
  if (t === "basics") return tag(QB.basics, "Drawing basics");
  if (t === "concepts") return tag(QB.concepts, "GD&T concepts");
  if (t === "drawings") return tag(QB.drawings, "Example drawings");
  return shuffle(symbolQs()).slice(0, 4).concat(tag(QB.basics, "Drawing basics"), tag(QB.concepts, "GD&T concepts"), tag(QB.drawings, "Example drawings"));
}
function buildRound() {
  var p = shuffle(pool(quiz.topic)).slice(0, 10);
  quiz.qs = p.map(function (q) { return { glyph: q.glyph, q: q.q, a: q.a, e: q.e, tag: q.tag, opts: shuffle([q.a].concat(q.w)) }; });
  quiz.i = 0; quiz.score = 0; quiz.answered = false;
  renderQ();
}
function renderQ() {
  var el = document.getElementById("quiz"), key = "gdt-best-" + quiz.topic, best = sGet(key);
  if (quiz.i >= quiz.qs.length) {
    var n = quiz.qs.length;
    if (!best || quiz.score > +best) { sSet(key, quiz.score); best = quiz.score; }
    el.innerHTML = '<div class="quiz-top"><span>Round complete</span><span>Best: ' + best + ' / ' + n + '</span></div>' +
      '<div class="score-big">' + quiz.score + ' / ' + n + '</div>' +
      '<p style="color:var(--muted);margin:8px 0 0">' + (quiz.score === n ? "Clean sheet." : quiz.score >= 7 ? "Solid. Run another round to hit the ones you missed." : "Review the Start here lessons, then try again.") + '</p>' +
      '<div class="row"><button class="btn" id="qAgain">New round</button></div>';
    document.getElementById("qAgain").addEventListener("click", buildRound);
    return;
  }
  var q = quiz.qs[quiz.i];
  el.innerHTML = '<div class="quiz-top"><span>Question ' + (quiz.i + 1) + ' of ' + quiz.qs.length + '</span><span>Score ' + quiz.score + (best ? ' · Best ' + best : '') + '</span></div>' +
    '<div class="progress"><i style="width:' + (quiz.i / quiz.qs.length * 100) + '%"></i></div>' +
    '<div class="q-tag">' + esc(q.tag || "") + '</div>' +
    (q.glyph ? '<div class="q-glyph">' + glyph(q.glyph, 56) + '</div>' : '') +
    '<p class="q-prompt">' + esc(q.q) + '</p><div class="opts" id="qOpts"></div><div id="qMore"></div>';
  var opts = document.getElementById("qOpts");
  q.opts.forEach(function (o, k) {
    var b = document.createElement("button");
    b.className = "opt"; b.innerHTML = "<b>" + "ABCD"[k] + "</b><span></span>";
    b.querySelector("span").textContent = o;
    b.addEventListener("click", function () { answer(b, o); });
    opts.appendChild(b);
  });
}
function answer(btn, o) {
  if (quiz.answered) return;
  quiz.answered = true;
  var q = quiz.qs[quiz.i], ok = o === q.a;
  if (ok) quiz.score++;
  document.querySelectorAll("#qOpts .opt").forEach(function (b) {
    b.disabled = true;
    if (b.querySelector("span").textContent === q.a) b.classList.add("right");
  });
  if (!ok) btn.classList.add("wrong");
  var more = document.getElementById("qMore");
  more.innerHTML = '<div class="explain' + (ok ? '' : ' bad') + '"><strong>' + (ok ? "Correct. " : "Not quite. ") + '</strong></div>' +
    '<div class="row"><button class="btn" id="qNext">' + (quiz.i === quiz.qs.length - 1 ? "See score" : "Next") + '</button></div>';
  more.querySelector(".explain").appendChild(document.createTextNode(q.e));
  var nx = document.getElementById("qNext");
  nx.addEventListener("click", function () { quiz.i++; quiz.answered = false; renderQ(); });
  nx.focus();
}
function buildQuiz() {
  var box = document.getElementById("quizTopics");
  TOPICS.forEach(function (t) {
    var b = document.createElement("button"); b.className = "chip"; b.textContent = t[1]; b.dataset.t = t[0];
    b.setAttribute("aria-pressed", t[0] === quiz.topic ? "true" : "false");
    b.addEventListener("click", function () {
      quiz.topic = t[0];
      box.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.dataset.t === quiz.topic ? "true" : "false"); });
      buildRound();
    });
    box.appendChild(b);
  });
  buildRound();
}
