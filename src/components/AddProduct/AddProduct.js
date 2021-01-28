import React, { useContext, useState, useEffect } from "react";
import "./AddProduct.css";
import { GlobalContext } from "../../context/GlobalState";
import { Alert, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import ProductList from "../ProductsList/ProductsList";

const AddProduct = (props) => {
  const { addProduct, editProduct } = useContext(GlobalContext);

  //use state hooks to manage data of product
  const [rowno, setRowno] = useState(21);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [variant, setVariant] = useState([]);

  //temporary store of variantname - this variable is used when adding variants
  let variantName;

  //retrieve the product information and place it in the edit modal
  useEffect(() => {
    if (props.useInEdit) {
      setName(props.find_item.name);
      setDesc(props.find_item.desc);
      setPrice(props.find_item.price);
      setVariant(props.find_item.variant);
    }
  }, []);

  //To handle alerts
  let [active, setActive] = useState(false);

  //add value to variant useState
  const addVariant = () => {
    setVariant([
      ...variant,
      {
        variant_id: variant.length + 1,
        variant_name: variantName,
      },
    ]);
  };

  //Executed when submit in Add Feature and Edit Feature
  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: rowno,
      name,
      desc,
      price: Number(price),
      qty: 1,
      variant,
    };

    //If the submit event did not came from Edit Feature
    if (!props.useInEdit) {
      setRowno(rowno + 1);
      addProduct(newItem);
    }
    //The submit came from Edit Feature
    else {
      const editItem = {
        id: props.find_item.id,
        name,
        desc,
        price: Number(price),
        qty: 1,
        variant,
      };
      editProduct(editItem);
    }

    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="container pt-4">
        <h1>{!props.useInEdit ? "Add Product" : ""}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="desc">Product Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="desc">Add Variants</label>
            <Row>
              <Col sm={8}>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => (variantName = e.target.value)}
                />
              </Col>
              <Col sm={2}>
                <Button variant="info" onClick={addVariant} block>
                  ADD
                </Button>
              </Col>
              <Col sm={2}>
                <Button variant="danger" onClick={() => setVariant([])} block>
                  RESET
                </Button>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col>
                <ButtonGroup>
                  {variant &&
                    variant.map((variant) => {
                      return (
                        <Button key={variant.variant_id} variant="outline-dark">
                          {variant.variant_name}
                        </Button>
                      );
                    })}
                </ButtonGroup>
              </Col>
            </Row>
          </div>

          <Button type="submit" className="btn btn-primary" block>
            SUBMIT
          </Button>
        </form>
        <Alert show={active} variant="success">
          Your Product has been added
        </Alert>
        <br></br>
        <br></br>
        {!props.useInEdit ? <ProductList for="edit" /> : null}
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
