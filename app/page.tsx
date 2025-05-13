"use client";

import { useState } from "react";

type ItemType = "Fruit" | "Vegetable";

interface Item {
  type: ItemType;
  name: string;
}

const initialItems: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export default function Home() {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);
  const [timeouts, setTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>(
    {}
  );

  const moveToCategory = (item: Item, index: number) => {
    setMainList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });

    if (item.type === "Fruit") {
      setFruitList((prev) => [...prev, item]);
    } else {
      setVegetableList((prev) => [...prev, item]);
    }

    const timer = setTimeout(() => {
      setMainList((prev) => [...prev, item]);
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    }, 5000);

    setTimeouts((prev) => ({ ...prev, [item.name]: timer }));
  };

  const moveBackToMain = (item: Item) => {
    clearTimeout(timeouts[item.name]);
    setMainList((prev) => [...prev, item]);
    setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-pink-100 p-10 flex justify-center items-start">
      <div className="flex gap-8 w-full max-w-6xl shadow-xl rounded-lg bg-white p-6">
        {/* Main List */}
        <div className="flex flex-col w-1/3 space-y-4">
          {mainList.map((item, index) => (
            <button
              key={item.name}
              className="bg-gray-200 border px-5 py-3 rounded-md hover:bg-gray-300 transition ease-in-out transform hover:scale-105 border-r-4"
              onClick={() => moveToCategory(item, index)}
            >
              <label className="text-gray-800 font-semibold">{item.name}</label>
            </button>
          ))}
        </div>

        {/* Fruit & Vegetable Columns */}
        <div className="flex flex-1 justify-between space-x-6">
          {/* Fruit Column */}
          <div className="flex-1">
            <div className="bg-green-200 text-center font-semibold py-3 rounded-t-lg shadow-md">
              <label className="text-gray-800 font-semibold">Fruits</label>
            </div>
            <div className="space-x-4 space-y-4 mt-4">
              {fruitList.map((item) => (
                <button
                  key={item.name}
                  className="bg-green-100 border px-5 py-3 rounded-md hover:bg-green-300 transition ease-in-out transform hover:scale-105"
                  onClick={() => moveBackToMain(item)}
                >
                  <label className="text-green-800 font-semibold">
                    {item.name}
                  </label>
                </button>
              ))}
            </div>
          </div>

          {/* Vegetable Column */}
          <div className="flex-1">
            <div className="bg-yellow-200 text-center font-semibold py-3 rounded-t-lg shadow-md">
              <label className="text-gray-800 font-semibold">Vegetables</label>
            </div>
            <div className="space-x-4 space-y-4 mt-4">
              {vegetableList.map((item) => (
                <button
                  key={item.name}
                  className="bg-yellow-100 border px-5 py-3 rounded-md hover:bg-yellow-300 transition ease-in-out transform hover:scale-105"
                  onClick={() => moveBackToMain(item)}
                >
                  <label className="text-yellow-800 font-semibold">
                    {item.name}
                  </label>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
