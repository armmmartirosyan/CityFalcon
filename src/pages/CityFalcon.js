import React from 'react';
import Wrapper from "../components/Wrapper";
import WatchList from "../components/WatchList";
import {useSelector} from "react-redux";

function CityFalcon() {
    let nextPageToken = useSelector(state => state.story.nextPageToken);

    return (
        <Wrapper className='wrapper'>
            <main className='main'>
                <WatchList nextPageToken={nextPageToken}/>
                <aside className="aside"/>
            </main>
        </Wrapper>
    );
}

export default CityFalcon;