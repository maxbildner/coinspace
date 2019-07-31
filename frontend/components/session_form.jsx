import React from 'react';

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
	}

	componentWillUnmount() {							// ? last lifecycle method?
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
			email: 'henflix@gmail.com',
			password: 'asdf1234'
		};

		// debugger
		this.props.demoLogin(demoUser);
	}


	renderErrors() {
		// debugger
		let errors = this.props.errors.map( (error, idx) => {
			return (
				<li key={`error-${idx}`}>
					{error}
				</li>
			)
		});

		return(
			<ul>
				{errors}		
			</ul>
		);
	}

	render() {
		const { email, password, state, first_name, last_name } = this.state;


		// signup
		// const signupForm = this.props.formType === 'signup' ? (<>
		// 	First Name:
		// 		<input type="text" value={first_name} onChange={this.update('first_name')} />
		// 	Last Name:
		// 		<input type="text" value={last_name} onChange={this.update('last_name')} />
		// 	State:	
		// 		<input type="text" value={state} onChange={this.update('state')} />
		// </>) : null



		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.renderErrors()}
					Email:
					<input type="text" value={email} onChange={this.update('email')} />
					Password:
					<input type="password" value={password} onChange={this.update('password')}/>
					{/* {signupForm} */}
					<input type="submit" value={this.props.formType}/>
				</form>
				<button onClick={this.demoLogin}>DEMO LOGIN</button>
			</div>
		);
	}
}

export default SessionForm;