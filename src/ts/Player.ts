import { Point, Size, Vector } from './Interfaces'
import { Canvas } from './Canvas'
import { Game } from './Game'
import { Controls } from './Controls'

export class Player {
    public position: Point
    public velocity: Vector
    public friction: number = 0.98
    public acceleration: number = 1
    public bouncyness: number = 0.5

    constructor(public username: string, private color: string, public controls: Controls, public game: Game, position?: Point) {
        this.position = position || this.game.canvas.getCenter()
        this.velocity = { x: 0, y: 0 }
        console.log(this, "Player created.")
    }

    private getSize(): Size {
        var size = 20 + ((Math.abs(this.velocity.x) + Math.abs(this.velocity.y)) / 10)
        return { width: size, height: size }
    }

    private getColor(): string {
        return this.color
    }

    public update() {
        // If the player is outside left or right border
        if (this.position.x <= 0 || this.position.x >= this.game.canvas.getWidth())
            this.velocity.x *= -this.bouncyness
        this.position.x = Math.max(0, Math.min(this.position.x, this.game.canvas.getWidth()));

        // If the player is outsize top or bottom border
        if (this.position.y <= 0 || this.position.y >= this.game.canvas.getHeight())
            this.velocity.y *= -this.bouncyness
        this.position.y = Math.max(0, Math.min(this.position.y, this.game.canvas.getHeight()));

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction

        if (this.controls.leftPressed) {
            this.velocity.x -= this.acceleration
        }
        if (this.controls.downPressed) {
            this.velocity.y += this.acceleration
        }

        if (this.controls.rightPressed) {
            this.velocity.x += this.acceleration
        }

        if (this.controls.upPressed) {
            this.velocity.y -= this.acceleration
        }

        this.draw()
    }

    public draw() {
        var ctx = this.game.canvas.ctx
        var size = this.getSize()
        // ctx.fillStyle = this.getColor()
        // ctx.fillRect(
        //     this.position.x - (size.width / 2),
        //     this.position.y - (size.height / 2),
        //     size.width,
        //     size.height
        // )

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, size.width, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.getColor()
        ctx.fill()
    }
}
