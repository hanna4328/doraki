import { doc, updateDoc, arrayRemove, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export const useCart = () => {
  /**
   * Adds a flavor ID to the user's cart in Firestore.
   * If no cart exists, it creates one.
   */
  const addToCart = async (flavorId: string) => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in to pre-order!");

    try {
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        await updateDoc(cartRef, {
          items: arrayUnion(flavorId) // Adds if not present
        });
      } else {
        await setDoc(cartRef, {
          items: [flavorId]
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  /**
   * Removes a flavor ID from the user's cart in Firestore.
   */
  const removeFromCart = async (flavorId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const cartRef = doc(db, "carts", user.uid);
      // Atomic removal using Firebase arrayRemove
      await updateDoc(cartRef, {
        items: arrayRemove(flavorId)
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Return both functions so they are available to your components
  return { addToCart, removeFromCart };
};