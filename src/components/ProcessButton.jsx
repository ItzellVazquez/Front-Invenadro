import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProcessButton = ({ processData }) => (
  <Row>
    <Col xs="12" md="6" lg="4" className="text-start">
      <button className="btn btn-process" onClick={processData}>
        Procesar
      </button>
    </Col>
  </Row>
);

export default ProcessButton;
