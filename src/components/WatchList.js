import React, {useEffect} from 'react';
import Filters from "./Filters";
import Story from "./Story";
import Api from "../Api";

function WatchList() {
    useEffect(() => {
        (async () => {
            let data = await Api.getStories();

            console.log(data);
        })()
    }, []);
    return (
        <section className="watchlist">
            <h1 className="watchlist__title">Watchlist Name</h1>
            <Filters/>
            <div className="watchlist__content">
                <Story/>
                <Story/>
            </div>
        </section>
    );
}

export default WatchList;