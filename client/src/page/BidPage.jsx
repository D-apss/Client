/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function BidPage() {
   const { id } = useParams();

   const [itemBidData, setItemBidData] = useState({});
   const [highestData, setHighestData] = useState([]);
   const [bidInput, setBidInput] = useState({
      amount: "",
      ItemId: id,
      UserId: "",
   });
   const [isAdmin, setIsAdmin] = useState(false);
   const [bidClosed, setBidClosed] = useState(false);

   const fetchItemById = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/pub/items/${id}`);
         const { name, description, imageUrl, price } = response.data;
         setItemBidData({ name, description, imageUrl, price });
      } catch (error) {
         console.error(error.response.data);
      }
   };

   const fetchHighestById = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/pub/items/bid/highest/${id}`, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
         });
         let formattedData = response.data.map(({ amount, User }) => ({
            amount,
            bidderName: `${User.firstname} ${User.lastname}`,
         }));
         setHighestData(formattedData);
         socket.emit("newBid", formattedData[0].amount);
      } catch (error) {
         console.error(error.response.data);
      }
   };

   useEffect(() => {
      fetchItemById();
      fetchHighestById();
      userById();
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

   async function userById() {
      try {
         const userId = localStorage.getItem("user_id")
         const response = await axios.get(`http://localhost:3000/pub/user/${userId}`);

         console.log("User data:", response.data);

         if (response.data.role === "Admin") {
            setIsAdmin(true);
         } else {
            setIsAdmin(false);
         }
      } catch (error) {
         console.error("Error fetching user data:", error.response.data);
      }
   }

   const handleCloseBid = async () => {
      try {
         await axios.post(`http://localhost:3000/closeBid`, {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
         });
         setBidClosed(true);
      } catch (error) {
         console.error(error.response.data);
      }
   };

   useEffect(() => {
      socket.on("message", (msg) => {
         console.log(msg);
      });

      socket.on("count:Bid", (lastBid) => {
         if (lastBid.length > 0) {
            setHighestData(lastBid);
         }
      });

      socket.on("highestBid", (newCount) => {
         if (newCount !== undefined && newCount !== null) {
            setHighestData([{ amount: newCount}]);
         }
         console.log(newCount);
      });

      socket.on("bidClosed", (isClosed) => {
         setBidClosed(isClosed);
      });

      return () => {
         socket.off("message");
         socket.off("highestBid");
         socket.off("bidClosed");
      };
   }, []);

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
            <p>Amount: {highestData?.length > 0 ? highestData[0].amount : "No bids yet"}</p>
            <p>Bidder: {highestData?.length > 0 ? highestData[0].bidderName : "No bids yet"}</p>
         </div>
         <div className="submit-bid">
            {!bidClosed ? (
               <form onSubmit={handleBidSubmit}>
                  <label>
                     Bid Amount:
                     <input type="number" name="amount" value={bidInput.amount} onChange={handleInputChange} />
                  </label>
                  <button type="submit">Place Bid</button>
               </form>
            ) : (
               <p>BID CLOSED!</p>
            )}
         </div>
         {isAdmin && (
            <div className="close-bid">
               <button onClick={handleCloseBid}>Close Bid</button>
            </div>
         )}
      </div>
   );
}
