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

const Telefonos = ({pageChange}) => {
    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{width:"100%", maxHeight: 3, mb:3}}><Grid container spacing={0} direction="row">
                <Typography component="h2" variant="body2" >
                <Link color="#4a4948" href="#" onClick={() => pageChange("inicio")} underline="none">
                    Inicio / 
                </Link>
                </Typography>
                <Typography component="h2" variant="body2" sx={{ml:0.5}}>Teléfonos de interés del municipio</Typography>
            </Grid></Box>

            <Grid container rowSpacing={2} direction="row" alignItems="center" sx={{ml:2, mb:3, mt:1.5}}>
                <Grid item xs={0.5} />
                <Grid item xs={4} align="right">
                <Card sx={{ display: 'flex', maxWidth: 600 , border:1, borderColor: 'black', borderRadius: '9px'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Ayuntamiento
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <Chip icon={<PhoneIcon />} size="small" label="987 592 071" variant="outlined" sx={{mb:1}}/>
                            <Chip icon={<PlaceIcon />} size="small"
                            label="Plaza Mayor, 1. Carrocera" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container spacing={0} direction="column" justifyContent="center">
                        <CardMedia sx={{maxHeight:110}}  component="img" image="/escudo.png" />
                    </Grid>
                </Card>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5} align="left">
                <Card sx={{ display: 'flex', maxWidth: 600, border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Centro de salud
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <Chip icon={<PhoneIcon />} size="small" label="987 581 373" variant="outlined" sx={{mb:1}}/>
                            <Chip icon={<PlaceIcon />} size="small"
                            label="Av. la Magdalena, 4. La Magdalena" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia sx={{maxWidth:110, maxHeight:110}} component="img" image="/sacyl.png" />
                    </Grid>
                </Card>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4.5} align="right">
                <Card sx={{ display: 'flex', maxWidth: 600, border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Farmacia
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <Chip icon={<PhoneIcon />} size="small" label="987 581 126" variant="outlined" sx={{mb:1}}/>
                            <Chip icon={<PlaceIcon />} size="small"
                            label="LE-420, 2. La Magdalena" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia component="img" image="/farmacia.png" />
                    </Grid>
                </Card>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5.5} align="left">
                <Card sx={{ display: 'flex', maxWidth: 600, border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Guardia Civil
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <Chip icon={<PhoneIcon />} size="small" label="987 581 017" variant="outlined" sx={{mb:1}}/>
                            <Chip icon={<PlaceIcon />} size="small"
                            label="Av. Florentino Agustin Diez, 2007. La Magdalena" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia sx={{maxWidth:75, maxHeight:110}} component="img" image="/guardiacivil.png" />
                    </Grid>
                </Card>
                </Grid>

                <Grid item xs={0.5} />
                <Grid item xs={4.5} align="right">
                <Card sx={{ display: 'flex', maxWidth: 600, border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h5" component="div">
                            Cuatro valles
                        </Typography>
                        <Typography gutterBottom color="#4a4948" variant="subtitle1" component="div">
                            Grupo de acción local
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <Chip icon={<PhoneIcon />} size="small" label="987 581 666" variant="outlined" sx={{mb:1}}/>
                            <Chip icon={<PlaceIcon />} size="small"
                            label="Av. Manocho nº 92. Canales" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia component="img" image="/4valles_perfil.png" />
                    </Grid>
                </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Telefonos;