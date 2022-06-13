import React from "react";
import {Link} from "react-router-dom";

function Paginate({pages, page, keyword = '', isAdmin = false}) {
    page = Number(page)
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (pages > 1 && (
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}><Link className="page-link"
                                                                                         to={`?keyword=${keyword}&page=${page - 1}`}>Previous</Link>
                        </li>
                        {[...Array(pages).keys()].map(x => (
                            <li key={x + 1} className={`page-item ${x + 1 === page && 'active'}`}>
                                <Link className="page-link" to={`?keyword=${keyword}&page=${x + 1}`}>{x + 1}</Link>
                            </li>
                        ))}

                        <li className={`page-item ${page >= pages ? 'disabled' : ''}`}><Link className="page-link"
                                                                                             to={`?keyword=${keyword}&page=${page + 1}`}>Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    )
}

export default Paginate
