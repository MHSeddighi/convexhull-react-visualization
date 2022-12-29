// function drawPolygon(points, chPoints, unitX, unitY, size) {
//     const list = [];
//     for (let point = 0; point < size - 1; point++) {
//         list.push(
//             <Line
//                 points={[chPoints[point].x * unitX, chPoints[point].y * unitY, chPoints[point + 1].x * unitX, chPoints[point + 1].y * unitY]}
//                 tension={0.5}
//                 closed
//                 stroke="black"
//                 strokeWidth="3"
//                 opacity="0.7"
//             />
//         );
//     }
//     list.push(
//         <Line
//             points={[chPoints[size - 1].x * unitX, chPoints[size - 1].y * unitY, chPoints[0].x * unitX, chPoints[0].y * unitY]}
//             tension={0.5}
//             closed
//             stroke="black"
//             strokeWidth="3"
//             opacity="0.7"
//         />
//     );
//     return list;
// }
