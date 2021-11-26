import {React} from "react";
import {makeStyles} from "@mui/styles";
import {Table,TableBody,TableCell,TableHead,TableRow,Typography} from '@mui/material';
import {useUserValue} from "../utils/reducer";
import {styles} from "./styles";
import nodatafound from "../no-data-found.png";

export const UserList = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [{userDetails},dispatch] = useUserValue();
    return (
    <div className = {classes.listContainer1}>
        <div className = {classes.listContainerHeader}>
            <Typography>List of Users</Typography>
        </div>
        
        <div style = {{display : "flex"}}>
        {
            userDetails.length ? 
            <Table>
                <TableHead>
                    <TableRow>
                            <TableCell>Sl No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userDetails?.map((eachUser,index) => {
                            const {name,age,email,phoneNumber} = eachUser;
                            return(
                                <TableRow key = {name}>
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>  
                                    <TableCell>{name}</TableCell>  
                                    <TableCell>{age}</TableCell>  
                                    <TableCell>{email}</TableCell>  
                                    <TableCell>{phoneNumber}</TableCell>  
                                </TableRow>
                                
                            )
                        })
                    }
                </TableBody>
                
            </Table>

            :
            <img src={nodatafound} alt = "no-data-found" width = "100%" height= "70%"/>
        }
        </div>
    </div>
    )
}
