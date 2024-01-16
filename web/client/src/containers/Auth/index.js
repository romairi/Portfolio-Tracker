import PropTypes from "prop-types";
import { buildClassName } from "../../services/buildClassName";

import "./index.scss";

function Auth({ className, children }) {
  return (
    <div className={buildClassName(["base-auth-form", className])}>
      {children}
    </div>
  );
}

Auth.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Auth.defaultProps = {
  className: null,
  children: null,
};

export default Auth;
