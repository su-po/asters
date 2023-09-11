import { Sprite } from "kontra"


function createAsteroid(x: number, y: number): Sprite {
    let asteroid = Sprite({
        type: 'asteroid',  // we'll use this later for collision detection
        x,
        y,
        dx: Math.random() * 4 - 2.2,
        dy: Math.random() * 4 - 3.5,
        radius: 24,
        render: function () {
            if (this.context != undefined) {
                this.context.strokeStyle = 'white'
                this.context.beginPath()
                this.context.arc(0, 0, this.radius, 0, 2 * Math.PI)
                this.context.stroke()
            }
        },

    })

    return asteroid
}

function generateAsteroids(wLimit: number, hLimit: number): Sprite[] {
    let asteroids: Sprite[] = []
    for (let i = 0; i < 3; i++) {
        let x = Math.random() * wLimit
        let y = Math.random() * hLimit
        let asteroid = createAsteroid(x, y)
        asteroids.push(asteroid)
    }
    return asteroids
}

export { generateAsteroids }