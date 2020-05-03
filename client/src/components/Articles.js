import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  pagerDispatch,
  Fragment
} from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import Moment from "react-moment";

const Articles = (props) => {
  let [page, updatePage] = useState(0);

  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          console.log(en.intersectionRatio);
          if (en.intersectionRatio > 0) {
            updatePage(page++);
            props.fetchArticles(page);
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(() => {
    props.fetchArticles(page).then(() => {
      if (bottomBoundaryRef.current) {
        scrollObserver(bottomBoundaryRef.current);
      }
    });
  }, [scrollObserver, bottomBoundaryRef]);

  const truncateBody = (text, id) => {
    if (text.length > 500) {
      return (
        <div>
          <p>
            {text.substring(0, 497)} <Link to={`/articles/${id}`}>...more</Link>
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>{text}</p>
        <Link to={`/articles/${id}`}>Read more</Link>
      </div>
    );
  };

  const renderArticles = () => {
    if (props.articles.length > 0) {
      return props.articles.map((article) => {
        return (
          <Card key={article._id} className="my-3">
            <Card.Body>
              <Card.Title>{article.title} </Card.Title>
              <Card.Subtitle className="mb-2">
                <small>
                  {article.postedBy.name
                    ? article.postedBy.name
                    : article.postedBy.email}{" "}
                  <span className="text-muted">
                    <Moment format="DD MMM YYYY">{article.dateCreated}</Moment>
                  </span>
                </small>
              </Card.Subtitle>
              {truncateBody(article.body, article._id)}
            </Card.Body>
          </Card>
        );
      });
    }
    return (
      <Spinner className="mt-3 mx-auto" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };
  return (
    <Fragment>
      {renderArticles()}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

export default connect(mapStateToProps, actions)(Articles);
