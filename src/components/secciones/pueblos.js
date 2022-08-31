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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const Pueblos = () => {
    const navigate = useNavigate();

    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };

    const buttons = [
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/benllera', {replace: true})} key="one">Benllera</Button>,
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/carrocera', {replace: true})}key="two">Carrocera</Button>,
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/cuevas', {replace: true})}key="three">Cuevas de Viñayo</Button>,
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/otero', {replace: true})}key="four">Otero de las Dueñas</Button>,
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/piedrasecha', {replace: true})}key="five">Piedrasecha</Button>,
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/santiago', {replace: true})}key="six">Santiago de las Villas</Button>,
        <Button sx={{fontWeight: "bold"}} onClick={() => navigate('/pueblos/vinayo', {replace: true})}key="seven">Viñayo</Button>
    ];

    return(
        <ThemeProvider theme={theme}>
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container sx={{my:1}} spacing={0.5} direction="row" justifyContent="center" justify="center">
            <Grid item xs={12} md={6} align="center">
            <Box
                component="img"
                sx={{backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover', backgroundPosition: 'center', maxWidth:"90%"}}
                alt="Galería."
                src="/datosmun_1.png"
            />
            </Grid>
            <Grid item xs={12} md={6} align="center" sx={{mt:3}}>
                <Paper elevation={12} direction="column" justifyContent="center" sx={{verticalAlign:'middle',width: "70%", margin:1, padding:1, my: 0.5}}>
                        <ButtonGroup {...buttonProps} color='primary' orientation="vertical" variant="text">
                            {buttons}
                        </ButtonGroup>
                </Paper>
            </Grid>
        </Grid>
        </Box>
        </ThemeProvider>
    );
}

export default Pueblos;