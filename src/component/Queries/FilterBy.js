import React from 'react';
export default class FilterBy extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className="more-filter-box">
                <label>Filter By</label>
                <select className="ng-pristine ng-valid ng-touched" onChange={this.props.shortItems}>
                    <option value=""> All Queries</option>
                    <option value="OnlyAvaiableForVote">Available vote queries</option>
                    <option value="PollEnded">Poll ended queries</option>
                    <option value="OnlyVotedByMe">My voted queries</option>
                </select>
            </div>
        )
    }
}