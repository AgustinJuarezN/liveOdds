import React from 'react';
import equal from 'fast-deep-equal'

class Event extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            homeOdds:'',
            awayOdds:'',
            drawOdds:''
         }

         this.odds = this.odds.bind(this);
    }

    odds() {

        let o = "";
        let c = "";
        let d = "";
        let r = "";
        let n = "";
        let s = "";
        let p = "";

        let e = this.props.data.markets.filter(m => m.code === '3W-1X2')[0].outcomes;
        o = e[0].price.decimal;
        c = e[1].price.decimal; 
        d = e[2].price.decimal;
        
        o = 100 * (n = 1 / o) / (r = 100 * (n + (s = 1 / c) + (p = 1 / d))) * 100;
        c = 100 * s / r * 100;
        d = 100 * p / r * 100;

        this.setState({
            homeOdds: parseFloat(o).toFixed(2),
            awayOdds: parseFloat(c).toFixed(2),
            drawOdds: parseFloat(d).toFixed(2)
        })

    }

    componentDidMount() {
        this.odds();
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.data, prevProps.data))
        {
            this.odds();
            console.log('props changed');
            animate('add');
        }
    } 

    render() { 
        return ( 
            <div>
                <div className="matcheFlex">
                    <div className="matcheContent">
                        <div>{this.props.data.competitors[0].description }</div>
                        <div>X</div>
                        <div>{this.props.data.competitors[1].description}</div>
                    </div> 
                    <div className="matcheContent" id="odds">
                        <div className="odds">{this.state.homeOdds}<b>%</b></div>
                        <div className="odds">{this.state.drawOdds}<b>%</b></div>
                        <div className="odds">{this.state.awayOdds}<b>%</b></div>
                    </div>
                </div>
            </div>
         );
    }
}

function animate(option) {
    var element = document.getElementById("odds");
    if(option === 'add') {
        element.classList.add("animate");
    }else if(option === 'remove'){
        element.classList.remove("animate");
    }

    if(option !== 'remove') {
        setInterval(animate('remove'),5000);
    }        
}

export default Event;
