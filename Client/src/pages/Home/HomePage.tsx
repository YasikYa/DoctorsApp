import { PageType } from 'pages/types';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'store';
// import { fetchAllDoctors } from 'store/doctors/actions';

const HomePage: PageType = () => {
    // const dispatch = useDispatch();

    // const { allDoctors, loadingFlags, triedUploadingDoctors } = useSelector((state) => ({
    //     allDoctors: state.doctors.entities,
    //     loadingFlags: state.doctors.loadingFlags,
    //     triedUploadingDoctors: state.doctors.triedUploadingDoctors,
    // }));

    // useEffect(() => {
    //     if (triedUploadingDoctors) {
    //         console.log(allDoctors);
    //     } else {
    //         dispatch(fetchAllDoctors());
    //     }
    // }, [allDoctors, dispatch, triedUploadingDoctors]);

    return (
        <div className="page home-page">
            {/* {loadingFlags[fetchAllDoctors.typePrefix] && <span>Loading doctors...</span>} */}
        </div>
    );
};

export default HomePage;
