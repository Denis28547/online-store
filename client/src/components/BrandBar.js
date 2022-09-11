import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import { Card, Col, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Col>
          <Card
            key={brand.id}
            className="p-3"
            style={{ cursor: "pointer" }}
            border={brand.id === device.selectedBrand.id ? "danger" : "light"}
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
