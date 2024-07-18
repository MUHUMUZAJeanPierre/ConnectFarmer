import { useState } from 'react';
import './Add.css';
import { assets } from "../../assets/assets";
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Add = () => {
  
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    await axios.post("http://localhost:4000/food/add",formData).then((response)=>{
      console.log(response.data);
      toast.success("Product added successfully!");
      navigate("/list");
    }).catch((error)=>{
      toast.error("Failed to add product!");
      console.log(error);
    })
  }

  return (
    <div className="add">
      <form className="flex-col" >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Type here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} name="description" rows="6" placeholder="Write content here" required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select value={category} onChange={(E)=>setCategory(E.target.value)} name="category" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pur Veg">Pur Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button onClick={createProduct} type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  )
}

export default Add;
