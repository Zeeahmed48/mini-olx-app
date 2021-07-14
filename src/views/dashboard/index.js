import { Link } from 'react-router-dom';
import Ajaxloader from '../../assets/images/Ajux_loader.gif';
import ProductList from '../../components/productList';

const Dashboard = ({ products, isLoading }) => {
  return (
    <div className='container'>
      {isLoading ? (
        <div className='loader'>
          <img src={Ajaxloader} alt='loader' />
        </div>
      ) : (
        <ProductList products={products} />
      )}
      <Link to='/sell'>
        <button className='createBtn'>
          <i className='fas fa-plus-circle'></i>
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
