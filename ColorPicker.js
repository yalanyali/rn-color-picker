import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import Svg, {
  Rect,
  Defs,
  Circle,
  LinearGradient,
  Stop,
} from 'react-native-svg';


const COLORS = {
  jet: [
    { pct: 0, color: { r: 0xff, g: 0x00, b: 0x00 } },
    { pct: 16, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 32, color: { r: 0x00, g: 0xff, b: 0x00 } },
    { pct: 48, color: { r: 0x00, g: 0xff, b: 0xff } },
    { pct: 64, color: { r: 0x00, g: 0x00, b: 0xff } },
    { pct: 90, color: { r: 0xff, g: 0x00, b: 0xff } },
    { pct: 100, color: { r: 0xff, g: 0x00, b: 0x00 } }
  ]
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "#ff0000",
      rainbowKnobPos: 0
    }
  }

  getColor = (pct) => {
    for (var i = 1; i < COLORS.jet.length - 1; i++) {
      if (pct < COLORS.jet[i].pct) {
        break;
      }
    }
    const lower = COLORS.jet[i - 1];
    const upper = COLORS.jet[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }


  onTouchEvent(name, ev) {
    if (ev.nativeEvent.locationY < 325 && ev.nativeEvent.locationY > 310) {
      this.setState({
        rainbowKnobPos: ev.nativeEvent.locationX / Dimensions.get('window').width * 100,
        color: this.getColor(ev.nativeEvent.locationX / Dimensions.get('window').width * 100)
      })
    }
  }


  render() {
    return (
      <View
        onStartShouldSetResponder={(ev) => true}
        onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
        onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
      >
        <Svg height="400" width="100%">
          <Defs>
            <LinearGradient id="hue" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
              <Stop offset="1" stopColor={this.state.color} stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="brigthness" x1="1" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#ff0000" stopOpacity="0" />
              <Stop offset="1" stopColor="#000000" stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="rainbow" x1="0" y1="1" x2="1" y2="1">
              <Stop offset={0 / 6} stopColor="#ff0000" stopOpacity="1" />
              <Stop offset={1 / 6} stopColor="#ffff00" stopOpacity="1" />
              <Stop offset={2 / 6} stopColor="#00ff00" stopOpacity="1" />
              <Stop offset={3 / 6} stopColor="#00ffff" stopOpacity="1" />
              <Stop offset={4 / 6} stopColor="#0000ff" stopOpacity="1" />
              <Stop offset={5 / 6} stopColor="#ff00ff" stopOpacity="1" />
              <Stop offset={6 / 6} stopColor="#ff0000" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <Rect
            x="0"
            y="0"
            width="100%"
            height="300"
            fill="url(#hue)"
          />
          <Rect
            x="0"
            y="0"
            width="100%"
            height="300"
            fill="url(#brigthness)"
          />

          <Rect
            x="0"
            y="310"
            width="100%"
            height="15"
            fill="url(#rainbow)"
          />

          <Circle cx={this.state.rainbowKnobPos + "%"} cy="317" r="14" strokeWidth="4" stroke="white" fill={this.state.color} onPress={(e) => { alert('touchMove', e.nativeEvent) }} />
        </Svg>
      </View>)
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
  }
});

export default ColorPicker