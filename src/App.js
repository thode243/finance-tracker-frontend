import React, { useEffect, useState } from "react";

function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const sheetUrl1 =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTilANX1979hvDvNATGeeMzC6tQqI1HaBgDH-EBCcqbPzwsu4XXQnvlE5NTuB8LRL5wqEs5C_CYkmG5/pub?gid=644891261&single=true&output=csv";

  const sheetUrl2 =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNwJgvnubofx1e9BU_P4mBeOk35UyL6SEgNAAAfe79rJMJg3KZrgYDZAzTe9fD5GIbxW1SmMp-2342/pub?gid=387463255&single=true&output=csv";

  useEffect(() => {
    const fetchData = (url, setData) => {
      fetch(url)
        .then((response) => response.text())
        .then((csvText) => {
          const rows = csvText.split("\n").map((row) => row.split(","));
          setData(rows);
        })
        .catch((error) => console.error("Error fetching Google Sheet:", error));
    };

    // Fetch immediately and every second
    fetchData(sheetUrl1, setData1);
    fetchData(sheetUrl2, setData2);
    const interval = setInterval(() => {
      fetchData(sheetUrl1, setData1);
      fetchData(sheetUrl2, setData2);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Google Sheet 1 (Updates every second)</h1>
      <Table data={data1} />

      <h1 style={{ marginTop: "40px" }}>Google Sheet 2 (Updates every second)</h1>
      <Table data={data2} />
    </div>
  );
}

function Table({ data }) {
  if (data.length === 0) return <p>Loading data...</p>;
  return (
    <table border="1" cellPadding="8">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
