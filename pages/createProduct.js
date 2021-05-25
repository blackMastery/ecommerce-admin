import React from 'react'
import { useRouter } from 'next/router'
// import ProductForm from '../../components/form/productForm.js';
// import { PRODUCTS_BY_IDS } from '../../apollo/client/queries';
// import { useQuery } from '@apollo/client';
import { Table,Modal,Form,Checkbox,Button, Container, Tab  } from 'semantic-ui-react'
import CreateProductForm from '../components/form/createProductForm'



export default function CreateProductView () {
    return (
        <Container>
            <CreateProductForm/>
        </Container>
    )

}
