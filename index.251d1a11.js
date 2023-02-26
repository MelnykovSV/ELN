function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n;return e};class n{constructor(){this.fractionGlobalID=n.fractionGlobalID+=1,this.mass=null,this.purity=null,this.isNMR=!1,this.isLCMS=!1,this.comment=!1}}e(t)(n,"fractionGlobalID",0);class o{addFraction(){this.fractions.push(new n)}constructor({mw:e=null,dbID:t=null,smiles:n=null,isTestSuccessful:o=!1,isScalingSuccessful:a=!1,fractions:l=[]}={},c){this.compoundGlobalID=c,this.mw=e,this.smiles=n,this.isTestSuccessful=o,this.isScalingSuccessful=a,this.fractions=l,this.dbID=t}}function a({compoundGlobalID:e,mw:t="",smiles:n="",isTestSuccessful:o,isScalingSuccessful:a,dbID:l="",fractions:c}={}){const s=`<form action="#" class="compound-form" data-id = '${e}'>\n    <div class="compound-form__body">\n      <div class="compound-form__upper-part">\n        <div class="compound-form-canvas-container">\n          <canvas id="canvas${e}"></canvas>\n        </div>\n        <div class="compound-form__compound-data">\n          <label class="">\n            ID\n            <input type="text" name="dbID" value="${l}" />\n          </label>\n          <label class="">\n            MW\n            <input type="text" name="mw" value="${t}" />\n          </label>\n          <label>\n            <input type="checkbox" id="" name="isTestSuccessful" ${!0===o?"checked":""} />\n            Test\n          </label>\n          <label>\n            <input type="checkbox" id="" name="isScalingSuccessful" ${!0===a?"checked":""} />\n            Scaling\n          </label>\n        </div>\n      </div>\n      <div class="compound-form__lower-part">\n        <label class="text-input-label">\n          SMILES\n          <input type="text" name="smiles" value="${n}" />\n        </label>\n        <div class="compound-from__button-block">\n          <button type="submit">Add task</button>\n          <button type="submit">Add compund</button>\n          <label>\n            Fractions\n            <input type="checkbox" name="" id="" />\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class="compound-form__fractions">\n      <div class="compound-form__fractions-main">\n        <label>\n          Fractions\n          <select name="" id="">\n            <option value="">Fraction 1</option>\n            <option value="">Fraction 2</option>\n          </select>\n        </label>\n        <button type="submit">Add fraction</button>\n      </div>\n      <div class="compound-form__single-fraction">\n        <div class="compound-form__single-fraction-upper-part">\n          <div class="compound-form__single-fraction-characteristics">\n            <label class="">\n              Mass\n              <input type="text" />\n            </label>\n            <label class="">\n              Purity\n              <input type="text" />\n            </label>\n          </div>\n          <div class="compound-form__single-fraction-spectra">\n            <label>\n              <input type="checkbox" name="" id="" />\n              NMR\n            </label>\n            <label>\n              <input type="checkbox" name="" id="" />\n              LCMS\n            </label>\n          </div>\n        </div>\n        <div class="compound-form__single-fraction-lower-part">\n          <label class="">\n            Comments\n            <textarea name="" id="" cols="30" rows="3"></textarea>\n          </label>\n        </div>\n      </div>\n    </div>\n  </form>`;document.querySelector(".main-page").insertAdjacentHTML("beforeend",s)}e(t)(o,"compoundGlobalID",0);class l{addCompound(e){this.body.push(new o({},e))}constructor({schemeGlobalID:e=(l.schemeGlobalID+=1),body:t=[]}={}){this.schemeGlobalID=e,this.body=t}}e(t)(l,"schemeGlobalID",0);class c{constructor({body:n=[]}={}){e(t)(this,"body",void 0),this.body=n}}document.querySelector(".page-button"),document.querySelector(".scheme-button");const s=document.querySelector(".compound-button"),i=document.querySelector(".main-page");document.querySelector(".main-canvas"),document.querySelector(".main-input");let d=parseInt(localStorage.getItem("globalCompoundID"))||0,r=new SmilesDrawer.Drawer({width:150,height:150});s.addEventListener("click",(()=>{d+=1,localStorage.setItem("globalCompoundID",d),u.body[0].addCompound(d),a(u.body[0].body[u.body[0].body.length-1]),i.lastChild.addEventListener("input",(e=>{if("INPUT"===e.target.nodeName){u.body[0].body.find((t=>t.compoundGlobalID===parseInt(e.currentTarget.dataset.id)))[e.target.name]=e.target.value,localStorage.setItem("pageBody",JSON.stringify(u)),"smiles"===e.target.name&&SmilesDrawer.parse(e.target.value,(function(t){r.draw(t,`canvas${e.currentTarget.dataset.id}`,"light",!1)}))}i.lastChild.addEventListener("change",(e=>{if("INPUT"===e.target.nodeName&&"checkbox"===e.target.type){console.log("check"),console.log(e.target.checked);u.body[0].body.find((t=>t.compoundGlobalID===parseInt(e.currentTarget.dataset.id)))[e.target.name]=e.target.checked,localStorage.setItem("pageBody",JSON.stringify(u))}}))})),localStorage.setItem("pageBody",JSON.stringify(u))}));let u=function(){if(!localStorage.getItem("pageBody"))return null;const e=new c,t=JSON.parse(localStorage.getItem("pageBody"));for(schemeData of t.body){const t=new l;for(compoundData of(e.body.push(t),schemeData.body)){const e=new o(compoundData,compoundData.compoundGlobalID);for(fractionData of(t.body.push(e),compoundData.fractions)){const t=new n;e.fractions.push(t)}}}return e}();if(null===u&&(u=new c),0!==u.body.length){const e=u.body[0].body.sort(((e,t)=>{e.compoundGlobalID,t.compoundGlobalID}));for(const t of e){a(t);document.querySelector(`#canvas${t.compoundGlobalID}`);SmilesDrawer.parse(t.smiles,(function(e){r.draw(e,`canvas${t.compoundGlobalID}`,"light",!1)}))}}else console.log("local storage is empty"),u.body.push(new l);const m=document.querySelectorAll("[data-id]");for(item of m)item.addEventListener("input",(e=>{if("INPUT"===e.target.nodeName&&"text"===e.target.type){u.body[0].body.find((t=>t.compoundGlobalID===parseInt(e.currentTarget.dataset.id)))[e.target.name]=e.target.value,localStorage.setItem("pageBody",JSON.stringify(u)),"smiles"===e.target.name&&SmilesDrawer.parse(e.target.value,(function(t){r.draw(t,`canvas${e.currentTarget.dataset.id}`,"light",!1)}))}})),item.addEventListener("change",(e=>{if("INPUT"===e.target.nodeName&&"checkbox"===e.target.type){console.log("check"),console.log(e.target.checked);u.body[0].body.find((t=>t.compoundGlobalID===parseInt(e.currentTarget.dataset.id)))[e.target.name]=e.target.checked,localStorage.setItem("pageBody",JSON.stringify(u))}}));
//# sourceMappingURL=index.251d1a11.js.map
