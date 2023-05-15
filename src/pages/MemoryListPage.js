import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddMemory from "./AddMemoryPage";

const API_URL = "http://localhost:5005";

function MemoryListPage() {
    const [memories, setMemories] = useState([]);

    const getAllMemory = () => {
        axios
            .get(`${API_URL}/memory`)
            .then((response) => setMemories(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllMemory();
    }, [ ]);

    return (
        <div>
            {/* <AddMemory refreshMemory={getAllMemory} /> ---> später löschen?*/}
            <Link to="/addmemory">
                <button>Add new stuff to my memory</button>
            </Link>

            {memories.map((memory) => {
                return (
                    <div key={memory._id}>
                        <Link to={`/memories/${memory._id}`}>
                            <h3>{memory.title}</h3>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default MemoryListPage;