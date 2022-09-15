import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/** 
 * 경로 표시 컴포넌트 props로는 upper, current
 */
const PathBox = ({ upper, current }) => {
  let navigate = useNavigate();
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mt: 3 }}
    >
      <Link underline="hover" key="1" color="inherit" onClick={() => navigate('/')}>
        HOME
      </Link>
      ,
      <Typography key="2" color="inherit">
        {upper}
      </Typography>
      ,
      <Typography key="3" color="text.primary">
        {current}
      </Typography>
    </Breadcrumbs>
  );
};

export default PathBox;
