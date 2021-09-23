import React, { useState } from 'react'
import { Form, Button  } from 'react-bootstrap'

const SearchContainer = ({history}) => {
   const [keyword, setKeyword] = useState('')

   const searchHandler =(e) =>{
      e.preventDefault()
      if(keyword.trim()){
         history.push(`/search/${keyword}`)
      }else{
         history.push('/')
      }
   }
   return (
      <>
         <Form className="d-flex" onSubmit={searchHandler} >
            <Form.Control
               type="text"
               name='q'
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               placeholder="Search product here"
               className="mr-2"
               aria-label="Search"
            />
            <Button variant="outline-success" type='submit' >Search</Button>
         </Form>
         
      </>
   )
}

export default SearchContainer
