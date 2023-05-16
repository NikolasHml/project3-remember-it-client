import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown"

const API_URL = "http://localhost:5005";

function EditMemoryPage(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")

    const { memoryId } = useParams();
    const navigate = useNavigate()

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

    // Following useEffect will run after initial render and then eacht time the
    // memoryId coming from the URL changes
    useEffect (() => {
        axios
            .get(`${API_URL}/memory/${memoryId}`)
            .then((response) => {
                // We update the state with the memory data coming from the response
                // This way we set inputs to show the actual title and description of 
                // the memory
                const oneMemory = response.data;
                setTitle(oneMemory.title);
                setDescription(oneMemory.description)
                setCategory(oneMemory.category)
            })
            .catch((error) => console.log(error));
    }, [memoryId])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description, category };
        axios
            .put(`${API_URL}/memory/${memoryId}`, requestBody)
            .then((response) => {
                navigate(`/memory/${memoryId}`) 
            })
            .catch((error) => console.log(error));
    };

    const deleteMemory = () => {
        axios
            .delete(`${API_URL}/memory/${memoryId}`)
            .then(() => {
                navigate("/memory");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h3>Edit your memory</h3>

            <form onSubmit={handleFormSubmit}>
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
                    onChange={(e) => setDescription(e.target.value)}
                />

                 <label>category</label> 
                <p>{category}</p>

                <Dropdown autoClose="outside">
                    <Dropdown.Toggle className="menuIcon">
                        category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>                
                            <input
                                // fct to be able to press spacebar in input field
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) =>
                                    e.keyCode === 32 ? e.stopPropagation() : null
                                }
                            type="text"
                            name="category"
                            value={category}
                            onChange={ (e) => setCategory(e.target.value)}
                            />
                        </Dropdown.Item>
                {mapCategory.map((oneCategory) => {
                    return (
                        <Dropdown.Item>
                            <div key={oneCategory._id}>
                                <p onClick={(e) => setCategory(e.target.innerText)}>{oneCategory}</p>
                            </div>
                        </Dropdown.Item>
                    )
                })}       
                    </Dropdown.Menu>
                </Dropdown>

                {/* Test: */}
{/*                 {mapCategory.map((oneCategory) => {
                    for (i = 0; i < mapCategory.length; i++) {
                                    oneCategory.category[i] === oneCategory.category[i-1] ? oneCategory.category : "nope")
                    return (
                            <div key={oneCategory._id}>
                                <p>
                              {/*   {for (i = 0; i < mapCategory.length; i++) {
                                    oneCategory.category[i] === oneCategory.category[i-1] ? oneCategory.category : "nope"
                                }} 
                                {oneCategory.category[0] === oneCategory.category[1] ? oneCategory.category : "nope"}</p>
                            </div>)})} */}

                <input type="submit" value="Save the changes" />
                <button onClick={deleteMemory}>Delete this stuff</button>
                <Link to="/memory"> {/* das vllt dann mit dem Pfeil zurück ersetzen */}
                    <button>Back to your memories</button>
                </Link>
            </form>
        </div>
    )
}

export default EditMemoryPage;

