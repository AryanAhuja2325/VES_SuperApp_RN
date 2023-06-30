import React from 'react';
import { View, Text } from 'react-native';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import Gallery from './gallery/Gallery';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from '../../store';
// import Infra from './gallery/Infra';
// import Event from './gallery/Event';
const stack = createNativeStackNavigator();

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<stack.Navigator>
					<stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
					<stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
					<stack.Screen name="Gallery" component={Gallery} options={{ headerShown: true }} />
				</stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
