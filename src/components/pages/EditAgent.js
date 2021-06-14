import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';

// update an agent (works same as add)
function EditAgent() {

    let history = useHistory();
    const { id } = useParams();
  
    useEffect(()=> {
        loadAgent();
    },[])

    const [agent, setAgent] = useState([])

    const { firstName, middleName, lastName, dob, heightInInches } = agent;

    const onInputChange = (e) => {

        //agent height between 36-96
        setAgent({ ...agent, [e.target.name]: e.target.value })
    }

    

    const onSubmit = async (e) => {
        e.preventDefault()

        if(agent.heightInInches < 36 || agent.heightInInches > 96 ){
            console.log('in inappro')
            return "height value not appropriate";
        }

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(agent)
        };
       
        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status !== 201) {
                    return Promise.reject("response is not 200 OK")
                }
                return response.json();
            })
            .then(json => setAgent(json))
            .catch(console.log)

        history.push ("/")
    }

    const loadAgent = async()=>{
        const fetchAgent = await fetch(`http://localhost:8080/api/agent/${id}`);
        try {
            if (fetchAgent) {
                const typeToJson = await fetchAgent.json();
                console.log(typeToJson)
                setAgent(typeToJson);
            }
            if (fetchAgent.status !== 200) {
                return Promise.reject("Agent fetch by Id failed")
            }
        } catch (err) {
            console.log("Error in fetching an Agent", err);
        }
    }

    return (
        <div style={{background: "lightgrey"}} className="container">
            <h1>Edit an Agent</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="col-md-4">
                    <label for="validationServer01" className="form-label">First name</label>
                    <input type="text"
                        className="form-control is-valid"
                        id="validationServer02"
                        name="firstName"
                        value={firstName} required
                        onChange={e => onInputChange(e)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="validationServer02" className="form-label">Middle name</label>
                    <input type="text"
                        className="form-control is-valid"
                        id="validationServer02"
                        name="middleName"
                        value={middleName} required
                        onChange={e => onInputChange(e)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="validationServer02" className="form-label">Last name</label>
                    <input type="text"
                        className="form-control is-valid"
                        id="validationServer02"
                        name="lastName"
                        value={lastName} required
                        onChange={e => onInputChange(e)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="validationServer02" className="form-label">DOB</label>
                    <input type="date"
                        className="form-control is-valid"
                        id="validationServer02"
                        name="dob"
                        value={dob} required
                        onChange={e => onInputChange(e)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="validationServer02" className="form-label">Height In Inches</label>
                    <input type="number"
                        className="form-control is-valid"
                        id="validationServer02"
                        name="heightInInches"
                        value={heightInInches} required
                        onChange={e => onInputChange(e)} />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-warning" type="submit">Update User</button>
                </div>
            </form>
        </div>
    )
}

export default EditAgent;