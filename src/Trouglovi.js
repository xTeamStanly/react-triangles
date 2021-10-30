import { React, useEffect, useRef } from 'react';
import colorConvertor from 'color-convert';

//global config
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

//helper function
const valueToPercent = (percent, min, max) => { return min + percent * (max - min); }
const clamp = (input, min, max) => {
    if(input > max) { return max; }
    if(input < min) { return min; }
    return input;
}
//triangle component
const Trouglovi = (props) => {

    //TOP COLOR
    let topColor = colorConvertor.hex.hsv((props.topcolor) ? props.topcolor : "#7fff69");
    let topHue = topColor[0];
    let topSat = topColor[1];
    let topVal = topColor[2];

    //BOT COLOR
    let botColor = colorConvertor.hex.hsv((props.botcolor) ? props.botcolor : "#814796");
    let botHue = botColor[0];
    let botSat = botColor[1];
    let botVal = botColor[2];

    //COLOR VARIATION + clamping
    let varijacijaH = (props.hue) ? clamp(props.hue, 0, 1) : 0.2;
    let varijacijaS = (props.sat) ? clamp(props.sat, 0, 1) : 0;
    let varijacijaV = (props.val) ? clamp(props.val, 0, 1) : 0.15;

    let triangles = [];

    //equilateral triangle forces the count of triangle count Y
    let equilateral = (props.equilateral) ? props.equilateral : true;

    let triangleCountX = (!props.countx || props.countx < 0) ? 10 : props.countx;
    let triangleCountY = (!props.county || props.county < 0) ? 10 : props.county;

    let stepX; let stepY;

    //generate color based on triangle position
    const generateColor = (x, y, maxX, maxY) => {

        let percentDistanceFromFloor = y / maxY;
        if(percentDistanceFromFloor < 0) { percentDistanceFromFloor = 0; }
        //triangle center coords
        //const triangleCenterX = (ax + bx + cx) / 3;
        //const triangleCenterY = (ay + by + cy) / 3;
        //const percentDistanceFromFloor = triangleCenterY / canvasHeight;

        //hue saturation lightness
        const hue = valueToPercent(percentDistanceFromFloor + Math.random() * varijacijaH, topHue, botHue);
        const sat = valueToPercent(percentDistanceFromFloor + Math.random() * varijacijaS, topSat, botSat);

        var varV = percentDistanceFromFloor + Math.random() * varijacijaV;
        if(varV > 1) { varV = 1; }

        const val = valueToPercent(varV, topVal, botVal);

        return "#" + colorConvertor.hsv.hex(clamp(hue, 0, 360), clamp(sat, 0, 100), clamp(val, 0, 100));
    };

    //generate triangle points (coordinates)
    const generateTriangles = () => {

        //optimizovane promenljive
        var a, b, c, d, offset = 0;
        var red;
        for(let x = -stepX; x <= canvasWidth; x += stepX) {
            red = 1;
            for(let y = -stepY; y <= canvasHeight; y += stepY) {

                if(red % 2 === 1) { offset = stepX / 2; }
                //if(Math.floor(y / stepY) % 2 == 1) { offset = stepX / 2; }

                a = offset + x;       //offset + x
                b = a + stepX;        //offset + x + stepX
                c = a + stepX / 2;    //offset + x + stepX / 2
                d = y + stepY;        //y + stepY

                //gornji trougao
                triangles.push({
                    x0: a, y0: y,
                    x1: b, y1: y,
                    x2: c, y2: d,
                    color: generateColor(a, y, canvasWidth, canvasHeight)
                });

                //donji trougao
                triangles.push({
                    x0: c, y0: d,
                    x1: c + stepX, y1: d,
                    x2: b, y2: y,
                    color: generateColor(a, y, canvasWidth, canvasHeight)
                });

                offset = 0;
                red++;
            }
        }
    }

    //draw points to canvas
    const drawTriangles = () => {

        ctx.lineWidth = 2;
        var trougao;

        for(let i = 0; i < triangles.length; i++) {
            trougao = triangles[i];
            ctx.fillStyle = trougao.color;
            ctx.strokeStyle = trougao.color;
            ctx.beginPath();
            ctx.moveTo(trougao.x0, trougao.y0);
            ctx.lineTo(trougao.x1, trougao.y1);
            ctx.lineTo(trougao.x2, trougao.y2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }

    //canvas
    let canvasRef = useRef();
    let canvas;
    let ctx;

    //startup + resize event
    useEffect(() => {

        //get the canvas element
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');

        //first init
        init();

        //resize detection
        var resizeTimer;
        window.addEventListener('resize', () => {
            if(resizeTimer) { clearTimeout(resizeTimer); }
            resizeTimer = setTimeout(() => {
                init(); //init on resize
            }, 100);
        });

    }, []);

    //initialisation
    const init = () => {

        //canvas size
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = canvasHeight;

        //step calculation + equilateral
        if(equilateral) {
            //equilateral forces Y, vertical triangle count
            stepY = canvasHeight / triangleCountY;
            stepX = stepY * 2 * Math.sqrt(3) / 3;
        } else {
            //forces both triangles count (streched triangles)
            stepX = canvasWidth / triangleCountX;
            stepY = canvasHeight / triangleCountY;
        }

        triangles = [];
        generateTriangles();
        drawTriangles();
    }

    return(
        <div style = {{
            position: 'absolute',
            zIndex: -1,
            width: "100%",
            height: "100%"
        }}>
            <canvas
                ref = { canvasRef }
                style = {{
                    position: 'absolute',
                    zIndex: -1,
                    width: "100%",
                    height: "100%"
                }}

                width = { canvasWidth }
                height = { canvasHeight }
            />
        </div>
    );
}

export default Trouglovi;