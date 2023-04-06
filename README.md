# WhiteBoardOnline

A Golang Server with WebSocket protocol.




## Installation


  You need [golang](https://go.dev/doc/install)  to start server.

```bash
  git clone https://github.com/Alann07AS/WhiteBoardOnline.git
  cd WhiteBoardOnline/
  go run main.go
```
After you need to conect to your ipv4 on your local network.

Pour trouver cette ip facilement sur linux:

```bash
ip a | grep 'inet.*brd' | awk '{print $2}' | cut -f1 -d'/'
```

## Authors

- [@Alann07AS](https://github.com/Alann07AS)
