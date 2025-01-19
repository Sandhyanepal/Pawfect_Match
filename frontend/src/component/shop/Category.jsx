import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Category = ({selectedCategory,setSelectedCategory}) => {
    const [category,setCategory] = useState(null);
    useEffect(() => {
        const fetchAllCategory = async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/getallcategory`
          );
          if (response.status === 200) {
            setCategory(response.data);
          } else {
            toast.error("Error fetch categories");
          }
        };
        fetchAllCategory()
    },[]);
  return (
    <div className='flex gap-2 my-4 justify-center'>
        {
            category?.map((category,index)=>(
                <button key={index} className='bg-slate-400 text-white px-4 py-2 rounded-lg' onClick={()=>setSelectedCategory(category?.category_name)}>{category?.category_name}</button>
            ))
        }
    </div>
  )
}

export default Category