import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import MockData from '../MockData'

const ElectionView = () => {
    // const {user} = useAuthContext();
    const user = "Test user";

    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [candidates, setCandidates] = useState();
    
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/elections/${id}`
            );
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setCategory(response.data.category);
            setDescription(response.data.description);
            setCandidates(response.data.candidates)
        }
        catch (error) {
            console.log("Something went wrong");
            console.log(error);  
        }
    }

    const goBack = () => {
        navigate("/all-elections/");
    }

    const submitVote = () => {
        alert("[Your vote has been counted] dummy");
        navigate("/all-elections/");
    }

    const showCandidates = () => {
        if (candidates) {
            const parsedJson = JSON.parse(candidates);
            return (
                <form>
                    {Object.keys(parsedJson).map(
                            x =>
                            <div className="row mb-3 form-check">
                                <input type="radio" class="btn-check" name="options-outlined" id={x} autocomplete="off"></input>
                                <label className="btn btn-outline-success" for={x}>{x}</label>
                            </div>
                        )}
                        <div className="d-flex justify-content-center">
                            <button type="reset" className="btn btn-warning mt-5 w-50" onClick={submitVote}>Vote!</button>
                        </div>
              </form>
        )
        }
        else {
            return (
                <div>Loading...</div>
            )
        }
    }

    useEffect(() => {
        // if(user) {
        //     fetchData();
        // }
        const data = MockData()[id];
        setTitle(data.title);
        setAuthor(data.author);
        setCategory(data.category);
        setDescription(data.description);
        setCandidates(data.candidates)
    })

    return (
        <div className="container">
            <div className="row mt-3 mb-3">
                <div className="col">
                    <button className="btn btn-secondary" onClick={goBack}>&lt; go back</button> 
                </div>
            </div>
            <div className="card p-3">
                <div class="card-body">
                    <h3 class="card-title text-center">{title}</h3>
                    <p className="mt-5 mb-3">{description}</p>
                    <h6 className="mt-3 mb-3">Author: {author}</h6>
                    <h6 className="mt-3 mb-3">Category: {category}</h6>
                    <div className="container mt-5 mb-3">{showCandidates()}</div>
                </div>
            </div>
        </div>
    );
}
export default ElectionView