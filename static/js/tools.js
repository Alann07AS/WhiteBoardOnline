import { SendMessage } from "./ws.js";

export const pen = {
    size: 10,
    color: "#000000"
}

export function InitTools() {
    console.log('Tools init');
}

function g(id) {
    return document.getElementById(id)
}

g("clear").onclick = ()=>{SendMessage("clear")}

const color = g("color")
color.onchange = ()=>{pen.color = color.value}

const range = g("range")
range.onchange = ()=>{pen.size = range.value}

g("export").onclick = ()=>{
    let url = g("canvas").toDataURL("image/png");
    let a = document.createElement("a");
    a.href = url;
    a.download = "mon_image.png"; // ou "mon_image.jpg"
    document.body.appendChild(a);
    a.click();
}

g("import").onclick = ()=>{

}
