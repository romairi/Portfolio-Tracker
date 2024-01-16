import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getAllPortfoliosAction } from "../../redux/reducers/PortfoliosReducer/actions";

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const fetchedDataFlag = useSelector((state) => state.fetchedDataFlag);

  if (!fetchedDataFlag) {
    dispatch(getAllPortfoliosAction());
  }

  return children;
};

export default ProtectedPage;
