import { Box } from "@mui/material"

function Logo() {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: '1.2rem',
      }}
    >
      S
    </Box>
  )
}

export default Logo