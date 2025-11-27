import React, { useState } from "react";
import Papa from "papaparse";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./TableStyles.css";
// Tipo_invenadro","cliente_sap",CALDAY fecha 
const CsvTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const allowedColumns = ["SKU","Descripcion","MATL_GRP_5","Precio_Farmacia"];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const columnMap = {
    SKU: "EAN",
    Descripcion: "Descripción",
    MATL_GRP_5: "Categoría",
    Precio_Farmacia: "Precio $"
  };


  const processData = () => {
    Papa.parse("/data/ShortDemo.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {

        const trimmedData = results.data.map(row =>
          allowedColumns.reduce((acc, col) => {
            const newKey = columnMap[col] || col;

            let value = row[col];

            if (col === "Precio_Farmacia") {
              const num = Number(value);

              if (!isNaN(num)) {
                value = new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                  minimumFractionDigits: 2
                }).format(num);
              } else {
                value = "$0.00";
              }
            }

            acc[newKey] = value;
            return acc;
          }, {})
        );


        console.log("DATA FINAL:", trimmedData);

        setData(trimmedData);
      }
    });
  };

  console.log("aqui los resultados", data)

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const visibleColumns = data[0]
  ? Object.keys(data[0]).filter(col => allowedColumns.includes(col))
  : [];

  console.log("Columnas visibles:", visibleColumns);


return (
  <>
    {/* PROCESAR - CONTENEDOR CENTRAL DE 1200px */}
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col xs="12">
          <div className="mx-auto">
            <button
              className="btn btn-secondary mb-3"
              onClick={() => processData()}
            >
              Procesar
            </button>
          </div>
        </Col>
      </Row>
    </Container>

    {/* SOLO SI HAY DATOS */}
    {data.length > 0 && (
      <Container fluid className="p-3">

        <Row className="justify-content-center">
          <Col xs="12">
            <div className="mx-auto">

              {/* BUSCADOR */}
              <input
                className="input-search mb-3"
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
              />

              {/* TABLA */}
              <Table hover className="table text-center">
                <thead>
                  <tr>
                    {data[0] &&
                      Object.keys(data[0]).map((col) => (
                        <th className="header-table" key={col}>
                          {col}
                        </th>
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
              <div className="pagination d-flex justify-content-center gap-2 mt-3">

                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="prev-next-btn btn btn-secondary"
                >
                  ⬅ Anterior
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`btn ${
                      currentPage === i + 1 ? "btn-dark" : "btn-outline-dark"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="prev-next-btn btn btn-secondary"
                >
                  Siguiente ➡
                </button>

              </div>

            </div>
          </Col>
        </Row>

      </Container>
    )}
  </>
);


};

export default CsvTable;
