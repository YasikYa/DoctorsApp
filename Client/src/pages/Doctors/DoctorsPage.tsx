/* eslint-disable react-hooks/exhaustive-deps */
import { PageType } from 'pages/types';
import { FormEvent } from 'react';
import { useFiltersDoctors } from './useFiltersDoctors';
import classNames from 'classnames';
import styled from 'styled-components';
import { Container } from 'shared/components/Container';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { DoctorsFilters } from './components/DoctorsFilters';
import { DoctorsList } from './components/DoctorsList';

const DoctorsPage: PageType = ({ className }) => {
    const {
        doctors,
        filterDoctors,
        price,
        searchValue,
        setPrice,
        setSearchValue,
        setSpecialtiesFilters,
        specialtiesFilters,
    } = useFiltersDoctors();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        filterDoctors();
    };

    return (
        <div className={classNames('page', { [className!]: className })}>
            <header>
                <Container>
                    <form onSubmit={handleSearch}>
                        <Input
                            prefix={<SearchOutlined />}
                            style={{ padding: '7.5px 11px' }}
                            size="large"
                            placeholder="Введите имя или фамилию врача"
                            value={searchValue!}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                        />

                        <Button size="large" type="primary" htmlType="submit">
                            Поиск
                        </Button>
                    </form>
                </Container>
            </header>

            <section className="main">
                <Container className="main-inner">
                    <DoctorsFilters
                        price={price}
                        setPrice={setPrice}
                        specialtiesFilters={specialtiesFilters}
                        setSpecialtiesFilters={setSpecialtiesFilters}
                    />

                    <DoctorsList doctors={doctors} />
                </Container>
            </section>
        </div>
    );
};

export default styled(DoctorsPage)`
    display: flex;
    flex-direction: column;

    header {
        background-color: #fff;
        padding-block-start: 20px;
        padding-block-end: 20px;
        box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.04);
        position: relative;
        z-index: 1;

        form {
            display: flex;

            button {
                width: 125px;
                margin-inline-start: 20px;
            }
        }
    }

    .main {
        padding-block-start: 20px;
        padding-block-end: 20px;
        flex-grow: 1;
        background-color: #fafafa;
        overflow: hidden;
    }

    .main-inner {
        display: flex;
        flex-grow: 1;
        height: 100%;
    }
`;
