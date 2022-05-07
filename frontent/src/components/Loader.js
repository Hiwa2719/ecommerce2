import React from "react";


const Loader = () => {
    return (
        <div className="spinner-border" style={{height:'100px', width: '100px', margin: 'auto', display: 'block'}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Loader
