'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { 
    Box, 
    Typography, 
    Grid,
    Button, 
    TextField, 
    Link,
    Container,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        console.error('Passwords do not match!');
        return;
      }

      try {
          const res = await createUserWithEmailAndPassword(email, password);
          console.log({res});
          sessionStorage.setItem('user', true)
          setEmail('');
          setPassword('');
          setConfirmPassword('');

          //alert('Account was successfully created!')
          return router.push('/');
      } catch(e) {
          console.error(e)
      }
    };

    return (
        <Container component="main" maxWidth="s">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 's',
              color: '#5e3a47',
            }}
          >
            <Typography component="h1" variant="h2" fontWeight="bold">
              Welcome to my pantry management system!
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '90vw',
            }}
          >
            <Typography component="h1" variant="h5" color="#5e3a47">
              Please sign up here.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', width: '75%', alignItems: 'center', justifyContent: 'center'}}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2, width: '50vw', backgroundColor: '#c29243', '&:hover': { backgroundColor: '#7a5f6e'}}}
              >
                Sign Up
              </Button>
              <Grid container sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', mb: 1}}>
                <Grid item>
                  <Link href="/" variant="body2" color="#5e3a47">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    );
};

export default SignUp;