import { indigo } from '@mui/material/colors';

export const headCells = [ 
    {
        id: 'id',
        label: 'ID',
        seperation: true,
    },
    {
        id: 'cmState',
        label: '# 1',
        seperation: true,
    },
    {
        id: 'vaState1',
        label: '# 1',
        seperation: false,
    },
    {
        id: 'vaState2',
        label: '# 2',
        seperation: false,
    },
    {
        id: 'vaState3',
        label: '# 3',
        seperation: true,
    },
    {
        id: '',
        label: '개별 페이지 이동',
        seperation: false,
    },
];

export const styles = {
    borderHeadCell: {
        borderRight: '1px solid',
        borderRightColor: 'white',
    },
    borderCell: {
        borderRight: '1px solid',
        borderRightColor: `${indigo[50]}`,
    },
};