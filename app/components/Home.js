const React = require("react");
const Link = require("react-router-dom").Link;

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>GitHub Contest</h1>
        <Link className="button" to="/contest">
          Run
        </Link>
      </div>
    );
  }
}

module.exports = Home;
