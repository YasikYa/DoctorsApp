/* eslint-disable react-hooks/exhaustive-deps */
import { Doctor } from 'api/doctors/types';
import { useDoctors } from 'hooks/useDoctors';
import { useSpecialties } from 'hooks/useSpecialties';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const useFiltersDoctors = () => {
    const { location } = useHistory();

    const { specialties } = useSpecialties();

    const { doctors: initialDoctors } = useDoctors();

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [price, setPrice] = useState<[number, number]>([100, 5000]);
    const [specialtiesFilters, setSpecialtiesFilters] = useState<{
        [specialtyId: string]: boolean;
    }>({});
    const [searchValue, setSearchValue] = useState(
        new URLSearchParams(location.search).get('search') || ''
    );

    const filterDoctors = useCallback(() => {
        setDoctors(
            initialDoctors.filter(
                ({ consultPrice, firstName, lastName, specialties }) =>
                    consultPrice >= price[0] &&
                    consultPrice <= price[1] &&
                    `${lastName} ${firstName}`.includes(searchValue!) &&
                    specialties.some(({ id }) => specialtiesFilters[id])
            )
        );
    }, [initialDoctors, price, searchValue, specialtiesFilters]);

    useEffect(() => {
        if (initialDoctors.length) {
            filterDoctors();
        }
    }, [initialDoctors]);

    useEffect(() => {
        if (specialties.length) {
            setSpecialtiesFilters(
                specialties.reduce((accumulator: { [specialtyId: string]: boolean }, { id }) => {
                    accumulator[id] = true;
                    return accumulator;
                }, {})
            );
            filterDoctors();
        }
    }, [specialties]);

    return {
        doctors,
        filterDoctors,
        specialtiesFilters,
        setSpecialtiesFilters,
        searchValue,
        setSearchValue,
        price,
        setPrice,
    };
};
