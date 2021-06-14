import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddAgent() {

    const [agent, setAgent] = useState([])

    const { firstName, middleName, lastName, dob, heightInInches } = agent;



    const onInputChange = (e) => {

        //agent height between 36-96
        setAgent({ ...agent, [e.target.name]: e.target.value })
    }

    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()

        agent.id = 0;

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