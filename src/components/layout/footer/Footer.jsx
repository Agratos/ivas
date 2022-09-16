import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@mui/styles';
import { Business } from '@mui/icons-material';
import styles from 'styles/jss/footerStyle';

const useStyles = makeStyles(styles);

const Footer = (props) => {
    const classes = useStyles();
    const { whiteFont } = props;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont,
    });

    return (
        <footer className={footerClasses}>
            <div className={classes.container}>
                <div className={classes.right}>
                    &copy; {1900 + new Date().getYear()} ,
                    <Business className={classes.icon} />
                    {' '}
                    <a
                        href="http://www.pointi.com/"
                        className={aClasses}
                        target="_blank"
                        rel="noreferrer"
                    >
                        POINTI
                    </a>
                    {' '}
                    All rights reserved.
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    whiteFont: PropTypes.bool,
};

export default Footer;


