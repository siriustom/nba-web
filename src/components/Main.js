import React from 'react';
import nba from 'nba';
import {DataViewContainer} from './DataViewContainer';
import {Profile} from './Profile';
import { SearchBar } from './SearchBar';

export class Main extends React.Component {
    state = {
        playerId: nba.findPlayer('Stephen Curry').playerId,
        playerInfo: {},
    }

    componentDidMount() {
        this.loadPlayerInfo('Stephen Curry');
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId}).then((info) => {
            console.log(info);
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            this.setState({playerInfo: playerInfo});
        })
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}