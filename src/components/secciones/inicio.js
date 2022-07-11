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

import CallIcon from '@mui/icons-material/Call';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NewspaperIcon from '@mui/icons-material/Newspaper';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} 
        aria-labelledby={`vertical-tab-${index}`} {...other}
      >
        {value === index && (
          <Box sx={{ p: 0.5 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Inicio = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Ciudadanos" {...a11yProps(0)} />
                <Tab label="Empresas" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon><CallIcon /></ListItemIcon>
                            <ListItemText primary="Teléfonos de interés" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon><SupportAgentIcon /></ListItemIcon>
                            <ListItemText primary="Atención a la ciudadania" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link rel="noopener noreferrer" target="_blank" href="https://aytocarrocera.sedelectronica.es/dossier.0" underline="none">
                        <ListItemButton>
                            <ListItemIcon><RequestPageIcon /></ListItemIcon>
                            <ListItemText sx={{color:'black'}} primary="Trámites y solicitudes" />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Perfil del contratante" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <Link rel="noopener noreferrer" target="_blank" href="http://www.facturae.es/" underline="none">
                    <ListItemButton>
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText sx={{color:'black'}} primary="Factura electrónica" />
                    </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link rel="noopener noreferrer" target="_blank" href="http://www.dipuleon.es/bop" underline="none">
                    <ListItemButton>
                        <ListItemIcon><NewspaperIcon  /></ListItemIcon>
                        <ListItemText sx={{color:'black'}} primary="Boletín Oficial de la Provincia de León" />
                    </ListItemButton>
                    </Link>
                </ListItem>
                </List>
            </TabPanel>
        </Box>
    );
}

export default Inicio;