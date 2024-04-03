import React, { useState, useEffect } from 'react';
import './Home.css';
import addIcon from './add.png';
import TaskCard from '../../components/TaskCard/TaskCard';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [category, setCategory] = useState('');

    const checkNewTask = () =>{
        if(newTask === ''){
            setErrorMsg('Please enter a task')
            return false;
        }
        else if (newTask.length < 5){
            setErrorMsg('Task should be atleast 5 characters long.')
            return false;
        }
        else{
            setErrorMsg('');
            return true
        }
    }

    const addTask = ()=>{

        const validation = checkNewTask(); 
        if(!validation)
            return;

            const newTasks = [
                ...tasks,
                {
                    title : newTask,
                    category: category
                }]
                saveTasksToLS(newTasks);
                setTasks(newTasks)
        setNewTask('');
    }
    

    const deleteTask = (index) => {
        const newTasks = tasks;
        newTasks.splice(index, 1);
        setTasks([...newTasks]);
        saveTasksToLS(newTasks)
    }

    useEffect(()=> {
        if(tasks.length === 0){
            return;
        }
        saveTasksToLS(tasks)
    }, [tasks]);

    useEffect(()=>{
        const tasksLS = localStorage.getItem('tasks');
        if(tasksLS){
            setTasks(JSON.parse(tasksLS));
        }
    }, [])
   

    const saveTasksToLS = (tasksToSave) => {
        localStorage.setItem('tasks', JSON.stringify(tasksToSave))
    }
  return (
        <div className='todo-container'>
            <p className='project-title'>TODO-APP ⏳</p>
            <div className='tasks-container'>
                {
                tasks.map((task, i) => {
                    const {title, category} = task; 
                    return (
                        <TaskCard title={title}
                            category = {category} 
                            key={i} 
                            delFunction={deleteTask}
                            index={i}
                        />
                    )
                })
                }
            </div>


            <p className='error-msg'>{errorMsg}</p>

            <div className='input-container'>
                <input type='text' className='new-task-input' placeholder='Enter a Task' value={newTask} onChange={(e)=>{
                        setNewTask(e.target.value);
                }}/>

                <select className='select-category'value={category} onChange={(e) => {
                    setCategory(e.target.value)
                }}>
                    <option className='select-category' value=''>Category</option>
                    <option className='select-category' value='🏫 College'> 🏫 College</option>
                    <option className='select-category' value='📗 Study'> 📗 Study</option>
                    <option className='select-category' value='🏠 Daily'> 🏠 Daily</option>
                    <option className='select-category' value='🎾 Hobby'> 🎾 Hobby</option>
                </select>

                <img src={addIcon} className='add-task-icon' onClick={addTask}/>
            </div>
        </div>
  )
}

export default Home