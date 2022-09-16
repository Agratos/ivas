import { Button } from '@mui/material';
import { serviceProperties } from 'assets/properties/serviceProperties';

const LoginMenuButton = ({ type, clickEvent }) => (
    <Button
        color={type === 1 ? 'pink' : type === 2 ? 'deepPurple' : 'primary'}
        variant="contained"
        size="large"
        sx={{ fontSize: '16px', fontWeight: 'bold' }}
        onClick={clickEvent}
    >
        {serviceProperties.main[type]}
    </Button>
);

export default LoginMenuButton;