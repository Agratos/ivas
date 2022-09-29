import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';

import { cyan, indigo, yellow } from '@mui/material/colors';

import userAction from 'store/actions/user';


/** type:
 *  1 - 탐지 영역 설정
 *  2 - ROI 설정
 *  3 - Line ROI 설정
 */
const UserVideoCanvas = forwardRef(({width, height, type}, ref) => {
    const canvasRef = useRef();
    const [ctx, setCtx] = useState();

    const [startPosition, setStartPosition] = useState([]);
    const [isDraw, setIsDraw] = useState(false);

    const [detectPosition, setDetectPosition] = useState([]);
    const [roiPosition, setRoiPosition] = useState([]);
    const [linePosition, setLinePosition] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        canvas.lineWidth = 2.5;
        canvas.strokeStyle = 'yellow';
        setCtx(canvas.getContext('2d'));
        drawAll();
    },[])

    useEffect(() => {
        clearArea();
        drawAll();
    },[detectPosition,roiPosition,linePosition])

    /** 부모 컴포넌트에서 사용할  함수 */
    useImperativeHandle(ref, () => ({
        clearArea,
        loadPosition,
        sendPosition
    }))

    /** 타입에 따른 색 설정 */
    const hanldeType = (type) => {
        switch(type){
            case 'detect':
                ctx.strokeStyle = yellow[500];
                break;
            case 'roi':
                ctx.strokeStyle = indigo[800];
                break;
            default:
                ctx.strokeStyle = cyan.A200;
        }
    }

    const drawAll = () => {
        detectPosition.map((position) => {
            hanldeType('detect');
            ctx.strokeRect(position[0], position[1], position[2], position[3]);
        })
        
        roiPosition.map((position) => {
            hanldeType('roi');
            ctx.strokeRect(position[0], position[1], position[2], position[3]);
        })
 
        linePosition.map((position) => {
            hanldeType('line');
            ctx.beginPath();
            ctx.moveTo(position[0], position[1])
            ctx.lineTo(position[2], position[3])
            ctx.closePath();
            ctx.stroke();
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
            case 'line':
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

        switch(type){
            case 'detect':
                setDetectPosition([
                    ...detectPosition,
                    [ result[0], result[1], result[2], result[3] ]
                ])
                break;
            case 'roi':
                setRoiPosition([
                    ...roiPosition,
                    [ result[0], result[1], result[2], result[3] ]
                ])
                break;
            case 'line':
                setLinePosition([
                    ...linePosition,
                    [ result[0], result[1], result[2], result[3] ]
                ])
                break;
            default:
                console.log('타입이 일치하는 것이 없습니다.');
        }

        setIsDraw(false);
    }

    const drawArea = ({nativeEvent}) => {
        if(!isDraw) return;

        const { offsetX, offsetY } = nativeEvent;

        hanldeType(type);
        switch(type){
            case 'line':
                clearArea();
                ctx.beginPath();
                ctx.moveTo(startPosition[0], startPosition[1])
                ctx.lineTo(offsetX, offsetY)
                ctx.closePath();
                ctx.stroke();
                break;
            default:
                clearArea();
                ctx.strokeRect(
                    startPosition[0], 
                    startPosition[1], 
                    offsetX - startPosition[0], 
                    offsetY - startPosition[1]
                );
        }

        drawAll();
    }

    /** type: all - 모두 변수도 초기화, default는 canvas만 초기화 */
    const clearArea = (type) => {
        if(type === 'all'){
            setDetectPosition([]);
            setRoiPosition([]);
            setLinePosition([]);
        }

        ctx && ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    /** data 구성 요소 detect, roi, line */
    const loadPosition = (data) => {
        setDetectPosition([data.detect]);
        setRoiPosition([data.roi]);
        setLinePosition([data.line]);
    }

    /** 반환 값 [detectPosition, roiPosition, linePosition] */
    const sendPosition = () => {
        return [detectPosition, roiPosition, linePosition];
    }

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={drawStart}
            onMouseMove={drawArea}
            onMouseUp={drawEnd}
        />
    )
});

export default React.memo(UserVideoCanvas);