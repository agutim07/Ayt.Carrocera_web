import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contacto = () => {
    const handleLocationClick = () => {
        window.open("https://goo.gl/maps/Bwou32hWBzDq7ib9A", '_blank', 'noopener,noreferrer');
    };
    

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3}}>
                <Typography display="inline"><Box sx={{ mt:2, fontSize:20, fontWeight: 'bold'}}>INFORMACIÓN DE CONTACTO</Box></Typography>
                <Divider sx={{ width:'40%', bgcolor: "#424242", my:0.5 }} variant="middle"/>
                <Typography display="inline">Puede dirigirse al ayuntamiento mediante los siguientes métodos de contacto:</Typography>
                <Paper elevation={12} sx={{ backgroundColor: "#ffffff", color:"darkred", width: "60%", margin:1, 
                padding:1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black" }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" sx={{mr:1}}>Dirección</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip onClick={handleLocationClick} icon={<PlaceIcon />} 
                            label="Plaza Mayor, 1. Carrocera - León (España). C.P.: 24123" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{my:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" sx={{mr:1}}>Teléfono</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip icon={<PhoneIcon />} label="987 592 071" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{mb:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" >Correo electrónico</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip icon={<EmailIcon />} label="info@aytocarrocera.es" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3}}>
                <Typography display="inline"><Box sx={{ color:"#e53935", mt:2, fontSize:20, fontWeight: 'bold'}}>FORMULARIO DE CONTACTO</Box></Typography>
                <Divider sx={{ width:'40%', bgcolor: "#424242", my:0.5 }} variant="middle"/>
                <Typography display="inline" align="center" sx={{width: "60%"}}>Para cualquier consulta puede ponerse en contacto mediante el siguiente formulario indicándonos una dirección de correo electrónico a la que poder responderle.</Typography>
                <Paper elevation={12} sx={{ backgroundColor: "#ffffff", color:"#e53935", width: "60%", margin:1, 
                padding:1, my: 0.5, border: "1px solid #e53935", boxShadow: "3px 3px 3px #e53935" }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" sx={{mr:1}}>Dirección</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip onClick={handleLocationClick} icon={<PlaceIcon />} 
                            label="Plaza Mayor, 1. Carrocera - León (España). C.P.: 24123" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{my:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" sx={{mr:1}}>Teléfono</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip icon={<PhoneIcon />} label="987 592 071" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{mb:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" >Correo electrónico</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip icon={<EmailIcon />} label="info@aytocarrocera.es" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Box>
    );
}

export default Contacto;