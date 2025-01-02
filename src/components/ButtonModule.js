import ButtonModuleColourInput from "./ButtonModuleColourInput";
import ButtonModuleTextInput from "./ButtonModuleTextInput";
import KtaneModule from "./KtaneModule";
import React from "react";
import "../css/ButtonModule.css";

export default class ButtonModule extends KtaneModule {
  static getTitle() {
    return "Button";
  }

  constructor(props) {
    super(props);

    this.colourBlue = "kék";
    this.colourWhite = "fehér";
    this.colourYellow = "sárga";
    this.colourRed = "piros";
    this.allColours = [this.colourBlue, this.colourWhite, this.colourYellow, this.colourRed];

    this.textAbort = "Megszakítás";
    this.textDetonate = "Felrobbantás";
    this.textHold = "Tartsd";
    this.textPress = "Nyomd";
    this.allText = [this.textAbort, this.textDetonate, this.textHold, this.textPress];

    this.setColour = this.setColour.bind(this);
    this.setText = this.setText.bind(this);
  }

  getInstruction() {
    if (this.state.text === this.textDetonate) {
      return <>Ha 2+ 🔋, nyomd meg és engedd el.<br />Egyébként tartsd lenyomva.</>;
    } else if (this.state.colour === this.colourWhite) {
      return <>
        Ha <span className="litIndicator" title="Lit indicator">CAR</span>, tartsd nyomva.<br />
        Egyébként, ha 3+ 🔋 és <span className="litIndicator" title="Lit indicator">FRK</span>, nyomd meg és engedd el.<br />
        Egyébként tartsd nyomva.
      </>;
    } else if ((this.state.colour === this.colourBlue && this.state.text === this.textAbort) || this.state.colour === this.colourYellow) {
      return "Hold button.";
    } else if (this.state.colour === this.colourRed && this.state.text === this.textHold) {
      return "Press and release.";
    } else {
      return <>
        Ha 3+ 🔋 and <span className="litIndicator" title="Lit indicator">FRK</span>, nyomd meg és engedd el.
        <br />Egyébként tartsd nyomva.
      </>;
    }
  }

  mainRender() {
    return (
      <>
        <div className="bigButton" style={{backgroundColor: this.state.colour}}>
          <span style={{color: [this.colourWhite, this.colourYellow].includes(this.state.colour) ? "black" : "white"}}>
            {this.state.text}
          </span>
        </div>

        <div>
          Colour:
          {
            this.allColours.map(colour => (
              <ButtonModuleColourInput
                key={colour}
                onChange={this.setColour}
                stateValue={this.state.colour}
                value={colour}
              />
            ))
          }
        </div>

        <div>
          Text:
          {
            this.allText.map(text => (
              <ButtonModuleTextInput
                key={text}
                onChange={this.setText}
                stateValue={this.state.text}
                value={text}
              />
            ))
          }
        </div>

        <div className="instruction">{this.getInstruction()}</div>

        <div>
          Ha nyomva tartod a gombot, engedd el amikor a számlálón van olyan szám, ami a színnek megfelel:
          <ul>
            <li><span className="button blue">Kék</span>: &nbsp; 4</li>
            <li><span className="button yellow">Sárga</span>: 5</li>
            <li><span className="button">Egyéb</span>: &nbsp;1</li>
          </ul>
        </div>
      </>
    )
  }

  getInitialState() {
    // @TODO Put string literals into constants
    return {
      colour: "blue",
      text: "Abort"
    };
  }

  setColour(event) {
    this.setState({colour: event.target.value});
  }

  setText(event) {
    this.setState({text: event.target.value});
  }
}
