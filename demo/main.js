!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(t){return t.length>2&&"o"===t[0]&&"n"===t[1]}function o(t,e,n){if(e.class&&n.class&&e.class==n.class&&n.component){if(console.log("Diffing component "+e.class.name),function(t,e){for(const n in t)if(!(n in e)||t[n]!=e[n])return!1;for(const n in e)if(!(n in t)||t[n]!=e[n])return!1;return!0}(n.props,e.props))return n;{e.domElt=n.domElt,e.component=n.component,e.component.props=e.props;const r=n.props.children[0],s=n.component.render();return e.props.children="string"!=typeof r?[o(t,s,r)]:[s],e}}return""!=e.type&&e.type==n.type&&n.domElt?(console.log("Diffing dom element "+e.type),i(n.domElt,e,n),e.domElt=n.domElt,function(t,e,n){let r=n.props.children,i=e.props.children;var a=0;if("string"!=typeof r&&"string"!=typeof i)for(;a<r.length;a++){if(a>=i.length){for(let t=a;t<r.length;t++)s(r[t]);break}let e=r[a],n=i[a];e!=n&&(i[a]=o(t,n,e))}if("string"!=typeof i)for(;a<i.length;a++)t.appendChild(l(i[a]))}(n.domElt,e,n),e):(e.domElt=l(e),n.domElt&&t.replaceChild(e.domElt,n.domElt),t.appendChild(e.domElt),e)}function s(t){t.domElt?t.domElt.remove():"string"!=typeof t.props.children&&t.props.children.forEach(t=>s(t))}function i(t,e,n){const o=e.props,s=n.props;for(const e in s)e in o&&o[e]===s[e]||(r(e)?t.removeEventListener(e.substring(2),s[e]):t.removeAttribute(e));for(const e in o)e in s&&o[e]===s[e]||(r(e)?t.addEventListener(e.substring(2),o[e]):"string"==typeof o[e]&&(t.setAttribute(e,o[e]),"value"==e&&"value"in t&&(t.value=o[e])));const i=e.props.style||{},l=n.props.style||{};for(const e in l)e in i||(t.style[e]="");for(const e in i)t.style[e]!==i[e]&&(t.style[e]=i[e]||"");"string"==typeof e.props.children?t.innerHTML=e.props.children:"string"==typeof n.props.children&&(t.innerHTML="")}function l(t){if(t.class){console.log("Instantiating "+t.class.name);const e=new t.class(t.props),n=e.render();return t.component=e,t.props.children=[n],e._vNode=t,l(n)}{console.log("Instanciating "+t.type);const e=document.createElement(t.type);return"string"!=typeof t.props.children&&t.props.children.forEach(t=>e.appendChild(l(t))),i(e,t,a),t.domElt=e,e}}n.r(e);const a={type:"",props:{children:[]}};class p{constructor(t){this.props=t,this._vNode={type:"",props:Object.assign(Object.assign({},t),{children:[a]})}}setState(t){this.state=Object.assign(Object.assign({},this.state),t);const e=this._vNode.props.children;if("string"==typeof e)return;const n=e[0];n.domElt&&n.domElt.parentElement&&(e[0]=o(n.domElt.parentElement,this.render(),n))}}function c(t,e,...n){const r=Object.assign(Object.assign({},e),{children:d(n)?(o=n,o.reduce((t,e)=>(Array.isArray(e)?t=t.concat(e):t.push(e),t),[])):`${n}`});var o;return"string"==typeof t?(d(n),{type:t,props:r}):{type:"",props:r,class:t}}function d(t){return!(t.length>0&&("string"==typeof t[0]||"number"==typeof t[0]))}class u extends p{constructor(){super(...arguments),this.state={completed:!1},this.onClick=()=>{this.setState({completed:!this.state.completed}),console.log(this)}}render(){let t=m;return this.state.completed&&(t=y),c("div",{style:f},c("div",{style:h,onclick:this.props.delete}),c("div",{style:Object.assign(Object.assign({},t),g),onclick:this.onClick},c("p",{style:b},this.props.task)))}}const f={display:"flex",flexDirection:"row",alignItems:"center"},g={fontWeight:"bold",borderRadius:"0.7rem",minHeight:"2rem",flex:"1",display:"flex",margin:"0.7rem",boxShadow:"0 8px 16px 0 rgba(0,0,0,0.2)",cursor:"pointer"},h={width:"1.5rem",height:"1.5rem",borderRadius:"1rem",backgroundColor:"#FFFF00",backgroundImage:"linear-gradient(315deg, #FF1A1A 0%, #FFFF00 74%)",boxShadow:"0 8px 16px 0 rgba(0,0,0,0.2)",cursor:"pointer"},m={backgroundColor:"#00b712",backgroundImage:"linear-gradient(315deg, #00b712 0%, #5aff15 74%)"},y={backgroundColor:"#fa9c05",backgroundImage:"linear-gradient(315deg, #fa9c05 0%, #ffdd00 74%)"},b={fontWeight:"bold",margin:"auto"};const v={backgroundColor:"white",maxWidth:"500px",width:"80%",textAlign:"center",margin:"auto",padding:"1rem",boxShadow:"1px 1px 17px 1px rgba(0,0,0,.16)",borderRadius:"0.7rem"},x={minHeight:"1.8rem",border:"solid lightgray 1px",borderRadius:"0.2rem",paddingLeft:"0.3rem"},E={fontWeight:"bold",margin:"0.7rem",minHeight:"2rem"};!function(t,e){if(!e)return;o(e,t,c("div",{}))}(c("div",{style:{backgroundColor:"#f8f8f8",minHeight:"100vh",height:"100%",display:"flex"}},c(class extends p{constructor(t){super(t),this.state={text:"",tasks:["Drink apple juice","Eat vegetables"]},this.deleteTask=t=>()=>{const e=this.state.tasks;e.splice(t,1),this.setState({tasks:e})}}render(){return c("div",{style:v},c("h3",null,"µReact Todo list"),c("div",null,c("input",{type:"text",name:"task",value:this.state.text,style:x,onchange:t=>{t.target.value&&this.setState({text:t.target.value})}}),c("input",{type:"button",value:"Add",style:E,onclick:()=>{""!=this.state.text&&this.setState({text:"",tasks:[...this.state.tasks,this.state.text]})}})),this.state.tasks.map((t,e)=>c(u,{task:t,delete:this.deleteTask(e)})))}},null)),document.getElementById("app"))}]);