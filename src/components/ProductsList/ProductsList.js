import React, { useContext } from "react";
import "./ProductsList.css";
import Product from "../Product/Product";

//Importing Context
import { GlobalContext } from "../../context/GlobalState";

const ProductsList = (props) => {
  const { items } = useContext(GlobalContext);

  return (
    <React.Fragment>
      {props.for !== "edit" ? (
        <h1 className="main__title">Products List</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>My Products</h1>
      )}

      <div className="row pl-4">
        {
          //Mapping objects to be displayed
          items.map((item) => (
            <Product
              item={item}
              key={item.id}
              from="products"
              for={props.for}
            />
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default ProductsList;
