import { Text, View, Animated, StyleSheet } from 'react-native';
import { GestureHandlerRootView, State, PanGestureHandler } from "react-native-gesture-handler";

export default function Task({ id, title, completed, onDelete, onChangeStatus }) {
  const translateX = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }], {
    useNativeDriver: false
  });


  const onHandlerStateChange = (e) => {
    // Check if the gesture is in the 'end' state, meaning the gesture is finished
    if (e.nativeEvent.state === State.END) {
      // If in the 'end' state, check if horizonta traslation is less than -100 units. This means the user has swiped to the left more than 100 units
      if (e.nativeEvent.translationX < -100) { //translationX        
        onDelete(id);
      } else if (e.nativeEvent.translationX > 100) {
        onChangeStatus(id);

      }
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
  };

  const animatedStyle = {
    transform: [{ translateX: translateX }]
  };
  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={animatedStyle}>
          <Text
            style={completed ? styles.text : [styles.text, styles.textCompleted,]}>{title}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#ffd50072",
    fontSize: 20,
    marginVertical: 10,
    paddingVertical: 5
  },
  textCompleted: {
    textDecorationLine: "line-through"
  }
});