import React from 'react';
import axios from 'axios';
import Event from './event'

class  Live extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            odds:[]
         }
         this.reLoadOdds = this.reLoadOdds.bind(this);
    }

    reLoadOdds() {
        axios.get(`${URL}/v1/feed?clientId=1&categoryCodes=${CATEGORY_CODES}&language=pt`)
            .then(res => {
                const oddsData = res.data;
                this.setState({ odds: oddsData.events });
            })  
    }

    componentDidMount() {
        this.reLoadOdds();
        this.intervalID = setInterval(
          () => this.reLoadOdds(),
          60000
        );
      }

      componentWillUnmount() {
        clearInterval(this.intervalID);
      }

    render() { 
        return ( 
            <div>
                <h2>Live Odds</h2>
                {this.state.odds.map(event => <div key={event.id}><Event data={event} /></div>)}
            </div>
         );
    }
}

export default Live;
