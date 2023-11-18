import kaboom from "kaboom";

// start the game
kaboom();

// define gravity
setGravity(2400);

// load a default sprite
loadBean();

// add character to screen, from a list of components
const player = add([
  sprite("bean"), // renders as a sprite
  pos(120, 80), // position in world
  area(), // has a collider
  body(), // responds to physics and gravity
]);

// jump when player presses "space" key
onKeyPress("space", () => {
  // .jump() is provided by the body() component
  player.jump();
});

add([
  rect(width(), 48),
  outline(4),
  pos(0, height()),
  anchor("botleft"),
  area(),
  body({ isStatic: true }),
  color(127, 200, 255),
]);
const projectile = add([
    sprite("bean"),
    pos(1500,850),
    area(),
    move(900,200),
    offscreen({ destroy: true }),
])

/ add character to screen, from a list of components
const player = add([
  sprite("bean"), // renders as a sprite
  pos(120, 80), // position in world
  area(), // has a collider
  body(), // responds to physics and gravity
]);

// const follower = add([
//   sprite("bean"),
//   pos(110, 80), // position in world
//   area(), // has a collider
//   body(),
// ]);

// jump when player presses "space" key
onKeyPress("space", () => {
  player.jump();
  follower.jump();
});

onKeyPress("d", () => {
  player.moveBy(10);
  follower.moveBy(10);
});

onKeyPress("a", () => {
  player.moveBy(-10);
  follower.moveBy(-10);
});
