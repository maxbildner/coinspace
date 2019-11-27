import React from 'react';
// import NavLoginComponent from '../navbars/nav_login';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {										// ? ! come back and fix later to add other values for sign up
			email: "",
			password: "",
			first_name: "",
			last_name: "",
			state: "",
			// errors: { email: "", password: "" }...
			// have func validate submit, 
			// check if each one is empty or an invlaid format
			// conditionally give classes
		};

			this.handleSubmit = this.handleSubmit.bind(this);
			this.demoLogin = this.demoLogin.bind(this);
			this.renderSignup = this.renderSignup.bind(this);
    }

    componentDidMount() {
			$('html').attr('data-page', this.props.formType);
			// $('html').attr('data-location', this.props.location.pathname);
    }

    componentWillUnmount() {								// ? last lifecycle method?
			this.props.clearErrors();
    }

    handleSubmit(e) {
			e.preventDefault();
			const user = Object.assign({}, this.state);	// !!make sure not to include errors
			this.props.processForm(user);						// triggering submit new user/login session action
    }

    update(field) {
			return e => {
				return this.setState({
					[field]: e.target.value
				});
			};
    }

    demoLogin(e) {
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

			// for blank fields (can be taken care of on front end)
			// need new parameter in state for errors 
			// 

			let errors = this.props.errors.join('.')

			if (errors.length == 0) return null;

			return (
				<ul>
						{errors}
				</ul>
			);
    }

    renderSignup() {
			const { email, password, state, first_name, last_name } = this.state;

			// SIGN UP
			return (<>
				<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							value={email}
							onChange={this.update('email')}
							id="email"
							placeholder="Email"
							autoComplete="off"
						/>
				</div>

				<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							value={password}
							onChange={this.update('password')}
							id="password"
							placeholder="Password"
							autoComplete="off"
						/>
				</div>

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
							placeholder="State"
							id="state" />
				</div>

					{/* {this.renderSignin()} */}
			</>);
    }


    render() {
			// const { email, password, state, first_name, last_name } = this.state;

			let headerTitle = <h2 className="sign-up-header">Create your account</h2>

			return (
				<>
					<div id="signup-form-container">
						{headerTitle}
						<form onSubmit={this.handleSubmit} id="signup-form">
							<div className="center">
								{this.renderErrors()}
								{this.renderSignup()}
								<button className="demo-login" onClick={this.demoLogin}>Demo</button>
								<input className="sign-up-input" type="submit" value={this.props.formType} />
							</div>
						</form>
					</div>
				</>
			);
    }
}

export default SignupForm;