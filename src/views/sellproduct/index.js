import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../config/firebase';

const SellProduct = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductTitle('');
    setProductPrice('');
    setProductImage('');
    db.collection('products').add({
      productTitle,
      productPrice,
      productImage,
    });
    history.push('/dashboard');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='title'
          onChange={(e) => setProductTitle(e.target.value)}
          value={productTitle}
        />
        <input
          type='text'
          placeholder='price'
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <input
          type='text'
          placeholder='images'
          onChange={(e) => setProductImage(e.target.value)}
          value={productImage}
        />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default SellProduct;
