import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Fontisto, AntDesign } from '@expo/vector-icons';
import styles from './styles/styles';
import SplashScreen from './components/Splash'
import LoginScreen from './components/Login';
// import ProductsScreen from './components/Products'
import { render } from 'react-dom';

class CartScreen extends React.Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello!</Text>
      </View>
    );
  }
}

class DetailScreen extends React.Component {

  componentDidMount() {
    console.log(this.props.route.params)
  }

  render() {
    return (
      <View>
        <Image
          style={detailStyles.image}
          source={{ uri: this.props.route.params.image }}
        />
        <Text style={detailStyles.title}>Product {this.props.route.params.product}</Text>
        <Text style={detailStyles.type}>Product Type</Text>
        <Text style={detailStyles.price}>${this.props.route.params.product}.99</Text>
      </View>
    );
  }
}

const HomeTab = createBottomTabNavigator();

function Home({ route, navigation }) {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Cart') {
            return (
              <MaterialIcons
                name={'local-grocery-store'}
                size={size}
                color={focused ? '#0066cc' : 'gray'}
              />
            );
          } else if (route.name === 'Products') {
            return (
              <Fontisto
                name='shopping-store'
                size={size}
                color={focused ? '#0066cc' : 'gray'}
              />
            );
          } 
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0066cc',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}
      >
      <HomeTab.Screen name= "Products" component={Products} />
      <HomeTab.Screen name= "Cart" component={CartScreen} />
    </HomeTab.Navigator>
  )
}
const ProductsStack = createStackNavigator();
function Products({route, navigation}) {
  // console.log(route)
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name= 'Products'
        component= {ProductsScreen}
        options={{
          headerLeft: null,
          headerTitleStyle: {
            color: '#0066cc'
          }
        }}
      />
      <ProductsStack.Screen
        name="Product Detail"
        component= {DetailScreen}
      />
    </ProductsStack.Navigator>
  )
}

function ProductsScreen({route, navigation}) {
  let items = Array.apply(null, Array(60)).map((v, i) => {
    return {
      id: i,
      src: 'http://placehold.it/200x200?text=' + (i + 1)
    };
  });
  const [state, setState] = useState({
    data: items
  })

  return (
    <SafeAreaView style={productStyles.container}>
      <FlatList
        data={state.data}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={ () => navigation.push('Product Detail', {image: item.src, product: item.id})}>
            <View style={productStyles.item}>
              <Image
                style={productStyles.imageThumbnail}
                source={{ uri: item.src }}
              />
              <Text style={productStyles.title}>Product {item.id}</Text>
              <Text style={productStyles.type}>Product Type</Text>
              <Text style={productStyles.price}>${item.id}.99</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={SplashScreen}
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            // gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const productStyles = StyleSheet.create({
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

const detailStyles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 400,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    marginVertical: 0,
    marginHorizontal: 10,
    fontWeight: 'bold'
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    marginVertical: 2,
    marginHorizontal: 10,
    fontWeight: '200'
  },
  price: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    color: '#0066cc'
  },
})

export default App;