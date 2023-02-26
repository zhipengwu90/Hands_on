import { View, Text,Button } from 'react-native';
import Toast from 'react-native-root-toast';

function Notification(){
    const handler = () => {
        console.log('Go to Home');
        Toast.show('This is an error message', {
            duration: 900,
            position: Toast.positions.CENTER,
            backgroundColor: '#076a60',
            shadow: true,
            animation: true,
        });
    };


     
    return (
        <View>
            <Text>Notification</Text>
            <Button title="click me" onPress={handler}/>
        </View>
    )
};

export default Notification; 