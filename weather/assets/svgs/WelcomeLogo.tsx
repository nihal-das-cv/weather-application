import Svg, { Defs, G, Path, Circle } from "react-native-svg";

function WelcomeLogo(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      {...props}
    >
      <Defs></Defs>
      <G filter="url(#blur)" id="cloudy-day-3">
        <G transform="translate(20 10) translate(0 16)">
          <G
            style={{
              WebkitAnimationName: "am-weather-sun",
              MozAnimationName: "am-weather-sun",
              msAnimationName: "am-weather-sun",
              animationName: "am-weather-sun",
              WebkitAnimationDuration: "9s",
              MozAnimationDuration: "9s",
              msAnimationDuration: "9s",
              animationDuration: "9s",
              WebkitAnimationTimingFunction: "linear",
              MozAnimationTimingFunction: "linear",
              msAnimationTimingFunction: "linear",
              animationTimingFunction: "linear",
              WebkitAnimationIterationCount: "infinite",
              MozAnimationIterationCount: "infinite",
              msAnimationIterationCount: "infinite",
              animationIterationCount: "infinite",
            }}
          >
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(45) translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(90) translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(135) translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(180) translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(225) translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(270) translate(0 9)"
              d="M0 0L0 3"
            />
            <Path
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth={2}
              transform="rotate(315) translate(0 9)"
              d="M0 0L0 3"
            />
          </G>
          <Circle fill="orange" r={5} stroke="orange" strokeWidth={2} />
        </G>
        <Path
          d="M27.7 24.4c0-4.6-3.7-8.2-8.2-8.2-1 0-1.9.2-2.8.5-.3-3.4-3.1-6.2-6.6-6.2-3.7 0-6.7 3-6.7 6.7 0 .8.2 1.6.4 2.3-.3-.1-.7-.1-1-.1-3.7 0-6.7 3-6.7 6.7 0 3.6 2.9 6.6 6.5 6.7h17.2c4.4-.5 7.9-4 7.9-8.4z"
          fill="#57A0EE"
          stroke="#fff"
          strokeLinejoin="round"
          strokeWidth={1.2}
          transform="translate(20 10)"
        />
      </G>
    </Svg>
  );
}

export default WelcomeLogo;
