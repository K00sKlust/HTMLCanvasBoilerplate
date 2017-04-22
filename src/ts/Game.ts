import { Canvas } from './Canvas'
import { Player } from './Player'
import { Point } from './Interfaces'
import { KeyEvent } from './KeyEvents'
import { Controls } from './Controls'

export { Game }


class Game {
    private background: string = '#333'
    private players: Array<Player> = []


    constructor(public canvas: Canvas) {

        var controls1 = new Controls(
            KeyEvent.DOM_VK_LEFT,
            KeyEvent.DOM_VK_DOWN,
            KeyEvent.DOM_VK_RIGHT,
            KeyEvent.DOM_VK_UP
        )

        var controls2 = new Controls(
            KeyEvent.DOM_VK_A,
            KeyEvent.DOM_VK_S,
            KeyEvent.DOM_VK_D,
            KeyEvent.DOM_VK_W
        )

        this.addPlayer("Player1", 'orange', controls1)
        // this.addPlayer("Player2", 'green', controls2, { x: 50, y: 20 })

        window.onkeyup = (e) => this.keyUp(e)
        window.onkeydown = (e) => this.keyDown(e)

        // Start the render loop
        this.renderFrame()
    }

    private addPlayer(username: string, color: string, controls: Controls, position?: Point) {
        var newPlayer = new Player(username, color, controls, this, position)
        this.players.push(newPlayer)
    }

    private renderFrame() {
        var ctx = this.canvas.ctx

        // draw background
        ctx.fillStyle = this.background
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        // Draw the players
        this.players.forEach(player => {
            player.update()
        })

        window.requestAnimationFrame(() => this.renderFrame())
    }


    private keyDown(e: KeyboardEvent) {
        var key = e.keyCode ? e.keyCode : e.which
        this.players.forEach(player => {
            if (key == player.controls.left) {
                player.controls.leftPressed = true
            }
            if (key == player.controls.down) {
                player.controls.downPressed = true
            }
            if (key == player.controls.right) {
                player.controls.rightPressed = true
            }
            if (key == player.controls.up) {
                player.controls.upPressed = true
            }
        })
    }

    private keyUp(e: KeyboardEvent) {
        var key = e.keyCode ? e.keyCode : e.which
        this.players.forEach(player => {
            if (key == player.controls.left) {
                player.controls.leftPressed = false
            }
            if (key == player.controls.down) {
                player.controls.downPressed = false
            }
            if (key == player.controls.right) {
                player.controls.rightPressed = false
            }
            if (key == player.controls.up) {
                player.controls.upPressed = false
            }
        })
    }
}
