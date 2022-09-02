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
import CloseIcon from '@mui/icons-material/Cancel';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const Datosmun = ({pageChange}) => {
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenAlert(false);
    };
    const handleOpenAlert = (event, reason) => {setOpenAlert(true);};

    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState("");
    const handleClickOpen = (imagen) => {
        setImage(imagen);
        setOpen(true);
    };
    const handleClose = () => {setOpen(false);};

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container sx={{my:1}} spacing={0.5} direction="row" justifyContent="center">
            <Grid item xs={12} md={6} align="center">
            <Box
                component="img"
                onClick={() => handleClickOpen("/datosmun_1.png")}
                sx={{backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover', backgroundPosition: 'center', maxWidth:"90%"}}
                alt="Galería."
                src="/datosmun_1.png"
            />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={0} direction="column" justifyContent="center">
                <Grid container direction="column" spacing={0} justifyContent="center" alignItems="center">
                <ThemeProvider theme={darkTheme}>
                <Paper elevation={12} sx={{color:"#44CBFE", width: "70%", margin:1, 
                padding:1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black" }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={5.5} align="center">
                            <Typography display="inline" sx={{mr:1}}>Comarca</Typography>
                            </Grid>
                            <Grid item xs={6} align="left">
                            <Chip label="Luna" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{my:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={5.5} align="center">
                            <Typography display="inline" sx={{mr:1}}>Población</Typography>
                            </Grid>
                            <Grid item xs={6} align="left">
                            <Chip onClick={() => handleOpenAlert()} label="470" variant="outlined" icon={<InfoOutlinedIcon />} clickable />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{mb:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={5.5} align="center">
                            <Typography display="inline" >Altitud</Typography>
                            </Grid>
                            <Grid item xs={6} align="left">
                            <Chip label="1055 m" variant="outlined" /> 
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{mb:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={5.5} align="center">
                            <Typography display="inline" >Superficie</Typography>
                            </Grid>
                            <Grid item xs={6} align="left">
                            <Chip label="65.98 km²" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                </ThemeProvider>
                </Grid>
                <Grid container direction="column" spacing={0} justifyContent="center" alignItems="center">
                <ThemeProvider theme={darkTheme}>
                <Paper elevation={12} sx={{ color:"red", width: "70%", margin:1, 
                padding:1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black", mt: 1.5 }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                        <Grid container spacing={0.5} sx={{borderRadius: '16px', border: "0.5px solid white", width:"95%", mb:1}} direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={4} align="center">
                            <Typography display="inline" sx={{mr:1}}>Capital</Typography>
                            </Grid>
                            <Grid item xs={7.5} align="left">
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Chip sx={{mb:1}} label="Carrocera" variant="outlined" />
                            </Grid> 
                            </Grid>
                        </Grid>
                        <Grid container spacing={0.5} sx={{display: { xs: 'none', sm: 'flex' }, borderRadius: '16px',border: "0.5px solid white", width:"95%", mb:1}} direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={4} align="center">
                            <Typography display="inline" sx={{mr:1}}>Coordenadas</Typography>
                            </Grid>
                            <Grid item xs={7.5} align="left">
                                <Grid container direction="column" justifyContent="center" alignItems="center">
                                    <Chip sx={{mb:0.5}} label="Longitud: 42º 47' 45'' N" variant="outlined" />
                                    <Chip sx={{mb:1}} label="Latitud: 5º 44' 35'' O" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0.5} sx={{display: { xs: 'flex', sm: 'none' }, borderRadius: '16px',border: "0.5px solid white", width:"95%", mb:1}} direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={2} align="center">
                            <Typography display="inline" sx={{mr:1}}>Coor.</Typography>
                            </Grid>
                            <Grid item xs={9.5} align="left">
                                <Grid container direction="column" justifyContent="center" alignItems="center">
                                    <Chip sx={{mb:0.5}} label="Longitud: 42º 47' 45'' N" variant="outlined" />
                                    <Chip sx={{mb:1}} label="Latitud: 5º 44' 35'' O" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0.5} sx={{borderRadius: '16px',border: "0.5px solid white", width:"95%", mb:1}} direction="row" alignItems="center" >
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={4} align="center">
                            <Typography display="inline" >Distancias</Typography>
                            </Grid>
                            <Grid item xs={7.5} align="left">
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Chip sx={{mb:0.5}} label="León: 30km" variant="outlined" />
                                <Chip sx={{mb:0.5}} label="Valladolid: 178km" variant="outlined" />
                                <Chip sx={{mb:0.5}} label="Madrid: 373km" variant="outlined" />
                                <Chip sx={{mb:1}} label="Bruselas: 1546km" variant="outlined" /> 
                            </Grid> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                </ThemeProvider>
                </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Grid container spacing={0} direction="column" alignItems="center"justifyContent="center">
        <Box
            component="img"
            onClick={() => handleClickOpen("/datosmun_2.png")}
            sx={{backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover', backgroundPosition: 'center', maxWidth:"60%", my:3}}
            alt="Galería."
            src="/datosmun_2.png"
        />
        </Grid>

        <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="info">
                Datos del padrón municipal a 11/08/2022
            </Alert>
        </Snackbar>

        <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose}>
            <DialogTitle>Visor de imágenes</DialogTitle>
            <DialogContent>
                <Grid container spacing={0} direction="column" alignItems="center"justifyContent="center">
                <Box component="img" src={image}/>
                </Grid>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </DialogActions>
        </Dialog>
        </Box>
    );
}

export default Datosmun;