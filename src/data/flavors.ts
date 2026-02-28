export interface Flavor {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const SIGNATURE_COLLECTION: Flavor[] = [
  {
    id: "classic-red-bean",
    name: "The Traditionalist",
    description: "A tribute to the origins of Dorayaki. Golden, honey-infused buns cradling a velvet-smooth Hokkaido red bean paste.",
    price: "₹45",
    image: "/images/traditional.png" 
  },
  {
    id: "matcha-dream",
    name: "Matcha Serenity",
    description: "Ceremonial grade Uji matcha cream whipped to a cloud-like texture, balanced with a hint of white chocolate.",
    price: "₹70",
    image: "/images/matcha.png" 
  },
  {
    id: "vanilla-custard",
    name: "The Custard Cloud",
    description: "Premium studio-crafted vanilla custard cream, whipped to a silken finish. A modern, airy take on a timeless classic.",
    price: "45",
    image: "/images/custard-preview.png"
  },
  {
    id: "cardamom-honey",
    name: "Cardamom Royale",
    description: "An aromatic fusion of freshly ground cardamom cream drizzled with rare golden honey. Pure elegance in every bite.",
    price: "₹60",
    image: "/images/cardamom-preview.png"
  }
];