"use client";
import { useState, memo, ChangeEvent, ChangeEventHandler, FormEventHandler, FormEvent } from 'react';

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getCoords = async () => {
    const pos : GeolocationPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
        latitude : pos.coords.latitude,
        longitude : pos.coords.longitude,
        timestamp: pos.timestamp
    };
};

type Data = {
    email: string,
    password:string
};

const LoginForm = () => {
    const [data, setData] = useState<Data>({
        email: '',
        password:''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) => {
        setData((prev)=> {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    const handleSubmit : FormEventHandler<HTMLFormElement> = async (e:FormEvent,) => {
        e.preventDefault()
        try {
            const position = await getCoords()
            console.log('position is: ', position);
            const response  = await fetch('http://localhost:8000/login', {
                mode: 'cors',
                method: "POST",
                headers: {
                    "Content-Type" : 'application/json',
                    'Accept': 'application/json',
                    'Origin' : 'http://localhost:3000'
                },
                body: JSON.stringify({...position, ...data, })
            });

    
        } catch (err) {
            console.warn(err);
        }

    } 

    return (
        <form onSubmit={handleSubmit}>
        <legend>Login</legend>
        <fieldset>
            <legend>Email</legend>
            <input 
                type="email"
                name="email"
                required
                maxLength={32}
                minLength={6}
                onChange={handleChange}
            />
        </fieldset>
        <fieldset>
            <legend>Password</legend>
            <input 
                type={showPassword ?  "password" : 'text'}
                name="password"
                required
                maxLength={32}
                minLength={6}
                onChange={handleChange}
            />
            <button
                type='button'
                onClick={()=> setShowPassword(!showPassword)}   
            >
                Show Password
            </button>
        </fieldset>
        
        <button
            type="submit"
        >
            Login
        </button>
    </form>
    )
};

export default memo(LoginForm);