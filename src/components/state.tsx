import React, { useState } from 'react';
import './Home.css';

import { addToCart, toggleCart } from '../redux/actions/cartActions';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

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
      {/* Ваш JSX код */}
    </div>
  );
};

export default Home;
