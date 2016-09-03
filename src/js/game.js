/*

GLITCHICKEN
by Mattia Fortunati
http://www.mattiafortunati.com
mattia@mattiafortunati.com

GLITCHICKEN is made for the 2016 js13kGames competition

libs used: 
-Ga (adapted, modded and shrunk as needed) https://github.com/kittykatattack/ga
-TinyMusic (as is) https://github.com/kevincennis/TinyMusic
-Pixel Font (adapted) https://github.com/PaulBGD/PixelFont


I hope that you liked my game.
Also, I hope that you will find this source code useful somehow! :)
Thank you for playing!

*/
//this is the solution for the last level
//if you are here for this, congratulations :)
var solution = "RIGHT ORDER OF THE SWITCHES FOR LAST LEVEL : ON OFF OFF ON ON ON"
//Images are base64 encoded but the real process is : PIXEN > PNG > BLACK AND WHITE > TINYPNG > BASE64
var CHICKEN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAD1BMVEUAAAD///8AAADAwMDHx8cZgFxgAAAAAXRSTlMAQObYZgAAADJJREFUCNdjgAEmJSUFIKVsbGwE5AgKGwsqACkgUGBQFARCICUs6CIMFwSKCgrB9KECANcBBJRue748AAAAAElFTkSuQmCC"
var CHICKEN2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJBAMAAAAWSsseAAAAD1BMVEUAAAD///8AAADAwMDHx8cZgFxgAAAAAXRSTlMAQObYZgAAADlJREFUCNdjYGBQUlJiYGAyNjZWAHIUBY0NBYCkoKAQUFBQSFBIgEHQUMTRCCgHEhVgYAKSCgxQfQCUdgRuGhnD3QAAAABJRU5ErkJggg=="
var DOG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANBAMAAABSlfMXAAAAD1BMVEUAAADp6ekAAACRkZF/f38FrQ4TAAAAAXRSTlMAQObYZgAAAEZJREFUCNdFjNsNwCAMAxEbOBM07gSlE7D/Utg8hD+i0ym6olWSxXt/4LGIdiAjDQmgUwJeTHHBz/XbghtEQa5MU3uCjioDlrwG5RoKjlYAAAAASUVORK5CYII="
var WALL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAD1BMVEUAAAAAAAB+fn6UlJS4uLjAWsTOAAAAAXRSTlMAQObYZgAAACFJREFUCNdjYBQUFGAQcXFRZBAxVgYSRkbILCElJUWwEgBQYAPjLZ/qoAAAAABJRU5ErkJggg=="
var MUD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEXk5OTPz89xsZL2AAAAFklEQVQI12MQZHBgYGFYwMAJpIUYHAAMEAGRAsxMmgAAAABJRU5ErkJggg=="
var CHOSEN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQAgMAAAC9023tAAAADFBMVEUAAAAAAADb29uEhIQRZgKAAAAAAXRSTlMAQObYZgAAAENJREFUCNdjEA0NYBBdOoUhatUSMA4NDWGIjAphyAKypZYuYWBbNYGBMdSBgbHWgYH1fwAD+/8LDGKhUxhEgeoYHR0Ab4wSdg2J1nAAAAAASUVORK5CYII="

//SOME GLOBALS
var wallArray = []
var backGroundArray = []
var switchArray = []
var gameStarted = false
var currentLevel = 9
var player, title, message, wall, dog, guard1, guard2, movingwall, guard3, box

//GA SETUP
var g = ga(
    500, 500, init, [
        CHICKEN,
        CHICKEN2,
        WALL,
        MUD,
        DOG,
        CHOSEN
    ]
);


//disable blur for pixel art scale
g.noBlurScale()
//GO FULLSCREEN
g.scaleToWindow()
createTCVS()

//Adding shuffle to String
//direcyly from stackoverflow
String.prototype.shuffle = function() {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

//SETUP LEVEL MAPS
var LEVEL9 = {
        gr: [],
        pl: {
            x: 0,
            y: 0
        },
        state: level9,
    }
    //
var LEVEL0 = {
    gr: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 2, 0, 0, 2, 0, 2,
        0, 2, 2, 0, 0, 0, 2, 0, 2, 0,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        2, 0, 2, 0, 0, 0, 2, 0, 2, 2,
        0, 0, 0, 0, 2, 2, 0, 0, 0, 2,
        0, 0, 2, 0, 2, 0, 2, 0, 2, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    pl: {
        x: 200,
        y: 200
    },
    state: level0,
}
var LEVEL1 = {
    gr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    pl: {
        x: 200,
        y: 200
    },
    state: level1,
}
var LEVEL2 = {
    gr: [0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    pl: {
        x: 200,
        y: 200
    },
    state: level2,
}
var LEVEL3 = {
    gr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    pl: {
        x: 200,
        y: 200
    },
    state: level3,
}
var LEVEL4 = {
    gr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    pl: {
        x: 200,
        y: 300
    },
    state: level4,
}
var LEVEL5 = {
    gr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    pl: {
        x: 200,
        y: 300
    },
    state: level5,
}

//SETUP LEVEL CREATION FUNCTIONS
LEVEL9.create = function() {
    //title screen
    //set title
    TTT = "GLITCHICKEN"
        //play music
    playAt(80)
        //dog is the talking dog, MARK
    dog.visible = false
        //glitch text timeouts
    LEVEL9.gt = function() {
        TTT = "GLITCHICKEN".shuffle()
        window.setTimeout(function() {
            TTT = "GLITCHICKEN"
            LEVEL9.TM = window.setTimeout(LEVEL9.gt, 2000)
        }, 200)
    }
    LEVEL9.TM = window.setTimeout(LEVEL9.gt, 2000)
}

LEVEL0.create = function() {
    clearTimeout(LEVEL9.TM)
    setMessage(["  ", "BARK!", "Look at all the perfect chicks!", "BARK!", "  ", "Hey  ", "What the BARK was that?  ", "A glitchy chick?!?  ", "OH MY DOG!  ", "Guards!  ", "Get her!  "])
    window.setTimeout(function() {
        guard1.foll = true
    }, 12000)
    gameStarted = true
}

LEVEL1.create = function() {
    setMessage([, "  ", "BARK!", "You are now in prison miss Glitch", "Don't try to escape using arrow keys!  ", "BARK!", "  "])
    var c = g.sprite(WALL)
    c.width = 50
    c.height = 50
    c.x = 50 * 7
    c.y = 50 * 3
    backGroundArray.push(c)
    playAt(120)
}
LEVEL2.create = function() {
    setMessage(["This time I've checked", "the collisions personally!", "BARK!", "You won't get away!"])
    movingwall = g.sprite(WALL)
    movingwall.width = 50
    movingwall.height = 50
    movingwall.x = 50 * 3
    movingwall.y = 50 * 3
    backGroundArray.push(movingwall)
    movingwall.d = 1
    playAt(140)
}
LEVEL3.create = function() {
    setMessage(["  ", "Now escape this!  ", "A reinforced prison guarded  ", "by my best man!", " ... ", "  dog.  "])
    guard3 = g.sprite(DOG)
    guard3.width = 50
    guard3.height = 40
    guard3.x = 50 * 4
    guard3.y = 50 * 5
    backGroundArray.push(guard3)
    playAt(160)
}
LEVEL4.create = function() {
    setMessage(["  ", "I, the magnificient MARK, ", "will personally guard you this time!  ", "BARK!  ", "Try to escape now!  ", "MARK!  "])
        //in this case, I don't know why, but I left it like this, movingwall is actually MARK
        //and guard3 is the moveable wall. 
        //Poor MARK
    movingwall = g.sprite(DOG)
    movingwall.width = 60
    movingwall.height = 50
    movingwall.x = 50 * 5
    movingwall.y = 50 * 4
    backGroundArray.push(movingwall)
    movingwall.d = -1
    movingwall.TM = window.setInterval(function() {
        if (movingwall.d == 1) {
            movingwall.d = -1
            movingwall.x += 50
            movingwall.scaleX = 1
        } else if (movingwall.d == -1) {
            movingwall.d = 1
            movingwall.x -= 50
            movingwall.scaleX = -1
        }
    }, 1000);
    guard3 = g.sprite(WALL)
    guard3.width = 40
    guard3.height = 40
    guard3.x = 50 * 3
    guard3.y = 50 * 5
    backGroundArray.push(guard3)
    playAt(180)
}
LEVEL5.create = function() {
    setMessage(["  ", "You ... had ... luck ... till now ...  ", "But ... this ... is the end ...  ", "It's ... GAME OVER ...", "B  ", " A  ", " BARK  "])
    dog.scaleY = -1
    playAt(80)
    guard3 = g.sprite(DOG)
    guard3.width = 60
    guard3.height = 50
    guard3.x = 50 * 2
    guard3.y = 50 * 5.8
    guard3.scaleY = -1
        //create switches
    for (var i = 0; i <= 5; i++) {
        var o = g.sprite(WALL)
        o.width = 30;
        o.height = 30;
        o.x = 50 * 2 + i * (55)
        o.y = 50 * 3
        o.alpha = 0.5
        o.canChange = true
        switchArray.push(o)
    }
    LEVEL5.ended = false
}

//START GA
g.start();

//GAME INIT
function init() {
    //create background
    for (var i = 0; i < LEVEL0.gr.length; i++) {
        var cc = i % 10
        var ll = parseInt(i / 10)
        var oo = g.sprite(MUD)
        oo.width = 50;
        oo.height = 50;
        oo.x = cc * 50
        oo.y = ll * 50
    }

    //Load first level (title screen)
    //Yes, title screen is actually level 9
    loadLevel(LEVEL9)

}

function startGame() {
    //start game during title screen
    if (gameStarted == false && currentLevel == 9) {
        currentLevel = 0
        swapLevelTo(LEVEL0)
    }
}


function writeText() {
    //this is the general function for typewriting the text letter by letter
    //setMessage can receive an array of Strings
    //TCT counters the current character in current string
    //ACT counters the current string within the array
    //So write if it has a character and a string to write else stops.  
    if (message.MSG[message.ACT] && message.TCT < message.MSG[message.ACT].length) {
        TTD += message.MSG[message.ACT][message.TCT]
        message.TCT += 1
        message.TM = window.setTimeout(writeText, 100);
    } else {
        TTD = ""
        message.TCT = 0
        message.ACT += 1
        message.TM = window.setTimeout(writeText, 100);
    }
}

//Handling the click/tap
//doing the same thing done by the key press and release
//if the screen is clicked/tapped at the right coordinates
g.pointer.press = function() {
    if (g.pointer.y > 100 && g.pointer.y < 400) {
        if (g.pointer.x >= 250) {
            player.vx = 2;
            player.vy = 0;
            player.direction = "right";
        } else if (g.pointer.x <= 250) {
            player.vx = -2;
            player.vy = 0;
            player.direction = "left";
        }
    } else {
        if (g.pointer.y >= 250) {
            player.vx = 0;
            player.vy = 2;
            player.direction = "down";
        } else if (g.pointer.y <= 250) {
            player.vx = 0;
            player.vy = -2;
            player.direction = "up";
        }
    }
}
g.pointer.release = function() {
    player.vx = 0;
    player.vy = 0;
    player.direction = "";
    startGame()
}


//global operations called by every level
function levelGlobals() {
    drawText(TTD);
    //move player and set its size
    g.move(player);
    player.width = 50;
    player.height = 50;

    //set player scaleX to face direction
    if (player.direction == "left") {
        player.scaleX = -1
    } else if (player.direction == "right") {
        player.scaleX = 1
    }

    //player to wall collision
    for (var i = 0; i < wallArray.length; i++) {
        g.rectangleCollision(player, wallArray[i], false, false);
    }

    //show dog, if message is typing
    if (message.MSG[message.ACT]) {
        if (dog.y > 440) {
            dog.y -= 10
        }
    } else {
        if (dog.y < 500) {
            dog.y += 10
        }
    }

    //make guards follow if requested
    if (guard1.foll == true) {
        g.followConstant(guard1, player, 1)
        g.followConstant(guard2, player, 1)
    }

    //level transition black rectangle
    //fading IN or OUT
    if (box.fade == "OUT") {
        if (box.alpha > 0.1) {
            box.alpha -= 0.2
        } else {
            box.alpha = 0
        }
    } else if (box.fade == "IN") {
        if (box.alpha < 1) {
            box.alpha += 0.2
        } else {
            box.alpha = 1
        }
    }

}


//swap currenct level to level level
function swapLevelTo(level) {
    endLevel(level)
}

//end current level, then load level level after a while
//giving the black rectangle time to fade IN
function endLevel(level) {
    box.fade = "IN"
    window.setTimeout(function(level) {
        for (var i = 0; i < backGroundArray.length; i++) {
            g.remove(backGroundArray[i])
        }
        g.remove(player)
        clearTimeout(message.TM)
        wallArray = []
        backGroundArray = []
        g.remove(box)
        loadLevel(level)
    }, 200, level)

}

//load level level
function loadLevel(level) {
    //ground pieces
    for (var i = 0; i < level.gr.length; i++) {
        var cc = i % 10
        var ll = parseInt(i / 10)
        var oo, correctSprite
        if (level.gr[i] == 0) {
            continue
        } else if (level.gr[i] == 1) {
            correctSprite = WALL
        } else if (level.gr[i] == 2) {
            correctSprite = CHICKEN
        }
        oo = g.sprite(correctSprite)
        oo.width = 50;
        oo.height = 50;
        oo.x = cc * 50
        oo.y = ll * 50
        backGroundArray.push(oo)
        if (level.gr[i] == 1) wallArray.push(oo)
        if (level.gr[i] == 2) {
            var r = Math.random() * 2 - 1
            if (r > 0) oo.scaleX = -1
            wallArray.push(oo)
        }
    }

    //player
    player = g.sprite([CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN2]);
    player.fps = 2
    player.play()
    player.x = level.pl.x
    player.y = level.pl.y
    player.width = 50;
    player.height = 50;
    g.fourKeyController(player, 2, 38, 39, 40, 37);

    //talking dog, MARK
    dog = g.sprite(DOG);
    dog.x = 15
    dog.y = 600
    dog.width = 60;
    dog.height = 50;
    backGroundArray.push(dog)

    //message (MARK's)
    message = {}
    message.MSG = ["", ""]
    message.ACT = 0
    message.TCT = 0
    message.y = 450
    message.x = 100
    message.restart = function() {
        message.ACT = 0;
        message.TCT = 0;
        message.TM = window.setTimeout(writeText, 50);
    }

    //guard1 and guard2 
    //(generally following guards, but also vars used for something else sometime)
    guard1 = g.sprite(DOG)
    guard1.height = 50
    guard1.width = 60
    guard1.x = -200
    guard1.foll = false
    backGroundArray.push(guard1)
    guard2 = g.sprite(DOG)
    guard2.height = 50
    guard2.width = 60
    guard2.x = 500 + 200
    guard2.y = 500
    guard2.scaleX = -1
    backGroundArray.push(guard2)

    //fade rectangle for transitions
    box = g.rectangle(500, 500, "black", "black", 0, 0, 0);
    box.alpha = 1
    box.fade = "OUT"

    //call level setup
    level.create()

    //set the current state as level stsate
    g.state = level.state

}

//set message to msg and start playing it
function setMessage(msg) {
    TTD = ""
    clearTimeout(message.TM)
    message.MSG = msg
    message.restart()
}


function level0() {
    //player.x +=1
    levelGlobals()
    g.contain(player, g.stage.localBounds);
    var c = g.rectangleCollision(player, guard1, false, false) || g.rectangleCollision(player, guard2, false, false)
    if (c && currentLevel == 0) {
        //LEVEL1
        currentLevel = 1
        swapLevelTo(LEVEL1)
    }

}


//level 1 state
function level1() {
    levelGlobals()
        //collision with boundings
    var edges = g.contain(player, g.stage.localBounds);
    if (edges && guard1.foll == false) {
        guard1.foll = true
        setMessage(["  ", "HOW?", "A glitch in the wall collisions, too?  ", "Get her!  "])
    }
    //collision with guards
    var c = g.rectangleCollision(player, guard1, false, false) || g.rectangleCollision(player, guard2, false, false)
    if (c && currentLevel == 1) {
        //LEVEL2
        currentLevel = 2
        swapLevelTo(LEVEL2)
    }
}

//level 2 state
function level2() {
    levelGlobals()
        //move the wall
    movingwall.x += movingwall.d
    for (var i = 0; i < wallArray.length; i++) {
        var c = g.rectangleCollision(movingwall, wallArray[i], false, false);
        if (c) movingwall.d = -movingwall.d
    }
    //collision player/moving wall
    g.rectangleCollision(player, movingwall, false, false);
    //
    var edges = g.contain(player, g.stage.localBounds);
    if (edges && guard1.foll == false) {
        guard1.foll = true
        setMessage(["  ", "B  A  R  K  ", "You arrogant fool!", "Guaaards!  "])
    }
    //
    var c = g.rectangleCollision(player, guard1, false, false) || g.rectangleCollision(player, guard2, false, false)
    if (c && currentLevel == 2) {
        //LEVEL3
        currentLevel = 3
        swapLevelTo(LEVEL3)
    }
}

function level3() {
    levelGlobals()
        //collision guard3/walls
    for (var i = 0; i < wallArray.length; i++) {
        g.rectangleCollision(guard3, wallArray[i], false, false);
    }
    //force guard3 position
    if (guard3.x < 200) {
        guard3.x = 200
    }
    //move player away towards the right
    var t = g.rectangleCollision(guard3, player, false, false);
    if (t) {
        player.x += 50
        guard3.x += 1
    }
    //
    var edges = g.contain(player, g.stage.localBounds);
    if (edges && guard1.foll == false) {
        guard1.foll = true
        setMessage(["  ", "YOU LITTLE GLITCH!", "  "])
    }
    //
    var c = g.rectangleCollision(player, guard1, false, false) || g.rectangleCollision(player, guard2, false, false)
    if (c && currentLevel == 3) {
        //LEVEL4
        currentLevel = 4
        swapLevelTo(LEVEL4)

    }
}

function level4() {
    levelGlobals()
        //guard3 is the movable block
        //movingwall is MARK the dog
        //collisions of block and MARK with the walls, and force them 
        //back to their original position
    for (var i = 0; i < wallArray.length; i++) {
        var c = g.rectangleCollision(movingwall, wallArray[i], false, false);
        var t = g.rectangleCollision(guard3, wallArray[i], false, false);
        if (c == "left" || c == "bottom" || movingwall.x >= 400 || movingwall.y <= 50) {
            movingwall.x = 50 * 5
            movingwall.y = 50 * 4
        }
        if (t) {
            guard3.x = 50 * 3
            guard3.y = 50 * 5
        }
    }
    //MARK barks player
    var m = g.rectangleCollision(player, movingwall, false, false);
    if (m && !message.MSG[message.ACT]) {
        setMessage(["BARK!"])
    }
    //this will move the player away from MARK
    g.rectangleCollision(guard3, player, false, false);
    //this will make MARK move along with the block
    g.rectangleCollision(movingwall, guard3, false, false);
    //
    var edges = g.contain(player, g.stage.localBounds);
    if (edges && movingwall.scaleY == 1 && currentLevel == 4) {
        clearTimeout(movingwall.TM)
        movingwall.scaleY = -1
        dog.scaleY = -1
        movingwall.d = 0
        setMessage(["  ", "  ...  ", "  Ouch!  ", "  You ... ", "Got ... ", "Me ... ", "B ... ", "  BARK  "])
        window.setTimeout(function() {
            //LEVEL5
            currentLevel = 5
            swapLevelTo(LEVEL5)
        }, 8000)
    }
}

function level5() {
    levelGlobals()
    g.contain(player, g.stage.localBounds);
    //collision with MARK for some useful tips
    var m = g.rectangleCollision(player, guard3, false, false);
    //if not already during cutscene
    if (LEVEL5.ended == false) {
        if (m && !message.MSG[message.ACT]) {
            setMessage(["The only way to know the right order  ", "is to have access to the SOURCE CODE  ", "but only we guards have access to  ", "the SOURCE CODE  "])
        }
        //swtich ON/OFF handling
        for (var i = 0; i < switchArray.length; i++) {
            var s = g.rectangleCollision(player, switchArray[i], false, false);
            if (s && switchArray[i].canChange == true) {
                if (switchArray[i].alpha == 0.5) {
                    switchArray[i].alpha = 1
                } else {
                    switchArray[i].alpha = 0.5
                }
                switchArray[i].canChange = false
                window.setTimeout(function(val) {
                        switchArray[val].canChange = true
                    }, 500, i)
                    //if while switching the order is correct
                if (switchArray[0].alpha == 1 && switchArray[1].alpha == 0.5 && switchArray[2].alpha == 0.5 && switchArray[3].alpha == 1 && switchArray[4].alpha == 1 && switchArray[5].alpha == 1) {
                    //start cutscene
                    LEVEL5.ended = true
                    guard2.scaleX = 1
                    guard2.x = -500
                    guard2.width = 40
                    guard2.height = 30
                    guard1.x = -500
                    guard1.width = 40
                    guard1.height = 30
                        //first remove walls
                    LEVEL5.removeWalls = function() {
                            if (wallArray.length > 0) {
                                g.remove(wallArray[0])
                                wallArray.splice(0, 1)
                                window.setTimeout(LEVEL5.removeWalls, 100)
                            } else {
                                //then swtiches
                                if (switchArray.length > 0) {
                                    g.remove(switchArray[0])
                                    switchArray.splice(0, 1)
                                    window.setTimeout(LEVEL5.removeWalls, 100)
                                } else {
                                    //then make music faster
                                    playAt(160)
                                    dog.scaleY = 1
                                    guard3.scaleY = 1
                                    setMessage(["HOW COULD YOU ACCESS THE SOURCE CODE?  ", "COULD YOU POSSIBLY BE ... "])
                                    window.setTimeout(LEVEL5.finalScene, 8000)
                                }
                            }
                            //the chosen one is revealed
                            LEVEL5.finalScene = function() {
                                    var x = player.x
                                    var y = player.y
                                    g.remove(player)
                                        //player is removed and movingwall is created
                                        //with the shape of the chosen one exactly where the player was
                                    movingwall = g.sprite(CHOSEN)
                                    movingwall.width = 80
                                    movingwall.height = 120
                                    movingwall.scaleX = -1
                                    movingwall.x = x
                                    movingwall.y = y
                                    setMessage(["KEANU REEVES!  ", "GUARDS! LET'S GET AWAY FROM HERE!  "])
                                    window.setTimeout(LEVEL5.finalScene2, 5000)
                                }
                                //final screen
                            LEVEL5.finalScene2 = function() {
                                dog.visible = false
                                message.x = 10
                                setMessage(["GLITCHICKEN by Mattia Fortunati   ", "Made for the js13kgames 2016 competition.", "   ", "Congratulations!   ", "You won! :)  "])
                                    //glitch the title
                                LEVEL5.gt = function() {
                                    TTT = "GLITCHICKEN".shuffle()
                                    window.setTimeout(function() {
                                        TTT = "GLITCHICKEN"
                                        LEVEL5.TM = window.setTimeout(LEVEL5.gt, 2000)
                                    }, 200)
                                }
                                LEVEL9.TM = window.setTimeout(LEVEL5.gt, 2000)
                                    //guards run away and face away from the chosen one
                                guard1.run = true
                                guard1.scaleX = -1
                                guard2.scaleX = -1
                                guard3.scaleX = -1
                                    //create random glitchy chicks
                                    //storing them into the wallArray
                                for (var i = 0; i < 30; i++) {
                                    var oo = g.sprite([CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN, CHICKEN2]);
                                    oo.fps = Math.random() * 3
                                    oo.play()
                                    oo.width = 50;
                                    oo.height = 50;
                                    oo.x = -300
                                    oo.y = Math.random() * 500
                                    wallArray.push(oo)
                                    oo.speed = (Math.random() * 3) + 1
                                }
                                //from time to time, show final message
                                window.setTimeout(LEVEL5.postMessage, 21000)
                            }
                            LEVEL5.postMessage = function() {
                                setMessage(["Err .. you won. GAME OVER you got me?   ", "You can close the game now!  ", "Oh, don't forget to vote for this game! :)  ", "I hope you liked GLITCHICKEN!  ", "Thank you for playing!   "])
                                window.setTimeout(LEVEL5.postMessage, 21000)
                            }

                        }
                        //start cutescene in 100 ms
                    window.setTimeout(LEVEL5.removeWalls, 100)
                }
            }
        }
    } else {
        //if cutscene is showing
        //guards run in or away if needed
        if (!guard1.run) {
            g.followConstant(player, {
                centerX: 300,
                centerY: 250
            }, 3)
            g.followConstant(guard1, {
                centerX: 100,
                centerY: 250
            }, 1)
            g.followConstant(guard2, {
                centerX: 100,
                centerY: 380
            }, 1)
        } else {
            g.followConstant(guard1, {
                centerX: -500,
                centerY: 250
            }, 3)
            g.followConstant(guard2, {
                centerX: -500,
                centerY: 380
            }, 3)
            g.followConstant(guard3, {
                centerX: -500,
                centerY: 380
            }, 3)
            drawText(TTT, true)
                //move chicks
            for (var i = 0; i < wallArray.length; i++) {
                wallArray[i].x += wallArray[i].speed
                wallArray[i].width = 50
                wallArray[i].height = 50
                if (wallArray[i].x >= 700) {
                    wallArray[i].x = -300
                }

            }
        }

    }

}

function level9() {
    levelGlobals()
    drawText(TTT, true)
    player.x = -500
    player.y = 500
    if (!message.MSG[message.ACT]) {
        setMessage(["Welcome to GLITCHICKEN   ", "Move with arrow keys or screen tap   ", "press M to mute music   ", "Press any key to start    "])
    }
}

/*
AUDIO HANDLING
This part is partially copied from the TinyMusic example.
*/

// create the audio context
var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
    // initialize some vars
    sequence1,
    sequence2,
    // create an array of "note strings" that can be passed to a sequence
    lead = [
        'Gb1 e',
        'F1 e',
        'Gb1 e',
        'A2 e',
        'Gb1 e',
        'F1 e',
        'Gb1 e',
        'B2 e',
    ],
    harmony = [
        '- w',
        '- h',
        '- h',
        '- q',
        '- e',
        'Db3 w',
        'D3 e',
        'Db3 h',
        '- e',
        'E3 e',
        'D3 e',
        'Db3 w',
        'D3 e',
        'Db3 h',
        '- e',
        'E3 e',
        'D3 e',
        'Gb3 w',
        'A3 w',
        'B3 w',
        'C4 e',
        'B3 e',
        'D4 q',
        '- e',


    ],

    // create 2 new sequences (one for lead, one for harmony)
    sequence1 = new TinyMusic.Sequence(ac, 100, lead);
sequence2 = new TinyMusic.Sequence(ac, 100, harmony);

// set staccato values for maximum coolness
sequence1.staccato = 0.55;
sequence2.staccato = 0.55;

// adjust the levels
sequence1.gain.gain.value = 0.1;
sequence2.gain.gain.value = 0.1;

/*
  Audio utilities
*/

//call this to play the sequences at the desired speed
function playAt(speed) {
    sequence1.stop();
    sequence2.stop();
    sequence1.tempo = speed
    sequence2.tempo = speed
    sequence1.play(ac.currentTime);
    sequence2.play(ac.currentTime);
}


//press M to toggle music
keyObject = g.keyboard(77);
keyObject.press = function() {
    if (sequence1.gain.gain.value == 0) {
        sequence1.gain.gain.value = 0.1
    } else {
        sequence1.gain.gain.value = 0
    }
    sequence2.gain.gain.value = sequence1.gain.gain.value
};