import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

const AppFooter = () => {
   return (
      <footer>
         <Container>
         <Row>
            <Col className='text-center py-3'>Copyright &copy; eShop</Col>
         </Row>
         </Container>
      </footer>
   )
}

export default AppFooter
