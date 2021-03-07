import { Button, Input } from 'antd';
import classNames from 'classnames';
import { PageType } from 'pages/types';
import { FormEvent, memo, useState } from 'react';
import { paths } from 'routes/paths';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

const HomePage: PageType = ({ className, history }) => {
    const [search, setSearch] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        history.push({
            pathname: paths.DOCTORS,
            search: new URLSearchParams({ search }).toString(),
        });
    };

    return (
        <div className={classNames('page', { [className!]: className })}>
            <section className="search">
                <h1>Ищите лучших и профессиональных врачей онлайн</h1>
                <p>Записывайтесь на прием не выходя из дома</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        prefix={<SearchOutlined />}
                        style={{ padding: '7.5px 11px' }}
                        size="large"
                        placeholder="Введите имя или фамилию врача"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />

                    <Button size="large" type="primary" htmlType="submit">
                        Поиск
                    </Button>
                </form>
            </section>
        </div>
    );
};

export default styled(memo(HomePage, () => true))`
    .search {
        background: linear-gradient(98.66deg, #d6e9ff 2.52%, #ffddf7);
        text-align: center;
        padding-block-start: 80px;
        padding-block-end: 80px;
        min-height: 400px;

        h1 {
            font-size: 40px;
            padding-block-end: 20px;
        }

        p {
            font-size: 20px;
            font-weight: 500;
        }

        form {
            display: flex;
            align-items: center;
            margin: 50px auto 0;
            max-width: 450px;

            button {
                margin-inline-start: 20px;
            }
        }
    }
`;
