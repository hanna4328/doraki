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
    price: "₹180",
    image: "/src/public/images/traditional.png" // <-- Update this path with your image
  },
  {
    id: "matcha-dream",
    name: "Matcha Serenity",
    description: "Ceremonial grade Uji matcha cream whipped to a cloud-like texture, balanced with a hint of white chocolate.",
    price: "₹220",
    image: "/src/public/images/matcha.png" // <-- Update this path with your image
  },
  {
    id: "vanilla-custard",
    name: "The Custard Cloud",
    description: "Premium studio-crafted vanilla custard cream, whipped to a silken finish. A modern, airy take on a timeless classic.",
    price: "₹200",
    image: "/src/public/images/custard-preview.png" // Placeholder for your studio photography
  },
  {
    id: "cardamom-honey",
    name: "Cardamom Royale",
    description: "An aromatic fusion of freshly ground cardamom cream drizzled with rare golden honey. Pure elegance in every bite.",
    price: "₹240",
    image: "/src/public/images/cardamom-preview.png" // Placeholder for your golden honey shot
  }
];