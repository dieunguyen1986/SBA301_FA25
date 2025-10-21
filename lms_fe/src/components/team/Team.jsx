import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [
        {
          id: 1,
          name: "Alice",
          jerseyNumber: 10,
          position: "CDM",
          currentStatus: "Playing",
        },
        {
          id: 2,
          name: "Bob",
          jerseyNumber: 9,
          position: "ST",
          currentStatus: "Playing",
        },
        {
          id: 3,
          name: "Charlie",
          jerseyNumber: 8,
          position: "CM",
          currentStatus: "Substituted",
        },
        {
          id: 4,
          name: "David",
          jerseyNumber: 7,
          position: "RW",
          currentStatus: "Injured",
        },
      ],
    };
  }

  changeStatus = (id) => {
    const newMembers = this.state.members.map((member) => {
      if (id === member.id) {
        if (member.currentStatus === "Playing") {
          //return {...member, currentStatus:"Substituted"}
          member.currentStatus = "Substituted";
        } else if (member.currentStatus === "Substituted") {
          member.currentStatus = "Injured";
        } else if (member.currentStatus === "Injured") {
          member.currentStatus = "Playing";
        }
      }

      return member;
    });

    this.setState(newMembers);
  };

  render() {
    return (
      <>
        <div className="container-fluid mt-5">
          <h2 className="mb-4">Team Members</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Jersey Number</th>
                <th scope="col">Position</th>
                <th scope="col">Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.members.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.jerseyNumber}</td>
                  <td>{member.position}</td>
                  <td>{member.currentStatus}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => this.changeStatus(member.id)}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Team;
