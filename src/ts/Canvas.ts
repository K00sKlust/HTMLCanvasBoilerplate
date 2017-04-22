import { Point, Size } from './Interfaces'

export { Canvas }

class Canvas {
    private id:             string
    public canvasElement:   HTMLCanvasElement
    public ctx:             CanvasRenderingContext2D
    private size:           Size


    constructor(id: string) {
        this.id = id
        this.canvasElement = <HTMLCanvasElement>document.getElementById(id)
        this.ctx = this.canvasElement.getContext("2d")
        this.size = {height: 0, width: 0}
        this.resize()

        // Events
        // http://stackoverflow.com/questions/31478432/cannot-access-class-variable
        window.addEventListener('resize', () => this.resize())
    }

    public getWidth() : number {
        return this.size.width
    }

    public getHeight() : number {
        return this.size.height
    }

    private resize() {
        this.ctx.canvas.width   = window.innerWidth
        this.ctx.canvas.height  = window.innerHeight
        this.size.height        = window.innerHeight
        this.size.width         = window.innerWidth
    }

    public getCenter() : Point {
        return {x: this.size.width / 2, y: this.size.height / 2}
    }
}
