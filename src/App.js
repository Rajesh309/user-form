import './App.css';
import {Typography} from "@mui/material";
import {UserContainer} from "./components"

function App() {
  return (
    <div className="Viewport">
      <div className = "header">
      <Typography variant = "h5">USER FORM</Typography>
      </div>
      <UserContainer />
    </div>
  );
}

export default App;
