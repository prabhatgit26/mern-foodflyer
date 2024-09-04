// import React, { useEffect, useState } from "react";
// import "./List.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const List = () => {
//   const url = "http://localhost:4000";
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);

//     if (response.data.success) {
//       setList(response.data.data);
//     } else {
//       toast.error("Error..!");
//     }
//   };


//   const removeFood = async (foodId) =>{
//     const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
//     await fetchList();
//     if(response.data.success){
//       toast.success(response.data.message)
//     }
//     else{
//       toast.error("Error..!")
//     }
//   }



//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <p>All Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => {
//           return (
//             <div key={index} className="list-table-format">
//               <img src={`${url}/images/` + item.image} alt="FoodImage" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{item.price}</p>
//               <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default List;



import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // State to keep track of total count

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
        setTotalCount(response.data.data.length); // Update count based on the fetched list
      } else {
        toast.error("Error fetching food list.");
      }
    } catch (error) {
      toast.error("Error fetching food list.");
      console.error("Error fetching list:", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        await fetchList(); // Re-fetch the list after removal
        toast.success(response.data.message);
      } else {
        toast.error("Error removing food item.");
      }
    } catch (error) {
      toast.error("Error removing food item.");
      console.error("Error removing food:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p className="list-header">All Foods List</p>
      <p className="total-count">Total Food Items: {totalCount}</p> {/* Display total count */}
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="FoodImage" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
