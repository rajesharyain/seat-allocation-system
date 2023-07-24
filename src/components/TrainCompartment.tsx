import React from "react";

interface TrainCpmpartmentProps {
    defaultSeats?: number;
    offset?: number;
}


const TrainCpmpartment: React.FC<TrainCpmpartmentProps> = (props) => {
    const {defaultSeats=8, offset=1} = props
    return (
        <div className="container">
            <div className="left">
                <div className="flex-item">
                    <div className="item">1</div>
                    <div className="item">2</div>
                    <div className="item">3</div>
                </div>
                <div className="flex-item">
                    <div className="item">4</div>
                    <div className="item">5</div>
                    <div className="item">6</div>
                </div>
            </div>

            <div className="right">
                <div className="flex-item-col">
                    <div className="item">7</div>
                    <div className="item">8</div>
                </div>
            </div>
        </div>

    )
}
export default TrainCpmpartment;