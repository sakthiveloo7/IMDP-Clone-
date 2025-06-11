import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='container-fluid'> 
        <div className='row d-flex justify-content-center pt-5 pb-3'>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
              <p className='text-center'>&copy; {new Date().getFullYear()} IMDb Clone</p>
            </div>
          </div>
        </div>
          
    </footer>
  )
}

export default Footer