const carData = [
  {
    type: "Car",
    name: "Kia Picanto",
    price: "3000",
    availability: "Yes",
    rating: "4.2",
    image: "Images/kia-pecanto.png",
    driverName: "John Doe", // 🔹 Add driverName
  },
  {
    type: "Car",
    name: "Fiat 500",
    price: "2500",
    availability: "Yes",
    rating: "4.8",
    image: "Images/Fiat-500.png",
  },
  {
    type: "Car", // 🔹 Peugeot 2008 is a Car, not a Bike
    name: "Peugeot 2008",
    price: "2600",
    availability: "No",
    rating: "4.4",
    image: "Images/peugeot-2008.png",
  },
  {
    type: "Bike",
    name: "Bajaj Avenger 150", // 🔹 Properly named for clarity
    price: "1900",
    availability: "Yes",
    rating: "4.1",
    image: "Images/Avenger-150.png",
  },
  {
    type: "Car",
    name: "Volkswagen Polo",
    price: "3400",
    availability: "Yes",
    rating: "4.0",
    image: "Images/volkswagen-polo.png",
  },
  {
    type: "Car",
    name: "Nissan Qashqai",
    price: "3600",
    availability: "Yes",
    rating: "3.8",
    image: "Images/nissan-qashqai.png",
  },
];

export default carData;
