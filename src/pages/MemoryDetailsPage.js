import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function MemoryDetailsPage(props) {
    const [memory, setMemory] = useState(null);
    const { memoryId } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return (
        <div>
            {memory && (
                <>  
                    <div className="containerAddStuff">
                        <h3 className="headerDetailsStuff">{memory.title}</h3>
                        <div className="categoryContainer">
                            <p className="menuIcon extraCategoryAdd extraCategoryDetails">category</p>
                            <p className="displayCategory">{memory.category}</p>
                        </div>
                        {memory.description && <div>
                        <label className="extraLabelDetails">What is it about?</label>
                            <div className="borderForText">
                                <p>{memory.description}</p>
                            </div>
                        </div>}
                        {memory.usefulFor && <div>
                            <label className="extraLabelDetails">Useful for</label>
                                <div className="borderForText">
                                    <p>{memory.usefulFor}</p>
                                </div>
                        </div>}
                        <p className="linksDetails">
                            {memory.link && <a href={memory.link} target="_blank" rel="noopener noreferrer">Link and go!</a>}
                        </p>
                        <p className="linksDetails">
                            {memory.video && <a href={memory.video} target="_blank" rel="noopener noreferrer">Link to video!</a>}
                        </p>
                        {memory.imageUrl && <img src={memory.imageUrl} alt="1 Bild" className="imageDetails"/>}                        
                    </div>
                </>
            )}

            <div className="containerButtonsEdit">
                <Link to={`/memory/edit/${memoryId}`}>
                    <button className="singleButtonsEdit">Edit this stuff</button>
                </Link>
                <Link to="/memory"> {/* das vllt dann mit dem Pfeil zurück ersetzen */}
                    <button className="singleButtonsEdit">Back to your memory</button>
                </Link>
            </div>
        </div>
    )
}

export default MemoryDetailsPage;