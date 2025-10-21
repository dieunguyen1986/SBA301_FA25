import "bootstrap/dist/css/bootstrap.min.css";

const Product = (props) => {
  return (
    <div className="card" style={{width: '18rem;'}}>
      <img src={props.product.image} className="card-img-top" alt={props.product.name} />
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <h3>{props.product.price}</h3>
        <a href="#" className="btn btn-primary">Add to Cart </a>
      </div>
    </div>
  );
};

export default Product;