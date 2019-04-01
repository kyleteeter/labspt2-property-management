import React from 'react';
// import PropTypes from 'prop-types';
import '../general.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasScrolled: false
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {
		const scrollTop = window.pageYOffset;

		if (scrollTop > 50) {
			this.setState({ hasScrolled: true });
		} else {
			this.setState({ hasScrolled: false });
		}
	};

	render() {
		return (
			<div className={this.state.hasScrolled ? 'Header HeaderScrolled' : 'Header'}>
				<div className="HeaderGroup">
					<img src={require('../../assets/images/logo8.svg')} width="180" alt="Logo" />
					<Link to={'/'}>
						<button className="login-button">Features</button>
					</Link>
					<Link to={'/'}>
						<button className="login-button">Pricing</button>
					</Link>
					<Link to={'/login'}>
						<button className="login-button">Log In</button>
					</Link>
					<Link to={'/register'}>
						<button className="register-button">Register</button>
					</Link>
				</div>
			</div>
		);
	}
}

// Menu.propTypes = {
// 	classes: PropTypes.object.isRequired
// };

export default Menu;
