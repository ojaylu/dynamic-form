import './App.css';
import { Select } from "antd";
import { useState } from "react";

const indicatorOptions = {
  macd: {a: 0, b: 0},
  rsi: {a: 0, b: 0}
}

const selectOptions = Object.keys(indicatorOptions).map(value => ({
  label: value, value: value
}));

function App() {
  const [indicators, setIndicators] = useState([]);
  const [value, setValue] = useState(null);

  const handleAddIndicator = selectedIndicator => {
    setIndicators(currentList => {
      const values = [...currentList];
      values.push({
        indicator: selectedIndicator, ...indicatorOptions[selectedIndicator]
      });
      return values;
    });
    setValue(null);
  };

  const handleRemovePlayers = (index) => {
    setIndicators(currentList => {
      const values = [...currentList];
      values.splice(index, 1);
      return values;
    })
  };

  const handleInputChange = (index, e) => {
    setIndicators(currentList => {
      const values = [...currentList];
      const updatedField = e.target.name;
      values[index][updatedField] = e.target.value;
      return values;
    })
  };

  const handleSubmit = () => {
    console.log(indicators);
  };

  return (
    <>
      <Select
        onSelect={handleAddIndicator}
        options={selectOptions}
        value={value}
      />
      <>
        {indicators.map((indicator, outerIndex) => (
          <div style={{display: "flex"}} key={outerIndex}>
            {Object.keys(indicator).map((field, innerIndex) => (
              field == "indicator"? 
                <p key={`${outerIndex}-${innerIndex}`}>{indicator[field]}</p>: 
                <input name={field} onChange={e => handleInputChange(outerIndex, e)} placeholder={field} key={`${outerIndex}-${innerIndex}`} />
            ))}
            <button onClick={() => handleRemovePlayers(outerIndex)} key={outerIndex}>Remove</button>
          </div>
        ))}
      </>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default App;
