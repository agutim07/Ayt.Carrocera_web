import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
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
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import FacebookIcon from '@mui/icons-material/Facebook';

const Benllera = ({pageChange}) => {
    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}><Box sx={{width:"100%", mb:3}}>
                <Grid container spacing={0} sx={{mt:2}} direction="row" alignItems="center" justifyContent="center">
                    <Typography sx={{color: 'orange', fontWeight: 'bold'}} variant="h3">BENLLERA</Typography>
                </Grid>
                <Grid container spacing={0.5} sx={{mt:1, height:50}} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={5} align="right" alignItems="right" justifyContent="right" alignText="right">
                    <Grid container direction="row" alignItems="right" justifyContent="right" alignText="right">
                        <PeopleIcon sx={{ mr:1, fontSize: "30px" }}/>
                        <Typography display="inline" align="right">
                            71 habitantes
                        </Typography>
                        <Divider sx={{ml:3, bgcolor:"black"}} orientation="vertical" flexItem />
                    </Grid>
                    </Grid>
                    <Grid item xs={2} align="center" alignText="center">
                    <Grid container direction="row" alignItems="center" justifyContent="center" alignText="center">
                        <PlaceIcon sx={{ mr:1, fontSize: "30px" }}/>
                        <Typography display="inline" align="center">
                            Localización
                        </Typography>
                    </Grid>
                    </Grid> 
                    <Grid item xs={5} align="left" alignText="left">
                    <Grid container direction="row" alignItems="left" justifyContent="left" alignText="left">
                        <Divider sx={{mr:3, bgcolor:"black"}} orientation="vertical" flexItem />
                        <FacebookIcon sx={{ mr:1, fontSize: "30px" }}/>
                        <Typography display="inline" align="left">
                            Facebook
                        </Typography>
                    </Grid>
                    </Grid> 
                </Grid>
            </Box>
        </Box>
    );
}

export default Benllera;