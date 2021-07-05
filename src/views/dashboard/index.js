import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import loader from '../../assets/loader.webp';

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const usersData = await db.collection('products').get();
    const tempUsers = [];
    try {
      usersData.docs.forEach((product) => {
        tempUsers.push(product.data());
        setIsLoading(false);
      });
      setAllProducts(tempUsers);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <div className='loader'>
          <img src={loader} alt='loader' />
        </div>
      ) : (
        <div className='products'>
          {allProducts.map((product, index) => {
            return (
              <div key={index}>
                <img src={product.productImage} width={150} height={150} />
                <h2>{product.productTitle}</h2>
                <p>{`$${product.productPrice}`}</p>
              </div>
            );
          })}
        </div>
      )}
      <Link to='/sell-product'>
        <button className='createBtn'>
          <i class='fas fa-plus-circle'></i>
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
