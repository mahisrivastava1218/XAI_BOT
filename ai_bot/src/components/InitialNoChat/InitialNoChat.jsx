import { Box, Typography, Stack, Grid } from '@mui/material';
import Cards from './Cards';
import botIcon from '../../assets/Group 1000011095.png';

export default function InitialNoChat({ generateResponse }) {
  // Suggested questions to display on the home screen
  const suggestions = [
    {
      heading: 'Hi, what is the weather',
      subtext: 'Get immediate AI generated response',
    },
    {
      heading: 'Hi, what is my location',
      subtext: 'Get immediate AI generated response',
    },
    {
      heading: 'Hi, what is the temperature',
      subtext: 'Get immediate AI generated response',
    },
    {
      heading: 'Hi, how are you',
      subtext: 'Get immediate AI generated response',
    },
  ];

  return (
    <Stack
      height="100%"
      justifyContent="flex-end"
      p={{ xs: 2, md: 3 }}
    >
      {/* Bot greeting section */}
      <Stack alignItems="center" spacing={2} my={5}>
        <Typography variant="h2" align="center">
          How Can I Help You Today?
        </Typography>
        <Box
          component="img"
          src={botIcon}
          alt="AI Assistant"
          height={{ xs: 42, md: 70 }}
          width={{ xs: 42, md: 70 }}
          borderRadius="50%"
          boxShadow={4}
        />
      </Stack>

      {/* Suggested question cards */}
      <Grid container spacing={{ xs: 1, md: 3 }}>
        {suggestions.map((item) => (
          <Grid item key={item.heading} xs={12} md={6}>
            <Cards
              heading={item.heading}
              subtext={item.subtext}
              handleClick={generateResponse}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
