import './App.css';
import logo from './openaimicrosoft.jpg';
import React, { useState } from "react";

const App = () => {
  const [fields, setFields] = useState([
    { smallText: "", largeText: "" },
  ]);
  const [results, setResults] = useState([]);
  const [results1, setResults1] = useState([]);

  const handleChange = (e, index) => {
    const values = [...fields];
    if (e.target.name === "smallText") {
      values[index].smallText = e.target.value;
    } else {
      values[index].largeText = e.target.value;
    }

    setFields(values);
  };

  const handleAddFields = () => {
    const values = [...fields];
    values.push({ smallText: "", largeText: "" });
    setFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = fields.map((field) => {
      return {
        smallText: field.smallText,
        largeText: field.largeText,
      };
    });
    //const newResults = [...results];
    const newconsolidatedtext = [];
    const newCitations = [];

    data.forEach(async (field) => {

      newconsolidatedtext.push(field.smallText);
      newCitations.push(field.largeText);

      })

    const concatenatedArray = newconsolidatedtext.join(" ");

    const response = await fetch('https://xxxxxxxx.openai.azure.com/openai/deployments/textdavinci003/completions?api-version=2022-12-01', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'xxxxxxxxxxxxxxxxxxxxxxxxx'
      },
      body: JSON.stringify({
        "prompt": "Summarize the following text:\n\n" + concatenatedArray,
        "max_tokens": 1000
      }),
    });
    const response1 = await response.json();
    const apiresp = [];
    apiresp.push(response1.choices[0].text);
    setResults(apiresp);
    setResults1(newCitations);

  };

  return (
    <>
      
      <div className="App">
        <br /><br />
        <img src={logo} alt="Logo" width={400} height={50} />
      </div>
      <h1>Summarization Demo</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => {
          return (
           <div> 
              <p> Input {index} </p>
            <div  key={`${field}-${index}`}>
              <input
                type="text"
                name="smallText"
                placeholder="Enter the data to for summarization"
                value={field.smallText}
                onChange={(e) => handleChange(e, index)}
              />
              <input className="input"
                type="text"
                name="largeText"
                placeholder="Enter the citation"
                value={field.largeText}
                onChange={(e) => handleChange(e, index)}
              />
                <p> -------- </p>
            </div>
            </div> 
          );
        })}
        <button type="button" onClick={handleAddFields}>
          Add Field
        </button>
        <button type="submit">Submit</button>
      </form>
      <p> Summarization: </p>
      <div>
        {results.map((result, index) => {
          return (
            <div> 
           
            <div key={`${result}-${index}`}>
              <p> {result} </p>
              <p></p>
            </div>
            </div>
          );
        })}
      </div>
      <p>Citations: </p>
      <div>
        {results1.map((result1, index) => {
          return (
            <div key={`${result1}-${index}`}>
              <p> * {result1} </p>
              <p></p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
