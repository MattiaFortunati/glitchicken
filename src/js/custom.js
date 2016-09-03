GA.custom = function(ga) {

    /* 

    MY PERSONAL PLUGINS

    */
    ga.noBlurScale = function() {
        //make it work for pixel art
        ga.canvas.ctx.webkitImageSmoothingEnabled = false;
        ga.canvas.ctx.mozImageSmoothingEnabled = false;
        ga.canvas.ctx.imageSmoothingEnabled = false; /// future
    }




    /* 

    GA OFFICIAL PLUGINS

    */


    ga.scaleToWindow = function(backgroundColor, _canvas) {

        var CANVAS = _canvas || ga.canvas

        backgroundColor = backgroundColor || "#2C3539";
        var scaleX, scaleY, scale, center;

        //1. Scale the canvas to the correct size
        //Figure out the scale amount on each axis
        scaleX = window.innerWidth / CANVAS.width;
        scaleY = window.innerHeight / CANVAS.height;

        //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
        scale = Math.min(scaleX, scaleY);
        CANVAS.style.transformOrigin = "0 0";
        CANVAS.style.transform = "scale(" + scale + ")";

        //2. Center the canvas.
        //Decide whether to center the canvas vertically or horizontally.
        //Wide canvases should be centered vertically, and 
        //square or tall canvases should be centered horizontally
        if (CANVAS.width > CANVAS.height) {
            if (CANVAS.width * scale < window.innerWidth) {
                center = "horizontally";
            } else {
                center = "vertically";
            }
        } else {
            if (CANVAS.height * scale < window.innerHeight) {
                center = "vertically";
            } else {
                center = "horizontally";
            }
        }

        //Center horizontally (for square or tall canvases)
        ga.mleft = 0
        ga.mtop = 0
        var margin;
        if (center === "horizontally") {
            margin = (window.innerWidth - CANVAS.width * scale) / 2;
            CANVAS.style.marginLeft = margin + "px";
            CANVAS.style.marginRight = margin + "px";
            ga.mleft = margin
        }

        //Center vertically (for wide canvases) 
        if (center === "vertically") {
            margin = (window.innerHeight - CANVAS.height * scale) / 2;
            CANVAS.style.marginTop = margin + "px";
            CANVAS.style.marginBottom = margin + "px";
            ga.mtop = margin
        }

        //3. Remove any padding from the canvas  and body and set the canvas
        //display style to "block"
        CANVAS.style.paddingLeft = 0;
        CANVAS.style.paddingRight = 0;
        CANVAS.style.paddingTop = 0;
        CANVAS.style.paddingBottom = 0;
        CANVAS.style.display = "block";

        //4. Set the color of the HTML body background
        document.body.style.backgroundColor = backgroundColor;

        //5. Set the game engine and pointer to the correct scale. 
        //This is important for correct hit testing between the pointer and sprites
        ga.pointer.scale = scale;
        ga.scale = scale;

        //It's important to set `canvasHasBeenScaled` to `true` so that
        //the scale values aren't overridden by Ga's check for fullscreen
        //mode in the `update` function (in the `ga.js` file.)
        CANVAS.scaled = true;

        //Fix some quirkiness in scaling for Safari
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("safari") != -1) {
            if (ua.indexOf("chrome") > -1) {
                // Chrome
            } else {
                // Safari
                CANVAS.style.maxHeight = "100%";
                CANVAS.style.minHeight = "100%";
            }
        }
    };

    ga.followConstant = function(follower, leader, speed) {

        //Figure out the distance between the sprites
        var vx = leader.centerX - follower.centerX,
            vy = leader.centerY - follower.centerY,
            distance = Math.sqrt(vx * vx + vy * vy);

        //Move the follower if it's more than 1 move
        //away from the leader
        if (distance >= speed) {
            follower.x += (vx / distance) * speed;
            follower.y += (vy / distance) * speed;
        }
    };

    ga.rectangleCollision = function(r1, r2, bounce, global) {
        var collision, combinedHalfWidths, combinedHalfHeights,
            overlapX, overlapY, vx, vy;

        //Set `bounce` to a default value of `true`
        if (bounce === undefined) bounce = false;

        //Set `global` to a default value of `false`
        if (global === undefined) global = false;

        //Calculate the distance vector
        if (global) {
            vx = (r1.gx + r1.halfWidth) - (r2.gx + r2.halfWidth);
            vy = (r1.gy + r1.halfHeight) - (r2.gy + r2.halfHeight);
        } else {
            vx = r1.centerX - r2.centerX;
            vy = r1.centerY - r2.centerY;
        }

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check whether vx is less than the combined half widths
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occurring!
            //Check whether vy is less than the combined half heights
            if (Math.abs(vy) < combinedHalfHeights) {

                //A collision has occurred! This is good!
                //Find out the size of the overlap on both the X and Y axes
                overlapX = combinedHalfWidths - Math.abs(vx);
                overlapY = combinedHalfHeights - Math.abs(vy);

                //The collision has occurred on the axis with the
                //*smallest* amount of overlap. Let's figure out which
                //axis that is

                if (overlapX >= overlapY) {

                    //The collision is happening on the X axis
                    //But on which side? vy can tell us
                    if (vy > 0) {
                        collision = "top";

                        //Move the rectangle out of the collision
                        r1.y = r1.y + overlapY;
                    } else {
                        collision = "bottom";

                        //Move the rectangle out of the collision
                        r1.y = r1.y - overlapY;
                    }
                    //Bounce
                    if (bounce) {
                        r1.vy *= -1;

                        /*Alternative
                        //Find the bounce surface's vx and vy properties
                        var s = {};
                        s.vx = r2.x - r2.x + r2.width;
                        s.vy = 0;

                        //Bounce r1 off the surface
                        //bounceOffSurface(r1, s);
                        */
                    }
                } else {

                    //The collision is happening on the Y axis
                    //But on which side? vx can tell us
                    if (vx > 0) {
                        collision = "left";

                        //Move the rectangle out of the collision
                        r1.x = r1.x + overlapX;
                    } else {
                        collision = "right";

                        //Move the rectangle out of the collision
                        r1.x = r1.x - overlapX;
                    }

                    //Bounce
                    if (bounce) {
                        r1.vx *= -1;

                        /*Alternative
                        //Find the bounce surface's vx and vy properties
                        var s = {};
                        s.vx = 0;
                        s.vy = r2.y - r2.y + r2.height;

                        //Bounce r1 off the surface
                        bounceOffSurface(r1, s);
                        */
                    }
                }
            } else {

                //No collision
            }
        } else {

            //No collision
        }

        //Return the collision string. it will be either "top", "right",
        //"bottom", or "left" depening on which side of r1 is touching r2.
        return collision;
    }

    ga.contain = function(s, bounds, bounce, extra) {

        var x = bounds.x,
            y = bounds.y,
            width = bounds.width,
            height = bounds.height;

        //Set `bounce` to `false` by default
        bounce = bounce || false;

        //The `collision` object is used to store which
        //side of the containing rectangle the sprite hits
        var collision;

        //Left
        if (s.x < x) {

            //Bounce the sprite if `bounce` is true
            if (bounce) s.vx *= -1;

            //If the sprite has `mass`, let the mass
            //affect the sprite's velocity
            if (s.mass) s.vx /= s.mass;
            s.x = x;
            collision = "left";
        }

        //Top
        if (s.y < y) {
            if (bounce) s.vy *= -1;
            if (s.mass) s.vy /= s.mass;
            s.y = y;
            collision = "top";
        }

        //Right
        if (s.x + s.width > width) {
            if (bounce) s.vx *= -1;
            if (s.mass) s.vx /= s.mass;
            s.x = width - s.width;
            collision = "right";
        }

        //Bottom
        if (s.y + s.height > height) {
            if (bounce) s.vy *= -1;
            if (s.mass) s.vy /= s.mass;
            s.y = height - s.height;
            collision = "bottom";
        }

        //The `extra` function runs if there was a collision
        //and `extra` has been defined
        if (collision && extra) extra(collision);

        //Return the `collision` object
        return collision;
    };
    ga.move = function(sprites) {
        if (sprites instanceof Array === false) {
            internal_move(sprites)
        } else {
            for (var i = 0; i < sprites.length; i++) {
                internal_move(sprite[i])
            }
        }

        function internal_move(sprite) {
            sprite.x += sprite.vx | 0;
            sprite.y += sprite.vy | 0;
        }
    };



    ga.fourKeyController = function(s, speed, up, right, down, left) {

        //Create a `direction` property on the sprite
        s.direction = "";

        //Create some keyboard objects
        leftArrow = ga.keyboard(left);
        upArrow = ga.keyboard(up);
        rightArrow = ga.keyboard(right);
        downArrow = ga.keyboard(down);

        //Assign key `press` and release methods
        leftArrow.press = function() {
            s.vx = -speed;
            s.vy = 0;
            s.direction = "left";
        };
        leftArrow.release = function() {
            if (!rightArrow.isDown && s.vy === 0) {
                s.vx = 0;
            }
        };
        upArrow.press = function() {
            s.vy = -speed;
            s.vx = 0;
            s.direction = "up";
        };
        upArrow.release = function() {
            if (!downArrow.isDown && s.vx === 0) {
                s.vy = 0;
            }
        };
        rightArrow.press = function() {
            s.vx = speed;
            s.vy = 0;
            s.direction = "right";
        };
        rightArrow.release = function() {
            if (!leftArrow.isDown && s.vy === 0) {
                s.vx = 0;
            }
        };
        downArrow.press = function() {
            s.vy = speed;
            s.vx = 0;
            s.direction = "down";
        };
        downArrow.release = function() {
            if (!upArrow.isDown && s.vx === 0) {
                s.vy = 0;
            }
        };
    };


    ga.contain = function(s, bounds, bounce, extra) {

        var x = bounds.x,
            y = bounds.y,
            width = bounds.width,
            height = bounds.height;

        //Set `bounce` to `false` by default
        bounce = bounce || false;

        //The `collision` object is used to store which
        //side of the containing rectangle the sprite hits
        var collision;

        //Left
        if (s.x < x) {

            //Bounce the sprite if `bounce` is true
            if (bounce) s.vx *= -1;

            //If the sprite has `mass`, let the mass
            //affect the sprite's velocity
            if (s.mass) s.vx /= s.mass;
            s.x = x;
            collision = "left";
        }

        //Top
        if (s.y < y) {
            if (bounce) s.vy *= -1;
            if (s.mass) s.vy /= s.mass;
            s.y = y;
            collision = "top";
        }

        //Right
        if (s.x + s.width > width) {
            if (bounce) s.vx *= -1;
            if (s.mass) s.vx /= s.mass;
            s.x = width - s.width;
            collision = "right";
        }

        //Bottom
        if (s.y + s.height > height) {
            if (bounce) s.vy *= -1;
            if (s.mass) s.vy /= s.mass;
            s.y = height - s.height;
            collision = "bottom";
        }

        //The `extra` function runs if there was a collision
        //and `extra` has been defined
        if (collision && extra) extra(collision);

        //Return the `collision` object
        return collision;
    };
};