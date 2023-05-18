import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown"
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function AddMemory(props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [usefulFor, setUsefulFor] = useState("");
    const [link, setLink] = useState("");
    const [video, setVideo] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, category, description, usefulFor, link, video, imageUrl};
        axios
            .post(`${API_URL}/memory`, requestBody)
            .then(() => {
                navigate("/memory")
            //props.refreshMemory(); ---> später löschen? 
            })
            .catch((error) => console.log(error));
    };
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

    const handleFileUpload = (e) => {
        const uploadData = new FormData();

        uploadData.append("imageUrl", e.target.files[0]);

        axios
            .post(`${API_URL}/upload`, uploadData)
            .then((res) => setImageUrl(res.data.fileUrl))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <h3 className="headerAddNewStuff">Add new stuff to your memory</h3>

            <form onSubmit={handleSubmit} className="containerAddStuff">
                <label className="labelNameIt">Name it</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />

                <div className="categoryContainer">
                <Dropdown autoClose="outside">
                    <Dropdown.Toggle className="menuIcon extraCategoryAdd">
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
                            required
                            className="inputCategoryAddStuff"
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
                {category ? <label>{category}</label> : null }
                </div>

                <label>What is it about?</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Useful for</label>
                <textarea
                    type="text"
                    name="usefulFor"
                    value={usefulFor}
                    onChange={(e) => setUsefulFor(e.target.value)} 
                />

                <label>Have a link?</label>
                <input
                    type="url"
                    name="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)} 
                />

                <label>Link to video you say?</label>
                <input
                    type="text"
                    name="video"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)} 
                />

                <label>Got a picture?</label>
                <div className="containerFieldAndUploadText">
                    <div className="containerField">
                        <div className="containerParent">
                            <div className="containerUploadPicture">
                                <p className="clickUploadText">Click to upload</p>
                                <input type="file" onChange={(e) => handleFileUpload(e)} className="uploadPicture"/>
                            </div>
                        </div>
                    </div>
                    {imageUrl ? <p className="seeItText">Yep, I can see it!</p> : <p className="seeItText">Nothing here, yet</p> }
                </div>
                <button type="submit" className="buttonsHomepage">Add this stuff!</button> 
            </form>
        </div>
    )
}

export default AddMemory;