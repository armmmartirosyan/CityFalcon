import React, {useEffect} from 'react';
import Filters from "./Filters";
import Story from "./Story";
import {useDispatch, useSelector} from "react-redux";
import {getStoriesRequest} from "../store/actions/story";
import _ from "lodash";

function WatchList() {
    const dispatch = useDispatch();
    let data = useSelector(state => state.story.data);
    let status = useSelector(state => state.story.status);

    useEffect(() => {
        dispatch(getStoriesRequest());
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <section className="watchlist">
            <h1 className="watchlist__title">Watchlist Name</h1>
            <Filters/>
            <div className="watchlist__content">
                {
                    status === 'request' ? <div>Loading...</div> : null
                }
                {
                    status === 'ok' && !_.isEmpty(data.stories) ? (
                        data.stories.map(story => (
                            <Story
                                key={story.id}
                                title={story.title}
                                desc={story.description}
                                score={story.score}
                                imgUrl={story.imageUrls}
                                authorImg={story.author_image_url}
                                authorName={story.author_screen_name}
                                time={story.publishTime}
                            />
                        ))
                    ) : null
                }
            </div>
        </section>
    );
}

export default WatchList;