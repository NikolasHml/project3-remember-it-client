import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function MemoryDetailsPage(props) {
    const [memory, setMemory] = useState(null);
    const { memoryId } = useParams();
    const API_URL = "http://localhost:5005"; 

    // Helper fct to retrieve memory by id
    const getMemory = () => {
        axios
            .get(`${API_URL}/memory/${memoryId}`)
            .then((response) => {
                const oneMemory = response.data;
                setMemory(oneMemory);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMemory();
    }, [] );

    return (
        <div>
            {memory && (
                <>
                    <p>{memory.category}</p>
                    <h3>{memory.title}</h3>
                    <p>{memory.description}</p>
                </>
            )}
            <Link to={`/memory/edit/${memoryId}`}>
                <button>Edit this stuff</button>
            </Link>
            <Link to="/memory"> {/* das vllt dann mit dem Pfeil zurück ersetzen */}
                <button>Back to your memories</button>
            </Link>
        </div>
    )
}

export default MemoryDetailsPage;