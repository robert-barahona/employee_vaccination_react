import { IEmployeeState } from '../../redux/slices/employee';
import { IEmployee } from '../../interfaces/IEmployee';

export const employeesList: IEmployee[] = [
  {
    ci: '1717154130',
    firstNames: 'Roberto Alejandro',
    lastNames: 'Barahona Cevallos',
    mail: 'robert.barahona.1998@gmail.com',
    birthDate: '1998-04-03T05:00:00.000Z',
    address: 'El Valle de los Chillos',
    phone: '0984396922',
    userId: 2,
    id: 1
  },
  {
    ci: '1231231234',
    firstNames: 'Mishu Katherine',
    lastNames: 'Cárdenas Pico',
    mail: 'begokath@gmail.com',
    birthDate: '1222-05-03T05:19:20.000Z',
    address: 'Cayambe',
    phone: '0984396922',
    userId: 6,
    id: 5
  },
  {
    ci: '1231231235',
    firstNames: 'Kevin Hernán',
    lastNames: 'Mina Puruncajas',
    mail: 'kevinminey97@gmail.com',
    birthDate: '1222-05-03T05:19:20.000Z',
    address: 'El Valle de los Chillos',
    phone: '0984396922',
    userId: 7,
    id: 6
  },
  {
    ci: '1231231231',
    firstNames: 'Milton Patricio',
    lastNames: 'Montalvo Pacheco',
    mail: 'alex@gmail.com',
    birthDate: '1222-05-03T05:19:20.000Z',
    address: 'Ambato',
    phone: '0984396922',
    userId: 3,
    id: 2
  },
  {
    ci: '1231231232',
    firstNames: 'Johnny Andrés',
    lastNames: 'Moya Suárez',
    mail: 'andresito@gmail.com',
    birthDate: '1222-05-03T05:19:20.000Z',
    address: 'Ambato',
    phone: '0984396922',
    userId: 4,
    id: 3
  },
  {
    ci: '1231231236',
    firstNames: 'José Antonio',
    lastNames: 'Nuñez Amores',
    mail: 'jose123@mail.com',
    address: '',
    birthDate: null,
    phone: '',
    userId: 8,
    id: 7
  },
  {
    ci: '1231231233',
    firstNames: 'Thalía Alejandra',
    lastNames: 'Torres Chimbo',
    mail: 'thaaali@gmail.com',
    birthDate: '1222-05-03T05:19:20.000Z',
    address: 'Quito',
    phone: '0984396922',
    userId: 5,
    id: 4
  }
];

export const employeeTest: IEmployee = {
  ci: '0000000000',
  firstNames: 'Test',
  lastNames: 'Test',
  mail: 'mail@test.com',
}

export const initialState: IEmployeeState = {
  currentEmployee: null,
  employeesList: null,
  vaccineStatus: null,
}


export const stateWithEmployeesList: IEmployeeState = {
  currentEmployee: null,
  employeesList: employeesList,
  vaccineStatus: null,
}
