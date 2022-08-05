import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

import {normurbanistica} from '../../../../data.js';

const Urbanistica = ({pageChange}) => {

    function links(op){
        if(op===1){window.open("http://servicios.jcyl.es/PlanPublica/searchVPubDocMuniPlai.do?bInfoPublica=S&provincia=24&municipio=040", '_blank', 'noopener,noreferrer');}
        if(op===2){window.open("http://servicios.jcyl.es/PlanPublica/searchVPubDocMuniPlau.do?bInfoPublica=N&provincia=24&municipio=040", '_blank', 'noopener,noreferrer');}
        if(op===3){window.open("http://bocyl.jcyl.es/boletines/2013/03/15/pdf/BOCYL-D-15032013-18.pdf", '_blank', 'noopener,noreferrer');}
    }

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{width:"100%", maxHeight: 3, mb:3}}><Grid container spacing={0} direction="row">
                <Typography component="h2" variant="body2" >
                <Link color="#4a4948" href="#" onClick={() => pageChange("inicio")} underline="none">
                    Inicio / 
                </Link>
                </Typography>
                <Typography component="h2" variant="body2" sx={{ml:0.5}}> Ayuntamiento / Normativa municipal / Normativa urbanística</Typography>
            </Grid></Box>

            <Grid container alignItems="center" justifyContent="center" display="flex">
            <Card sx={{ maxWidth: "80%", m:2, border:1, borderColor:'black'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    <Box sx={{ fontWeight: 'bold'}} color="#e53935">Normativa Urbanística</Box>
                    </Typography>
                    <Typography variant="body1">
                        {normurbanistica}
                    </Typography>
                </CardContent>
                <Grid container alignItems="center" justifyContent="center" >
                <Box sx={{backgroundColor: "#222222", my:2, color:"#ffffff", maxWidth: "80%"}}>
                <List>
                    <ListItem sx={{color:"#e53935", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
                        <ListItemText primary={<span style={{fontWeight: 'bold'}}>Enlaces</span>}/>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#e53935" }} variant="middle"  component="li" />
                    <ListItem sx={{display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
                        <ListItemButton onClick={() => links(1)} >
                        <ListItemText primary="Planeamiento Urbanístico en información pública"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#ffffff" }} variant="middle"  component="li" />
                    <ListItem sx={{display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}> 
                        <ListItemButton onClick={() => links(2)} >
                        <ListItemText primary="Archivo de Planeamiento Urbanístico y ordenación del territorio vigente"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ bgcolor: "#ffffff" }} variant="middle"  component="li" />
                    <ListItem sx={{display:"flex", alignItems:"center", textAlign:"center", justifyContent:"center"}}>
                        <ListItemButton onClick={() => links(3)} >
                        <ListItemText primary="Normas Urbanísticas Municipales"/>
                        </ListItemButton>
                    </ListItem>
                </List>
                </Box>
                </Grid>
            </Card>
            </Grid>
        </Box> 
    );
}

export default Urbanistica;