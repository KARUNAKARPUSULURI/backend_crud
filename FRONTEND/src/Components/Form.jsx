import React, { Component } from 'react'

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(this.state)
        })
    }
    render() {
        return (
            <div>
                <h1>Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' placeholder='email' name='email' onChange={this.handleChange} />
                    <input type='password' placeholder='password' name='password' onChange={this.handleChange} />
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}
