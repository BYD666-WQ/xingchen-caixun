
var WORKER_BASE = ''; // 例：https://xingchen-cms.xxx.workers.dev（部署 Worker 后填这里）
var BACKEND = WORKER_BASE ? 'worker' : 'contents';
var ATTRS = {"10":{"z":"鸡","c":"蓝","w":"火"},"11":{"z":"猴","c":"绿","w":"火"},"12":{"z":"羊","c":"红","w":"金"},"13":{"z":"马","c":"红","w":"金"},"14":{"z":"蛇","c":"蓝","w":"水"},"15":{"z":"龙","c":"蓝","w":"水"},"16":{"z":"兔","c":"绿","w":"木"},"17":{"z":"虎","c":"绿","w":"木"},"18":{"z":"牛","c":"红","w":"火"},"19":{"z":"鼠","c":"红","w":"火"},"20":{"z":"猪","c":"蓝","w":"土"},"21":{"z":"狗","c":"绿","w":"土"},"22":{"z":"鸡","c":"绿","w":"水"},"23":{"z":"猴","c":"红","w":"水"},"24":{"z":"羊","c":"红","w":"木"},"25":{"z":"马","c":"蓝","w":"木"},"26":{"z":"蛇","c":"蓝","w":"金"},"27":{"z":"龙","c":"绿","w":"金"},"28":{"z":"兔","c":"绿","w":"土"},"29":{"z":"虎","c":"红","w":"土"},"30":{"z":"牛","c":"红","w":"水"},"31":{"z":"鼠","c":"蓝","w":"水"},"32":{"z":"猪","c":"绿","w":"火"},"33":{"z":"狗","c":"绿","w":"火"},"34":{"z":"鸡","c":"红","w":"金"},"35":{"z":"猴","c":"红","w":"金"},"36":{"z":"羊","c":"蓝","w":"土"},"37":{"z":"马","c":"蓝","w":"土"},"38":{"z":"蛇","c":"绿","w":"木"},"39":{"z":"龙","c":"绿","w":"木"},"40":{"z":"兔","c":"红","w":"火"},"41":{"z":"虎","c":"蓝","w":"火"},"42":{"z":"牛","c":"蓝","w":"金"},"43":{"z":"鼠","c":"绿","w":"金"},"44":{"z":"猪","c":"绿","w":"水"},"45":{"z":"狗","c":"红","w":"水"},"46":{"z":"鸡","c":"红","w":"木"},"47":{"z":"猴","c":"蓝","w":"木"},"48":{"z":"羊","c":"蓝","w":"火"},"49":{"z":"马","c":"绿","w":"火"},"01":{"z":"马","c":"红","w":"水"},"02":{"z":"蛇","c":"红","w":"火"},"03":{"z":"龙","c":"蓝","w":"火"},"04":{"z":"兔","c":"蓝","w":"金"},"05":{"z":"虎","c":"绿","w":"金"},"06":{"z":"牛","c":"绿","w":"土"},"07":{"z":"鼠","c":"红","w":"土"},"08":{"z":"猪","c":"红","w":"木"},"09":{"z":"狗","c":"蓝","w":"木"}};
var REPO='BYD666-WQ/xingchen-caixun', BRANCH='main', KEY='xc-gh-pat';
var CMS_BACKEND='contents'; // contents | gh-actions（B 方案留口，未实现时走 contents）
var BANNED_FILES=['data/ziliao-list.json','data/ziliao-list-macau.json','data/ziliao-list-macauold.json','data/ziliao-list-hk.json','data/ziliao-list-happy8.json','data/hub.json','data/tuku.json','data/guilv.json','data/num-attrs.json'];
function guardFile(path){ if(BANNED_FILES.indexOf(path)>=0) throw new Error('该文件过大（>1MB），禁止走 Contents API：'+path); }
async function saveFile(path,obj,msg){
  if(CMS_BACKEND==='gh-actions'){ throw new Error('gh-actions 后端尚未接入（B 方案留口）'); }
  guardFile(path);
  for(var attempt=0;attempt<2;attempt++){
    try{ return await putFile(path,obj,msg); }
    catch(e){
      var m=String(e.message||'');
      if(attempt===0 && (e.status===409 || e.status===422)){
        await new Promise(function(r){setTimeout(r,800)});
        continue;
      }
      throw e;
    }
  }
}
var PAGES='https://byd666-wq.github.io/xingchen-caixun/';
var RAW='https://raw.githubusercontent.com/'+REPO+'/'+BRANCH+'/';
var draw=null, play=null, LOADED=false;
function $(id){return document.getElementById(id)}
function Msg(t,ok){var m=$('msg');m.style.display='block';m.style.background=ok?'#0b7a45':'#a33';m.textContent=t;clearTimeout(m._t);m._t=setTimeout(function(){m.style.display='none'},6000)}
function pad(n){return (n<10?'0':'')+n}
function ballColor(c){return c==='红'?'#e71607':(c==='蓝'?'#2873e6':'#1fb61d')}
function attrsOf(num){var k=pad(parseInt(num,10));return ATTRS[k]||{}}
function parseNums(s){return String(s||'').trim().replace(/,/g,' ').split(/\s+/).filter(Boolean).map(function(x){return pad(parseInt(x,10))})}
function numsWithAttrs(list){return list.map(function(c){var a=attrsOf(c);return {c:c,z:a.z||'',color:a.c||'',wuxing:a.w||''}})}
function token(){return localStorage.getItem(KEY)||''}
async function api(url,opt){opt=opt||{};opt.headers=Object.assign({'Authorization':'Bearer '+token(),'Accept':'application/vnd.github+json'},opt.headers||{});var r=await fetch(url,opt);var j=null;try{j=await r.json()}catch(e){}if(!r.ok){var err=new Error((j&&j.message)||('HTTP '+r.status));err.status=r.status;throw err}return j}
async function getFileSha(path){try{var j=await api('https://api.github.com/repos/'+REPO+'/contents/'+path+'?ref='+BRANCH);return j.sha}catch(e){if(e.status===404)return null;throw e}}
async function putFile(path,obj,msg){"use strict";
  var content=btoa(unescape(encodeURIComponent(JSON.stringify(obj,null,1))));
  var sha=await getFileSha(path);
  var payload={message:msg,content:content,branch:BRANCH};if(sha)payload.sha=sha;
  await api('https://api.github.com/repos/'+REPO+'/contents/'+path,{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
}
async function wfetch(path, opt) {
  opt = opt || {}; opt.credentials = 'include';
  opt.headers = Object.assign({ 'content-type': 'application/json' }, opt.headers || {});
  var r = await fetch(WORKER_BASE + path, opt);
  var j = null; try { j = await r.json(); } catch (e) {}
  if (!r.ok) throw new Error((j && j.error) || ('HTTP ' + r.status));
  return j;
}
async function loadAll(){
  var t=Date.now();
  var dr, pl, cp = {};
  if (BACKEND === 'worker') {
    var cfg = await wfetch('/api/config');
    dr = cfg.files['hongkong-draw']; pl = cfg.files['play'] || {}; cp = cfg.files['site-copy'] || {};
  } else {
    dr = await fetch(RAW + 'data/manual-draw.json?t=' + t).then(function (r) { return r.json(); });
  }
  if (BACKEND !== 'worker') {
    pl = await fetch(RAW + 'data/manual-play.json?t=' + t).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
    try { cp = await fetch(RAW + 'data/site-copy.json?t=' + t).then(function (r) { return r.ok ? r.json() : {}; }); } catch (e) {}
  }
  $('c-brand').value=cp.brand||'香港摇钱树'; $('c-slogan').value=cp.slogan||'官方开奖信息';
  $('c-notice').value=cp.notice||''; $('c-disclaimer').value=cp.disclaimer||'数据来自官方公开信息，仅供参考。';
  draw=dr;play=pl;LOADED=true;
  $('g-name').value=dr.name||''; $('g-issue').value=dr.issue||''; $('g-drawtime').value=dr.drawTime||'';
  $('g-dailytime').value=dr.dailyTime||'21:34';
  $('g-nums').value=(dr.nums||[]).map(function(n){return n.c}).join(' ');
  try { var zl = BACKEND === 'worker' ? (cfg.files['ziliao']||{}) : await fetch(RAW+'data/manual-ziliao.json?t='+t).then(function(r){return r.ok?r.json():{}}); window.__ZL=zl; renderZl(zl); } catch(e){}
  $('p-issue').value=pl.issue||''; $('p-oe').value=pl.oddEven||'单'; $('p-zs').value=(pl.threeZodiac||[]).join(' ');
  $('p-note').value=pl.note||'';
  renderPreview(); renderHistory();
}
function renderPreview(){
  if (typeof updateNumsHint === 'function') updateNumsHint();
  var list=parseNums($('g-nums').value);
  $('preview').innerHTML=list.map(function(c){var a=attrsOf(c);return '<span class="ball" style="background:'+ballColor(a.c)+'">'+c+'<i>'+(a.w||'')+'/'+(a.z||'')+'</i></span>'}).join('');
}
function renderZl(zl){
  var rows=(zl&&zl.rows)||[]; window.__ZL=zl||{rows:[]};
  $('zl-bulk').value=rows.map(function(r){
    var zs=(r.threeZodiac||[]).join('');
    return r.issue+' '+r.oddEven+' '+zs+' '+((r.result&&r.result.c)||'');
  }).join('\n');
}
function renderHistory(){
  var tb=$('hist-tbl').querySelector('tbody');var h=(draw&&draw.history)||[];
  tb.innerHTML=h.map(function(row,i){
    return '<tr><td><input data-hi="'+i+'" data-k="issue" value="'+row.issue+'" style="min-height:40px;width:80px"></td>'+
      '<td><input data-hi="'+i+'" data-k="nums" value="'+row.nums.map(function(n){return n.c}).join(' ')+'" style="min-height:40px;font-size:13px"></td>'+
      '<td><button class="small gray" data-del="'+i+'" style="min-width:40px">删</button></td></tr>';
  }).join('');
  tb.querySelectorAll('input').forEach(function(inp){inp.addEventListener('change',function(){
    var i=+inp.getAttribute('data-hi'),k=inp.getAttribute('data-k');
    if(k==='issue')h[i].issue=parseInt(inp.value,10)||h[i].issue;
    else h[i].nums=numsWithAttrs(parseNums(inp.value));
  })});
  tb.querySelectorAll('button[data-del]').forEach(function(b){b.addEventListener('click',function(){h.splice(+b.getAttribute('data-del'),1);renderHistory()})});
}
function commitList(){
  if(!token())return;
  api('https://api.github.com/repos/'+REPO+'/commits?per_page=10').then(function(list){
    $('commits').innerHTML=list.map(function(c){return '<div class="commit"><span>'+c.sha.slice(0,7)+' '+c.commit.message.split('\n')[0].slice(0,26)+'</span><button class="small gray" data-rb="'+c.sha+'">回滚</button></div>'}).join('');
    $('commits').querySelectorAll('button[data-rb]').forEach(function(b){b.addEventListener('click',function(){rollback(b.getAttribute('data-rb'))})});
  }).catch(function(){});
}
async function rollback(sha){
  if(!confirm('把 data 文件恢复到 '+sha.slice(0,7)+' 这一版并提交？'))return;
  try{
    for(var f of ['data/manual-draw.json','data/manual-play.json']){
      var j=await api('https://api.github.com/repos/'+REPO+'/contents/'+f+'?ref='+sha);
      var txt=decodeURIComponent(escape(atob(j.content.replace(/\n/g,''))));
      var obj=JSON.parse(txt);var cur=await getFileSha(f);
      var payload={message:'rollback to '+sha.slice(0,7),content:btoa(unescape(encodeURIComponent(JSON.stringify(obj,null,1)))),branch:BRANCH};if(cur)payload.sha=cur;
      await api('https://api.github.com/repos/'+REPO+'/contents/'+f,{method:'PUT',body:JSON.stringify(payload),headers:{'Content-Type':'application/json'}});
    }
    Msg('已提交回滚，约 1-2 分钟生效',true);poll();
  }catch(e){Msg('回滚失败：'+e.message,false)}
}
async function pagesDispatch(){
  try{
    if(!token())return;
    var r=await fetch('https://api.github.com/repos/'+REPO+'/actions/workflows/pages.yml/dispatches',{method:'POST',headers:{Authorization:'Bearer '+token(),Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify({ref:BRANCH})});
    if(r.status>=400){console.log('[pages-dispatch] skip HTTP '+r.status)}else{console.log('[pages-dispatch] ok')}
  }catch(e){console.log('[pages-dispatch] ignored '+(e&&e.message))}
}
async function save(){
  if(!token()){Msg('请先保存密钥（页面顶部）',false);setState('缺少密钥');return}
  if(!LOADED){Msg('未载入成功，禁止保存（请刷新页面）',false);setState('载入失败');return}
  var nums=parseNums($('g-nums').value);
  if(nums.length!==7)return Msg('开奖号码必须 7 个（6+1），当前 '+nums.length+' 个',false);
  var zsRaw = String($('p-zs').value || '').replace(/[\s,，、]+/g, '');
  if (!/^[鼠牛虎兔龙蛇马羊猴鸡狗猪]{3}$/.test(zsRaw)) return Msg('三肖必须是 3 个生肖（例：狗马猴）', false);
  if (new Set(zsRaw.split('')).size !== 3) return Msg('三肖不能重复（例：不要 猪猪猪）', false);
  var zs = zsRaw.split('');
  // 校验通过后再存 token
  localStorage.setItem(KEY,token());
  if ((draw&&draw.history||[]).length>0 && String($('zl-bulk').value||'').trim()===''){return Msg('历史/资料区为空，已阻止保存（防止误清空）',false)}
  var newDraw={
    name:$('g-name').value.trim()||'新香港',
    issue:parseInt($('g-issue').value,10)||1,
    drawTime:$('g-drawtime').value.trim()||'每天 21:34',
    dailyTime:$('g-dailytime').value.trim()||'21:34',
    status:'sample',
    nums:numsWithAttrs(nums),
    history:(draw&&draw.history||[]),
    updated:new Date().toISOString()
  };
  var newPlay={name:newDraw.name,issue:newDraw.issue,oddEven:$('p-oe').value,threeZodiac:zs,note:$('p-note').value.trim(),status:'live',updated:new Date().toISOString()};
  var btn=$('btn-save');btn.disabled=true;btn.textContent='提交中…';
  $('btn-save-bar').disabled=true;setState('提交中…请勿关闭页面');
  try{
    var copy={brand:$('c-brand').value.trim(),slogan:$('c-slogan').value.trim(),notice:$('c-notice').value.trim(),disclaimer:$('c-disclaimer').value.trim(),updated:new Date().toISOString()};
    var zlRows = String($('zl-bulk').value||'').split('\n').map(function(l){return l.trim()}).filter(Boolean).map(function(l){
      var p=l.replace(/,/g,' ').split(/\s+/).filter(Boolean);
      var issue=parseInt(p.shift(),10); var oe=p.shift()==='双'?'双':'单'; var zs=String(p.shift()||'').slice(0,3).split('');
      var res=p.shift()||''; var at=attrsOf(res);
      return {issue:issue,oddEven:oe,threeZodiac:zs,result:{c:pad(parseInt(res,10)),z:at.z||''},text:'内幕【提前公开】',status:'live',updated:new Date().toISOString()};
    });
    var newZl={name:newDraw.name,rows:zlRows,updated:new Date().toISOString()};
    if (BACKEND === 'worker') {
      await wfetch('/api/save',{method:'POST',body:JSON.stringify({game:'ziliao',data:newZl})});
      await wfetch('/api/save',{method:'POST',body:JSON.stringify({game:'play',data:newPlay})});
      await wfetch('/api/save',{method:'POST',body:JSON.stringify({game:'site-copy',data:copy})});
    } else {
      await saveFile('data/manual-draw.json',newDraw,'CMS: update draw');
      await saveFile('data/manual-play.json',newPlay,'CMS: update play');
      await saveFile('data/site-copy.json',copy,'CMS: update site copy');
      await saveFile('data/manual-ziliao.json',newZl,'cms: update ziliao');
    }
    pagesDispatch(); // 保存成功后触发 Pages 构建；无 workflow 权限时内部忽略、不阻塞
    setState('已提交，校验中…');
    try { await verifySaved(newPlay, newDraw); Msg('已提交，读回校验通过；约 1-2 分钟生效',true); setState('已提交，读回校验通过…'); }
    catch (ve) { Msg('已提交，但读回校验失败：' + ve.message + '（请刷新后重试恢复）',false); setState('校验失败：' + ve.message); }
    poll();
    poll();
    draw=newDraw;play=newPlay;renderPreview();
  }catch(e){Msg('保存失败：'+e.message,false);setState('保存失败：'+e.message)}
  btn.disabled=false;btn.textContent='保存并发布';
  $('btn-save-bar').disabled=false;
  commitList();
}
async function verifySaved(expectedPlay, expectedDraw){
  var p = await fetch(RAW + 'data/manual-play.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.json(); });
  var d = await fetch(RAW + 'data/manual-draw.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.json(); });
  var Z = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
  var zs = p && p.threeZodiac;
  if (!Array.isArray(zs) || zs.length !== 3 || zs.some(function (z) { return Z.indexOf(z) < 0; })) throw new Error('threeZodiac 读回校验失败：' + JSON.stringify(zs));
  if (String(p.issue) !== String(expectedPlay.issue)) throw new Error('play.issue 读回不一致：' + p.issue + ' != ' + expectedPlay.issue);
  if (!d || !Array.isArray(d.nums) || d.nums.length !== 7) throw new Error('draw.nums 结构非法');
  if (String(d.issue) !== String(expectedDraw.issue)) throw new Error('draw.issue 读回不一致：' + d.issue + ' != ' + expectedDraw.issue);
  return true;
}
function poll(){
  var tries=0;
  var timer=setInterval(async function(){
    tries++;
    try{
      var d=await fetch(RAW+'data/manual-draw.json?t='+Date.now()).then(function(r){return r.json()});
      if(String(d.issue)===String($('g-issue').value) && d.name===$('g-name').value){
        clearInterval(timer);Msg('已生效 ✓ 打开站点查看：'+PAGES,true);setState('已生效 ✓');
      }else if(tries>=8){clearInterval(timer);Msg('仍在构建中，稍后刷新页面即可',false)}
    }catch(e){}
    if(tries>=8)clearInterval(timer);
  },15000);
}
// 事件
$('btn-rand').addEventListener('click',function(){
  var pool=[];for(var i=1;i<=49;i++)pool.push(i);var pick=[];
  while(pick.length<7){pick.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0])}
  $('g-nums').value=pick.map(function(n){return pad(n)}).join(' ');renderPreview();
});
$('btn-calc').addEventListener('click',renderPreview);
$('g-nums').addEventListener('input',function(){
  var raw=$('g-nums').value.replace(/[^0-9]/g,'');
  if(raw.length===14 && $('g-nums').value.replace(/[0-9]/g,'').replace(/\s/g,'').length===0){
    $('g-nums').value=(raw.match(/.{1,2}/g)||[]).join(' ');
  }
  updateNumsHint(); renderPreview();
});
$('g-nums').addEventListener('paste',function(e){
  var t=(e.clipboardData||window.clipboardData).getData('text')||'';
  var s=t.replace(/[^0-9]/g,'');
  if(s.length>=14 && t.replace(/\s/g,'').length<=14){
    e.preventDefault();
    $('g-nums').value=(s.match(/.{1,2}/g)||[]).slice(0,7).join(' ');
    updateNumsHint(); renderPreview();
  }
});
function updateNumsHint(){
  var h=$('nums-hint'); if(!h) return;
  var n=parseNums($('g-nums').value).length;
  h.style.color = n===7 ? '#0b7a45' : '#a33';
  h.textContent = n===7 ? ('已识别 7 个号码：'+$('g-nums').value.trim()) : ('已识别 '+n+'/7 个，还差 '+(7-n)+' 个');
}
updateNumsHint();
$('btn-addhist').addEventListener('click',function(){draw.history=draw.history||[];draw.history.unshift({issue:(parseInt($('g-issue').value,10)||1)-1,nums:numsWithAttrs(parseNums($('g-nums').value))});renderHistory()});
$('btn-bulk').addEventListener('click',function(){
  var lines=$('hist-bulk').value.split('\n').map(function(l){return l.trim()}).filter(Boolean);
  var added=0;draw.history=draw.history||[];
  lines.forEach(function(l){
    var parts=l.replace(/,/g,' ').split(/\s+/).filter(Boolean);var issue=parseInt(parts.shift(),10);if(!issue)return;
    var nums=numsWithAttrs(parts.slice(0,7));if(nums.length!==7)return;
    var idx=-1;draw.history.forEach(function(r,i){if(String(r.issue)===String(issue))idx=i});
    var row={issue:issue,nums:nums};if(idx>=0)draw.history[idx]=row;else draw.history.push(row);added++;
  });
  draw.history.sort(function(a,b){return b.issue-a.issue});renderHistory();Msg('导入 '+added+' 期，记得点「保存并发布」',true);
});
$('btn-save').addEventListener('click',save);
$('btn-save-bar').addEventListener('click',save);
if($('btn-save-top'))$('btn-save-top').addEventListener('click',save);
function setState(t){var el=$('save-state');if(el)el.textContent=t}
function tokText(t){return t ? ('\u2713 \u5df2\u4fdd\u5b58\uff08\u672c\u673a\uff09\u2026' + t.slice(-4)) : '\u672a\u4fdd\u5b58\u5bc6\u94a5'}
function refreshTokenState(){var el=$('token-state');if(el)el.textContent=tokText(token())}
function saveTokenNow(){var v=$('token').value.trim();if(!v){Msg('请先粘贴密钥',false);return}localStorage.setItem(KEY,v);refreshTokenState();Msg('密钥已保存（本机）',true)}
$('btn-token-save').addEventListener('click',saveTokenNow);
$('token').addEventListener('paste',function(){setTimeout(function(){saveTokenNow()},80)});
$('token').addEventListener('input',function(){var v=this.value.trim();if(/^github_pat/.test(v)||v.length>40){localStorage.setItem(KEY,v);refreshTokenState();Msg('密钥已保存（本机）',true)}});
$('btn-clear').addEventListener('click',function(){localStorage.removeItem(KEY);$('token').value='';refreshTokenState();Msg('已清除本机密钥',true)});
if($('token'))$('token').value=token();refreshTokenState();
$('btn-refresh').addEventListener('click',function(){loadAll().then(function(){enableSave();Msg('已重新载入线上数据',true)}).catch(function(e){LOADED=false;setSaveEnabled(false);Msg('重新载入失败：'+e.message,false)})});
if($('token'))$('token').value=token();
if (BACKEND === 'worker') {
  $('login-panel').style.display = '';
  $('btn-login').addEventListener('click', async function(){
    var b=this; b.disabled=true; b.textContent='登录中…';
    try { await wfetch('/api/login',{method:'POST',body:JSON.stringify({password:$('pw').value})});
      Msg('登录成功',true); $('btn-logout').style.display=''; loadAll().then(commitList).catch(function(){});
    } catch(e){ Msg('登录失败：'+e.message,false); }
    b.disabled=false; b.textContent='登录';
  });
  $('btn-logout').addEventListener('click', async function(){
    try { await wfetch('/api/logout',{method:'POST',body:'{}'}); } catch(e){}
    Msg('已退出登录',true); $('btn-logout').style.display='none';
  });
}
function enableSave(){setSaveEnabled(true);LOADED=true}
function setSaveEnabled(on){['btn-save','btn-save-bar','btn-save-top'].forEach(function(id){var b=$(id);if(b)b.disabled=!on})}
loadAll().then(function(){LOADED=true;setSaveEnabled(true);commitList()}).catch(function(e){LOADED=false;setSaveEnabled(false);Msg('载入失败，已禁用保存：'+e.message,false)});
