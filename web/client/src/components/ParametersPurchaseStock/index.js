import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import "./index.scss";

const ParametersPurchaseStock = ({
  onRemoveClicked,
  quantity,
  price,
  date,
  handlePriceChange,
  handleQuantityChange,
  handleDateChange,
}) => {
  return (
    <div className="parameters-purchase-stock">
      <TextField
        className="parameters-purchase-stock-input quantity-input"
        label="quantity"
        type="number"
        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
        value={quantity}
        InputProps={{
          startAdornment: (
            <RemoveIcon
              color="secondary"
              onClick={() => handleQuantityChange(quantity - 1)}
            />
          ),
          endAdornment: (
            <AddIcon
              color="primary"
              onClick={() => handleQuantityChange(quantity + 1)}
            />
          ),
        }}
      />
      <TextField
        className="parameters-purchase-stock-input"
        type="number"
        label="Purchase price"
        value={price}
        variant="outlined"
        onChange={(e) =>
          handlePriceChange(Math.max(parseFloat(e.target.value), 0))
        }
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Purchase date"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button className="remove-btn-purchase-stock" onClick={onRemoveClicked}>
        <DeleteIcon fontSize="large" />
      </Button>
    </div>
  );
};

export default ParametersPurchaseStock;
