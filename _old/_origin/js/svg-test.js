
window.onload = function tgSetting() {
//    var tgWrap = document.createElement("div");
    var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
//    var path = document.createElementNS("http://www.w3.org/2000/svg","path");
    var tgLine = document.createElementNS("http://www.w3.org/2000/svg","line");
//    path.setAttribute("d","M10,10 L10,190 L190,190 z");
//    path.setAttribute("stroke","black");
//    path.setAttribute("fill","red");
//    document.getElementsByTagName("body")[0].appendChild(div);
    document.getElementsByTagName("body")[0].appendChild(svg);
//    document.getElementsByTagName("svg")[0].appendChild(path);
    document.getElementsByTagName("svg")[0].appendChild(tgLine);
    //<line x1="10" y1="10" x2="100" y2="20" stroke="black"/>
    
    
    
    svg.style.width = "100%";
    svg.style.height = "0.1em";
    svg.style.maxHeight = "1px";
    svg.setAttribute("data-tg-grid", "1em");
    tgLine.setAttribute("x1", "0");
    tgLine.setAttribute("y1", "0");
    tgLine.setAttribute("x2", "1200");
    tgLine.setAttribute("y2", "0");
    tgLine.setAttribute("stroke", "#666");
    tgLine.setAttribute("stroke-dasharray", "1, 1");
    tgLine.style.strokeWidth = "1";
    tgLine.style.width = "1000px";
};
