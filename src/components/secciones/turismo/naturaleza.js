import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

import Divider from '@mui/material/Divider';
import MuiToggleButton from '@mui/material/ToggleButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ChurchIcon from '@mui/icons-material/Church';
import HikingIcon from '@mui/icons-material/Hiking';
import CastleIcon from '@mui/icons-material/Castle';

import { Casona } from '../pueblos/benllera';
import { Monasterio } from '../pueblos/otero';
import { Calderones } from '../pueblos/piedrasecha';


const ToggleButton = styled(MuiToggleButton)({
    color: "black",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "black",
      backgroundColor: '#e66407'
    }
});

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const ButtonHover = styled(Button)({
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
    }
});

const Button2 = styled(Button)({
    backgroundColor: '#13AF1A',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    fontFamily: [
        'BlinkMacSystemFont',
    ].join(','),
});

const Naturaleza = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };
    const buttonProps2 = {
        orientation: mobileScreen ? "vertical" : "horizontal",
    };

    const [actual, setActual] = React.useState();

    const changeState = (nuevo) => {
        if(nuevo==="cald"){setActual(Calderones);};
        if(nuevo==="mon"){setActual(Monasterio);};
        if(nuevo==="cas"){setActual(Casona);};
    }

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <ThemeProvider theme={darkTheme}>
                <Grid container spacing={2} sx={{my:2}} direction="row" alignItems="center" justifyContent="center" align="center">
                    <Grid item >
                        <Button2 onClick={() => changeState("cald")} variant="contained" startIcon={<HikingIcon />}>
                            Los Calderones
                        </Button2>
                    </Grid>
                    <Grid item>
                        <Button2 onClick={() => changeState("mon")}variant="contained" startIcon={<ChurchIcon />}>
                            Monasterio de Santa María
                        </Button2>
                    </Grid>
                    <Grid item>
                        <Button2 onClick={() => changeState("cas")} variant="contained" startIcon={<CastleIcon />}>
                            La Casona de la Señorita
                        </Button2>
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={{my:2}}>
                    {actual}
                </Grid>
            </ThemeProvider>
        </Box>
    );
}

export default Naturaleza;