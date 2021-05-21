import React from 'react'
import { Table,Modal,Form,Checkbox,Button, Container,  Tab  } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../../apollo/client/queries';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import ProductForm from '../form/productForm.js';
import { CATEGORIES } from '../../apollo/client/queries';
import Link from 'next/link'
import { useRouter } from 'next/router'




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
function ProductTable ({products}) {
  const router = useRouter();
  let {tab} = router.query;
  let [tabIdx, setTab] = React.useState(tab);


  console.log({tab})
  let category;
  var categoriesRes = useQuery(CATEGORIES)
  const sortQueryResult = useQuery(SORT_PRODUCT_SECTION);
  const [submitting, setSubmitting] = React.useState(false);




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


  if(submitting){
    dispatch({ type: 'close', size: '',
      curr_id:0, 
       products: []
   })
  }

  if (category) {
    var { data, loading, error } = useQuery(PRODUCTS, {
      variables: {
        field: sortQueryResult.data.sortProductSection[0],
        order: sortQueryResult.data.sortProductSection[1],
        category: category,
      },
    });
  } else if (!category) {
    var { data, loading, error } = useQuery(PRODUCTS);
  }
  
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
        {/* <button onClick={() => dispatch({ type: 'open', size: 'small',
         _product: product,
         curr_id: product.id, 
          products: [...data.Product]
      }) }>
         edit
        </button> */}
        </Table.Cell>

        <Table.Cell>{product.id}</Table.Cell>
        <Table.Cell>{product.name}</Table.Cell>
        <Table.Cell>{product.price}</Table.Cell>
        <Table.Cell>{product.rating}</Table.Cell>
      </Table.Row>
      ))}
     
    </Table.Body>
  </Table>

  <Modal
      size={size}
      open={open}
      onClose={() =>dispatch({ type: 'close', size: 'fullscreen',
      curr_id:0, 
       products: [...data.Product]
   })}
    >
   <Modal.Header>Product</Modal.Header>
   <Modal.Content>
         <ProductForm product={_product}
         setSubmitting={setSubmitting}
      
         categoriesRes={categoriesRes}/>
            
   </Modal.Content>
   <Modal.Actions>
     <Button negative onClick={() => dispatch({ type: 'close', size: 'fullscreen',
      curr_id:0, 
       products: [...data.Product]
   })}>
       Exit
     </Button>
     
   </Modal.Actions>
 </Modal>

</>

      
      </Tab.Pane>,
    },
    {
      menuItem: 'Create',
      render: () => <Tab.Pane attached={false}>
         <ProductForm 
         product={_product}

         categoriesRes={categoriesRes}
         />

      </Tab.Pane>
    },
  ]

  const changeTab =  (e,d)=>{
     console.log(d)
      setTab(d.activeIndex)
  }
 return (

       
             <Container> <Tab activeIndex={tabIdx} 
             onTabChange={changeTab}
             menu={{ pointing: true }} panes={panes} /> </Container>
    
  
 )

}
export default ProductTable