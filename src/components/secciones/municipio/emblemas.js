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
import CardMedia from '@mui/material/CardMedia';
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

const Emblemas = ({pageChange}) => {
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
            <Grid container direction="row" justifyContent="center" alignItems="center">
            <Card sx={{ display: 'flex', maxWidth: "90%", m:2}}>
                <Grid sx={{display: { xs: 'none', md: 'flex' }, maxWidth:"30%"}} container spacing={0} direction="column" justifyContent="center">
                    <CardMedia
                        component="img"
                        image="/escudo2.png"
                        alt="green iguana"
                        onClick={() => handleClickOpen("/escudo2.png")}
                    />
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}> 
                <CardContent>
                    <CardMedia sx={{display: { xs: 'flex', md: 'none' }, mb:2}}
                        component="img"
                        image="/escudo2.png"
                        alt="green iguana"
                        onClick={() => handleClickOpen("/escudo2.png")}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                    <Box sx={{ fontWeight: 'bold'}}>Escudo</Box>
                    </Typography>
                    <Typography variant="body1">
                    Escudo medio partido y cortado encajado de dos encajes.<br/><br/>
                    1º. De plata, mazo y martillo de sable, puestos en sotuer.<br/>
                    2º. De gules, siete roeles de plata, puestos en dos palos de a tres y uno en punta.<br/>
                    3º. De sinople, Monasterio de plata.<br/><br/>
                    Al timbre, Corona Real cerrada.
                    </Typography>
                </CardContent>
                </Box>
            </Card>
            </Grid>

            <Grid container direction="row" justifyContent="center" alignItems="center">
            <Card sx={{ display: 'flex', maxWidth: "90%", m:2}}>
                <Grid container sx={{display: { xs: 'none', md: 'flex' }, maxWidth:"30%"}} spacing={0} direction="column" justifyContent="center">
                    <CardMedia
                        component="img"
                        image="/bandera.png"
                        alt="green iguana"
                        onClick={() => handleClickOpen("/bandera.png")}
                    />
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}> 
                <CardContent>
                    <CardMedia sx={{display: { xs: 'flex', md: 'none' }, mb:2}}
                        component="img"
                        image="/bandera.png"
                        alt="green iguana"
                        onClick={() => handleClickOpen("/bandera.png")}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                    <Box sx={{ fontWeight: 'bold'}}>Bandera</Box>
                    </Typography>
                    <Typography variant="body1">
                    Bandera rectangular de proporciones 2:3, dividida horizontalmente en dos partes iguales, encajadas de siete encajes, siendo blanca la superior y verde la inferior.
                    </Typography>
                    </CardContent>
                </Box>
            </Card>
            </Grid>

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

export default Emblemas;