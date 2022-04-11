import { ISeriesKey } from '../feature/home/model/ISeriesKey';
import React from 'react';

export interface IAppState {
    seriesKeys: ISeriesKey[],
}

export interface IAppContext {
    state: IAppState;
    dispatch: React.Dispatch<IAppState> | null;
}

const INITIAL_STATE: IAppState = {
    seriesKeys: []
}

const AppContext = React.createContext<IAppContext>({
    state: INITIAL_STATE,
    dispatch: null
})

const appStateReducer = (oldState: IAppState, newState: IAppState) => {
    return newState;
}

export { INITIAL_STATE, appStateReducer, AppContext };
