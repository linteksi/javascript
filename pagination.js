//<![CDATA[
function looppagenavi(a) {
  var e = " ";
  numberleft = parseInt(numshowpage / 2), numberleft == numshowpage - numberleft && (numshowpage = 2 * numberleft + 1), start = pagenumber - numberleft, start < 1 && (start = 1), maximum = parseInt(a / postperpage) + 1, maximum - 1 == a / postperpage && (maximum -= 1), end = start + numshowpage - 1, end > maximum && (end = maximum), e += "<span class='showpageOf'>Page " + pagenumber + " of " + maximum + "</span>";
  var s = parseInt(pagenumber) - 1;
  pagenumber > 1 && (e += 2 == pagenumber ? "page" == type ? '<span class="showpage"><a href="' + home_page + '">' + upPageWord + "</a></span>" : '<span class="showpageNum"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">' + upPageWord + "</a></span>" : "page" == type ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + s + ');return false">' + upPageWord + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + s + ');return false">' + upPageWord + "</a></span>"), start > 1 && (e += "page" == type ? '<span class="showpageNum"><a href="' + home_page + '">1</a></span>' : '<span class="showpageNum"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></span>'), start > 2 && (e += "...");
  for (var r = start; r <= end; r++) e += pagenumber == r ? '<span class="showpagePoint">' + r + "</span>" : 1 == r ? "page" == type ? '<span class="showpageNum"><a href="' + home_page + '">1</a></span>' : '<span class="showpageNum"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></span>' : "page" == type ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + r + ');return false">' + r + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + r + ');return false">' + r + "</a></span>";
  end < maximum - 1 && (e += ""), end < maximum && (e += "page" == type ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + maximum + ');return false">' + maximum + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + maximum + ');return false">' + maximum + "</a></span>");
  var n = parseInt(pagenumber) + 1;
  pagenumber < maximum && (e += "page" == type ? '<span class="showpageNum"><a href="#" onclick="redirectpage(' + n + ');return false">' + downPageWord + "</a></span>" : '<span class="showpageNum"><a href="#" onclick="redirectlabel(' + n + ');return false">' + downPageWord + "</a></span>");
  for (var t = document.getElementsByName("pageArea"), l = document.getElementById("blog-pager"), p = 0; p < t.length; p++) t[p].innerHTML = e;
  t && t.length > 0 && (e = ""), l && (l.innerHTML = e)
}

function arithmetictotaldata(a) {
  var e = a.feed,
    s = parseInt(e.openSearch$totalResults.$t, 10);
  looppagenavi(s)
}

function pagenaviblogger() {
  var a = bspagenavi; - 1 != a.indexOf("/search/label/") && (lblname1 = -1 != a.indexOf("?updated-max") ? a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max")) : a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"))), -1 == a.indexOf("?q=") && -1 == a.indexOf(".html") && (-1 == a.indexOf("/search/label/") ? (type = "page", pagenumber = -1 != bspagenavi.indexOf("#PageNo=") ? bspagenavi.substring(bspagenavi.indexOf("#PageNo=") + 8, bspagenavi.length) : 1, document.write('<script src="' + home_page + 'feeds/posts/summary?max-results=1&alt=json-in-script&callback=arithmetictotaldata">')) : (type = "label", -1 == a.indexOf("&max-results=") && (postperpage = 20), pagenumber = -1 != bspagenavi.indexOf("#PageNo=") ? bspagenavi.substring(bspagenavi.indexOf("#PageNo=") + 8, bspagenavi.length) : 1, document.write('<script src="' + home_page + "feeds/posts/summary/-/" + lblname1 + '?alt=json-in-script&callback=arithmetictotaldata&max-results=1" >')))
}

function redirectpage(a) {
  jsonstart = (a - 1) * postperpage, nopage = a;
  var e = document.getElementsByTagName("head")[0],
    s = document.createElement("script");
  s.type = "text/javascript", s.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost"), e.appendChild(s)
}

function redirectlabel(a) {
  jsonstart = (a - 1) * postperpage, nopage = a;
  var e = document.getElementsByTagName("head")[0],
    s = document.createElement("script");
  s.type = "text/javascript", s.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost"), e.appendChild(s)
}

function finddatepost(a) {
  post = a.feed.entry[0];
  var e = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29),
    s = encodeURIComponent(e);
  if ("page" == type) var r = "/search?updated-max=" + s + "&max-results=" + postperpage + "#PageNo=" + nopage;
  else var r = "/search/label/" + lblname1 + "?updated-max=" + s + "&max-results=" + postperpage + "#PageNo=" + nopage;
  location.href = r
}
var nopage, type, pagenumber, lblname1;
pagenaviblogger();
//]]>