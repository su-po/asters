
const scale = 1.6

import { Sprite, degToRad, initKeys, keyPressed, keyMap } from "kontra"

console.log(keyMap)
initKeys()

function createShip(wLimit: number, hLimit: number): Sprite {
    function wrapVertical(ship: Sprite): void {
        if (ship.y < -ship.radius) {
            ship.y = hLimit + ship.radius
        } else if (ship.y > hLimit + ship.radius) {
            ship.y = -ship.radius
        }
    }

    function wrapHorizontal(asteroid: Sprite): void {
        if (asteroid.x < -asteroid.radius) {
            asteroid.x = wLimit + asteroid.radius
        } else if (asteroid.x > wLimit + asteroid.radius) {
            asteroid.x = -asteroid.radius
        }
    }
    let ship = Sprite({
        type: 'asteroid',  // we'll use this later for collision detection
        x: Math.floor(wLimit / 2),
        y: Math.floor(hLimit / 2),
        radius: 10 * scale,
        render: function () {
            if (this.context != undefined) {
                this.context.strokeStyle = 'white'
                this.context.save()
                this.context.scale(scale, scale)
                this.context.beginPath()
                this.context.moveTo(-3, -5)
                this.context.lineTo(12, 0)
                this.context.lineTo(-3, 5)
                this.context.closePath()
                this.context.stroke()
                this.context.restore()
            }
        },
        update: () => {
            wrapVertical(ship)
            wrapHorizontal(ship)
            if (ship.rotation != undefined) {

                if (keyPressed('arrowleft')) {
                    ship.rotation += degToRad(-2)
                } else if (keyPressed('arrowright')) {
                    ship.rotation += degToRad(2)
                }
                const cos = Math.cos(ship.rotation)
                const sin = Math.sin(ship.rotation)

                if (keyPressed('arrowup')) {
                    ship.ddx = cos * 0.03
                    ship.ddy = sin * 0.03
                }
                else {
                    ship.ddx = ship.ddy = 0
                }
                ship.advance()
                // set a max speed
                if (ship.velocity.length() > 3) {
                    if (ship.dx != undefined && ship.dy != undefined) {
                        ship.dx *= 0.95
                        ship.dy *= 0.95
                    }
                }
            }
        }
    })

    return ship
}


export { createShip }