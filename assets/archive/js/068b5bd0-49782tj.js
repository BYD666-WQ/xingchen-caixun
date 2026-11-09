(function(){var d=document,h=d.head||d.getElementsByTagName('head')[0];
function p(u){try{var l=d.createElement('link');l.rel='preconnect';l.href=u;l.crossOrigin='anonymous';h.appendChild(l);}catch(e){}}
p("https://cdn.zstat.app");p("https://edge.zstat.app");
var s=d.createElement('script');s.async=true;
s.src="https://cdn.zstat.app/omnistat.v1.js";s.crossOrigin='anonymous';
s.onload=function(){try{OmniStat.init({site:"S_babccd2183",endpoint:"https://edge.zstat.app/e"});}catch(e){}};
s.onerror=function(){};
h.appendChild(s);})();