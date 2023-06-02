import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  setDetailonModal,
  id,
}) => {
  return (
    // <div className="todo">
    //   <div>
    //     <h4>{title}</h4>
    //     <p>{description}</p>
    //   </div>
    //   <div>
    //     <button onClick={() => setDetailonModal(id,title,description)} className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
    //     <button onClick={() => deleteHandler(id)} className="btn">
    //       Delete
    //     </button>
    //   </div>
    // </div>
   
<div class="card" style={{width: "18rem",margin:"0.5rem auto"}}>
<div class="card-body">
  <h5 class="card-title">{title}</h5>
  <p class="card-text">{description}</p>
  <div>
        <button style={{width:"45%",fontSize:"0.7rem",margin:"0 0.2rem"}} onClick={() => setDetailonModal(id,title,description)} className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
        <button style={{width:"40%",fontSize:"0.7rem",margin:"0 0.2rem"}} onClick={() => deleteHandler(id)} className="btn">
          Delete
        </button>
      </div>
</div>
</div>
  );
};

export default TodoItem;
