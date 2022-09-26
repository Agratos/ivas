import React, { useState, useEffect, useRef } from 'react';

const UserVideoCanvas = ({width, height}) => {
    const canvasRef = useRef();
    const [ctx, setCtx] = useState();

    const [pos, setPos] = useState([]);
    const [isDraw, setIsDraw] = useState(false);
    const [square, setSquare] = useState([]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        setCtx(canvas.getContext('2d'));
    },[])

    const drawStart = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent;

        setIsDraw(true);
        setPos([offsetX, offsetY])
    }

    const drawEnd = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent;
        const resultPos = [pos[0], pos[1], offsetX - pos[0], offsetY - pos[1]];
        setSquare([
            ...square,
            resultPos
        ])
        setIsDraw(false);
    }

    const drawSquare = ({nativeEvent}) => {
        if(!isDraw) return;

        const { offsetX, offsetY } = nativeEvent;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = "red";
        ctx.strokeRect(pos[0], pos[1], offsetX - pos[0], offsetY - pos[1]);
        square.map((position) => {
            ctx.strokeRect(position[0], position[1], position[2], position[3]);
        })
    }

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={drawStart}
            onMouseMove={drawSquare}
            onMouseUp={drawEnd}
        />
    )
}

export default UserVideoCanvas;