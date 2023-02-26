import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import TaskIconFinder from "./TaskIconFinder";

const Task = (props) => {


  const isCancelledContainer = props.status === "Cancelled"? styles.taskContainerCancelled : styles.taskContainer;
  // const isCancelled = props.status === "Cancelled"? styles.taskStatusCancelled : styles.taskStatus;
  // const isPending = props.status === "Pending"? styles.taskStatusPending : styles.taskStatus;
  // const isAccepted = props.status === "Accepted"? styles.taskStatusAccepted : styles.taskStatus;
  // const isPosted = props.status === "Posted"&& styles.taskStatus;

 

const status =()=>{
  if(props.status === "Cancelled"){
    return styles.taskStatusCancelled;
  }else if(props.status === "Pending"){
    return styles.taskStatusPending;
  }else if(props.status === "Accepted"){
    return styles.taskStatusAccepted;
  }else if(props.status === "Posted"){
    return styles.taskStatus;
  }else{
    return styles.taskStatus;
  }
}

  return (
    <View style={isCancelledContainer}>
      <View>
      
        <Image
          source={TaskIconFinder(props.category)}
          style={styles.taskIcon}
        />
      </View>
      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>{props.title}</Text>
        <Text style={styles.taskDate}>{props.date}</Text>
        <View style={styles.taskLine}>
          <Text style={styles.taskPrice}>${props.price}</Text>
          <Text style={status()}>⦿{props.status}</Text>
        </View>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#fff",
    marginVertical: 7,
    marginHorizontal: 25,
    height: 100,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  taskContainerCancelled: {
    backgroundColor: "#dfdfdf",
    marginVertical: 7,
    marginHorizontal: 25,
    height: 100,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  taskIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  taskBox: {
    flex: 1,
    height: 100,
    justifyContent: "space-evenly",
  },


  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDate: {
    fontSize: 12,
    color: "#808080",
  },
  taskLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
    borderTopColor: "#d2cdcd",
    borderTopWidth: 1,
    paddingTop: 5,
    paddingHorizontal: 13,
  },
  taskPrice: {
    color: "#bb3532",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskStatus: {
    color: "#008c8c",
    fontWeight: "bold",
  },
  taskStatusPending: {
    color: "#ff8c00",
    fontWeight: "bold",
  },
  taskStatusCancelled: {
    color: "#a10000",
    fontWeight: "bold",
  },
  taskStatusAccepted: {
    color: "#000000",
    fontWeight: "bold",
  },

});
