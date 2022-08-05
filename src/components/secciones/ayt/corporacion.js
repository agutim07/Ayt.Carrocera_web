import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';

const Corporacion = ({pageChange}) => {
    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{width:"100%", maxHeight: 3, mb:3}}><Grid container spacing={0} direction="row">
                <Typography component="h2" variant="body2" >
                <Link color="#4a4948" href="#" onClick={() => pageChange("inicio")} underline="none">
                    Inicio / 
                </Link>
                </Typography>
                <Typography component="h2" variant="body2" sx={{ml:0.5}}> Ayuntamiento / Corporación municipal</Typography>
            </Grid></Box>

            <Box sx={{ display:"flex", justifyContent: 'center'}}>
            <Card sx={{display:"flex", m:1, width:"75%", border:1, borderColor: 'black', borderRadius: '9px'}}>
                <Grid container sx={{maxWidth:"35%", mr:2}}spacing={0} direction="column" justifyContent="center">
                    <CardMedia  component="img" image="/psoe.png"/>
                </Grid>
                <Box sx={{ width:"65%", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>Alcalde</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip sx={{mb:1}} label="Luciano Yanutolo Suárez" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>1ª Teniente de Alcalde</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip sx={{mb:1}} label="Beatriz Rascón de la Hoz" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>2º Teniente de Alcalde</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip sx={{mb:1}} label="Carlos Alonso de la Hoz" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip sx={{mb:1}} label="Cristina Beatriz Perandones Viñayo" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip label="Manuel Morán González" variant="outlined" />
                        </Grid>
                    </Grid>
                </CardContent>
                </Box>
            </Card>
            </Box>

            <Box sx={{ display:"flex", justifyContent: 'center', mb:4 }}>
            <Card sx={{display:"flex", m:1, width:"75%", border:1, borderColor: 'black', borderRadius: '9px'}}>
                <Grid container sx={{maxWidth:"35%", mr:2}}spacing={0} direction="column" justifyContent="center">
                    <CardMedia sx={{width:"70%"}} component="img" image="/pp.png"/>
                </Grid>
                <Box sx={{ width:"65%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'blue'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip sx={{mb:1}} label="Juan Antonio Fernández Gutiérrez" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'blue'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip sx={{mb:1}} label="Germán Carreño Álvarez" variant="outlined" />
                        </Grid>
                    </Grid>
                </CardContent>
                </Box>
            </Card>
            </Box>
        </Box> 
    );
}

export default Corporacion;