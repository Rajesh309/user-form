import React, { useReducer } from "react";
import {makeStyles} from "@mui/styles"
import {UserForm} from "./form";
import { UserList } from "./user_list";
import {initialState,reducer,UserContext} from "../utils/reducer";
import {styles} from "./styles";

export const UserContainer = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return (
        <UserContext.Provider value = {useReducer(reducer,initialState)}>
        <div className = {classes.container} >
            <div className = {classes.userContainer}>
                <UserForm />
            </div>
            <div className = {classes.listContainer}>
                <UserList />
            </div>
        </div>
        </UserContext.Provider>
    )
}