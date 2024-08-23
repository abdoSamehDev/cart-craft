import { isAuthenticated } from "../store/localStore";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element | null;
};

const PrivateRouter = ({ children }: Props) => {
  const isAdmin: boolean = isAuthenticated();
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

export default PrivateRouter;
