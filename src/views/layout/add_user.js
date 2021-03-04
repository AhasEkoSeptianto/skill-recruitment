import React from "react";

import styles from "./../../assets/css/add_user.module.css";

import axios from "axios";

import { Link, Redirect } from "react-router-dom";

class add_user extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id_generated: 0,
			name: "",
			email: "",
			mobile: "",
			birthday: "",
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
		let lenght_birthday = data.birthday;
		var result = {
			data: data,
			err: false,
		};

		if (data.email.includes("@") && data.email.includes(".com")) {
			document
				.getElementById("email")
				.setAttribute("style", "border:1px solid gray;padding:5px;");
		} else {
			result.err = true;
			document
				.getElementById("email")
				.setAttribute("style", "border:1px solid red;padding:5px;");
		}

		if (data.nama !== undefined) {
			document
				.getElementById("nama")
				.setAttribute("style", "border:1px solid gray;padding:5px;");
		} else {
			result.err = true;
			document
				.getElementById("nama")
				.setAttribute("style", "border:1px solid red;padding:5px;");
		}

		if (data.mobile.match(/^-?\d+$/)) {
			document
				.getElementById("number")
				.setAttribute("style", "border:1px solid gray;padding:5px;");
		} else {
			result.err = true;
			document
				.getElementById("number")
				.setAttribute("style", "border:1px solid red;padding:5px;");
		}
		if (lenght_birthday.length === 10) {
			document
				.getElementById("birthday")
				.setAttribute("style", "border:1px solid gray;padding:5px;");
		} else {
			result.err = true;
			document
				.getElementById("birthday")
				.setAttribute("style", "border:1px solid red;padding:5px;");
		}
		return result;
	};

	id_generated = async () => {
		let data = [];
		await axios.get("http://localhost:8000/users").then(async (res) => {
			data.push(res.data.all_users);
		});
		let id = ("0000" + (data[0].length + 1)).slice(-4);
		this.setState({ id_generated: id });
	};

	submit = async () => {
		await this.id_generated();

		let data = {
			id: this.state.id_generated,
			nama: this.state.nama,
			email: this.state.email,
			mobile: this.state.mobile,
			birthday: this.state.birthday,
			Adress: this.state.address,
			id: this.state.id_generated,
		};
		console.log("data = ", data);
		let valid = this.validate(data);
		console.log("valid = ", valid);
		if (valid.err === false) {
			axios
				.post("http://localhost:8000/add", valid.data)
				.then(async (res) => {
					console.log("succes");
					this.setState({ redirect: true });
				});
		} else {
			console.log("erroe");
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
							id="nama"
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
							type="number"
							id="number"
							className={styles.input_form}
							onChange={(e) =>
								this.setState({
									mobile: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.form_group}>
						<p className={styles.para}>birthday</p>
						<input
							type="text"
							id="birthday"
							placeholder="YYYY-MM-DD"
							className={styles.input_form}
							onChange={(e) =>
								this.setState({
									birthday: e.target.value,
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
