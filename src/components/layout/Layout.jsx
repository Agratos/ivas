import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';

import Header from './header/Header';
import HeaderLinks from './header/HeaderLinks';
import Parallax from './container/Parallax';
import GridContainer from './container/GridContainer';
import GridItem from './container/GridItem';
import Footer from './footer/Footer';

import styles from 'styles/jss/components';

const useStyles = makeStyles(styles);

const Layout = ({ type }) => {
    const classes = useStyles();

    //console.log('Layout type : ', type);

    return (
        <Wrapper>
            <Header
                brand="IVAS"
                rightLinks={<HeaderLinks type={type} />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                height: 80,
                color: 'white',
                }}
            />
            {/* <Parallax image={require('../../../lib/images/background.jpg').default}> */}
            <Parallax image="/static/images/background.png">
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}></div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div
                    className={classes.sections}
                    style={{ backgroundColor: '#fafafa' }}
                    >
                    <div className={classes.container}>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};
const Wrapper = styled.div``;

export default Layout;
