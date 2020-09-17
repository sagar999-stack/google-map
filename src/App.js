import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";

import ReactDOM from "react-dom";
const {
  MarkerWithLabel,
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

Geocode.setApiKey("AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw");
Geocode.enableDebug();

class Map extends React.Component {
  // constructor() {
  //   super();

  //   this.state = { show: false, name: this.state.markerPosition.lat };

  //   this.state = {
  //     username: "",
  //     age: null,
  //   };
  // }
  state = {
    username: "",
    age: "",
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: "",
    height: "",
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                console.log(response);
                const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
                console.log("city", city, area, state);
                this.setState({
                  address: address ? address : "",
                  area: area ? area : "",
                  city: city ? city : "",
                  state: state ? state : "",
                });
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }

  handleModel() {
    this.setState({ show: true });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    // let age = this.state.age;
    // if (!Number(age)) {
    //   alert("Your age must be a number");
    // }
    console.log(this.state);
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  getval = () => {
    return this.state.mapPosition.lat;
  };
  render() {
    const { fname, lname, email } = this.state;
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            onClick={this.handleModel.bind(this)}
            google={this.props.google}
            name={"Dolores park"}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{
                lat: this.state.markerPosition.lat + 0.0018,
                lng: this.state.markerPosition.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {" "}
                  {this.state.markerPosition.lat}
                </span>
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ))
    );
    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.mySubmitHandler}>
              <h1>
                Hello {this.state.username} {this.state.age}
              </h1>
              <p>Enter your name:</p>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.myChangeHandler}
              />
              <p>Enter your age:</p>
              <input
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.myChangeHandler}
              />
              <br />
              <br />
              <input type="submit" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAF3ySfCqXH67Stzv3zkVxn3qhg5L8923Y&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;

