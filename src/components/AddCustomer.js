import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Name: '', Email: ''};
  }

  handleChange = (event) => {
    this.setState(
        {[event.target.name]: event.target.value}
    );
  }   

  cancelSubmit = (event) => {
    event.preventDefault();    
    this.refs.addDialog.hide();    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var newCustomer = {Name: this.state.Name, Email: this.state.Email};
    this.props.addCustomer(newCustomer);    
    this.refs.addDialog.hide();    
  }

  render() {
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New customer</h3>
          <TextField label="Name" placeholder="Name"  name="Name" onChange={this.handleChange}/><br/>
          <TextField label="Email" placeholder="Email" name="Email" onChange={this.handleChange}/><br/>
          <Button variant="outlined" style={{marginRight: 10}} color="primary" onClick={this.handleSubmit}>Save</Button>        
          <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button> 
        </SkyLight>
        <div>
        <Button variant="raised" color="primary" style={{'margin': '10px'}} onClick={() => this.refs.addDialog.show()}>New Customer</Button>
        </div>
      </div>   
    );
  }
}

export default AddCustomer;