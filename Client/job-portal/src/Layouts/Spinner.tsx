import React from 'react';
import spinnerImg from "../assets/img/loading.gif";

interface IProps {
}

let Spinner: React.FC<IProps> = ({}) => {
    return (
        <>
            <div className="spinner">
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <img src={spinnerImg} alt="" className="d-block m-auto"/>
                </div>
            </div>
        </>
    )
};
export default Spinner;