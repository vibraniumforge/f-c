import React from "react";
import TemperatureInput from "./tempinput.js";
import BoilingVerdict from "./boilverdict.js";

// const scaleNames = {
//   c: "Celsius",
//   f: "Farenheit"
// };

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      scale: "c"
    };
    this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.tryConvert = this.tryConvert.bind(this);
    this.toFarenheit = this.toFarenheit.bind(this);
    this.toCelsius = this.toCelsius.bind(this);
  }

  toCelsius(farenheit) {
    return ((farenheit - 32) * 5) / 9;
  }

  toFarenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFarenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f"
        ? this.tryConvert(temperature, this.toCelsius)
        : temperature;
    const farenheit =
      scale === "c"
        ? this.tryConvert(temperature, this.toFarenheit)
        : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={farenheit}
          onTemperatureChange={this.handleFarenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator;
