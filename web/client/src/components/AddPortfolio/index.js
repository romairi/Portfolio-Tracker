import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { buildClassName } from "../../services/buildClassName";

import "./index.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddPortfolio = ({
  onAddPortfolioClicked,
  className,
  toolbarError,
  portfolioName,
  isModalOpen,
  handleOpen,
  handleClose,
  setPortfolioName,
}) => {
  const handleSavePortfolioClicked = () => onAddPortfolioClicked(portfolioName);
  const handleTextChange = (e) => setPortfolioName(e.target.value);

  return (
    <div className={buildClassName(["add-portfolio", className])}>
      <Button className="add-portfolio-btn" onClick={handleOpen}>
        <span className="span-portfolio-title">Add portfolio</span>
        <AddCircleIcon className="add-portfolio-icon" />
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-content">
            <TextField
              className="portfolio-textfield"
              label="portfolio name"
              variant="outlined"
              onChange={handleTextChange}
              value={portfolioName}
              InputProps={{ style: { height: 60, fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              error={!!toolbarError}
              helperText={toolbarError}
            />
            <div className="modal-group-btn">
              <Button
                className="modal-save-btn"
                variant="contained"
                onClick={handleSavePortfolioClicked}
              >
                save
              </Button>
              <Button
                className="modal-cancel-btn"
                variant="contained"
                onClick={handleClose}
              >
                cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddPortfolio;
