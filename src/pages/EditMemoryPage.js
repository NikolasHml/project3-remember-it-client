import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown"

const API_URL = process.env.REACT_APP_API_URL;

function EditMemoryPage(props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [usefulFor, setUsefulFor] = useState("");
    const [link, setLink] = useState("");
    const [video, setVideo] = useState("");
    const [imageUrl, setImageUrl] = useState("");

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
                setCategory(oneMemory.category)
                setDescription(oneMemory.description)
                setUsefulFor(oneMemory.usefulFor)
                setLink(oneMemory.link)
                setVideo(oneMemory.video)
                setImageUrl(oneMemory.imageUrl)
            })
            .catch((error) => console.log(error));
    }, [memoryId])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, category, description, usefulFor, link, video, imageUrl };
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
            <h3 className="headerAddNewStuff">Edit this stuff</h3>

            <form onSubmit={handleFormSubmit} className="containerAddStuff">
                <label className="labelNameIt">Rename it</label>
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

                <label>What is it about again?</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Useful for what?</label>
                <textarea
                    type="text"
                    name="usefulFor"
                    value={usefulFor}
                    onChange={(e) => setUsefulFor(e.target.value)} 
                />

                <label>Change the link?</label>
                <input
                    type="url"
                    name="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)} 
                />

                <label>Other Link to video you say?</label>
                <input
                    type="text"
                    name="video"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)} 
                />

                <label>Change the picture?</label>
                <div className="containerFieldAndUploadText">
                    <div className="containerField">
                        <div className="containerParent">
                            <div className="containerUploadPicture">
                                <p className="clickUploadText">Click to upload</p>
                                <input type="file" onChange={(e) => handleFileUpload(e)} className="uploadPicture"/>
                            </div>
                        </div>
                    </div>
                    {imageUrl ? <img src={imageUrl} alt="yours" className="editPictureDisplay"/>  : <p className="seeItText">Nothing here, yet</p> }
                </div>
                
                <div className="containerButtonsEdit">
                    <input type="submit" value="Save the changes" className="singleButtonsEdit" />
                    <button onClick={deleteMemory} className="singleButtonsEdit">Delete this stuff</button>
                    <Link to="/memory"> 
                        <button className="singleButtonsEdit">Back to your memory</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default EditMemoryPage;

