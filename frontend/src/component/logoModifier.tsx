import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function LogoModifier({logoName}:any) {
  return (
    <img className='w-[30px] h-[30px] rounded' src={`http://localhost:3000/svg/${logoName}.svg`} crossOrigin="anonymous"/>
  )
}

