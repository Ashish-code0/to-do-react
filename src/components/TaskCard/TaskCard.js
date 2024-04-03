import React from 'react';
import './TaskCard.css';
import deleteIcon from './delete.png'

function TaskCard({title, category, delFunction, index}) {
  return (
    <div className='task-card'>
        <p className='task-name'>{title}</p>
        <span className='category'>{category}</span>
        <div className='delete-section'> 
          <img src={deleteIcon} alt='delete' className='delete-icon' onClick={()=>{delFunction(index)}}/>
        </div>
        
    </div>
  )
}

export default TaskCard