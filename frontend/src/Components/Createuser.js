import React, { Component } from 'react'
import axios from "axios";

export default class Createuser extends Component {
    state = {
        users: [],
        name: ''
    }

    getUsers = async () => {
        const res = await axios.get("http://localhost:3200/api/users/");
        this.setState({ users: res.data });
    }
    async componentDidMount() {
        //ejecutar funciones una vez montada
        this.getUsers();
    }
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3200/api/users/", { username: this.state.name })
        this.setState({ name: '' })
        this.getUsers();
    }
    onChangeUserName = (e) => {
        this.setState({
            name: e.target.value
        })

    }
    deleteUser = async (id,name) => {
        console.log("Elminado: "+name +" : "+id)
        await axios.delete("http://localhost:3200/api/users/"+id)
        this.getUsers();
        
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new Users</h3>
                        <form action="" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onChangeUserName}
                                    value={this.state.name} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user =>
                                (<li className="list-group-item  list-group-item-action"
                                    onDoubleClick={() => this.deleteUser(user._id,user.name)}
                                    key={user._id}>
                                    {user.name}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
