import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import FirstButton from "./FirstButton";
import { useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
function NewTaskForm(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskTitle: "",
      price: "",
      taskType: "",
      scheduled: "",
      address: "",
      description: "",
    },
  });

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="taskTitle"
      />
      {errors.taskTitle && <Text style={styles.error}>This is required.</Text>}
      <Text style={styles.label}>Task Price</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType= "numeric"
          />
        )}
        name="price"
      />
      {errors.price && <Text style={styles.error}>This is required.</Text>}

      <Text style={styles.label}>Gender</Text>
      <Controller
        name="gender"
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.dropdownGender}>
            <DropDownPicker
              style={styles.dropdown}
              open={genderOpen}
              value={genderValue} //genderValue
              items={gender}
              onBlur={onBlur}
              setOpen={setGenderOpen}
              setValue={setGenderValue}
              setItems={setGender}
              placeholder="Select Gender"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />







      <View style={styles.buttonBox}>
        <FirstButton
          style={styles.submit}
          buttonText={styles.submitText}
          onPress={handleSubmit(onSubmitHandler)}
        >
          Submit
        </FirstButton>
        <FirstButton
          onPress={props.onClick}
          style={styles.cancel}
          buttonText={styles.cancelText}
        >
          Cancel
        </FirstButton>
      </View>

      {/* <Button title="Submit" onPress={handleSubmit(onSubmitHandler)} /> */}
    </View>
  );
}

export default NewTaskForm;

const styles = StyleSheet.create({
  container: {},
  input: {
    marginHorizontal: 30,
    padding: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  label: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 3,
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 5,
    backgroundColor: "#008c8c",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
  },
  cancel: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 40,
    backgroundColor: "#D35D5D",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "#cd2121",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: "white",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginHorizontal: 30,
  },
});
