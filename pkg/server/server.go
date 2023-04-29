package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	//"github.com/Alann07AS/DevTools/GO/errm"
	"github.com/gorilla/websocket"
)

var (
	conns     = make(map[int]*websocket.Conn)
	broadcast = make(chan []byte, 1)
	iUser     = 0
)

func StartServer() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", home)
	http.HandleFunc("/ws", ws)
	go http.ListenAndServe(":8080", nil)
	fmt.Println("Server start on http://localhost:8080")
	for {
		message := <-broadcast
		for _, c := range conns {
			c.WriteMessage(1, message)
		}
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  17000, // 1024 * 50,
	WriteBufferSize: 17000, // 1024 * 50,
}

func ws(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	//errm.LogErr(err)
	fmt.Println(err)
	for _, c := range conns {
		d, _ := json.Marshal(map[string]interface{}{
			"type": "sendupdate",
		})
		c.WriteMessage(1, d)
		break
	}
	l := iUser
	conns[iUser] = conn
	iUser++
	defer func() {
		delete(conns, l)
	}()
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			//errm.LogErr(err)
			fmt.Println(err)
			return
		}
		broadcast <- message
	}
}
