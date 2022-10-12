import React, {useCallback, useEffect, useState} from 'react';
import Filters from "./Filters";
import Story from "./Story";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {getStoriesRequest} from "../store/actions/story";
import {useLocation} from "react-router-dom";

function WatchList() {
    const dispatch = useDispatch();
    const [auto, setAuto] = useState(0);
    const location = useLocation();
    let data = useSelector(state => state.story.data);
    let status = useSelector(state => state.story.status);
    let interval;

    const refreshFunc = useCallback(() => {
        dispatch(getStoriesRequest(location.search));
    }, [dispatch]);

    useEffect(() => {
        let duration = localStorage.getItem('duration');
        clearInterval(interval);

        if (duration) {
            setAuto(duration);

            duration = +duration * 1000;

            interval = setInterval(refreshFunc, duration);
        }

        return () => {
            clearInterval(interval)
        }
    }, [auto]);

    return (
        <section className="watchlist">
            <div className='watchlist__head'>
                <h1 className="watchlist__title">Watchlist Name</h1>
                <Filters
                    auto={auto}
                    setAuto={setAuto}
                    interval={interval}
                />
            </div>
            <div className="watchlist__content">
                {
                    !_.isEmpty(data.stories) ? (
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
                                link={story.url}
                            />
                        ))
                    ) : null
                }
                {
                    status === "fail"
                    || (data && _.isEmpty(data.stories) && status !== 'request') ?
                        <div>No data</div> : null
                }
            </div>
        </section>
    );
}

export default WatchList;