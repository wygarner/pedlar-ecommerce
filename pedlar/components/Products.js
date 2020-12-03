import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const apiUrl = "http://10.0.0.14:4000/graphql"

class ProductsScreen extends React.Component {
  constructor(props) {
    super();
    console.log(this)
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1)
      };
    });
    this.state = {
      data : items
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
              <View style={styles.item}>
                <Image
                  style={styles.imageThumbnail}
                  source={{ uri: item.src }}
                />
                <Text style={styles.title}>Product Title</Text>
                <Text style={styles.type}>Product Type</Text>
                <Text style={styles.price}>$99.99</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#fff',
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    marginBottom: 20,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  title: {
    fontSize: 24,
    marginVertical: 0,
    fontWeight: 'bold'
  },
  type: {
    fontSize: 16,
    marginVertical: 2,
    fontWeight: '200'
  },
  price: {
    fontSize: 20,
    marginVertical: 2,
    color: '#0066cc'
  },
});

export default ProductsScreen;
