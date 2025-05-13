'use client';

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
    <div className="min-h-screen bg-white p-10 flex justify-center items-start">
      <div className="flex gap-6 w-full max-w-5xl">
        {/* Main List */}
        <div className="flex flex-col w-1/3 space-y-2">
          {mainList.map((item, index) => (
            <button
              key={item.name}
              className="bg-gray-100 border px-4 py-2 hover:bg-gray-200 text-left"
              onClick={() => moveToCategory(item, index)}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Fruit & Vegetable Columns */}
        <div className="flex flex-1 justify-between space-x-4">
          {/* Fruit Column */}
          <div className="flex-1">
            <div className="bg-gray-100 text-center font-semibold py-2">
              Fruit
            </div>
            <div className="space-y-2 mt-2">
              {fruitList.map((item) => (
                <button
                  key={item.name}
                  className="bg-green-100 border px-4 py-2 hover:bg-green-200 w-full text-left"
                  onClick={() => moveBackToMain(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Vegetable Column */}
          <div className="flex-1">
            <div className="bg-gray-100 text-center font-semibold py-2">
              Vegetable
            </div>
            <div className="space-y-2 mt-2">
              {vegetableList.map((item) => (
                <button
                  key={item.name}
                  className="bg-yellow-100 border px-4 py-2 hover:bg-yellow-200 w-full text-left"
                  onClick={() => moveBackToMain(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
