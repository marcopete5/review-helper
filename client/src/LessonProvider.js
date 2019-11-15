import React, { Component } from 'react';
import axios from 'axios'
const {Provider, Consumer} = React.createContext()

class LessonProvider extends Component {
    constructor(){
        super()

        this.state = {
            selectedToReview: [],
            voted: {},
            voteDisplay: {},
            name: JSON.parse(localStorage.getItem('name')) || '',
            currentModule: '',
            prevModule: '',
            moduleIds: JSON.parse(localStorage.getItem('moduleIds')) || {},
            votesId: '',
            queueId: '',
            queue: []
        }
    }

    clearQueue = () => {
        axios.delete(`/queue/${this.state.queueId}`).then(res => {
            this.setState({queue: []})
        })
    }

    deleteQueueItem = name => {
        if((name === this.state.name || this.state.name === 'admin1423') && this.state.queue.length > 1){
            axios.put(`/queue/${this.state.queueId}`, {queue: this.state.queue.filter(el => el.name !== name)}).then(res => {
                this.setState(({queue}) => ({queue: queue.filter(el => el.name !== name)}))
            })
        }else {
            this.clearQueue()
        }
    }

    getQueue = () => {
        axios.get('/queue').then(res => {
            if(res.data.length){
                this.setState({queue: res.data[0].queue, queueId: res.data[0]._id})
            }
        })
    }

    addToQueue = () => {
        if(this.state.name === 'admin1423'){
            console.log('admin can not join queue')
        }else if(this.state.queue.length === 0){
            axios.post('/queue', {queue: [{name: this.state.name, timeEntered: Date.now()}]}).then(res => {
                this.setState({queue: res.data.queue, queueId: res.data._id})
            })
        }else if(!this.state.queue.some(person => person.name === this.state.name) && this.state.queue.length){
            let now = Date.now()
            axios.put(`/queue/${this.state.queueId}`, {queue: [...this.state.queue, {name: this.state.name, timeEntered: now}]}).then(res => {
                this.setState(({queue, name}) => ({queue: [...queue, {name: this.state.name, timeEntered: now}]}))
            })
        }
    }

    setName = name => {
        localStorage.setItem("name", JSON.stringify(name))
        this.setState({name: JSON.parse(localStorage.getItem('name'))})
    }

    getVotes = (mod) => {
        if(this.state.moduleIds[mod]){
            axios.get('/votes/' + this.state.moduleIds[mod]).then(res => {
                // console.log(res.data, 'other')
                if(Object.keys(res.data).length !== 0){
                    this.setState(({currentModule}) =>({voted: res.data.topics, votesId: res.data._id, currentModule: mod, prevModule: currentModule }), ()=> this.displayGraph())
                }
            })
        }else {
            axios.post('/votes', {topics: {nothing: 'yet'}, module: mod}).then(res => {
                this.setState(({moduleIds, currentModule}) => {
                    return {
                            votesId: res.data._id, 
                            currentModule: res.data.module, 
                            prevModule: currentModule,
                            voted: {},
                            moduleIds: {
                                ...moduleIds,
                                [res.data.module]: res.data._id
                            }
                    }
                    }, ()=> {
                        localStorage.setItem('moduleIds', JSON.stringify(this.state.moduleIds))
                        this.displayGraph()
                    })
            })
        }
    }
    
    addSelected = (lesson, mod) => {
        if(this.state.name === 'admin1423') {
            console.log('admin does not get to vote')
        }else {
            // Copy the object
            const votedList = {...this.state.voted}
            // Check if lesson already exists in the object
            if(votedList[lesson]){
                // Add to it if it does
                votedList[lesson] = [...votedList[lesson], this.state.name]
            }else {
                // Create the property if it doesn't
                votedList[lesson] = [this.state.name]
            }
            // If there is already a selected 
            if(this.state.votesId){
                delete votedList.nothing
                axios.put(`/votes/${this.state.votesId}`, {topics: votedList, module: mod}).then(res => {
                    this.updateVotes(lesson, mod)
                })
            }else {
                this.updateVotes(lesson, mod)
            }
        }
    }

    updateVotes = (lesson, mod) => {
        this.setState(({selectedToReview, voted, name}) => {
            if(!this.state.voted[lesson]){
                return {
                    selectedToReview: [...selectedToReview, lesson],
                    voted: {
                        ...voted, 
                        [lesson]: [name]
                    },
                    currentModule: mod
                }
            }else {
                return {
                    selectedToReview: [...selectedToReview, lesson],
                    voted: {
                        ...voted, 
                        [lesson]: [...voted[lesson], name]
                    },
                    currentModule: mod
                }
            }
        }, ()=> this.displayGraph(mod))
    }


    displayGraph = (mod) => {
        const setDisplay =() => {
            for(let el in this.state.voted){
                this.setState(({voteDisplay, voted}) => ({
                        voteDisplay: {
                            ...voteDisplay,
                            [el]: [...new Set(voted[el])].length
                        }
                    }))
            }
        }
        if(this.state.prevModule === this.state.currentModule){
            setDisplay()
        }else {
            this.setState({voteDisplay: {}}, ()=> {
                setDisplay()
            })
        }

    }

    resetVotes = () => {
        axios.put(`/votes/${this.state.votesId}`, {topics: {nothing: 'yet'}}).then(res => {
            this.setState({voted:{}, voteDisplay: {}, selectedToReview: []})
        })
    }


    render() {

        return (
            <Provider value={{
                ...this.state,
                getQueue: this.getQueue,
                addToQueue: this.addToQueue,
                deleteQueueItem: this.deleteQueueItem,
                clearQueue: this.clearQueue,
                resetVotes: this.resetVotes,
                addSelected: this.addSelected,
                getVotes: this.getVotes,
                setName: this.setName
            }}>
               {this.props.children} 
            </Provider>
        );
    }
}

export default LessonProvider;

export const withLessons = C => props => <Consumer>
                                            {value => <C {...value}{...props} /> }     
                                         </Consumer>