"use strict";(self["webpackChunkticu"]=self["webpackChunkticu"]||[]).push([[45],{3803:function(e,a,t){t.d(a,{Z:function(){return c}});var l=t(3396),n=t(7139),r=t(4870),u=t(8741),i=(0,l.aZ)({__name:"index",props:{name:{type:String,default:""},field:{type:String,default:"nickName"}},setup(e){const a=e,t=(0,l.Fl)((()=>u.J3.find((e=>e.name===a.name||e.nickName===a.name||e.fullName===a.name))));return(a,u)=>((0,l.wg)(),(0,l.iD)("span",{class:(0,n.C_)(["cursor player-wrapper",`field-${e.field}`])},(0,n.zw)((0,r.SU)(t)[e.field]),3))}});const o=i;var c=o},3045:function(e,a,t){t.r(a),t.d(a,{default:function(){return _}});t(7658);var l=t(3396),n=t(4870),r=t(7139),u=t(6539),i=t(8741),o=t(3803),c=t(2483);const s={class:"layout-h"},m={class:"layout-h"},p={class:"score"},d={key:0,class:"play-off-score"},f={class:"layout-h"};var w=(0,l.aZ)({__name:"index",setup(e){const a=(0,l.Fl)((()=>(0,u.Z)().reverse().map((e=>{const a=e.playOffScoreList.join(":");return{...e,team1:e.matchTeamList[i.Hx.Team1],team2:e.matchTeamList[i.Hx.Team2],scoreList:e.scoreList.join(":"),playOffScoreList:"0:0"===a?null:a}})))),t=(0,c.tv)(),w=()=>{t.push({path:"/matchEdit"})},h=e=>{t.push({path:"/matchEdit",query:{matchId:e}})};return(e,t)=>{const u=(0,l.up)("el-button"),i=(0,l.up)("el-form-item"),c=(0,l.up)("el-form"),y=(0,l.up)("el-table-column"),_=(0,l.up)("el-table");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(i,null,{default:(0,l.w5)((()=>[(0,l.Wm)(u,{onClick:w},{default:(0,l.w5)((()=>[(0,l.Uk)("配置比赛")])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,{data:(0,n.SU)(a),border:"",stripe:""},{default:(0,l.w5)((()=>[(0,l.Wm)(y,{prop:"matchDate",label:"比赛时间",fixed:"left"}),(0,l.Wm)(y,{prop:"matchType",label:"比赛类型"}),(0,l.Wm)(y,{prop:"matchMode",label:"比赛模式"}),(0,l.Wm)(y,{label:"结果",width:"400px"},{default:(0,l.w5)((e=>[(0,l._)("div",s,[(0,l._)("div",m,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.row.team1,((e,a)=>((0,l.wg)(),(0,l.j4)(o.Z,{key:a,name:e.player},null,8,["name"])))),128))]),(0,l._)("div",p,[(0,l._)("div",null,(0,r.zw)(e.row.scoreList),1),e.row.playOffScoreList?((0,l.wg)(),(0,l.iD)("div",d,(0,r.zw)(e.row.playOffScoreList),1)):(0,l.kq)("",!0)]),(0,l._)("div",f,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.row.team2,((e,a)=>((0,l.wg)(),(0,l.j4)(o.Z,{key:a,name:e.player},null,8,["name"])))),128))])])])),_:1}),(0,l.Wm)(y,{label:"操作"},{default:(0,l.w5)((e=>[(0,l.Wm)(u,{type:"text",onClick:a=>h(e.row.id)},{default:(0,l.w5)((()=>[(0,l.Uk)("查看")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])],64)}}}),h=t(89);const y=(0,h.Z)(w,[["__scopeId","data-v-39c5f5e0"]]);var _=y}}]);
//# sourceMappingURL=45.a3b722d4.js.map