import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer.js';

class CustomerList extends Component {
    constructor(props){
        super(props);

        this.state={
            customers: [],
            open: false,
            message: ''
        };

    }

    componentDidMount() {
        this.fetchCustomers();
    }

      // Fetch all customers
    fetchCustomers = () => {
        fetch('http://localhost:10345/api/customers/getall') 
        .then((response) => response.json()) 
        .then((responseData) => { 
            this.setState({ 
                customers: responseData,
            }); 
        })
        .catch(err => console.error(err));  
    } 

    confirmDelete = (link) => {
        confirmAlert({
          message: 'Are you sure to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onDelClick(link)
            },
            {
              label: 'No',
            }
          ]
        })
    }

    // Delete customer
    onDelClick = (link) => {
        fetch('http://localhost:10345/api/customers/deletebyid/'+link, 
            { 
                method: 'GET',
            }
        )
        .then(res => {
            this.setState({open: true, message: 'Customer deleted'});
            this.fetchCustomers();
        })
        .catch(err => {
        this.setState({open: true, message: 'Error when deleting'});
            console.error(err)
        }) 
    }

    // Add new customer
    addCustomer(customer) {
        fetch('http://localhost:10345/api/customers/createcustomer', 
            {   method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            }
        )
        .then(res => this.fetchCustomers())
        .catch(err => console.error(err))
    }

    // Update customer
    updateCustomer(customer, link) {
        var updCustomer = {"Name":customer.Name, "Email":customer.Email, "Id":link }
        fetch('http://localhost:10345/api/customers/updatecustomer', 
            { method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updCustomer)
            })
        .then( res =>
            this.setState({open: true, message: 'Changes saved'})
        )
        .catch( err => 
            this.setState({open: true, message: 'Error when saving'})
        )
    }

    renderEditable = (cellInfo) => {
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.customers];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ customers: data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.customers[cellInfo.index][cellInfo.column.id]
            }}                
          />
        );
    }  

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    render() {
        const columns = [{
            Header: 'Name',         // Header of the column
            accessor: 'Name',        // Value accessor
            Cell: this.renderEditable
        }, {
            Header: 'Email',
            accessor: 'Email',
            Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'Id',
            Cell: ({value, row}) => (<Button size="small" variant="flat" color="primary" onClick={()=>{this.updateCustomer(row, value)}}>Save</Button>)
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'Id',
            Cell: ({value}) => (<Button size="small" variant="flat" color="secondary" onClick={()=>{this.confirmDelete(value)}}>Delete</Button>)
        }]
        return (
            <div>
                <Grid container>
                    <Grid item>
                        <AddCustomer addCustomer={this.addCustomer} fetchCustomers={this.fetchCustomers}/>
                    </Grid>
                </Grid>
                
                <ReactTable
                    data={this.state.customers}
                    columns={columns}
                    filterable={true}
                    defaultPageSize = {10}
                />

                <Snackbar           
                    open={this.state.open}  onClose={this.handleClose} 
                    autoHideDuration={1500} message={this.state.message} 
                />

            </div>
        );
    }

}
 
export default CustomerList;