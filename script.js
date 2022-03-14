const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
var mousex = 0
var mousey = 0
var color = '#000000'
var draw = false
var pixelSize = 6
const pixels = []
class Pixel{
    constructor(x,y,color){
        this.x = x
        this.y = y
        this.color = color
    }
    blit(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, pixelSize, pixelSize)
    }
    wasClicked(e){
        const { pageX: x, pageY: y } = e
        if (x>=this.x+10 && x<=this.x+10+pixelSize && y>=this.y+10 && y<=this.y+10+pixelSize){
            return true
        }
    }
}
class Button{
    constructor(x,y,color){
        this.x = x
        this.y = y
        this.color = color
    }
    blit(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, 50, 50)
    }
    wasClicked(e){
        const { pageX: x, pageY: y} = e
        if (x>=this.x+10 && x<=this.x+60 && y>=this.y+10 && y<=this.y+60){
            return true
        }
    }
}
function update(){
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0,0,1920,1080)
    for (let i=0; i<pixels.length; i++){
        pixels[i].blit()
    }
    for (let i=0; i<buttons.length; i++){
        buttons[i].blit()
    }
    ctx.fillStyle = color
    ctx.fillRect(mousex-10-pixelSize/2, mousey-10-pixelSize/2, pixelSize, pixelSize)
    ctx.font = "17px Arial"
    ctx.fillStyle = '#000000'
    ctx.fillText("Erase", 60, 370)
    requestAnimationFrame(update)
}
const buttons = [new Button(5,5,'#000000'), new Button(5, 60, '#ff0000'), new Button(5, 115, '#00ff00'), 
new Button(5, 170, '#0000ff'), new Button(5, 225, '#ffff00'), new Button(5, 280, '#00ffff'), new Button(5, 335, '#ff00ff'), 
new Button(5, 390, '#E0AC69'), new Button(5,445,'#A52A2A'), new Button(5,500,'#D2691E'), new Button(60,5,'#8B4513'), 
new Button(60, 60, '#C0C0C0'), new Button(60, 115, '#d4af37'), new Button(60, 170, '#7d0000'), 
new Button(60, 225, '#007d00'), new Button(60, 280, '#00007d'), new Button(60, 335, '#ffffff')]
update()
function move(e){
    mousex = Math.round((e.pageX)/pixelSize)*pixelSize
    mousey = Math.round((e.pageY)/pixelSize)*pixelSize
    if (draw == true){
        const clickedPixel = pixels.find((p) => p.wasClicked(e))
        if (clickedPixel != undefined){
            if (clickedPixel.color != color){
                const index = pixels.indexOf(clickedPixel)
                pixels.splice(index, 1)
                pixels.push(new Pixel(mousex-10-pixelSize/2, mousey-10-pixelSize/2, color))
            }
        }
        else{
            pixels.push(new Pixel(mousex-10-pixelSize/2, mousey-10-pixelSize/2, color))
        }
    }
}
function onClick(e){
    const buttonClicked = buttons.find((b) => b.wasClicked(e))
    if (buttonClicked != undefined){
        color = buttonClicked.color
    }
    else{
        x = Math.round((e.pageX)/pixelSize)*pixelSize
        y = Math.round((e.pageY)/pixelSize)*pixelSize
        pixels.push(new Pixel(mousex-10-pixelSize/2, mousey-10-pixelSize/2, color))
        draw = true
    }
}
window.addEventListener('mousemove', move(e))
window.addEventListener('mousedown', onClick(e))
window.addEventListener('mouseup', function(e){draw = false})
window.addEventListener('touchstart', onClick(e))
window.addEventListener('touchend', function(e){draw = false})
window.addEventListener('touchmove', move(e))
