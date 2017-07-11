
var circles = [];

//draw function handle the drawing of each circle
var draw = function (context, x, y, fillcolor, radialGradient, radius, linewidth, strokestyle, fontcolor1, textalign1, fontsize1, fonttype1, filltext1, fontcolor2, textalign2, fontsize2, fonttype2, filltext2) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    
    if (radialGradient)
    {
        var radial = context.createRadialGradient(x, y, radius/1.3, x, y, radius+10);
        radial.addColorStop(0, fillcolor);
        radial.addColorStop(1, 'white');
        context.fillStyle = radial;
    }
    else
    {
        context.fillStyle = fillcolor;
    }
        
    context.fill();

    if (linewidth != 0) {
        context.lineWidth = linewidth;
        context.strokeStyle = strokestyle;
        context.stroke();
    }

    //Font 1 (into circle)
    context.fillStyle = fontcolor1;
    context.textAlign = textalign1;
    context.font = fontsize1 + " " + fonttype1;
    context.fontSize = fontsize1;
    context.fillText(filltext1, x, y + parseInt(fontsize1) / 3);

    //Font 2 under circle
    context.fillStyle = fontcolor2;
    context.textAlign = textalign2;
    context.font = fontsize2 + " " + fonttype2;
    context.fontSize = fontsize2;
    context.fillText(filltext2, x, y + radius + 25);
};

// object that will hold the position of each circle
var Circle = function (x, y, radius) {
    this.left = x - radius;
    this.top = y - radius;
    this.right = x + radius;
    this.bottom = y + radius;
    this.isInside = false;
};

// method that will call the draw-method – in order to draw the circle – and that will store the position of each new circle.
var drawCircle = function (context, x, y, fillcolor, radialGradient, radius, linewidth, strokestyle, fontcolor1, textalign1, fontsize1, fonttype1, filltext1, fontcolor2, textalign2, fontsize2, fonttype2, filltext2) {
    draw(context, x, y, fillcolor, radialGradient, radius, linewidth, strokestyle, fontcolor1, textalign1, fontsize1, fonttype1, filltext1, fontcolor2, textalign2, fontsize2, fonttype2, filltext2);
    var circle = new Circle(x, y, radius);
    circles.push(circle);
};


//Return x, y cursor position into the canvas
var getMousePos = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

