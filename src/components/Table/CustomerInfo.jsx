import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CustomerInfo = ({ customerData }) => (
  <Row className="justify-content-center">
    <Col xs="12" md="8" lg="6" className="text-center">
      <p className="customer-info">
        {customerData.customerId || "N/A"} — Actualizado el{" "}
        {customerData.date || "N/A"}
      </p>
    </Col>
  </Row>
);

export default CustomerInfo;
