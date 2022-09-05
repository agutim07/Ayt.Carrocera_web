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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SpeedDial from '@mui/material/SpeedDial';
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
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const Estadisticas = ({pageChange}) => {
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState("");
    const handleClickOpen = (imagen) => {
        setImage(imagen);
        setOpen(true);
    };
    const handleClose = () => {setOpen(false);};

    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('sm'));
    const isSM = useMediaQuery(theme.breakpoints.down('md'));

    function getSize() {
        if(isXS){return "50vh";}
        if(isSM){return "75vh";}
        return "100vh";
    }

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container sx={{my:1}} spacing={0.5} direction="row" justifyContent="center">
            <Card sx={{maxWidth: {xs:"90%",sm:"80%",md:"70%"}, m:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Box sx={{ fontWeight: 'bold'}}>Evolución de la población de 1900 a 2020</Box>
                    </Typography> 
                </CardContent>
                <CardMedia
                    component="img"
                    image="/images/grafico_poblacion.png"
                    alt="green iguana"
                    onClick={() => handleClickOpen("/images/grafico_poblacion.png")}
                />
            </Card>  
            </Grid>

            <Grid container sx={{my:1}} spacing={0.5} direction="row" justifyContent="center">
            <Card sx={{maxWidth: {xs:"90%",sm:"80%",md:"70%"}, m:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Box sx={{ fontWeight: 'bold'}}>Población por localidades</Box>
                    </Typography> 
                </CardContent>
                <CardMedia
                    component="img"
                    image="/images/grafico_poblacion2.png"
                    alt="green iguana"
                    onClick={() => handleClickOpen("/images/grafico_poblacion2.png")}
                />
            </Card>  
            </Grid>

            <Grid container sx={{my:1}} spacing={0.5} direction="row" justifyContent="center">
            <Card sx={{maxWidth: {xs:"90%",sm:"80%",md:"70%"}, m:2}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Box sx={{ fontWeight: 'bold'}}>Población por edad y sexo</Box>
                    </Typography> 
                </CardContent>
                <CardMedia
                    component="img"
                    image="/images/grafico_poblacion3.png"
                    alt="green iguana"
                    onClick={() => handleClickOpen("/images/grafico_poblacion3.png")}
                />
            </Card>  
            </Grid>

            <Dialog fullWidth={true} maxWidth="xl" open={open} onClose={handleClose}>
                <DialogTitle>Visor de imágenes</DialogTitle>
                <DialogContent>
                    <Grid container spacing={0} direction="column" alignItems="center"justifyContent="center">
                    <Box component="img" height={getSize()} display="flex" flexDirection="column" src={image}/>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Estadisticas;