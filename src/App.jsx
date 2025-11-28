import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./App.css";
import CsvTable from "./components/CsvTable";

function App() {

  return (
    <>
    <Container fluid className="mt-5 p-3">
      <Row className="text-center align-items-center">
        <Col className="d-flex justify-content-start">
          <img src="src/assets/InveNadro.svg" alt="InveNadro Logo" width="45" />
        </Col>

        <Col className="d-flex justify-content-center">
          <h1>InveNadro</h1>
        </Col>

        <Col className="d-flex justify-content-end">
          <img src="src/assets//textInveNadro.svg" alt="textInveNadro Logo" width="200" />
        </Col>
      </Row>
    </Container>
    <Container fluid className="p-3">
      <Row className="text-center align-items-center">
        <CsvTable />
      </Row>
    </Container>
    </>
  )
}

export default App
