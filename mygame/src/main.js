import kaboom from "kaboom"

// start the game
kaboom()

// define gravity
setGravity(2400)

// load a default sprite
loadBean()

// add character to screen, from a list of components
const player = add([
    sprite("bean"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    body(),          // responds to physics and gravity
])

// jump when player presses "space" key
onKeyPress("space", () => {
    // .jump() is provided by the body() component
    player.jump()
})

onKeyPress("r",() => {
    restart()
})

add([
	rect(width(), 48),
	outline(4),
	pos(0, height()),
	anchor("botleft"),
	area(),
	body({ isStatic: true }),
	color(127, 200, 255),
	projectile,
]);

const projectile = add([
    sprite("bean"),
    pos(1900,850),
    area(),
    move(900,200),
    offscreen({ destroy: true }),
])