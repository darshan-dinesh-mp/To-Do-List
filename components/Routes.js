import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "./Welcome";
import TodoList from './TodoList';
import { NavigationContainer } from '@react-navigation/native';

export default function Router() {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="TodoList" component={TodoList} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}