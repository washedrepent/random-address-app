import "./Address.css";
export default function Address(props) {
    return (
        <div className='address'>
            <span>Address {props.num}:</span>
            <span>{props.street_address + ", " + props.street_name}</span>
            <span>
                {props.city + ", " + props.state + ", " + props.country}
            </span>
            <span>{props.country_code}</span>
            <button className='flg-btn' onClick={props.setFlag}>
                Show Flag
            </button>
        </div>
    );
}
