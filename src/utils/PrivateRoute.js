import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();

	const { isAuthenticated } = useSelector((state) => state.authReducer);
	return isAuthenticated ? children : navigate("/login");
};

export default PrivateRoute;
