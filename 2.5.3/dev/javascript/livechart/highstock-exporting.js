/*
 Highstock JS v1.3.6 (2013-10-04)
 Exporting module

 (c) 2010-2013 Torstein H?nsi

 License: www.highcharts.com/license
*/
(function(f){var C=f.Chart,x=f.addEvent,E=f.removeEvent,m=f.createElement,r=f.discardElement,y=f.css,s=f.merge,v=f.each,t=f.extend,F=Math.max,l=document,D=window,G=f.isTouchDevice,H=f.Renderer.prototype.symbols,A=f.getOptions(),n;t(A.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});A.navigation={menuStyle:{border:"1px solid #A0A0A0",
background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:G?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};A.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",
symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(c,a){var d,b;b=m("form",{method:"post",
action:c,enctype:"multipart/form-data"},{display:"none"},l.body);for(d in a)m("input",{type:"hidden",name:d,value:a[d]},null,b);b.submit();r(b)};t(C.prototype,{getSVG:function(c){var a=this,d,b,B,h,g=s(a.options,c);l.createElementNS||(l.createElementNS=function(a,b){return l.createElement(b)});c=m("div",null,{position:"absolute",top:"-9999em",width:a.chartWidth+"px",height:a.chartHeight+"px"},l.body);b=a.renderTo.style.width;h=a.renderTo.style.height;b=g.exporting.sourceWidth||g.chart.width||/px$/.test(b)&&
parseInt(b,10)||600;h=g.exporting.sourceHeight||g.chart.height||/px$/.test(h)&&parseInt(h,10)||400;t(g.chart,{animation:!1,renderTo:c,forExport:!0,width:b,height:h});g.exporting.enabled=!1;g.series=[];v(a.series,function(a){B=s(a.options,{animation:!1,showCheckbox:!1,visible:a.visible});B.isInternal||g.series.push(B)});d=new f.Chart(g,a.callback);v(["xAxis","yAxis"],function(b){v(a[b],function(a,c){var g=d[b][c],f=a.getExtremes(),h=f.userMin,f=f.userMax;!g||void 0===h&&void 0===f||g.setExtremes(h,
f,!0,!1)})});b=d.container.innerHTML;g=null;d.destroy();r(c);b=b.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,
'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()});return b=b.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(c,a){c=c||{};var d=this.options.exporting,d=this.getSVG(s({chart:{borderRadius:0}},d.chartOptions,a,{exporting:{sourceWidth:c.sourceWidth||
d.sourceWidth,sourceHeight:c.sourceHeight||d.sourceHeight}}));c=s(this.options.exporting,c);f.post(c.url,{filename:c.filename||"chart",type:c.type,width:c.width||0,scale:c.scale||2,svg:d})},print:function(){var c=this,a=c.container,d=[],b=a.parentNode,f=l.body,h=f.childNodes;c.isPrinting||(c.isPrinting=!0,v(h,function(a,b){1===a.nodeType&&(d[b]=a.style.display,a.style.display="none")}),f.appendChild(a),D.focus(),D.print(),setTimeout(function(){b.appendChild(a);v(h,function(a,b){1===a.nodeType&&(a.style.display=
d[b])});c.isPrinting=!1},1E3))},contextMenu:function(c,a,d,b,f,h,g){var e=this,l=e.options.navigation,u=l.menuItemStyle,p=e.chartWidth,q=e.chartHeight,s="cache-"+c,k=e[s],w=F(f,h),n,z,r;k||(e[s]=k=m("div",{className:c},{position:"absolute",zIndex:1E3,padding:w+"px"},e.container),n=m("div",null,t({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},l.menuStyle),k),z=function(){y(k,{display:"none"});g&&g.setState(0);e.openMenu=!1},x(k,"mouseleave",function(){r=
setTimeout(z,500)}),x(k,"mouseenter",function(){clearTimeout(r)}),x(document,"mousedown",function(a){e.pointer&&!e.pointer.inClass(a.target,c)&&z()}),v(a,function(a){if(a){var b=a.separator?m("hr",null,null,n):m("div",{onmouseover:function(){y(this,l.menuItemHoverStyle)},onmouseout:function(){y(this,u)},onclick:function(){z();a.onclick.apply(e,arguments)},innerHTML:a.text||e.options.lang[a.textKey]},t({cursor:"pointer"},u),n);e.exportDivElements.push(b)}}),e.exportDivElements.push(n,k),e.exportMenuWidth=
k.offsetWidth,e.exportMenuHeight=k.offsetHeight);a={display:"block"};d+e.exportMenuWidth>p?a.right=p-d-f-w+"px":a.left=d-w+"px";b+h+e.exportMenuHeight>q&&"top"!==g.alignOptions.verticalAlign?a.bottom=q-b-w+"px":a.top=b+h-w+"px";y(k,a);e.openMenu=!0},addButton:function(c){var a=this,d=a.renderer,b=s(a.options.navigation.buttonOptions,c),l=b.onclick,h=b.menuItems,g,e,m={stroke:b.symbolStroke,fill:b.symbolFill},u=b.symbolSize||12;a.btnCount||(a.btnCount=0);a.exportDivElements||(a.exportDivElements=[],
a.exportSVGElements=[]);if(!1!==b.enabled){var p=b.theme,q=p.states,r=q&&q.hover,q=q&&q.select,k;delete p.states;l?k=function(){l.apply(a,arguments)}:h&&(k=function(){a.contextMenu(e.menuClassName,h,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});b.text&&b.symbol?p.paddingLeft=f.pick(p.paddingLeft,25):b.text||t(p,{width:b.width,height:b.height,padding:0});e=d.button(b.text,0,0,k,p,r,q).attr({title:a.options.lang[b._titleKey],"stroke-linecap":"round"});e.menuClassName=c.menuClassName||
"highcharts-menu-"+a.btnCount++;b.symbol&&(g=d.symbol(b.symbol,b.symbolX-u/2,b.symbolY-u/2,u,u).attr(t(m,{"stroke-width":b.symbolStrokeWidth||1,zIndex:1})).add(e));e.add().align(t(b,{width:e.width,x:f.pick(b.x,n)}),!0,"spacingBox");n+=(e.width+b.buttonSpacing)*("right"===b.align?-1:1);a.exportSVGElements.push(e,g)}},destroyExport:function(c){c=c.target;var a,d;for(a=0;a<c.exportSVGElements.length;a++)if(d=c.exportSVGElements[a])d.onclick=d.ontouchstart=null,c.exportSVGElements[a]=d.destroy();for(a=
0;a<c.exportDivElements.length;a++)d=c.exportDivElements[a],E(d,"mouseleave"),c.exportDivElements[a]=d.onmouseout=d.onmouseover=d.ontouchstart=d.onclick=null,r(d)}});H.menu=function(c,a,d,b){return["M",c,a+2.5,"L",c+d,a+2.5,"M",c,a+b/2+0.5,"L",c+d,a+b/2+0.5,"M",c,a+b-1.5,"L",c+d,a+b-1.5]};C.prototype.callbacks.push(function(c){var a,d=c.options.exporting,b=d.buttons;n=0;if(!1!==d.enabled){for(a in b)c.addButton(b[a]);x(c,"destroy",c.destroyExport)}})})(Highcharts);
