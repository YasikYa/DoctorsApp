import { Container } from 'shared/components/Container';
import styled from 'styled-components';

const FooterUnstyled = ({ className }: { className?: string }) => {
    return (
        <footer className={className}>
            <Container>2021 footer</Container>
        </footer>
    );
};

export const Footer = styled(FooterUnstyled)`
    position: relative;
    z-index: 1;
    padding-block-start: 1rem;
    padding-block-end: 1rem;
    box-shadow: 3px 7px 11px 0px rgb(0 0 0 / 75%);
`;
