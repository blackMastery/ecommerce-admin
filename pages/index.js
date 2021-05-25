import React from 'react'
import { Table } from 'semantic-ui-react'
import { Button, Icon, Modaorm, Checkbox } from 'semantic-ui-react'
import ProductTable from '../components/productTable/Product-Table'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../apollo/client/queries';


function Index  () { 


  
 return (
 <Segment>
              <ProductTable/>
  </Segment>
)}



export default Index