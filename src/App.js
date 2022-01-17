import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Address from "./components/Address";
import axios from "axios";

export default function App() {
    const [addresses, setAddresses] = useState([]);
    const [selectedFlag, setSelectedFlag] = useState(null);
    const [size, setSize] = useState(10);
    const [qsize, setQSize] = useState(size);

    //function to fetch data from the API
    const getData = useCallback(() => {
        axios
            .get(
                `https://random-data-api.com/api/address/random_address?size=${qsize}`
            )
            .then((res) => {
                setAddresses(res.data);
            });
    }, [qsize]);

    const setFlag = (countryCode) => {
        setSelectedFlag(
            "https://flagcdn.com/48x36/" + countryCode.toLowerCase() + ".png"
        );
    };

    useEffect(() => {
        getData();
    }, [getData]);

    let num = 0;
    const addressList = addresses.map((address) => {
        num++;
        return (
            <Address
                key={address.id}
                num={num}
                street_address={address.street_address}
                street_name={address.street_name}
                city={address.city}
                state={address.state}
                country={address.country}
                country_code={address.country_code}
                setFlag={() => setFlag(address.country_code)}
            />
        );
    });

    return (
        <div className='App'>
            <div className='container'>
                <header>
                    <h1>Random Address App</h1>
                </header>
                <div className='selected'>
                    <h2>Selected Flag:</h2>
                    {selectedFlag != null ? (
                        <img src={selectedFlag} alt='flag' />
                    ) : (
                        <p>No flag selected</p>
                    )}
                </div>
                <div className='input'>
                    <input
                        type='number'
                        min='1'
                        max='100'
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                    <button onClick={() => setQSize(size)}>
                        Refetch New Addresses
                    </button>
                </div>
                <div className='address-list'>{addressList}</div>
            </div>
        </div>
    );
}
