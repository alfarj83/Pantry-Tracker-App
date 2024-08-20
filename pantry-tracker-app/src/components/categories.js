'use client'
import { useState } from 'react';
import { 
  Box, 
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
 
//sidebar categories
const Categories = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen)
    }
    return (
    <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon onClick={toggleDrawer(true)} />
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List>
                {['General'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <RestaurantIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['Fruits', 'Vegetables', 'Grains', 'Protein', 'Dairy'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Box>
        </Drawer>
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Pantry Tracker
        </Typography>
      </Toolbar>
    )
}

export default Categories;