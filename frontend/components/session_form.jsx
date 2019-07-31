import React from 'react';

class SessionForm extends React.Component {
	constructor (props) {
		super(props);
		this.state = {										// ? ! come back and fix later to add other values for sign up
			email: "",
			password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.update = this.update.bind(this);
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

	renderErrors() {
		debugger
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
		const { email, password } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderErrors()}
				Email:
				<input type="text" value={email} onChange={this.update('email')} />
				Password:
				<input type="password" value={password} onChange={this.update('password')}/>
				<input type="submit" value={this.props.formType}/>
			</form>
		);
	}
}

export default SessionForm;