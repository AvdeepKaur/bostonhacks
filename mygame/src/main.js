import kaboom from "kaboom";

// start the game
kaboom({
  background: [255, 253, 208],
  width: 1000,
  height: 751,
});

// load the sprites
loadSprite("heart", "/sprites/heart.png");
loadSprite("vase", "/sprites/vase1.png");
loadSprite("pCat", "/sprites/pinkcymbals_8_87x110.png");
loadSprite("bCat", "/sprites/bluedrum_84x110.png");
loadSprite("yCat", "/sprites/yellowguitar_84x110.png");
loadSprite("ni-bCat", "/sprites/ni-blue_83x110.png");
loadSprite("ni-pCat", "/sprites/ni-pink.png");
loadSprite("ni-yCat", "/sprites/ni-yellow.png");
//loadSprite("background", "/backgroundMG1.png");
loadSprite("drums", "/sprites/drums.png");
loadSprite("cymbals", "/sprites/cymbols.png");
loadSprite("guitar", "/sprites/guitar.png");
loadSprite("stage", "/sprites/backgroundStage.png");
loadSprite("sunny", "/sprites/sunny.png");
loadSprite("robin", "/sprites/robin.png");
loadSprite("tory", "/sprites/tory.png");
loadSprite("bookcase", "/sprites/bookcase3.png");
loadSprite("cat", "/sprites/cat2.png");

//starting scene
scene("start", () => {
  add([sprite("stage"), pos(width() / 240, height() / 240)]);
  add([sprite("pCat"), area(),pos(250, 500),"pink",]);
  add([sprite("bCat"), area(),pos(450, 500),"blue",]);
  add([sprite("yCat"), area(),pos(650, 500),"yellow",]);
  onClick("pink", () => add([sprite("sunny"),area(),pos(250, 500)], "sunnyAbout"));
  onClick("blue", () => add([sprite("robin"),area(),pos(250, 500)], "robinAbout"));
  onClick("yellow", () => add([sprite("tory"),area(),pos(250, 500)], "toryAbout"));
});



go("start");

scene("game", () => {
  // define gravity
  setGravity(2400);

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
  var projectiles = 0;
  var game1 = 0;

  //variables to show which cat versions are shown at the end
  var pInstrument = 0;
  var bInstrument = 0;
  var cInstrument = 0;
//hearts
const heart1 = add([pos(184, 24), sprite("heart"), "heart1"]);
const heart2 = add([pos(104, 24), sprite("heart"), "heart2"]);
const heart3 = add([pos(24, 24), sprite("heart"), "heart3"]);
//variables to help run the game
var i = 3;
var projectiles = 0;
var game1 = 0;
var array = ["vase","cat","bookcase"];

wait(2, () => {
  loop(2, () => {
    //checks if hearts are 0 and if there were less than 10 vases
    if (i != 0 && projectiles < 100) {
      let r=Math.floor(Math.random()*3);
      const projectile = add([
        sprite(array[r]),
        pos(width(), height() - 150),
        area(),
        move(900, 1000),
        offscreen({ destroy: true }),
        "projectile",
      ]);
      projectiles += 1;
      console.log(projectiles);
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
    });
  });
});

scene("end", () => {
  add([sprite("stage"), pos(width() / 240, height() / 240)]);
  if (pInstrument == 1) {
    add([sprite("pCat"), pos(250, 500)]);
  }
  if (pInstrument == 0) {
    add([sprite("ni-pCat"), pos(250, 500)]);
  }
  if (bInstrument == 1) {
    add([sprite("bCat"), pos(450, 500)]);
  }
  if (bInstrument == 0) {
    add([sprite("ni-bCat"), pos(250, 500)]);
  }
  if (yInstrument == 1) {
    add([sprite("yCat"), pos(650, 500)]);
  }
  if (yInstrument == 0) {
    add([sprite("ni-yCat"), pos(250, 500)]);
  }
});