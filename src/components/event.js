import React from 'react';
import equal from 'fast-deep-equal'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data, 
            outcomes:{},
            odds:[],
            homeOdds:'',
            awayOdds:'',
            drawOdds:''
         }

         this.convertToOdds = this.convertToOdds.bind(this);
         this.odds = this.odds.bind(this);
         this.updateData = this.updateData.bind(this);
    }

    convertToOdds() {
        this.setState({
            outcomes: this.props.data.markets.filter(m => m.code === '3W-1X2')[0].outcomes
        },
        () => {
            this.odds(this.state);
        })
    }

    odds(state) {

        let o = "";
        let c = "";
        let d = "";
        let  r = "";
        let n = "";
        let s = "";
        let p = "";

        let e = state.outcomes;
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
        this.updateData();
        this.convertToOdds();
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.data, prevProps.data))
        {
          this.updateData();
        }
      } 

    updateData() {
        this.setState({
            data: this.props.data
        })
        console.log('cambio');
    }

    render() { 
        return ( 
            <div>
                <div className="matcheFlex">
                    <div className="matcheContent">
                        <div>{this.state.data.competitors[0].description }</div>
                        <div>X</div>
                        <div>{this.state.data.competitors[1].description}</div>
                    </div>
                    <div className="matcheContent">
                        <div>{this.state.homeOdds}<b>%</b></div>
                        <div>{this.state.drawOdds}<b>%</b></div>
                        <div>{this.state.awayOdds}<b>%</b></div>
                    </div>
                </div>
            </div>
         );
    }
}

export default Event;