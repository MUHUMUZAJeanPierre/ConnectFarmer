// import React from 'react'
import { useEffect, useState } from 'react';
import './Contact.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [list, setList] = useState([]);
    const fetchList =  async()=>{
      await axios({
        method:"GET",
        url: `http://localhost:4000/getContact`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response)=>{
        setList(response.data.data)
        console.log(response.data.data)
      }).catch(((error)=>{
        console.log(error, error.response ? error.response.data : error.message);
      }))
    }

    const removeFood = async (id) => {
      if(window.confirm("Are you sure you want to delete")){

        await axios({
          method: "DELETE",
          url: `http://localhost:4000/removeContact/${id}`, // Corrected this line
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          setTimeout(() => {
            toast.success(response.data.message)
            fetchList();
          }, 3000);
        }).catch((error) => {
          toast.error(error.message);
        });
        
      }
    };
    
    useEffect(()=>{ 
      fetchList();
    }, [])
  return (
    <div className='list add flex-col' >
      <p className='listi'>Get Message Of the Clients</p>
      <div className='list-table-format title'>
          <b>Name</b>
          <b>Email</b>
          <b>Message</b>
          <b className='action'>Action</b>
      </div>
      {list.map((item, index)=>{
        return(
          <div key={index} className='list-table-format'> 
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.message}</p>
            <p onClick={()=>removeFood(item._id)}  className='cursor'>X</p>
          </div>
        )
      })}
    </div>
  )
}

export default Contact
