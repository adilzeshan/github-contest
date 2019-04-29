const React = require("react");
const PropTypes = require("prop-types");
const Link = require("react-router-dom").Link;
const PlayerPreview = require("./PlayerPreview");

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // var value = event.target.value;
    // console.log('Outside setState', event.target.value);
    // event.persist();

    // this.setState(function (state) {
    //   // console.log('Inside setState value:', event.target.value);
    //   // console.log('Inside setState target:', event);

    //   return {
    //     username: event.target.value
    //   }
    // }, () => {
    //   this.setState(
    //     { username: 'adil' },
    //     () => {
    //       // console.log(this.state);
    //       // setTimeout(() => {

    //       // }, 0);
    //     }
    //   );
    //   // console.log(this.state);
    // });

    this.setState({
      username: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          value={this.state.username}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Contest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] =
        "https://www.github.com/" + username + ".png?size=200";
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      var newState = {};
      newState[id + "Name"] = "";
      newState[id + "Image"] = null;
      return newState;
    });
  }

  renderPlayer({ id, displayName, avatar, playerName }) {
    return (
      <>
        {!playerName && (
          <PlayerInput
            id={id}
            label={displayName}
            onSubmit={this.handleSubmit}
          />
        )}

        {playerName !== "" && (
          <PlayerPreview avatar={avatar} username={playerName}>
            <button className="reset" onClick={this.handleReset.bind(null, id)}>
              Reset
            </button>
          </PlayerPreview>
        )}
      </>
    );
  }

  render() {
    const match = this.props.match;
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;
    // var playerOneName = this.state.playerOneName;
    // var playerTwoName = this.state.playerTwoName;
    // var playerOneImage = this.state.playerOneImage;
    // var playerTwoImage = this.state.playerTwoImage;

    var playerOne = {
      id: "playerOne",
      displayName: "Player One",
      avatar: this.state.playerOneImage,
      playerName: this.state.playerOneName
    };

    var playerTwo = {
      id: "playerTwo",
      displayName: "Player Two",
      avatar: this.state.playerTwoImage,
      playerName: this.state.playerTwoName
    };

    return (
      <div>
        <div className="row">
          {this.renderPlayer(playerOne)}
          {this.renderPlayer(playerTwo)}
        </div>

        <div className="row">
          {playerOne.playerName && playerTwo.playerName && (
            <Link
              className="button"
              to={{
                pathname: match.url + "/results",
                search: `?playerOneName=${playerOne.playerName}&playerTwoName=${
                  playerTwo.playerName
                }`
              }}
            >
              Begin
            </Link>
          )}
        </div>
      </div>
    );
  }
}

module.exports = Contest;
