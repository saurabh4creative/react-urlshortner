import React, { useRef, useEffect } from 'react';
import { addUrl, getError } from '../redux/linkshortner/LinkActions';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../redux/linkshortner/LinkTypes';
import { Link } from 'react-router-dom';

function Home() {
    const addLink = useRef('');
    const dispatch = useDispatch();
    const data = useSelector(state=>state.LinkReducer);
    const errorFound = useSelector( (state) => state.errorReducer.error);

    console.log(data);
    
    let finalUrl = '';
    
    if(data.status){
        finalUrl =  `${BASE_URL}/${data.data.url}`;
    }

    const urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
        return regex.test(URL);
    };

    const submitHandler = (e) => {
          e.preventDefault();
          const input = addLink.current.value;  
          
          if(input === '' || input === null || input === undefined){
               toast.error('Please Enter the URL...');
          }
          else if( !urlPatternValidation(input) ){
               toast.error('Please Enter the Correct URL...');
          } 
          else{
               dispatch( addUrl(input) ).catch((error)=>{
                    return dispatch( getError(error) ); 
               }); 

               if( data.status ){ 
                    toast.success('Url Generate Successfully...')
               }
               
               addLink.current.value = '';
          }
    } 

    useEffect(()=>{
        if( errorFound ){ 
            toast.error(errorFound);
        }  
    }, [errorFound]);

    return (
        <div>
            <div className="todoApp position-relative">
                <div className='bg-img'></div>
                <div className='innerDiv position-relative pt-5 z-index-1'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-xl-5 col-lg-5 col-sm-10 col-md-8 col-12'>
                                <div className='web-logo text-center'>
                                    <img src='https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg' alt='Todo Logo' />
                                </div>

                                <div className='input-box mt-5'>
                                    <div className='top-form position-relative'>
                                        <form onSubmit={submitHandler}>
                                            <input 
                                                   type={'text'} 
                                                   placeholder="Enter a Url/Paste Url" 
                                                   className='form-control'
                                                   ref={addLink}
                                            />
                                            <button type="submit"> 
                                                <i className='fa fa-plus'></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className='result-sec mt-4 pt-2'>
                                    <div className='final-res'>
                                        <div className='res-div'>
                                            <ul className='navbar-nav flex-row justify-content-between'>
                                                  { data.data ? <>
                                                        {finalUrl ? <>
                                                            <li className='text-center link-color col'>
                                                                Shorten URL: <br/>
                                                                <Link target="_blank" rel="noopener noreferrer" to={data.data.url}>
                                                                        {finalUrl}
                                                                </Link> 
                                                            </li>
                                                        </> : <>
                                                            <li className='text-center col'>
                                                                    Your Short Link 
                                                            </li>  
                                                        </>}                                                        
                                                  </> : <>
                                                        
                                                  </> } 
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
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default Home;