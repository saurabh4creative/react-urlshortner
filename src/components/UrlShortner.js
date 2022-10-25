import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { redirectUrl } from '../redux/linkshortner/LinkActions';
import { BASE_URL } from '../redux/linkshortner/LinkTypes';

function UrlShortner() {
    const paramID = useParams();
    const urlID = paramID.id;
    const dispatch = useDispatch();
    const state = useSelector(state => state.LinkReducer);
    const dataFetchedRef = useRef(false);
    const Url = `${BASE_URL}/${urlID}`;

    useEffect(()=>{
         if(state.data.link){
            window.location.href = state.data.link;
         }
    },[state]);
    
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        if (urlID) {
            dispatch(redirectUrl(urlID));
        }
    }, [urlID, dispatch]); 

    return (
        <div>
            {state.isLoad === true && <>
                <div className="todoApp position-relative">
                    <div className='bg-img'></div>
                    <div className='innerDiv position-relative pt-5 z-index-1'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-xl-5 col-lg-5 col-sm-10 col-md-8 col-12'>
                                    <div className='web-logo text-center'>
                                        <img src='https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg' alt='Todo Logo' />
                                    </div>

                                    <div className="input-box mt-5">
                                        <div className="top-form position-relative">
                                            <input value={Url} readOnly type="text" placeholder="Enter a Url/Paste Url" className="form-control" />
                                        </div>
                                    </div>

                                    <div className='result-sec mt-4 pt-2'>
                                        <div className='list-res'>

                                        </div>
                                        <div className='final-res'>
                                            <div className='res-div'>
                                                <ul className='navbar-nav flex-row justify-content-between'>
                                                    <li className='col text-center'>
                                                        Above Url is Not Correct. Please check or Enter Correct Url...
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='author-name pb-4 text-center mt-4'>
                                        Created by 💗  Saurabh Jain
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    );
}

export default UrlShortner;