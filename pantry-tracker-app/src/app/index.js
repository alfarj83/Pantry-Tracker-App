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
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import Categories from '@/components/categories';

export default function Home() {
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
            {Categories}
          </Drawer>
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Pantry Tracker
        </Typography>
      </Toolbar>
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
}