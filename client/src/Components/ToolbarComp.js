import { useState } from 'react'
import { AttachMoney } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Menu } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'

function ToolbarComp({ players }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const sortedPlayers = players.sort((a, b) => b.wins - a.wins)

  const displayPlayers = sortedPlayers.map((p) => {
    return (
      <MenuItem style={{ width: '100%' }}>
        {p.name} {p.wins}-{p.losses}-{p.pushes}
      </MenuItem>
    )
  })

  return (
    <>
      <Toolbar sx={{ bgcolor: '#AA0000', boxShadow: 1 }}>
        <AttachMoney fontSize='large' />
        <Typography
          variant='h5'
          fontWeight='bold'
          sx={{ color: '#B3995D', width: '100%' }}
        >
          Money Maker
        </Typography>
        <Box
          component='span'
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <Button
            variant='outlined'
            size='large'
            sx={{ color: 'white' }}
            onClick={handleClick}
          >
            Record
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={{ width: '250px' }}
          >
            {displayPlayers}
          </Menu>
        </Box>
      </Toolbar>
    </>
  )
}

export default ToolbarComp
