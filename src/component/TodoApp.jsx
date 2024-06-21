import React, { useState,useEffect } from "react";

function TodoApp() {
    const [date,setDate]=useState(new Date())
    const [task,setTask]=useState([
        {title:"Example Task",completed:false}
    ])
    const [value,setValue]=useState("")
   
    const handleAdd=()=>{
        // console.log(value);
        if (value.trim()) { 
            const newTasks = [...task, { title: value ,completed:false}];
            setTask(newTasks);
            setValue(""); 
        } else {
            console.log("Please add a task");
        }
        
    }
    const handleremove=(index)=>{
        const newDelete = [...task]
        newDelete.splice(index,1);
        setTask(newDelete)
        console.log("task deleted!!");
    }

    const handleCompleted = (index) => {
        const newTasks = task.map((taske, i) =>
            i === index ? { ...taske, completed: !taske.completed } : taske
        );
        setTask(newTasks);
        console.log("Completed!!");
    };

    const numberOfTasks = task.length > 0 ? task.length - 1 : 0;

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
                    <p><span className="text-danger h4">{numberOfTasks}</span> Task Pending</p>
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
                <div>
                   {
                    task.map((i,index)=>(
                        <div className="shadow d-flex align-items-center rounded mt-4 p-3" key={index}>
                        <div className="d-flex align-items-center">
                        <input
                                type="checkbox"
                                className="styled-checkbox"
                                id={`myCheckbox${index}`}
                                checked={task.completed}
                                onChange={() => handleCompleted(index)}
                            />
                        </div>
                        <div className="m-0 ps-3 w-100 text-start">
                            <p className="m-0" style={{ textDecoration: task.completed ? "line-through" : "none" }}>{i.title}</p>
                        </div>
                        <div className="text-end pe-2 ps-2">
                            <i className="fa-regular fa-circle-xmark h4 m-0 text-danger" onClick={()=>handleremove(index)}></i>
                        </div>
                    </div>
                    ))
                   }
                </div>
            </div>
    );
}

export default TodoApp;
