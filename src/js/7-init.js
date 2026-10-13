// ================= TABS + INIT =================
var TABS = ["basics", "drawings", "symbols", "quiz", "bonus", "fcf"];
function showTab(t, scroll) {
  if (TABS.indexOf(t) < 0) t = "basics";
  TABS.forEach(function (x, i) {
    document.getElementById("p-" + x).hidden = x !== t;
    document.getElementById("t-" + x).setAttribute("aria-selected", x === t ? "true" : "false");
    if (x === t) document.getElementById("sheetNo").textContent = (i + 1) + " of " + TABS.length;
  });
  sSet("gdt-tab", t);
  try { history.replaceState(null, "", "#" + t); } catch (e) {}
  if (scroll) { var nav = document.querySelector("nav.tabs"); if (nav && nav.getBoundingClientRect().top < 0) nav.scrollIntoView({ block: "start" }); }
}
document.querySelectorAll("nav.tabs button").forEach(function (b) { b.addEventListener("click", function () { showTab(b.dataset.tab, true); }); });
document.addEventListener("click", function (e) {
  var g = e.target.closest("[data-goto]");
  if (g) { e.preventDefault(); showTab(g.dataset.goto, true); window.scrollTo({ top: 0 }); }
});

buildLessons();
buildDrawings();
buildSymbols();
buildQuiz();
buildBonus();
buildFCF();

var startHash = (location.hash || "").slice(1);
showTab(TABS.indexOf(startHash) >= 0 ? startHash : (sGet("gdt-tab") || "basics"));
