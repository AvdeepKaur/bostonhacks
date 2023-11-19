import kaboom from "kaboom";

// start the game
kaboom({
  background: [255, 253, 208],
  width: 1000,
  height: 500,
});

// define gravity
setGravity(2400);
// load the sprites
loadSprite("heart", "/sprites/heart.png");
loadSprite("vase", "/sprites/vase1.png");
loadSprite("pCat", "/sprites/pinkcymbals_8_87x110.png");
loadSprite("bCat", "/sprites/bluedrum_84x110.png");
loadSprite("yCat", "/sprites/yellowguitar_84x110.png");
loadSprite("ni-bCat", "/sprites/ni-blue_83x110.png");

// add character to screen, from a list of components


const player = add([
  sprite("ni-bCat", "player"), // renders as a sprite
  pos(120, 80), // position in world
  area(), // has a collider
  body(), // responds to physics and gravity
  "player",
]);

// // jump when player presses "space" key
onKeyPress("space", () => {
  // .jump() is provided by the body() component
  if (player.isGrounded()) {
    player.jump(1000);
  }
});

/*add([
  sprite("background"),
  origin("top-left"),
]);*/

add([
  rect(width(), 48),
  outline(4),
  pos(0, height()),
  anchor("botleft"),
  area(),
  body({ isStatic: true }),
  color(150, 75, 0),
]);

//hearts
const heart1 = add([pos(184, 24), sprite("heart"), "heart1"]);
const heart2 = add([pos(104, 24), sprite("heart"), "heart2"]);
const heart3 = add([pos(24, 24), sprite("heart"), "heart3"]);
//variables to help run the game
var i = 3;
var vases = 0;
var game1 = 0;

wait(2, () => {
  loop(2, () => {
    //checks if hearts are 0 and if there were less than 10 vases
    if (i != 0 && vases < 100) {
      const projectile = add([
        sprite("vase"),
        pos(width(), height() - 150),
        area(),
        move(900, 1000),
        offscreen({ destroy: true }),
        "projectile",
      ]);
      vases += 1;
      console.log(vases);
      projectile.onCollide("player", () => {
        destroy(projectile);
        if (i == 3) {
          destroy(heart1);
          i -= 1;
        } else if (i == 2) {
          destroy(heart2);
          i -= 1;
        } else if (i == 1) {
          destroy(heart3);
          i -= 1;
        }
      });
    } else {
      loop = false;
      //if the player lost the game then have an indicator that it was lost
      if (i == 0) {
        game1 = 1;
      }
    }
  });
});

