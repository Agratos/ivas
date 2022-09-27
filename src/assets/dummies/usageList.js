const createData = ( id, cmState, vaState1, vaState2, vaState3, cpu, mem, storage, gpu, stream ) => {
    return { id, cmState, vaState1, vaState2, vaState3, cpu, mem, storage, gpu, stream };
};

const usageList = [
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

export default usageList;