import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function BidPage() {
  const { id } = useParams();

  const [itemBidData, setItemBidData] = useState({});
  const [highestData, setHighestData] = useState([]);
  const [bidInput, setBidInput] = useState({
    amount: "",
    ItemId: id,
    UserId: "",
  });

  const fetchItemById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pub/items/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      const { name, description, imageUrl, price } = response.data;
      setItemBidData({ name, description, imageUrl, price });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const fetchHighestById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pub/items/bid/highest/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      const formattedData = response.data.map(({ amount, User }) => ({
        amount,
        bidderName: `${User.firstname} ${User.lastname}`,
      }));
      setHighestData(formattedData);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchItemById();
    fetchHighestById();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBidInput({ ...bidInput, [name]: value });
  };

  const handleBidSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/pub/items/${id}/bid`, bidInput, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      await fetchHighestById();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <div className="item-details">
        <img src={itemBidData.imageUrl} alt={itemBidData.name} />
        <h1>{itemBidData.name}</h1>
        <p>{itemBidData.description}</p>
        <p>Starting Price: {itemBidData.price}</p>
      </div>
      <div className="highest-bid">
        <h2>Highest Bid</h2>
        <p>
          Amount:{" "}
          {highestData.length > 0 ? highestData[0].amount : "No bids yet"}
        </p>
        <p>
          Bidder:{" "}
          {highestData.length > 0 ? highestData[0].bidderName : "No bids yet"}
        </p>
      </div>
      <div className="submit-bid">
        <form onSubmit={handleBidSubmit}>
          <label>
            Bid Amount:
            <input
              type="number"
              name="amount"
              value={bidInput.amount}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Place Bid</button>
        </form>
      </div>
    </div>
  );
}
