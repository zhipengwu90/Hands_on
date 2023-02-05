import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Input({textInputConfig, style, iconName, label,iconColor }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Ionicons name={iconName} size={28} color={iconColor} />
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.inputStyles} {...textInputConfig} 
      />
    </View>
  );
}
export default Input;


const styles = StyleSheet.create({ 
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 4,
      marginVertical: 8,
      paddingVertical: 6,
    },
    inputStyles: {
      paddingLeft: 10,
      fontSize: 22,
      width: "100%"
      
    }
});