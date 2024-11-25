import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'

const FAQ = () => {
    const [showPara, setShowPara] = useState(false)
    const [showPara1, setShowPara1] = useState(false)
    const [showPara2, setShowPara2] = useState(false)
    const [showPara3, setShowPara3] = useState(false)

    const handleShowPara = (a) => e =>{
        if(a==1)
            setShowPara(!showPara);
        else if(a == 2)
            setShowPara1(!showPara1);
        else if (a == 3)
        setShowPara2(!showPara2);
        else
        setShowPara3(!showPara3);
    }
  return (
      <>
      <Header/>
      <div className="relative bg-white transition-all mx-auto rounded-lg flex flex-col max-w-2xl mt-12 mb-8 gap-7">
           <h1 className='flex items-center justify-center gap-2'>
           <Link to="">
           <i class="fa-solid fa-star text-2xl mb-3"></i>
           </Link> 
           <div className='font-bold text-4xl mb-3'>FAQS</div>
           </h1>
           <div className='border-2 p-3'>
            <h2 className='flex justify-between text-lg'>How can i proceed with Adoption Process?
            {showPara ? 
            <button onClick={handleShowPara(1)}><i class="fa-solid fa-minus"></i></button> :
            <button onClick={handleShowPara(1)}><i class="fa-solid fa-plus"></i></button>
            }
            </h2>
            {showPara && (
                <p className='text-lg mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, iusto.</p>
            )}
           </div>

           <div className='border-2 p-3'>
             <h2 className='text-lg flex justify-between'>How can i meet the pets before proceeding to adoption?
             {showPara1 ?  
                <button onClick={handleShowPara(2)}>
                  <i class="fa-solid fa-minus"></i>
                </button> : 
                <button onClick={handleShowPara(2)}>
                <i class="fa-solid fa-plus"></i>
                </button>              
            } 
             </h2>
             {showPara1 && (
                <p className='text-lg mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, iusto.</p>
            )}
           </div>
           
           <div className='border-2 p-3' >
          <h2 className='flex justify-between text-lg'>
              How do i find pets on the website or in the organization?
              {showPara2 ?  
                <button onClick={handleShowPara(3)}>
                  <i class="fa-solid fa-minus"></i>
                </button> : 
                <button onClick={handleShowPara(3)}>
                <i class="fa-solid fa-plus"></i>
                </button>              
            }              
              
          </h2>
          {showPara2 && (
            <p className='text-lg mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem, quasi autem ipsa ab quod.</p>
          )}
        </div>
         
        <div className='border-2 p-3' >
          <h2 className='flex justify-between text-lg'>
              How can i know more, i have many queries?
              {showPara3 ?  
                <button onClick={handleShowPara(4)}>
                  <i class="fa-solid fa-minus"></i>
                </button> : 
                <button onClick={handleShowPara(4)}>
                <i class="fa-solid fa-plus"></i>
                </button>              
            }              
              
          </h2>
          {showPara3 && (
            <p className='text-lg mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptatem, quasi autem ipsa ab quod.</p>
          )}
        </div>

    </div>
   </>
  )
}

export default FAQ