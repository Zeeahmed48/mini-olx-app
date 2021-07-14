import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../config/firebase';
import { firebaseStorage } from '../../config/firebase';

const SellProduct = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let productPhotos = [];
    setIsLoading(true);
    try {
      for (let i = 0; i < productImages.length; i++) {
        const image = productImages[i];
        const storageRef = await firebaseStorage.ref(
          `productImages/${image.name}`
        );
        await storageRef.put(image);
        const url = await storageRef.getDownloadURL();
        productPhotos.push(url);
      }
      await db.collection('products').add({
        productTitle,
        productPrice,
        productDescription,
        productPhotos,
      });
      setIsLoading(false);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
    setProductTitle('');
    setProductPrice('');
    setProductDescription('');
  };

  const addProductImage = (images) => {
    setProductImages(images);
  };

  return (
    <div className='sell_product'>
      <form onSubmit={handleSubmit} className='sell_form'>
        <input
          type='text'
          placeholder='title'
          onChange={(e) => setProductTitle(e.target.value)}
          value={productTitle}
          required
        />
        <input
          type='number'
          placeholder='price'
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          required
        />
        <label>Please upload product images</label>
        <input
          type='file'
          multiple
          onChange={(e) => addProductImage(e.target.files)}
          required
        />
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        ></textarea>
        <button type={!isLoading ? 'submit' : 'button'} disabled={isLoading}>
          {!isLoading ? (
            'Add Product'
          ) : (
            <div className='custom_loader'>Please Wait</div>
          )}
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
