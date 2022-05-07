import React from "react";


const Message = ({alertType, children}) => {
    return (
        <div className={`alert ${alertType}`} role="alert">
            {children}
        </div>
    )
}

export default Message
