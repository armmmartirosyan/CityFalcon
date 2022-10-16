import React, {useCallback} from 'react';
import Header from "./Header";
import qs from "query-string";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {BottomScrollListener} from 'react-bottom-scroll-listener';

function Wrapper(props) {
    const nextPageToken = useSelector(state => state.story.nextPageToken);
    const location = useLocation();
    const navigate = useNavigate();

    const handleScrollBottom = useCallback((token) => {
        let search = qs.parse(location.search, {arrayFormat: 'comma'});
        search.limit = 20;
        search.page_token = token;

        navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
    }, [location.search, navigate]);

    return (
        <BottomScrollListener onBottom={() => {handleScrollBottom(nextPageToken)}}>
            {scrollRef => (
                <div className='wrapper' ref={scrollRef}>
                    <Header/>
                    {props.children}
                </div>
            )}
        </BottomScrollListener>
    )
        ;
}

export default Wrapper;