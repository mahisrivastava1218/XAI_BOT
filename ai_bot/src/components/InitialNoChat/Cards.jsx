import { Box, Typography, Stack, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Cards({ heading, subtext, handleClick }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      p={{ xs: 1.2, md: 3 }}
      borderRadius={1}
      boxShadow="0 0 12px rgba(0, 0, 0, 0.1)"
      bgcolor="primary.light"
      onClick={() => handleClick(heading)}
      sx={{
        cursor: 'pointer',
        transition: 'background 200ms ease',
        '&:hover': {
          bgcolor: 'primary.bglight',
        },
        '&:hover .MuiIconButton-root': {
          opacity: 1,
        },
      }}
    >
      {/* Left side: text info */}
      <Box>
        <Typography
          variant="heading"
          fontWeight={700}
          fontSize={{ xs: 14, md: 20 }}
        >
          {heading}
        </Typography>
        <Typography
          color="text.secondary"
          fontSize={{ xs: 10, md: 16 }}
        >
          {subtext}
        </Typography>
      </Box>

      {/* Right side: arrow icon */}
      <IconButton
        size="small"
        sx={{
          opacity: 0,
          transition: 'opacity 400ms ease',
          bgcolor: 'primary.bglight',
        }}
      >
        <ArrowUpwardIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}
