// import React, { useState, useEffect, Fragment, useMemo } from "react";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// const LEFT_PAGE = "LEFT";
// const RIGHT_PAGE = "RIGHT";

// const range = (from, to, step = 1) => {
//   let i = from;
//   const range = [];

//   while (i <= to) {
//     range.push(i);
//     i += step;
//   }

//   return range;
// };

// const PaginationCommon = props => {
//   const {
//     totalRecords,
//     pageLimit,
//     pageNeighbours,
//     onPageChanged,
//     currentPage
//   } = props;
//   const [totalPages, setTotalPages] = useState(0);
//   useEffect(() => {
//     console.log("pagination component");
//     console.log(totalRecords);
//     console.log(pageLimit);
//     console.log(pageNeighbours);
//     console.log(currentPage);
//     setTotalPages(Math.ceil(totalRecords / pageLimit));
//   }, [currentPage]);

//   const fetchPageNumbers = () => {
//     const totalNumbers = pageNeighbours * 2 + 3;
//     const totalBlocks = totalNumbers + 2;

//     if (totalPages > totalBlocks) {
//       const startPage = Math.max(2, currentPage - pageNeighbours);
//       const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

//       let pages = range(startPage, endPage);

//       const hasLeftSpill = startPage > 2;
//       const hasRightSpill = totalPages - endPage > 1;
//       const spillOffset = totalNumbers - (pages.length + 1);

//       switch (true) {
//         // handle: (1) < {5 6} [7] {8 9} (10)
//         case hasLeftSpill && !hasRightSpill: {
//           const extraPages = range(startPage - spillOffset, startPage - 1);
//           pages = [LEFT_PAGE, ...extraPages, ...pages];
//           break;
//         }
//         // handle: (1) < {4 5} [6] {7 8} > (10)
//         case hasLeftSpill && hasRightSpill:
//         default: {
//           pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
//           break;
//         }
//       }
//       return [1, ...pages, totalPages];
//     }
//     return range(1, totalPages);
//   };

//   const pages = fetchPageNumbers() || [];
//   return (
//     <Pagination aria-label="Page navigation">
//       {pages.map((page, index) => {
//         if (page === LEFT_PAGE)
//           return (
//             <PaginationItem disabled={currentPage <= 0}>
//               <PaginationLink
//                 onClick={e => onPageChanged(e, currentPage - 1)}
//                 aria-label="Previous"
//                 previous
//               />
//             </PaginationItem>
//           );

//         if (page === RIGHT_PAGE)
//           return (
//             <PaginationItem disabled={currentPage >= totalPages - 1}>
//               <PaginationLink
//                 onClick={e => onPageChanged(e, currentPage + 1)}
//                 aria-label="Next"
//                 next
//               />
//             </PaginationItem>
//           );

//         return (
//           <PaginationItem active={currentPage === index} key={index}>
//             <PaginationLink onClick={e => onPageChanged(e, page)}>
//               {page}
//             </PaginationLink>
//           </PaginationItem>
//         );
//       })}
//     </Pagination>
//   );
// };

// export default PaginationCommon;

import React, {Component} from "react";
import PropTypes from 'prop-types';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {},
            paginationData: {},
            nextPageUrl: null,
            prevPageUrl: null,
            currentPage: null
        };
    }

    componentDidMount() {
        this.getProps(this.props);
    }

    UNSAFE_componentWillReceiveProps(props, nextContext) {
        this.getProps(props);
    }

    // Transform props
    getProps = (props) => {
        let defaultProps = Pagination.defaultProps.options;
        let options = this.props.options;
        Object.keys(defaultProps).forEach(function (key) {
            options[key] = props[key] ? props[key] : props['options'][key] ? props['options'][key] : defaultProps[key];
        });
        this.setState({options: options, paginationData: props.data});
    };

    // Check if page is active
    isCurrent = (page) => {
        let currentPage = this.state.paginationData.meta ? this.state.paginationData.meta.current_page : this.state.paginationData.current_page;
        return currentPage === page;
    };

    // Handle pagination buttons click event
    handleClick = (page) => {
        let parameters = {};
        if (this.props.requestParams) {
            parameters = this.props.requestParams;
        }
        parameters.page = page;
        this.props.changePage(parameters);
    };

    // Generate Prev Icon Or Text Buttons
    generateButtonsPrev = () => {
        let options = this.state.options;
        if (options.buttonIcons) {
            return <i className={options.prevButtonIcon}/>
        }
        return options.prevButtonText;
    };

    // Generate Next Icon Or Text Buttons
    generateButtonsNext = () => {
        let options = this.state.options;
        if (options.buttonIcons) {
            return <i className={options.nextButtonIcon}/>
        }
        return options.nextButtonText;
    };

    // Generate pagination buttons
    generatePagination = () => {
        let paginationData = this.state.paginationData;
        let pagination;
        if (Object.keys(paginationData).length) {
            let options = this.state.options;
            let current = paginationData.hasOwnProperty('current_page') ? paginationData.current_page : paginationData.meta.current_page,
                last = paginationData.hasOwnProperty('last_page') ? paginationData.last_page : paginationData.meta.last_page,
                delta = parseInt(options.numbersCountForShow),
                left = current - delta,
                right = current + delta + 1,
                range = [],
                rangeWithDots = [],
                l;
            for (let i = 1; i <= last; i++) {
                if ((i === 1 || i === last) || (i >= left && i < right)) {
                    range.push(i);
                }
            }
            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }

            let nextPageUrl = paginationData.hasOwnProperty('next_page_url') ? paginationData.next_page_url : paginationData.links.next;
            let prevPageUrl = paginationData.hasOwnProperty('prev_page_url') ? paginationData.prev_page_url : paginationData.links.prev;
            pagination = (
                <ul className={options.containerClass}>
                    {prevPageUrl ?
                        <li className={options.prevButtonClass} onClick={(event) => {
                            event.preventDefault();
                            this.handleClick(current - 1)
                        }}>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsPrev()}
                            </a>
                        </li> : ""}
                    {rangeWithDots.map((page, index) =>
                        this.generateNumber(page, index)
                    )}
                    {nextPageUrl ?
                        <li className={options.nextButtonClass} onClick={(event) => {
                            event.preventDefault();
                            this.handleClick(current + 1)
                        }}>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsNext()}
                            </a>
                        </li>
                        : ""}
                </ul>
            );
        }
        return pagination;
    };

    generateNumber(page, index) {
        let options = this.state.options;
        return (
            <li className={this.isCurrent(page) ? options.numberButtonClass + " " + options.activeClass :
                options.numberButtonClass} key={index}>
                <a href="" className={options.numberClass}
                   onClick={(event) => {
                       event.preventDefault();
                       this.handleClick(page === '...' ? index + 1 : page)
                   }}>{page}</a>
            </li>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.generatePagination()}
            </React.Fragment>
        );
    }
}

Pagination.defaultProps = {
    options: {
        containerClass: "pagination",
        buttonIcons: false,
        prevButtonClass: "page-item",
        prevButtonText: "Prev",
        prevButtonIcon: "fa fa-chevron-left",
        nextButtonClass: "page-item",
        nextButtonText: "Next",
        nextButtonIcon: "fa fa-chevron-right",
        numberButtonClass: "page-item",
        numberClass: "page-link",
        numbersCountForShow: 2,
        activeClass: 'active'
    },
    data: {}
};

Pagination.propTypes = {
    options: PropTypes.shape({
        containerClass: PropTypes.string,
        buttonIcons: PropTypes.bool,
        nextButtonClass: PropTypes.string,
        nextButtonText: PropTypes.string,
        nextButtonIcon: PropTypes.string,
        prevButtonClass: PropTypes.string,
        prevButtonText: PropTypes.string,
        prevButtonIcon: PropTypes.string,
        numberButtonClass: PropTypes.string,
        numberClass: PropTypes.string,
        numberCountForShow: PropTypes.number,
        activeClass: PropTypes.string
    }),
    data: PropTypes.object
};

export default Pagination;