import p5 from "p5"
import { mySketch } from "./sketch.js";
import { music } from './music.js';
import "./style.css";

console.log(
  "%c Created by Javier Zaleta Martínez ",
  "color: #fff; background: hsl(0, 93%, 45%); padding: 5px 0;"
);
console.log();

new p5(mySketch, document.getElementById("sketch"));

music();
