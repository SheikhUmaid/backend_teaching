import {user_db, notes_db} from "../db.js"
import { v4 } from "uuid";


function is_user_existing(username, db){


    for(let i = 0;i<db.length;i++){
        if(db[i].username === username){
            return true;
        }
    }

    return false;
}

const createUser = (req,res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(404).json({
            message:"body must contain username and password"
        })
    }

    if(username ==="" || password ===""){
        return res.status(403).json({
            message:"username and password should not be empty"
        })
    }

    if(is_user_existing(username, user_db)){
        return res.status(403).json({
            message:"username already exists"
        })
    }


    // safe area
    const user_data = {
        id:v4(),
        username:username,
        password:password
    }


    user_db.push(user_data)

    return res.status(201).json({
        message:"Usernae created successfully",
    })

}


const loginUser = (req,res)=>{
    const  {username, password}=req.body;

    if(!username || !password){
        return res.status(404).json( {
            message:"username and password is necessary!"
        })
    }
    for(let i=0;i<user_db.length;i++){
        if(user_db[i].username===username && user_db[i].password===password){
            return res.json({
                key:user_db[i].id
            })
        }
    }

    return res.status(404).json({
        message:"user not found"
    })

}


export {createUser,loginUser};