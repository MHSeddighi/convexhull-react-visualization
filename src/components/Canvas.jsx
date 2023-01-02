import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import video from './../video/Particles - 27669.mp4';
import ConvexHull from '../convex_hull/ConvexHull';
import { Stage, Layer, Star, Text, Circle, Line } from 'react-konva';
import { useLayoutEffect } from 'react';

function Canvas() {
    const [searchParams, setSearchParams] = useSearchParams();
    const canvas = useRef(null);
    const line = useRef(null);
    const polygon = useRef(null);
    const [list, setList] = useState([]);
    const runBtn = useRef(null);
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
                <div className='d-flex w-100'>
                    <button className='btn btn--primary w-50' ref={runBtn} onClick={() => (draw(canvasStates.points, canvasStates.cHPoints, line.current, polygon.current, runBtn.current))}>RUN</button>
                    <button className='btn btn--primary w-50' onClick={() => window.location.reload()}>RERUN</button>
                </div>
                <div className='canvas-board' ref={canvas}>
                    <Stage width={canvasStates.width} height={canvasStates.height}>
                        <Layer>
                            {list}
                            <Line
                                tension={0.5}
                                points={[]}
                                zIndex="-1"
                                ref={line}
                                closed
                                stroke="#763F00"
                                strokeWidth={4}
                                lineJoin="round"
                                lineCap='round'
                            />
                            <Line
                                tension={0}
                                points={[]}
                                ref={polygon}
                                stroke="white"
                                strokeWidth={5}
                                fill="#fff"
                                lineJoin="round"
                                lineCap='round'
                                fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                                fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                                fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
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
            <Circle key={index} x={point.x} y={point.y} radius={6} fill="white" zIndex="2000" />
        );
    });
    setList(list);
}



function drawLine(x1, y1, x2, y2, line) {
    line?.to({
        points: [x1, y1, x2, y2],
        duration: 0.7,
    });
}

async function draw(points, chPoints, line, polygon, btn) {
    btn.disabled = true;
    const temp = [];
    points.forEach(function (item, index, array) {
        if (!chPoints.includes(item))
            temp[temp.length] = item;
    });

    for (let i = 1; i < temp.length; i++) {
        if (temp[i].x < temp[i - 1].x) {
            let t = temp[i];
            temp[i] = temp[i - 1];
            temp[i - 1] = t;
        } else if (temp[i].x == temp[i - 1].x) {
            if (temp[i].y < temp[i - 1].y) {
                let t = temp[i];
                temp[i] = temp[i - 1];
                temp[i - 1] = t;
            }
        }

    }


    const allPoints = [...chPoints, ...temp];

    for (let index = 0; index < chPoints.length - 1; index++) {
        let i = index + 1;
        while (i < allPoints.length) {
            drawLine(allPoints[index].x, allPoints[index].y, allPoints[i].x, allPoints[i].y, line);
            await new Promise((resolve, reject) => {
                setTimeout(function () { resolve("I love You !!"); }, 1200);
            });
            i++;
        }
        polygon.to({
            points: [...getPoints(chPoints, (index + 1) % chPoints.length)],
            duration: 1,
        });
        await new Promise((resolve, reject) => {
            setTimeout(function () { resolve("I love You !!"); }, 1200);
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
    btn.disabled = false;
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