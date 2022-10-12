import React, {useCallback, useEffect, useState} from 'react';
import {autorefresh, orderBy, languages} from "../data/filters";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {getStoriesRequest} from "../store/actions/story";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import Select from 'react-select';
import qs from "query-string";

function Filters(props) {
    const {auto, setAuto, interval} = props;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [lang, setLang] = useState([]);
    const [order, setOrder] = useState('');
    const [isAppearFilters, setIsAppearFilters] = useState(false);
    const [refreshDuration, setRefreshDuration] = useState(autorefresh.find(a => +a.value === +auto));

    useEffect(() => {
        let search = qs.parse(location.search);
        let lang = search.languages ? search.languages.split(',') : [];

        setOrder(orderBy.find(o => o.value === (search.order_by)));
        setLang(languages.filter(l => lang.includes(l.value)));

        dispatch(getStoriesRequest(location.search));
    }, [location.search]);

    const handleChangeOrder = useCallback((tempValue) => {
        let search = qs.parse(location.search, {arrayFormat: 'comma'});
        search.order_by = tempValue ? tempValue : undefined;
        search.limit = 20;

        navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
    }, [navigate, location.search]);

    const handleChangeLang = useCallback((tempValue) => {
        let search = qs.parse(location.search, {arrayFormat: 'comma'});

        if (tempValue.includes('all')
            && search.languages
            && search.languages.length >= (languages.length - 1)) {
            search.languages = [];
        } else if (tempValue.includes('all')) {
            search.languages = languages.map(l => {
                if (l.value !== 'all') return l.value
            })
        } else if (tempValue === []) {
            search.languages = undefined;
        } else {
            search.languages = tempValue;
        }
        search.limit = 20;

        navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
    }, [navigate, location.search]);

    const handleChangeAuto = useCallback((numb) => {
        setAuto(numb);
        clearInterval(interval);
        localStorage.setItem("duration", numb);
    }, [setAuto, interval]);

    const handleAppearFilters = useCallback(() => {
        setIsAppearFilters(!isAppearFilters);
    }, [isAppearFilters, setIsAppearFilters]);

    const handleReload = useCallback(() => {
        window.location.reload();
    }, []);

    const handleReset = useCallback(() => {
        setAuto(0);
        handleChangeLang([]);
        handleChangeOrder('');
        setRefreshDuration(0);
        localStorage.removeItem(("duration"));
    }, [setAuto, handleChangeLang, handleChangeOrder, handleChangeOrder]);

    return (
        <>
            <div className={classNames('watchlist__tools', {open: isAppearFilters})}>
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
            </div>
            <div className="watchlist__tools__filters">
                <Select
                    options={autorefresh}
                    value={refreshDuration}
                    name="AUTOREFRESH"
                    className="subfilters"
                    classNamePrefix="subfilters"
                    isSearchable={false}
                    getOptionLabel={a => a.name}
                    getOptionValue={a => a.value}
                    onChange={(auto) => {
                        handleChangeAuto(auto.value)
                    }}
                />
                <Select
                    options={orderBy}
                    value={order}
                    name="ORDER"
                    className="subfilters"
                    classNamePrefix="subfilters"
                    isSearchable={false}
                    closeMenuOnSelect={false}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.value}
                    onChange={(order) => {
                        handleChangeOrder(order.value)
                    }}
                />
                <Select
                    options={languages}
                    value={lang}
                    name="LANGUAGES"
                    className="subfilters"
                    classNamePrefix="subfilters"
                    isSearchable={false}
                    closeMenuOnSelect={false}
                    isClearable={false}
                    isMulti
                    getOptionLabel={l => l.name}
                    getOptionValue={l => l.value}
                    onChange={(lang) => {
                        handleChangeLang(lang.map(v => v.value));
                    }}
                />
                <div
                    className="watchlist__tools__filters__reset"
                    onClick={handleReset}
                >
                    RESET
                </div>
            </div>
        </>
    );
}

export default Filters;