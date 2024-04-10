"use client";
import { useState, memo, ChangeEvent, ChangeEventHandler, FormEventHandler, FormEvent } from 'react';
import Options from "@/components/options/Options";
import { optionProps } from "@/interfaces/props";

const states : optionProps[] = [
    { l: 'Alabama', v: 'AL' },
    { l: 'Alaska', v: 'AK' },
    { l: 'American Samoa', v: 'AS' },
    { l: 'Arizona', v: 'AZ' },
    { l: 'Arkansas', v: 'AR' },
    { l: 'California', v: 'CA' },
    { l: 'Colorado', v: 'CO' },
    { l: 'Connecticut', v: 'CT' },
    { l: 'Delaware', v: 'DE' },
    { l: 'District of Columbia', v: 'DC' },
    { l: 'Federated States of Micronesia', v: 'FM' },
    { l: 'Florida', v: 'FL' },
    { l: 'Georgia', v: 'GA' },
    { l: 'Guam', v: 'GU' },
    { l: 'Hawaii', v: 'HI' },
    { l: 'Idaho', v: 'ID' },
    { l: 'Illinois', v: 'IL' },
    { l: 'Indiana', v: 'IN' },
    { l: 'Iowa', v: 'IA' },
    { l: 'Kansas', v: 'KS' },
    { l: 'Kentucky', v: 'KY' },
    { l: 'Louisiana', v: 'LA' },
    { l: 'Maine', v: 'ME' },
    { l: 'Marshall Islands', v: 'MH' },
    { l: 'Maryland', v: 'MD' },
    { l: 'Massachusetts', v: 'MA' },
    { l: 'Michigan', v: 'MI' },
    { l: 'Minnesota', v: 'MN' },
    { l: 'Mississippi', v: 'MS' },
    { l: 'Missouri', v: 'MO' },
    { l: 'Montana', v: 'MT' },
    { l: 'Nebraska', v: 'NE' },
    { l: 'Nevada', v: 'NV' },
    { l: 'New Hampshire', v: 'NH' },
    { l: 'New Jersey', v: 'NJ' },
    { l: 'New Mexico', v: 'NM' },
    { l: 'New York', v: 'NY' },
    { l: 'North Carolina', v: 'NC' },
    { l: 'North Dakota', v: 'ND' },
    { l: 'Northern Mariana Islands', v: 'MP' },
    { l: 'Ohio', v: 'OH' },
    { l: 'Oklahoma', v: 'OK' },
    { l: 'Oregon', v: 'OR' },
    { l: 'Palau', v: 'PW' },
    { l: 'Pennsylvania', v: 'PA' },
    { l: 'Puerto Rico', v: 'PR' },
    { l: 'Rhode Island', v: 'RI' },
    { l: 'South Carolina', v: 'SC' },
    { l: 'South Dakota', v: 'SD' },
    { l: 'Tennessee', v: 'TN' },
    { l: 'Texas', v: 'TX' },
    { l: 'Utah', v: 'UT' },
    { l: 'Vermont', v: 'VT' },
    { l: 'Virgin Island', v: 'VI' },
    { l: 'Virginia', v: 'VA' },
    { l: 'Washington', v: 'WA' },
    { l: 'West Virginia', v: 'WV' },
    { l: 'Wisconsin', v: 'WI' },
    { l: 'Wyoming', v: 'WY'}
];

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
    first_name: string;
    last_name: string,
    cell_phone: string,
    birthday: string,
    email: string,
    confirm_email:string,
    password:string,
    confirm_password:string,
    address_line_one:string,
    address_line_two:string,
    city:string,
    state:string,
    country:string,
    postal_code:string,
};

const  SignupForm = () => {
    const [data, setData] = useState<Data>({
        first_name: '',
        last_name: '',
        cell_phone: '',
        birthday: '',
        email: '',
        confirm_email:'',
        password:'',
        confirm_password:'',
        address_line_one:'',
        address_line_two:'',
        city:'',
        state:'AL',
        country:'US',
        postal_code:'',
    });
    const [isChecked, setIsChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) => {
        setData((prev)=> {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    const handleSelect : ChangeEventHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setData((prev)=> {
            return {...prev, [e.target.name]:e.target.value}
        });
    };

    const handleChecked : ChangeEventHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setIsChecked(!isChecked);
    };

    const handleSubmit : FormEventHandler<HTMLFormElement> = async (e:FormEvent,) => {
        e.preventDefault()
        try {
            const position = await getCoords()
            console.log('position is: ', position);
            const response  = await fetch('http://localhost:8000/signup', {
                mode: 'cors',
                method: "POST",
                headers: {
                    "Content-Type" : 'application/json',
                    'Accept': 'application/json',
                    'Origin' : 'http://localhost:3000'
                },
                body: JSON.stringify({...position, ...data, 'tc': isChecked})
            });

            const user = await response.json();
    
            localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
            console.warn(err);
        }

    } 

    return (
        <form onSubmit={handleSubmit}>
        <legend>Signup</legend>
        <fieldset>
            <legend>Tells Us About Yourself</legend>
            <label>First Name:
                <input 
                    type="text"
                    name="first_name"
                    maxLength={32}
                    minLength={2}
                    required
                    pattern="[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%^&*(){}|~<>;:[\]]{1,32}"
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name: 
                <input 
                    type="text"
                    name="last_name"
                    maxLength={32}
                    minLength={2}
                    required
                    pattern="[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%^&*(){}|~<>;:[\]]{1,32}"
                    onChange={handleChange}

                />
            </label>
            <label>
            Cell Phone: 
            <input 
                type="tel"
                name="cell_phone"
                required
                onChange={handleChange}
            />
        </label>
        <label>
            Birth Day: 
            <input 
                type="date"
                name="birthday"
                min="1900-01-01"
                pattern="\d{4}-\d{2}-\d{2}"
                required
                onChange={handleChange}
            />
        </label>
        </fieldset>
        <fieldset>
            <legend>Email</legend>
            <label>
                Email: 
                <input 
                    type="email"
                    name="email"
                    required
                    maxLength={32}
                    minLength={6}
                    onChange={handleChange}
                />
            </label>
            <label>
                Confirm Email: 
                <input 
                    type="email"
                    name="confirm_email"
                    required
                    maxLength={32}
                    minLength={6}
                    onChange={handleChange}
                />
            </label>
        </fieldset>
        <fieldset>
            <legend>Password</legend>
            <label>
                Password: 
                <input 
                    type={showPassword ?  "password" : 'text'}
                    name="password"
                    required
                    maxLength={32}
                    minLength={6}
                    onChange={handleChange}
                />
            </label>
            <label>
                Confirm Password: 
                <input 
                    type={showPassword ?  "password" : 'text'}
                    name="confirm_password"
                    required
                    maxLength={32}
                    minLength={6}
                    onChange={handleChange}
                />
            </label>
            <button
                type='button'
                onClick={()=> setShowPassword(!showPassword)}   
            >
                Show Password
            </button>
        </fieldset>
        
        <fieldset>
            <legend>Primary Address</legend>
            <label>
                Address Line One: 
                <input 
                    type="text"
                    name="address_line_1"
                    required
                    maxLength={32}
                    minLength={6}
                    // pattern="[a-zA-Z0-9]"
                    onChange={handleChange}
                />
            </label>
            <label>
                Address Line Two: 
                <input 
                    type="text"
                    name="address_line_2"
                    // pattern="^[a-zA-Z0-9]$"
                    onChange={handleChange}
                />
            </label>
            <label>
                City: 
                <input 
                    type="text"
                    name="city"
                    maxLength={32}
                    minLength={3}
                    pattern="^[a-zA-Z0-9]{4,10}$"
                    required
                    onChange={handleChange}
                />
            </label>
            <label>
                State: 
                <select
                    required
                    onChange={handleSelect}
                    name='state'
                >
                    <Options options={states} />
                </select>
            </label>
            <label>
                Country: 
                <select
                    onChange={handleSelect}
                    value='country'
                    required
                >
                    <option 
                        value="US"
                    >
                        US
                    </option>
                </select>
            </label>
            <label>
                Zip Code: 
                <input 
                    type="text"
                    name="postal_code"
                    title="Five or ten digit zip code"
                    pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
                    maxLength={10}
                    required
                    onChange={handleChange}
                />
            </label>
        </fieldset>
        <label>
                Checking This Box Means You Acknowledge Our Terms & Conditions: 
                <input 
                    type="checkbox"
                    name="tc"
                    title="Terms and conditions"
                    required
                    checked={isChecked}
                    onChange={handleChecked}
                />
            </label>
        <button
            type="submit"
            disabled={!isChecked}
        >
            Signup
        </button>
    </form>
    )
};

export default memo(SignupForm);