import { useState } from 'react'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'

function ButtonCard({ num, handleClick, isClicked }) {
  return (
    <>
      <Grid item xs={2} sm={2} style={{ textAlign: 'center' }}>
        {isClicked ? (
          <>
            <Button
              variant='outlined'
              disabled
              value={num}
              onClick={handleClick}
            >
              {num}
            </Button>
          </>
        ) : (
          <>
            <Button variant='outlined' value={num} onClick={handleClick}>
              {num}
            </Button>
          </>
        )}
      </Grid>
    </>
  )
}

export default ButtonCard
