import React, {useEffect} from 'react';
import {withLessons} from './LessonProvider'

const QueueContainer = (props) => {
    const {getQueue} = props

    useEffect(()=> {
        getQueue()
        const interval = setInterval(() => {
            getQueue()
          }, 1000);
          return () => clearInterval(interval);
    },[getQueue])


    const mappedQueue = props.queue.map((person, i) => {
        let millis = Date.now() - person.timeEntered;
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0) - 1;
        return <div  key={person.name+i}>
            <h1>{person.name} <span className='del-queue' onClick={() => props.deleteQueueItem(person.name)}>X</span></h1>
            <p>{minutes > 59 ? '01:' : ''}{minutes < 10 ? 0 : ''}{minutes + ":" + (seconds < 10 ? '0' : '') + seconds}</p>
        </div>})
    return (
        <div className='queue-container'>
            <button onClick={props.addToQueue}>Join Queue</button>
            <div className='queue'>
                {mappedQueue}
                {props.name === 'admin1423' ?
                    <button onClick={props.clearQueue}>Clear Queue</button>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default withLessons(QueueContainer);