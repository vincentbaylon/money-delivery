import Confirm from './Confirm'

function Footer({ refetchPicks, refetchCard, setPicker, setPicksComplete }) {
  const handleEnd = () => {
    console.log('END')
    fetch('/cards/destroy', {
      method: 'DELETE',
    })
      .then(refetchCard)
      .then(refetchPicks)

    setPicker(false)
    setPicksComplete(false)
  }

  return (
    <>
      <Confirm handleEnd={handleEnd} />
    </>
  )
}

export default Footer
