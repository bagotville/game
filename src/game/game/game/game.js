import {background, decoration} from "./decoration.js";

class Game {
    id;

    start() {
        this.id = window.setInterval(this.render.bind(this), 1000 / 60);
        let timer

        document.documentElement.addEventListener('keydown', (e)=> {
            if(e.key === "ArrowRight" && !e.repeat) {
                timer = setInterval(()=> {decoration.goRight()}, 1000/60)
            }
            if(e.key === "ArrowLeft" && !e.repeat) {
                timer = setInterval(()=> {decoration.goLeft()}, 1000/60)
            }
        })

        document.documentElement.addEventListener('keyup', (e)=> {
            clearInterval(timer)
        })
    }

    pause() {

    }

    stop() {
        window.clearInterval(this.id);
    }

    goRight () {

    }

    render() {
        decoration.render()
    }
}

export const game = new Game()
