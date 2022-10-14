import React, {useCallback, useEffect} from 'react';
import Header from "./Header";
import qs from "query-string";
import {useLocation, useNavigate} from "react-router-dom";

function Wrapper(props) {
    let {nextPageToken} = props;
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, []);

    const handleScroll = useCallback((e) => {
        if ((window.innerHeight + e.target.documentElement.scrollTop + 10)
            >= e.target.documentElement.scrollHeight) {
            let search = qs.parse(location.search, {arrayFormat: 'comma'});
            search.limit = 20;
            search.page_token = nextPageToken;

            navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
        }
    }, [nextPageToken, location.search]);

    return (
        <div className='wrapper'>
            <Header/>
            {props.children}
        </div>
    );
}

export default Wrapper;