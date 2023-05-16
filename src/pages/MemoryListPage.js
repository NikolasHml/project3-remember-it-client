import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const API_URL = "http://localhost:5005";

function MemoryListPage() {
    const [memories, setMemories] = useState([]);
    const [category, setCategory] = useState("");

    const getAllMemory = () => {
        axios
            .get(`${API_URL}/memory`)
            .then((response) => setMemories(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllMemory();
    }, [ ]);

    const [mapCategory, setMapCategory] = useState([]);

    const getAllCategories = () => {
        axios
            .get(`${API_URL}/memory`)
            .then((response) => {
                const wholeArray = response.data
                const onlyCategories = wholeArray.map(singleCategory => singleCategory.category)
                const uniqueCategories = [...new Set(onlyCategories)]
                setMapCategory(uniqueCategories)})
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllCategories();
    }, [ ]);

    return (
        <div>
            {/* <AddMemory refreshMemory={getAllMemory} /> ---> später löschen?*/}
            <Link to="/addmemory">
                <button>Add new stuff to my memory</button>
            </Link>

            <Dropdown>
                    <Dropdown.Toggle className="menuIcon">
                        {!category ? "Filter by Category" : category}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                {mapCategory.map((oneCategory) => {
                    return (
                        <Dropdown.Item>
                            <div key={oneCategory._id}>
                                <p onClick={(e) => setCategory(e.target.innerText)}>{oneCategory}</p>
                            </div>
                        </Dropdown.Item>
                    )
                })}   
                        <Dropdown.Item>
                            <p onClick={() => setCategory("")}>all stuff</p>
                        </Dropdown.Item>    
                    </Dropdown.Menu>
                </Dropdown>

            {memories.map((memory) => {
                return (
                    <div key={memory._id}>
                        <Link to={`/memory/${memory._id}`}>
                            <h3>{!category ? memory.title : memory.category === category ? memory.title : null}</h3>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default MemoryListPage;