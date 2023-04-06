import { initCanvas } from "./canvas.js";
import { InitTools } from "./tools.js";
import { startws } from "./ws.js";

const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    console.log(window.innerHeight);
    }
    window.addEventListener("resize", documentHeight)
    documentHeight()

initCanvas()
InitTools()
startws()