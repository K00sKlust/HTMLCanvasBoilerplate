import { Canvas } from './Canvas'
import { Game } from './Game'

window.onload = () => {

    var canvas = new Canvas('mainCanvas')
    var game = new Game(canvas)

    //TODO: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
}
