import  { useContext } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const url = 'http://localhost:4000'
    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={url + "/images/" + image}  alt={name} />
                {!cartItems[id] ? (
                    <img
                        className='add'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt='Add'
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt='Remove'
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt='Add'
                        />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='Rating' />
                </div>
                <p className='food-item-description'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;