package canvas

import (

    "github.com/tfriedel6/canvas"

)

var ctx *canvas.Context

func InitCanvas(width, height int) *canvas.Canvas {

    // Création d'un canevas de la taille spécifiée

    cnv := canvas.New(float64(width), float64(height))

    // Récupération du contexte du canevas

    ctx = cnv.Context2D()

    return cnv

}

func Point(x, y, r float64, color string) {

    ctx.BeginPath()

    ctx.FillStyle = color

    ctx.Arc(x, y, r, 0, 2*math.Pi, false)

    ctx.Fill()

}

func Clear() {

    ctx.ClearRect(0, 0, ctx.Width(), ctx.Height())

}

func GetUpdate(imgData []byte) error {

    img, err := canvas.LoadImageBytes(imgData)

    if err != nil {

        return err

    }

    ctx.DrawImage(img, 0, 0)

    return nil

}
