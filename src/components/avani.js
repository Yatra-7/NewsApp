import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e857b97d2764dafacab720cf58e7ae2&page=${this.state.page}&pageSize=${this.props.pageSize};
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // console.log("cdm");
    // let url = "https://gnews.io/api/v4/top-headlines?country=in&token=17ffccf668d78750937d57957c89c4a0"
    // let url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e857b97d2764dafacab720cf58e7ae2&page=1&pageSize=${this.props.pageSize};
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({articles:parseData.articles,
    //               totalResults: parseData.totalResults,
    //             loading: false})
    this.updateNews();
  }

  handlePrevClick = async () => {
    // console.log("previous");

    // let url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e857b97d2764dafacab720cf58e7ae2&page=${this.state.page - 1}&pageSize=${this.props.pageSize};
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //     page: this.state.page - 1,
    //     articles:parseData.articles
    //   })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("next");
    // if(!(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    //   let url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e857b97d2764dafacab720cf58e7ae2&page=${this.state.page + 1}&pageSize=${this.props.pageSize};
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({
    //       page: this.state.page + 1,
    //       articles:parseData.articles,
    //       loading: false
    //     })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url = https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e857b97d2764dafacab720cf58e7ae2&page=${this.state.page}&pageSize=${this.props.pageSize};
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
      // loading: false,
      
    });
  };

  render() {
    // console.log("render")
    return (
      <>
      
     
      {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

          <div className="container">
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      {/* </div> */}
      </>
    );
  }
}

export default News;