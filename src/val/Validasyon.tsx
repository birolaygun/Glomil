import * as yup from 'yup';

let validations = yup.object().shape({
 name: yup.string().required("zorunlu alan"),
 gender: yup.string().required("zorunlu alan"),
 group: yup.string().required("zorunlu alan"),
 enter: yup.date().required("zorunlu alan"),
 escape: yup.date()

 
});

export default validations;