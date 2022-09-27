const createData = ( id, cmState, vaState1, vaState2, vaState3, cpu, mem, storage, gpu, stream ) => {
    return { id, cmState, vaState1, vaState2, vaState3, cpu, mem, storage, gpu, stream };
};

export const usageList = [
    createData('jjjj', 0, 0, 0, 0, 1),
    createData('admin', 0, 0, 1, '', 2),
    createData('test_tmp', 1, 1, '', '', 1),
    createData('test', 0, 0, 1, 1, 1),
    createData('asdff', 1, 0, 0, 0, 2),
    createData('bbbsd', 1, 0, '', '', 3),
    createData('jjhn', 0, 0, '', '', 3),
    createData('hjjan', 0, 0, 0, 0, 2),
    createData('jjkk', 1, 0, 0, 0, 1),
    createData('khne', 0, 0, 0, 0, 1),
];

export const usageInfo = {
    CM:[
        {
            status: 0,
            description: '',
            cpu: 45,
            gpu: 27,
            mem: 30,
            network: 20,
            disk: 32,
            tps: 14,
        }
    ],
    VA:[
        {
            status: 0,
            description: '',
            cpu: 38,
            gpu: 20,
            mem: 30,
            network: 25,
            disk: 30,
            tps: 52,
        },{
            status: 1,
            description: 'CPU 사용량 높음',
            cpu: 70,
            gpu: 25,
            mem: 30,
            network: 45,
            disk: 38,
            tps: 15,
        }
    ],
};