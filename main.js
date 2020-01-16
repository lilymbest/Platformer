var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

rectangle = {

    height: 32,
    jumping: true,
    width: 32,
    x: 244, // center of the canvas
    x_velocity: 0,
    y: 0,
    y_velocity: 0

};

controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37:// left key
                controller.left = key_state;
                break;
            case 38:// up key
                controller.up = key_state;
                break;
            case 39:// right key
                controller.right = key_state;
                break;

        }

    }

};

loop = function () {

    if (controller.up && rectangle.jumping == false) {

        rectangle.y_velocity -= 20;
        rectangle.jumping = true;

    }

    if (controller.left) {

        rectangle.x_velocity -= 0.5;

    }

    if (controller.right) {

        rectangle.x_velocity += 0.5;

    }

    rectangle.y_velocity += 1.5;// gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9;// friction
    rectangle.y_velocity *= 0.9;// friction

    // if rectangle is falling below floor line
    if (rectangle.y > 180 - 16 - 32) {

        rectangle.jumping = false;
        rectangle.y = 180 - 16 - 32;
        rectangle.y_velocity = 0;

    }

    // if rectangle is going off the left of the screen
    if (rectangle.x < 0) {

        rectangle.x_velocity = 0;
        rectangle.x = 0;

    } else if (rectangle.x > 290) {// if rectangle goes past right boundary

        rectangle.x_velocity = 0;
        rectangle.x = 290;

    }

    if (rectangle.y >= 104 & rectangle.y >= 100 && rectangle.x >= 15 & rectangle.x <= 100) {
        rectangle.jumping = false;
        rectangle.y_velocity = 0;
        rectangle.y = 103;
        
    }
    
    if (rectangle.y <= 74 & rectangle.y >= 70 && rectangle.x >= 110 & rectangle.x <= 200) {
        rectangle.jumping = false;
        rectangle.y_velocity = 0;
        rectangle.y = 70;  
    }

    context.fillStyle = "#2D2E2E";//canvas color
    context.fillRect(0, 0, 320, 180);// x, y, width, height
    context.fillStyle = "#AC92A6";// square color
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();
    //floor
    context.strokeStyle = "#797B84";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 164);
    context.lineTo(320, 164);
    context.stroke();
    //platform 1
    context.strokeStyle = "#797B84";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(35, 134);
    context.lineTo(100, 134);
    context.stroke();
    //platform 2
    context.strokeStyle = "#797B84";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(140, 104);
    context.lineTo(200, 104);
    context.stroke();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);