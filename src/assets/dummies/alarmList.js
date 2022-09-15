const createData = (id, startDate, description, termination, endDate) => {
    return {
        id,
        startDate,
        description,
        termination,
        endDate
    };
}

const alarmList = [
    createData(
        1,
        '2021-11-15 21:34:56',
        'CPU 사용량 높음',
        0,
        '2021-11-15 21:35:00',
    ),
    createData(
        2,
        '2021-11-16 19:32:51',
        'Memory 사용량 높음',
        1,
        '2021-11-16 19:40:00',
    ),
    createData(3, '2021-11-16 21:14:16', 'Memory 사용량 높음', 0, '-'),
    createData(
        4,
        '2021-11-17 07:34:56',
        'Disk 사용량 높음',
        0,
        '2021-11-17 12:10:12',
    ),
    createData(
        5,
        '2021-11-17 11:34:56',
        'GPU 사용량 높음',
        1,
        '2021-11-17 10:18:00',
    ),
    createData(6, '2021-11-18 12:34:56', 'CPU 사용량 높음', 0, '-'),
    createData(7, '2021-11-19 19:34:56', 'CPU 사용량 높음', 2, '-'),
];

export default alarmList;