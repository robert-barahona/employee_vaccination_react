import moment from 'moment';

import { employeeActions, employeeReducer, employeeSlice } from '../../../../redux/slices/employee/employeeSlice';
import { employeesList, initialState, employeeTest, stateWithEmployeesList } from '../../../fixtures/employeeFixture';
import { IFilterParams, IEmployee } from '../../../../interfaces';

describe('Tests of employeeSlice', () => {

  test('should be named "employee"', () => {
    expect(employeeSlice.name).toBe('employee');
  })

  test('should return the initial state', () => {
    expect(employeeReducer(undefined, { type: undefined })).toEqual(initialState);
  })

  test('should set employeesList', () => {
    const action = employeeActions.setEmployeesList(employeesList);
    expect(employeeReducer(initialState, action)).toEqual({
      ...initialState,
      employeesList,
    });
  })

  test('should handle a employee being added to a null list', () => {
    const action = employeeActions.addEmployee(employeeTest);
    expect(employeeReducer(initialState, action)).toEqual({
      ...initialState,
      employeesList: [employeeTest],
    })
  })

  test('should handle a employee being added to a list with data', () => {
    const action = employeeActions.addEmployee(employeeTest);
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual({
      ...stateWithEmployeesList,
      employeesList: [
        ...stateWithEmployeesList.employeesList!,
        employeeTest
      ].sort((a, b) => a.lastNames.localeCompare(b.lastNames)),
    });
  })

  test('should handle a employee being added with duplicated CI', () => {
    const action = employeeActions.addEmployee(employeesList[0]);
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual(stateWithEmployeesList);
  })

  test('should handle updating an employee', () => {
    const employeeUpdated: IEmployee = {
      ...stateWithEmployeesList.employeesList![0],
      address: 'Test',
    };
    const newList = [...stateWithEmployeesList.employeesList!];
    newList[0] = employeeUpdated;
    const action = employeeActions.updateEmployee(employeeUpdated);
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual({
      ...stateWithEmployeesList,
      employeesList: newList,
    })
  })

  test('should remove an employee of list', () => {
    const newList = [...stateWithEmployeesList.employeesList!];
    const employeeRemoved = newList.shift();
    const action = employeeActions.removeEmployee(employeeRemoved?.id ?? 0);
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual({
      ...stateWithEmployeesList,
      employeesList: newList,
    })
  })

  test('should filter employeesList by vaccineStatus', () => {
    let filterParams: IFilterParams = {
      date1: null,
      date2: null,
      isVaccinated: null,
      vaccine: null,
    }
    const list = stateWithEmployeesList.employeesList!;
    const action = employeeActions.filterEmployeesList({ filterParams, list });

    // filter by isVaccinated
    filterParams.isVaccinated = false;
    let newList = list.filter(e => e.vaccineStatus?.isVaccinated === filterParams.isVaccinated)
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual({
      ...stateWithEmployeesList,
      employeesList: newList,
    })

    // filter by vaccine name
    filterParams.vaccine = 'Sputnik';
    newList = list.filter(e => e.vaccineStatus?.vaccine === filterParams.vaccine);
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual({
      ...stateWithEmployeesList,
      employeesList: newList,
    })

    // filter by date range
    filterParams.date1 = '03/04/2022';
    filterParams.date2 = '12/12/2022';
    newList = list.filter(e => {
      const dateFormatted = moment(e.vaccineStatus?.date).format('YYYY-MM-DD');
      return dateFormatted >= filterParams.date1! && dateFormatted <= filterParams.date2!;
    })
    expect(employeeReducer(stateWithEmployeesList, action)).toEqual({
      ...stateWithEmployeesList,
      employeesList: newList,
    })
  })

})