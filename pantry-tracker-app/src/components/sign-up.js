import { useState } from 'react';
import { signInWithGoogle } from '@/libraries/auth';
import { 
    Box, 
    Typography, 
    Button, 
    Container,
    MuiAccordion,
    MuiAccordionSummary,
    MuiAccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #c29243`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  borderRadius: '16px',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'white'
      : 'white',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  maxWidth: '500px',
}));

const SignUpPage = () => {
    const handleGetStarted = async () => {
      signInWithGoogle();
    }

    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
     setExpanded(newExpanded ? panel : false);
    };

    return (
        <Container maxWidth={false}
          sx={{ 
            width: '100vw',
            height: '100vh', 
            boxSizing: 'border-box',
            border: "15px solid #c29243",
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#5e3a47',
              maxWidth: 's',
            }}
          >
            <Typography component="h1" variant="h2" fontWeight="bold">
              My Wonderful Pantry Management System
            </Typography>
            <Typography component="h5" variant="h5">
              An easy way to track, organize, and utilize all the ingredients lying around in your pantry!
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '90vw',
              color: '#5e3a47',
              flexWrap: 'wrap',
            }}
          >
            <Typography component="h6" variant="h6">
              Now equipped with...
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Customizable categories!</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Personalize your organization to your liking! 
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography>Image Classification</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Have the item on hand with you? Just take a picture and automatically add it!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Recipe Generation!</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  No need to scour the internet, the AI generation's got your back!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Button sx={{ m: 'auto', maxWidth: '200px', backgroundColor: '#c29243', color: '#fff', '&:hover': { backgroundColor: '#7a5f6e'}}}  
          variant='contained'
          onClick={handleGetStarted}
          >
            Try it Out?
          </Button>
        </Container>
    );
};

export default SignUpPage;