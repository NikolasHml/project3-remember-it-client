import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const API_URL = process.env.REACT_APP_API_URL;

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
                <button className="buttonsHomepage extraButtonList">Add new stuff to my memory</button>
            </Link>
            <h3 className="headerListAddNewStuff">Your memory</h3>

            <div className="categoryContainer">
                <Dropdown>
                        <Dropdown.Toggle className="menuIcon extraCategoryAdd">
                            {!category ? "Filter by Category" : "Category"}
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
                {category ? <label>{category}</label> : null }
            </div>

            {memories.map((memory) => {
                return (
                    <div key={memory._id}>
                        {category === memory.category && <div className="containerMemoryList">
                            <Link to={`/memory/${memory._id}`} className="linkStyleList">
                                <h4>{!category ? memory.title : memory.category === category ? memory.title : null}</h4>
                            </Link>
                                {memory.link && <a href={memory.link} className="changeTextColor showMeLink" target="_blank" rel="noopener noreferrer">show me the source</a>} 
                                {memory.video && <a href={memory.video} className="changeTextColor showMeLink" target="_blank" rel="noopener noreferrer">show me the video</a>}
                                {memory.imageUrl && <p><img src={memory.imageUrl} alt="yours" className="editPictureDisplay"/></p>}
                                </div>}
                        {!category && <div className="containerMemoryList">
                            <Link to={`/memory/${memory._id}`} className="linkStyleList">
                                <h3>{!category ? memory.title : memory.category === category ? memory.title : null}</h3>
                            </Link>
                            {memory.link && <a href={memory.link} className="changeTextColor showMeLink" target="_blank" rel="noopener noreferrer">show me the source</a>} 
                                {memory.video && <a href={memory.video} className="changeTextColor showMeLink" target="_blank" rel="noopener noreferrer">show me the video</a>}
                                {memory.imageUrl && <p><img src={memory.imageUrl} alt="yours" className="editPictureDisplay"/></p>}
                                </div>} 
                        </div>
                )
            })}
        </div>
    )
}

export default MemoryListPage;

