import { View, Text, SafeAreaView, FlatList, ScrollView, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";
import TaskData from "../../data/dummy-data.js";
import ViewButton from "../../components/ViewButton";
import Task from "../../components/Task";
function TaskPageCompleted({navigation}) {
  let NewTaskData = TaskData.filter((item) => item.isCompleted === true);


    function renderCategoryItem(itemData) {
        function pressHandler() {
          navigation.navigate("Details", {
            id: itemData.item.id,
          });
        }
    
        return (
          <ViewButton onPress={pressHandler}>
            <Task
              title={itemData.item.title}
              status={itemData.item.status}
              date={itemData.item.date}
              price={itemData.item.price}
              category={itemData.item.category}
            />
          </ViewButton>
        );
      }


    
  return (
    <SafeAreaView >
        <View style={styles.container}>
        <FlatList
        data={NewTaskData}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
      </View>
    </SafeAreaView>
  );
}

export default TaskPageCompleted;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },


});
