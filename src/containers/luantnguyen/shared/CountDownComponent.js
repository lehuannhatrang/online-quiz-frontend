import React, { Component } from 'react';

class CountDown extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var countDownDate = this.props.to.getTime();
        var x = setInterval((() => {
            var now = new Date().getTime();
            
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            var time = (hours < 10 ? ("0"+hours): hours) + " : " + (minutes < 10 ? ("0"+minutes): minutes) + " : " + (seconds < 10 ? ("0"+seconds): seconds);
            document.getElementById('count-down').innerHTML = "" + time;
                
            if (distance < 0) {
                clearInterval(x);
                this.props.handleEndTimeout();
            }
    
        }).bind(this), 1000);
    }

    render() {
        return (
            <div id="count-down" style={{color: 'red'}}>
            </div>
        )
    }
}

export default CountDown;