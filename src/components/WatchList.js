import React from 'react';
import Filters from "./Filters";
import Story from "./Story";
import {useSelector} from "react-redux";
import _ from "lodash";

function WatchList() {
    const stories = useSelector(state => state.story.stories);
    const status = useSelector(state => state.story.status);

    return (
        <section className="watchlist">
            <div className='watchlist__head'>
                <h1 className="watchlist__title">Watchlist Name</h1>
                <Filters/>
            </div>
            <div className="watchlist__content">
                {
                    stories.length ? (
                        stories.map(story => (
                            <Story
                                key={_.uniqueId()}
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
                    || (!stories.length && status !== 'request') ?
                        <div>No data</div> : null
                }
            </div>
            {
                status === 'request' ? <div className='loading'>Loading...</div> : null
            }
        </section>
    );
}

export default WatchList;