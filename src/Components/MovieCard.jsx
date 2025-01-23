import React from 'react'

function MovieCard() {
  return (
    <>
    <div>
        <div style={{
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzEplqqyeTGV3t2Rqbr_1JGsDwLxEAkREEvQ&s")',
        width: '200px',
        height: '350px',  // You can set the height as needed
        backgroundSize: 'cover',  // Ensures the image covers the container
        backgroundPosition: 'center',  // Centers the image in the container
        backgroundRepeat: 'no-repeat',  // Prevents repeating the image
        alignItems: 'center',
        borderRadius: '10px',
      }}></div>
    </div>
    </>
  )
}

export default MovieCard