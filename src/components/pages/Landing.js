import React from 'react';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

//landing page with list of agents and options to crud
function Landing() {

    const [agent, setAgent] = useState([]);

    useEffect(() => {
        loadAgents();
    }, []);

    //load all agents when page loads
    const loadAgents = async () => {
        const fetchAgents = await fetch("http://localhost:8080/api/agent");
        try {
            if (fetchAgents) {
                const typeToJson = await fetchAgents.json();
                console.log(typeToJson)
                setAgent(typeToJson.reverse());
            }
            if (fetchAgents.status !== 200) {
                return Promise.reject("Agent fetch failed")
            }
        } catch (err) {
            console.log("Error in fetching all Agents", err);
        }
    }

    //delete function when delete is clicked
    const deleteAgent = async (id) => {
        const deleteItem = await fetch(`http://localhost:8080/api/agent/${id}`, { method: "DELETE" });
        try {
            if (deleteItem.status === 204) {
                setAgent(agent.filter(a => a.agentId !== id));
            } else if (deleteItem.status === 400) {
                return Promise.reject("Agent not found");
            }
            else if (deleteItem.status !== 200) {
                return Promise.reject(`Delete failed with status: ${deleteItem.status}`);
            }
        } catch (err) {
            console.log("Error in fetching all Agents", err);
        }
        loadAgents();
    }

    return (
        <div className="container">
            <div className="py-4">
                <h1 style={{background: "lightgrey"}} >Agents</h1>
                <table style= {{background: "lightgrey"}} className="table border shadow ">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Middle Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Height In Inches</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agent.map((agent, index) => {
                                return (<tr >
                                    <th scope="row">{index + 1}</th>
                                    <td>{agent.firstName}</td>
                                    <td>{agent.middleName}</td>
                                    <td>{agent.lastName}</td>
                                    <td>{agent.dob}</td>
                                    <td>{agent.heightInInches}</td>
                                    <td>
                                        <Link className="btn btn-primary" style = {{background : "black"}} to = {`/agent/${agent.agentId}`}>View</Link>
                                        <Link className="btn btn-outline-primary" style = {{background : "black"}} to = {`/editAgent/${agent.agentId}`}>Edit</Link>
                                        <Link className="btn btn-danger" style = {{background : "black"}} onClick={() => deleteAgent(agent.agentId)} to = {"/"}>Delete</Link>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Landing;