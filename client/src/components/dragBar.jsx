import React, { useState, useRef } from "react";

function DraggableBar(){
    return(
        <div className="h-15 w-12 px-1 py-4 rounded-full  from bg-orange-300 to bg-purple-400 text-gray-100 items-center font-xs animate-pulse lg:shadow-2xl hover:bg-purple-500 hover:animate-none">Notes</div>
    )
}

export default DraggableBar;