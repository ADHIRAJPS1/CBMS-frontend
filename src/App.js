import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ClientBusiness from "./pages/clientBussiness/ClientBusiness";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./utils/NotFound";

import { Alert, createTheme, ThemeProvider } from "@mui/material";

import { LOGOUT } from "./redux/actions/actionTypes";
import { loadUser } from "./redux/actions/auth.actions";
import { useEffect } from "react";
import setAuthToken from "./services/setAuthToken";
import Promocode from "./pages/promocode/Promocode";
import ClientCampaigns from "./pages/campaigns/ClientCampaigns";
import Users from "./pages/users/Users";
import Banners from "./pages/banners/Banners";

const theme = createTheme({
	palette: {
		primary: {
			main: "#366925",
		},
		secondary: {
			main: "#a8c76a",
		},
	},
});

const App = () => {
	useEffect(() => {
		// check for token in LS when app first runs
		if (localStorage.token) {
			// if there is a token set axios headers for all requests
			setAuthToken(localStorage.token);
		}

		// try to fetch a user, if no token or invalid token we
		// will get a 401 response from our API
		store.dispatch(loadUser());

		//log user out from all tabs if they log out in one tab
		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				

				<Router>
					<Routes>
						
						<Route path='/login' element={<Login />} />

						<Route path='/' element={<Layout />}>
							<Route
								index
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
							<Route
								path='/users'
								element={
									<PrivateRoute>
										<Users />
									</PrivateRoute>
								}
							/>
							<Route
								path='client-business'
								element={
									<PrivateRoute>
										<ClientBusiness />
									</PrivateRoute>
								}
							/>
							<Route
								path='client-promocode'
								element={
									<PrivateRoute>
										<Promocode />
									</PrivateRoute>
								}
							/>
							<Route
								path='client-campaign'
								element={
									<PrivateRoute>
										<ClientCampaigns />
									</PrivateRoute>
								}
							/>
							<Route
								path='banners'
								element={
									<PrivateRoute>
										<Banners />
									</PrivateRoute>
								}
							/>
						</Route>
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</Router>

			</Provider>
		</ThemeProvider>
	);
};

export default App;
