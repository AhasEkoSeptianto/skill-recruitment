import React, { Fragment } from "react";

import styles from "./../../assets/css/detail_user.module.css";

import axios from "axios";

import { Link } from "react-router-dom";

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
		};
	}

	async componentDidMount() {
		console.log(this.props.location.state.id);
		let data = {
			id: this.props.location.state.id,
		};

		axios
			.post("https://api-skill-js.herokuapp.com/detail", data)
			.then(async (res) => {
				this.setState({ name: res.data.result.nama });
				this.setState({ email: res.data.result.email });
				this.setState({ mobile: res.data.result.mobile });
				this.setState({ birthdate: res.data.result.birthday });
				this.setState({ address: res.data.result.Adress });
				this.setState({ fetch: false });
				console.log(this.state.user);
			});
	}

	render() {
		return (
			<div className={styles.container}>
				<h1>Detail Employee</h1>
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
							<div className={styles.submit_button}>
								<Link to="/">
									<button>back to home</button>
								</Link>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default add_user;
