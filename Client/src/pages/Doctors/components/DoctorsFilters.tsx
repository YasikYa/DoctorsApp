import { Checkbox, Slider } from 'antd';
import { useSpecialties } from 'hooks/useSpecialties';
import { Dispatch, SetStateAction } from 'react';
import { NumericInput } from 'shared/components/NumericInput';
import styled from 'styled-components';

type DoctorsFiltersProps = {
    className?: string;
    price: [number, number];
    setPrice: Dispatch<SetStateAction<[number, number]>>;
    specialtiesFilters: {
        [specialtyId: string]: boolean;
    };
    setSpecialtiesFilters: Dispatch<
        SetStateAction<{
            [specialtyId: string]: boolean;
        }>
    >;
};

export const DoctorsFilters = styled(
    ({
        className,
        price,
        setPrice,
        specialtiesFilters,
        setSpecialtiesFilters,
    }: DoctorsFiltersProps) => {
        const { specialties } = useSpecialties();

        return (
            <aside className={className}>
                <h3>Фильтры</h3>

                <div className="filters">
                    <h4 className="filters-title">Стоимость приема</h4>

                    <div className="filters-inputs">
                        <NumericInput
                            value={price[0]}
                            onChange={({ target: { value } }) => {
                                setPrice((prev) => [Number(value), prev[1]]);
                            }}
                        />
                        <NumericInput
                            value={price[1]}
                            onChange={({ target: { value } }) => {
                                setPrice((prev) => [prev[0], Number(value)]);
                            }}
                        />
                    </div>

                    <Slider
                        max={5000}
                        range
                        defaultValue={[price[0], price[1]]}
                        value={[price[0], price[1]]}
                        onChange={(value) => {
                            setPrice(value);
                        }}
                    />
                </div>

                <div className="filters">
                    <h4 className="filters-title">Специальность врача</h4>

                    <fieldset>
                        {specialties.map(({ id, name }) => (
                            <Checkbox
                                key={id}
                                checked={Boolean(specialtiesFilters[id])}
                                onChange={(e) => {
                                    setSpecialtiesFilters((prev) => ({
                                        ...prev,
                                        [id]: e.target.checked,
                                    }));
                                }}
                            >
                                {name}
                            </Checkbox>
                        ))}
                    </fieldset>
                </div>
            </aside>
        );
    }
)`
    padding: 25px;
    height: 100%;
    width: 300px;
    background-color: #fff;
    box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.04);

    h3 {
        border-bottom: 1px dashed #d9d9d9;
        padding-block-end: 20px;
        font-size: 20px;
    }

    .filters {
        display: block;
        border-bottom: 1px dashed #d9d9d9;
        padding: 20px 0;

        .filters-inputs {
            display: flex;
            justify-content: space-between;
            padding-block-end: 20px;

            input {
                max-width: calc(50% - 10px);
            }
        }

        fieldset {
            display: flex;
            flex-direction: column;

            label {
                margin: 0;
                padding: 5px 0;
            }
        }
    }

    .filters-title {
        display: block;
        font-size: 18px;
        padding-block-end: 20px;
    }
`;
