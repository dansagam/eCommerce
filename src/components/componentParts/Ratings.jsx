import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'

const Ratings = ({value, text, color}) => {
   
   
   return (
      <div className='rating'>
         <span>
            <FontAwesomeIcon icon={ 
               value >= 1 ? faStar 
               : value >= 0.5 ? faStarHalfAlt 
               : farStar } style={{color}} 
            />
         </span>
         <span>
            <FontAwesomeIcon icon={ 
               value >= 2 ? faStar 
               : value >= 1.5 ? faStarHalfAlt 
               : farStar } style={{color}} 
            />
         </span>
         <span>
            <FontAwesomeIcon icon={ 
               value >= 3 ? faStar 
               : value >= 2.5 ? faStarHalfAlt 
               : farStar } style={{color}} 
            />
            
         </span>
         <span>
            <FontAwesomeIcon icon={ 
               value >= 4 ? faStar 
               : value >= 3.5 ? faStarHalfAlt 
               : farStar } style={{color}} 
            />
            
         </span>
         <span>
            <FontAwesomeIcon icon={ 
               value >= 5 ? faStar 
               : value >= 4.5 ? faStarHalfAlt 
               : farStar } style={{color}} 
            />
         </span>
         <span>{text && text}</span>
      </div>
   )
}

Ratings.defaultProps ={
   color: '#f8e825',
}

export default Ratings
