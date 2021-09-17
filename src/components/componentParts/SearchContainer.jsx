import React from 'react'
import { FormControl, Form, Button  } from 'react-bootstrap'

const SearchContainer = ({history}) => {
   return (
      <>
         <Form className="d-flex">
            <FormControl
               type="search"
               placeholder="Search"
               className="mr-2"
               aria-label="Search"
            />
            <Button variant="outline-success" type='submit' >Search</Button>
         </Form>
         
      </>
   )
}

export default SearchContainer
