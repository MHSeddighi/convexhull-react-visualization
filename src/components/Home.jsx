import React from 'react';
import video from './../video/Particles - 27669.mp4';
import { useState } from 'react';
import { useRef } from 'react';

function Home() {
    const [state, setState] = useState(0);

    function addElement(event) {
        event.preventDefault();
        const elment = "<div class='d-flex point-input'><input type='number' placeholder='X' name='x' step='1' min='0' max=200' required/><input type='number' placeholder='Y' name='y' step='1' min='0' max='200' /></div>";
        const points = document.querySelector('.points');
        points.insertAdjacentHTML('beforeend', elment);
    }

    return (
        <>
            <video muted loop autoPlay id="myVideo">
                <source src={video} type="video/mp4" />
            </video>


            <div className="container p-absolute">
                <div className='d-flex justify-content-around w-100vw flex-wrap align-items-center' style={{ padding: "40px 20px 40px 20px" }}>
                    <div class="title">
                        CONVEX<br />
                        HULL
                    </div>

                    <form action="/canvas" method='get'>
                        <div class="container__item">
                            <div className='d-flex justify-content-between gap-100 h-70vh'>
                                <button className='add-btn' onClick={addElement}>
                                    <svg height="45px" width="45px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 292.377 292.377" xmlSpace="preserve" fill="#fff" color="#fff">
                                        <g>
                                            <path fill="currentColor" d="M146.188,0C65.576,0,0,65.582,0,146.188s65.576,146.188,146.188,146.188
                                        s146.188-65.582,146.188-146.188S226.801,0,146.188,0z M194.962,152.155h-42.806v42.8c0,3.3-2.667,5.967-5.967,5.967
                                        c-3.3,0-5.967-2.667-5.967-5.967v-42.8H97.415c-3.294,0-5.967-2.673-5.967-5.967s2.673-5.967,5.967-5.967h42.806V97.415
                                        c0-3.294,2.667-5.967,5.967-5.967c3.3,0,5.967,2.673,5.967,5.967v42.806h42.806c3.3,0,5.967,2.673,5.967,5.967
                                        S198.261,152.155,194.962,152.155z"/>
                                        </g>
                                    </svg>
                                </button>
                                <div className='points'>
                                    <div className='d-flex point-input'>
                                        <input type="number" placeholder='X' name="x" step="1" min="0" max="200" required />
                                        <input type="number" placeholder='Y' name="y" step="1" min="0" max="200" required />
                                    </div>
                                    <div className='d-flex point-input'>
                                        <input type="number" placeholder='X' name="x" step="1" min="0" max="200" required />
                                        <input type="number" placeholder='Y' name="y" step="1" min="0" max="200" required />
                                    </div>
                                    <div className='d-flex point-input'>
                                        <input type="number" placeholder='X' name="x" step="1" min="0" max="200" required />
                                        <input type="number" placeholder='Y' name="y" step="1" min="0" max="200" required />
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn--primary w-100'>RUN</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Home;