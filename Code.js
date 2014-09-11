

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xD84833);

//max width
var maxWidth = 1280;//getMobileWidth();

//max height
var maxHeight = 720; //getMobileHeight();
// create a renderer instance
var renderer = PIXI.autoDetectRenderer(maxWidth, maxHeight);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame(animate);

// create a texture from an image path
var texture = PIXI.Texture.fromImage("joint.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);
var right = true;
var hitBoundaries = true;
var xDirection = 0;
var yDirection = 0;
// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = maxWidth / 2;
bunny.position.y = maxHeight / 2;

stage.addChild(bunny);

function animate() {

    requestAnimFrame(animate);

    if (bunny.position.x >= maxWidth) {
        hitBoundaries = true;
    }
    if (bunny.position.x <= 0) {
        hitBoundaries = true;
    }
    if (bunny.position.y >= maxHeight) {
        hitBoundaries = true;
    }
    if (bunny.position.y <= 0) {
        hitBoundaries = true;
    }

    if (hitBoundaries) {
        var min = -1;
        var max = 1;
        xDirection = Math.random() * (max - min) + min;
        yDirection = Math.random() * (max - min) + min;

        hitBoundaries = false;
    }

    if (right == true) {
        bunny.position.x = bunny.position.x + xDirection;
        bunny.position.y = bunny.position.y + yDirection;
        bunny.rotation += 0.01;

    }


    // render the stage   
    renderer.render(stage);
}