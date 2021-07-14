import { Link } from 'react-router-dom';

const SingleProduct = ({ images, title, price }) => {
  return (
    <Link to={`/product/${title}`} className='product'>
      <img src={images && images[0]} />
      <h2>{title}</h2>
      <p>{`$${price}`}</p>
    </Link>
  );
};

export default SingleProduct;
