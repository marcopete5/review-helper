import React, {useEffect} from 'react';
import ModuleData from './module-data.json';
import {withRouter} from 'react-router-dom';
import Lesson from './Lesson';
import {withLessons} from './LessonProvider';



const Modules = (props) => {
    const {moduleNum} = props.match.params
    const {getVotes} = props
    useEffect(()=> {
        getVotes(moduleNum)
    },[getVotes, moduleNum])
    
    const selectedModule = ModuleData[moduleNum]
    const mappedLessons = selectedModule.map((lesson,i) => <Lesson key={i+lesson} name={lesson.name} type={lesson.type} mod={moduleNum} />)
    const mappedVoterInfo = []
    // console.log(props.voteDisplay)
    for(let topic in props.voteDisplay){
        let topicAmt = props.voteDisplay[topic]
        mappedVoterInfo.push([topic, topicAmt])
    }
    const sortedVoterInfo = mappedVoterInfo.sort(function(a, b) {
        return b[1] - a[1];
    });
    const mappedSorted = sortedVoterInfo.map(voter => {
                            return <div key={voter[0]} className='data-bar-container'>
                                <span>{voter[0]} - {[voter[1]]}</span>
                                <div className="data-bar" style={{width:voter[1]*10}}></div>
                            </div>
    })
    // mappedVoterInfo.push()
    return (
        <div className='lesson-graph-container'>
            <div className='lesson-graph lesson-container'>
                {mappedLessons}
            </div>
            <div className='lesson-graph graph'>
                {mappedSorted}
                {props.name === 'admin1423' ?
                    <button onClick={props.resetVotes}>Reset</button>
                    :
                    ''
                }
            </div>
        </div>

    );
};

export default withLessons(withRouter(Modules));