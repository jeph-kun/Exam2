import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";
import EditProduct from "../AddProduct/AddProduct";

export default function EditModal(props) {
  const { items } = useContext(GlobalContext);

  const findItem = items.find((item) => item.id === props.item_id);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit {findItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct useInEdit={true} find_item={findItem} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
