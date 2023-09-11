import { GameLoop, Sprite, init, initKeys, onKey } from "kontra"
import { generateAsteroids } from "./entities/asteroid"
import { createShip } from "./entities/ship"

let { canvas, context } = init()
const maxWidth = canvas.width
const maxHeight = canvas.height



let asteroids = generateAsteroids(maxWidth, maxHeight)
let ship = createShip(maxWidth, maxHeight)



let gameLoop = GameLoop({
  update: function () {

    onKey('up', function () {
      console.log('fuck you')
    })
    ship.update()
    asteroids.forEach(asteroid => {
      asteroid.update()

      wrapHorizontal(asteroid)
      wrapVertical(asteroid)
    })


  },
  render: function () {
    ship.render()
    asteroids.forEach(asteroid => {
      asteroid.render()

    })
  }
})

function wrapVertical(asteroid: Sprite): void {
  if (asteroid.y < -asteroid.radius) {
    asteroid.y = canvas.height + asteroid.radius
  } else if (asteroid.y > canvas.height + asteroid.radius) {
    asteroid.y = -asteroid.radius
  }
}

function wrapHorizontal(asteroid: Sprite): void {
  if (asteroid.x < -asteroid.radius) {
    asteroid.x = canvas.width + asteroid.radius
  } else if (asteroid.x > canvas.width + asteroid.radius) {
    asteroid.x = -asteroid.radius
  }
}

gameLoop.start()