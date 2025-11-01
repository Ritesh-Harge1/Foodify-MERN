// frontend/src/context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);

    const fetchFood = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list`);
        const foodsArray = res?.data?.data ?? res?.data?.foods ?? [];
        if (res.data && res.data.success && Array.isArray(foodsArray)) {
          // images already normalized by backend; ensure rating exists
          const foodsWithSafeFields = foodsArray.map(item => ({
            ...item,
            image: item.image?.startsWith("http") ? item.image : item.image || "",
            rating: typeof item.rating === "number" ? item.rating : (Math.floor(Math.random() * 2) + 4),
          }));
          setFoodList(foodsWithSafeFields);
        } else {
          console.error("Could not fetch foods:", res.data);
        }
      } catch (err) {
        console.error("Error fetching food list:", err);
      }
    };

    fetchFood();
  }, [url]);

  // Allow admin/component to insert a newly created food into current list
  const addFoodToList = (foodObj) => {
    // ensure rating exists on the inserted object
    const normalized = {
      ...foodObj,
      rating: typeof foodObj.rating === "number" ? foodObj.rating : (Math.floor(Math.random() * 2) + 4),
      image: foodObj.image?.startsWith("http") ? foodObj.image : foodObj.image || "",
    };
    setFoodList(prev => [normalized, ...prev]);
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      if (updated[itemId] <= 1) delete updated[itemId];
      else updated[itemId] -= 1;
      return updated;
    });
  };

  const getTotalCartAmount = (itemsMeta = food_list) => {
    if (!itemsMeta || itemsMeta.length === 0) return 0;
    let total = 0;
    Object.keys(cartItems).forEach((id) => {
      const qty = cartItems[id];
      const item = itemsMeta.find((it) => it._id === id || String(it._id) === String(id));
      if (item) total += item.price * qty;
    });
    return total;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    food_list,
    setFoodList,
    addFoodToList, // <-- exposed for admin
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
