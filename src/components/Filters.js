import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faFilter, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

function Filters() {
    const [isAppearFilters, setIsAppearFilters] = useState(false);
    const [isAppearSubs, setIsAppearSubs] = useState({
        autorefresh: false,
        order: false,
        languages: false
    });
    let filtersRef = useRef(null);

    const handleAppearFilters = useCallback(() => {
        setIsAppearFilters(!isAppearFilters);
    }, [isAppearFilters, setIsAppearFilters]);

    const handleAppearSubFilters = useCallback((temp) => {
        setIsAppearSubs({
            ...isAppearSubs,
            [temp]: !isAppearSubs[temp]
        })
    }, [isAppearSubs, setIsAppearSubs]);

    const handleReload = useCallback(() => {
        window.location.reload()
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filtersRef.current && !filtersRef.current.contains(event.target)) {
                setIsAppearFilters(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filtersRef]);

    return (
        <div className="watchlist__tools" ref={filtersRef}>
            <div className="watchlist__tools__box" onClick={handleReload}>
                <FontAwesomeIcon icon={faRotateRight} className="watchlist__tools__img"/>
                <p className="watchlist__tools__text">Refresh</p>
            </div>
            <div
                className={classNames('watchlist__tools__box', {open: isAppearFilters})}
                onClick={handleAppearFilters}
            >
                <FontAwesomeIcon icon={faFilter} className="watchlist__tools__img"/>
                <p className="watchlist__tools__text">Filters</p>
            </div>
            <div className="watchlist__tools__filters">
                <div
                    className={classNames(
                        'watchlist__tools__filters__item',
                        {appear: isAppearSubs.autorefresh}
                    )}
                >
                    <div className="watchlist__tools__filters__item__box">
                        <p className="watchlist__tools__filters__item__selected">1 min</p>
                        <p className="watchlist__tools__filters__item__type">AUTOREFRESH</p>
                        <div className="watchlist__subfilter">
                            <p className="watchlist__subfilter__title">AUTOREFRESH</p>
                            <div className="watchlist__subfilter__list">
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    10 sec
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    30 sec
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    1 min
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    10 min
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        className="watchlist__tools__filters__item__angle"
                        onClick={() => {
                            handleAppearSubFilters('autorefresh')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleDown} className="watchlist__tools__filters__item__angle__icon"/>
                    </div>
                </div>
                <div
                    className={classNames(
                        'watchlist__tools__filters__item',
                        {appear: isAppearSubs.order}
                    )}
                >
                    <div className="watchlist__tools__filters__item__box">
                        <p className="watchlist__tools__filters__item__selected">Top Rated</p>
                        <p className="watchlist__tools__filters__item__type">ORDER</p>
                        <div className="watchlist__subfilter">
                            <p className="watchlist__subfilter__title">ORDER</p>
                            <div className="watchlist__subfilter__list">
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Top Rated
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Latest
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Most Read
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Popular
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        className="watchlist__tools__filters__item__angle"
                        onClick={() => {
                            handleAppearSubFilters('order')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleDown} className="watchlist__tools__filters__item__angle__icon"/>
                    </div>
                </div>
                <div
                    className={classNames(
                        'watchlist__tools__filters__item',
                        {appear: isAppearSubs.languages}
                    )}
                >
                    <div className="watchlist__tools__filters__item__box">
                        <p className="watchlist__tools__filters__item__selected">All languages</p>
                        <p className="watchlist__tools__filters__item__type">LANGUAGES</p>
                        <div className="watchlist__subfilter show">
                            <p className="watchlist__subfilter__title">LANGUAGES</p>
                            <div className="watchlist__subfilter__list">
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Select/Unselect All
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    English
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    German
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Chinese
                                </label>
                                <label className="watchlist__subfilter__item">
                                    <input type="checkbox" className="watchlist__subfilter__item__checkbox"/>
                                    Italian
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        className="watchlist__tools__filters__item__angle"
                        onClick={() => {
                            handleAppearSubFilters('languages')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleDown} className="watchlist__tools__filters__item__angle__icon"/>
                    </div>
                </div>
                <div className="watchlist__tools__filters__reset">
                    RESET
                </div>
            </div>
        </div>
    );
}

export default Filters;