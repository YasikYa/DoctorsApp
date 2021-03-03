import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const adminPaths = {
    specialties: {
        name: 'Специальности врачей',
        to: '/admin/specialties',
    },
    doctors: {
        name: 'Врачи',
        to: '/admin/doctors',
    },
};

export const AdminPageNav = styled(({ className }: { className?: string }) => {
    return (
        <ul className={className}>
            {Object.entries(adminPaths).map(([key, { name, to }]) => (
                <li key={key}>
                    <NavLink to={to}>{name}</NavLink>
                </li>
            ))}
        </ul>
    );
})`
    flex-basis: 300px;
    border-right: 1px solid #d7d9df;

    a {
        position: relative;
        display: flex;
        padding: 1.5rem 2.5rem;
        color: #9a6ff5;
        font-weight: 500;

        a:hover {
            color: #9a6ff5 !important;
        }

        &::after {
            position: absolute;
            content: '';
            right: 0;
            bottom: 0;
            top: 0;
            width: 4px;
            transition: background-color 200ms ease-in-out;
        }

        &.active::after {
            background-color: currentColor;
        }
    }
`;
