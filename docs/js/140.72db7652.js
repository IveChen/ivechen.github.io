(self["webpackChunkticu"]=self["webpackChunkticu"]||[]).push([[140],{6154:function(e,l,a){var t,o,n;(function(a,u){o=[],t=u,n="function"===typeof t?t.apply(l,o):t,void 0===n||(e.exports=n)})(0,(function(){"use strict";function l(e,l){return"undefined"==typeof l?l={autoBom:!1}:"object"!=typeof l&&(console.warn("Deprecated: Expected third argument to be a object"),l={autoBom:!l}),l.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function t(e,l,a){var t=new XMLHttpRequest;t.open("GET",e),t.responseType="blob",t.onload=function(){r(t.response,l,a)},t.onerror=function(){console.error("could not download file")},t.send()}function o(e){var l=new XMLHttpRequest;l.open("HEAD",e,!1);try{l.send()}catch(e){}return 200<=l.status&&299>=l.status}function n(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(t){var l=document.createEvent("MouseEvents");l.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(l)}}var u="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof a.g&&a.g.global===a.g?a.g:void 0,d=u.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=u.saveAs||("object"!=typeof window||window!==u?function(){}:"download"in HTMLAnchorElement.prototype&&!d?function(e,l,a){var d=u.URL||u.webkitURL,r=document.createElement("a");l=l||e.name||"download",r.download=l,r.rel="noopener","string"==typeof e?(r.href=e,r.origin===location.origin?n(r):o(r.href)?t(e,l,a):n(r,r.target="_blank")):(r.href=d.createObjectURL(e),setTimeout((function(){d.revokeObjectURL(r.href)}),4e4),setTimeout((function(){n(r)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,a,u){if(a=a||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(l(e,u),a);else if(o(e))t(e,a,u);else{var d=document.createElement("a");d.href=e,d.target="_blank",setTimeout((function(){n(d)}))}}:function(e,l,a,o){if(o=o||open("","_blank"),o&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof e)return t(e,l,a);var n="application/octet-stream"===e.type,r=/constructor/i.test(u.HTMLElement)||u.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||n&&r||d)&&"undefined"!=typeof FileReader){var m=new FileReader;m.onloadend=function(){var e=m.result;e=i?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=e:location=e,o=null},m.readAsDataURL(e)}else{var c=u.URL||u.webkitURL,s=c.createObjectURL(e);o?o.location=s:location.href=s,o=null,setTimeout((function(){c.revokeObjectURL(s)}),4e4)}});u.saveAs=r.saveAs=r,e.exports=r}))},9111:function(e,l,a){"use strict";a.d(l,{Z:function(){return s}});var t=a(3396),o=a(4870),n=a(7139),u=a(8665);const d=["alt","width","height"],r={key:0,class:"hero-name"};var i=(0,t.aZ)({__name:"index",props:{name:{type:String,default:""},width:{type:Number,default:50},height:{type:Number,default:40},tag:{type:String,default:"a"},showName:{type:Boolean,default:!0}},setup(e){const l=e,a=(0,t.Fl)((()=>u.Z.find((e=>e.name_loc===l.name)))),i=(0,t.Fl)((()=>`https://www.dota2.com.cn/hero/${a.value.name.replace(/npc_dota_hero_/,"")}`)),m=(0,t.Fl)((()=>`./assets/hero_image/${a.value.name}.png`));return(l,u)=>{const c=(0,t.Q2)("lazy");return(0,t.wg)(),(0,t.j4)((0,t.LL)(e.tag),{class:"cursor hero-wrapper",href:(0,o.SU)(i),target:"_blank\n  ",title:(0,o.SU)(a).name_loc},{default:(0,t.w5)((()=>[(0,t.wy)((0,t._)("img",{alt:e.name,width:e.width,height:e.height},null,8,d),[[c,(0,o.SU)(m)]]),e.showName?((0,t.wg)(),(0,t.iD)("div",r,(0,n.zw)(e.name),1)):(0,t.kq)("",!0)])),_:1},8,["href","title"])}}}),m=a(89);const c=(0,m.Z)(i,[["__scopeId","data-v-443331aa"]]);var s=c},1140:function(e,l,a){"use strict";a.r(l),a.d(l,{default:function(){return S}});a(7658);var t=a(3396),o=a(4870),n=a(7139),u=a(2748),d=a(8741),r=a(7178),i=a(8665),m=a(6539),c=a(2483),s=a(6154),f=a.n(s),p=a(2325),w=a(9111);const h={class:"layout-padding"},g={class:"gutter-v"},v={class:"layout-v"},y={class:"card-header"},b={key:0},k={key:0},_={class:"layout-h"},U={class:"layout-h"},L={key:0,class:"gutter-v"},V={key:1,class:"gutter-v"},W={key:4,class:"code"};var T=(0,t.aZ)({__name:"index",setup(e){const l=()=>Array.from({length:2},(()=>Array.from({length:5},(()=>({player:"",order:""}))))),a=()=>({matchDate:null,matchRemark:"",matchType:d.ru[0],matchMemberBPMode:d.J9[0],matchMode:d.vk[0],matchTeamList:l(),gameList:[]}),s=(0,t.Fl)((()=>d.J3.filter((e=>e.infinite||!j.form.matchTeamList.flat().find((l=>l.player===e.nickName)))))),T=(0,t.Fl)((()=>d.zS.filter((e=>"固定"===e||!j.form.matchTeamList.flat().find((l=>l.order===e)))))),j=(0,o.qj)({form:a(),isLock:!1,showCode:!1}),D=(0,c.yj)(),{matchId:S}=D.query,H=`match-edit-${S}`,x=()=>{if(S){const e=(0,m.Z)().find((e=>e.id===S));e&&(j.isLock=!0,j.form=e)}else{const e=localStorage.getItem(H);e&&(j.form=JSON.parse(e)),j.form.gameList?.length&&(j.isLock=!0)}};x();const Y=()=>{j.form.matchTeamList?.flat().find((e=>!e.player||!e.order))?r.z8.error("请选择队伍人员和顺序"):j.isLock=!0},C=()=>{j.isLock=!1},M=(e,l)=>{const a=(0,p.E)(l);"天辉"===e[l].location?e[a].location="夜魇":e[a].location="天辉"},K=()=>{const e={gameType:d.xm[0],winTeamIndex:null,bpFirstTeamIndex:"",bpHeroQueue:[],teamList:j.form.matchTeamList.map((e=>({location:null,heroList:e.map((e=>({player:e.player,hero:""})))})))};j.form.gameList.push(e)},R=e=>{j.form.gameList.splice(e,1)},z=()=>{j.isLock=!1,j.form=a()},I=()=>{j.showCode=!j.showCode},E=e=>e.heroList.map((e=>e.player)).join(e.heroList.some((e=>e.player.length>1))?"/":"");(0,t.YP)((()=>j.form),(()=>{localStorage.setItem(H,JSON.stringify(j.form))}),{deep:!0});const N=(0,t.Fl)((()=>{const e=[0,0],l=[0,0];let a=null;j.form.gameList.forEach((a=>{"加赛"===a.gameType?l[a.winTeamIndex]=l[a.winTeamIndex]+1:e[a.winTeamIndex]=e[a.winTeamIndex]+1})),e[0]>e[1]&&(a=0),e[0]<e[1]&&(a=1);const t={...j.form,scoreList:e,playOffScoreList:l,winTeamIndex:a};return Reflect.deleteProperty(t,"fileName"),t})),A=()=>{if(!j.form.matchDate)return void r.z8.error("请选择比赛时间");const e=new Blob([JSON.stringify(N.value)],{type:"application/json; charset=utf-8"});f().saveAs(e,j.form.fileName||`${j.form.matchDate}.json`)};return(e,l)=>{const a=(0,t.up)("el-alert"),r=(0,t.up)("el-date-picker"),m=(0,t.up)("el-form-item"),c=(0,t.up)("el-option"),f=(0,t.up)("el-select"),p=(0,t.up)("el-input"),D=(0,t.up)("el-form"),S=(0,t.up)("el-card"),H=(0,t.up)("el-button");return(0,t.wg)(),(0,t.iD)("div",h,[(0,t._)("div",g,[(0,t.Wm)(a,{type:"error",title:"比赛配置完后，点击复制下载配置按钮将文件给开发人员添加/覆盖数据后重新打包即可"})]),(0,t.Wm)(S,{header:"比赛设置",class:"gutter-v"},{default:(0,t.w5)((()=>[(0,t.Wm)(D,{inline:""},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{label:"比赛日期"},{default:(0,t.w5)((()=>[(0,t.Wm)(r,{size:e.size,placeholder:"选择比赛日期",type:"date",modelValue:j.form.matchDate,"onUpdate:modelValue":l[0]||(l[0]=e=>j.form.matchDate=e),"value-format":"YYYY-MM-DD"},null,8,["size","modelValue"])])),_:1}),(0,t.Wm)(m,{label:"比赛类型"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"选择比赛类型",modelValue:j.form.matchType,"onUpdate:modelValue":l[1]||(l[1]=e=>j.form.matchType=e)},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.ru),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(m,{label:"比赛模式"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"选择比赛类型",modelValue:j.form.matchMode,"onUpdate:modelValue":l[2]||(l[2]=e=>j.form.matchMode=e)},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.vk),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(m,{label:"选马方式"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"选择比赛类型",modelValue:j.form.matchMemberBPMode,"onUpdate:modelValue":l[3]||(l[3]=e=>j.form.matchMemberBPMode=e)},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.J9),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(m,{label:"备注"},{default:(0,t.w5)((()=>[(0,t.Wm)(p,{modelValue:j.form.matchRemark,"onUpdate:modelValue":l[4]||(l[4]=e=>j.form.matchRemark=e),placeholder:"请填写比赛备注"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.XH),((e,l)=>((0,t.wg)(),(0,t.j4)(S,{header:e.name,class:"gutter-v",key:l},{default:(0,t.w5)((()=>[(0,t.Wm)(D,{inline:""},{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(5,((e,a)=>(0,t.Wm)(m,{key:a},{default:(0,t.w5)((()=>[(0,t._)("div",v,[(0,t._)("div",null,[(0,t.Wm)(f,{placeholder:`选择队员${a+1}`,modelValue:j.form.matchTeamList[l][a].player,"onUpdate:modelValue":e=>j.form.matchTeamList[l][a].player=e,clearable:"",disabled:j.isLock,filterable:""},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(s),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:`${e.nickName}(${e.name})`,value:e.nickName},null,8,["label","value"])))),128))])),_:2},1032,["placeholder","modelValue","onUpdate:modelValue","disabled"])]),(0,t._)("div",null,[(0,t.Wm)(f,{placeholder:`选择队员${a+1}顺序`,modelValue:j.form.matchTeamList[l][a].order,"onUpdate:modelValue":e=>j.form.matchTeamList[l][a].order=e,clearable:"",disabled:j.isLock},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(T),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e,value:e},null,8,["label","value"])))),128))])),_:2},1032,["placeholder","modelValue","onUpdate:modelValue","disabled"])])])])),_:2},1024))),64))])),_:2},1024)])),_:2},1032,["header"])))),128)),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(j.form.gameList,((l,a)=>((0,t.wg)(),(0,t.j4)(S,{key:a,class:"gutter-v"},{header:(0,t.w5)((()=>[(0,t._)("div",y,[(0,t._)("span",null,"对局"+(0,n.zw)(a+1),1),(0,t.Wm)(H,{class:"button",text:"",onClick:e=>R(a)},{default:(0,t.w5)((()=>[(0,t.Uk)(" 删除对局 ")])),_:2},1032,["onClick"])])])),default:(0,t.w5)((()=>[(0,t.Wm)(D,{inline:""},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{label:"对局类型"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"对局类型",modelValue:l.gameType,"onUpdate:modelValue":e=>l.gameType=e},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.xm),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e,value:e},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,t.Wm)(m,{label:"获胜队伍"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"选择获胜队伍",modelValue:l.winTeamIndex,"onUpdate:modelValue":e=>l.winTeamIndex=e},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.XH),((e,a)=>((0,t.wg)(),(0,t.j4)(c,{key:a,label:E(l.teamList[e.code]),value:e.code},{default:(0,t.w5)((()=>[(0,t.Uk)((0,n.zw)(E(l.teamList[e.code]))+" ",1),l.teamList[a].location?((0,t.wg)(),(0,t.iD)("span",b," ("+(0,n.zw)(l.teamList[a].location)+") ",1)):(0,t.kq)("",!0)])),_:2},1032,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024),(0,t.Wm)(m,{label:"先BP队伍"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"选择先Ban先选队伍",modelValue:l.bpFirstTeamIndex,"onUpdate:modelValue":e=>l.bpFirstTeamIndex=e},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.XH),((e,a)=>((0,t.wg)(),(0,t.j4)(c,{key:a,label:E(l.teamList[e.code]),value:e.code},{default:(0,t.w5)((()=>[(0,t.Uk)((0,n.zw)(E(l.teamList[e.code]))+" ",1),l.teamList[a].location?((0,t.wg)(),(0,t.iD)("span",k," ("+(0,n.zw)(l.teamList[a].location)+") ",1)):(0,t.kq)("",!0)])),_:2},1032,["label","value"])))),128)),(0,t.Wm)(c,{label:"无",value:""})])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1024),(0,t.Wm)(D,null,{default:(0,t.w5)((()=>[(0,t.Wm)(m,{label:"英雄ban选顺序"},{default:(0,t.w5)((()=>[(0,t._)("div",null,(0,n.zw)(l.bpHeroQueue?.length)+"/24",1),(0,t.Wm)(f,{placeholder:"选择英雄(可以不选)",modelValue:l.bpHeroQueue,"onUpdate:modelValue":e=>l.bpHeroQueue=e,filterable:"",multiple:"",style:{width:"100%"}},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(i.Z),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e.name_loc,value:e.name_loc},null,8,["label","value"])))),128)),(0,t.Wm)(c,{value:"",label:"跳过"})])),_:2},1032,["placeholder","modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1024),(0,t._)("div",_,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(l.teamList,((a,u)=>((0,t.wg)(),(0,t.j4)(S,{key:u,header:E(l.teamList[u]),class:(0,n.C_)(["layout-fill",{"gutter-h":0===u}])},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{label:"位置"},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:"选择位置",modelValue:a.location,"onUpdate:modelValue":e=>a.location=e,onChange:e=>M(l.teamList,u)},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.Yf),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e,value:e},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])])),_:2},1024),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(a.heroList,((l,a)=>((0,t.wg)(),(0,t.j4)(m,{key:a},{default:(0,t.w5)((()=>[(0,t.Wm)(f,{placeholder:`选择队员${e.index+1}`,modelValue:l.player,"onUpdate:modelValue":e=>l.player=e,clearable:"",filterable:"",class:"gutter-h"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(d.J3),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:`${e.nickName}(${e.name})`,value:e.nickName},null,8,["label","value"])))),128))])),_:2},1032,["placeholder","modelValue","onUpdate:modelValue"]),(0,t.Wm)(f,{placeholder:"选择英雄",modelValue:l.hero,"onUpdate:modelValue":e=>l.hero=e,filterable:""},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,o.SU)(i.Z),((e,l)=>((0,t.wg)(),(0,t.j4)(c,{key:l,label:e.name_loc,value:e.name_loc},{default:(0,t.w5)((()=>[(0,t._)("div",U,[(0,t.Wm)(w.Z,{name:e.name_loc,tag:"div",class:"layout-h gutter-h",showName:!1},null,8,["name"]),(0,t.Uk)(" "+(0,n.zw)(e.name_loc),1)])])),_:2},1032,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)))),128))])),_:2},1032,["header","class"])))),128))])])),_:2},1024)))),128)),j.isLock?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",L,[(0,t.Wm)(H,{onClick:Y,type:"success"},{default:(0,t.w5)((()=>[(0,t.Uk)(" 锁定参赛人员 ")])),_:1})])),j.isLock?((0,t.wg)(),(0,t.iD)("div",V,[(0,t.Wm)(H,{onClick:C,type:"success"},{default:(0,t.w5)((()=>[(0,t.Uk)(" 解锁参赛人员 ")])),_:1}),(0,t.Wm)(H,{onClick:K,type:"success",icon:(0,o.SU)(u.v37)},{default:(0,t.w5)((()=>[(0,t.Uk)(" 添加对局 ")])),_:1},8,["icon"]),(0,t.Wm)(H,{onClick:A,type:"success"},{default:(0,t.w5)((()=>[(0,t.Uk)(" 复制下载配置 ")])),_:1}),(0,t.Wm)(H,{type:"danger",style:{"margin-left":"100px"},onClick:z},{default:(0,t.w5)((()=>[(0,t.Uk)(" 清空 ")])),_:1})])):(0,t.kq)("",!0),j.showCode?(0,t.kq)("",!0):((0,t.wg)(),(0,t.j4)(H,{key:2,onClick:I},{default:(0,t.w5)((()=>[(0,t.Uk)(" 查看配置 ")])),_:1})),j.showCode?((0,t.wg)(),(0,t.j4)(H,{key:3,onClick:I},{default:(0,t.w5)((()=>[(0,t.Uk)(" 收起配置 ")])),_:1})):(0,t.kq)("",!0),j.showCode?((0,t.wg)(),(0,t.iD)("pre",W,[(0,t.Uk)("  "),(0,t._)("code",null,(0,n.zw)((0,o.SU)(N)),1),(0,t.Uk)("\n")])):(0,t.kq)("",!0)])}}}),j=a(89);const D=(0,j.Z)(T,[["__scopeId","data-v-c46e27a8"]]);var S=D}}]);
//# sourceMappingURL=140.72db7652.js.map