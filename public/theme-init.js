try {
  var t = localStorage.getItem("portfolio-theme");
  var dark =
    t === "dark" ||
    (!t && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.classList.add("dark");
  var mc = document.querySelector('meta[name="theme-color"]');
  if (mc) mc.content = dark ? "#0a0e17" : "#f7f9fc";
  var links = document.querySelectorAll("link[data-href-dark]");
  for (var i = 0; i < links.length; i++) {
    links[i].href = dark
      ? links[i].getAttribute("data-href-dark")
      : links[i].getAttribute("data-href-light");
  }
} catch {
  /* storage unavailable: stay on light default */
}
