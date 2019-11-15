import React from 'react';
import {withLessons} from './LessonProvider'

const Module = (props) => {
    const color = props.type === 'css' ? 'gold' :
                    props.type === 'vanillaJS' ? 'green' :
                    props.type === 'react' ? 'blue' :
                    props.type === 'npm/node' ? 'red' :
                    'black'
    return (
        <>
            <p className='lesson' style={{boxShadow: `2px 2px 4px ${color}`}} onClick={()=> props.addSelected(props.name, props.mod)}>{props.name}</p>
        </>
    );
};

export default withLessons(Module);