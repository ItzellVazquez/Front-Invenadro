import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./TableStyles.css";
import Papa from "papaparse";

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const processDataCsv = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        setCurrentPage(1);
      }
    });
  };

  // FILTRO
  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  // PAGINACIÓN LÓGICA
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>

      <input type="file" accept=".csv" onChange={processDataCsv} />

      <br /><br />

      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <br /><br />

      <Table hover className="table">
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((col) => (
                <th className="header-table" key={col}>{col}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {currentRows.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* PAGINACIÓN */}
      {data.length === 0 ? <></>
      :
      <div className="pagination">
        <button 
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="prev-next-btn"
          >
          ⬅ Anterior
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
            >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="prev-next-btn"
          >
          Siguiente ➡
        </button>
      </div>
      }
    </div>
  );
};

export default CsvTable;
