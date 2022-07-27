import React from 'react'
import '../style/spinner.css'

const Spinner = ({isMini}) => {
  if (isMini) {
    return (
      <div className="mini-spinner-container">
        <div className="mini-spinner"></div>
      </div>
    )
  } else {
    return (
      <main className="blog">
          <div className="spinner-container">
              <div className="spinner"></div>
          </div>
      </main>
    )
  }
}

export default Spinner