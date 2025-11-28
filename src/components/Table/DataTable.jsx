import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const DataTable = ({ data }) => (
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
            {data.map((row, i) => (
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
);

export default DataTable;
