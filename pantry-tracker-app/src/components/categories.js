import { 
  Box, 
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CreateIcon from '@mui/icons-material/Create';
 
//sidebar categories
const Categories = () => {
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
}

export default Categories;