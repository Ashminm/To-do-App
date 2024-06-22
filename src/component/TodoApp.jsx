import React, { useState,useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function TodoApp() {
    const [date,setDate]=useState(new Date())
    const [task,setTask]=useState([
        // {title:"Example Task"}
    ])
    const [value,setValue]=useState("")
   
    const handleAdd=()=>{
        // console.log(value);
        if (value.trim()) { 
            const taskExists = task.some(taskItem => taskItem.title === value);
            if(!taskExists){
                const newTasks = [...task, { title: value}];
            setTask(newTasks);
            toast(`Task added successfully!`,
                {
                  icon: '🎯',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
              );

            setValue(""); 
            
            }else{
                toast("Already Exist Task!!",
                    {
                      icon: '⚠️',
                      style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#ffcc00',
                      },
                    })
                setValue("")
            }
             
        } else {
            toast("Please enter a task!",
                {
                  icon: '❌',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#cc6000',
                  },
                });
        }
        
    }
    const handleremove=(index)=>{
        const newDelete = [...task]
        newDelete.splice(index,1);
        setTask(newDelete)
        toast.success("Task deleted!",
            {
              icon: '🎯',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
    }
    const handleSelect = (index) => {
        const newTasks = [...task];
        newTasks.indexn = !newTasks.index; 
        const taskTitle = newTasks[index].title;
        setTask(newTasks); 
        // console.log(taskTitle); 
        toast.success(`You select: ${taskTitle} Task`,
            {
              icon: '💥',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
    };
    
    // const numberOfTasks = task.length > 0 ? task.length - 1 : 0;

    useEffect(()=>{
        const intervalId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(intervalId);
    },[])

    return (
      
            <div className="todo-container">
                <div className="p-5 shadow" style={{ borderRadius: "18px", backgroundColor: "#38ef7ece"}}>
                    <div className="d-flex align-items-center justify-content-between">
                    <h3 className="pb-4 m-0 text-start">
                        TODAY<i className="fa-solid fa-minus"></i> {date.toLocaleDateString()}
                    </h3>
                    <p><span className="text-danger h4">{task.length}</span> Task Pending</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            placeholder="Enter Your New Task"
                            className="form-control p-3 "
                            id="Transparant"
                            style={{ borderRadius: "30px" }}
                            value={value}
                          onChange={(e)=>setValue(e.target.value)}    
                        />
                        <button
                            className="btn p-3 ps-5 pe-5 bg-dark text-light"
                            style={{
                                position: "absolute",
                                right: "9%",
                                borderRadius: "28px",
                                outline: "none",
                                border: "1px solid #000",
                            }}
                            onClick={handleAdd}
                        >
                            add
                        </button>
                    </div>
                </div>
                <div className="mt-3" style={{height:'60vh',overflowY:'scroll'}}>
                   {
                    task.length>0 ? (
                        task.map((i,index)=>(
                            <div className="shadow d-flex align-items-center rounded mt-3 p-3" key={index}>
                            <div className="d-flex align-items-center">
                            <input
                                    type="checkbox"
                                    className="styled-checkbox"
                                    id={`checkbox-${index}`}
                                    checked={i.completed}
                                    onChange={() => handleSelect(index)}
                                />
                            </div>
                            <div className="m-0 ps-3 w-100 text-start">
                                <p className="m-0">{i.title}</p>
                            </div>
                            <div className="text-end pe-2 ps-2">
                                <i className="fa-regular fa-circle-xmark h4 m-0 text-danger" onClick={()=>handleremove(index)}></i>
                            </div>
                        </div>
                        ))
                      
                    ):(
                        <p className="m-0  mt-4 py-3">Please Add Task!</p>
                    ) }
                    
                </div>
                <Toaster position="bottom-center"
                        reverseOrder={false} />
            </div>
    );
}

export default TodoApp;
