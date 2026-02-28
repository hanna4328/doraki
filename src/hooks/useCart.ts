import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const useCart = () => {
  const addToCart = async (flavorId: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to start your selection.");
      return;
    }

    const cartRef = doc(db, "carts", user.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      // Get the existing items
      const currentItems = cartSnap.data().items || [];
      // Push the new ID (allowing duplicates)
      await updateDoc(cartRef, {
        items: [...currentItems, flavorId]
      });
    } else {
      // Create the cart if it doesn't exist
      await setDoc(cartRef, { items: [flavorId] });
    }
  };

  return { addToCart };
};