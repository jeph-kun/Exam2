import React, { useContext, useState } from "react";
import "./Product.css";
import { Card, Button, Alert, ButtonGroup } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";
import EditModal from "./EditModal";

const Product = (props) => {
  const { addToCart, removeFromCart, deleteProduct } = useContext(
    GlobalContext
  );

  const { items } = useContext(GlobalContext);
  const { cart } = useContext(GlobalContext);

  let [active, setActive] = useState(false);
  let [activeError, setActiveError] = useState(false);

  //To Handle edit modal
  const [modalShow, setModalShow] = React.useState(false);
  const { variant } = props.item;

  //ADD TO CART
  function addCart(id) {
    let flag = 1;
    cart.forEach((item) => {
      if (item.id === id && item.qty === 20) {
        flag = 0;
      }
    });
    if (flag) {
      const findItem = items.find((item) => item.id === id);

      addToCart(findItem);
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 1000);
    } else {
      setActiveError(true);
      setTimeout(() => {
        setActiveError(false);
      }, 1000);
    }
  }

  //REMOVE PRODUCT

  const deleteItem = () => {
    deleteProduct(props.item.id);
  };

  return (
    <>
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item_id={props.item.id}
      />

      <Card
        className="main__card"
        style={{
          width: "20rem",
        }}
      >
        <Card.Body>
          <Card.Img variant="top" src={"img/merchandise.png"} />
          <Card.Title>{props.item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ₱ {props.item.price}
          </Card.Subtitle>
          <Card.Text>
            {props.from === "cart" ? (
              <React.Fragment></React.Fragment>
            ) : (
              props.item.desc
            )}
          </Card.Text>
          {props.from === "cart" ? (
            <Card.Text>Quantity : {props.item.qty}</Card.Text>
          ) : (
            <React.Fragment>
              <Card.Text className="mb-2 text-muted">Variants</Card.Text>
              <ButtonGroup vertical>
                {variant.map((variance) => {
                  return (
                    <Button key={variance.variant_id} variant="outline-primary">
                      {variance.variant_name}
                    </Button>
                  );
                })}
              </ButtonGroup>
              <br></br>
              <br></br>
            </React.Fragment>
          )}
          {props.for === "edit" ? (
            <ButtonGroup>
              <Button variant="info" onClick={() => setModalShow(true)}>
                EDIT
              </Button>
              <Button variant="danger" onClick={deleteItem}>
                DELETE
              </Button>
            </ButtonGroup>
          ) : (
            <Button variant="outline-dark">
              {props.from === "cart" ? (
                <Card.Link onClick={() => removeFromCart(props.item.id)}>
                  Remove
                </Card.Link>
              ) : (
                <Card.Link onClick={() => addCart(props.item.id)}>
                  Add to Cart
                </Card.Link>
              )}
            </Button>
          )}

          <br></br>
          <Alert show={active} variant="success">
            Product is added in cart
          </Alert>
          <Alert show={activeError} variant="danger">
            Product quantity can not be over 20
          </Alert>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
