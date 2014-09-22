function generateSprite(texture, posX, posY, width, height){

    var sprite = new PIXI.Sprite(texture);
    sprite.position.x = posX;
    sprite.position.y = posY;
    sprite.anchor.x = 0;
    sprite.anchor.y = 0;
    sprite.height = height;
    sprite.width = width;

    return sprite;
}


String.prototype.format = function() {
var args = arguments;
return this.replace(/{(\d+)}/g, function(match, number) { 
  return typeof args[number] != 'undefined'
    ? args[number]
    : match
  ;
});
};





