// import * as header from "/interface/header/header";
// import * as menu from "/interface/menu/menu";

//commonJS module
//const script = require(‘./js/script’);

// import jquery , will need this for build to compile correctly when using jquery
import * as jquery from 'jquery';
(window as any).$ = (window as any).jQuery = jquery;
console.log("stepped through imports, help me");

//ELE module
// function menuEle() {
//     // stuff
// }
// export { menuEle };