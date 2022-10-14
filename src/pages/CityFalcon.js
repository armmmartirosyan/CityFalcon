import React from 'react';
import Wrapper from "../components/Wrapper";
import WatchList from "../components/WatchList";

function CityFalcon() {
    return (
        <Wrapper className='wrapper'>
            <main className='main'>
                <WatchList />
                <aside className="aside"/>
            </main>
        </Wrapper>
    );
}

export default CityFalcon;