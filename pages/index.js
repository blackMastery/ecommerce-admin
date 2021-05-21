import React from 'react'
import { Table } from 'semantic-ui-react'
import { Button, Icon, Modaorm, Checkbox } from 'semantic-ui-react'
import ProductTable from '../components/productTable/Product-Table'
import { Grid, Menu, Segment } from 'semantic-ui-react'


function Index  () { 
 return (
 <>
 <Grid>
  <Grid.Column width={4}>

     <Menu inverted pointing  vertical >
            <Menu.Item
              name='Products'
              active={true}
            />
            <Menu.Item
              name='Settings'
              active={false}
            />
      
          </Menu>
        </Grid.Column>
          <Grid.Column stretched width={12}>
            <Segment>
              <ProductTable/>
            </Segment>
          </Grid.Column>
     </Grid>
  </>
)}

export default Index