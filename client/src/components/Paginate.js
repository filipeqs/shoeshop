import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, link }) => {
    return (
        pages > 1 && (
            <Pagination className="mt-2">
                {[...Array(pages).keys()].map((x, i) => (
                    <LinkContainer key={i} to={`${link}/${x + 1}`}>
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
