import React, {useCallback, useEffect, useState} from 'react';
import {autorefresh, orderBy, languages} from "../data/filters";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {getStoriesRequest} from "../store/actions/story";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import Select, {components, MenuListProps, OptionProps, ContainerProps} from 'react-select';
import qs from "query-string";

function Filters(props) {
    const {auto, setAuto, interval} = props;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [lang, setLang] = useState([]);
    const [order, setOrder] = useState('');
    const [isAppearFilters, setIsAppearFilters] = useState(false);
    const [refreshDuration, setRefreshDuration] = useState();

    useEffect(() => {
        let search = qs.parse(location.search);
        let lang = search.languages ? search.languages.split(',') : [];
        let autorefreshDuration = localStorage.getItem('duration');

        setOrder(orderBy.find(o => o.value === (search.order_by)) || '');
        setLang(languages.filter(l => lang.includes(l.value)));
        setRefreshDuration(autorefresh.find(a => +a.value === +autorefreshDuration));

        dispatch(getStoriesRequest(location.search));
    }, [location.search]);

    const handleChangeOrder = useCallback((tempValue) => {
        let search = qs.parse(location.search, {arrayFormat: 'comma'});

        if((tempValue === search.order_by) || !tempValue){
            search.order_by = undefined;
        }else{
            search.order_by = tempValue;
        }

        search.limit = 20;

        navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
    }, [navigate, location.search]);

    const handleChangeLang = useCallback((tempValue) => {
        let search = qs.parse(location.search, {arrayFormat: 'comma'});

        if ((tempValue.includes('all')
            && search.languages
            && search.languages.length
            >= (languages.length - 1))
            || tempValue.length === 0) {
            search.languages = [];
        } else if (tempValue.includes('all')) {
            search.languages = languages.map(l => {
                if (l.value !== 'all') return l.value
            })
        }else {
            search.languages = tempValue;
        }
        search.limit = 20;

        navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
    }, [navigate, location.search]);

    const handleChangeAuto = useCallback((numb) => {
        if(+auto === +numb){
            setAuto(0);
            setRefreshDuration(0);
            localStorage.removeItem(("duration"));
        }else{
            setAuto(numb)
            setRefreshDuration(autorefresh.find(a => +a.value === +numb));
            localStorage.setItem("duration", numb);
        }

        clearInterval(interval);
    }, [setAuto, interval, auto, setRefreshDuration]);

    const handleAppearFilters = useCallback(() => {
        setIsAppearFilters(!isAppearFilters);
    }, [isAppearFilters, setIsAppearFilters]);

    const handleReload = useCallback(() => {
        window.location.reload();
    }, []);

    const handleReset = useCallback(() => {
        let search = qs.parse(location.search, {arrayFormat: 'comma'});
        search.languages = [];
        search.order_by = undefined;
        search.limit = undefined;

        localStorage.removeItem(("duration"));
        setAuto(0);
        setRefreshDuration(0);

        navigate(`?${qs.stringify(search, {arrayFormat: 'comma'})}`);
    }, [setAuto, handleChangeLang, handleChangeOrder, handleChangeOrder]);

    const MenuList = (props: MenuListProps) => (
        <components.MenuList {...props}>
            <div className='subfilters__name'>{`${props.selectProps.name}:`}</div>
            {props.children}
        </components.MenuList>
    );

    const Option = (props: OptionProps) => (
        <components.Option {...props}>
            <label className='subfilters__option'>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => {}}
                />
                {props.data.name}
            </label>
        </components.Option>
    );

    const SelectContainer = ({children, ...props}: ContainerProps) => (
        <components.SelectContainer {...props}>
            {children}
            <p className='subfilters__name-input'>{props.selectProps.name}</p>
        </components.SelectContainer>
    );

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
                    components={{MenuList, Option, SelectContainer}}
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
                    components={{MenuList, Option, SelectContainer}}
                    options={orderBy}
                    value={order}
                    name="ORDER"
                    className="subfilters"
                    classNamePrefix="subfilters"
                    isSearchable={false}
                    getOptionLabel={o => o.name}
                    getOptionValue={o => o.value}
                    onChange={(order) => {
                        handleChangeOrder(order.value)
                    }}
                />

                <Select
                    components={{MenuList, Option, SelectContainer}}
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