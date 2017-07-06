import React ,{ Component} from 'react';
import ReactDOM from 'react-dom';

import Marker from './Marker';

var styled = [
    {
        "featureType": "all",
        "stylers": [
            {
                "saturation": 0
            },
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    }
]

class Maps extends Component {

  constructor(props) {
    super(props);

    console.log(Object.keys(props).map((key)=>{
      return props[key];
    }));

    console.log("%%%%%     % ", this.props.initialCenter.lat);

    this.state = {
        lat: (this.props.initialCenter.lat !== undefined)? this.props.initialCenter.lat : 0,
        lng: (this.props.initialCenter.lng !== undefined)? this.props.initialCenter.lng : 0,
        mapObj: undefined
    }
  }

	componentDidMount() {
    this.loadMap();
  }
	
	componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

	loadMap() {
		console.log("%%% " + (this.props !== undefined && this.props.google !== undefined));
    if (this.props !== undefined && this.props.google !== undefined) {
      // google is available
      // const google = this.props.google;
      // const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      

      let zoom = 14;
      let lat = this.state.lat;
      let lng = this.state.lng;

      console.log("%%^%^% " + lat, lng);

      const center = new window.google.maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        styles: styled
      })
			
      var mapObj = new window.google.maps.Map(node, mapConfig);
      // window.google.maps.map = this.map;
      
      //events
      const evtNames = ["dragend"];

      evtNames.forEach(e => {
        mapObj.addListener(e, this.handleEvent(e));
      });

      this.setState({
        mapObj: mapObj
      })

      console.log("map call", this.state.map);
    }
	}

  recenterMap() {
    // const map = this.map;
    const lat = this.state.lat;
    const lng = this.state.lng;

    // const google = this.props.google;
    // const maps = google.maps;

    if (this.state.mapObj) {
        let center = new window.google.maps.LatLng(lat, lng)
        this.state.mapObj.panTo(center)
    }
  }

  handleEvent(evtName) {
    let timeout;
    const handlerName = evtName;
    console.log("Setting Event: " + evtName);
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 1000);
    }
  }

  renderChildren() {
    const {children} = this.props;
    var self = this;
    if (!children) return;

    console.log("$$$ ", children);
    return React.Children.map(children, c => {
      return (<Marker mapObj={this.state.mapObj} position={{lat : this.state.lat, lng : this.state.lng}} />);
    })
  }

  render() {
    const style = {
      height: "100%",
      width: "100%"
    }
    return (
      <div style={style} ref='map'>
        Loading Map...
        {this.renderChildren()}
      </div>
    )
  }
}

export default Maps;