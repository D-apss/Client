import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [itemData, setItemData] = useState([]);

  async function fetchData() {
    try {
      const { data } = await axios({
        method: "GET",
        // url: "http://localhost:3000/items",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(data);
      setItemData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap justify-center">
          {itemData.map((item, index) => (
            <div
              key={index}
              className="max-w-md w-full mx-2 my-2 rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <img
                className="w-full h-64 object-cover object-center"
                src={item.image}
                alt="product"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">{item.description}</p>
                <div className="mt-4">
                  <p className="text-gray-900 font-bold text-lg">
                    ${item.price}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
