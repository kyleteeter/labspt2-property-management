import React, { Component } from 'react';
import axios from 'axios';
import Imageform from './imageform';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';


// const url = process.env.workorderURL || 'http://localhost:9000/workorders'
const url = 'https://tenantly-back.herokuapp.com/workorders';

const styles = theme => ({
	textField: {
		// marginLeft: theme.spacing.unit,
		// marginRight: theme.spacing.unit,
	  },
	
  });

class Workorderform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			property: 1,
			tenant: 2,
			description: '',
			phone: '',
			unsupervisedEntry: false,
			status: 'Pending',
			url: 'none'
		};
	}

	inputhandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	urlUpdater = (imageurl) => {
		console.log(imageurl);
		this.setState({
			url: imageurl
		});
	};

	submithandler = (e) => {
		e.preventDefault();

		let newWorkOrder = {
			property: this.state.property,
			tenant: this.state.tenant,
			description: this.state.description,
			phone: this.state.phone,
			unsupervisedEntry: this.state.unsupervisedEntry,
			status: this.state.status,
			image: this.state.url
		};

		axios
			.post(url, newWorkOrder)
			.then((response) => {
				this.setState({
					description: '',
					phone: '',
					unsupervisedEntry: false
				});
			})
			.catch((error) => console.log("we've encountered an error"));
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid container className='innerworkorderform' spacing={24}>
			<Grid item className='griditem' lg={11}>
			<Card className="carditems">
			<Typography component="h2" variant="headline" gutterBottom>
          		Type Your Notes Here:
        	</Typography>
				<form className={classes.container}  onSubmit={this.submithandler}>
					<TextField
						className={classes.textField}
						onChange={this.inputhandler}
						value={this.state.description}
						name="description"
						placeholder="Description"
						className="#"
						type="text"
					/>
					<br />
					<TextField
						className={classes.textField}
						onChange={this.inputhandler}
						name="phone"
						value={this.state.phone}
						placeholder="(555)555-5555"
						className="#"
						type="text"
					/>
					<br />
					<Input onChange={this.inputhandler} name="unsupervisedEntry" className="#" type="checkbox"> 
					<p>	Permission to enter?</p>
					</Input>
					<Imageform url={this.urlUpdater} />
         {/*<input name="attachimage" type='file'/> */}
					<Button variant='contained' type="submit" className="button-2">
					<SaveIcon  />
						Save
					</Button>
				</form>
				</Card>
				</Grid>
				</Grid>
		);
	}
}


Workorderform.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Workorderform);