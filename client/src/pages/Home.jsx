import React,{ useState, useRef } from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import DraggableBar from '../components/dragBar' 
import AiBot from '../components/AiBot'
import NewsSlider from '../components/News'


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



  return   (
  <section className="bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 min-h-screen">


    <div className="flex flex-row items-center justify-evenly gap-8 px-4 py-2 mt-2 mb-1 
                    bg-transparent text-black font-large tracking-wide text-xl
                    border-b border-gray-200">

      <div className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
        Services
      </div>

      <div className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
        Products
      </div>

      <div className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
        News
      </div>

      <div className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
        About Us
      </div>    
    </div>

   <div>
    <AiBot/>
   </div>

  




    <div className="mt-2 container mx-auto flex justify-center items-center px-4">
      <div className={`w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl relative group ${!banner && "animate-pulse my-2"}`}>
        <img
          src={banner}
          className="w-full h-full object-cover hidden lg:block scale-105 group-hover:scale-110 transition-transform duration-700"
          alt="banner"
        />
        <img
          src={bannerMobile}
          className="w-full h-full object-cover lg:hidden"
          alt="banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </div>

    <div className="h-full w-full fixed ">
      <DraggableBar />
    </div>

  

    {/* <div className="px-6 md:px-20 mt-16">
      <h3
        className="text-center font-extrabold text-3xl md:text-4xl text-green-900 tracking-wide mb-10"
        id="Services"
      >
        🌾 Our Services
      </h3>

      <div className="container mx-auto px-2 md:px-4 my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {
          loadingCategory ? (
            new Array(12).fill(null).map((c, index) => (
              <div
                key={index + 'loadingcategory'}
                className="bg-white/70 border border-green-200 rounded-3xl p-4 min-h-44 grid gap-3 shadow-lg animate-pulse"
              >
                <div className="bg-green-200 min-h-28 rounded-2xl"></div>
                <div className="bg-green-200 h-6 rounded-xl"></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div
                key={cat._id + 'displayCategory'}
                className="group cursor-pointer bg-white border border-green-200 rounded-3xl shadow-lg 
                hover:shadow-2xl hover:border-green-400 transition-all duration-500 p-5 
                hover:-translate-y-2"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <div className="flex justify-center items-center bg-emerald-50 rounded-2xl p-3">
                  <img
                    src={cat.image}
                    className="w-full h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <p className="text-center mt-4 font-bold text-green-900 text-lg">
                  {cat.name}
                </p>
              </div>
            ))
          )
        }
      </div>
    </div> */}
    <div className="px-6 md:px-20 mt-20">
      <h3
        className="text-center font-extrabold text-3xl md:text-4xl text-green-900 tracking-wide mb-10"
        id="Product"
      >
        🛒 Our Products
      </h3>

      <div className="container mx-auto px-2 md:px-4 my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {
          loadingCategory ? (
            new Array(12).fill(null).map((c, index) => (
              <div
                key={index + 'loadingcategory'}
                className="bg-white/70 border border-green-200 rounded-3xl p-4 min-h-44 grid gap-3 shadow-lg animate-pulse"
              >
                <div className="bg-green-200 min-h-28 rounded-2xl"></div>
                <div className="bg-green-200 h-6 rounded-xl"></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div
                key={cat._id + 'displayCategory'}
                className="group cursor-pointer bg-white border border-green-200 rounded-3xl shadow-lg 
                hover:shadow-2xl hover:border-green-400 transition-all duration-500 p-5 
                hover:-translate-y-2"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <div className="flex justify-center items-center bg-emerald-50 rounded-2xl p-3">
                  <img
                    src={cat.image}
                    className="w-full h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <p className="text-center mt-4 font-bold text-green-900 text-lg">
                  {cat.name}
                </p>
              </div>
            ))
          )
        }
      </div>
    </div>


      <div className="
        mt-24 
        space-y-24 
        px-3 sm:px-6 md:px-16 
        transition-all duration-700 
        animate-fadeIn
      ">
        {
          categoryData?.map((c) => (
            <div
              key={c?._id + "CategorywiseProduct"}
              className="
                relative 
                group
                bg-gradient-to-br from-white via-green-50 to-emerald-50 
                rounded-3xl 
                p-4 sm:p-6 md:p-10
                shadow-xl 
                hover:shadow-2xl 
                transition-all duration-700 
                hover:-translate-y-2
                border border-green-200
                overflow-hidden
              "
            >

              <div className="
                absolute inset-0 
                bg-gradient-to-r from-green-200/20 via-transparent to-lime-200/20
                opacity-0 
                group-hover:opacity-100 
                transition-opacity duration-700
                pointer-events-none
              " />


              <div className="relative z-10 animate-slideUp">
                <CategoryWiseProductDisplay
                  id={c?._id}
                  name={c?.name}
                />
              </div>
            </div>
          ))
        }
      </div>

        <div className='
                mt-24 
        space-y-24 
        px-3 sm:px-6 md:px-16 
        transition-all duration-700 
        animate-fadeIn'
        >
    <h3
        className="text-center font-extrabold text-3xl md:text-4xl text-green-900 tracking-wide mb-10"
        id="Services"
      >
         📰  News
      </h3>
          <NewsSlider/>
         </div>
  </section>
)
}

export default Home
