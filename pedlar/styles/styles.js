import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: '#444',
    borderWidth: 1
 	},
	submitButton: {
			backgroundColor: '#444',
			padding: 10,
			margin: 15,
			height: 40,
	},
	submitButtonText:{
			color: 'white'
	}
});

export default styles;