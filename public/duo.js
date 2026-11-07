/* ============================================================================
   iPhone Duo: undo what Safari gets wrong when the folded phone turns.

   Ported from jarredmcarter.com (assets/js/duo.js), so both sites behave the
   same way. Folded, the Duo's Safari keeps its toolbar in a rail down one side
   of the screen, and turning the phone moves the rail to the other side. On
   the way, Safari gets two things wrong on this site:

   1. It leaves the page scrolled sideways even though nothing on it is wider
      than the screen: 51px to the right after turning back upright, so a strip
      of the background shows down the left edge until you touch the page.
      jcart saw the same thing the other way (84px, left edge cut off) and only
      checks for that direction; this copy undoes both.
   2. Turning it sideways, Safari widens the page in two steps, to 510px and
      then 594px, and fires a resize event only for the first. Anything
      position:fixed keeps its 510px layout, so the menu bar sat 42px left of
      center. This makes every element with the `fixed` class lay itself out
      again at the page's real width.

   It only acts when the page's width changes or it is scrolled sideways with
   nothing to scroll to, and never when someone has pinch-zoomed in on
   purpose. index.html loads it; once Safari stops doing this, delete this file
   and that <script> tag. Seen on the iOS 27.1 simulator, 2026-11-06.
   ============================================================================ */
(function(){
  var de = document.documentElement;

  function settle(){
    var vv = window.visualViewport;
    if(vv && vv.scale > 1.01) return;
    if(window.scrollX !== 0 && de.scrollWidth <= de.clientWidth){
      /* jump, don't glide, in case the page asks for smooth scrolling */
      var prev = de.style.scrollBehavior;
      de.style.scrollBehavior = "auto";
      window.scrollTo(0, window.scrollY);
      de.style.scrollBehavior = prev;
    }
  }

  /* A fixed element's min-width of auto already works out to 0, so this rule
     changes nothing on screen. Switching it on and off only makes Safari lay
     those elements out again, against the width the page has now. */
  var rule = document.createElement("style");
  rule.textContent = "html.duo-relayout .fixed{min-width:0}";
  document.head.appendChild(rule);

  function relayout(){
    de.classList.add("duo-relayout");
    void de.offsetWidth; /* lay out now, while the class is on */
    de.classList.remove("duo-relayout");
  }

  var width = de.clientWidth;
  function check(){
    settle();
    if(de.clientWidth === width) return;
    width = de.clientWidth;
    relayout();
    setTimeout(relayout, 400);
  }

  /* Safari sets the sideways offset as the turn finishes, sometimes just after
     the resize event, so look again a moment later. The last widening fires
     only the visual viewport's resize event, so listen for that one too. */
  addEventListener("resize", function(){ check(); setTimeout(check, 400); });
  if(window.visualViewport){
    window.visualViewport.addEventListener("resize", function(){ check(); setTimeout(check, 400); });
  }
})();
