import React from 'react'
import { Table,Modal,Form,Checkbox,Button, Container,  Tab  } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../../apollo/client/queries';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import ProductForm from '../form/productForm.js';
import { CATEGORIES } from '../../apollo/client/queries';
import Link from 'next/link'
import { useRouter } from 'next/router'
import productState from '../../hooks/productStatHook'




function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false, curr_id: action.curr_id, _product:{name:''}  }
    case 'open':
      const { products } = action;
      const product = {...products.find(prod=>prod.id === action.curr_id)};

      return { open: true, size: action.size, curr_id: action.curr_id, _product: product };
    default:
      throw new Error('Unsupported action...')
  }
}
function ProductTable (){
  var { data, loading, error } = useQuery(PRODUCTS);
  var categoriesRes = useQuery(CATEGORIES)
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);
  const [submitting, setSubmitting] = React.useState(false);
// TAB CONTROLLER 
  const [tabIdx, setTab] = React.useState(0);

console.log({tabIdx})



  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
    curr_id: 9,
    _product:{
      name: " ",
      price: null,

    },
    products:[]
  })
  const { open, size, curr_id, _product } = state;


  if (loading)
  return (
    <>
      <p className="loading">Loading...</p>
      <style jsx>{`
        .loading {
          width: 100%;
          text-align: center;
          align-self: center;
          font-size: 18px;
        }
        `}</style>
    </>
  );




  const panes = [
    {
      
      menuItem: 'Products',
      render: () => <Tab.Pane attached={false}>
        
    <>
  <Table celled selectable>
    <Table.Header>
    <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
   
          <Button size='small'>
          <Link href={`/createProduct/`}  >
            Create
          </Link>
          </Button>
     
        </Table.HeaderCell>
      <Table.Row>
      <Table.HeaderCell>edit</Table.HeaderCell>
        <Table.HeaderCell>id</Table.HeaderCell>
        <Table.HeaderCell>name</Table.HeaderCell>
        <Table.HeaderCell>price</Table.HeaderCell>
        <Table.HeaderCell>rating</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>


    {data.Product.map((product) => (
        <Table.Row  key={product.id}>
        <Table.Cell>

        <Link href={`/create-editproduct/${product.id}`}  >
          edit
        </Link>
        </Table.Cell>

        <Table.Cell>{product.id}</Table.Cell>
        <Table.Cell>{product.name}</Table.Cell>
        <Table.Cell>{product.price}</Table.Cell>
        <Table.Cell>{product.rating}</Table.Cell>
      </Table.Row>
      ))}
     
    </Table.Body>
  </Table>
</>
      </Tab.Pane>,
    },
    {
      menuItem: 'Create',
      render: () => <Tab.Pane attached={false}>
         <ProductForm
         setTab={setTab} 
         product={_product}

         categoriesRes={categoriesRes}
         />

      </Tab.Pane>
    },
  ]


 return (
             <Container> <Tab  
             menu={{ pointing: true }} panes={panes} /> </Container>
 )

}
export default ProductTable