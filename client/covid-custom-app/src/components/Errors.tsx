import '../assets/css/errors.css'

function Errors({ errors }:any) {
    
    if (errors.length === 0) {
      return (<></>);
    }
  
    return (
      <div className="alert alert-danger">
          {errors.map((error: any) => (
            <div key={error}>{error}</div>
          ))}
      </div>
    );
  }
  
  export default Errors;