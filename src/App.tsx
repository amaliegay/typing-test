import { ChangeEvent, Component } from "react";
import "./App.css";

interface State {
  typeTest: string;
  words: Array<string>;
  enteredText: string;
  correctCount: number;
  started: boolean;
  startTime: Date | null;
  wordsPerMinute: number;
}

class App extends Component {
  state: State = {
    typeTest:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, molestias qui. Odio sequi fuga temporibus nulla hic modi architecto culpa quasi, obcaecati voluptatum odit eius ex. Dolorum sapiente porro id!",
    words: [],
    enteredText: "",
    correctCount: 0,
    started: false,
    startTime: null,
    wordsPerMinute: 0,
  };

  componentDidMount(): void {
    this.setState({ words: this.state.typeTest.split(" ") });
  }

  wordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

  checkFinished = (): void => {
    if (!this.state.words.length) {
      if (this.state.startTime) {
        const timeMillis: number =
          new Date().getTime() - this.state.startTime?.getTime();
        const wpm = this.wordsPerMinute(this.state.typeTest.length, timeMillis);
        this.setState({ wordsPerMinute: wpm });
      }
    }
  };

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!this.state.started) {
      this.setState({ started: true, startTime: new Date() });
    }
    const enteredText = e.currentTarget.value.trim();
    this.setState({ enteredText });
    if (enteredText === this.state.words[0]) {
      this.setState({ correctCount: this.state.correctCount + 1 });
      this.setState({ enteredText: "" });
      this.setState({ words: this.state.words.slice(1) }, (): void =>
        this.checkFinished()
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.wordsPerMinute}</h1>
        <h6>{this.state.words.map((word) => word + " ")}</h6>
        <input value={this.state.enteredText} onChange={this.onWordChange} />
      </div>
    );
  }
}

export default App;
