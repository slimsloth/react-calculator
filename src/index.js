import React from "react";
import ReactDOM from "react-dom";

class CalculatorButton extends React.Component {
  render() {
    return (
      <button
        className={"button " + this.props.class}
        onClick={this.props.onClick}
        style={{
          display: "inline-block",
          height: "45px",
          width: "60px",
          backgroundColor: "#66ccff",
        }}
      >
        <p>{this.props.value}</p>
      </button>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      displayValue: "0",
      lastValue: 0,
      calculatorState: 1,
      currentOperator: null,
      expectingSecondNumber: false,
    };
    this.state = this.initialState;
  }

  addFloatingPoint(digit) {
    let displayValue = this.state.displayValue;
    if (displayValue.indexOf(".") === -1) {
      displayValue += ".";
    }
    this.setState({ displayValue: displayValue });
  }

  applyPercentage(digit) {
    let displayValue = this.state.displayValue;
    let noOfDecimalPlaces = 2;
    if (displayValue.includes(".")) {
      noOfDecimalPlaces += displayValue.substring(
        displayValue.indexOf(".") + 1
      ).length;
    }

    this.setState({
      displayValue: (displayValue / 100).toFixed(noOfDecimalPlaces),
    });
  }

  changeSign() {
    this.setState({ displayValue: this.state.displayValue * -1 });
  }

  enterDigit(digit) {
    if (
      this.state.calculatorState === 2 &&
      this.state.displayValue.length > 10
    ) {
      return;
    }
    let calculatorState = this.state.calculatorState;

    if (this.state.expectingSecondNumber || this.state.displayValue === "0") {
      this.setState({ displayValue: digit, expectingSecondNumber: false });
    } else {
      this.setState({ displayValue: this.state.displayValue + digit });
    }

    if (calculatorState === 1) {
      this.setState({ calculatorState: 2 });
    }
  }

  handleOperatorPress(operator) {
    let calculatorState = this.state.calculatorState;
    let displayValue = this.state.displayValue;
    let result = this.state.lastValue;
    let currentOperator = this.state.currentOperator;
    let lastValue = 0;

    if (calculatorState === 1) {
      return;
    } else {
      if (calculatorState === 2) {
        calculatorState = 3;
      }
      if (operator === "equals") {
        let resultAsString = result.toString();
        let resultNoOfDecimalPlaces = Math.max(
          resultAsString.substring(resultAsString.indexOf(".") + 1).length,
          displayValue.substring(displayValue.indexOf(".") + 1).length
        );

        switch (currentOperator) {
          case "plus":
            result += parseFloat(displayValue);
            break;
          case "minus":
            result -= parseFloat(displayValue);
            break;
          case "multiply":
            result *= parseFloat(displayValue);
            break;
          case "divide":
            result /= parseFloat(displayValue);
            break;
          default:
            return;
        }
        displayValue = result.toFixed(resultNoOfDecimalPlaces);
        currentOperator = null;
      } else {
        currentOperator = operator;
        lastValue = parseFloat(displayValue);
      }
    }

    this.setState({
      displayValue: displayValue,
      lastValue: lastValue,
      currentOperator: currentOperator,
      calculatorState: calculatorState,
      expectingSecondNumber: true,
    });
  }

  render() {
    return (
      <div>
        <div>
          <div style={{ fontSize: "30px" }}>{this.state.displayValue}</div>
        </div>
        <div>
          <div>
            <CalculatorButton
              value={"AC"}
              onClick={() => this.setState(this.initialState)}
            />
            <CalculatorButton
              value={"\u00B1"}
              onClick={() => this.changeSign()}
            />
            <CalculatorButton
              value={"%"}
              onClick={() => this.applyPercentage()}
            />
            <CalculatorButton
              value={"\u00F7"}
              onClick={() => this.handleOperatorPress("divide")}
            />
          </div>
          <div id="layer2">
            <CalculatorButton
              value={"7"}
              onClick={() => this.enterDigit("7")}
            />
            <CalculatorButton
              value={"8"}
              onClick={() => this.enterDigit("8")}
            />
            <CalculatorButton
              value={"9"}
              onClick={() => this.enterDigit("9")}
            />
            <CalculatorButton
              value={"x"}
              onClick={() => this.handleOperatorPress("multiply")}
            />
          </div>
          <div id="layer3">
            <CalculatorButton
              value={"4"}
              onClick={() => this.enterDigit("4")}
            />
            <CalculatorButton
              value={"5"}
              onClick={() => this.enterDigit("5")}
            />
            <CalculatorButton
              value={"6"}
              onClick={() => this.enterDigit("6")}
            />
            <CalculatorButton
              value={"-"}
              onClick={() => this.handleOperatorPress("minus")}
            />
          </div>
          <div id="layer4">
            <CalculatorButton
              value={"1"}
              onClick={() => this.enterDigit("1")}
            />
            <CalculatorButton
              value={"2"}
              onClick={() => this.enterDigit("2")}
            />
            <CalculatorButton
              value={"3"}
              onClick={() => this.enterDigit("3")}
            />
            <CalculatorButton
              value={"+"}
              onClick={() => this.handleOperatorPress("plus")}
            />
          </div>
          <div id="layer5">
            <CalculatorButton
              value={"0"}
              onClick={() => this.enterDigit("0")}
            />
            <CalculatorButton
              value={"."}
              onClick={() => this.addFloatingPoint()}
            />
            <CalculatorButton
              value={"="}
              onClick={() => this.handleOperatorPress("equals")}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById("root")
);
