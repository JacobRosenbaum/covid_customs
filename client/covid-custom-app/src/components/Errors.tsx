function Errors({ errors }:any) {
    
    if (errors.length === 0) {
      return null;
    }
  
    return (
      <div className="alert alert-danger">
        The following errors were found:
        <ul>
          {errors.map((error: any) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Errors;