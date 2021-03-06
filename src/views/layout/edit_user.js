import React, { Fragment } from "react";

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
			fetch: true,
			redirect: false,
			id: "",
			id_user: 0,
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
				this.setState({ id_user: res.data.result.id });
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

		if (data.nama !== "") {
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

	submit = () => {
		let data = {
			id: this.state.id,
			nama: document.getElementById("nama").value,
			email: document.getElementById("email").value,
			mobile: document.getElementById("number").value,
			birthday: document.getElementById("birthday").value,
			Adress: document.getElementById("address_form").value,
		};
		console.log(data);

		let valid = this.validate(data);
		if (valid.err === false) {
			axios
				.post("https://api-skill-js.herokuapp.com/edit", data)
				.then(async (res) => {
					console.log("succes");
					this.setState({ redirect: true });
				});
		} else {
			console.log("err");
		}
	};

	render() {
		if (this.state.redirect === true) {
			return <Redirect to="/" />;
		}
		return (
			<div className={styles.container}>
				<div className={styles.form}>
					<h1>Edit Employee</h1>
					{this.state.fetch === true ? (
						<p></p>
					) : (
						<Fragment>
							<div className={styles.form_group}>
								<p className={styles.para}>ID</p>
								<input
									type="text"
									className={styles.input_form}
									value={this.state.id_user}
									disabled
								/>
							</div>
							<div className={styles.form_group}>
								<p className={styles.para}>Name</p>
								<input
									type="text"
									id="nama"
									className={styles.input_form}
									value={this.state.name}
									onChange={(e) =>
										this.setState({ name: e.target.value })
									}
								/>
							</div>
							<div className={styles.form_group}>
								<p className={styles.para}>Email</p>
								<input
									type="email"
									id="email"
									className={styles.input_form}
									value={this.state.email}
									onChange={(e) =>
										this.setState({ email: e.target.value })
									}
								/>
							</div>
							<div className={styles.form_group}>
								<p className={styles.para}>mobile</p>
								<input
									type="text"
									id="number"
									className={styles.input_form}
									value={this.state.mobile}
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
									id="birthday"
									placeholder="YYYY-MM-DD"
									className={styles.input_form}
									value={this.state.birthdate}
									onChange={(e) =>
										this.setState({
											birthdate: e.target.value,
										})
									}
								/>
							</div>
							<div
								className={styles.form_group_address}
								id="address"
							>
								<div className={styles.flex}>
									<p className={styles.para}>Address</p>
									<input
										type="text"
										id="address_form"
										className={styles.input_form_btn}
										value={this.state.address}
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
								<Link to="/">
									<button>cancel</button>
								</Link>
								<button onClick={this.submit}>submit</button>
							</div>{" "}
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default add_user;
