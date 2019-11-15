import React, {useState} from 'react';
import { withLessons } from './LessonProvider';

const Home = (props) => {
    const [name, setName] = useState('')

    const handleChange = e => {
        setName(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        props.setName(name)
        props.history.push('/review')
    }
    return (
        <form onSubmit={handleSubmit} className='my-form'>
            <h1>Who Are You?</h1>
            <input type="text" 
                   value={name} 
                   onChange={handleChange} 
                   placeholder='Enter Name Here' 
                   />
            <button>Submit</button>
        </form>
    );
};

export default withLessons(Home);