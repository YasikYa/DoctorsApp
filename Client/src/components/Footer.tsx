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
    box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.04);
`;
