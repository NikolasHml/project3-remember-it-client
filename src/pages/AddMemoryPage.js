import { useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown"

const API_URL = "http://localhost:5005";

function AddMemory(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description };
        axios
            .post(`${API_URL}/memory`, requestBody)
            .then((response) => {
                // Reset the state to empty
                setTitle("");
                setDescription("");

                //props.refreshMemory(); ---> später löschen? 
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <h3>Add new stuff to your memory</h3>

            <form onSubmit={handleSubmit}>
                <label>title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <label>description</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={ (e) => setDescription(e.target.value)}
                />

                <label>category</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={ (e) => setCategory(e.target.value)}
                />
                {/* <p>{category}</p> */}

                <Dropdown autoClose="outside">
                    <Dropdown.Toggle className="menuIcon">
                        category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>                <input
                                        onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) =>
                  e.keyCode === 32 ? e.stopPropagation() : null
                }
                    type="text"
                    name="category"
                    value={category}
                    onChange={ (e) => setCategory(e.target.value)}
                /></Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <button type="submit">Add this stuff!</button>
            </form>
        </div>
    )
}

export default AddMemory;