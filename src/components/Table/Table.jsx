import React, { useState } from "react";
import "./TableStyles.css";
import Papa from "papaparse";

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const processDataCsv = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
      }
    });
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );
      console.log("data",data);

      console.log("filteredData",filteredData);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cargar CSV y filtrar</h2>

      <input type="file" accept=".csv" onChange={processDataCsv} />

      <br /><br />

      <input
        type="text"
        placeholder="Filtrar..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <br /><br />
      <table hover className="table">
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((col) => <th className="header-table" key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;
