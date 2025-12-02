import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import DraggableBar from '../components/dragBar' 

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const   categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      console.log(id,cat)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log(url)
  }


  return (
   <section className='bg-gray-150'>
<div className="mt-5 container mx-auto flex justify-center items-center py-2">
  <div className={`w-full h-[420px] bg-red-100 rounded-xl overflow-hidden shadow-lg ${!banner && "animate-pulse my-2"}`}>
    <img
      src={banner}
      className="w-full h-full object-cover hidden lg:block"
      alt="banner"
    />
    <img
      src={bannerMobile}
      className="w-full h-full object-cover lg:hidden"
      alt="banner"
    />
  </div>
</div>  



<div>
<DraggableBar /> 
</div>


<div className='px-20 mt-7'>
     <h3 className='flex-center text-bold text-2xl' id="Services" >Services</h3>  
     
<div className="container mx-auto px-4 my-4 
  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
  {
    loadingCategory ? (
      new Array(12).fill(null).map((c, index) => {
        return (
          <div 
            key={index + 'loadingcategory'}
            className="bg-green-50/70 border border-green-200 
            rounded-2xl p-4 min-h-40 grid gap-3 shadow-md animate-pulse"
          >
            <div className="bg-green-200 min-h-24 rounded-xl"></div>
            <div className="bg-green-200 h-6 rounded"></div>
          </div>
        )
      })
    ) : (
      categoryData.map((cat, index) => {
        return (
          <div 
            key={cat._id + 'displayCategory'}
            className="w-full h-full cursor-pointer bg-green-50 hover:bg-green-100 
            border border-green-200 rounded-2xl shadow-md hover:shadow-xl 
            transition-all p-3"
            onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
          >
            <div className="flex justify-center items-center">
              <img 
                src={cat.image}
                className="w-full h-32 object-contain rounded-xl"
              />
            </div>

            {/* Product name added */}
            <p className="text-center mt-3 font-semibold text-green-800 text-l">
              {cat.name}
            </p>

          </div>
        )
      })
    )
  }
</div>    
</div>    




<div className='px-20 mt-7'>
     <h3 className='flex-center text-bold text-2xl' id="Product" >Products</h3>  
     
<div className="container mx-auto px-4 my-4 
  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
  {
    loadingCategory ? (
      new Array(12).fill(null).map((c, index) => {
        return (
          <div 
            key={index + 'loadingcategory'}
            className="bg-green-50/70 border border-green-200 
            rounded-2xl p-4 min-h-40 grid gap-3 shadow-md animate-pulse"
          >
            <div className="bg-green-200 min-h-24 rounded-xl"></div>
            <div className="bg-green-200 h-6 rounded"></div>
          </div>
        )
      })
    ) : (
      categoryData.map((cat, index) => {
        return (
          <div 
            key={cat._id + 'displayCategory'}
            className="w-full h-full cursor-pointer bg-green-50 hover:bg-green-100 
            border border-green-200 rounded-2xl shadow-md hover:shadow-xl 
            transition-all p-3"
            onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
          >
            <div className="flex justify-center items-center">
              <img 
                src={cat.image}
                className="w-full h-32 object-contain rounded-xl"
              />
            </div>

            {/* Product name added */}
            <p className="text-center mt-3 font-semibold text-green-800 text-l">
              {cat.name}
            </p>

          </div>
        )
      })
    )
  }
</div>    
</div>    


      {/***display category product */}
      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }



   </section>
  )
}

export default Home
