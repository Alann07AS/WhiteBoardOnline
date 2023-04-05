package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Alann07AS/DevTools/GO/errm"
	"github.com/gorilla/websocket"
)

var (
	conns     []*websocket.Conn
	broadcast = make(chan []byte, 1)
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
	errm.LogErr(err)
	d, _ := json.Marshal(map[string]interface{}{
		"type": "sendupdate",
	})
	broadcast <- d
	conns = append(conns, conn)
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			errm.LogErr(err)
			return
		}
		broadcast <- message
	}
}
