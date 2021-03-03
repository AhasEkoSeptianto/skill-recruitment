import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Index from "./views/layout/index";
import Add_user from "./views/layout/add_user";
import Edit_user from "./views/layout/edit_user";
import Delete_user from "./views/layout/delete_user";
import Detail_user from "./views/layout/detail_user";

function router() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Index} />
				<Route exact path="/add-user" component={Add_user} />
				<Route exact path="/edit-user" component={Edit_user} />
				<Route exact path="/delete-user" component={Delete_user} />
				<Route exact path="/detail-user" component={Detail_user} />
			</Switch>
		</Router>
	);
}

export default router;
