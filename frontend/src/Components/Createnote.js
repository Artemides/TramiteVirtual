import React, { Component } from 'react'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class Createnote extends Component {
    state={
        users:[],
        userSelected:"",
        date: new Date(),
        title: "",
        content:"",
        editing: false,
        _id:""
    }
    async componentDidMount(){
         
         const res= await axios.get("http://localhost:3200/api/users/")
         this.setState({users: res.data.map(user=>user.name),
            userSelected: res.data[0].name
        })
         console.log(this.state.users)
         if(this.props.match.params.id){
            const res=await axios.get("http://localhost:3200/api/notes/"+this.props.match.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing:this,
                _id:this.props.match.params.id
            })
         }
    }
    onSubmit=async (e)=>{
        e.preventDefault();
        const newNote={
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        if(this.state.editing){
            await axios.put("http://localhost:3200/api/Notes/"+this.state._id,newNote)
        }else{
            await axios.post("http://localhost:3200/api/Notes/",newNote) 
        }
        window.location.href='/';

    }
    onInputChange = e=> {
        this.setState({
           [e.target.name]: e.target.value
        })
    }
    onChangeDate= date=>{
        this.setState({date})
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create One Note </h4>
                    {/** Select User */}
                    <div className="form-group">
                        <select className="form-control" name="userSelected" onChange={this.onInputChange}
                        value={this.state.userSelected}>
                            {
                                this.state.users.map(user=> 
                                <option key={user} value={user}>
                                    {user}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Titulo" name="title" required
                        onChange={this.onInputChange} value={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <textarea name="content" className="form-control" placeholder="Content" required 
                        onChange={this.onInputChange} value={this.state.content}>

                        </textarea>
                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control"selected={this.state.date}
                         onChange={this.onChangeDate} value={this.state.date}/>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
