import React, { useState } from "react";
import Papa from "papaparse";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CustomerInfo from "./CustomerInfo";
import ProcessButton from "./ProcessButton";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import Totals from "./Totals";
import Pagination from "./Pagination";

import "./TableStyles.css";

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customerData, setCustomerData] = useState({});
  const rowsPerPage = 10;

  const allowedColumns = ["SKU", "Descripcion", "MATL_GRP_5", "Precio_Farmacia"];

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

  return (
    <>
      <Container fluid className="mt-3">

        {data.length > 0 && (
          <CustomerInfo customerData={customerData} />
        )}

        <ProcessButton processData={processData} />

      </Container>

      {data.length > 0 && (
        <Container fluid className="p-3">

          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            setCurrentPage={setCurrentPage}
          />

          <DataTable data={currentRows} />

          <Totals items={filteredData.length} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            goToNextPage={() => setCurrentPage(prev => prev + 1)}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      )}
    </>
  );
};

export default CsvTable;
