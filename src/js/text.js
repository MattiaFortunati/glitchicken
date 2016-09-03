//I'm drawing the texts using Pixel Font algorithm 
//drawing on a different canvas which is overlapping the game canvas.
//I've adapted and changed algorithm for my game and for using it with Ga framework.
//
//This text canvas resizes and gets scale from the game canvas.
//Also, while drawing game canvas scale is considered.
//
//TCVS is the canvas for the texts
//TCTX is the context
//TTD is the text to draw
//TTT is the title to draw
var TCVS, TCTX, TTD, TTT
TTD = ""

function createTCVS() {
    TCVS = document.createElement("canvas");
    TCVS.setAttribute("width", 500 * g.scale);
    TCVS.setAttribute("height", 500 * g.scale);
    TCVS.style.backgroundColor = "";
    TCTX = TCVS.getContext("2d");
    TCVS.style = "position: absolute;top:0;bottom: 0;left: 0;right: 0;margin:auto;";

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
            // Chrome
        } else {
            // Safari
            TCVS.style.maxHeight = "100%";
            TCVS.style.minHeight = "100%";
        }
    }

    document.body.appendChild(TCVS);
}




//draw text
//if it is title the padding and the size change
//and also canvas is not cleared
function drawText(string, isTitle) {
    var context = TCTX
    var canvas = TCVS
    var size = 2.2 * g.scale
    var TX = 100 * g.scale
    var TY = 460 * g.scale

    if (!isTitle) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        string = TTT
        size = 8 * g.scale
        TX = 75 * g.scale
        TY = 100 * g.scale
    }


    var needed = [];
    if (string) {
        string = string.toUpperCase();
        for (var i = 0; i < string.length; i++) {
            var letter = letters[string.charAt(i)];
            if (letter) {
                needed.push(letter);
            }
        }

        context.fillStyle = 'black';
        var currX = 0;
        for (i = 0; i < needed.length; i++) {
            letter = needed[i];
            var currY = 0;
            var addX = 0;
            for (var y = 0; y < letter.length; y++) {
                var row = letter[y];
                for (var x = 0; x < row.length; x++) {
                    if (row[x]) {
                        context.fillRect(currX + x * size + TX, currY + TY, size, size);
                    }
                }
                addX = Math.max(addX, row.length * size);
                currY += size;
            }
            currX += size + addX;
        }
    }
}


//I use Pixel Font letters, but I also added some additional letters that I needed
var letters = {
    'A': [
        [, 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1]
    ],
    'B': [
        [1, 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, 1]
    ],
    'C': [
        [1, 1, 1],
        [1],
        [1],
        [1],
        [1, 1, 1]
    ],
    'D': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1]
    ],
    'E': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [1],
        [1, 1, 1]
    ],
    'F': [
        [1, 1, 1],
        [1],
        [1, 1],
        [1],
        [1]
    ],
    'G': [
        [, 1, 1],
        [1],
        [1, , 1, 1],
        [1, , , 1],
        [, 1, 1]
    ],
    'H': [
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, , 1]
    ],
    'I': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [1, 1, 1]
    ],
    'J': [
        [1, 1, 1],
        [, , 1],
        [, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'K': [
        [1, , , 1],
        [1, , 1],
        [1, 1],
        [1, , 1],
        [1, , , 1]
    ],
    'L': [
        [1],
        [1],
        [1],
        [1],
        [1, 1, 1]
    ],
    'M': [
        [1, 1, 1, 1, 1],
        [1, , 1, , 1],
        [1, , 1, , 1],
        [1, , , , 1],
        [1, , , , 1]
    ],
    'N': [
        [1, , , 1],
        [1, 1, , 1],
        [1, , 1, 1],
        [1, , , 1],
        [1, , , 1]
    ],
    'O': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'P': [
        [1, 1, 1],
        [1, , 1],
        [1, 1, 1],
        [1],
        [1]
    ],
    'Q': [
        [0, 1, 1],
        [1, , , 1],
        [1, , , 1],
        [1, , 1, 1],
        [1, 1, 1, 1]
    ],
    'R': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, 1],
        [1, , 1]
    ],
    'S': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [, , 1],
        [1, 1, 1]
    ],
    'T': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    'U': [
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'V': [
        [1, , , , 1],
        [1, , , , 1],
        [, 1, , 1],
        [, 1, , 1],
        [, , 1]
    ],
    'W': [
        [1, , , , 1],
        [1, , , , 1],
        [1, , , , 1],
        [1, , 1, , 1],
        [1, 1, 1, 1, 1]
    ],
    'X': [
        [1, , , , 1],
        [, 1, , 1],
        [, , 1],
        [, 1, , 1],
        [1, , , , 1]
    ],
    'Y': [
        [1, , 1],
        [1, , 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    'Z': [
        [1, 1, 1, 1, 1],
        [, , , 1],
        [, , 1],
        [, 1],
        [1, 1, 1, 1, 1]
    ],
    '0': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    '1': [
        [, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1]
    ],
    ' ': [
        [, , ],
        [, , ],
        [, , ],
        [, , ],
        [, , ]
    ],
    '.': [
        [, , ],
        [, , ],
        [, , ],
        [, , ],
        [, 1, ]
    ],
    "'": [
        [, 1, ],
        [, 1, ],
        [, , ],
        [, , ],
        [, , ]
    ],
    '!': [
        [, 1, ],
        [, 1],
        [, 1],
        [, 0],
        [, 1, ]
    ],
    '?': [
        [, 1, 1, 1],
        [, , , 1],
        [, , 1],
        [, , ],
        [, , 1]
    ],
    '2': [
        [1, 1, 1, 1],
        [, , , 1],
        [1, 1, 1, 1],
        [1, ],
        [1, 1, 1, 1]
    ],
    '6': [
        [1, 1, 1, 1],
        [1, , , , ],
        [1, 1, 1, 1],
        [1, , , 1],
        [1, 1, 1, 1]
    ],
    '3': [
        [1, 1, 1, 1],
        [, , , 1],
        [1, 1, 1, 1],
        [, , , 1],
        [1, 1, 1, 1]
    ],
};