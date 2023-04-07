import PreviewQRImg from "../assets/img/dashboard/img-generate-qrcode.jpg";
import PreviewButtonImg from "../assets/img/dashboard/img-generate-button.jpg";

export const menus = [
  {
    icon: "📋",
    name: "Dashboard",
    path: "/home",
  },
  {
    icon: "💰",
    name: "Donation",
    path: "/donation",
  },
  {
    icon: "📁",
    name: "Items",
    path: "/items",
  },
  {
    icon: "🙏",
    name: "Wishlist",
    path: "/wishlist",
  },
  {
    icon: "🔗",
    name: "Buttons",
    path: "/buttons",
  },
  {
    icon: "🙎‍♂️",
    name: "My Account",
    path: "/account",
  },
];

export const generatorData = [
  {
    preview: PreviewButtonImg,
    text: "Website Buttons",
    description:
      "Create customizable buttons to your Don Jo page. You can add this to your site or blog.",
    isItemsRequired: false,
  },
  {
    preview: PreviewQRImg,
    text: "QR Code",
    description: "Generate a QR code for your Don Jo page.",
    isItemsRequired: false,
  },
  {
    preview: PreviewButtonImg,
    text: "Items Buttons",
    description:
      "Create a button that can be moved directly to the item you are selling.",
    isItemsRequired: true,
  },
];

export const colorSet = [
  "#000000",
  "#F02C7E",
  "#F96D1F",
  "#14A985",
  "#2966DD",
  "#9042DD",
];

export const fontDataSet = [
  { id: 1, title: "NotoSansKR" },
  { id: 2, title: "Black Han Sans" },
  { id: 3, title: "SunFlower" },
  { id: 4, title: "DoHyeon" },
  { id: 5, title: "Jua" },
];
