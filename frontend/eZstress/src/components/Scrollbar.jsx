"use client"

import React from "react"

export default function Scrollbar({ children, maxHeight = "100%" }){
  return (
    <div
      className={`
        overflow-auto
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-gray-300
        hover:scrollbar-thumb-gray-400
        scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full
      `}
      style={{
        maxHeight,
      }}
    >
      {children}
      <style>{`
        /* Webkit browsers (Chrome, Safari) */
        div::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #d1d5db; /* gray-300 */
          border-radius: 10px;
        }

        /* Hover state for the thumb on Webkit */
        div::-webkit-scrollbar-thumb:hover {
          background: #9ca3af; /* gray-400 */
        }
        
        div::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  )
}
