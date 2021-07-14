import SingleProduct from '../singleProduct';

const ProductList = ({ products }) => {
  return (
    <div className='products'>
      {products &&
        products.map(({ productPhotos, productTitle, productPrice }, index) => {
          return (
            <SingleProduct
              key={index}
              images={productPhotos}
              title={productTitle}
              price={productPrice}
            />
          );
        })}
    </div>
  );
};

export default ProductList;
