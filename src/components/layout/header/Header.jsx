import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Hidden,
    Drawer,
} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import styles from 'styles/jss/headerStyle';

const useStyles = makeStyles(styles);

const Header = (props) => {
    let navigate = useNavigate();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (props.changeColorOnScroll) {
            window.addEventListener('scroll', headerColorChange);
        }
        return function cleanup() {
            if (props.changeColorOnScroll) {
                window.removeEventListener('scroll', headerColorChange);
            }
        };
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const headerColorChange = () => {
        const { color, changeColorOnScroll } = props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName('header')[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName('header')[0]
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.body
                .getElementsByTagName('header')[0]
                .classList.add(classes[color]);
            document.body
                .getElementsByTagName('header')[0]
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    };

    const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed,
    });
    const brandComponent = (
        <Button className={classes.title} onClick={() => navigate('/')}>
            {brand}
        </Button>
    );

    return (
        <AppBar className={appBarClasses}>
            <Toolbar className={classes.container}>
                {leftLinks !== undefined ? brandComponent : null}
                    <div className={classes.flex}>
                {leftLinks !== undefined ? (
                    <Hidden smDown implementation="css">
                    {leftLinks}
                    </Hidden>
                ) : (
                    brandComponent
                )}
                </div>
                <Hidden smDown implementation="css">
                    {rightLinks}
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Hidden mdUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor={'right'}
                    open={mobileOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={handleDrawerToggle}
                >
                    <div className={classes.appResponsive}>
                        {leftLinks}
                        {rightLinks}
                    </div>
                </Drawer>
            </Hidden>
        </AppBar>
    );
};

Header.defaultProp = {
    color: 'white',
};

Header.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'transparent',
        'white',
        'rose',
        'dark',
    ]),
    rightLinks: PropTypes.node,
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            'primary',
            'info',
            'success',
            'warning',
            'danger',
            'transparent',
            'white',
            'rose',
            'dark',
        ]).isRequired,
    }),
};

export default Header;
