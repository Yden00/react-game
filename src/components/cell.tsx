import React from 'react'
import './app.css'


export default function Cell(props: any) {
  return (
    <div className='cell'>
      {props.value}
    </div>
  )
}