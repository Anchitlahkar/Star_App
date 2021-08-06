import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-elements/";

export default class DeatailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      details: {},
      url: "http://cors-anywhere.herokuapp.com/https://f33fd1c7278e.ngrok.io/",    // workes only on webpage url

      // url: "https://f33fd1c7278e.ngrok.io/", // workes only on phone url
    };
  }

  OpenLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Cannot fetch Data Now!!!");
    }
  };

  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url + `Star?name=${this.props.navigation.getParam("star_name")}`)
      .then((response) => {
        return this.setState({ details: response.data.data });
      })
      .catch((error) => {
        alert(error.message);
        this.OpenLink(`https://en.wikipedia.org/wiki/${this.props.navigation.getParam("star_name")}`)
      });
  };

  componentDidMount() {
    this.getDetails();
  }

  render() {
    const { details } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />

        <Card title={details.name}>
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 18 }}
            >{`Name: ${details.name}`}</Text>
            <Text
              style={[styles.cardItem, { marginTop: 10 }]}
            >{`Distance: ${details.Distance}`}</Text>
            <Text style={styles.cardItem}>{`Mass: ${details.Mass}`}</Text>
            <Text style={styles.cardItem}>{`Radius: ${details.Radius}`}</Text>
            <Text style={styles.cardItem}>{`Gravity: ${details.Gravity}`}</Text>
          </View>
        </Card>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.OpenLink(`https://en.wikipedia.org/wiki/${details.name}`);
          }}
        >
          <Text
            style={{
              fontSize: 26,
              alignSelf: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >{`More About ${details.name}`}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },

  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "yellow",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    height: "5%",
    width: "25%",
    marginTop: 20,
    backgroundColor: "blue",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
  },
});
