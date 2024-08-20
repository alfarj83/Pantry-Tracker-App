'use client'
import { useEffect, useState } from 'react';
import { firestore } from '@/libraries/firebase';
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
  InputAdornment,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
import Categories from '@/components/categories';
import SignUpPage from '@/components/sign-up';
import { useAuth } from '@/app/context/auth-context';
import { AuthProvider } from '@/app/context/auth-context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  width: '100%',
  border: '8px solid #c29243',
  p: 4,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  backgroundColor: 'white',
  borderRadius: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '500px',
};

export default function Home() {
  /* ALL USESTATE VARIABLES */
  const { user } = useAuth()
  //const { user } = useAuth()
  // for inventory update
  const [inventory, setInventory] = useState([])
  // for adding items
  const [openItem, setOpenItem] = useState(false)
  const [itemName, setItemName] = useState('')
  const handleOpen = () => setOpenItem(true)
  const handleClose = () => setOpenItem(false)
  // for bottom navbar
  const [value, setValue] = useState(0)
  // for search/filter
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  //for switching from landing page to pantry
  //const [visible, setVisible] = useState(true)

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

  return <main>
    { !user ?  ( 
      <SignUpPage/> ) : 
    ( <Box
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
            <Categories/>
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
            <Typography color='#5e3a47' id="modal-modal-title" variant="h6" component="h2">
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
              <Button sx={{ border: '1px solid #5e3a47', variant: 'outlined'}}
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
                alignItems={'center'}
                bgcolor={'white'}
                paddingX={5}
                border={'1px solid #c29243'}
              >
                <Typography variant={'h3'} color={'#5e3a47'} textAlign={'center'} pr='50px'>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h4'} color={'#5e3a47'} textAlign={'center'} pr='10px' ml='auto'>
                  {quantity}
                </Typography>
                <Button sx={{ backgroundColor: '#5e3a47', color: '#fff', ml: 'auto', mr: '10px' }} width='30px' variant="contained" onClick={() => addItem(name)}>
                  Add
                </Button>
                <Button sx={{ backgroundColor: '#5e3a47', color: '#fff'}} width='30px' variant="contained" onClick={() => removeItem(name)}>
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
    )};
  </main>
}
