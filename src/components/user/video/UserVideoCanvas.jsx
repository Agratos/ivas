import React, { useState, useEffect, useRef } from 'react';

import { cyan, indigo, yellow } from '@mui/material/colors';

const UserVideoCanvas = ({width, height, type}) => {
    const canvasRef = useRef();
    const [ctx, setCtx] = useState();

    const [startPosition, setStartPosition] = useState([]);
    const [isDraw, setIsDraw] = useState(false);

    const [areaPosition, setAreaPosition] = useState([]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        setCtx(canvas.getContext('2d'));
    },[])

    const hanldeType = (type) => {
        ctx.lineWidth = 2.5;

        switch(type){
            case 1:
                ctx.strokeStyle = yellow[500];
                break;
            case 2:
                ctx.strokeStyle = indigo[800];
                break;
            default:
                ctx.strokeStyle = cyan.A200;
        }
    }

    const drawAll = () => {
        areaPosition.map((area) => {
            hanldeType(area.type)
            switch(area.type){
                case 3:
                    ctx.beginPath();
                    ctx.moveTo(area.x1, area.y1)
                    ctx.lineTo(area.x2, area.y2)
                    ctx.closePath();
                    ctx.stroke();
                    break;
                default:
                    ctx.strokeRect(area.x1, area.y1, area.x2, area.y2);
            }
        })
    }

    const drawStart = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent;

        setIsDraw(true);
        setStartPosition([offsetX, offsetY])
    }

    const drawEnd = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent;
        let result;

        switch(type){
            case 3:
                result = [
                    startPosition[0], 
                    startPosition[1],
                    offsetX,
                    offsetY
                ]
                break;
            default:
                result = [
                    startPosition[0], 
                    startPosition[1],
                    offsetX - startPosition[0], 
                    offsetY - startPosition[1]
                ]
        }

        setAreaPosition([
            ...areaPosition,
            {
                type,
                x1: result[0],
                y1: result[1],
                x2: result[2],
                y2: result[3],
            }
            
        ])

        setIsDraw(false);
    }

 

    const drawArea = ({nativeEvent}) => {
        if(!isDraw) return;

        const { offsetX, offsetY } = nativeEvent;

        hanldeType(type);
        switch(type){
            case 3:
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.beginPath();
                ctx.moveTo(startPosition[0], startPosition[1])
                ctx.lineTo(offsetX, offsetY)
                ctx.closePath();
                ctx.stroke();
                break;
            default:
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.strokeRect(
                    startPosition[0], 
                    startPosition[1], 
                    offsetX - startPosition[0], 
                    offsetY - startPosition[1]
                );
        }

        drawAll();
    }



    return (
        <canvas
            ref={canvasRef}
            onMouseDown={drawStart}
            onMouseMove={drawArea}
            onMouseUp={drawEnd}
        />
    )
}

export default React.memo(UserVideoCanvas);