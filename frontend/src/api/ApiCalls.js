import axios from 'axios'
const API_URL = 'https://mag-prueba-tec-yctxl3no4a-ue.a.run.app/api'
// const API_URL = 'http://localhost:8000/api'
const apiRequest = axios.create({
  baseURL: API_URL,
})

const errorMsg = (error) => {
  console.error(error)
  return error.response && error.response.status ? error.response.status : ''
}

// Get companies
export const getCompanies = async (keywords = '') => {
  // Returns an object with an array of companies, pages and page.
  try {
    const { data } = await apiRequest.get(`/companies/${keywords}`)
    return [null, data]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error descargando los datos de las empresas, intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// Get single company info
export const getCompany = async (id) => {
  try {
    const { data } = await apiRequest.get(`/companies/${id}`)
    return [null, data]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error recibiendo los datos de la empresa, intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// New company
export const newCompany = async (companyInfo) => {
  // Returns success = true, if company is added succesfully
  try {
    await apiRequest.post(`/companies/create/`, companyInfo)
    return [null, true]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error agregando la empresa, verifica que el nombre no este en uso por otra empresa.`
    return [msg, null]
  }
}

// Update company
export const updateCompany = async (id, companyInfo) => {
  try {
    await apiRequest.put(`/companies/update/${id}/`, companyInfo)
    return [null, true]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error actualizando la info de la empresa, valida que su nombre no sea el mismo a otra empresa ya registrada o intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// Delete single company
export const deleteCompany = async (id, keywords = '') => {
  // Deletes a single company and returns a refreshed list of companies
  try {
    await apiRequest.delete(`/companies/delete/${id}/`)
    const { data } = await apiRequest.get(`/companies/${keywords}`)
    return [null, data]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error removiendo la empresa, intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// Get employees
export const getEmployees = async (keywords = '') => {
  try {
    const { data } = await apiRequest.get(`/employees/${keywords}`)
    return [null, data]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error recibiendo los datos de los empleados, intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// Get employee
export const getEmployee = async (id) => {
  try {
    const { data } = await apiRequest.get(`/employees/${id}`)
    return [null, data]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error recibiendo los datos del empleado, intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// New employee
export const newEmployee = async (employeeInfo) => {
  try {
    await apiRequest.post(`/employees/create/`, employeeInfo)
    return [null, true]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error agregando el empleado, verifica que el nombre no este en uso por otro empleado.`
    return [msg, null]
  }
}

// Update Employee
export const updateEmployee = async (id, employeeInfo) => {
  try {
    await apiRequest.put(`/employees/update/${id}/`, employeeInfo)
    return [null, true]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error actualizando la info del empleado, valida que su nombre no sea el mismo a otro empleado ya registrado o intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}

// Delete employee
export const deleteEmployee = async (id) => {
  try {
    await apiRequest.delete(`/employees/delete/${id}/`)
    return [null, true]
  } catch (error) {
    const sts = errorMsg(error)
    const msg = `Error ${sts}: Ha ocurrido un error borrando el empleado, intentalo de nuevo mas tarde.`
    return [msg, null]
  }
}
