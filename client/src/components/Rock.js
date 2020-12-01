import React from "react";
const Rock = ({ x, y, z, size, color, dt }) => (
    <div className="dot moving" style={{
        height:`${Math.round(size)}px`,
        width:`${Math.round(size)}px`,
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
        zIndex: `${Math.round(1000 * z)}`,
        backgroundColor: `${color}`,
        transitionDuration: `${dt / 1000}s`,
        }}>
    </div>
)
export default Rock;
