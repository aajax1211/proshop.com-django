import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Paginate({pages, page, keyword="", isAdmin = false}) {
  
  return ( pages > 1 &&
    <Pagination>
        {
            [...Array(pages).keys()].map((x)=>(
                
                    <Pagination.Item key={x + 1}
                     active={x+1 === page}
                     to={!isAdmin ? `/?keyword=${keyword}&page=${x+1}` : `/admin/productlist/?keyword=${keyword}&page=${x+1}`}
                     as={Link}>
                        {x+1}
                    </Pagination.Item>
            
            ))
        }
    </Pagination>

  );
}
