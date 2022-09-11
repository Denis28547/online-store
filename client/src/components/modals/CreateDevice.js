import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const [info, setInfo] = useState([]);
  const [addDeviceInfo, setAddDeviceInfo] = useState({
    name: "",
    price: 0,
    img: null,
  });

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((info) => info.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "img") {
      value = e.target.files[0];
    }

    setAddDeviceInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const addDevice = () => {
    const { name, price, img } = addDeviceInfo;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("img", img);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then(() => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Input name of device"
            value={addDeviceInfo.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Input price"
            type="number"
            value={addDeviceInfo.price === 0 ? "" : addDeviceInfo.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />
          <Form.Control
            className="mt-3"
            type="file"
            name="img"
            onChange={(e) => handleChange(e)}
          />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new property
          </Button>
          {info.map((info) => (
            <Row className="mt-3" key={info.number}>
              <Col md={4}>
                <Form.Control
                  placeholder="Name"
                  value={info.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, info.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Description"
                  value={info.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, info.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(info.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
