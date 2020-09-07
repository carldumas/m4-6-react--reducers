// Libraries
import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tippy from '@tippyjs/react';
// Components
import { SeatContext } from './SeatContext';
// Assets
import SeatImage from '../assets/seat-available.svg';
// Helpers
import { getRowName, getSeatNum } from '../helpers';
// Utils
import { range } from '../utils';
// Styles
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';

const TicketWidget = () => {
    const {
        state: { hasLoaded, seats, numOfRows, seatsPerRow },
    } = React.useContext(SeatContext);

    if (!hasLoaded) {
        return (
            <>
                <LoaderWrapper>
                    <LoaderDiv>
                        <CircularProgress />
                    </LoaderDiv>
                </LoaderWrapper>
            </>
        );
    }

    return (
        <Wrapper>
            {range(numOfRows).map((rowIndex) => {
                const rowName = getRowName(rowIndex);

                return (
                    <Row key={rowIndex}>
                        <RowLabel>Row {rowName}</RowLabel>
                        {range(seatsPerRow).map((seatIndex) => {
                            const seatId = `${rowName}-${getSeatNum(
                                seatIndex
                            )}`;

                            return (
                                <Tippy
                                    key={seatId}
                                    content={
                                        [`Row ${rowName}, `] +
                                        [`Seat ${seatIndex + 1} - `] +
                                        [`$${seats[`${seatId}`].price}`]
                                    }
                                    placement="top"
                                    animation="scale-subtle"
                                    arrow={true}
                                    duration={300}
                                    delay={[100, 0]}
                                >
                                    <SeatWrapper
                                        disabled={seats[`${seatId}`].isBooked}
                                    >
                                        <img
                                            src={SeatImage}
                                            alt={`seat-${seatId}`}
                                        />
                                    </SeatWrapper>
                                </Tippy>
                            );
                        })}
                    </Row>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px;
`;

const Row = styled.div`
    display: flex;
    position: relative;

    &:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
    }
`;

const RowLabel = styled.div`
    font-weight: bold;
    padding-top: 20px;
`;

const SeatWrapper = styled.button`
    padding: 5px;
    border: none;

    &:disabled {
        filter: grayscale(100%);
    }
    &:hover:not([disabled]) {
        cursor: pointer;
    }
`;

const LoaderWrapper = styled.div`
    background: #eee;
`;

const LoaderDiv = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
`;

export default TicketWidget;
