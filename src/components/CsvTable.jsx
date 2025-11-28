import Papa from "papaparse";
import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import CustomerInfo from "./Table/CustomerInfo";
import FiltersBar from "./Filters/FiltersBar";
import DataTable from "./Table/DataTable";
import Pagination from "./Table/Pagination";
import ProcessButton from "./Table/ProcessButton";
import Totals from "./Table/Totals";


import "./Table/TableStyles.css";

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customerData, setCustomerData] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("");
  // const [priceFilter, setPriceFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  const rowsPerPage = 10;

  const allowedColumns = ["SKU", "Descripcion", "CATEGORIA_MATERIALES", "Precio_Farmacia", "PIEZAS_PRONOSTICO", "PRONOSTICO"];

  const columnMap = {
    SKU: "EAN",
    Descripcion: "Descripción",
    CATEGORIA_MATERIALES: "Categoría",
    Precio_Farmacia: "Precio $",
    PIEZAS_PRONOSTICO: "Óptimo",
    PRONOSTICO: "Total",
  };

  const processData = () => {
    Papa.parse("/data/LongDemo.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Resultados",results.data[0])
        setCustomerData({
          customerId: results.data[0].CFG_CLIENTE_SAP,
          date: new Date(
            `${results.data[0].CALDAY.toString().slice(0, 4)}-${results.data[0].CALDAY.toString().slice(4, 6)}-${results.data[0].CALDAY.toString().slice(6, 8)}`
          ).toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        });

        const trimmedData = results.data.map((row) =>
          allowedColumns.reduce((acc, col) => {
            const newKey = columnMap[col] || col;
            let value = row[col];

            if (col === "Precio_Farmacia" || col === "PRONOSTICO") {
              const num = Number(value);
              value = !isNaN(num)
                ? new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                    minimumFractionDigits: 2,
                  }).format(num)
                : "$0.00";
            }

            acc[newKey] = value;
            return acc;
          }, {})
        );

        setData(trimmedData);
      },
    });
  };

  // ----------------------------
  // FILTROS
  // ----------------------------
  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    const matchesCategory =
      categoryFilter === "" || row["Categoría"] === categoryFilter;

    const numericPrice = Number(row["Precio $"].replace(/[^\d.-]+/g, ""));

    // const matchesPrice =
//   priceFilter === "" ||
//   row["Precio $"].replace(/[^\d.-]+/g, "").startsWith(priceFilter);


    const matchesRange =
      (priceRange.min === 0 || numericPrice >= priceRange.min) &&
      (priceRange.max === 0 || numericPrice <= priceRange.max);

      return (
      matchesSearch &&
      matchesCategory &&
      // matchesPrice &&
      matchesRange
    );

  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const categories = [...new Set(data.map((item) => item["Categoría"]))];

  // ----------------------------
  // FIX: SI UNA PÁGINA NO EXISTE → REGRESA A 1
  // ----------------------------
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  console.log(data)


  return (
    <>
      <Container fluid className="mt-3">
        {data.length > 0 && <CustomerInfo customerData={customerData} />}
        <ProcessButton processData={processData} />
      </Container>

      {data.length > 0 && (
        <Container fluid className="p-3">

        <FiltersBar
          searchText={searchText}
          setSearchText={setSearchText}
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setCurrentPage={setCurrentPage}

          // priceFilter={priceFilter}
          // setPriceFilter={setPriceFilter}
        />

          <DataTable data={currentRows} />

          <Totals items={filteredData.length} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPreviousPage={() => setCurrentPage((prev) => prev - 1)}
            goToNextPage={() => setCurrentPage((prev) => prev + 1)}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      )}
    </>
  );
};

export default CsvTable;
