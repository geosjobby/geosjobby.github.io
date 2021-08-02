var refreshTimeout,
  numPointsX,
  numPointsY,
  unitWidth,
  unitHeight,
  points,
  refreshDuration = 1e4;
function onLoad() {
  var t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("width", window.innerWidth),
    t.setAttribute("height", window.innerHeight),
    document.querySelector("#bg").appendChild(t);
  var i = (window.innerWidth + window.innerHeight) / 20;
  (numPointsX = Math.ceil(window.innerWidth / i) + 1),
    (numPointsY = Math.ceil(window.innerHeight / i) + 1),
    (unitWidth = Math.ceil(window.innerWidth / (numPointsX - 1))),
    (unitHeight = Math.ceil(window.innerHeight / (numPointsY - 1))),
    (points = []);
  for (var n = 0; n < numPointsY; n++)
    for (var o = 0; o < numPointsX; o++)
      points.push({
        x: unitWidth * o,
        y: unitHeight * n,
        originX: unitWidth * o,
        originY: unitHeight * n,
      });
  randomize();
  for (var e = 0; e < points.length; e++)
    if (
      points[e].originX != unitWidth * (numPointsX - 1) &&
      points[e].originY != unitHeight * (numPointsY - 1)
    )
      for (
        var r = points[e].x,
          s = points[e].y,
          u = points[e + 1].x,
          p = points[e + 1].y,
          h = points[e + numPointsX].x,
          d = points[e + numPointsX].y,
          a = points[e + numPointsX + 1].x,
          m = points[e + numPointsX + 1].y,
          g = Math.floor(2 * Math.random()),
          l = 0;
        l < 2;
        l++
      ) {
        var c = document.createElementNS(t.namespaceURI, "polygon");
        0 == g
          ? 0 == l
            ? ((c.point1 = e),
              (c.point2 = e + numPointsX),
              (c.point3 = e + numPointsX + 1),
              c.setAttribute(
                "points",
                r + "," + s + " " + h + "," + d + " " + a + "," + m
              ))
            : 1 == l &&
              ((c.point1 = e),
              (c.point2 = e + 1),
              (c.point3 = e + numPointsX + 1),
              c.setAttribute(
                "points",
                r + "," + s + " " + u + "," + p + " " + a + "," + m
              ))
          : 1 == g &&
            (0 == l
              ? ((c.point1 = e),
                (c.point2 = e + numPointsX),
                (c.point3 = e + 1),
                c.setAttribute(
                  "points",
                  r + "," + s + " " + h + "," + d + " " + u + "," + p
                ))
              : 1 == l &&
                ((c.point1 = e + numPointsX),
                (c.point2 = e + 1),
                (c.point3 = e + numPointsX + 1),
                c.setAttribute(
                  "points",
                  h + "," + d + " " + u + "," + p + " " + a + "," + m
                ))),
          c.setAttribute("fill", "rgba(0,0,0," + Math.random() / 3 + ")");
        var w = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate"
        );
        w.setAttribute("fill", "freeze"),
          w.setAttribute("attributeName", "points"),
          w.setAttribute("dur", refreshDuration + "ms"),
          w.setAttribute("calcMode", "linear"),
          c.appendChild(w),
          t.appendChild(c);
      }
  refresh();
}
function randomize() {
  for (var t = 0; t < points.length; t++)
    0 != points[t].originX &&
      points[t].originX != unitWidth * (numPointsX - 1) &&
      (points[t].x =
        points[t].originX + Math.random() * unitWidth - unitWidth / 2),
      0 != points[t].originY &&
        points[t].originY != unitHeight * (numPointsY - 1) &&
        (points[t].y =
          points[t].originY + Math.random() * unitHeight - unitHeight / 2);
}
function refresh() {
  randomize();
  for (
    var t = 0;
    t < document.querySelector("#bg svg").childNodes.length;
    t++
  ) {
    var i = document.querySelector("#bg svg").childNodes[t],
      n = i.childNodes[0];
    n.getAttribute("to") && n.setAttribute("from", n.getAttribute("to")),
      n.setAttribute(
        "to",
        points[i.point1].x +
          "," +
          points[i.point1].y +
          " " +
          points[i.point2].x +
          "," +
          points[i.point2].y +
          " " +
          points[i.point3].x +
          "," +
          points[i.point3].y
      ),
      n.beginElement();
  }
  refreshTimeout = setTimeout(function () {
    refresh();
  }, refreshDuration);
}
function onResize() {
  document.querySelector("#bg svg").remove(),
    clearTimeout(refreshTimeout),
    onLoad();
}
(window.onload = onLoad), (window.onresize = onResize);