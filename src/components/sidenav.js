import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import AttachmentIcon from '@mui/icons-material/Attachment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';

import { Typography } from '@mui/material';

const Sidenav = () => {
    return(
        <Box sx={{backgroundColor: "#222222",
            '&:hover': { backgroundColor: "#222222", opacity: [0.9, 0.9, 0.9], },
            color:"#ffffff", backgroundSize: 'cover', backgroundPosition: 'center', my: 2, ml:1,
            height: 460, width: 300, maxHeight: { xs: 460, md: 400 }, maxWidth: { xs: 350, md: 300 },
            borderRadius: '9px'}}
        >
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <IconButton color="inherit"><AttachmentIcon/></IconButton>
                <Typography display="inline">ACESSOS RÁPIDOS</Typography>
            </Grid>
            <Divider  sx={{ bgcolor: "#ffffff" }} variant="middle"/>

            <Grid container justifyContent="center">
                <Box sx={{backgroundColor: "#ffffff", color:"darkred", backgroundSize: 'cover', 
                backgroundPosition: 'center', my: 2, ml:1, height: 200, width: 200, maxHeight: { xs: 460, md: 200 },
                maxWidth: { xs: 350, md: 200 }}}
                >
                    <Typography display="inline">SEDE ELECTRÓNICA</Typography>
                </Box>
            </Grid>
        </Box>
    );
}

export default Sidenav;