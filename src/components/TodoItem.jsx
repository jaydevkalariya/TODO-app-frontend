import {React,useState} from "react";

const TodoItem = ({
  title,
  description,
  user,
  deleteHandler,
  deadline,
  setDetailonModal,
  id,
  filter
}) => {
  return (
    <>
   

<div class="card" style={{width: "24rem",margin:"0.3rem auto"}}>
<div class="card-body">
  <h5 class="card-title">{title}</h5>
  <p class="card-text">{description}</p>
  <p><b>Deadline: </b>{deadline}</p>
  <div>
        <button style={{width:"30%",fontSize:"0.7rem",margin:"0 0.2rem"}} onClick={() => setDetailonModal(id,title,description)} className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
        {filter==="1"?<>
        <button style={{width:"30%",fontSize:"0.7rem",margin:"0 0.2rem"}} onClick={() => deleteHandler(id)} className="btn">
          Delete
        </button>
        <button style={{width:"30%",fontSize:"0.7rem",margin:"0 0.2rem"}}  onClick={() => setDetailonModal(id)} className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          share
        </button></>
        :""}
      </div>
      {filter==="0"?<>
      <hr />
      <div>
        <b>By: </b> {user}
      </div>
      </>
      :""}
      {
        new Date()> new Date(deadline)?<>
        <div style={{color:"red",fontWeight:"bold",margin:"0.5rem 0.5rem"}}>
        you miss your deadline!!
      </div>
      </>:""}
</div>

</div>
</>
  );
};

export default TodoItem;
