import React from "react";
import {Link} from "react-router-dom"
import user from "../images/user.png"

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item wrapper-conatact">

<Link to={{pathname: `/contact/${id}`, state:{contact: props.contact}}}>
      <div className="title-wrapper">
        <div className="img-title">
        <img className="ui avatar image" src={user} alt="user" style={{marginRight: ".7rem"}}/>
        </div>
     
     <div>
     <span className="header">{name}</span>
        <span>{email}</span>
     </div>
    </div>
      </Link>
      <div>
      <i className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", fontSize: "1.6em", cursor: "pointer"}}
        onClick={() => props.clickHander(id)}
        ></i>
<Link to={{ pathname: `/edit`, state: {contact: props.contact}}}> 
<i className="edit alternate outline icon"
        style={{ marginTop: "7px", fontSize: "1.6em", cursor: "pointer"}}
     
        ></i>
</Link>

      </div>
   
    </div>
  );
};

export default ContactCard;