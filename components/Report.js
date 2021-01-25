import React, { useReducer } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useGetCurrency } from "./../pages/api/exchangeRate";
import Alert from "@material-ui/lab/Alert";

export function Report(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    root: {
      padding: theme.spacing(3, 2),
    },
    container: {
      display: "flex",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

  const [currencyType, setCurrencyType] = React.useState("CAD");
  const { data } = useGetCurrency({ currency: currencyType });

  const defaultForm = {
    amount: "",
    description: "",
  };
  const [alert, setAlert] = React.useState(false);
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultForm
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let existingReports = localStorage.getItem("reports")
      ? JSON.parse(localStorage.getItem("reports"))
      : [];

    if (existingReports.length < 6) {
      localStorage.setItem(
        "reports",
        JSON.stringify([...existingReports, formInput])
      );
    } else {
      setAlert(true);
    }

    setFormInput(defaultForm);
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Submit Your Expense
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "400px" }}
        >
          {alert && (
            <Alert variant="outlined" severity="error">
              You have already submitted 5 reports
            </Alert>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={currencyType === "CAD"}
                onChange={() => {
                  setCurrencyType((prev) => {
                    if (prev === "CAD") return "USD";
                    else return "CAD";
                  });
                }}
                name="Select Currency Type"
                inputProps={{ "aria-label": "Select Currency Type" }}
              />
            }
            label={`Currency : ${currencyType}`}
          />
          <TextField
            label="Description"
            id="description"
            name="description"
            fullWidth
            defaultValue={formInput.description}
            className={classes.textField}
            required
            value={formInput.description}
            onChange={handleInput}
          />

          <TextField
            label="Amount"
            id="margin-normal"
            name="amount"
            fullWidth
            value={formInput.amount}
            type="number"
            helperText={
              currencyType !== "CAD"
                ? data?.rates && data.rates.CAD * Number(formInput.amount)
                : null
            }
            defaultValue={formInput.amount}
            required
            className={classes.textField}
            onChange={handleInput}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit Expense
          </Button>
        </form>
      </Paper>
    </div>
  );
}
