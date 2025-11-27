import React, { useState } from "react";
import Papa from "papaparse";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./TableStyles.css";

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const allowedColumns = ["SKU", "Descripcion", "MATL_GRP_5", "Precio_Farmacia"];
  const [currentPage, setCurrentPage] = useState(1);
  const [customerData, setCustomerData] = useState({});
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

        // INFO DEL CLIENTE
        setCustomerData(prev => ({
          ...prev,
          customerId: results.data[0].CFG_CLIENTE_SAP,
          date: new Date(
            `${results.data[0].CALDAY.toString().slice(0, 4)}-${results.data[0].CALDAY.toString().slice(4, 6)}-${results.data[0].CALDAY.toString().slice(6, 8)}`
          ).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        }));

        // TRATAMIENTO DE COLUMNAS
        const trimmedData = results.data.map(row =>
          allowedColumns.reduce((acc, col) => {
            const newKey = columnMap[col] || col;
            let value = row[col];

            if (col === "Precio_Farmacia") {
              const num = Number(value);
              value = !isNaN(num)
                ? new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                    minimumFractionDigits: 2
                  }).format(num)
                : "$0.00";
            }

            acc[newKey] = value;
            return acc;
          }, {})
        );

        setData(trimmedData);
      }
    });
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
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

return (
  <>
    <Container fluid className="mt-3">

      {/* DATOS DEL CLIENTE — AL CENTRO */}
      {data.length > 0 && (
        <Row className="justify-content-center">
          <Col xs="12" md="8" lg="6" className="text-center">
            <p className="customer-info">
              {customerData.customerId || "N/A"} — Actualizado el{" "}
              {customerData.date || "N/A"}
            </p>
          </Col>
        </Row>
      )}

      {/* BOTÓN PROCESAR — IZQUIERDA */}
      <Row>
        <Col xs="12" md="6" lg="4" className="text-start">
          <button
            className="btn btn-process"
            onClick={processData}
          >
            Procesar
          </button>
        </Col>
      </Row>

    </Container>

    {/* TABLA + BUSCADOR */}
    {data.length > 0 && (
      <Container fluid className="p-3">

        {/* INPUT BUSCAR — IZQUIERDA */}
        <Row>
          <Col xs="12" md="6" lg="4" className="text-start">
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
          </Col>
        </Row>

        {/* TABLA — CENTRADA (1200px) */}
        <Row className="justify-content-center">
          <Col xs="12">
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
                        <td className="data" key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        {/* PAGINACIÓN — CENTRO */}
        <Row className="justify-content-center mt-3">
          <Col xs="12" className="text-center">
            <div className="d-flex justify-content-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="btn btn-arrow"
              >
                ⟵ Anterior
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn ${
                    currentPage === i + 1 ? "btn-pagination-active" : "btn-pagination-inactive"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="btn btn-arrow"
              >
                Siguiente ⟶
              </button>
            </div>
          </Col>
        </Row>

      </Container>
    )}
  </>
);

};

export default CsvTable;
