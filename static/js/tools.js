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

const canvas = g("canvas")

g("clear").onclick = ()=>{SendMessage("clear")}

const color = g("color")
color.onchange = ()=>{pen.color = color.value}

const size = g("size")
size.onchange = ()=>{pen.size = size.value}
canvas.onwheel = (WE)=>{size.value = pen.size += WE.wheelDelta*(1/120); size.value = pen.size = pen.size>100?100:pen.size<1?1:pen.size }

g("export").onclick = ()=>{
    let url = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = url;
    a.download = "mon_image.png"; // ou "mon_image.jpg"
    document.body.appendChild(a);
    a.click();
}

g("import").onclick = ()=>{
    //upload
}

const impor = g("import")
impor.oninput = ()=>{
    if (impor.files.length !== 1) return
    const im = new Image()

    const reader = new FileReader();

    reader.onload = () => {
        // convert image file to base64 string
        im.src = reader.result
    }

    reader.readAsDataURL(impor.files[0]);

    im.onload = ()=> {
        console.log(im.src)
        SendMessage("getupdate", im.src)
    }
}
