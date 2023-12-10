import { ChangeEvent, Component } from "react";
import "./App.css";

interface State {
  typeTest: string;
  words: Array<string>;
  enteredText: string;
  correctCount: number;
  started: boolean;
  startTime: Date | null;
  wordsPerMinute: number | null;
}

class App extends Component {
  state: State = {
    typeTest:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed in quas maiores ad pariatur. Suscipit ipsum quidem cumque vero possimus, tempora velit animi itaque ullam officia, maxime similique culpa soluta?",
    words: [],
    enteredText: "",
    correctCount: 0,
    started: false,
    startTime: null,
    wordsPerMinute: null,
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
        <h1>{this.state.correctCount}</h1>
        <h6>{this.state.typeTest}</h6>
        <input value={this.state.enteredText} onChange={this.onWordChange} />
      </div>
    );
  }
}

export default App;
