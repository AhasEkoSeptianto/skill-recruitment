import React from "react";

import styles from "./../../assets/css/add_user.module.css";

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
			redirect: false,
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

	validate = (data) => {
		if (data.includes("@") && data.includes(".com")) {
			return true;
		} else {
			return false;
		}
	};

	submit = () => {
		let data = {
			nama: this.state.nama,
			email: this.state.email,
			mobile: this.state.mobile,
			birthday: this.state.birthdate,
			Adress: this.state.address,
		};
		let valid = this.validate(data.email);
		if (valid === true) {
			axios
				.post("https://api-skill-js.herokuapp.com/add", data)
				.then(async (res) => {
					console.log("succes");
					this.setState({ redirect: true });
				});
		} else {
			document
				.getElementById("email")
				.setAttribute("styles", "border:1px solid red;");
		}
	};

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/" />;
		}
		return (
			<div className={styles.container}>
				<h1>Add Employee</h1>
				<div className={styles.form}>
					<div className={styles.form_group}>
						<p className={styles.para}>Name</p>
						<input
							type="text"
							className={styles.input_form}
							onChange={(e) =>
								this.setState({
									nama: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.form_group}>
						<p className={styles.para}>Email</p>
						<input
							type="email"
							id="email"
							className={styles.input_form}
							onChange={(e) =>
								this.setState({
									email: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.form_group}>
						<p className={styles.para}>mobile</p>
						<input
							type="text"
							className={styles.input_form}
							onChange={(e) =>
								this.setState({
									mobile: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.form_group}>
						<p className={styles.para}>Birthdate</p>
						<input
							type="text"
							placeholder="YYYY-MM-DD"
							className={styles.input_form}
							onChange={(e) =>
								this.setState({
									birthdate: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.form_group_address} id="address">
						<div className={styles.flex}>
							<p className={styles.para}>Address</p>
							<input
								type="text"
								className={styles.input_form_btn}
								onChange={(e) =>
									this.setState({
										address: e.target.value,
									})
								}
							/>
							<button
								className={styles.input_add_btn}
								onClick={this.add_address}
							>
								+
							</button>
						</div>
					</div>
					<div className={styles.submit_button}>
						<button>cancel</button>
						<button onClick={this.submit}>submit</button>
					</div>
				</div>
			</div>
		);
	}
}

export default add_user;
