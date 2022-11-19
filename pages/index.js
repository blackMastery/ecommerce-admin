import React from 'react'
import { Table } from 'semantic-ui-react'
import { Button, Icon, Modaorm, Checkbox } from 'semantic-ui-react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { useQuery, gql } from '@apollo/client';


function Index  () { 

  const GET_MY_TODOS = gql`
  query MyQuery {
    person {
      email
    }
  }
`;

const { loading, error, data } = useQuery(GET_MY_TODOS);

console.log({  loading, error, data });
  
 return (
 <Segment>
             
  </Segment>
)}



export default Index