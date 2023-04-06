import { OnWsMessage, SendMessage } from "./ws.js";
import { pen } from "./tools.js";

const canvas = document.getElementById("canvas")

/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')
console.log(ctx.get);
const canvasSeting = {
    height: 1000,
    width: 1000
} 
export function initCanvas() {
    canvas.setAttribute("height", canvasSeting.height)
    canvas.setAttribute("width", canvasSeting.width)
    OnWsMessage.set("point", Point)
    OnWsMessage.set("clear", Clear)
    OnWsMessage.set("getupdate", GetUpdate)
    OnWsMessage.set("sendupdate", SendUpdate)
}


/**@param {TouchEvent} e  */
canvas.ontouchmove = (e) =>{
    Array(...e.touches).forEach(e2 => {
        Draw(e2, "touch")
    });
}
/**@param {TouchEvent} e  */
canvas.onmousemove = (e) =>{
        Draw(e)
}
/**
 * @param {MouseEvent} eve 
*/
function Draw(eve, overflo) {
    if (eve.buttons !== 1 && overflo !== "touch" ) return
    // Point(getX(eve), getY(eve), 10)
    SendMessage("point", getX(eve), getY(eve), pen.size, pen.color)
}


function Point(x, y, r = 1, color = 'black') {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2*Math.PI)
    ctx.fill();
}

function Clear() {
    ctx.clearRect(0, 0, canvasSeting.height, canvasSeting.width)
}

function SendUpdate() {
    SendMessage("getupdate",  canvas.toDataURL('image/png'))
}

function GetUpdate(imgdata) {
    const img = new Image(canvasSeting.width, canvasSeting.height)
    console.log(imgdata);
    img.src = imgdata
    img.onload = ()=>{
        ctx.drawImage(img, 0, 0)
    }
}

function getX(eve) {
    const info = canvas.getBoundingClientRect()
    return (eve.clientX - canvas.offsetLeft) * (canvasSeting.width/info.width)
}

function getY(eve) {
    const info = canvas.getBoundingClientRect()
    return (eve.clientY - canvas.offsetTop) * (canvasSeting.height/info.height)
}