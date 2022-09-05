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
import {alpha,styled} from '@mui/material/styles';

const SmallChip = styled(Chip)(({ theme }) => ({
    '& .MuiChip-label': {
        fontSize:12
    },
}));

const Corporacion = ({pageChange}) => {
    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center'}}>
            <Card sx={{display:"flex", m:1, width:"87%", border:1, borderColor: 'black', borderRadius: '9px'}}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                <CardContent>
                    <CardMedia sx={{maxHeight:150}} component="img" image="/images/psoe.png"/>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={3} align="left">
                            <Typography display="inline" sx={{fontSize:13,mr:1,color:'red'}}>Alcalde</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={8.5} align="left">
                            <SmallChip label="Luciano Yanutolo Suárez" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={3} align="left">
                            <Typography display="inline" sx={{fontSize:12,mr:1,color:'red'}}>1ª Teniente de Alcalde</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={8.5} align="left">
                            <SmallChip label="Beatriz Rascón de la Hoz" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={3} align="left">
                            <Typography display="inline" sx={{fontSize:12,mr:1,color:'red'}}>2º Teniente de Alcalde</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={8.5} align="left">
                            <SmallChip label="Carlos Alonso de la Hoz" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={3} align="left">
                            <Typography display="inline" sx={{fontSize:13,mr:1,color:'red'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={8.5} align="left">
                            <SmallChip label="Cristina Beatriz Perandones" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={3} align="left">
                            <Typography display="inline" sx={{fontSize:13,mr:1,color:'red'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={8.5} align="left">
                            <SmallChip label="Manuel Morán González" variant="outlined" />
                        </Grid>
                    </Grid>
                </CardContent>
                </Grid>
            </Card>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center'}}>
            <Card sx={{display:"flex", m:1, width:"75%", border:1, borderColor: 'black', borderRadius: '9px'}}>
                <Grid container sx={{maxWidth:"35%", mr:2}}spacing={0} direction="column" justifyContent="center">
                    <CardMedia  component="img" image="/images/psoe.png"/>
                </Grid>
                <Box sx={{ width:"65%", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>Alcalde</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip label="Luciano Yanutolo Suárez" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>1ª Teniente de Alcalde</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip label="Beatriz Rascón de la Hoz" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>2º Teniente de Alcalde</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip label="Carlos Alonso de la Hoz" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'red'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip label="Cristina Beatriz Perandones Viñayo" variant="outlined" />
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

            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center'}}>
            <Card sx={{display:"flex", m:1, width:"87%", border:1, borderColor: 'black', borderRadius: '9px'}}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                <CardContent>
                    <CardMedia sx={{maxHeight:200}} component="img" image="/images/pp.png"/>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={2} align="left" >
                            <Typography display="inline" sx={{fontSize:12,mr:2,color:'blue'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={9.5} align="right">
                            <SmallChip label="Juan A. Fernández Gutiérrez" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={2} align="left">
                            <Typography display="inline" sx={{fontSize:12,mr:2,color:'blue'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={0.5} />
                        <Grid item xs={9.5} align="right">
                            <SmallChip label="Germán Carreño Álvarez" variant="outlined" />
                        </Grid>
                    </Grid>
                </CardContent>
                </Grid>
            </Card>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mb:4 }}>
            <Card sx={{display:"flex", m:1, width:"75%", border:1, borderColor: 'black', borderRadius: '9px'}}>
                <Grid container sx={{maxWidth:"35%", mr:2}}spacing={0} direction="column" justifyContent="center">
                    <CardMedia sx={{width:"70%"}} component="img" image="/images/pp.png"/>
                </Grid>
                <Box sx={{ width:"65%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'blue'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip  label="Juan Antonio Fernández Gutiérrez" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{mb:1}} direction="row" alignItems="center">
                        <Grid item xs={5} align="right">
                            <Typography display="inline" sx={{mr:1,color:'blue'}}>Concejal</Typography>
                        </Grid>
                        <Grid item xs={7} align="left">
                            <Chip label="Germán Carreño Álvarez" variant="outlined" />
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