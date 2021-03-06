import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const adminPaths = {
    doctors: {
        name: 'Врачи',
        to: '/admin/doctors',
    },
    specialties: {
        name: 'Специальности врачей',
        to: '/admin/specialties',
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
    min-width: 275px;
    border-right: 1px solid #d7d9df;

    a {
        position: relative;
        display: flex;
        padding: 1.5rem 2.5rem;
        color: #1890ff;
        font-weight: 500;
        transition: all 200ms ease-in-out;

        a:hover {
            color: #1890ff !important;
        }

        &:hover,
        &:focus {
            background-color: rgba(0, 0, 0, 0.018);
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
