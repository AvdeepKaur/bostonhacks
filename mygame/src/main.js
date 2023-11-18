import kaboom from "kaboom";

// start the game
kaboom({
  width: 1000,
  height: 500,
});

// define gravity
setGravity(2400);

// load a default sprite
loadBean();
loadSprite("vase", "/sprites/vase1.png");

// add character to screen, from a list of components
const player = add([
  sprite("bean", "player"), // renders as a sprite
  pos(120, 80), // position in world
  area(), // has a collider
  body(), // responds to physics and gravity
  "player",
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

loop(3, () => {
  const projectile = add([
    sprite("vase"),
    pos(width(), height() - 150),
    area(),
    move(900, 200),
    offscreen({ destroy: true }),
    "projectile",
  ]);
  projectile.onCollide("player", () => {
    destroy(projectile);
  });
});

const score = add([text("Score: 10"), pos(24, 24), { value: 10 }]);

player.onCollide("projectile", () => {
  score.value -= 1;
  score.text = "Score:" + score.value;
});

// with options
add([
  pos(24, 24),
  text(" ", {
    size: 48,
    width: 320,
    font: "sans-serif",
  }),
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
});

onKeyPress("d", () => {
  player.moveBy(10);
});

onKeyPress("a", () => {
  player.moveBy(-10);
});