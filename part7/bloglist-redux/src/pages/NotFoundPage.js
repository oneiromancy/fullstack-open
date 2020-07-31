import React from 'react';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';

const NotFoundPage = () => {
    const styles = {
        primaryHeading: {
            fontSize: '7rem',
        },
        secondaryHeading: {
            fontSize: '4rem',
            marginTop: '1rem',
        },
    };

    return (
        <MuiBox mt={10} display="flex" justifyContent="center">
            <MuiBox display="flex" flexDirection="column" alignItems="center">
                <MuiTypography variant="h2" style={styles.primaryHeading}>
                    <span role="img" aria-label="bug emoji">
                        &#128027;
                    </span>{' '}
                    404
                </MuiTypography>
                <MuiTypography variant="h3" style={styles.secondaryHeading}>
                    Page Not Found
                </MuiTypography>
            </MuiBox>
        </MuiBox>
    );
};

export default NotFoundPage;
