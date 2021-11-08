import React from 'react'
import { render, fireEvent, screen } from '../App.test'
import AppDashboard from '../components/componentScreens/AppDashboard'
import ProductScreen from '../components/componentScreens/ProductScreen'

test('should imported component', async () => {
   render(<AppDashboard match={
      {
         params: {
            keyword: '',
            pageNumber: '',
            id: '618206a4a5af468f9c0f859d'
         }
      }
   } />)
   const h1Element = await screen.findByRole('heading', { name: /latest products/i })
   expect(h1Element).toBeInTheDocument()
})
test('should ProductScreen', async () => {
   render(<ProductScreen match={
      {
         params: {
            // keyword: keyword,
            // pageNumber: pageNumber,
            id: '618206a4a5af468f9c0f859d'
         }
      }
   } />)
   const LinkElement = screen.getAllByText(/go back/i)[0]
   // eslint-disable-next-line no-unused-expressions
   expect(LinkElement).toBeEnabled()
})

