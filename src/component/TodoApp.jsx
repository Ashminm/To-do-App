import React, { useState,useEffect } from "react";

function TodoApp() {
    const [getitem, setGetItem] = useState([]);
    const [getType, setGetType] = useState("");
    const [date,setDate]=useState(new Date())
   
    useEffect(()=>{
        setInterval(()=>setDate(new Date()),1000)
    },[])
    // console.log(date);
    return (
        <div>
            <div className="todo-container">
                <div className="p-5 shadow" style={{ borderRadius: "18px", backgroundColor: "#38ef7ece"}}>
                    <h2 className="pb-4 m-0 text-start">
                        TODAY<i className="fa-solid fa-minus"></i> {date.toLocaleDateString()}
                    </h2>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            placeholder="Enter Your Task"
                            className="form-control p-3 "
                            id="Transparant"
                            style={{ borderRadius: "30px" }}
                            value={getType}
                            onChange={(e) => setGetType(e.target.value)}
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
                            onClick={() => setGetItem([...getitem, {id:Date.now(),text:getType,status:false}])}
                        >
                            add
                        </button>
                    </div>
                </div>
                <div>
                    {
                        getitem ? getitem.map((item)=>(
                            <div className="shadow d-flex align-items-center rounded mt-4 p-3">
                        <div className="d-flex align-items-center">
                            <input type="checkbox" onChange={(e)=>{console.log(e.target.checked);console.log(item);
                            setGetItem(getitem.filter(values=>{
                                if(values.id===item.id){
                                    values.status=e.target.checked
                                }
                                return values
                            }))
                            
                            }} value={item.status} className="styled-checkbox" id="myCheckbox" />
                        </div>
                        <div className="m-0 ps-3 w-100 text-start">
                            <p className="m-0">{item.text}</p>
                        </div>
                        <div className="text-end pe-2 ps-2">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </div>
                    </div>
                        )):(
                            <p className="text-danger">no items</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
