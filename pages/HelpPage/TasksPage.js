import { View, Text, SafeAreaView, FlatList, ScrollView, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";
import TaskData from "../../data/dummy-data.js";
import ViewButton from "../../components/ViewButton";
import Task from "../../components/Task";
import { useContext } from "react";
import { ItemDataContext } from "../../store/data-context";


function TasksPage({navigation}) {

    const dataCtx = useContext(ItemDataContext);
    const TaskData = dataCtx.itemData.filter((item)=> item.isCompleted === false);

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
              category={itemData.item.taskType}
            />
          </ViewButton>
        );
      }


    
  return (
    <SafeAreaView>
        <View style={styles.container}>
        {TaskData.length? <FlatList
          data={TaskData}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          style={{}}
        /> : <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>There is no task.</Text>}
      </View>
    </SafeAreaView>
  );
}

export default TasksPage;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },


});
