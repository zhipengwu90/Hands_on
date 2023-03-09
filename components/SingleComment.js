import { View, Text, StyleSheet } from "react-native";
const SingleComment = (props) => {
  const { name, review, rating, date } = props;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{rating}</Text>
      <Text>{date}</Text>
      <Text>{review}</Text>
    
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 7,
    marginHorizontal: 25,
    minHeight: 100,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,

    alignItems: "center",
    paddingLeft: 10,
  },
});
