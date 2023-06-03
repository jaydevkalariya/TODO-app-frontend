import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../index";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";


const Home = () => {
  const [shareEmail,setShareEmail]=useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sharedTasks, setSharedTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updatetitle,setUpdatetitle]=useState("");
  const [updatedescription,setUpdatedescription]=useState("");
  const { isAuthenticated } = useContext(Context);
  const [id,setUpdateid]=useState("");
  
  const [currentPage, setCurrentPage] = useState('page1');
  
  const handleButton1Click = () => {
    setCurrentPage('page1');
  };

  const handleButton2Click = () => {
    setCurrentPage('page2');
  };




  const setDetailonModal=(id,title,description)=>{
    setUpdatedescription(description);
    setUpdatetitle(title);
    setUpdateid(id);
  }
  const shareModal=(id)=>{
    setUpdateid(id);
  }
  const updateHandler = async () => {
    console.log(id);
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {
           title:updatetitle,
           description:updatedescription,
           deadline:deadline
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const shareHandler = async () => {
    try {
      const { data } = await axios.post(`${server}/task/share/${id}`, {
        email:shareEmail,
      },
      {
        withCredentials: true,
      }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
          deadline
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
       
      });

      axios
      .get(`${server}/task/sharedtasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setSharedTasks(res.data.tasks);
      })
      .catch((e) => {
        
      });


  }, [refresh]);


  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{height:"200px"}}
            />
             <input
              type="datetime-local"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
    

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Title: <input type="text" onChange={(e)=>{setUpdatetitle(e.target.value)}} class="form-control" value={updatetitle} placeholder="Enter Title" aria-label="Username" aria-describedby="basic-addon1"/> <br />
        Description:  <input type="text" class="form-control" onChange={(e)=>{setUpdatedescription(e.target.value)}} value={updatedescription} placeholder="Enter Description" aria-label="Username" aria-describedby="basic-addon1"/>
        Deadline:   <input
              type="datetime-local"
              required
              class="form-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateHandler} data-bs-dismiss="modal">update</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">share Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Email: <input type="email" onChange={(e)=>{setShareEmail(e.target.value)}} class="form-control" value={shareEmail} placeholder="Enter email" aria-label="email" aria-describedby="basic-addon1"/> <br />

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={shareHandler} data-bs-dismiss="modal">share</button>
      </div>
    </div>
  </div>
</div>





<hr />
<div style={{textAlign:"center"}}>
<button onClick={handleButton1Click} className="btn" style={{fontSize:"0.9rem",padding:"1rem 0rem",margin:"0.5rem 0.5rem"}}>Your tasks:</button>
      <button onClick={handleButton2Click} className="btn"  style={{fontSize:"0.9rem",padding:"1rem 0rem",margin:"0.5rem 0.5rem"}}>Shared tasks</button>
      </div>
      {currentPage === 'page1' && (
        <div>
          <hr />
         <h3>Your tasks</h3>
      <section className="todosContainer">
        <div className="row">
        {tasks.map((i) => (
          <div className="col-xs-4 col-sm-4 col-md-8 col-lg-6">
          <TodoItem
            title={i.title}
            description={i.description}
            deadline={i.deadline}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            setDetailonModal={setDetailonModal}
            id={i._id}
            key={i._id}
            user={i.user}
            filter="1"
          />
          </div>
        ))}
        </div>
      </section>
        </div>
      )}
      
      {currentPage === 'page2' && (
        <div>
          <hr />
          <h3>Shared tasks:</h3>
      <section className="todosContainer">
        <div className="row">
        {sharedTasks.map((i) => (
          <div className="col-xs-4 col-sm-4 col-md-8 col-lg-6">
          <TodoItem
            title={i.title}
            description={i.description}
            deadline={i.deadline}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            setDetailonModal={setDetailonModal}
            id={i._id}
            key={i._id}
            user={i.user}
            filter="0"
          />
          </div>
        ))}
        </div>
      </section>
        </div>
      )}

     
      
    </div>
    </>
  );
};

export default Home;
