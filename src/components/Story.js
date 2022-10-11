import React, {useCallback, useState} from 'react';
import {faAngleDown, faThumbsUp, faThumbsDown, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import user from "../assets/images/avatar.jpg";
import {Link} from "react-router-dom";
import classNames from "classnames";
import moment from "moment";

function Story(props) {
    let {title, desc, score, imgUrl, authorImg, authorName, time} = props;
    const [isCollapse, setIsCollapse] = useState(true);

    const handleCollapse = useCallback(() => {
        setIsCollapse(!isCollapse);
    }, [isCollapse, setIsCollapse]);

    return (
        <article className={classNames('story', {collapse: isCollapse})}>
            <figure className="story__fig">
                <img src={imgUrl || user} alt="Story" className="story__img"/>
            </figure>
            <div className="story__body">
                <h1 className="story__title">
                    <Link to='/' className="story__title__link">
                        {title}
                    </Link>
                </h1>
                <p className="story__desc">{desc}</p>
                <div className="story__author">
                    <figure className="story__author__fig">
                        <img src={authorImg || user} alt="Author" className="story__author__img"/>
                    </figure>
                    <h2 className="story__author__name">{authorName}</h2>
                    <p className="story__author__date">{moment(time).fromNow()}</p>
                </div>
            </div>
            <div className="story__aside">
                <p className={
                    classNames(
                        'story__aside__percent',
                        {yellow: score < 50, green: score >= 50}
                    )}
                >
                    {`${score}%`}
                </p>
                <FontAwesomeIcon icon={faAngleDown} className="story__aside__angle" onClick={handleCollapse}/>
            </div>
            <div className="story__footer">
                <div className="story__footer__btn">
                    <FontAwesomeIcon icon={faThumbsUp} className="story__footer__icon"/>
                    <p className="story__footer__text">Like</p>
                </div>
                <div className="story__footer__btn">
                    <FontAwesomeIcon icon={faThumbsDown} className="story__footer__icon"/>
                    <p className="story__footer__text">Dislike</p>
                </div>
                <div className="story__footer__btn">
                    <FontAwesomeIcon icon={faBookmark} className="story__footer__icon"/>
                    <p className="story__footer__text">Bookmark</p>
                </div>
            </div>
        </article>
    );
}

export default Story;