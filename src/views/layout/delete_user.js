import React, { Fragment } from "react";

import styles from "./../../assets/css/delete_user.module.css";

import axios from "axios";

import { Link, Redirect } from "react-router-dom";

class add_user extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			mobile: "",
			birthdate: "",
			address: "",
			fetch: true,
			redirect: "",
		};
	}

	add_address = () => {
		let id = document.getElementById("address");
		var div = document.createElement("div");
		div.className = styles.flex;
		var p = document.createElement("p");
		p.className = styles.para;
		p.innerHTML = "";
		var input = document.createElement("input");
		input.className = styles.input_form_btn;
		var button = document.createElement("button");
		button.className = styles.input_add_btn;
		button.innerHTML = "+";

		div.appendChild(p);
		div.appendChild(input);
		div.appendChild(button);

		id.appendChild(div);
	};

	async componentDidMount() {
		console.log(this.props.location.state.id);
		let data = {
			id: this.props.location.state.id,
		};

		axios
			.post("https://api-skill-js.herokuapp.com/detail", data)
			.then(async (res) => {
				console.log(res.data.result);
				this.setState({ id: res.data.result._id });
				this.setState({ name: res.data.result.nama });
				this.setState({ email: res.data.result.email });
				this.setState({ mobile: res.data.result.mobile });
				this.setState({ birthdate: res.data.result.birthday });
				this.setState({ address: res.data.result.Adress });
				this.setState({ fetch: false });
				console.log(this.state.user);
			});
	}

	submit = () => {
		let data = {
			id: this.state.id,
		};
		axios
			.post("https://api-skill-js.herokuapp.com/delete", data)
			.then((res) => {
				this.setState({ redirect: true });
			});
	};

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/" />;
		}
		return (
			<div className={styles.container}>
				<h1>Delete Employee</h1>
				<div className={styles.form}>
					{this.state.fetch === true ? (
						<p>wait..</p>
					) : (
						<Fragment>
							<div className={styles.form_group}>
								<p className={styles.para}>Name</p>
								<p className={styles.input_form}>
									{this.state.name}
								</p>
							</div>
							<div className={styles.form_group}>
								<p className={styles.para}>Email</p>
								<p className={styles.input_form}>
									{this.state.email}
								</p>
							</div>
							<div className={styles.form_group}>
								<p className={styles.para}>mobile</p>
								<p className={styles.input_form}>
									{this.state.mobile}
								</p>
							</div>
							<div className={styles.form_group}>
								<p className={styles.para}>Birthdate</p>
								<p className={styles.input_form}>
									{this.state.birthdate}
								</p>
							</div>
							<div
								className={styles.form_group_address}
								id="address"
							>
								<div className={styles.flex}>
									<p className={styles.para}>Address</p>
									<p className={styles.input_form}>
										{this.state.address}
									</p>
								</div>
							</div>
							<p>Are you sure want to delete this ? </p>
							<div className={styles.submit_button}>
								<Link to="/">
									<button>cancel</button>
								</Link>
								<button onClick={this.submit}>delete</button>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default add_user;
