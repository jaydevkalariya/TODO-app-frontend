import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../index";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updatetitle,setUpdatetitle]=useState("");
  const [updatedescription,setUpdatedescription]=useState("");
  const { isAuthenticated } = useContext(Context);
  const [id,setUpdateid]=useState("");
  const setDetailonModal=(id,title,description)=>{
    setUpdatedescription(description);
    setUpdatetitle(title);
    console.log(id);
    setUpdateid(id);
  }
  const updateHandler = async () => {
    console.log(id);
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {
           title:updatetitle,
           description:updatedescription
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
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
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
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
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateHandler} data-bs-dismiss="modal">update</button>
      </div>
    </div>
  </div>
</div>

      <section className="todosContainer">
        <div className="row">
        {tasks.map((i) => (
          <div className="col-xs-4 col-sm-4 col-md-8 col-lg-6">
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            setDetailonModal={setDetailonModal}
            id={i._id}
            key={i._id}
          />
          </div>
        ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
