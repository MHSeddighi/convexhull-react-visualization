import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import video from './../video/Particles - 27669.mp4';
import ConvexHull from '../convex_hull/ConvexHull';
import { Stage, Layer, Star, Text, Circle, Line } from 'react-konva';
import { Tween } from 'konva/lib/Tween';
import { useLayoutEffect } from 'react';
import Konva from 'konva';

function Canvas() {
    const [searchParams, setSearchParams] = useSearchParams();
    const canvas = useRef(null);
    const line = useRef(null);
    const polygon = useRef(null);
    const [list, setList] = useState([]);
    const isRunning = false;
    const [canvasStates, setState] = useState({ width: window.innerWidth, height: window.innerHeight, points: [], cHPoints: [] });

    useLayoutEffect(() => {
        const w = canvas?.current.offsetWidth;
        const h = canvas?.current.offsetHeight;
        var temp = [];
        let pointsX = searchParams.getAll('x');
        let pointsY = searchParams.getAll('y');
        for (let i = 0; i < pointsX.length; i++) {
            temp[temp.length] = { 'x': Math.round(pointsX[i] * (w / 200)), 'y': Math.round(pointsY[i] * (h / 200)) }
        }
        const ch = new ConvexHull();
        var temp2 = ch.convexHull(temp);
        if (w != canvasStates.width || h != canvasStates.height) {
            setState({ width: w, height: h, points: temp, cHPoints: temp2, });
            drawAllPoints(temp, setList);
        }
    }, [canvasStates.width, canvasStates.height]);

    return (
        <>
            <video muted loop autoPlay id="myVideo">
                <source src={video} type="video/mp4" />
            </video>

            <div className='container p-absolute w-100vw h-100vh'>
                <button className='btn btn--primary w-100' onClick={() => !isRunning && (draw(canvasStates.points, canvasStates.cHPoints, line.current, polygon.current, isRunning))}>RUN</button>
                <div className='canvas-board' ref={canvas}>
                    <Stage width={canvasStates.width} height={canvasStates.height}>
                        <Layer>
                            {list}
                            <Line
                                tension={0.5}
                                points={[]}
                                ref={line}
                                closed
                                stroke="black"
                                strokeWidth={3}
                                lineJoin="round"
                                lineCap='round'
                            />
                            <Line
                                tension={0}
                                points={[]}
                                ref={polygon}
                                stroke="white"
                                strokeWidth={3}
                                fill="#fff"
                                lineJoin="round"
                                lineCap='round'
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>
        </>
    );
}


function drawAllPoints(points, setList) {
    const list = [];
    points.forEach(function (point, index, points) {
        list.push(
            <Circle key={index} x={point.x} y={point.y} radius={6} fill="white" zIndex="3000" />
        );
    });
    setList(list);
}



function drawLine(x1, y1, x2, y2, line) {
    line?.to({
        points: [x1, y1, x2, y2],
        duration: 1,
    });
}

async function draw(points, chPoints, line, polygon, isRunning) {
    const allPoints = [...chPoints];
    points.forEach(function (item, index, array) {
        if (!chPoints.includes(item))
            allPoints[allPoints.length] = item;
    });

    for (let index = 0; index < chPoints.length - 1; index++) {
        let i = index + 1;
        while (i < allPoints.length) {
            drawLine(allPoints[index].x, allPoints[index].y, allPoints[i].x, allPoints[i].y, line);
            await new Promise((resolve, reject) => {
                setTimeout(function () { resolve("I love You !!"); }, 1500);
            });
            i++;
        }
        polygon.to({
            points: [...getPoints(chPoints, (index + 1) % chPoints.length)],
            duration: 1,
        });
        await new Promise((resolve, reject) => {
            setTimeout(function () { resolve("I love You !!"); }, 1500);
        });
    }
    polygon.to({
        points: [...getPoints(chPoints, chPoints.length - 1), chPoints[0].x, chPoints[0].y],
        duration: 1,
    });
    line?.to({
        points: [],
        duration: 1,
    });
    isRunning = false;

}

function getPoints(point, end) {
    let temp = [];
    for (let i = 0; i <= end; i++) {
        temp[temp.length] = point[i].x;
        temp[temp.length] = point[i].y;
    }
    return temp;
}




export default Canvas;