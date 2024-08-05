'use client'
import { useEffect, useState } from 'react';
import { firestore } from '@/firebase';
import { 
  Box, 
  Typography, 
  Stack, 
  Button, 
  Modal, 
  TextField, 
  BottomNavigation, 
  BottomNavigationAction, 
  AppBar, 
  Toolbar, 
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  width: 400,
  border: '8px solid #c29243',
  p: 4,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  backgroundColor: 'white',
  borderRadius: '8px',
};

export default function Home() {
  /* ALL USESTATE VARIABLES */
  // for inventory update
  const [inventory, setInventory] = useState([])
  // for adding items
  const [openItem, setOpenItem] = useState(false)
  const [itemName, setItemName] = useState('')
  const handleOpen = () => setOpenItem(true)
  const handleClose = () => setOpenItem(false)
  // for bottom navbar
  const [value, setValue] = useState(0)
  // for top menu
  const [openDrawer, setOpenDrawer] = useState(false)
  // for search/filter
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  // for authentication
  const [openAcc, setOpenAcc] = useState(false)
  const handleOpenSignIn = () => setOpenAcc(true)
  const handleCloseSignIn = () => setOpenAcc(false)

  /* ALL FUNCTIONS */
  //updates inventory to match database status
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  //adds items to database
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
    alert('Item added successfully!')
  }

  //removes items from database
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
    alert('Item removed successfully!')
  }
  useEffect(() => {
    updateInventory()
  }, [])

  //toggles the sidebar menu
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen)
  }
  //sidebar categories
  const DrawerList = (
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
  );

  //adding functionality to search bar
  useEffect(() => {
    if (searchQuery) {
      const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredItems(filtered);
      } else {
        setFilteredItems(inventory);
      }
    }, [searchQuery, inventory]) 

  return <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    backgroundColor='white'
    gap={2}
  >
    <AppBar sx={{ backgroundColor: '#5e3a47'}}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon onClick={toggleDrawer(true)} />
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Pantry Tracker
        </Typography>
        <Button sx={{ ml: 'auto', backgroundColor: '#c29243', color: '#fff', '&:hover': { backgroundColor: '#7a5f6e'}}}  
          variant='contained' 
          onClick={handleOpenSignIn}
        >
          Sign In
        </Button>
      </Toolbar>
      <Modal
      open={openAcc}
      onClose={handleCloseSignIn}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography color='black' id="modal-modal-title" variant="h6" component="h2">
          Sign In
        </Typography>
        <Stack width="100%" direction={'column'} spacing={1} display='flex'>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label='Password'
            variant="outlined"
            fullWidth
          />
          <Button sx={{ border: '1px solid', variant: 'outlined', width: '75%'}}
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleCloseSignIn()
            }}
          >
            Enter
          </Button>
        </Stack>
      </Box>
    </Modal>
    </AppBar>
    <Box sx={{ width: "90vw", display: 'flex', justifyContent: 'center', p: 1 }}>
      <TextField
          variant="outlined"
          placeholder="Search Pantry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
    </Box>
    <Modal
      open={openItem}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography color='black' id="modal-modal-title" variant="h6" component="h2">
          Add item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={1}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button sx={{ border: '1px solid', variant: 'outlined'}}
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    <Button sx={{ backgroundColor: '#c29243', color: '#fff', '&:hover': { backgroundColor: '#7a5f6e'}}}  variant='contained' onClick={handleOpen}>
      Add New Item
    </Button>
    <Box 
      sx={{
        width: '90vw',
        border: '4px solid #c29243',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Stack width="90vw" height="300px" overflow={'auto'}>
        {filteredItems.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="100px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'white'}
            paddingX={5}
            border={'1px solid #c29243'}
          >
            <Typography variant={'h3'} color={'#5e3a47'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={'h4'} color={'#5e3a47'} textAlign={'center'}>
              Quantity: {quantity}
            </Typography>
            <Button sx={{ backgroundColor: '#5e3a47', color: '#fff' }} width="50px" variant="contained" onClick={() => removeItem(name)}>
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
    <Box sx={{ width: "100vw"}}>
      <BottomNavigation 
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{ position: "fixed", bottom: 0, width: "100vw", backgroundColor: "#5e3a47"}}
      >
        <BottomNavigationAction label="Use Text" icon={<TextFieldsIcon sx={{color: 'white'}} />} 
          sx={{
            '& .MuiBottomNavigationAction-label': {
              color: 'white',
            },
          }}
        />
        <BottomNavigationAction label="Use Camera" icon={<CameraAltIcon sx={{color: 'white'}}/>} 
        sx={{
          '& .MuiBottomNavigationAction-label': {
            color: 'white',
          },
        }}
      />
      </BottomNavigation>
    </Box>
  </Box>
}
