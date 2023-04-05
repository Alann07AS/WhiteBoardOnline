export function startws() {
    console.log("ws init");
}

export const OnWsMessage = new Map()
/**@type {WebSocket} */
var conn 
export function SendMessage(type, ...params) {
    conn.send(JSON.stringify({
        type: type,
        params: params
    }))
}
window.onload = ()=>{
    if (window["WebSocket"]) {
        conn = new WebSocket(`ws://${window.location.host}/ws`);
        conn.onmessage = (message)=>{
            message = JSON.parse(message.data)
            if (!OnWsMessage.has(message.type)) {console.error(`Message type "${message.type}" no Exist`); return}
            OnWsMessage.get(message.type)(...(message.params||[]))
        }
    } else {
        console.error("WebSocket No Compatible")
    }
}