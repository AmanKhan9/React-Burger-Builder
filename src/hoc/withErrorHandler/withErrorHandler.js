import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler=(WrappedComponent,axios)=>{
    return props => {
        // const [error,setError] = useState(null);
        // // state = {
        // //     error : null
        // // }
        // //Or use constructor when the component object is created
        // const reqInterceptor = axios.interceptors.request.use(req=>{
        //     //this.setState({error:null});
        //     setError(null);
        //     return req;
        // })
        // const resInterceptor = axios.interceptors.response.use(res=>res,err=>{
        //     //this.setState({error:error});
        //     setError(err);
        // })
        // useEffect(()=>{
        //     return ()=>{
        //     axios.interceptors.request.eject(reqInterceptor);
        //     axios.interceptors.response.eject(resInterceptor);
        //     };
        // },[reqInterceptor,resInterceptor]);
       
        // // componentWillUnmount(){
        // //     //console.log('Will unmount',this.reqInterceptor,this.resInterceptor);
        // //     axios.interceptors.request.eject(this.reqInterceptor);
        // //     axios.interceptors.response.eject(this.resInterceptor);
        // // }
        // const errorConfirmedHandler=()=>{
        //     //this.setState({error:null});
        //     setError(null);
        // }
        const[error,clearError] = useHttpErrorHandler(axios);
            return (
                <Aux>
            <Modal show={error}
                   modalClosed={clearError} >
                {error ? error.message:null}
            </Modal>
            <WrappedComponent {...props}/>
            </Aux>
            )
    }
}

export default withErrorHandler;