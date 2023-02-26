import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import FirstButton from "../../components/FirstButton";
import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";
import ViewButton from "../../components/ViewButton";
import Task from "../../components/Task";

import { db } from "../../util/firebaseConfig";
import {
  collection,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  where,
} from "firebase/firestore";

function ViewUser(props) {
  const authCtx = useContext(AuthContext);
  const viewUserUid = props.viewUserInfo;
  const [userInfo, setUserInfo] = useState([]);
  const [taskList, setTaskList] = useState([]);
  function renderCategoryItem(itemData) {
    // function pressHandler() {
    //   navigation.navigate("Details", {
    //     id: itemData.item.id,
    //   });
    // }

    return (
      // <ViewButton onPress={pressHandler}>
      <Task
        title={itemData.item.title}
        status={itemData.item.status}
        date={itemData.item.date}
        price={itemData.item.price}
        category={itemData.item.taskType}
      />
      // </ViewButton>
    );
  }

  async function getUserInfo() {
    try {
      const docRef = doc(
        collection(doc(db, "requestData", "userList"), "allUsers"),
        viewUserUid
      );
      const collectionRef = collection(
        doc(db, "requestData", "taskList"),
        "allTasks"
      );
      const docSnap = await getDoc(docRef);
      setUserInfo(docSnap.data());

      // const unsubscribe = onSnapshot(
      //   query(
      //     collectionRef,
      //     where("uid", "==", viewUserUid),
      //     orderBy("date", "desc")
      //   ),
      //   (querySnapshot) => {
      //     const data = querySnapshot.docs.map((doc) => ({
      //       id: doc.id,
      //       title: doc.data().taskTitle,
      //       status: doc.data().status,
      //       date: doc.data().date.toDate().toLocaleString(),
      //       price: doc.data().price,
      //       taskType: doc.data().taskType,
      //       isCompleted: doc.data().isCompleted,
      //       description: doc.data().description,
      //       address: doc.data().address,
      //       estHour: doc.data().estHour,
      //       phone: doc.data().phone,
      //       uid: doc.data().uid,
      //       name: doc.data().name,
      //     }));
      //     setTaskList(data);
      //   }
      // );
      // return unsubscribe;
    } catch (err) {
      console.log(err);
      Toast.show("An error has occurred, please try again", {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: "#680808",
        shadow: true,
        animation: true,
        opacity: 1,
      });
    }
  }

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/img/profileHeader.png")}
        style={styles.bannerImg}
      />
      <View style={styles.bannerContainer}>
        <ViewButton style={styles.backClose} onPress={props.onPress}>
          <Ionicons name="close-circle-outline" size={35} color="white" />
        </ViewButton>
        <View style={styles.profileBox}>
          <Image
            source={require("../../assets/img/profile.png")}
            style={styles.userProfile}
          />
          <Text style={styles.userName}>{userInfo.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.taskBox}>
            <Text style={styles.number}>10</Text>
            <Text style={styles.infoText}>Total Tasks</Text>
          </View>
          <View style={styles.rateBox}>
            <View style={styles.scoreBox}>
              <Text style={styles.number}>4.0/5.0</Text>
              <Image
                source={require("../../assets/img/star.png")}
                style={styles.star}
              />
            </View>
            <Text style={styles.infoText}>Rating</Text>
          </View>
        </View>
      </View>
     
      <View style={styles.taskList}>
        <Text style={styles.TaskListTitle}>His Tasks</Text>
        {taskList.length ? (
          <FlatList
            data={taskList}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            style={{}}
          />
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
            There is no task.
          </Text>
        )}
      </View>
    </View>
  );
}

export default ViewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backClose: {
    position: "absolute",

    top: 50,
    right: 15,
    zIndex: 100,
  },

  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  bannerImg: {
    width: "100%",
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
  userProfile: {
    alignSelf: "center",
    width: Platform.OS === "android" ? 100 : 90,
    height: Platform.OS === "android" ? 100 : 90,
  },
  profileBox: {
    marginTop: 130,
  },
  userName: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  infoBox: {
    marginTop: Platform.OS === "android" ? 20 : 36,
    flexDirection: "row",

    width: "100%",
    justifyContent: "space-around",
  },
  taskBox: {
    alignItems: "center",
    width: "50%",
    borderEndWidth: 2,
    borderEndColor: "#858484b4",
  },
  rateBox: {
    alignItems: "center",
    width: "50%",
  },
  star: {
    width: 27,
    height: 27,
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: Platform.OS === "android" ? "800" : "700",
    lineHeight: 45,
  },
  infoText: {
    color: "#858484",
    fontSize: 15,
    fontWeight: "700",
  },
  TaskListTitle:{
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginVertical: 5,

  }
});
