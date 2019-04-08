import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';

class CustomersContainer extends Component {
    constructor(props){
        super(props);

        this.state={
            keyword: '',
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

    handleChange = (e) => {
        this.setState({keyword: e.target.value});
      }
    
    btnClick = (value) => {
        alert(value);
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
            <div className="container">
                <input type="text" onChange={this.handleChange} />
                <button onClick={this.fetchData} value={this.state.keyword} >Fetch</button>
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