import React, { Fragment } from "react";

// mycss
import styles from "./../../assets/css/index.module.css";

// logo sort
import Sort from "./../../assets/image/sort.svg";
import Next from "./../../assets/image/next.svg";
import NextOneStrips from "./../../assets/image/next_onestrip.svg";

// axios ajax
import Axios from "axios";

//
import { Link } from "react-router-dom";

class index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all_users: [],
			fetch: true,
			status: "",
		};
	}

	async componentDidMount() {
		Axios.get("https://api-skill-js.herokuapp.com/users").then(
			async (res) => {
				this.setState({ all_users: res.data.all_users });
				this.setState({ status: "is empty" });
			}
		);
	}

	sortByName = () => {
		console.log(this.state.all_users);
		this.state.all_users.sort(function (a, b) {
			return a.nama.localeCompare(b.nama);
		});
	};

	render() {
		let perpages = [5, 10, 15, 20];
		return (
			<div className={styles.container}>
				{/* component header */}
				<div className={styles.header_components}>
					<div className={styles.header_left}>
						<h1>List Employer</h1>
					</div>
					<div className={styles.header_right}>
						<div className={styles.toright}>
							<input
								type="text"
								placeholder="Search by ID, name, or email"
							/>
							<button className={styles.seacrh_button}>
								search
							</button>
							<Link to="/add-user">
								<button className={styles.add_button}>
									add
								</button>
							</Link>
						</div>
					</div>
				</div>
				{/* end component header */}

				{/* table list */}
				<table className={styles.table_container}>
					<tr className={styles.table_header}>
						<th className={styles.delete_border_left}>
							<span>ID</span>
							<img src={Sort} alt="none" />
						</th>
						<th>
							<span>Name</span>
							<img
								src={Sort}
								alt="none"
								onClick={this.sortByName}
							/>
						</th>
						<th>
							<span>Email</span>
							<img src={Sort} alt="none" />
						</th>
						<th>
							<span>Mobile</span>
							<img src={Sort} alt="none" />
						</th>
						<th className={styles.optionActionDisplay}>Action</th>
					</tr>
					{this.state.all_users.length < 1 ? (
						<p>{this.state.status}</p>
					) : (
						this.state.all_users.map((res, index) => (
							<Fragment>
								<tr>
									<td className={styles.delete_border_left}>
										{index + 1}
									</td>
									<td>{res.nama}</td>
									<td>{res.email}</td>
									<td>{res.mobile}</td>
									<td className={styles.row_actions}>
										<Link
											to={{
												pathname: "/detail-user",
												state: { id: res._id },
											}}
										>
											<button
												className={
													styles.button_actions
												}
											>
												detail
											</button>
										</Link>
										<Link
											to={{
												pathname: "/edit-user",
												state: { id: res._id },
											}}
										>
											<button
												className={
													styles.button_actions
												}
											>
												edit
											</button>
										</Link>
										<Link
											to={{
												pathname: "/delete-user",
												state: { id: res._id },
											}}
										>
											<button
												className={
													styles.button_actions
												}
											>
												delete
											</button>
										</Link>
									</td>{" "}
								</tr>
							</Fragment>
						))
					)}
				</table>
				{/* end table list */}

				{/* footer options */}

				<div className={styles.footer_container}>
					<p>show</p>
					<select
						name="perpages"
						id="pages"
						className={styles.perpages}
					>
						{perpages.map((value) => (
							<option value="">{value}</option>
						))}
					</select>
					<p>per pages</p>
					<img
						src={Next}
						className={styles.arrow_to_first}
						alt="none"
					/>
					<img
						src={NextOneStrips}
						className={styles.arrow_to_prev}
						alt="none"
					/>
					<p className={styles.info_perpages}>page 1 of 1 </p>
					<img
						src={NextOneStrips}
						className={styles.arrow_to_next}
						alt="none"
					/>
					<img src={Next} alt="none" />
				</div>

				{/* end footer options */}
			</div>
		);
	}
}

export default index;
