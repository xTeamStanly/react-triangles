import { React, useEffect, useRef, useState } from 'react';
import colorConvertor from 'color-convert';

import eventListen from '@use-it/event-listener';
import DatGui, { DatColor, DatFolder, DatNumber } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';

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

    let triangles = [];

    const [update, setUpdate] = useState(false);

    const config = useRef({

        //top + bot colors
        topcolor: colorConvertor.hex.hsv((props.topcolor) ? props.topcolor : "#7fff69"),
        botcolor: colorConvertor.hex.hsv((props.botcolor) ? props.botcolor : "#814796"),

        topcolorhex: (props.topcolor) ? props.topcolor : "#7fff69",
        botcolorhex: (props.botcolor) ? props.botcolor : "#814796",

        //color variation + clamping
        varH: (props.hue) ? clamp(props.hue, 0, 1) : 0.2,
        varS: (props.sat) ? clamp(props.sat, 0, 1) : 0,
        varV: (props.val) ? clamp(props.val, 0, 1) : 0.15,

        //equilateral triangle forces the count of triangle count Y
        equilateral: (props.equilateral) ? props.equilateral : true,

        triangleCountX: (!props.countx || props.countx < 0) ? 10 : props.countx,
        triangleCountY: (!props.county || props.county < 0) ? 10 : props.county,

        stepX: null,
        stepY: null,

    });

    /* === GUI === */
    const [showGUI, setShowGUI] = useState(false);
    eventListen('keydown', (event) => {
        if(!event.repeat && event.code === 'Pause') { setShowGUI(!showGUI); }
    });

    const handleUpdate = (newData) => {

        newData.topcolor = colorConvertor.hex.hsv(newData.topcolorhex);
        newData.botcolor = colorConvertor.hex.hsv(newData.botcolorhex);

        config.current = newData;
        localStorage.setItem('config', JSON.stringify(newData));

        setUpdate(!update);
    }

    //generate color based on triangle position
    const generateColor = (x, y, maxX, maxY) => {

        let percentDistanceFromFloor = y / maxY;
        if(percentDistanceFromFloor < 0) { percentDistanceFromFloor = 0; }
        //triangle center coords
        //const triangleCenterX = (ax + bx + cx) / 3;
        //const triangleCenterY = (ay + by + cy) / 3;
        //const percentDistanceFromFloor = triangleCenterY / canvasHeight;

        //hue saturation lightness
        const hue = valueToPercent(percentDistanceFromFloor + Math.random() * config.current.varH, config.current.topcolor[0], config.current.botcolor[0]);
        const sat = valueToPercent(percentDistanceFromFloor + Math.random() * config.current.varS, config.current.topcolor[1], config.current.botcolor[1]);

        var varV = percentDistanceFromFloor + Math.random() * config.current.varV;
        if(varV > 1) { varV = 1; }

        const val = valueToPercent(varV, config.current.topcolor[2], config.current.botcolor[2]);

        return "#" + colorConvertor.hsv.hex(clamp(hue, 0, 360), clamp(sat, 0, 100), clamp(val, 0, 100));
    };

    //generate triangle points (coordinates)
    const generateTriangles = () => {

        //optimizovane promenljive
        var a, b, c, d, offset = 0;
        var red;
        for(let x = -config.current.stepX; x <= canvasWidth; x += config.current.stepX) {
            red = 1;
            for(let y = -config.current.stepY; y <= canvasHeight; y += config.current.stepY) {

                if(red % 2 === 1) { offset = config.current.stepX / 2; }
                //if(Math.floor(y / stepY) % 2 == 1) { offset = stepX / 2; }

                a = offset + x;       //offset + x
                b = a + config.current.stepX;        //offset + x + stepX
                c = a + config.current.stepX / 2;    //offset + x + stepX / 2
                d = y + config.current.stepY;        //y + stepY

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
                    x1: c + config.current.stepX, y1: d,
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

    useEffect(() => {init()}, [showGUI, update]);

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

        //startup load config
        if(localStorage.getItem('config') !== null) {
            config.current = JSON.parse(localStorage.getItem('config'));
        } else {
            localStorage.setItem('config', JSON.stringify(config.current));
        }

        //get the canvas element
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');

        //canvas size
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = canvasHeight;

        //step calculation + equilateral
        if(config.current.equilateral) {
            //equilateral forces Y, vertical triangle count
            config.current.stepY = canvasHeight / config.current.triangleCountY;
            config.current.stepX = config.current.stepY * 2 * Math.sqrt(3) / 3;
        } else {
            //forces both triangles count (streched triangles)
            config.current.stepX = canvasWidth / config.current.triangleCountX;
            config.current.stepY = canvasHeight / config.current.triangleCountY;
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
            <div hidden={!showGUI}>
                <DatGui data={config.current} onUpdate={handleUpdate} >

                    <DatFolder title='Colors' closed={false}>
                        <DatColor path='topcolorhex' label='Top Color' />
                        <DatColor path='botcolorhex' label='Bottom Color' />
                    </DatFolder>


                    <DatFolder title='Variations' closed={false}>
                        <DatNumber path='varH' label='Hue Variation' min={0} max={1} step={0.01} />
                        <DatNumber path='varS' label='Saturation Variation' min={0} max={1} step={0.01} />
                        <DatNumber path='varV' label='Value Variation' min={0} max={1} step={0.01} />
                    </DatFolder>

                    <DatNumber path='triangleCountY' label='Row Count' min={1} max={64} />
                </DatGui>
            </div>

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