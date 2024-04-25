import React, { useState } from 'react';
import './Home.css';

// Импорт действий и хуков Redux

import { addToCart, toggleCart } from '../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
interface FormState {
  quantity: number;
  giftWrapping: boolean;
  deliveryType: string;
}

const Home: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [formData, setFormData] = useState<FormState>({
    quantity: 0,
    giftWrapping: false,
    deliveryType: ''
  });

  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newCartItem = {
      product: selectedCategory,
      color: selectedColor,
      quantity: formData.quantity,
      giftWrapping: formData.giftWrapping,
      deliveryType: formData.deliveryType as "express" | "standard"
    };
    dispatch(addToCart(newCartItem));
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleFormChange = (name: string, value: string | number | boolean) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted', formData);
  };

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div className="container">
      <h1>Welcome to Our Web App</h1>
      <p>This is the home page of our awesome website.</p>

      <div className="md lenu">
        <label>Select Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">-- Select --</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {selectedCategory === 'electronics' && (
              <tr>
                <td>
                  <img
                    src="https://hqd-shop.com/wp-content/uploads/2022/04/hqd_cuvie_plus_apple_crush.jpg"
                    alt="Product 1"
                  />
                </td>
                <td>Hqd - Green</td>
              </tr>
            )}
            {selectedCategory === 'clothing' && (
              <tr>
                <td>
                  <img
                    src="https://a.lmcdn.ru/img600x866/C/P/CP001CMFRZ73_1_v1.jpg"
                    alt="Product 2"
                  />
                </td>
                <td>a cap - black</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="product-customization">
        <h2>Product Customization</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Color:</label>
          <select value={selectedColor} onChange={handleColorChange}>
            <option value="">-- Select --</option>
            <option value="green">Green</option>
            <option value="red">Black</option>
          </select>

          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => handleFormChange('quantity', e.target.value)}
          />

          <label>Gift Wrapping:</label>
          <input
            type="checkbox"
            name="giftWrapping"
            checked={formData.giftWrapping}
            onChange={(e) => handleFormChange('giftWrapping', e.target.checked)}
          />

          <label>Express Delivery:</label>
          <input
            type="radio"
            name="deliveryType"
            value="express"
            checked={formData.deliveryType === 'express'}
            onChange={() => handleFormChange('deliveryType', 'express')}
          />

          <label>Standard Delivery:</label>
          <input
            type="radio"
            name="deliveryType"
            value="standard"
            checked={formData.deliveryType === 'standard'}
            onChange={() => handleFormChange('deliveryType', 'standard')}
          />

          <button type="button" onClick={handleAddToCart}>Add to Cart</button>
          <button type="button" className="cart-icon" onClick={handleToggleCart}>🛒</button>
        </form>
      </div>

      {isCartOpen && (
        <div className="cart-container">
          <h2>Cart Items</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <p>Product: {item.product}</p>
                <p>Color: {item.color}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Gift Wrapping: {item.giftWrapping ? 'Yes' : 'No'}</p>
                <p>Delivery Type: {item.deliveryType}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;