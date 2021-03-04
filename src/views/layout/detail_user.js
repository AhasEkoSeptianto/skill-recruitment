import React, { Fragment } from "react";

import styles from "./../../assets/css/detail_user.module.css";

import axios from "axios";

import { Link } from "react-router-dom";

class add_user extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			name: "",
			email: "",
			mobile: "",
			birthday: "",
			address: "",
			fetch: true,
		};
	}

	async componentDidMount() {
		console.log(this.props.location.state.id);
		let data = {
			id: this.props.location.state.id,
		};

		axios.post("http://localhost:8000/detail", data).then(async (res) => {
			this.setState({ id: res.data.result.id });
			this.setState({ name: res.data.result.nama });
			this.setState({ email: res.data.result.email });
			this.setState({ mobile: res.data.result.mobile });
			this.setState({ birthday: res.data.result.birthday });
			this.setState({ address: res.data.result.Adress });
			this.setState({ fetch: false });
			this.changeBirthday();
		});
	}

	changeBirthday = () => {
		let doc = this.state.birthday;
		let tanggal = doc.split("-")[2];
		let bulan = doc.split("-")[1];
		let tahun = doc.split("-")[0];
		console.log("tgl = ", tanggal);
		console.log("bln = ", bulan);
		console.log("tahun = ", tahun);
		switch (bulan) {
			case "01": {
				bulan = "January";
				break;
			}
			case "02": {
				bulan = "February";
				break;
			}
			case "03": {
				bulan = "Maret";
				break;
			}
			case "04": {
				bulan = "April";
				break;
			}
			case "05": {
				bulan = "Mei";
				break;
			}
			case "06": {
				bulan = "Juni";
				break;
			}
			case "07": {
				bulan = "Juli";
				break;
			}
			case "08": {
				bulan = "Agustus";
				break;
			}
			case "09": {
				bulan = "September";
				break;
			}
			case "10": {
				bulan = "Oktober";
				break;
			}
			case "11": {
				bulan = "November";
				break;
			}
			case "12": {
				bulan = "Desember";
				break;
			}
		}
		let result = tanggal + " " + bulan + " " + tahun;
		this.setState({ birthday: result });
	};

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
								<p className={styles.para}>ID</p>
								<p className={styles.input_form}>
									{this.state.id}
								</p>
							</div>
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
								<p className={styles.para}>birthday</p>
								<p className={styles.input_form}>
									{this.state.birthday}
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
