import React from 'react'
import { useRouter } from 'next/router'
import ProductForm from '../../components/form/productForm.js';
import { PRODUCTS_BY_IDS } from '../../apollo/client/queries';
import { useQuery } from '@apollo/client';
import { Table,Modal,Form,Checkbox,Button, Container, Tab  } from 'semantic-ui-react'




function ProductView ({prouct}) {

  const router = useRouter()
  const { id } = router.query
  var { data, loading, error }  = useQuery(PRODUCTS_BY_IDS,{
    variables: {
      id: id
    }
  })
  
  console.log(id, error, data)

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

  return  (
  <Container>
  <ProductForm 
  product={data.Product_by_pk}
  />
  </Container>  
)

}



export default ProductView