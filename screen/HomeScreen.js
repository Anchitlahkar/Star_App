import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import { ListItem } from "react-native-elements";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      list_data: [],
      url: "https://raw.githubusercontent.com/Anchitlahkar/Python-files/master/Kaggle/star_data.json",
    };
  }

  getData = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        return this.setState({ list_data: response.data.data });
      })
      .catch((error) => alert(error.message));
  };
  renderItem = ({ item, idx }) => (
    <ListItem
      style={{ color: "grey" }}
      bottomDivider
      {...console.log(item.name)}
      onPress={() => {
        this.props.navigation.navigate("Details", { star_name: item.name });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{`Star: ${item.name}`}</ListItem.Title>
        <ListItem.Subtitle>{`Distance: ${item.Distance}`}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    this.getData();
  }

  render() {
    const { list_data } = this.state;
    console.log(list_data);
    if (this.state.list_data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            style={{ width: "25%", height: "40%", marginTop: 20 }}
            source={{
              uri: "https://media3.giphy.com/media/WiIuC6fAOoXD2/200w.webp?cid=ecf05e47td7gp4tub69h4keae1i1fa0j8td7uidean36ue8f&rid=200w.webp&ct=g",
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView />

        {/* Header */}
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Star Data</Text>
        </View>

        {/* Body */}
        <View style={{ backgroundColor: "white", marginTop: 20 }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.list_data}
            renderItem={this.renderItem}
          />
        </View>
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
});
