import { useState } from 'react';

const SimpleInput = () => {

  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  
  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredEmailIsValid = enteredEmail.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  
  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = event => {
    if (event.target.id === 'name') {
      setEnteredName(event.target.value);
    }
    if (event.target.id === 'email') {
      setEnteredEmail(event.target.value);
    }
  }

  const nameInputBlurHandler = event => {
    console.log(event.target.id);
    if (event.target.id === 'name') {
      setEnteredNameTouched(true);
    }
    if (event.target.id === 'email') {
      setEnteredEmailTouched(true);
    }
  }
  
  const formSubmissionHandler = event => {
    event.preventDefault();
    
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    
    if (!enteredNameIsValid) {
      return;
    }
    
    // nameInputRef.current.value = ''; => NOT IDEAL, DON´T MANIPULATED THE DOM
    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={ formSubmissionHandler }>

      {/* Name */}
      <div className={ nameInputClasses }>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text' 
          id='name' 
          onChange={ nameInputChangeHandler }
          onBlur={ nameInputBlurHandler }
          value={ enteredName }
        />
        {
          nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>
        }
      </div>

      {/* Email */}
      <div className={ emailInputClasses }>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={ nameInputChangeHandler }
          onBlur={ nameInputBlurHandler }
          value={ enteredEmail }
        />
        {
          emailInputIsInvalid && <p className='error-text'>Email must not be empty.</p>
        }
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
