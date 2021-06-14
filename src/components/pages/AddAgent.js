import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


//adding an agent
function AddAgent() {

    const [agent, setAgent] = useState([])

    //assigning fields for agent to map 
    const { firstName, middleName, lastName, dob, heightInInches } = agent;

    // set agent on change of input with target value
    const onInputChange = (e) => {
        setAgent({ ...agent, [e.target.name]: e.target.value })
    }

    //using this to navigate to previous page
    let history = useHistory();

    // triggered on clicking submit button
    const onSubmit = async (e) => {
        e.preventDefault()

        //setting agent id to zero for adding agent
        agent.id = 0;

        //validation from server 
        if (agent.heightInInches < 36 || agent.heightInInches > 96) {
           alert('Please enter height between 36 to 96');
           return;
        }
            
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(agent)
        };

        fetch("http://localhost:8080/api/agent", init)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("response is not 200 OK")
                }
                return response.json();
            })
            .then(json => setAgent(json))
            .catch(console.log)
        // push back to previous page after adding
        history.push("/")
    }


    return (
        <div style={{background: "lightgrey"}} className="container">
            <h1 style={{ background: "lightgrey" }}>Add an Agent</h1>
            <form style={{ background: "lightgrey" }} onSubmit={e => onSubmit(e)}>
                <div className="col-md-4">
                    <label for="validationServer01" className="form-label">First name</label>
                    <input style={{ background: "lightgrey" }} type="text"
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
                        style={{ background: "lightgrey" }}
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
                        style={{ background: "lightgrey" }}
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
                        style={{ background: "lightgrey" }}
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
                        style={{ background: "lightgrey" }}
                        className="form-control is-valid"
                        id="validationServer02"
                        name="heightInInches"
                        value={heightInInches} required
                        onChange={e => onInputChange(e)}/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" style={{ background: "black" }} type="submit">Submit form</button>
                </div>
            </form>
        </div>
    )
}

export default AddAgent;