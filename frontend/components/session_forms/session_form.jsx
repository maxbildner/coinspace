import React from 'react';
import NavLoginComponent from '../navbars/nav_login';

class SessionForm extends React.Component {
	constructor (props) {
		super(props);
		this.state = {										// ? ! come back and fix later to add other values for sign up
			email: "",
			password: "",
			first_name: "",
			last_name: "",
			state: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.demoLogin = this.demoLogin.bind(this);
		this.renderSignin = this.renderSignin.bind(this);
		this.renderSignup = this.renderSignup.bind(this);
	}

	componentDidMount() {
		// $('html').attr('data-page', this.props.formType);
		$('html').attr('data-location', this.props.location.pathname);
	}

	componentWillUnmount() {								// ? last lifecycle method?
		this.props.clearErrors();
		
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = Object.assign({}, this.state);
		this.props.processForm(user);						// triggering submit new user/login session action
	}

	update(field) {
		return e => {
			return this.setState({
				[field]: e.target.value
			});
		};
	}

	demoLogin(e){
		e.preventDefault();
		let demoUser = { 
			email: 'demo_user@gmail.com',
			password: '12345678'
		};

		this.props.demoLogin(demoUser);
	}


	renderErrors() {
		// let errors = this.props.errors.map( (error, idx) => {
		// 	return (
		// 		<li key={`error-${idx}`}>
		// 			{error}
		// 		</li>
		// 	)
		// });
		let errors = this.props.errors.join('.')

		if (errors.length == 0) return null;

		return(
			<ul>
				{errors}		
			</ul>
		);
	}

	renderSignup(){
		const { email, password, state, first_name, last_name } = this.state;

		// SIGN UP
		return (<>
			<div className="form-group">
				<label htmlFor="first_name">First name</label>
				<input 
					type="text" 
					value={first_name} 
					onChange={this.update('first_name')} 
					placeholder="First name"
					id="first_name" />
			</div>

			<div className="form-group">
				<label htmlFor="last_name">Last name</label>
				<input 
					type="text" 
					value={last_name} 
					onChange={this.update('last_name')} 
					placeholder="Last name"
					id="last_name" />
			</div>

			<div className="form-group">
				<label htmlFor="state">State</label>
				<input 
					type="text" 
					value={state} 
					onChange={this.update('state')} 
					id="state" />
			</div>

			{this.renderSignin()}
		</>);
	}


	renderSignin() {
		const { email, password, state, first_name, last_name } = this.state;

		return (
			<>
				<div className="form-group">
					<label htmlFor="email"></label>
					<input 
						type="text" 
						value={email} 
						onChange={this.update('email')} 
						id="email"
						placeholder="Email"
						autoComplete="off"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password"></label>
					<input 
						type="password" 
						value={password} 
						onChange={this.update('password')} 
						id="password" 
						placeholder="Password"
						autoComplete="off"
					/>
				</div>

				<button className="demo-login" onClick={this.demoLogin}>Demo</button>
			</>
		);
	}


	render() {
		// const { email, password, state, first_name, last_name } = this.state;

		let fragment;
		let headerTitle;
		let loginExtras;
		let navHeader;
		if (this.props.formType === 'Signup') {
			fragment = this.renderSignup();
			headerTitle = <h2 className="sign-up-header">Create your account</h2>
		} else {
			fragment = this.renderSignin();
			headerTitle = <h2 className="sign-up-header">Sign in to Coinspace</h2>
			navHeader = <NavLoginComponent/>
			loginExtras = 
				<div className="login-extras">
					<p>
						<a href="#">Forgot Password?</a>
						<a href="#">Don't have an account?</a>
						<a href="#">Privacy Policy</a>
					</p>
					<p>
						<a href="#">Have an issue with 2-factor authentication?</a>
					</p>
				</div> 
		}

		return (
			<>
				{navHeader}
				<div>
					{headerTitle}
					<form onSubmit={this.handleSubmit}>
						<div className="center">
							{this.renderErrors()}
							{fragment}
							<input type="submit" value={this.props.formType} />
						</div>
					</form>
						{loginExtras}
				</div>
			</>
		);
	}
}

export default SessionForm;

// if formtype is sign in, 
//