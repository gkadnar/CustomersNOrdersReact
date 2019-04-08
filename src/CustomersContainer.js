import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import styled from "styled-components";

const Button = styled.button`
  font-size: 1rem;
  display: inline-block;
  padding: 0.5rem;
  margin: 0.3rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.2rem;
  border: 0;
`;

class CustomersContainer extends Component {
    constructor(props){
        super(props);

        this.state={
            data: []
        };

    }

    fetchData = () => {
        const url = `http://localhost:10345/api/customers/getall`;
        fetch(url)
        .then(response => response.json()) 
        .then(responseData => {
          this.setState({data : responseData }); 
        });  
    }

    render() {
        const columns = [{
            Header: 'Name',         // Header of the column
            accessor: 'Name'        // Value accessor
        }, {
            Header: 'Email',
            accessor: 'Email',
        }]
        return (
            <div className="App">

                <div>
                    <Button onClick={this.fetchData}>
                        Fetch all customers
                    </Button>
                </div>
                <br></br><br></br><br></br>

                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    filterable={true}
                    defaultPageSize = {10}
                />

            </div>
        );
    }

}
 
export default CustomersContainer;