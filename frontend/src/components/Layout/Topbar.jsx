// import React from 'react';
// import { TbBrandMeta } from "react-icons/tb";
// import { IoLogoInstagram } from "react-icons/io";
// import { RiTwitterXLine } from "react-icons/ri";

// const Topbar = () => {
//   return (
//     <div className='bg-rabbit-red text-white'>
//       <div className='container mx-auto flex justify-between items-center  px-4'> 
//         <div className=' hidden md:flex items-center space-x-4 p-2'>
//           <a href="#" className="hover:text-gray-300">
//             <TbBrandMeta className='h-5 w-5' />
//           </a>

//           <a href="#" className="hover:text-gray-300">
//             <IoLogoInstagram className='h-5 w-5' />
//           </a>

//           <a href="#" className="hover:text-gray-300">
//             <RiTwitterXLine className='h-4 w-4' />
//           </a>
//         </div>
//         <div className='text-sm text-center flex-grow'>
//           <span>🌍 Luxora – Global 🚀 Shipping | 💰 Cash on Delivery </span>
//         </div>
//         <div className='text-sm hidden md:block '>
//           <a href="tel:+1234567890" className="hover:text-gray-300">
//             <span>📞 +91 1234567890 </span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;




// deep seek 

import React from 'react';
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className='bg-rabbit-red text-white py-2 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        {/* Social Icons */}
        <div className='hidden md:flex items-center space-x-6'>
          <a href="#" className="hover:text-gray-300 transition duration-300">
            <TbBrandMeta className='h-6 w-6' />
          </a>
          <a href="#" className="hover:text-gray-300 transition duration-300">
            <IoLogoInstagram className='h-6 w-6' />
          </a>
          <a href="#" className="hover:text-gray-300 transition duration-300">
            <RiTwitterXLine className='h-5 w-5' />
          </a>
        </div>

        {/* Center Text */}
        <div className='text-sm md:text-base text-center flex-grow font-medium'>
          <span className='bg-white bg-opacity-10 px-4 py-2 rounded-full shadow-sm'>
            🌍 Luxora – Global 🚀 Shipping | 💰 Cash on Delivery
          </span>
        </div>

        {/* Contact Number */}
        <div className='hidden md:block'>
          <a href="tel:+1234567890" className="hover:text-gray-300 transition duration-300 flex items-center space-x-2">
            <span className='bg-white bg-opacity-10 px-4 py-2 rounded-full shadow-sm'>
              📞 +91 1234567890
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;